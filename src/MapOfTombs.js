import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

const MapOfTombs = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap defaultZoom={12} center={{lat: 53.1572121, lng: 10.2079295}}>
        {props.coordinates.map(coord => (
          <Marker position={coord} key={coord.lat} />
        ))}
        {props.activeTomb.map(t => (
          <Marker
            key={t.tid}
            position={t.coordinates}
            animation={window.google.maps.Animation.BOUNCE}
          />
        ))}
      </GoogleMap>
    );
  })
);

export default MapOfTombs;
