import {Attribute} from './attributes';

export enum Skill {
    Acrobatics,
    AnimalHandling,
    Athletics,
    CloseCombat,
    Command,
    Education,
    Gunnery,
    HeavyWeapons,
    Insight,
    Lifestyle,
    Linguistics,
    Mechanics,
    Medicine,
    Mysticism,
    Observation,
    Persuade,
    Pilot,
    Psychotherapy,
    RangedWeapons,
    Resistance,
    Science,
    Space,
    Stealth,
    Survival,
    Thievery,
    Treatment,
    UnarmedCombat,
    Vacuum,
    Willpower,
    Max,

    BrotherhoodArt,
    AspectOfKinetics,
    AspectOfMentalism,
    AspectOfExorcism,
    AspectOfManipulation,
    AspectOfChangeling,
    AspectOfElements,
    AspectOfPremonition,

    Heritage,
    None
}

class SkillModel {
    name: string;
    attribute: Attribute;

    constructor(name: string, attr: Attribute) {
        this.name = name;
        this.attribute = attr
    }
}

export class Skills {
    private _skills: { [id: number]: SkillModel } = {
        [Skill.Acrobatics]: new SkillModel("Acrobatics", Attribute.Agility),
        [Skill.AnimalHandling]: new SkillModel("Animal Handling", Attribute.Personality),
        [Skill.Athletics]: new SkillModel("Athletics", Attribute.Strength),
        [Skill.CloseCombat]: new SkillModel("Close Combat", Attribute.Agility),
        [Skill.Command]: new SkillModel("Command", Attribute.Personality),
        [Skill.Education]: new SkillModel("Education", Attribute.Intelligence),
        [Skill.Gunnery]: new SkillModel("Gunnery", Attribute.Coordination),
        [Skill.HeavyWeapons]: new SkillModel("Heavy Weapons", Attribute.Coordination),
        [Skill.Insight]: new SkillModel("Insight", Attribute.Awareness),
        [Skill.Lifestyle]: new SkillModel("Lifestyle", Attribute.Personality),
        [Skill.Linguistics]: new SkillModel("Linguistics", Attribute.Intelligence),
        [Skill.Mechanics]: new SkillModel("Mechanics", Attribute.Intelligence),
        [Skill.Medicine]: new SkillModel("Medicine", Attribute.Intelligence),
        [Skill.Mysticism]: new SkillModel("Mysticism", Attribute.Mental_Strength),
        [Skill.Observation]: new SkillModel("Observation", Attribute.Awareness),
        [Skill.Persuade]: new SkillModel("Persuade", Attribute.Personality),
        [Skill.Pilot]: new SkillModel("Pilot", Attribute.Coordination),
        [Skill.Psychotherapy]: new SkillModel("Psychotherapy", Attribute.Intelligence),
        [Skill.RangedWeapons]: new SkillModel("Ranged Weapons", Attribute.Coordination),
        [Skill.Resistance]: new SkillModel("Resistance", Attribute.Physique),
        [Skill.Science]: new SkillModel("Sciences", Attribute.Intelligence),
        [Skill.Space]: new SkillModel("Space", Attribute.Coordination),
        [Skill.Stealth]: new SkillModel("Stealth", Attribute.Agility),
        [Skill.Survival]: new SkillModel("Survival", Attribute.Intelligence),
        [Skill.Thievery]: new SkillModel("Thievery", Attribute.Awareness),
        [Skill.Treatment]: new SkillModel("Treatment", Attribute.Intelligence),
        [Skill.UnarmedCombat]: new SkillModel("Unarmed Combat", Attribute.Agility),
        [Skill.Vacuum]: new SkillModel("Vacuum", Attribute.Intelligence),
        [Skill.Willpower]: new SkillModel("Willpower", Attribute.Mental_Strength),
    };

    getSkills() {
        let skills: Skill[] = [];
        for (var s = 0; s < Skill.Max; s++) {
            skills.push(s);
        }

        return skills;
    }

    getSkill(skill: Skill) {
        return this._skills[skill];
    }

    getSkillName(skill: Skill) {
        if (skill === Skill.None) {
            return "";
        }
        else if (skill === Skill.Heritage) {
            return "Heritage skills";
        }
        else if (skill === Skill.BrotherhoodArt) {
            return "Brotherhood Art";
        }
        else if (skill === Skill.AspectOfKinetics) {
            return "Aspect of Kinetics";
        }
        else if (skill === Skill.AspectOfMentalism) {
            return "Aspect of Mentalism";
        }
        else if (skill === Skill.AspectOfExorcism) {
            return "Aspect of Exorcism";
        }
        else if (skill === Skill.AspectOfManipulation) {
            return "Aspect of Manipulation";
        }
        else if (skill === Skill.AspectOfChangeling) {
            return "Aspect of Changeling";
        }
        else if (skill === Skill.AspectOfElements) {
            return "Aspect of Elements";
        }
        else if (skill === Skill.AspectOfPremonition) {
            return "Aspect of Premonition";
        }

        return this._skills[skill].name;
    }

    getSkillByName(name: string) {
        var n = 0;
        for (var skill in this._skills) {
            if (this._skills[skill].name === name) {
                return n;
            }

            n++;
        }

        return null;
    }

    getSkillsForAttribute(attr: Attribute) {
        var skills = [];

        for (var skill in this._skills) {
            var s = this._skills[skill];
            if (s.attribute === attr) {
                skills.push(skill);
            }
        }

        return skills;
    }

    getAttributeForSkill(skill: Skill) {
        return this._skills[skill].attribute;
    }

    getSkillNames(skills?: Skill[]) {
        let names = [];

        if (!skills || skills.length === 0) {
            skills = this.getSkills();
        }

        skills.forEach(s => {
            names.push(this.getSkillName(s));
        });

        return names;
    }

    toSkill(name: string) {
        if (name === "Brotherhood Art") {
            return Skill.BrotherhoodArt;
        }
        else if (name === "Aspect of Changeling") {
            return Skill.AspectOfChangeling;
        }
        else if (name === "Aspect of Elements") {
            return Skill.AspectOfElements;
        }
        else if (name === "Aspect of Exorcism") {
            return Skill.AspectOfExorcism;
        }
        else if (name === "Aspect of Kinetics") {
            return Skill.AspectOfKinetics;
        }
        else if (name === "Aspect of Manipulation") {
            return Skill.AspectOfManipulation;
        }
        else if (name === "Aspect of Mentalism") {
            return Skill.AspectOfMentalism;
        }
        else if (name === "Aspect of Premonition") {
            return Skill.AspectOfPremonition;
        }

        for (var i = 0; i < Skill.Heritage; i++) {
            if (this._skills[i] && this._skills[i].name === name) {
                return i as Skill;
            }
        }
    }
}

export const SkillsHelper = new Skills();