/**
 * Where Am I?
 * Get the address of you!
 */

var UI = require('ui');
var ajax = require('ajax');

var main = new UI.Card({ title: 'Where AM I?' });

main.on('show', function(e){
	navigator.geolocation.getCurrentPosition(function(pos) {
		var coords = pos.coords;
		var geoUrl = 'http://maps.googleapis.com/maps/api/geocode/json?' +
				'latlng=' + coords.latitude + ',' + coords.longitude + '&sensor=true_or_false';
		ajax({ url: geoUrl, type: 'json' }, function(data) {
			var first = data.results[0];
			var formattedAddress = first.formatted_address;
			main.body(formattedAddress);
		});
	});	
});
main.show();

