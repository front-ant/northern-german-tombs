import React, {Component} from 'react';
import './App.css';
import * as APICalls from './APICalls';
import MapContainer from './MapContainer';
import ListView from './ListView';

class App extends Component {
  state = {
    tombs: [],
    activeTomb: {}
  };
  async componentDidMount() {
    const listOfTombs = await APICalls.getListOfTombs();
    const tombs = await APICalls.getDetailsOfTombs(listOfTombs);
    this.setState({tombs});
  }

  toggleInfos(target) {
    target.nextSibling.classList.toggle('hidden');
    console.log(target.nextSibling.classList);
  }

  render() {
    return (
      <div className="App">
        <ListView tombs={this.state.tombs} handleClick={this.toggleInfos} />

        <MapContainer
          tombs={this.state.tombs}
          activeTomb={this.state.activeTomb}
        />
      </div>
    );
  }
}

export default App;
