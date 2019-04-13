import React, { Component } from 'react';
import Menu from './components/menu/Menu';
import rootMenu from './RootMenu';
import LoadingModal from './components/common/modals/LoadingModal';
import { openDatabase } from './components/common/data-store/IndexedDB';
import { fromJsonExportFormat } from './components/monsters/data-store/MonsterFormatConverter';
import { addMonster, buildMonsterId } from './components/monsters/data-store/Monsters';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: null,
      databaseLoaded: false,
      loadingSRDMonsters: false,
    };
    this.getDisplayElement = this.getDisplayElement.bind(this);
    this.backToRootMenu = this.backToRootMenu.bind(this);
    this.menuSelection = this.menuSelection.bind(this);
  }

  componentDidMount(props) {
    const srdListLoadedStr = 'SRD_LIST_LOADED';
    openDatabase().then(_ => {
      console.log('App DataStore opened');
      const srdListLoaded = localStorage.getItem(srdListLoadedStr);
      if(!srdListLoaded) {
        this.setState({
          loadingSRDMonsters: true,
        });
        const importPromise = fetch('https://raw.githubusercontent.com/cfogrady/5eEncounters/master/5e-SRD-Monsters.json')
        .then(response => response.json())
        .then(data => {
          return data.reduce((promise, exportMonster) => {
            if(exportMonster.license) {
              return promise;
            }
            const monster = fromJsonExportFormat(exportMonster);
            buildMonsterId(monster);
            return promise.then(_ => addMonster(monster))
          }, new Promise((resolve, reject) => resolve()));
        });
        return importPromise.then(_ => {
          localStorage.setItem(srdListLoadedStr, true);
          console.log('SRD Monsters imported');
        });
      }
    }).then(_ => {
      this.setState({
        databaseLoaded: true,
        loadingSRDMonsters: false,
      });
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
    const { currentLocation, databaseLoaded, loadingSRDMonsters } = this.state;
    console.log('Render loadingSRD:', loadingSRDMonsters);
    if(!databaseLoaded) {
      return (
        <LoadingModal show={!databaseLoaded}>
          {loadingSRDMonsters && <div style={{marginTop: '1em', color: 'white'}}>One Time Load of SRD Monsters</div>}
        </LoadingModal>
      );
    }
    return (
      <div className="App">
        <div className='app-location'>
          {displayElement}
        </div>
        {currentLocation != null && <button onClick={this.backToRootMenu}>Menu</button>}
      </div>
    );
  }
}

export default App;
