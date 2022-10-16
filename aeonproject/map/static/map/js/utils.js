// given a bearing, pitch, altitude, and a targetPosition on the ground to look at,
// calculate the camera's targetPosition as lngLat
let previousCameraPosition

// amazingly simple, via https://codepen.io/ma77os/pen/OJPVrP
function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end
}

const computeCameraPosition = (
  pitch,
  bearing,
  targetPosition,
  altitude,
  smooth = false
) => {
  var bearingInRadian = bearing / 57.29;
  var pitchInRadian = (90 - pitch) / 57.29;

  var lngDiff =
    ((altitude / Math.tan(pitchInRadian)) *
      Math.sin(-bearingInRadian)) /
    70000; // ~70km/degree longitude
  var latDiff =
    ((altitude / Math.tan(pitchInRadian)) *
      Math.cos(-bearingInRadian)) /
    110000 // 110km/degree latitude

  var correctedLng = targetPosition.lng + lngDiff;
  var correctedLat = targetPosition.lat - latDiff;

  const newCameraPosition = {
    lng: correctedLng,
    lat: correctedLat
  };

  if (smooth) {
    if (previousCameraPosition) {
      const SMOOTH_FACTOR = 0.95
      newCameraPosition.lng = lerp(newCameraPosition.lng, previousCameraPosition.lng, SMOOTH_FACTOR);
      newCameraPosition.lat = lerp(newCameraPosition.lat, previousCameraPosition.lat, SMOOTH_FACTOR);
    }
  }

  previousCameraPosition = newCameraPosition

  return newCameraPosition
};

const flyInAndRotate = async (
  map,
  targetLngLat,
  duration,
  startAltitude,
  endAltitude,
  startBearing,
  endBearing,
  startPitch,
  endPitch
) => {
  return new Promise(async (resolve) => {
    let start;

    var currentAltitude;
    var currentBearing;
    var currentPitch;

    // the animation frame will run as many times as necessary until the duration has been reached
    const frame = async (time) => {
      if (!start) {
        start = time;
      }

      // otherwise, use the current time to determine how far along in the duration we are
      let animationPhase = (time - start) / duration;

      // because the phase calculation is imprecise, the final zoom can vary
      // if it ended up greater than 1, set it to 1 so that we get the exact endAltitude that was requested
      if (animationPhase > 1) {
        animationPhase = 1;
      }

      currentAltitude = startAltitude + (endAltitude - startAltitude) * d3.easeCubicOut(animationPhase)
      // rotate the camera between startBearing and endBearing
      currentBearing = startBearing + (endBearing - startBearing) * d3.easeCubicOut(animationPhase)

      currentPitch = startPitch + (endPitch - startPitch) * d3.easeCubicOut(animationPhase)

      // compute corrected camera ground position, so the start of the path is always in view
      var correctedPosition = computeCameraPosition(
        currentPitch,
        currentBearing,
        targetLngLat,
        currentAltitude
      );

      // set the pitch and bearing of the camera
      const camera = map.getFreeCameraOptions();
      camera.setPitchBearing(currentPitch, currentBearing);

      // set the position and altitude of the camera
      camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
        correctedPosition,
        currentAltitude
      );

      // apply the new camera options
      map.setFreeCameraOptions(camera);

      // when the animationPhase is done, resolve the promise so the parent function can move on to the next step in the sequence
      
      if (animationPhase === 1) {
        resolve({
          bearing: currentBearing,
          altitude: currentAltitude,
        });

        // return so there are no further iterations of this frame
        return;
      }

      await window.requestAnimationFrame(frame);
    };

    await window.requestAnimationFrame(frame);
  });
};

const animatePath = async (
  map,
  duration,
  path,
  startBearing,
  startAltitude,
  pitch
) => {
  return new Promise(async (resolve) => {

      let startTime;
  //const startBearing = -20;
  const pathDistance = turf.lineDistance(path)

  const frame = async (time) => {

    if (!startTime) startTime = time;
    let animationPhase = (time - startTime) / duration;
    const[lng, lat] = turf.along(path, pathDistance * animationPhase).geometry.coordinates;
    const lngLat = {
      lng: lng,
      lat: lat,
    };

    let curAlt = (1/animationPhase**2) * 100 // ends at 200m

    console.log(curAlt)
    if (curAlt > 2000000) // Avoid too big number
      startAltitude = 2000000
    else
      startAltitude = curAlt

    let pitch = animationPhase * 78 // ends at 78°



    if (animationPhase < 0.30) {
    }
    else {
      if (animationPhase <= 0.6) {
        startBearing=190*(animationPhase-0.3)
      }
      else {
      }
    }

    if (animationPhase > 1) {
      return;
    }

    // slowly rotate the map at a constant rate
    const bearing = startBearing//-(startBearing - animationPhase * 1);

        // compute corrected camera ground position, so that he leading edge of the path is in view
    var correctedPosition = computeCameraPosition(
      pitch,
      bearing,
      lngLat,
      startAltitude,
      true // smooth
    );
    // set the pitch and bearing of the camera
    const camera = map.getFreeCameraOptions();
    camera.setPitchBearing(pitch, bearing);

    //console.log(startAltitude," alt, corrected position is ",correctedPosition)
    // set the position and altitude of the camera
  camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
    correctedPosition,
    startAltitude
  );

  // apply the new camera options
  map.setFreeCameraOptions(camera);




    await window.requestAnimationFrame(frame);
  };

  await window.requestAnimationFrame(frame);

  });
};