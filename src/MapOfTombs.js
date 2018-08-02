import React from 'react';
import {withScriptjs, withGoogleMap, GoogleMap} from 'react-google-maps';

const MapOfTombs = withScriptjs(
  withGoogleMap(props => {
    let markers;

    return (
      <GoogleMap defaultZoom={12} center={{lat: 53.1572121, lng: 10.2079295}}>
        {markers}
      </GoogleMap>
    );
  })
);

export default MapOfTombs;
