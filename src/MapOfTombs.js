import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

const MapOfTombs = withScriptjs(
  withGoogleMap(props => {
    console.log(props.coordinates);
    let markers = <Marker position={{lat: 53.1572121, lng: 10.2079295}} />;

    return (
      <GoogleMap defaultZoom={12} center={{lat: 53.1572121, lng: 10.2079295}}>
        {markers}
      </GoogleMap>
    );
  })
);

export default MapOfTombs;
