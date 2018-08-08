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
      noResults: false,
      error: false,
      isLoading: false
    };
    // in ES6, _this_ is not autobound to non React methods!
    this.toggleInfos = this.toggleInfos.bind(this);
    this.filterPlaces = this.filterPlaces.bind(this);
    this.filterImg = this.filterImg.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  async componentDidMount() {
    this.setState({isLoading: true});
    // Fetch API data
    try {
      const listOfTombs = await APICalls.getListOfTombs();
      const tombs = await APICalls.getDetailsOfTombs(listOfTombs);
      this.setState({tombs});
      this.setState({showingTombs: tombs});
      this.setState({isLoading: false});
    } catch (error) {
      this.setState({error, isLoading: false});
    }
  }

  // The tomb that is selected via the list or the map marker becomes the active tomb.
  toggleInfos(target, id) {
    const activeTomb = this.state.tombs.filter(t => t.tid === id);
    const [firstActiveTomb] = activeTomb;
    if (firstActiveTomb !== this.state.activeTomb) {
      this.setState({activeTomb: firstActiveTomb});
    } else {
      this.setState({activeTomb: []});
    }
  }

  // Filter list of tombs and markers based on text input
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

  // Filter list of tombs and markers based on an available unique image.
  // (Filter out the ones just using Wikipedia's placeholder image)

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

  // Show list of tombs after click on menu button in mobile view

  toggleMenu(event) {
    event.preventDefault();
    let hiddenMenu = document.querySelector('.List');
    let mapField = document.querySelector('.Map');
    hiddenMenu.classList.toggle('enter-menu');
    mapField.classList.toggle('enter-menu');
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

    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }
    if (this.state.error) {
      return (
        <div>
          <p>Error fetching the tomb locations!</p>
          {
            //At least show an empty map if the API calls to Wikipedia failed
          }
          <MapContainer tombs={[]} activeTomb={[]} handleClick={{}} />
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className="toggle-menu" tabIndex="-1">
            <button className="hamburger-menu" onClick={this.toggleMenu}>
              Menu
            </button>
          </div>
          <main>
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
          </main>
        </div>
      );
    }
  }
}

export default App;
