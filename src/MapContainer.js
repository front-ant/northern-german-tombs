import React, {Component} from 'react';
import MapOfTombs from './MapOfTombs';

class MapContainer extends Component {
  render() {
    return (
      <div className="Map">
        <MapOfTombs
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyBvTq7xtoNgz7I1mMtLJ6US0PJ14KSZ4zg`}
          loadingElement={<div style={{height: `100%`}} />}
          containerElement={<div style={{height: `600px`, width: `100%`}} />}
          mapElement={<div style={{height: `100%`}} />}
        />
      </div>
    );
  }
}

export default MapContainer;
