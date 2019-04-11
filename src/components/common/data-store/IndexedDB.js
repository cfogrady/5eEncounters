import { openDB } from 'idb';

let database = null; //loading

let stores = [];

const databaseName = '5eEncounters';

export const addStore = (name, keyData) => {
    stores = stores.concat([{ name, keyData }]);
};

const upgrade = (db, oldVersion, newVersion, transaction) => {
    stores.forEach(store => {
        if(!db.objectStoreNames.contains(store.name)) {
            console.log('Adding datastore: ', store.name);
            db.createObjectStore(store.name, store.keyData);
        }
    });
};

export const openDatabase = _ => {
    return openDB(databaseName, 3, { upgrade, }).then(db => {
        database = db;
    });
};

export const getDatabase = _ => database;
