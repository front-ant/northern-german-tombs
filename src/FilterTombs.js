import React, {Component} from 'react';

class FilterTombs extends Component {
  state = {
    input: '',
    filterImg: false
  };

  handleChange = event => {
    this.setState({input: event.target.value});
    this.props.handleInput(event.target.value);
  };

  handleCheck = event => {
    if (event.target.checked) {
      this.setState({filterImg: true});
      this.props.handleCheck(true);
    } else {
      this.setState({filterImg: false});
      this.props.handleCheck(false);
    }
  };

  render() {
    return (
      <div className="filter-bar">
        <input
          className="text-filter"
          type="text"
          placeholder="Search for a specific place in Lüneburg County"
          value={this.state.input}
          onChange={this.handleChange}
        />
        <div className="checkboxes">
          <input
            className="filter-checkbox"
            type="checkbox"
            name="Filter images"
            checked={this.state.filterImg}
            onChange={this.handleCheck}
          />
          <span className="checkbox-text">Only show tombs with images</span>
        </div>
      </div>
    );
  }
}

export default FilterTombs;
