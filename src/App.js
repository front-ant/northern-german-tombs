import React, {Component} from 'react';
import './App.css';
import MapOfTombs from './MapOfTombs';
import * as APICalls from './APICalls';

class App extends Component {
  state = {
    tombs: []
  };
  async componentDidMount() {
    const listOfTombs = await APICalls.getListOfTombs();
    const tombs = await APICalls.getDetailsOfTombs(listOfTombs);
    this.setState({tombs});
    console.log(this.state.tombs);
  }

  render() {
    return (
      <div className="App">
        <MapOfTombs
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyBvTq7xtoNgz7I1mMtLJ6US0PJ14KSZ4zg`}
          loadingElement={<div style={{height: `100%`}} />}
          containerElement={<div style={{height: `600px`, width: `100%`}} />}
          mapElement={<div style={{height: `100%`}} />}
        />
      </div>
    );
  }
}

export default App;
