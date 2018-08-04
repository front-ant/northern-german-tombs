import React, {Component} from 'react';
import MapOfTombs from './MapOfTombs';

class MapContainer extends Component {
  state = {receivedData: false};

  componentDidUpdate(oldProps) {
    if (this.props.coordinates !== oldProps.coordinates) {
      this.setState({receivedData: true});
    }
  }

  render() {
    const receivedData = this.state.receivedData;
    if (receivedData) {
      return (
        <div className="Map">
          <MapOfTombs
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyBvTq7xtoNgz7I1mMtLJ6US0PJ14KSZ4zg`}
            loadingElement={<div style={{height: `100%`}} />}
            containerElement={<div style={{height: `600px`, width: `100%`}} />}
            mapElement={<div style={{height: `100%`}} />}
            coordinates={this.props.coordinates}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default MapContainer;
