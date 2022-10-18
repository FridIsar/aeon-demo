
const startRoute = async (map) => {



  map.addSource("tp-line", {
    type: "geojson",
    data: path,
    // Line metrics is required to use the 'line-progress' property
    lineMetrics: true
  });

  map.addLayer({
    id: "tp-line-line",
    type: "line",
    source: "tp-line",
    paint: {
      "line-color": "rgba(0,0,0,0)",
      "line-width": 8,
      "line-opacity": 0.7
    }
  });



  var targetLngLat = {
  lng: path.geometry.coordinates[0][0],
  lat: path.geometry.coordinates[0][1],
  };


  // const { startBearing, startAltitude } = await flyInAndRotate(
  //     map,
  //     targetLngLat,
  //     3000,
  //     2000000,
  //     2000,
  //     0,
  //     -20,
  //     40,
  //     50
  //   );


  //animatePath(map,8000,path,0,2000000,0)

  
  
}