import React, { Component } from 'react';
import Menu from './components/menu/Menu';
import rootMenu from './RootMenu';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: null,
    };
    this.getDisplayElement = this.getDisplayElement.bind(this);
    this.backToRootMenu = this.backToRootMenu.bind(this);
    this.menuSelection = this.menuSelection.bind(this);
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
    const { currentLocation } = this.state;
    return (
      <div className="App">
        {currentLocation != null && <button onClick={this.backToRootMenu}>Menu</button>}
        {displayElement}
      </div>
    );
  }
}

export default App;
