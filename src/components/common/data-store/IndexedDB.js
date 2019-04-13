import { openDB } from 'idb';

const databaseName = '5eEncounters';

const dbVersion = 6;

let database = null; //loading

let stores = [];

let upgrades = [];

export const addStore = (name, keyData) => {
    stores = stores.concat([{ name, keyData }]);
};

export const addUpgrade = (upgradeFunc, version) => {
    upgrades = upgrades.concat([{ upgradeFunc, version }]);
}

const upgrade = (db, oldVersion, newVersion, transaction) => {
    stores.forEach(store => {
        if(!db.objectStoreNames.contains(store.name)) {
            console.log('Adding datastore: ', store.name);
            db.createObjectStore(store.name, store.keyData);
        }
    });
    for(let i = oldVersion + 1; i <= newVersion; i++) {
        let versionUpgrades = upgrades.filter(upgrade => upgrade.version === i);
        versionUpgrades.forEach(upgrade => upgrade.upgradeFunc(transaction));
    }
};

export const openDatabase = _ => {
    return openDB(databaseName, dbVersion, { upgrade, }).then(db => {
        database = db;
    });
};

export const getDatabase = _ => database;
