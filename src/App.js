import React, {Component} from 'react';
import './App.css';
import * as APICalls from './APICalls';
import MapContainer from './MapContainer';

class App extends Component {
  state = {
    tombs: [],
    coordinates: []
  };
  async componentDidMount() {
    const listOfTombs = await APICalls.getListOfTombs();
    const tombs = await APICalls.getDetailsOfTombs(listOfTombs);
    const filteredTombs = tombs.filter(tomb => tomb.coordinates);
    const coordinates = filteredTombs.map(t => t.coordinates).map(tomb => {
      tomb.lng = tomb.lon;
      delete tomb.lon;
      return tomb;
    });
    this.setState({coordinates});
  }

  render() {
    return (
      <div className="App">
        <MapContainer coordinates={this.state.coordinates} />
      </div>
    );
  }
}

export default App;
