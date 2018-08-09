import React, {Component} from 'react';
import MapOfTombs from './MapOfTombs';
import ErrorBoundary from './ErrorBoundary'

class MapContainer extends Component {
  render() {
    return (
      <ErrorBoundary>
      <div className="Map">
        <MapOfTombs
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyBvTq7xtoNgz7I1mMtLJ6US0PJ14KSZ4zg&onerror="googleError()"`}
          loadingElement={<div style={{height: `100%`}} />}
          containerElement={<div style={{height: `100vh`, width: `100%`}} />}
          mapElement={<div style={{height: `100vh`}} />}
          tombs={this.props.tombs}
          activeTomb={this.props.activeTomb}
          handleClick={this.props.handleClick}
          role="application"
        />
      </div>
      </ErrorBoundary>
    );
  }
}

export default MapContainer;
