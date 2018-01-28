words = {};
words['Pronoun'] = ['I','You','we','this','that','who','what'];
words['Noun'] =['woman','man','person','fish','bird','dog','louse','tree','seed','leaf','root','bark','skin','flesh','blood','bone','grease','egg','horn','tail','feather','hair','head','ear','eye','name','nose','mouth','tooth','tongue','claw','foot','knee','hand','belly','neck','heart','liver','night','sun','moon','star','water','rain','stone','sand','earth','cloud','smoke','fire','ash','burn','path','mountain'];
words['Verb'] =['drink','eat','bite','see','hear','know','sleep','die','kill','swim','fly','walk','come','lie','sit','stand','give','say'];
words['Color']=['red','green','yellow','white','black'];
words['Adjective'] =['not','all','many','one','two','big','long','small','hot','cold','full','new','good','round','dry' ];
my_user_words = [];


function moreWords(wordType) {
    if (wordType==="Clear") {
        my_user_words = [];
        document.getElementById('userWords').value = "";
        var data = [];
        for (i =0; i < window.sharedSpace.length; i++) {
            if(window.sharedSpace[i].lat==window.lastAdded_lat) {
                data = window.sharedSpace[i];
            }
        }
        data.words = [];
    } else {
        var buttonList = document.getElementById('buttons');
        document.getElementById('buttons').innerHTML = '';
        buttonList.innerHTML += "<input class='word-button back' type='button' value='&larr;back' onclick='back()'>";
        wordArr = words[wordType];
        for (i = 0; i < wordArr.length; i++) {
            var word = wordArr[i];
            var onclique = 'addWords("' + word + '")';
            buttonList.innerHTML += "<input class='word-button' type='button' value='"+word+"' onclick='"+ onclique + "'>";
        }
    }
}

function addWords(wordType) {
    document.getElementById('userWords').value += ' ' + wordType;
    my_user_words.push(wordType);
    var data = [];
    for (i =0; i < window.sharedSpace.length; i++) {
        if(window.sharedSpace[i].lat==window.lastAdded_lat) {
            data = window.sharedSpace[i];
        }
    }
    data.words = my_user_words;
}

var wordTypes = ["Pronoun", "Noun", "Adjective", "Color", "Verb", "Clear"];
function back() {
    console.log(window.sharedSpace);
    var buttonList = document.getElementById('buttons');
    document.getElementById('buttons').innerHTML = '';
    wordArr = wordTypes;
    for (i = 0; i < wordArr.length; i++) {
        var word = wordArr[i];
        var onclique = 'moreWords("' + word + '")';
        buttonList.innerHTML += "<input class='word-button' type='button' value='"+word+"' onclick='"+ onclique + "'>";
    }
}

function submit() {
    $('.popup').css( "left", "-380px" );
    my_user_words = [];
    document.getElementById('userWords').value = "";
    window.infobox = false;

    $(function(arr) {
                var data = [];
                for (i =0; i < window.sharedSpace.length; i++) {
                    if(window.sharedSpace[i].lat==window.lastAdded_lat) {
                        data = window.sharedSpace[i];
                    }
                }

                var request = $.ajax({
                    type: "GET",
                    url: "http://165.227.67.10:3000",
                    data: {longitude: data.lng, latitude: data.lat, words: data.words.toString(), free: data.free}
                })

                request.done(function(msg) {
                    alert("Data Saved: " + msg)
                })

                request.fail(function(jqXHR, textStatus) {
                    alert("Request failed: " + textStatus)
                })

    });
}

function addFree() {
    var data = [];
    for (i =0; i < window.sharedSpace.length; i++) {
        if(window.sharedSpace[i].lat==window.lastAdded_lat) {
            data = window.sharedSpace[i];
        }
    }
    if (data.free) {
        data.free = false;
    } else {
        data.free = true;
    }
    console.log(window.sharedSpace);

}
