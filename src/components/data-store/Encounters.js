import { getDatabase, addStore } from './IndexedDB';

const storeName = 'encounters';

addStore(storeName, {autoIncrement: true});

export const getEncounters = _ => getDatabase().getAll(storeName);

export const addEncounter = encounter => {
    db = getDatabase();
    db.put(storeName, encounter);
};

export const buildEncounter = (
    name,
    monsters,
    actors
    ) => ({
        name,
        monsters,
        actors,
});

export const buildActor = (
    name,
    ac,
    initiativeRoll
    ) => ({
        name,
        hp,
        tmpHp,
        ac,
        initiativeRoll,
        monsterName,
    });
