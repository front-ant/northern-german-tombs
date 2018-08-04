import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

const MapOfTombs = withScriptjs(
  withGoogleMap(props => {
    console.log(props.coordinates[0]);
    // let markers = props.coordinates.forEach(coord => (
    //   <Marker position={coord} />
    // ));

    return (
      <GoogleMap defaultZoom={12} center={{lat: 53.1572121, lng: 10.2079295}}>
        {props.coordinates.map(coord => (
          <Marker position={coord} key={coord.lat} />
        ))}
      </GoogleMap>
    );
  })
);

export default MapOfTombs;
