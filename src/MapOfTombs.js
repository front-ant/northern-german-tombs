import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';

const MapOfTombs = withScriptjs(
  withGoogleMap(props => {
    const {activeTomb, tombs, handleClick} = props;
    return (
      <GoogleMap defaultZoom={10} center={{lat: 53.190159, lng: 10.495211}}>
        {tombs.map(t => (
          <Marker
            position={t.coordinates}
            key={t.tid}
            onClick={event => handleClick(event.target, t.tid)}
          />
        ))}
        <Marker
          key={activeTomb.tid}
          position={activeTomb.coordinates}
          animation={window.google.maps.Animation.BOUNCE}>
          <InfoWindow>
            <div className="info-window">
              {activeTomb.content_urls !== undefined && (
                <a
                  className="info-window-title"
                  target="_blank"
                  href={activeTomb.content_urls.desktop.page}>
                  {' '}
                  {activeTomb.title}
                </a>
              )}
              {activeTomb.thumbnail === undefined ? null : activeTomb.thumbnail
                .source !==
              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Lower_Saxony_relief_location_map.jpg/320px-Lower_Saxony_relief_location_map.jpg' ? (
                <div className="info-with-img">
                  <img
                    className="info-thumbnail"
                    src={activeTomb.thumbnail.source}
                    alt={activeTomb.title}
                  />
                </div>
              ) : null}
            </div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    );
  })
);

export default MapOfTombs;
