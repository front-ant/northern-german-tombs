import React, {Component} from 'react';
import './App.css';
import * as APICalls from './APICalls';
import MapContainer from './MapContainer';
import ListView from './ListView';

class App extends Component {
  state = {
    tombs: []
  };
  async componentDidMount() {
    const listOfTombs = await APICalls.getListOfTombs();
    const tombs = await APICalls.getDetailsOfTombs(listOfTombs);
    this.setState({tombs});
  }

  render() {
    return (
      <div className="App">
        <ListView tombs={this.state.tombs} />

        <MapContainer tombs={this.state.tombs} />
      </div>
    );
  }
}

export default App;
