import { getDatabase, addStore } from '../../common/data-store/IndexedDB';

const storeName = 'monsters';

addStore(storeName, {keyPath: 'id'});

export const addMonster = monster => {
    const db = getDatabase();
    return db.put(storeName, monster);
};

export const removeMonsterById = id => {
    const db = getDatabase();
    return db.delete(storeName, id);
};

export const getAllMonsters = _ => getDatabase().getAll(storeName);

export const buildEmptyMonster = _ => ({
    name: '',
    size: 'None',
    type: 'None',
    alignment: 'None',
    stats: {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0,
    },
    skills: [], //{ skill, modifier }
    xp: 0,
    ac: 0,
    hp: 0,
    speed: 0,
    damageVulnerabilities: [],
    damageImmunities: [],
    damageResistances: [],
    conditionImmunities: [],
    senses: '',
    languages: '',
    actions: [], //{name, descr}
    abilities: [], //{name, descr}
    legendaryActions: {
        summary: '',
        actions: [],
    },
    description: '',
    imageKey: null,
});

export const buildMonsterId = monster => {
    monster.id = monster.name + monster.xp;
    return monster;
};
