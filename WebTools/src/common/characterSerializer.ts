import {character, Character, CharacterAttribute, CharacterSkill, CharacterTalent, CharacterCareer, Gender} from './character';
import {SkillsHelper} from '../helpers/skills';
import {FactionsHelper, Faction} from '../helpers/factions';
import {StatusHelper, Status} from '../helpers/status';
import {EnvironmentsHelper, Environment} from '../helpers/environments';
import {EducationsHelper, Education} from '../helpers/educations';
import {PrimaryCareer, PrimaryCareersHelper} from '../helpers/primaryCareers';
import {IconicCareer, IconicCareersHelper} from '../helpers/iconicCareers';
import {EquipmentHelper, IArmorProperties, IWeaponProperties} from '../helpers/equipment';
import {TalentsHelper} from '../helpers/talents';
import {EventModel} from './eventModel';
import {Source} from '../helpers/sources';
import {ClansHelper} from '../helpers/clans';
import {HousesHelper} from '../helpers/houses';
import {Attribute} from '../helpers/attributes';
import {Skill} from '../helpers/skills';

interface ICharacterData {
    name: string;
    value: string;
}

export class CharacterSerializer {
    static serialize(character: Character): ICharacterData[] {
        return [
            { name: "game", value: "MC" },
            { name: "attributes", value: CharacterSerializer.serializeAttributes(character.attributes) },
            { name: "skills", value: CharacterSerializer.serializeSkills(character.skills) },
            { name: "talents", value: CharacterSerializer.serializeTalents(character.talents) },
            { name: "faction", value: CharacterSerializer.serializeFaction(character.faction) },
            { name: "heritage", value: CharacterSerializer.serializeFaction(character.heritage) },
            { name: "status", value: CharacterSerializer.serializeStatus(character.status) },
            { name: "statusextra", value: CharacterSerializer.serializeStatusExtra(character) },
            { name: "environment", value: CharacterSerializer.serializeEnvironment(character.environment) },
            { name: "education", value: CharacterSerializer.serializeEducation(character.education) },
            { name: "careers", value: CharacterSerializer.serializeCareers(character.careers) },
            { name: "name", value: character.name },
            { name: "age", value: character.age.toString() },
            { name: "specialPoints", value: character.chroniclePoints.toString() },
            { name: "equipment", value: CharacterSerializer.serializeEquipment(character.equipment) },
            { name: "weapons", value: CharacterSerializer.serializeWeapons(character.equipment) },
            { name: "armor", value: CharacterSerializer.serializeArmor(character.equipment) },
            { name: "bonuses", value: `${character.meleeBonus},${character.rangedBonus},${character.influence}` },
            { name: "earnings", value: character.earnings.toString() },
            { name: "assets", value: (character.attributes[Attribute.Personality].value + character.assets).toString() },
            { name: "factionevent", value: character.factionEvent },
            { name: "adolescenceEvent", value: character.adolescenceEvent.effect },
            { name: "careerEvents", value: CharacterSerializer.serializeCareerEvents(character.careerEvents) },
            { name: "traits", value: CharacterSerializer.serializeTraits(character) },
            { name: "wounds", value: CharacterSerializer.serializeWounds(character) },
            { name: "spells", value: CharacterSerializer.serializeSpells(character) },
        ];
    }

    private static serializeAttributes(attrs: CharacterAttribute[]) {
        var result = "";
        attrs.forEach(a => {
            result += `${a.value},`;
        });
        return result;
    }

    private static serializeSkills(skills: CharacterSkill[]) {
        var result = "";
        skills.forEach(s => {
            result += `${SkillsHelper.getSkillName(s.skill)},${s.expertise},${s.focus},${s.isSignature ? "1" : "0"}|`;
        });
        return result;
    }

    private static serializeTalents(talents: { [name: string]: CharacterTalent }) {
        var result = "";
        for (var talent in talents) {
            var t = talents[talent];
            result += `${talent},${t.rank > 1 ? t.rank : ""},${SkillsHelper.getSkillName(TalentsHelper.getSkillForTalent(talent))}|`;
        }
        return result;
    }

    private static serializeFaction(faction: Faction) {
        return FactionsHelper.getFaction(faction).name;
    }

    private static serializeStatus(status: Status) {
        return character.faction === Faction.Imperial && character.hasSource(Source.Imperial)
            ? character.status.toString()
            : StatusHelper.getStatus(status).name;
    }

    private static serializeStatusExtra(character: Character) {
        var result = "";

        if (character.clan >= 0) {
            result += `Clan ${ClansHelper.getClan(character.clan).name}`;
        }
        else if (character.house >= 0) {
            result += `House ${HousesHelper.getHouse(character.house).name}`;
        }

        return result;
    }

    private static serializeEnvironment(env: Environment) {
        return EnvironmentsHelper.getEnvironment(env).name;
    }

    private static serializeEducation(edu: Education) {
        return EducationsHelper.getEducation(edu).name;
    }

    private static serializeCareers(careers: CharacterCareer[]) {
        var result = "";
        for (var career in careers) {
            var c = careers[career];
            if (c.isIconic) {
                result += `${IconicCareer[c.career]},${c.years}|`;
            }
            else {
                result += `${PrimaryCareer[c.career]},${c.years}|`;
            }
        }
        return result;
    }

    private static serializeCareerEvents(events: EventModel[]) {
        var result = "";
        events.forEach(e => {
            result += `${e.effect}|`;
        });
        return result;
    }

    private static serializeEquipment(eq: string[]) {
        var result = "";
        eq.forEach(item => {
            if (EquipmentHelper.getWeaponByName(item)) {
                result += `${EquipmentHelper.getWeaponByName(item).sheetName}|`;
            }
            else {
                result += `${item}|`;
            }
        });
        return result;
    }

    private static serializeWeapons(eq: string[]) {
        var result = "";
        eq.forEach(item => {
            if (EquipmentHelper.getWeaponByName(item)) {
                const weapon = EquipmentHelper.getWeaponByName(item);
                const props = weapon.properties as IWeaponProperties;
                result += `${weapon.sheetName},${props.range === undefined ? "R" : props.range},${props.damageBonus},${props.damageDice},${props.mode === undefined ? "" : EquipmentHelper.getMode(props.mode)},${props.encumberance},${props.reliability},${EquipmentHelper.getSize(props.size)},${props.qualities.join(">")}|`;
            }
        });
        return result;
    }
    
    private static serializeArmor(eq: string[]) {
        var result = "";
        var totalAbs = 0;

        eq.forEach(item => {
            if (EquipmentHelper.getArmorByName(item)) {
                const armor = EquipmentHelper.getArmorByName(item);
                const props = armor.properties as IArmorProperties;

                var abs = props.head + props.arms + props.torso + props.legs;

                if (abs > totalAbs) {
                    totalAbs = abs;
                    result = `${item},${props.head},${props.arms},${props.torso},${props.legs},`;
                }
            }
        });
        return result;
    }

    private static serializeTraits(character: Character) {
        var result = "";

        result += character.adolescenceEvent.trait + "|";

        character.careerEvents.forEach(e => {
            if (e.trait !== undefined) {
                result += e.trait + "|";
            }
        });

        return result;
    }

    private static serializeWounds(character: Character) {
        return character.wounds.head + "," +
               character.wounds.torso + "," +
               character.wounds.arms + "," +
               character.wounds.legs + "," +
               character.wounds.serious + "," +
               character.wounds.critical + "," +
               character.mentalWounds;
    }

    private static serializeSpells(character: Character) {
        var result = "";

        if (character.darkGifts.length > 0) {
            character.darkGifts.forEach(g => {
                result += `${g}|`;
            });
        }

        for (var t in character.talents) {
            if (t.indexOf("Prophet") > -1) {
                let spell = t.substring(t.indexOf('(') + 1, t.indexOf(')'));
                result += `${spell}|`;
            }

            if (t.indexOf("Kinetic") > -1) {
                let spell = t.substring(t.indexOf('(') + 1, t.indexOf(')'));
                result += `${spell}|`;
            }

            if (t.indexOf("Deceiver") > -1) {
                let spell = t.substring(t.indexOf('(') + 1, t.indexOf(')'));
                result += `${spell}|`;
            }

            if (t === "Viridulum Minoris") {
                result += "Cloak of Doubt|";
            }

            if (t === "Viridulum Mediatoris") {
                result += "Compel|Seeming|";
            }

            if (t === "Viridulum Majoris") {
                result += "Empathy|Mind-Wall|";
            }

            if (t === "Viridulum Dominus") {
                result += "Glamour|Hymn of Durand|";
            }

            if (t === "Cyaneum Minoris") {
                result += "Zephyr|";
            }

            if (t === "Cyaneum Mediatoris") {
                result += "Deluge|Torrent|";
            }

            if (t === "Cyaneum Majoris") {
                result += "Earthshape|Tremor|";
            }

            if (t === "Cyaneum Dominus") {
                result += "Lightning|Inferno|";
            }

            if (t === "Aureum Minoris") {
                result += "Ease Suffering|";
            }

            if (t === "Aureum Mediatoris") {
                result += "Exorcise Wound|Exorcise Poison|";
            }

            if (t === "Aureum Majoris") {
                result += "Exorcise Disease|Exorcise Madness|";
            }

            if (t === "Aureum Dominus") {
                result += "Exorcise Dark Influence|Exorcise Mortality|";
            }

            if (t === "Rubrum Minoris") {
                result += "Impel|";
            }

            if (t === "Rubrum Mediatoris") {
                result += "Strike|Barrier|";
            }

            if (t === "Rubrum Majoris") {
                result += "Singularity|Levitate|";
            }

            if (t === "Rubrum Dominus") {
                result += "Distortion|Teleportation|";
            }

            if (t === "Aurantium Minoris") {
                result += "Missive|";
            }

            if (t === "Aurantium Mediatoris") {
                result += "Hypnosis|Discern Truth|";
            }

            if (t === "Aurantium Majoris") {
                result += "Communion|Suggestion|";
            }

            if (t === "Aurantium Dominus") {
                result += "Deeper Gaze|Domination|";
            }

            if (t === "Violaceum Minoris") {
                result += "Inner Gaze|";
            }

            if (t === "Violaceum Mediatoris") {
                result += "Paragon|Regeneration|";
            }

            if (t === "Violaceum Majoris") {
                result += "Perfection|Swiftness|";
            }

            if (t === "Violaceum Dominus") {
                result += "Avatar|Void|";
            }

            if (t === "Venetum Minoris") {
                result += "Gaze|";
            }

            if (t === "Venetum Mediatoris") {
                result += "Object Reading|Omen|";
            }

            if (t === "Venetum Majoris") {
                result += "Glimpse|Prescient Dodge|";
            }

            if (t === "Venetum Dominus") {
                result += "True Premonition|Foresight|";
            }
        }

        return result;
    }

    private static serializeArray(array: string[]) {
        var result = "";
        array.forEach(item => {
            result += `${item}|`;
        });
        return result;
    }
}