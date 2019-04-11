import { getMonsterById } from '../../monsters/data-store/Monsters';
import { getPlayerById } from '../../players/data-store/Players';
import { has } from 'underscore';

export const buildUseableEncounter = storedEncounter => {
    const encounter = {};
    encounter.id = storedEncounter.id;
    encounter.name = storedEncounter.name;
    encounter.monsters = []; // {count: 1, monster}
    encounter.players = []; //players
    const monsterPromise = storedEncounter.monsters.reduce((accumulator, element) => {
        const promiseForNextMonster = getMonsterById(element.id).then(monster => {
            encounter.monsters.push({
                count: element.count,
                monster,
            });
        });
        if(accumulator == null) {
           return promiseForNextMonster; 
        } else {
            return accumulator.then( _ => promiseForNextMonster);
        }
    }, new Promise((resolve, rejct) => resolve()));
    return monsterPromise.then( _ => {
        return storedEncounter.players.reduce((accumulator, element) => {
            const promiseForNextPlayer = getPlayerById(element).then(player => {
                encounter.players.push(player);
            });
            if(accumulator == null) {
                return promiseForNextPlayer;
            }
            return accumulator.then(_ => promiseForNextPlayer);
        }, new Promise((resolve, rejct) => resolve()));
    }).then(_ => encounter);
}

export const buildStorableEncounter = useableEncounter => {
    const encounter = {};
    encounter.name = useableEncounter.name;
    encounter.monsters = [];
    encounter.players = [];
    if(has(useableEncounter, 'id')) {
        encounter.id = useableEncounter.id;
    }
    useableEncounter.players.forEach(player => encounter.players.push(player.id));
    useableEncounter.monsters.forEach(monsterGroup => encounter.monsters.push({
        id: monsterGroup.monster.id,
        count: monsterGroup.count,
    }));
    return encounter;
}