$(function(arr) {
	var request = $.ajax({
		type: "GET",
		url: "http://165.227.67.10:3000",
		data: {name: 'Jenna'}
	});

	request.done(function(msg) {
		alert("Data Saved: " + msg)
	})

	request.fail(function(jqXHR, textStatus) {
		alert("Request failed: " + textStatus)
	})

});