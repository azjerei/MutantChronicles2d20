import {Skill} from './skills';
import {KiPower, KiPowersHelper} from './ki';
import {PrimaryCareer} from './primaryCareers';
import {IconicCareer} from './iconicCareers';
import {character} from '../common/character';

export enum KiSchool {
    None,
    Blademaster,
    CelestialPath,
    DarkMystics,
    Deathbringer,
    DemonHunter,
    DragonBoxing,
    GreyMystics,
    HuntingTiger,
    StormWarrior,
    TattooedMan,
    WhiteMystics
}

interface ISchoolRequirement {
    isFulfilled(): boolean;
}

class SamuraiRequirement implements ISchoolRequirement {
    isFulfilled() {
        return character.isSamurai();
    }
}

class CommonerRequirement implements ISchoolRequirement {
    isFulfilled() {
        return !character.isSamurai();
    }
}

class CriminalRecordOrCareerRequirement implements ISchoolRequirement {
    isFulfilled() {
        return character.hasCriminalRecord || character.hasPrimaryCareer(PrimaryCareer.Criminal);
    }
}

class IconicCareerRequirement implements ISchoolRequirement {
    private _career: IconicCareer;

    constructor(career: IconicCareer) {
        this._career = career;
    }

    isFulfilled() {
        return character.hasIconicCareer(this._career);
    }
}

class NotStudentOfSchoolRequirement implements ISchoolRequirement {
    private _school: KiSchool;

    constructor(school: KiSchool) {
        this._school = school;
    }

    isFulfilled() {
        return character.kiSchool !== this._school;
    }
}

interface KiPowerRequirement {
    power: KiPower;
    requirement: KiPower;
}

class KiSchoolModel {
    name: string;
    description: string;
    requirements: ISchoolRequirement[];
    entrySkill: Skill;
    entryDifficulty: number;
    powers: KiPowerRequirement[];

    constructor(name: string, description: string, requirements: ISchoolRequirement[], entrySkill: Skill, entryDifficulty: number, powers: KiPowerRequirement[]) {
        this.name = name;
        this.description = description;
        this.requirements = requirements;
        this.entrySkill = entrySkill;
        this.entryDifficulty = entryDifficulty;
        this.powers = powers;
    }
}

export class KiSchoolViewModel extends KiSchoolModel {
    id: KiSchool;

    constructor(id: KiSchool, base: KiSchoolModel) {
        super(base.name, base.description, base.requirements, base.entrySkill, base.entryDifficulty, base.powers);
        this.id = id;
    }
}

class KiSchools {
    private _schools: { [id: number]: KiSchoolModel } = {
        [KiSchool.Blademaster]: new KiSchoolModel(
            "Blademaster",
            "Founded during the Great Rebellion by the legendary samurai Narita, the Blademaster school has become the most common and popular among the Mishima ruling class. This school teaches all the standard techniques that a samurai may expect to encounter in duels with his peers.",
            [new SamuraiRequirement()],
            Skill.None,
            0,
            [
                { power: KiPower.WeaponLink, requirement: KiPower.None },
                { power: KiPower.ToadsGreatLeap, requirement: KiPower.WeaponLink },
                { power: KiPower.YoramasDeflectingHands, requirement: KiPower.WeaponLink },
                { power: KiPower.YizosPrescience, requirement: KiPower.WeaponLink },
                { power: KiPower.NomurasQuickenedStep, requirement: KiPower.ToadsGreatLeap }
            ]),
        [KiSchool.CelestialPath]: new KiSchoolModel(
            "Celestial Path",
            "The Celestial Path school teaches its followers restraint, self control, and peacefulness. Its followers are enjoined to use their powers and abilities only in self-defence. This has made the school popular with those commoners who seek out Ki powers and want to be able to defend themselves without attracting too much attention from vengeful class-conscious samurai.",
            [new CommonerRequirement()],
            Skill.Willpower,
            1,
            [
                { power: KiPower.HandsOfStone, requirement: KiPower.None },
                { power: KiPower.MongooseDodge, requirement: KiPower.HandsOfStone },
                { power: KiPower.DragonSpirit, requirement: KiPower.HandsOfStone },
                { power: KiPower.YizosPrescience, requirement: KiPower.WeaponLink },
                { power: KiPower.NomurasQuickenedStep, requirement: KiPower.MongooseDodge },
                { power: KiPower.SelfHealing, requirement: KiPower.DragonSpirit }
            ]),
        [KiSchool.DarkMystics]: new KiSchoolModel(
            "Dark Mystics",
            "This school is actually a front for a cult of the Dark Apostles.",
            [new IconicCareerRequirement(IconicCareer.Heretic)],
            Skill.None,
            0,
            []),
        [KiSchool.Deathbringer]: new KiSchoolModel(
            "Deathbringer",
            "The techniques of the Deathbringer school are the preserve of the Shadow Walker Cult. The training focuses on stealth, evasion, and cold-blooded murder.",
            [new IconicCareerRequirement(IconicCareer.ShadowWalkerCultist)],
            Skill.Willpower,
            1,
            [
                { power: KiPower.ChameleonSkin, requirement: KiPower.None },
                { power: KiPower.CrowsPiercingGlance, requirement: KiPower.ChameleonSkin },
                { power: KiPower.Catsight, requirement: KiPower.ChameleonSkin },
                { power: KiPower.MongooseArtfulDodge, requirement: KiPower.ChameleonSkin },
                { power: KiPower.Deathblow, requirement: KiPower.CrowsPiercingGlance },
                { power: KiPower.StrikeFromBeyond, requirement: KiPower.Deathblow },
                { power: KiPower.BatsSonarSense, requirement: KiPower.Catsight },
                { power: KiPower.ShadowWalk, requirement: KiPower.MongooseArtfulDodge },
                { power: KiPower.Teleport, requirement: KiPower.ShadowWalk }
            ]),
        [KiSchool.DemonHunter]: new KiSchoolModel(
            "Demon Hunter",
            "This school, found only on the Forbidden Isle on Mercury, teaches the ancient and mysterious art of hunting and killing demons.",
            [new IconicCareerRequirement(IconicCareer.DemonHunter)],
            Skill.None,
            0,
            [
                { power: KiPower.AuraOfMysticalResistance, requirement: KiPower.None },
                { power: KiPower.Lightsleep, requirement: KiPower.AuraOfMysticalResistance },
                { power: KiPower.BatsSonarSense, requirement: KiPower.AuraOfMysticalResistance },
                { power: KiPower.FlyingViperStyle, requirement: KiPower.AuraOfMysticalResistance },
                { power: KiPower.DiamondWill, requirement: KiPower.Lightsleep },
                { power: KiPower.YurojisTrueSight, requirement: KiPower.BatsSonarSense},
                { power: KiPower.Teleport, requirement: KiPower.YurojisTrueSight }
            ]),
        [KiSchool.DragonBoxing]: new KiSchoolModel(
            "Dragon Boxing",
            "The Dragon Boxers is one of the most notorious of all martial arts schools. Its members meet in secret dojos throughout the Mishima realms under the aegis of the Black Dragon Society. It accepts only commoners as students, and its members have a fearsome reputation as brawlers and fist fighters. Many members go on to become Triad enforcers. The Dragon Boxers school is the sworn enemy of the Storm Warrior school.",
            [new CommonerRequirement(), new CriminalRecordOrCareerRequirement(), new NotStudentOfSchoolRequirement(KiSchool.StormWarrior)],
            Skill.Willpower,
            1,
            [
                { power: KiPower.HandsOfStone, requirement: KiPower.None },
                { power: KiPower.HoodedViperStyle, requirement: KiPower.HandsOfStone },
                { power: KiPower.ToronagasRagingMight, requirement: KiPower.HoodedViperStyle },
                { power: KiPower.MonkeysFoot, requirement: KiPower.HandsOfStone },
                { power: KiPower.MaramasPerfectBalance, requirement: KiPower.MonkeysFoot },
                { power: KiPower.ToadsGreatLeap, requirement: KiPower.MaramasPerfectBalance },
                { power: KiPower.DragonSpirit, requirement: KiPower.HandsOfStone }
            ]),
        [KiSchool.GreyMystics]: new KiSchoolModel(
            "Grey Mystics",
            "Famed as scholars of the abstruse, the Grey Mystics pursue the more esoteric reaches of the Ki power spectrum. They teach both samurai and commoners, and are a unique exception to the law governing commoners and Ki powers. Commoners may join the Grey Mystics but must swear a more strict oath of allegiance to their samurai lord, wear an identifying marker at all times, and report for additional duties for six hours per week during their free time.",
            [],
            Skill.Willpower,
            2,
            [
                { power: KiPower.SupremeConcentration, requirement: KiPower.None },
                { power: KiPower.YizosPrescience, requirement: KiPower.SupremeConcentration },
                { power: KiPower.YurojisTrueSight, requirement: KiPower.YizosPrescience },
                { power: KiPower.AuraOfMysticalResistance, requirement: KiPower.SupremeConcentration },
                { power: KiPower.Teleport, requirement: KiPower.AuraOfMysticalResistance},
                { power: KiPower.CleansePoison, requirement: KiPower.SupremeConcentration },
                { power: KiPower.SelfHealing, requirement: KiPower.CleansePoison },
                { power: KiPower.SuspendedAnimation, requirement: KiPower.SelfHealing},
            ]),
        [KiSchool.HuntingTiger]: new KiSchoolModel(
            "Hunting Tiger",
            "The school of the Hunting Tiger teaches its disciples to attack swiftly, stealthily, and only when success is all but guaranteed. It relies on agility and lightning-fast strikes. Hunting Tiger techniques are often taught by solitary wandering masters, and the school accepts both samurai and commoner students.Samurai tend to learn a version that focuses on sword use, while commoners usually learn the school’s unarmed techniques.",
            [],
            Skill.Willpower,
            1,
            [
                { power: KiPower.MaramasPerfectBalance, requirement: KiPower.None },
                { power: KiPower.ChameleonSkin, requirement: KiPower.MaramasPerfectBalance },
                { power: KiPower.RhinoImpregnableSkin, requirement: KiPower.ChameleonSkin },
                { power: KiPower.MonkeysFoot, requirement: KiPower.ChameleonSkin },
                { power: KiPower.ToadsGreatLeap, requirement: KiPower.MonkeysFoot },
                { power: KiPower.Teleport, requirement: KiPower.ToadsGreatLeap },
                { power: KiPower.Catsight, requirement: KiPower.MaramasPerfectBalance },
            ]),
        [KiSchool.StormWarrior]: new KiSchoolModel(
            "Storm Warrior",
            "Attack is the best form of defence and only the strong survive; such is the philosophy of the Storm Warrior school. Storm Warrior masters concentrate on pure combat ability, and its disciples are famous for their brutality in war and everyday life. This school’s masters will accept both samurai and commoners as students. The Storm Warriors are the sworn enemies of the Dragon Boxers.",
            [new NotStudentOfSchoolRequirement(KiSchool.DragonBoxing)],
            Skill.Willpower,
            1,
            [
                { power: KiPower.WeaponLink, requirement: KiPower.None },
                { power: KiPower.RhinoImpregnableSkin, requirement: KiPower.WeaponLink },
                { power: KiPower.DiamondWill, requirement: KiPower.RhinoImpregnableSkin },
                { power: KiPower.CobrasVenomousStrike, requirement: KiPower.WeaponLink },
                { power: KiPower.CrowsPiercingGlance, requirement: KiPower.CobrasVenomousStrike },
                { power: KiPower.Deathblow, requirement: KiPower.CrowsPiercingGlance },
                { power: KiPower.HoodedViperStyle, requirement: KiPower.WeaponLink },
            ]),
        [KiSchool.TattooedMan]: new KiSchoolModel(
            "Tattoed Man",
            "This martial arts school is only open to pledged members of the Triads, teaching them to stalk and kill their enemies with a wide variety of weapons. Disciples of the Tattooed Man are noted for their psychoactive tattoos, which they make visible as a show of bravado when it comes time to kill their victims.",
            [new IconicCareerRequirement(IconicCareer.TriadEnforcer)],
            Skill.Willpower,
            1,
            [
                { power: KiPower.KanjisLuckySense, requirement: KiPower.None },
                { power: KiPower.FlyingViperStyle, requirement: KiPower.KanjisLuckySense },
                { power: KiPower.RhinoImpregnableSkin, requirement: KiPower.FlyingViperStyle },
                { power: KiPower.HoodedViperStyle, requirement: KiPower.KanjisLuckySense },
                { power: KiPower.Deathblow, requirement: KiPower.HoodedViperStyle },
                { power: KiPower.StrikeFromBeyond, requirement: KiPower.Deathblow },
                { power: KiPower.Catsight, requirement: KiPower.KanjisLuckySense },
            ]),
        [KiSchool.WhiteMystics]: new KiSchoolModel(
            "White Mystics",
            "This unusual school originated as a group of renegade Brotherhood Mystics of the Second Directorate. In the time of the Neronian Heresy, it was a group of renegades who taught the secrets of the Art to any who had the capacity to learn them. Students of this school do not learn Ki powers. Instead, they learn to use the Art just as if they were Mystics of the Brotherhood. They learn the Art from their masters and then roam the human worlds as wandering holy men and women. Of course, the Brotherhood regards them as heretics and the Inquisition captures or kills them whenever possible.",
            [],
            Skill.Willpower,
            2,
            []),
    };

    getSchools() {
        let schools: KiSchoolViewModel[] = [];
        let n = 1;
        const lastCareer = character.careers[character.careers.length - 1];

        if (lastCareer.isIconic && lastCareer.career === IconicCareer.ShadowWalkerCultist) {
            return [new KiSchoolViewModel(KiSchool.Deathbringer, this._schools[KiSchool.Deathbringer])];
        }
        else if (lastCareer.isIconic && lastCareer.career === IconicCareer.DemonHunter) {
            return [new KiSchoolViewModel(KiSchool.DemonHunter, this._schools[KiSchool.DemonHunter])];
        }

        for (var s in this._schools) {
            var school = this._schools[s];
            var fulFilled = school.requirements.length === 0 || school.requirements.some(r => r.isFulfilled());

            if (fulFilled) {
                schools.push(new KiSchoolViewModel(n, school));
            }

            n++;
        }

        return schools;
    }

    getSchool(school: KiSchool) {
        return this._schools[school];
    }

    isPersecuted(school: KiSchool) {
        return school === KiSchool.CelestialPath ||
               school === KiSchool.DarkMystics ||
               (school === KiSchool.HuntingTiger && !character.isSamurai()) ||
               (school === KiSchool.StormWarrior && !character.isSamurai()) ||
               school === KiSchool.WhiteMystics;
    }

    getPowers(school: KiSchool) {
        let powers = [];
        const s = this.getSchool(school);
        s.powers.forEach(p => {
            const power = KiPowersHelper.getPower(p.power);

            if (!character.hasTalent(power.name)) {
                if (p.requirement === KiPower.None) {
                    if (power.prerequisites.some(p => character.skills[p.skill].expertise >= p.expertise)) {
                        powers.push(power);
                    }
                }
                else {
                    const required = KiPowersHelper.getPower(p.requirement);
                    if (character.hasTalent(required.name)) {
                        if (power.prerequisites.some(p => character.skills[p.skill].expertise >= p.expertise)) {
                            powers.push(power);
                        }
                    }
                }
            }
        });

        return powers;
    }
}

export const KiSchoolsHelper = new KiSchools();