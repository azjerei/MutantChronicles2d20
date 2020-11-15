import {character} from '../common/character';
import {Skill} from './skills';
import {Apostle} from './apostles';
import {DiceRoller} from './diceRoller';

export enum HereticRank {
    Acolyte = 1,
    Adept,
    Apprentice,
    Novice,
    Postulant,
    Symmetrician,
    Weaver,
    MasterHeretic,
    LordHeretic,
    DarkMagistrate
}

class Requirement {
    skill: Skill;
    expertise: number;
    focus: number;

    constructor(skill: Skill, expertise: number, focus: number) {
        this.skill = skill;
        this.expertise = expertise;
        this.focus = focus;
    }

    isFulfilled() {
        return character.skills[this.skill].expertise >= this.expertise &&
               character.skills[this.skill].focus >= this.focus;
    }
}

class RankModel {
    name: string;
    requirements: Requirement[];

    constructor(name: string, requirements: Requirement[]) {
        this.name = name;
        this.requirements = requirements;
    }

    canEnter() {
        return this.requirements.filter(r => !r.isFulfilled()).length === 0;
    }
}

class Heretics {
    private _ranks: { [id: number]: RankModel } = {
        [HereticRank.Acolyte]: new RankModel(
            "Acolyte",
            []),
        [HereticRank.Adept]: new RankModel(
            "Adept",
            []),
        [HereticRank.Apprentice]: new RankModel(
            "Apprentice",
            [new Requirement(Skill.Willpower, 1, 0)]),
        [HereticRank.Novice]: new RankModel(
            "Novice",
            []),
        [HereticRank.Postulant]: new RankModel(
            "Postulant",
            [new Requirement(Skill.Command, 1, 0)]),
        [HereticRank.Symmetrician]: new RankModel(
            "Symmetrician",
            [new Requirement(Skill.Willpower, 2, 0)]),
        [HereticRank.Weaver]: new RankModel(
            "Weaver",
            [new Requirement(Skill.Command, 2, 0), new Requirement(Skill.Mysticism, 1, 0)]),
        [HereticRank.MasterHeretic]: new RankModel(
            "Master Heretic",
            [new Requirement(Skill.Command, 3, 1)]),
        [HereticRank.LordHeretic]: new RankModel(
            "Lord Heretic",
            [new Requirement(Skill.Command, 4, 2), new Requirement(Skill.Mysticism, 2, 0)]),
        [HereticRank.DarkMagistrate]: new RankModel(
            "Dark Magistrate",
            [new Requirement(Skill.Command, 5, 3), new Requirement(Skill.Mysticism, 3, 0)]),
    };

    getRank(rank: HereticRank) {
        return this._ranks[rank];
    }

    increaseRank() {
        if (character.hereticRank === HereticRank.DarkMagistrate) {
            return;
        }

        const newRank = this._ranks[character.hereticRank + 1];
        if (newRank.canEnter() && this.fulfillsApostleRequirements(character.hereticRank + 1)) {
            character.hereticRank++;
        }
    }

    decreaseRank() {
        if (character.hereticRank === HereticRank.Acolyte) {
            return;
        }

        character.hereticRank--;
    }

    getDarkSymmetryPool(rank: HereticRank) {
        switch (rank) {
            case HereticRank.Adept:
            case HereticRank.Apprentice: return 1;
            case HereticRank.Novice:
            case HereticRank.Postulant: return 2;
            case HereticRank.Symmetrician:
            case HereticRank.Weaver: return 3;
            case HereticRank.MasterHeretic:
            case HereticRank.LordHeretic: return 4;
            case HereticRank.DarkMagistrate: return 5;
        }

        return 0;
    }

    getDarkGifts(rank: HereticRank) {
        switch (rank) {
            case HereticRank.Adept:
            case HereticRank.Apprentice:
            case HereticRank.Novice: return 1;
            case HereticRank.Postulant:
            case HereticRank.Symmetrician: return 2;
            case HereticRank.Weaver: return 3;
            case HereticRank.MasterHeretic: return 4;
            case HereticRank.LordHeretic: return 5;
            case HereticRank.DarkMagistrate: return 6;
        }

        return 0
    }

    getEndowments(rank: HereticRank) {
        switch (rank) {
            case HereticRank.Weaver:
            case HereticRank.MasterHeretic:
            case HereticRank.LordHeretic: return 1;
            case HereticRank.DarkMagistrate: return 2;
        }

        return 0;
    }

    getOptional(rank: HereticRank) {
        switch (rank) {
            case HereticRank.Apprentice: return 2;
            case HereticRank.Novice:
            case HereticRank.Postulant: return 3;
            case HereticRank.Symmetrician:
            case HereticRank.Weaver:
            case HereticRank.MasterHeretic:
            case HereticRank.LordHeretic:
            case HereticRank.DarkMagistrate: return 5;
        }

        return 0;
    }

    private fulfillsApostleRequirements(rank: HereticRank) {
        let skills = [];
        let expertise = this.calculateExpertiseRequirement(rank);

        switch (character.patron) {
            case Apostle.Ilian:
                skills = [Skill.Insight, Skill.Mysticism, Skill.Stealth];
                break;
            case Apostle.Algeroth:
                skills = [Skill.CloseCombat, Skill.Mechanics, Skill.RangedWeapons];
                break;
            case Apostle.Demnogonis:
                skills = [Skill.Medicine, Skill.Resistance, Skill.Treatment];
                break;
            case Apostle.Muawijhe:
                skills = [Skill.Observation, Skill.Psychotherapy];
                break;
            case Apostle.Semai:
                skills = [Skill.Lifestyle, Skill.Persuade, Skill.Stealth];
                break;
        }

        return (skills.filter(s => character.skills[s].expertise >= expertise).length !== 0);
    }

    private calculateExpertiseRequirement(rank: HereticRank) {
        if (character.hereticRank === HereticRank.Apprentice) {
            return 1;
        }
        else if (character.hereticRank === HereticRank.Novice ||
                 character.hereticRank === HereticRank.Symmetrician) {
            return 2;
        }
        else if (character.hereticRank === HereticRank.Weaver) {
            return 3;
        }

        return 0;
    }
}

export const HereticHelper = new Heretics();