import { getDatabase, addStore, addUpgrade } from '../../common/data-store/IndexedDB';

const storeName = 'monsters';

addStore(storeName, {keyPath: 'id'});

export const addMonster = (monster, tnx = null) => {
    if(tnx == null) {
        return getDatabase().put(storeName, monster);
    }
    return tnx.objectStore(storeName).put(monster);
};

export const removeMonsterById = id => {
    const db = getDatabase();
    return db.delete(storeName, id);
};

export const getMonsterById = id => {
    const db = getDatabase();
    return db.get(storeName, id);
};

export const getAllMonsters = (tnx = null) => {
    if(tnx == null) {
        return getDatabase().getAll(storeName);
    }
    return tnx.objectStore(storeName).getAll();
};

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
    hitDie: '',
    speed: '',
    savingThrows: [], //{ stat, modifier }
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

const addSavingThrows = tnx => {
    getAllMonsters(tnx).then(monsterList => {
        monsterList.forEach(monster => {
            monster.savingThrows = [];
            addMonster(monster, tnx);
        });
    })
};

addUpgrade(addSavingThrows, 4);
