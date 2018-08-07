import React, {Component} from 'react';

class FilterTombs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      filterImg: false
    };
    this.handleCheck = this.handleCheck.bind(this);
    this.handleInput = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({input: event.target.value});
    this.props.handleInput(event.target.value);
  };

  handleCheck = event => {
    this.setState({filterImg: event.target.checked});
    this.props.handleCheck(event.target.checked);
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
