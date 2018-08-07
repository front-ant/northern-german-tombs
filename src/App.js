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
      checkboxFilteredTombs: [],
      noResults: false
    };
    // in ES6, _this_ is not autobound to non React methods!
    this.toggleInfos = this.toggleInfos.bind(this);
    this.filterPlaces = this.filterPlaces.bind(this);
    this.filterImg = this.filterImg.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
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
    let inputFilteredTombs;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      inputFilteredTombs = this.state.tombs.filter(tomb =>
        match.test(tomb.title)
      );
      if (inputFilteredTombs.length === 0) {
        this.setState({inputFilteredTombs: [], noResults: true});
      } else {
        this.setState({inputFilteredTombs});
      }
    }
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

  toggleMenu(event) {
    event.preventDefault();
    let hiddenMenu = document.querySelector('.List');
    hiddenMenu.classList.toggle('visible');
  }

  render() {
    // calculate tombs to show based on filter arrays in state

    const {inputFilteredTombs, checkboxFilteredTombs} = this.state;
    let showingTombs;
    if (inputFilteredTombs.length === 0 && checkboxFilteredTombs.length > 0) {
      showingTombs = checkboxFilteredTombs;
    }
    if (checkboxFilteredTombs.length === 0 && inputFilteredTombs.length === 0) {
      showingTombs = this.state.showingTombs;
    }
    if (inputFilteredTombs.length > 0 && checkboxFilteredTombs.length > 0) {
      showingTombs = intersection(inputFilteredTombs, checkboxFilteredTombs);
    }
    if (checkboxFilteredTombs.length === 0 && inputFilteredTombs.length > 0) {
      showingTombs = inputFilteredTombs;
    }
    // don't display any tombs if search was unsuccessful
    if (
      inputFilteredTombs.length === 0 &&
      checkboxFilteredTombs.length === 0 &&
      this.state.noResults
    ) {
      showingTombs = [];
    }

    return (
      <div className="App">
        <div className="toggle-menu">
          <button className="hamburger-menu" onClick={this.toggleMenu}>
            Menu
          </button>
        </div>
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
