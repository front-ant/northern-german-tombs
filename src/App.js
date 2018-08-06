import React, {Component} from 'react';
import './App.css';
import * as APICalls from './APICalls';
import MapContainer from './MapContainer';
import ListView from './ListView';
import FilterTombs from './FilterTombs';

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
    const activeTomb = this.state.tombs.filter(t => t.tid === id);
    const [firstActiveTomb] = activeTomb;
    if (firstActiveTomb !== this.state.activeTomb) {
      this.setState({activeTomb: firstActiveTomb});
    } else {
      this.setState({activeTomb: []});
    }
  }

  render() {
    return (
      <div className="App">
        <div className="List">
          <ListView
            tombs={this.state.tombs}
            handleClick={this.toggleInfos}
            activeTomb={this.state.activeTomb}
          />
        </div>
        <div className="Filter">
          <FilterTombs />
        </div>
        <MapContainer
          tombs={this.state.tombs}
          activeTomb={this.state.activeTomb}
          handleClick={this.toggleInfos}
        />
      </div>
    );
  }
}

export default App;
