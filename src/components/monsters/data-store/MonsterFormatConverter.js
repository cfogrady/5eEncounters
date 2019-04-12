import { buildEmptyMonster } from './Monsters';
import { calculateXP } from '../UnitConversionCalculator';

export const toJsonExportFormat = monster => {
    const exportMonster = {};
    exportMonster.name = monster.name;
    exportMonster.size = monster.size;
    exportMonster.type = monster.type.toLowerCase();
    exportMonster.subtype = '';
    exportMonster.alignment = monster.alignment.toLowerCase();
    exportMonster.armor_class = monster.ac;
    exportMonster.hit_points = monster.hp;

    return exportMonster;
};

const capitalizeEachWord = string => {
    let words = string.split(' ');
    words = words.map(str => str.charAt(0).toUpperCase() + str.slice(1));
    return words.reduce((resultStr, word)=> {
        return resultStr.length > 0 ? resultStr + ' ' + word : word;
    }, '');
}

const skillList = [
    'acrobatics',
    'animal_handling',
    'arcana',
    'athletics',
    'deception',
    'history',
    'insight',
    'intimidation',
    'investigation',
    'medicine',
    'nature',
    'perception',
    'performance',
    'persuasion',
    'religion',
    'sleight_of_hand',
    'stealth',
    'survival'
];

export const fromJsonExportFormat = exportMonster => {
    const monster = buildEmptyMonster();
    monster.name = exportMonster.name;
    monster.size = exportMonster.size;
    monster.type = capitalizeEachWord(exportMonster.type);
    monster.alignment = capitalizeEachWord(exportMonster.alignment);
    monster.ac = exportMonster.armor_class;
    monster.hp = exportMonster.hit_points;
    monster.hitDie = exportMonster.hit_dice;
    monster.speed = exportMonster.speed;
    monster.stats.str = exportMonster.strength;
    monster.stats.dex = exportMonster.dexterity;
    monster.stats.con = exportMonster.constitution;
    monster.stats.int = exportMonster.intelligence;
    monster.stats.wis = exportMonster.wisdom;
    monster.stats.cha = exportMonster.charisma;
    if(exportMonster.strength_save) {
        monster.savingThrows.push({stat: 'STR', modifier: exportMonster.strength_save});
    }
    if(exportMonster.dexterity_save) {
        monster.savingThrows.push({stat: 'DEX', modifier: exportMonster.dexterity_save});
    }
    if(exportMonster.constitution_save) {
        monster.savingThrows.push({stat: 'CON', modifier: exportMonster.constitution_save});
    }
    if(exportMonster.intelligence_save) {
        monster.savingThrows.push({stat: 'INT', modifier: exportMonster.intelligence_save});
    }
    if(exportMonster.wisdom_save) {
        monster.savingThrows.push({stat: 'WIS', modifier: exportMonster.wisdom_save});
    }
    if(exportMonster.charisma_save) {
        monster.savingThrows.push({stat: 'CHA', modifier: exportMonster.charisma_save});
    }
    skillList.forEach(skill => {
        if(exportMonster[skill]) {
            const skillName = capitalizeEachWord(skill.replace('_', ' '));
            monster.skills.push({skill: skillName, modifier: exportMonster[skill]});
        }
    });
    monster.damageVulnerabilities = exportMonster.damage_vulnerabilities ;
    monster.damageResistances = exportMonster.damage_resistances; 
    monster.damageImmunities = exportMonster.damage_immunities;
    monster.conditionImmunities = exportMonster.condition_immunities;
    monster.senses = exportMonster.senses;
    monster.languages = exportMonster.languages;
    monster.xp = calculateXP(exportMonster.challenge_rating);
    if(exportMonster.special_abilities) {
        monster.abilities = exportMonster.special_abilities.map(specialAbility => ({
            name: specialAbility.name,
            descr: specialAbility.desc,
        }));
    }
    if(exportMonster.actions) {
        monster.actions = exportMonster.actions.map(action => ({
            name: action.name,
            descr: action.desc,
        }));
    }
    if(exportMonster.legendary_actions) {
        monster.legendaryActions.actions = exportMonster.legendary_actions.map(action => ({
            name: action.name,
            descr: action.desc,
        }));
    }
}
