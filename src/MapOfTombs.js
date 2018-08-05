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
      <GoogleMap defaultZoom={10} center={{lat: 53.1572121, lng: 10.2079295}}>
        {props.tombs.map(t => (
          <Marker
            position={t.coordinates}
            key={t.tid}
            onClick={event => props.handleClick(event.target, t.tid)}
          />
        ))}
        <Marker
          key={props.activeTomb.tid}
          position={props.activeTomb.coordinates}
          animation={window.google.maps.Animation.BOUNCE}
        />
        )
      </GoogleMap>
    );
  })
);

export default MapOfTombs;
