import React, {Component} from 'react';
import './App.css';
import MapOfTombs from './MapOfTombs';
import * as APICalls from './APICalls';

class App extends Component {
  state = {
    tombs: [],
    coordinates: []
  };
  async componentDidMount() {
    const listOfTombs = await APICalls.getListOfTombs();
    const tombs = await APICalls.getDetailsOfTombs(listOfTombs);
    const filteredTombs = tombs.filter(tomb => tomb.coordinates);
    this.setState({tombs: filteredTombs});
    const coordinates = filteredTombs.map(t => t.coordinates).map(tomb => {
      tomb.lng = tomb.lon;
      delete tomb.lon;
      return tomb;
    });
    this.setState({coordinates});
    console.log(this.state.coordinates);
  }

  render() {
    return (
      <div className="App">
        <MapOfTombs
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyBvTq7xtoNgz7I1mMtLJ6US0PJ14KSZ4zg`}
          loadingElement={<div style={{height: `100%`}} />}
          containerElement={<div style={{height: `600px`, width: `100%`}} />}
          mapElement={<div style={{height: `100%`}} />}
          tombs={this.state.tombs}
        />
      </div>
    );
  }
}

export default App;
