import { getDatabase, addStore } from '../../common/data-store/IndexedDB';

const storeName = 'players';

addStore(storeName, {keyPath: 'id', autoIncrement: true});

export const addPlayer = player => {
    const db = getDatabase();
    return db.put(storeName, player);
};

export const removePlayerById = id => {
    const db = getDatabase();
    return db.delete(storeName, id);
};

export const getAllPlayers = _ => getDatabase().getAll(storeName);

export const buildEmptyPlayer = _ => ({
    playerName: '',
    characterName: '',
    maxHp: 0,
});
