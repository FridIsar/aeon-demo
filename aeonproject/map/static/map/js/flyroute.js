const startRoute = async (map) => {

  const path = {
    "type": "Feature",
    "properties": {
      "title": "fly_route"
    },
    "geometry": {
      "coordinates": [
      [-22.752579, 65.031682],
      [-22.752284, 65.032527],
      [-22.752193, 65.033161],
      [-22.75217, 65.033717],
      [-22.752215, 65.034303],
      [-22.752375, 65.034936],
      [-22.752716, 65.035551],
      [-22.753102, 65.036127],
      [-22.753716, 65.03675],
      [-22.756103, 65.038708],
      [-22.757759, 65.040136],
      [-22.758465, 65.04094],
      [-22.758757, 65.041495],
      [-22.758928, 65.042276],
      [-22.758562, 65.043263],
      [-22.757783, 65.04421],
      [-22.75715, 65.044981],
      [
        -22.755530766485926,
        65.04742196543813
      ],
      [
        -22.75175156744849,
        65.0500545570288
      ],
      [
        -22.745524060193176,
        65.05386955487162
      ],
      [
        -22.73248168393831,
        65.05818772860408
      ],
      [
        -22.721478168625563,
        65.06182225484503
      ],
      [
        -22.712679086187507,
        65.06570698948322
      ]
      ],
      "type": "LineString"
    }
  }


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


  const { startBearing, startAltitude } = await flyInAndRotate(
      map,
      targetLngLat,
      3000,
      2000000,
      2000,
      0,
      -20,
      40,
      50
    );


  await animatePath(
      map,
      4000,
      path,
      -20,
      2000,
      50
    )

  
  
}