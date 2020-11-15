import {Attribute} from '../helpers/attributes';
import {Skill} from '../helpers/skills';
import {Faction} from '../helpers/factions';
import {Status, StatusHelper}  from '../helpers/status';
import {Pillar} from '../helpers/pillars';
import {House} from '../helpers/houses';
import {Environment} from '../helpers/environments';
import {PrimaryCareer} from '../helpers/primaryCareers';
import {IconicCareer} from '../helpers/iconicCareers';
import {Education} from '../helpers/educations';
import {KiSchool} from '../helpers/kiSchools';
import {FactionEventModel} from '../helpers/factionEvents';
import {Timeline} from '../helpers/timelines';
import {Apostle} from '../helpers/apostles';
import {HereticRank} from '../helpers/hereticRanks';
import {Endowment} from '../helpers/darkGifts';
import {Clan} from '../helpers/clans';
import {EventModel, AdolescenceEventModel, CareerEventModel} from './eventModel';
import {Source} from '../helpers/sources';

export enum Gender {
    Male,
    Female,
}

export class CharacterAttribute {
    attribute: Attribute;
    value: number;

    constructor(attr: Attribute, val: number) {
        this.attribute = attr;
        this.value = val;
    }
}

export class CharacterSkill {
    skill: Skill;
    expertise: number;
    focus: number;
    isSignature: boolean;

    constructor(skill: Skill, expertise: number, focus: number) {
        this.skill = skill;
        this.expertise = expertise;
        this.focus = focus;
    }
}

export class CharacterTalent {
    rank: number;

    constructor(rank: number) {
        this.rank = rank;
    }
}

export class CharacterCareer {
    career: number;
    years: number;
    isExtended: boolean;
    isIconic: boolean;

    constructor(career: number, years: number) {
        this.career = career;
        this.years = years;
    }
}

export class CharacterWounds {
    head: number;
    arms: number;
    torso: number;
    legs: number;
    serious: number;
    critical: number;

    constructor(head: number, arms: number, torso: number, legs: number, serious: number, critical: number) {
        this.head = head;
        this.arms = arms;
        this.torso = torso;
        this.legs = legs;
        this.serious = serious;
        this.critical = critical;
    }
}

interface IAssetsTrigger {
    age: number;
    assets: number;
}

class Step {
    page: number;
    character: Character;

    constructor(page: number, character: Character) {
        this.page = page;
        this.character = character;
    }
}

export class Character {
    private _attributeInitialValue: number = 5;
    private _steps: Step[];

    public sources: Source[] = [];
    public attributes: CharacterAttribute[] = [];
    public modifiers: CharacterAttribute[] = [];
    public skills: CharacterSkill[] = [];
    public talents: { [name: string]: CharacterTalent } = {};
    public experimentalSubjectTalent: string;
    public faction: Faction;
    public heritage: Faction;
    public birthPlace: string;
    public status: Status;
    public pillar: Pillar;
    public house: House;
    public environment: Environment;
    public education: Education;
    public freeEducations: Education[] = [];
    public reduceBCEducationCost: boolean;
    public reduceApprenticeshipCost: boolean;
    public careers: CharacterCareer[] = [];
    public freeCareers: PrimaryCareer[] = [];
    public prohibitedPrimaryCareers: PrimaryCareer[] = [];
    public prohibitedIconicCareers: IconicCareer[] = [];
    public freeBasicCareer: boolean;
    public factionEvent: string;
    public adolescenceEvent: AdolescenceEventModel;
    public careerEvents: CareerEventModel[] = [];
    public pendingEvents: EventModel[] = [];
    public languages: string[] = [];
    public name: string;
    public age: number;
    public gender: Gender = Gender.Male;
    public chroniclePoints: number;
    public equipment: string[] = [];
    public meleeBonus: number = 0;
    public meleeIncrease: number = 0;
    public rangedBonus: number = 0;
    public rangedIncrease: number = 0;
    public influence: number = 0;
    public influenceIncrease: number = 0;
    private _lifePoints: number = 0;
    public isOptional: boolean;
    public allowHeretics: boolean;
    public hasCriminalRecord: boolean;
    public canRemoveCriminalRecord: boolean;
    public ignoreFired: boolean;
    public eventRerolls: number;
    public earnings: number;
    public assets: number;
    public timeline: Timeline;
    public wounds: CharacterWounds;
    public mentalWounds: number;
    public woundsBonus: number;
    public woundsIncrease: number;
    public seriousWoundsIncrease: number;
    public criticalWoundsIncrease: number;
    public mentalWoundsIncrease: number;
    public assetTriggers: IAssetsTrigger[];
    public fame: number;
    public firstCareerCostReduction: number;
    public rollTwoCareers: boolean;
    public superPoints: number;
    public educationMandatoryAsElective: boolean;
    public decreaseSignatureCap: boolean;
    public kiSchool: KiSchool;
    public noKi: boolean;
    public kiBonus: number;
    public isPersecuted: boolean;
    public ignorePersecution: boolean;
    public numberTalents: number;
    public patron: Apostle;
    public hereticRank: HereticRank;
    public darkGifts: Endowment[];
    public numDarkGifts: number;
    public numBoons: number;
    public stigmata: string[];
    public degeneration: number;
    public protectedHeretic: boolean;
    public transfiguration: number;
    public discoveryPenalty: number;
    public increaseCareerCost: boolean;
    public enforcedCareer: PrimaryCareer;
    public mysticIconicCareerSuccess: boolean;
    public includeMysticTalent: boolean;
    public startingAssetsAttribute: Attribute = Attribute.Personality;
    public clan: Clan;
    public family: number;

    constructor() {
        this.attributes.push(new CharacterAttribute(Attribute.Agility, this._attributeInitialValue));
        this.attributes.push(new CharacterAttribute(Attribute.Awareness, this._attributeInitialValue));
        this.attributes.push(new CharacterAttribute(Attribute.Coordination, this._attributeInitialValue));
        this.attributes.push(new CharacterAttribute(Attribute.Intelligence, this._attributeInitialValue));
        this.attributes.push(new CharacterAttribute(Attribute.Mental_Strength, this._attributeInitialValue));
        this.attributes.push(new CharacterAttribute(Attribute.Personality, this._attributeInitialValue));
        this.attributes.push(new CharacterAttribute(Attribute.Physique, this._attributeInitialValue));
        this.attributes.push(new CharacterAttribute(Attribute.Strength, this._attributeInitialValue));

        for (var i = 0; i < Skill.Max; i++) {
            this.skills.push(new CharacterSkill(i, 0, 0));
        }

        this.timeline = Timeline.DarkSymmetry;
        this.age = 16;
        this.chroniclePoints = 2;
        this.earnings = 0;
        this.assets = 0;
        this.kiBonus = 0;
        this.numDarkGifts = 0;
        this.degeneration = 0;
        this.transfiguration = 0;
        this.discoveryPenalty = 0;
        this.numBoons = 0;

        this.meleeBonus = 0;
        this.rangedBonus = 0;
        this.influence = 0;

        this.wounds = new CharacterWounds(0, 0, 0, 0, 0, 0);
        this.woundsBonus = 0;
        this.woundsIncrease = 0;
        this.seriousWoundsIncrease = 0;
        this.criticalWoundsIncrease = 0;
        this.mentalWoundsIncrease = 0;

        this.assetTriggers = [];
        this.darkGifts = [];
        this.stigmata = [];
        this.sources = [Source.Core];

        this.kiSchool = KiSchool.None;
        this.numberTalents = 0;

        this._steps = [];
    }

    get steps() {
        return this._steps;
    }

    saveStep(page: number) {
        if (!this._steps.some(s => s.page === page)) {
            const copy = this.copy();
            this._steps.push(new Step(page, copy));
        }
    }

    goToStep(page: number) {
        for (var i = this._steps.length - 1; i >= 0; i--) {
            if (this._steps[i].page === page) {
                character = this._steps[i].character;
                character.saveStep(page);
                break;
            }
        }
    }

    hasSource(source: Source) {
        return this.sources.indexOf(source) > -1;
    }

    addSource(source: Source) {
        this.sources.push(source);
    }

    removeSource(source: Source) {
        if (this.hasSource(source)) {
            this.sources.splice(this.sources.indexOf(source), 1);
        }
    }

    getCareerPage(page: number) {
        return page + (Math.max(this.careers.length - 1, 0));
    }

    get lifePoints() {
        return this._lifePoints;
    }

    set lifePoints(val: number) {
        this._lifePoints = val;

        var el = document.getElementById("lifepoints");
        if (el) {
            el.innerText = this._lifePoints.toString();
        }
    }

    calculateModifiers() {
        for (var i = 0; i < 7; i++) {
            this.modifiers[i].value = this.attributes[i].value - 7;
        }
    }

    get numberOfSignatureSkills() {
        var count = 0;
        for (var skill in this.skills) {
            var s = this.skills[skill];
            if (s.isSignature) {
                count++;
            }
        }

        return count;
    }

    addTalent(name: string) {
        var found = false;

        if (name.indexOf('[') > -1) {
            name = name.substr(0, name.indexOf('[') - 1);
        }
        else if (name.indexOf('(') > -1) {
            name = name.substr(0, name.indexOf('(') - 1);
        }

        for (var talent in this.talents) {
            var t = this.talents[talent];
            if (talent === name) {
                t.rank++;
                found = true;
                break;
            }
        }

        if (!found) {
            this.talents[name] = new CharacterTalent(1);
        }
    }

    removeTalent(name: string) {
        if (!name) return;

        if (name.indexOf('[') > -1) {
            name = name.substr(0, name.indexOf('[') - 1);
        }
        else if (name.indexOf('(') > -1) {
            name = name.substr(0, name.indexOf('(') - 1);
        }

        for (var talent in this.talents) {
            var t = this.talents[talent];
            if (talent === name) {
                if (t.rank > 1) {
                    t.rank--;
                }
                else {
                    delete this.talents[name];
                }
                break;
            }
        }
    }

    hasTalent(name: string) {
        var found = false;

        for (var talent in this.talents) {
            var t = this.talents[talent];
            if (talent === name) {
                found = true;
                break;
            }
        }

        return found;
    }

    addLanguage(name: string) {
        var found = false;

        for (var i = 0; i < this.languages.length; i++) {
            if (this.languages[i] === name) {
                found = true;
                break;
            }
        }

        if (!found) {
            this.languages.push(name.replace(" ", ""));
        }
    }

    hasLanguage(name: string) {
        return this.languages.indexOf(name) > -1;
    }

    addEquipment(name: string) {
        if (name !== undefined && name !== "undefined") {
            this.equipment.push(name);
        }
    }

    addEvent(ev: string) {
        this.careerEvents.push(new CareerEventModel(new EventModel(ev, "", ev)));
    }

    addPrimaryCareer(career: PrimaryCareer, years: number) {
        var characterCareer = new CharacterCareer(career, years);
        characterCareer.isIconic = false;
        characterCareer.isExtended = false;

        this.careers.push(characterCareer);
    }

    addIconicCareer(career: number, years: number) {
        var characterCareer = new CharacterCareer(career, years);
        characterCareer.isIconic = true;
        characterCareer.isExtended = false;

        this.careers.push(characterCareer);
    }

    hasPrimaryCareer(career: PrimaryCareer) {
        return this.careers.some(c => c.career === career && !c.isIconic);
    }

    hasIconicCareer(career: IconicCareer) {
        return this.careers.some(c => c.career === career && c.isIconic);
    }

    hasAnIconicCareer() {
        const iconic = this.careers.filter(c => c.isIconic === true);
        return iconic.length > 0;
    }

    isSamurai() {
        return this.status >= Status.Ronin && this.status <= Status.Lord;
    }

    isMystic() {
        return this.careers.some(c =>
            c.isIconic && [2, 89, 111, 112, 113, 114, 115].indexOf(c.career) > -1
        );
    }

    isHeretic() {
        return this.patron !== undefined;
    }

    isBrother() {
        return this.hasTalent("Brother");
    }

    canLearnArt() {
        return (this.faction === Faction.Bauhaus &&
                this.hasSource(Source.Bauhaus) &&
                this.timeline !== Timeline.DarkSymmetry &&
                (
                   ((this.hasPrimaryCareerCount(PrimaryCareer.OrderOfTheCondorRegular, 2) || 
                     this.hasPrimaryCareerCount(PrimaryCareer.OrderOfTheCondorOfficer, 2)) && character.superPoints >= 1) ||
                   (this.hasIconicCareer(IconicCareer.EtoilesMortant) || 
                    this.hasIconicCareer(IconicCareer.StaffAndHandGuardian) || 
                    this.hasIconicCareer(IconicCareer.Templar))
                ))
                || (this.kiSchool === KiSchool.WhiteMystics && this.hasSource(Source.Mishima));
    }

    canLearnKi() {
        return this.faction === Faction.Mishima &&
               this.kiSchool === KiSchool.None && 
               !this.noKi &&
               this.hasSource(Source.Mishima);
    }

    isVAC() {
        return this.pillar === Pillar.VAC_AEM ||
               this.pillar === Pillar.VAC_RDM ||
               this.pillar === Pillar.VAC_SWI;
    }

    hasSuperPoints() {
        return (this.faction === Faction.Bauhaus && character.hasSource(Source.Bauhaus)) ||
               (this.faction === Faction.Whitestar && character.hasSource(Source.Whitestar));
    }

    applyCriminalRecord() {
        StatusHelper.reduceStatus();
        this.addFreeCareer(PrimaryCareer.Criminal);
        this.addFreeCareer(PrimaryCareer.MilitaryBasic);
        this.fame = 0;
    }

    setAssetsTrigger(assets: number, age: number) {
        this.assetTriggers.push({ age: age, assets: assets });
    }

    addFreeEducation(edu: Education) {
        this.freeEducations.push(edu);
    }

    addFreeCareer(career: PrimaryCareer) {
        this.freeCareers.push(career);
    }

    addProhibitedPrimaryCareer(career: PrimaryCareer) {
        this.prohibitedPrimaryCareers.push(career);
    }

    addProhibitedIconicCareer(career: IconicCareer) {
        this.prohibitedIconicCareers.push(career);
    }

    hasDarkGift(gift: Endowment) {
        return this.darkGifts.indexOf(gift) > -1;
    }

    addDarkGift(gift: Endowment) {
        this.darkGifts.push(gift);
    }

    removeDarkGift(gift: Endowment) {
        this.darkGifts.splice(this.darkGifts.indexOf(gift), 1);
    }

    addStigmata(stigmata: string) {
        this.stigmata.push(stigmata);
    }

    update() {
        this.meleeBonus = this.calculateBonus(this.attributes[Attribute.Strength].value) + this.meleeIncrease;
        this.rangedBonus = this.calculateBonus(this.attributes[Attribute.Awareness].value) + this.rangedIncrease;

        if (this.startingAssetsAttribute !== Attribute.Personality) {
            if (Math.max(
                this.attributes[Attribute.Personality].value,
                this.attributes[this.startingAssetsAttribute].value) === this.attributes[Attribute.Personality].value) {
                this.influence = this.calculateBonus(this.attributes[Attribute.Personality].value + this.influenceIncrease);
            }
            else {
                this.influence = this.calculateBonus(this.attributes[this.startingAssetsAttribute].value + this.influenceIncrease);
            } 
        }
        else {
            this.influence = this.calculateBonus(this.attributes[Attribute.Personality].value) + this.influenceIncrease;
        }

        this.wounds = this.calculateWounds();
        this.wounds.arms += this.woundsIncrease;
        this.wounds.torso += this.woundsIncrease;
        this.wounds.legs += this.woundsIncrease;
        this.wounds.head += this.woundsIncrease;
        this.wounds.serious += this.seriousWoundsIncrease;
        this.wounds.critical += this.criticalWoundsIncrease;
        this.mentalWounds = this.attributes[Attribute.Mental_Strength].value + this.mentalWoundsIncrease;

        for (var i = 0; i < this.assetTriggers.length; i++) {
            if (this.assetTriggers[i].age <= this.age) {
                if (!this.hasCriminalRecord) {
                    character.assets += this.assetTriggers[i].assets;
                }
                this.assetTriggers.splice(i, 1);
                break;
            }
        }
    }

    private copy(): Character {
        var character = new Character();
        this._steps.forEach(s => {
            character.steps.push(new Step(s.page, s.character));
        });
        this.sources.forEach(s => {
            character.sources.push(s);
        });
        this.attributes.forEach(a => {
            character.attributes[a.attribute].attribute = a.attribute;
            character.attributes[a.attribute].value = a.value;
        });
        this.modifiers.forEach(a => {
            character.modifiers[a.attribute].attribute = a.attribute;
            character.modifiers[a.attribute].value = a.value;
        });
        this.skills.forEach(s => {
            character.skills[s.skill].skill = s.skill;
            character.skills[s.skill].expertise = s.expertise;
            character.skills[s.skill].focus = s.focus;
            character.skills[s.skill].isSignature = s.isSignature;
        });
        for (var talent in this.talents) {
            const t = this.talents[talent];
            character.talents[talent] = new CharacterTalent(t.rank);
        }
        character.experimentalSubjectTalent = this.experimentalSubjectTalent;
        character.faction = this.faction;
        character.heritage = this.heritage;
        character.factionEvent = this.factionEvent;
        character.environment = this.environment;
        character.birthPlace = this.birthPlace;
        this.languages.forEach(lang => {
            character.addLanguage(lang);
        });
        character.status = this.status;
        character.pillar = this.pillar;
        character.house = this.house;
        character.education = this.education;
        this.careers.forEach(c => {
            character.careers.push(new CharacterCareer(c.career, c.years));
        });
        this.freeEducations.forEach(e => {
            character.freeEducations.push(e);
        });
        character.reduceBCEducationCost = this.reduceBCEducationCost;
        character.reduceApprenticeshipCost = this.reduceApprenticeshipCost;
        this.freeCareers.forEach(c => {
            character.freeCareers.push(c);
        });
        this.prohibitedPrimaryCareers.forEach(c => {
            character.prohibitedPrimaryCareers.push(c);
        });
        this.prohibitedIconicCareers.forEach(c => {
            character.prohibitedIconicCareers.push(c);
        });
        character.freeBasicCareer = this.freeBasicCareer;
        character.adolescenceEvent = this.adolescenceEvent ? new AdolescenceEventModel(new EventModel(this.adolescenceEvent.event, this.adolescenceEvent.trait, this.adolescenceEvent.effect, this.adolescenceEvent.options, this.adolescenceEvent.onOptionSelected, this.adolescenceEvent.detailView)) : null;
        this.careerEvents.forEach(e => {
            character.careerEvents.push(new CareerEventModel(new EventModel(e.event, e.trait, e.effect, e.options, e.onOptionSelected, e.detailView)));
        });
        this.pendingEvents.forEach(e => {
            character.pendingEvents.push(new EventModel(e.event, e.trait, e.effect, e.options, e.onOptionSelected, e.detailView));
        });
        character.age = this.age;
        character.name = this.name;
        character.gender = this.gender;
        character.chroniclePoints = this.chroniclePoints;
        this.equipment.forEach(eq => {
            character.addEquipment(eq);
        });
        character.meleeBonus = this.meleeBonus;
        character.meleeIncrease = this.meleeIncrease;
        character.rangedBonus = this.rangedBonus;
        character.rangedIncrease = this.rangedIncrease;
        character.influence = this.influence;
        character.influenceIncrease = this.influenceIncrease;
        character._lifePoints = this._lifePoints;
        character.isOptional = this.isOptional;
        character.allowHeretics = this.allowHeretics;
        character.hasCriminalRecord = this.hasCriminalRecord;
        character.canRemoveCriminalRecord = this.canRemoveCriminalRecord;
        character.ignoreFired = this.ignoreFired;
        character.eventRerolls = this.eventRerolls;
        character.earnings = this.earnings;
        character.assets = this.assets;
        character.timeline = this.timeline;
        character.woundsBonus = this.woundsBonus;
        character.woundsIncrease = this.woundsIncrease;
        character.seriousWoundsIncrease = this.seriousWoundsIncrease;
        character.criticalWoundsIncrease = this.criticalWoundsIncrease;
        character.mentalWoundsIncrease = this.mentalWoundsIncrease;
        this.assetTriggers.forEach(a => {
            character.assetTriggers.push(a);
        });
        character.fame = this.fame;
        character.firstCareerCostReduction = this.firstCareerCostReduction;
        character.rollTwoCareers = this.rollTwoCareers;
        character.superPoints = this.superPoints;
        character.educationMandatoryAsElective = this.educationMandatoryAsElective;
        character.decreaseSignatureCap = this.decreaseSignatureCap;
        character.kiSchool = this.kiSchool;
        character.noKi = this.noKi;
        character.kiBonus = this.kiBonus;
        character.isPersecuted = this.isPersecuted;
        character.ignorePersecution = this.ignorePersecution;
        character.numberTalents = this.numberTalents;
        character.patron = this.patron;
        character.hereticRank = this.hereticRank;
        this.darkGifts.forEach(g => {
            character.darkGifts.push(g);
        });
        character.numDarkGifts = this.numDarkGifts;
        character.numBoons = this.numBoons;
        this.stigmata.forEach(s => {
            character.stigmata.push(s);
        });
        character.degeneration = this.degeneration;
        character.protectedHeretic = this.protectedHeretic;
        character.transfiguration = this.transfiguration;
        character.discoveryPenalty = this.discoveryPenalty;
        character.increaseCareerCost = this.increaseCareerCost;
        character.enforcedCareer = this.enforcedCareer;
        character.mysticIconicCareerSuccess = this.mysticIconicCareerSuccess;
        character.includeMysticTalent = this.includeMysticTalent;
        character.startingAssetsAttribute = this.startingAssetsAttribute;
        character.clan = this.clan;
        character.family = this.family;

        return character;
    }

    private calculateBonus(sum: number) {
        if (sum >= 16) {
            return 5;
        }
        else if (sum >= 14) {
            return 4;
        }
        else if (sum >= 12) {
            return 3;
        }
        else if (sum >= 10) {
            return 2;
        }
        else if (sum > 8) {
            return 1;
        }

        return 0;
    }

    private calculateWounds() {
        var row = 0;
        const val = this.attributes[Attribute.Physique].value + this.attributes[Attribute.Strength].value;

        if (val < 10) row = 1;
        else if (val <= 11) row = 2;
        else if (val <= 13) row = 3;
        else if (val <= 15) row = 4;
        else if (val <= 17) row = 5;
        else if (val <= 19) row = 6;
        else if (val <= 21) row = 7;
        else if (val <= 23) row = 8;
        else if (val <= 25) row = 9;
        else if (val <= 27) row = 10;
        else if (val <= 29) row = 11;
        else if (val >= 30) row = 12;

        row += this.woundsBonus ? this.woundsBonus : 0;
        if (row > 12) row = 12;
        if (row < 1) row = 1;

        switch (row) {
            case 1: return new CharacterWounds(2, 2, 5, 3, 4, 2);
            case 2: return new CharacterWounds(2, 2, 6, 4, 4, 2);
            case 3: return new CharacterWounds(2, 3, 6, 4, 5, 3);
            case 4: return new CharacterWounds(3, 3, 7, 5, 5, 3);
            case 5: return new CharacterWounds(3, 4, 7, 5, 6, 3);
            case 6: return new CharacterWounds(3, 4, 8, 6, 6, 4);
            case 7: return new CharacterWounds(4, 5, 8, 6, 7, 4);
            case 8: return new CharacterWounds(4, 5, 9, 7, 7, 4);
            case 9: return new CharacterWounds(4, 6, 9, 7, 8, 5);
            case 10: return new CharacterWounds(5, 6, 10, 8, 8, 5);
            case 11: return new CharacterWounds(5, 7, 10, 8, 9, 5);
            case 12: return new CharacterWounds(5, 7, 11, 9, 9, 6);
        }
    }

    private hasPrimaryCareerCount(career: PrimaryCareer, count: number) {
        return this.careers.filter(c => c.career === career && !c.isIconic).length >= count;
    }
}

export let character = new Character();