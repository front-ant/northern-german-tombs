import React, {Component} from 'react';

class FilterTombs extends Component {
  state = {input: ''};

  render() {
    return (
      <div className="filter-bar">
        <input
          className="text-filter"
          type="text"
          placeholder="Search for a specific place in Lüneburg County"
          value={this.state.input}
        />
        <div className="checkboxes">
          <input
            className="filter-checkbox"
            type="checkbox"
            name="Filter images"
          />
          <span className="checkbox-text">Only show tombs with images</span>
        </div>
        <div className="checkboxes">
          <input
            className="english-checkbox"
            type="checkbox"
            name="Filter English texts"
          />
          <span className="checkbox-text">
            Only show tombs with descriptions in English
          </span>
        </div>
      </div>
    );
  }
}

export default FilterTombs;
