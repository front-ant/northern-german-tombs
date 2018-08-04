import React, {Component} from 'react';
import './App.css';
import * as APICalls from './APICalls';
import MapContainer from './MapContainer';
import ListView from './ListView';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tombs: [],
      activeTomb: []
    };
    // in ES6, _this_ is not autobound to non React methods!
    this.toggleInfos = this.toggleInfos.bind(this);
  }
  async componentDidMount() {
    const listOfTombs = await APICalls.getListOfTombs();
    const tombs = await APICalls.getDetailsOfTombs(listOfTombs);
    this.setState({tombs});
  }

  toggleInfos(target, id) {
    target.nextSibling.classList.toggle('hidden');
    let activeTomb = this.state.tombs.filter(t => t.tid === id);
    this.setState({activeTomb});
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
