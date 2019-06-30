import { getDatabase, addStore } from '../../common/data-store/IndexedDB';

const storeName = 'currentEncounter';

addStore(storeName, {keyPath: 'id', autoIncrement: true});

export const getCurrentEncounter = _ => {
    return getDatabase().getAll(storeName).then(
        encounters => encounters == null || encounters.length == 0 ? null : encounters[0]
    );
};

export const updateCurrentEncounter = currentEncounterState => {
    const db = getDatabase();
    db.update
    return db.put(storeName, currentEncounterState);
};

export const clearCurrentEncounter = _ => {
    const db = getDatabase();
    return db.clear();
};


