import React, {Component} from 'react';
import './App.css';
import MapOfTombs from './MapOfTombs';

class App extends Component {
  componentDidMount() {
    // grab list of tombs from Wikipedia
    fetch(
      'https://de.wikipedia.org/w/api.php?action=query&cmlimit=100&list=categorymembers&cmpageid=9640102&origin=*&format=json'
    )
      .then(results => {
        return results.json();
      })
      .then(data => {
        let listOfEntries = data.query.categorymembers;
        let listOfEntryTitles = listOfEntries.map(entry => {
          return entry.title;
        });
        console.log(listOfEntryTitles);
      });
  }

  render() {
    return (
      <div className="App">
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

export default App;
