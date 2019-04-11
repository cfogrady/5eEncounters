import { getDatabase, addStore } from '../../common/data-store/IndexedDB';

const storeName = 'encounters';

addStore(storeName, {keyPath: 'id', autoIncrement: true});

export const getAllEncounters = _ => getDatabase().getAll(storeName);

export const addEncounter = encounter => {
    const db = getDatabase();
    return db.put(storeName, encounter);
};

export const removeEncounterById = id => {
    const db = getDatabase();
    return db.delete(storeName, id);
};

export const buildEmptyEncounter = _ => ({
        name: '', //name of the encounter
        monsters: [], //{id: monsterId, count: monstersInEncounter}
        players: [], //playerIds
});

