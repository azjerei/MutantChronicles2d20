import {character} from '../common/character';
import {Skill} from './skills';
import {Timeline} from './timelines';
import {TalentModel, TalentsHelper} from './talents';

export enum Faction {
    Freelancer,
    Criminal,
    Microcorp,
    Mishima,
    Capitol,
    Bauhaus,
    Imperial,
    Cybertronic,
    Whitestar,
    Brotherhood
}

class FactionModel {
    name: string;
    skills: Skill[];
    talent: TalentModel;
    languages: string[];
    needsHeritage: boolean;

    constructor(name: string, skills: Skill[], talent: TalentModel, languages: string[], needsHeritage: boolean) {
        this.name = name;
        this.skills = skills;
        this.talent = talent;
        this.languages = languages;
        this.needsHeritage = needsHeritage;
    }
}

export class FactionViewModel extends FactionModel {
    id: Faction;

    constructor(id: Faction, base: FactionModel) {
        super(base.name, base.skills, base.talent, base.languages, base.needsHeritage);
        this.id = id;
    }
}

export class Factions {
    private _factions: { [id: number]: FactionModel } = {
        [Faction.Freelancer]: new FactionModel(
            "Freelancer",
            [Skill.Thievery, Skill.Education, Skill.Heritage],
            TalentsHelper.getTalent("Under the Radar"),
            ["Heritage"],
            true),
        [Faction.Criminal]: new FactionModel(
            "Criminal",
            [Skill.Thievery, Skill.Heritage],
            TalentsHelper.getTalent("Under the Radar"),
            ["Heritage"],
            true),
        [Faction.Microcorp]: new FactionModel(
            "Microcorp",
            [Skill.Lifestyle, Skill.Heritage],
            TalentsHelper.getTalent("Under the Radar"),
            ["Heritage"],
            true),
        [Faction.Mishima]: new FactionModel(
            "Mishima",
            [Skill.CloseCombat, Skill.UnarmedCombat],
            TalentsHelper.getTalent("Vassal of Mishima"),
            ["Mishima", "Luna Patois"],
            false),
        [Faction.Capitol]: new FactionModel(
            "Capitol",
            [Skill.RangedWeapons, Skill.Persuade],
            TalentsHelper.getTalent("Shareholder of Capitol"),
            ["Capitol", "Luna Patois"],
            false),
        [Faction.Bauhaus]: new FactionModel(
            "Bauhaus",
            [Skill.Mechanics, Skill.Lifestyle],
            TalentsHelper.getTalent("Subject of Bauhaus"),
            ["Bauhaus", "Luna Patois"],
            false),
        [Faction.Imperial]: new FactionModel(
            "Imperial",
            [Skill.RangedWeapons, Skill.Pilot],
            TalentsHelper.getTalent("Kinsman of Imperial"),
            ["Imperial", "Luna Patois"],
            false),
        [Faction.Cybertronic]: new FactionModel(
            "Cybertronic",
            [Skill.Science, Skill.Stealth],
            TalentsHelper.getTalent("Employee of Cybertronic"),
            ["Bauhaus", "Luna Patois"],
            false),
        [Faction.Whitestar]: new FactionModel(
            "Whitestar",
            [Skill.Survival, Skill.Resistance],
            TalentsHelper.getTalent("Tovarich of Whitestar"),
            ["RussoMandarin", "Luna Patois"],
            false),
        [Faction.Brotherhood]: new FactionModel(
            "The Brotherhood",
            [],
            null,
            [],
            false),
    };

    getFactions() {
        var factions: FactionViewModel[] = [];
        var n = 0;
        for (var faction in this._factions) {
            var f = this._factions[faction];

            if (n !== Faction.Brotherhood) {
                if (n === Faction.Cybertronic && character.timeline === Timeline.DarkSymmetry) {
                    n++;
                    continue;
                }
                factions.push(new FactionViewModel(n, f));
            }

            n++;
        }

        return factions.sort((a, b) => a.name.localeCompare(b.name));
    }

    getFaction(faction: Faction) {
        return this._factions[faction];
    }

    getFactionByName(name: string) {
        var n = 0;
        for (var faction in this._factions) {
            var f = this._factions[faction];
            if (f.name === name) {
                return n;
            }

            n++
        }

        return undefined;
    }

    generateFaction() {
        var roll = Math.floor(Math.random() * 6) + 1;
        var faction: Faction = undefined;

        switch (roll) {
            case 1:
                faction = Faction.Freelancer;
                break;
            case 2:
                faction = Faction.Criminal;
                break;
            case 3:
                faction = Faction.Microcorp;
                break;
            case 4:
            case 5:
            case 6:
                faction = this.generateHeritage();
                break;
        }

        return faction;
    }

    generateHeritage() {
        var roll = Math.floor(Math.random() * 6) + 1;
        var faction: Faction = undefined;

        switch (roll) {
            case 1:
                faction = Faction.Mishima;
                break;
            case 2:
                faction = Faction.Capitol;
                break;
            case 3:
                faction = Faction.Bauhaus;
                break;
            case 4:
                faction = Faction.Imperial;
                break;
            case 5:
                faction = character.timeline !== Timeline.DarkSymmetry ? Faction.Cybertronic : Faction.Capitol;
                break;
            case 6:
                faction = Faction.Whitestar;
                break;
        }

        return faction;
    }

    generateOriginFaction() {
        var roll = Math.floor(Math.random() * 6) + 1;
        var faction: Faction = undefined;

        switch (roll) {
            case 1:
                faction = Faction.Mishima;
                break;
            case 2:
                faction = Faction.Capitol;
                break;
            case 3:
                faction = Faction.Bauhaus;
                break;
            case 4:
                faction = Faction.Imperial;
                break;
            case 5:
                faction = Faction.Capitol;
                break;
            case 6:
                faction = Faction.Whitestar;
                break;
        }

        return faction;
    }

    applyFaction(faction: Faction) {
        var fac = this.getFaction(faction);
        var her = this.getFaction(character.heritage);

        if (fac.name === her.name) {
            fac.skills.forEach(s => {
                character.skills[s].expertise++;
            });
        }

        character.addTalent(fac.talent.name);

        fac.languages.forEach(l => {
            if (l === "Heritage") {
                her.languages.forEach(hl => {
                    character.addLanguage(hl);
                })
            } else {
                character.addLanguage(l);
            }
        });
    }
}

export const FactionsHelper = new Factions();