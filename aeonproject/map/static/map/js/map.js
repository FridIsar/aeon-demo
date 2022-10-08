function initiateMap()	{
	mapboxgl.accessToken = 'pk.eyJ1IjoibmlkbHkiLCJhIjoiY2swY2tyaGx5MDBscDNucG1ycm9pZG1tMSJ9.Npj4mCdM7VhNQmYcfMxcpA';
	const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/nidly/cl6vc6on7006p14n00301xz8j', // style URL
        center: [-18.438331, 64.909926], // starting position [lng, lat]
        zoom: 5.54, // starting zoom
        projection: 'globe' // display the map as a 3D globe
      });

	map.on('style.load', () => {
    map.addSource('mapbox-dem', {
      'type': 'raster-dem',
      'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
      'tileSize': 512,
      'maxzoom': 14
    });
// add the DEM source as a terrain layer with exaggerated height
map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

// add sky styling with `setFog` that will show when the map is highly pitched
map.setFog({
  'horizon-blend': 0.3,
  'color': '#f8f0e3',
  'high-color': '#add8e6',
  'space-color': '#d8f2ff',
  'star-intensity': 0.0
});
startRoute(map);
});

	map.on('load', () => {
		console.log("querying features", map.getSource('thingvellir'))
		let featureas = map.queryRenderedFeatures({
    		layers: ['thingvellir'] // replace with your layer name
      });
		console.log("features are",featureas)
		console.log(map.getSource('composite'));

		//startRoute()

	});


	map.on('click', (event) => {
  // If the user clicked on one of your markers, get its information.
  const features = map.queryRenderedFeatures(event.point, {
    layers: ['thingvellir'] // replace with your layer name
  });
  console.log("click", features)
  if (!features.length) {
  	return;
  }
  const feature = features[0];
  generateTargetPage("Þingvellir á Þórsnesi", false);
});
	// const target = {
 //        // center: [74.5, 40],
 //        // zoom: 2
 //        center: [-22.701906, 65.063636],
 //        zoom: 15,
 //        bearing: 130,
 //        pitch: 75
 //    }
 //    map.flyTo({
 //            ...target, // Fly to the selected target
 //            duration: 6000, // Animate over 12 seconds
 //            essential: true // This animation is considered essential with
 //            //respect to prefers-reduced-motion
 //        });

 
}    