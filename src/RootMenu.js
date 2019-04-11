import React from 'react';
import MonsterViewer from './components/monsters/MonsterViewer';
import PlayerViewer from './components/players/PlayerViewer';
import EncountersContainer from './components/encounters/EncountersContainer';

const rootMenu = {
    'Encounters' : <EncountersContainer/>,
    'Monster Viewer' : <MonsterViewer/>,
    'Player Viewer' : <PlayerViewer/>,
};

export default rootMenu;