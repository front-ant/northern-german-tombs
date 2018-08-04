import React, {Component} from 'react';
import './App.css';
import * as APICalls from './APICalls';
import MapContainer from './MapContainer';

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
        <MapContainer tombs={this.state.tombs} />
      </div>
    );
  }
}

export default App;
