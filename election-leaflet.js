var map = L.map('map');

// Add a map layer
var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var tiles = L.geoJson(districts, {
	onEachFeature: onEachFeature,
	style: style
}).addTo(map)

map_bounds = tiles.getBounds()
map.setView(map.fitBounds(map_bounds));

function style(feature) {
  return {
		fillColor: getColor(feature.results),
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.7
  };
}

function highlightFeature(e) {
	var layer = e.target
	layer.setStyle({
		weight: 2,
		color: '#666',
    dashArray: '',
    fillOpacity: 0.7
	});

	layer.bringToFront();
}

function resetHighlight(e) {
	tiles.resetStyle(e.target);
}

function zoomAndFeature(e) {
  map.fitBounds(e.target.getBounds());
	var feature = e.target['feature'];
	document.getElementById('district-name').innerHTML = "District name: " + feature.properties.ENNAME;
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
		click: zoomAndFeature
  });
}

function getDistrictResult(district) {
  var results = district['results'];
	for (var i = 0; i < results.length; i++) {
		results[i]
	}
}

function getColor(results) {
	if (results) {
		var top_party = '';
		var votes = 0;
		for (var i = 0; i < results.length; i++) {
			if (results[i][4] > votes) {
				top_party = results[i][3];
				votes = results[i][4];
			}
		}
	}
	return top_party == 'NDP-New Democratic Party' ? '#FF5800' :
         top_party == 'Conservative' ? '#002395' :
         top_party == 'Liberal' ? '#ed2e38' :
				 top_party == 'Bloc Québécois' ? '#0088CE' :
				 top_party == 'Green Party' ? '#427730' :
         							'#7570b3' ;
}
