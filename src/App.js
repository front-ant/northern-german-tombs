import React, {Component} from 'react';
import './App.css';
import MapOfTombs from './MapOfTombs';
import * as APICalls from './APICalls';

class App extends Component {
  state = {
    tombs: []
  };
  async componentDidMount() {
    const tombs = await APICalls.getListOfTombs();
    this.setState({tombs});
    console.log(this.state.tombs);
    // // Make an API request for each title in the list to retrieve detailed information
    // listOfEntryTitles.forEach(title => {
    //   fetch(`https://de.wikipedia.org/api/rest_v1/page/summary/${title}`)
    //     .then(results => {
    //       return results.json();
    //     })
    //     .then(data => {
    //       listOfTombObjects.push(data);
    //       console.log(listOfTombObjects);
    //     });
    // });
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
