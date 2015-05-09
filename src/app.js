/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');



var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello World!',
  body: 'Press any button.'
});

main.show();



main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
//        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });


  menu.on('select', function(e) {
		var wind = new UI.Window();


    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
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
