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
    const coordinates = tombs.map(tomb => tomb.coordinates);
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
