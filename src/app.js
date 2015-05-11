/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');

var main = new UI.Card({
  title: 'Where AM I?',
	icon: 'images/logo.png',
	body: 'To get current location push middle button.'
});

main.show();



main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'First Item',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        icon: 'images/menu_icon.png',
        subtitle: 'Subtitle Text'
      }]
    }]
  });


  menu.on('select', function(e) {
		var card = new UI.Card();
    card.title(e.item.title);
    card.body('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
  });
  menu.show();
});

main.on('click', 'select', function(e) {
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

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
