import React, {Component} from 'react';
import './App.css';
import * as APICalls from './APICalls';
import MapContainer from './MapContainer';
import ListView from './ListView';
import FilterTombs from './FilterTombs';
import escapeRegExp from 'escape-string-regexp';
import {intersection} from 'underscore';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tombs: [],
      activeTomb: [],
      showingTombs: [],
      inputFilteredTombs: [],
      checkboxFilteredTombs: []
    };
    // in ES6, _this_ is not autobound to non React methods!
    this.toggleInfos = this.toggleInfos.bind(this);
    this.filterPlaces = this.filterPlaces.bind(this);
    this.filterImg = this.filterImg.bind(this);
  }
  async componentDidMount() {
    const listOfTombs = await APICalls.getListOfTombs();
    const tombs = await APICalls.getDetailsOfTombs(listOfTombs);
    this.setState({tombs});
    this.setState({showingTombs: tombs});
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

  filterPlaces(query) {
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      this.setState(state => ({
        inputFilteredTombs: state.tombs.filter(tomb => match.test(tomb.title))
      }));
    } else {
      this.setState({inputFilteredTombs: []});
    }
    console.log(this.state.inputFilteredTombs);
  }

  filterImg(checkedValue) {
    let checkboxFilteredTombs;
    if (checkedValue) {
      checkboxFilteredTombs = this.state.showingTombs.filter(
        tomb =>
          tomb.thumbnail.source !==
          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Lower_Saxony_relief_location_map.jpg/320px-Lower_Saxony_relief_location_map.jpg'
      );
    } else {
      checkboxFilteredTombs = [];
    }
    this.setState({checkboxFilteredTombs});
  }

  render() {
    let showingTombs;
    if (
      this.state.inputFilteredTombs.length === 0 &&
      this.state.checkboxFilteredTombs.length > 0
    ) {
      showingTombs = this.state.checkboxFilteredTombs;
    }
    if (
      this.state.checkboxFilteredTombs.length === 0 &&
      this.state.inputFilteredTombs.length === 0
    ) {
      showingTombs = this.state.showingTombs;
    }
    if (
      this.state.inputFilteredTombs.length > 0 &&
      this.state.checkboxFilteredTombs.length > 0
    ) {
      showingTombs = intersection(
        this.state.inputFilteredTombs,
        this.state.checkboxFilteredTombs
      );
    }
    if (
      this.state.checkboxFilteredTombs.length === 0 &&
      this.state.inputFilteredTombs.length > 0
    ) {
      showingTombs = this.state.inputFilteredTombs;
    }

    return (
      <div className="App">
        <div className="List">
          <ListView
            tombs={showingTombs}
            handleClick={this.toggleInfos}
            activeTomb={this.state.activeTomb}
          />
        </div>
        <div className="Filter">
          <FilterTombs
            handleInput={this.filterPlaces}
            handleCheck={this.filterImg}
          />
        </div>
        <MapContainer
          tombs={showingTombs}
          activeTomb={this.state.activeTomb}
          handleClick={this.toggleInfos}
        />
      </div>
    );
  }
}

export default App;
