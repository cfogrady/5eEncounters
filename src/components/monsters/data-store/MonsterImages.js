import { getDatabase, addStore } from '../../common/data-store/IndexedDB';

const storeName = 'monster-images';

addStore(storeName, {autoIncrement: true});

export const addMonsterImage = monsterImage => {
    const db = getDatabase();
    return db.put(storeName, monsterImage);
};

export const removeMonsterImageById = id => {
    const db = getDatabase();
    return db.delete(storeName, id);
};

export const getMonsterImage = id => getDatabase().get(storeName, id);