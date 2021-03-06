import { getDatabase, addStore, addUpgrade } from '../../common/data-store/IndexedDB';
import { fromJsonExportFormat } from './MonsterFormatConverter';

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
    reactions: [], //{name, descr}
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

addUpgrade(addSavingThrows, 7);

const convertDamageTypesToStringFields = tnx => {
    getAllMonsters(tnx).then(monsterList => {
        monsterList.forEach(monster => {
            monster.damageImmunities = monster.damageImmunities.reduce((result, current) => {
                return result.length > 0 ? result + ', ' + current : current;
            }, '');
            monster.damageResistances = monster.damageResistances.reduce((result, current) => {
                return result.length > 0 ? result + ', ' + current : current;
            }, '');
            monster.damageVulnerabilities = monster.damageVulnerabilities.reduce((result, current) => {
                return result.length > 0 ? result + ', ' + current : current;
            }, '');
            monster.conditionImmunities = monster.conditionImmunities.reduce((result, current) => {
                return result.length > 0 ? result + ', ' + current : current;
            }, '');
            addMonster(monster, tnx);
        });
    })
};

addUpgrade(convertDamageTypesToStringFields, 5);

const fixXpString = tnx => {
    getAllMonsters(tnx).then(monsterList => {
        monsterList.forEach(monster => {
            monster.xp = parseInt(monster.xp);
            addMonster(monster, tnx);
        });
    })
};

addUpgrade(fixXpString, 6);

const addReactions = tnx => {
    console.log('Adding reactions');
    fetch('https://raw.githubusercontent.com/cfogrady/5eEncounters/master/5e-SRD-Monsters.json')
        .then(response => response.json())
        .then(data => {
          return data.reduce((promise, exportMonster) => {
            if(exportMonster.license) {
              return promise;
            }
            const monster = fromJsonExportFormat(exportMonster);
            buildMonsterId(monster);
            return promise.then(_ => getMonsterById(monster.id).then(oldMonster => {
                if(oldMonster != null) {
                    monster.imageKey = oldMonster.imageKey;
                }
                return addMonster(monster);
            }).catch(err => {
                return addMonster(monster);
            }));
          }, new Promise((resolve, reject) => resolve()));
        });
};

addUpgrade(addReactions, 8, 5);
