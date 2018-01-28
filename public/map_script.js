var isScrolling;
window.infobox = false;
window.lastAdded_lat = 41.8261471;
var data = {
    lat: 0,
    lng: 0,
    free: false,
    words: ["Mountain"]
}
window.sharedSpace = [];
markers = []

function autoScroll() {
    window.clearTimeout( isScrolling );
    isScrolling = setTimeout(function() {
        if(window.scrollY >= window.innerHeight/2){
            scrollToMap();
        } else {
            scrollToAbout();
        }
    }, 66);
}
function scrollToAdd(){
    document.getElementById("add-info").scrollIntoView({behavior: "smooth"});
}
function scrollToAbout(){
    document.getElementById("map").scrollIntoView({behavior: "smooth"});
}



var map;
var infoWindow;
var selfMarker;

var chicago = {lat: 41.85, lng: -87.65};

/**
       * The CenterControl adds a control to the map that recenters the map on
       * Chicago.
       * This constructor takes the control DIV as an argument.
       * @constructor
       */
function CenterControl(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#ffac59';
    controlUI.style.border = '2px solid #ffac59';
    controlUI.style.borderRadius = '100px';
    controlUI.style.boxShadow = '0 2px 6px #000000';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '30px';
    controlUI.style.marginRight = '15px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '15px';
    controlText.style.paddingRight = '15px';

    controlText.innerHTML = "Add My Location";
    controlUI.appendChild(controlText);
    var blueMarker = {
        url: 'https://cdn4.iconfinder.com/data/icons/ios7-active-tab/512/map_marker-512.png', // image is 512 x 512
        scaledSize : new google.maps.Size(32, 32),
    };
    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function() {
        if (!window.infobox) {
            $('.popup').css( "left", "20px" );
            window.infobox = true;
        }else{
            $('.popup').css( "left", "-380px" );
            window.infobox = false;
        }

        var addMyLoc = {lat:selfMarker.getPosition().lat(), lng:selfMarker.getPosition().lng()};
        window.lastAdded_lat = selfMarker.getPosition().lat();
        data.lat = selfMarker.getPosition().lat();
        data.lng = selfMarker.getPosition().lng();
        window.sharedSpace.push(data);
        var marker = new google.maps.Marker({
            position: addMyLoc,
            map: map,
            icon: blueMarker,
        });

        marker.addListener('click', function() {
            for (i =0; i < window.sharedSpace.length; i++) {
                if(window.sharedSpace[i].lat==marker.getPosition().lat()) {
                    var weirdWords = "";
                    data = window.sharedSpace[i].words;
                    console.log(marker.getPosition());
                    for (j=0; j< data.length; j++) {
                        weirdWords += " " + data[j];
                    }

                    infowindow = new google.maps.InfoWindow({
                        content: weirdWords
                    });
                }
            }
            infowindow.open(map, marker);
        })
    });
}


function drawPoints(){
    console.log("drawwwwing");
 //    var getData;
 //    $.ajax({
 //        type: 'GET',
 //        url: url,
 //        dataType: 'json',
 //        async: false,
 //        success: function (response) {
 //            getData[name] = response;

 //        }
 //    });
 // alert(getData[name]);

     var blueMarker = {
         url: 'https://cdn4.iconfinder.com/data/icons/ios7-active-tab/512/map_marker-512.png', // image is 512 x 512
         scaledSize : new google.maps.Size(32, 32),
     };
    console.log("drawwwing points");
    var request = $.ajax({
        type: "GET",
        url: "http://165.227.67.10:3002/get"
    })

    request.done(function(msg) {

        // alert("Data Saved: " + msg)
        for(x = 0; x < msg.length; x++){
            // var lat2 = 41.8267760;
            // var lon2 = -71.40441821;
            var lat2 = parseFloat(msg[x].longitude);
            var lon2 = parseFloat(msg[x].latitude);
            var words = msg[x].words;
            // console.log(lat);
            // console.log(lon);
            var addMyLoc = {lat: lat2, lng: lon2};
            console.log(addMyLoc);
            var marker = new google.maps.Marker({
                position: addMyLoc,
                map: map,
                icon: blueMarker,
                id:x,
            });
            marker.addListener('click', function() {
                        // var weirdWords = words.toString();
                        // for (j=0; j< data.length; j++) {
                        //     weirdWords += " " + data[j];
                        // }

                        infowindow = new google.maps.InfoWindow({
                            //console.log(marker.id);
                            content: msg[marker.id].words.toString()
                        });
                infowindow.open(map, marker);
            })
        }

        console.log("done");
    })

    request.fail(function(jqXHR, textStatus) {
        alert("Request failed: " + textStatus)
    })
}


function initMap() {
    var uluru = {lat: 41.8239, lng: -71.4128};
    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 17,
        center: {lat: 41.8261471, lng: -71.4028689},
        disableDefaultUI: true,
        gestureHandling: 'cooperative',
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#212121"
                    }
                ]
            },
            {
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#212121"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#4d4d4d"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#393939"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#393939"
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#4d4d4d"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#181818"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1b1b1b"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffac59"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8a8a8a"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ff8000"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ff8000"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#3d3d3d"
                    }
                ]
            }
        ]
    })
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
    var pos = {
        lat: 41.8251471,
        lng: -71.4028689
    };
    var image = {
        url: 'http://www.clker.com/cliparts/P/1/h/u/d/k/upright-white-triangle-hi.png', // image is 512 x 512
        scaledSize : new google.maps.Size(34, 30),
    };
    selfMarker = new google.maps.Marker({
        position: pos,
        icon:image,
        map: map,
        //zIndex: 99999,
    });
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function(position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            selfMarker.setPosition(pos);
        }, function() {
            handleLocationError(true, selfMarker, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, selfMarker, map.getCenter());
    }


    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        selfMarker.setPosition(pos);
        selfMarker.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        selfMarker.open(map);
    }
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
        '<div id="bodyContent">'+
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the '+
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
        'south west of the nearest large town, Alice Springs; 450&#160;km '+
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
        'features of the Uluru - Kata Tjuta National Park. Uluru is '+
        'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
        'Aboriginal people of the area. It has many springs, waterholes, '+
        'rock caves and ancient paintings. Uluru is listed as a World '+
        'Heritage Site.</p>'+
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
        '(last visited June 22, 2009).</p>'+
        '</div>'+
        '</div>';
    infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    var blueMarker = {
        url: 'https://cdn4.iconfinder.com/data/icons/ios7-active-tab/512/map_marker-512.png', // image is 512 x 512
        scaledSize : new google.maps.Size(32, 32),
    };
    // google.maps.event.addListener(map, 'click', function(evt) {
    //     // get existing path
    //     var adddedMarkerPos = {lat:evt.latLng.lat(), lng:evt.latLng.lng()};
    //     var marker = new google.maps.Marker({
    //         position: adddedMarkerPos,
    //         map: map,
    //         icon: blueMarker,
    //     });
    //     marker.addListener('click', function() {

    //         for (i =0; i < window.sharedSpace.length; i++) {
    //             if(window.sharedSpace[i].lat==marker.getPosition().lat()) {
    //                 data = window.sharedSpace[i];
    //             }
    //         }
    //         console.log(data);
    //         infowindow.open(map, marker);
    //     })
    // })
    drawPoints();
}
