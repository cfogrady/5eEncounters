import React, { Component } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import Menu from './components/menu/Menu';
import rootMenu from './RootMenu';
import { openDatabase } from './components/common/data-store/IndexedDB';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: null,
      databaseLoaded: false,
    };
    this.getDisplayElement = this.getDisplayElement.bind(this);
    this.backToRootMenu = this.backToRootMenu.bind(this);
    this.menuSelection = this.menuSelection.bind(this);
  }

  componentDidMount(props) {
    openDatabase().then(_ => {
      console.log('App DataStore opened');
      this.setState({
        databaseLoaded: true,
      })
    });
  }

  menuSelection(value) {
    return _ => {
      this.setState({
        currentLocation: value
      });
    };
  }

  getDisplayElement() {
    const { currentLocation } = this.state;
    if(!currentLocation) {
      return <Menu menuItems={Object.keys(rootMenu)} onSelect={this.menuSelection}/>;
    }
    return rootMenu[currentLocation];

  }

  backToRootMenu() {
    this.setState({
      currentLocation: null
    });
  }
  render() {
    const displayElement = this.getDisplayElement();
    const { currentLocation, databaseLoaded } = this.state;
    if(!databaseLoaded) {
      return (
        <div className="App">
          <MoonLoader
            sizeUnit={'vmin'}
            size={33}
            loading={!databaseLoaded}
          />
        </div>
      );
    }
    return (
      <div className="App">
        {currentLocation != null && <button onClick={this.backToRootMenu}>Menu</button>}
        {displayElement}
      </div>
    );
  }
}

export default App;
