import React, { Component } from 'react';
import Menu from './components/Menu';
import rootMenu from './RootMenu';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: null,
    };
    this.getDisplayElement = this.getDisplayElement.bind(this);
  }

  menuSelection(value) {
    return _ => console.log(value);
  }

  getDisplayElement() {
    const { currentLocation } = this.state;
    if(!currentLocation) {
      return <Menu menuItems={['Test1', 'Test2']} onSelect={this.menuSelection}/>;
    }

  }

  render() {
    const displayElement = this.getDisplayElement();
    return (
      <div className="App">
        {displayElement}
      </div>
    );
  }
}

export default App;
