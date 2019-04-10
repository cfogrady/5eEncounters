import { getDatabase, addStore } from './IndexedDB';

addStore('monster-images', {keyPath: 'id', autoIncrement: true});

export const addMonsterImage = monster => {
    const db = getDatabase();
    return db.put(storeName, monster);
};

export const removeMonsterImageById = id => {
    const db = getDatabase();
    return db.delete(storeName, id);
};

export const getMonsterImage = id => getDatabase().get(storeName, id);