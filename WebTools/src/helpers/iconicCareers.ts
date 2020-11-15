import {character} from '../common/character';
import {Timeline} from './timelines';
import {Attribute} from './attributes';
import {Skill, SkillsHelper} from './skills';
import {Faction} from './factions';
import {Pillar} from './pillars';
//import {Education} from './educations';
import {Status} from './status';
import {PrimaryCareer, PrimaryCareersHelper} from './primaryCareers';
import {EquipmentHelper} from './equipment';
import {DiceRoller} from './diceRoller';
import {Apostle} from './apostles';
import {Endowment, DarkGiftHelper} from './darkGifts';
import {Clan} from './clans';
import {Source} from './sources';

export enum IconicCareer {
    // Core
    Heretic,
    Inquisitor,
    Mystic,
    Mortificator,
    Conquistador,
    MADAgent,
    BloodBeret,
    CorporateSamurai,
    TriadEnforcer,
    ShadowWalker,
    TechnologicalArchaeologist,
    CyberInfiltrator,
    Cyberscientist,
    BoneHussar,
    Resector,
    NightWitch,
    LunaPDDetective,
    Doomtrooper,
    Celebrity,
    Politician,
    FreedomBrigade,
    VenusianMarshal,
    MerchantCaptain,
    Rake,

    // Capitol
    BodyDouble,
    Chauffeur,
    FreeMarine,
    HeavyInfantry,
    K9Handler,
    MartianBanshee,
    Producer,
    ReformedConvict,
    SeaLion,
    SpecialAgent,
    StarAthlete,
    SunsetStriker,
    TopGun,

    // Cybertronic
    EnhancedChasseur,
    Spokesperson,
    ExperimentalPsychologist,
    Reaver,
    TheSilent,
    ShockTrooper,
    Technoseer,
    AIProgrammer,
    Arbiter,
    SubrealityStar,
    Mirrorman,
    Cybersurgeon,

    // Freelancers & Luna PD
    Badlander,
    Sewerjack,
    BadlandsRanger,
    InternalAffairs,

    // Cartel
    CartelAdvisor,

    // Whitestar
    BlackMarketRacketeer,
    Commissar,
    GUFBForeignDepartment,
    Deacon,
    Nameless,
    ReclamationCorps,
    Specnaz,
    GUFBHomelandDepartment,
    Consul,
    WasteWalker,

    // Bauhaus
    Blitzer,
    ScribesCompanion,
    WayfarersCompanion,
    SavantsCompanion,
    EtoilesMortant,
    StaffAndHandGuardian,
    Homebuilder,
    Juggernaut,
    SilverSkullJusticar,
    OrderOfFearKommandant,
    MountedHussarVorreiter,
    MountedHussarRaptorRider,
    Templar,
    VenusianRanger,

    // Mishima
    DemonHunter,
    VoidWasp,
    Noble,
    Hatamoto,
    GuildMaster,
    Ronin,
    ModelWorker,
    InspectorMagistrate,
    MartialArtist,
    ShadowWalkerCultist,

    // Dark Eden
    Seeker,
    Watchman,
    EarthwatchSentinel,
    StozzahnRider,
    ConquistadorCorsair,
    VoidWalker,
    Kameleon,

    // Dark Soul
    SeekerDarkSoul,
    MasterOfRites,
    VoidWeaver,
    FrozenSoul,
    Destroyer,
    Technomancer,
    StrainWeaver,
    DarkCarrier,
    EngineerOfCorruption,
    Reaper,
    EaterOfSouls,
    DreadShadow,

    // Brotherhood
    Messenger,
    Hunter,
    StudentOfTheArt,
    FuryElite,
    WarriorMystic,
    HealerMystic,
    InterrogatorMystic,
    LiaisonMystic,
    SeerMystic,
    PilgrimResonator,
    PilgrimSentinel,
    Revisor,
    SacredWarrior,
    BrotherhoodEliteTrooper,
    Archon,
    Vestal,
    Crucifier,
    Locator,
    Caretaker,
    Artisan,
    Quartermaster,
    Banker,
    Investigator,
    BrotherhoodProducer,
    Counsellor,
    Doctor,
    Recruiter,
    Tutor,
    Auditor,
    Target,
    Diplomat,

    // Imperial
    Barrister,
    CivilServant,
    Stormtrencher,
    CollegePhysician,
    Entrepreneur,
    FreeTrader,
    ISCSpecialAgent,
    Navvy,
    YardSuit,
    YardBrute,
    WolfbaneCommando,
    BadSamaritans,
    BlackBerets,
    BlueBerets,
    BlueLions,
    GoldenLions,
    GoldenPanthers,
    Hunters,
    Rams,
    Shamrocks,
    Sterlings,
    WildRoses
}

interface IIconicCareerPrerequisite {
    isPrerequisiteFulfilled(): boolean;
}

class HereticAllowedPrerequisite implements IIconicCareerPrerequisite {
    isPrerequisiteFulfilled() {
        return character.allowHeretics;
    }
}

class IsHereticPrerequisite implements IIconicCareerPrerequisite {
    isPrerequisiteFulfilled() {
        return character.isHeretic();
    }
}

class ApostlePrerequisite implements IIconicCareerPrerequisite {
    apostle: Apostle;

    constructor(apostle: Apostle) {
        this.apostle = apostle;
    }

    isPrerequisiteFulfilled() {
        return character.patron === this.apostle;
    }
}

class HasCriminalRecordPrerequisite implements IIconicCareerPrerequisite {
    isPrerequisiteFulfilled() {
        return character.hasCriminalRecord;
    }
}

class TalentPrerequisite implements IIconicCareerPrerequisite {
    talent: string;

    constructor(talent: string) {
        this.talent = talent;
    }

    isPrerequisiteFulfilled() {
        return character.hasTalent(this.talent);
    }
}

class ExpertisePrerequisite implements IIconicCareerPrerequisite {
    skill: Skill;
    expertise: number;

    constructor(skill: Skill, expertise: number) {
        this.skill = skill;
        this.expertise = expertise;
    }

    isPrerequisiteFulfilled() {
        return character.skills[this.skill].expertise >= this.expertise;
    }
}

class FocusPrerequisite implements IIconicCareerPrerequisite {
    skill: Skill;
    focus: number;

    constructor(skill: Skill, focus: number) {
        this.skill = skill;
        this.focus = focus;
    }

    isPrerequisiteFulfilled() {
        return character.skills[this.skill].focus >= this.focus;
    }
}

class VariableExpertisePrerequisite implements IIconicCareerPrerequisite {
    skill1: Skill;
    skill2: Skill;
    expertise1: number;
    expertise2: number;

    constructor(skill1: Skill, expertise1: number, skill2: Skill, expertise2: number) {
        this.skill1 = skill1;
        this.skill2 = skill2;
        this.expertise1 = expertise1;
        this.expertise2 = expertise2;
    }

    isPrerequisiteFulfilled() {
        return character.skills[this.skill1].expertise >= this.expertise1 ||
               character.skills[this.skill2].expertise >= this.expertise2;
    }
}

class AnyExpertisePrerequisite implements IIconicCareerPrerequisite {
    skills: Skill[];
    expertise: number;

    constructor(skills: Skill[], expertise: number) {
        this.skills = skills;
        this.expertise = expertise;
    }

    isPrerequisiteFulfilled() {
        let isFulfilled = false;

        this.skills.forEach(s => {
            if (character.skills[s].expertise >= this.expertise) {
                isFulfilled = true;
            }
        });

        return isFulfilled;
    }
}

class MilitaryEducationOrCareerPrerequisite implements IIconicCareerPrerequisite {
    constructor() {
    }

    isPrerequisiteFulfilled() {
        const educations = [7, 13, 4];
        const careers = [...PrimaryCareersHelper.getMilitaryCareers()];

        let fulfilled = educations.indexOf(character.education) > -1;

        if (!fulfilled) {
            character.careers.forEach(c => {
                if (careers.indexOf(c.career) > -1) {
                    fulfilled = true;
                }
            });
        }

        return fulfilled;
    }
}

class MilitaryCareerPrerequisite implements IIconicCareerPrerequisite {
    constructor() {
    }

    isPrerequisiteFulfilled() {
        const careers = [...PrimaryCareersHelper.getMilitaryCareers()];

        let fulfilled = false;
        character.careers.forEach(c => {
            if (careers.indexOf(c.career) > -1) {
                fulfilled = true;
            }
        });

        return fulfilled;
    }
}

class PoliceCareerPrerequisite implements IIconicCareerPrerequisite {
    constructor() {
    }

    isPrerequisiteFulfilled() {
        const careers = [...PrimaryCareersHelper.getPoliceCareers()];

        let fulfilled = false;
        character.careers.forEach(c => {
            if (careers.indexOf(c.career) > -1) {
                fulfilled = true;
            }
        });

        return fulfilled;
    }
}

class MilitaryOrRuralCareerPrerequisite implements IIconicCareerPrerequisite {
    constructor() {
    }

    isPrerequisiteFulfilled() {
        const careers = [...PrimaryCareersHelper.getMilitaryCareers(), ...PrimaryCareersHelper.getRuralCareers()];

        let fulfilled = false;
        character.careers.forEach(c => {
            if (careers.indexOf(c.career) > -1) {
                fulfilled = true;
            }
        });

        return fulfilled;
    }
}

class MilitaryOrPoliceCareerPrerequisite implements IIconicCareerPrerequisite {
    constructor() {
    }

    isPrerequisiteFulfilled() {
        const careers = [...PrimaryCareersHelper.getMilitaryCareers(), ...PrimaryCareersHelper.getPoliceCareers()];

        let fulfilled = false;
        character.careers.forEach(c => {
            if (careers.indexOf(c.career) > -1) {
                fulfilled = true;
            }
        });

        return fulfilled;
    }
}

class PoliceOrIntelligenceCareerPrerequisite implements IIconicCareerPrerequisite {
    constructor() {
    }

    isPrerequisiteFulfilled() {
        const careers = [...PrimaryCareersHelper.getPoliceCareers(), PrimaryCareer.IntelligenceOperative];

        let fulfilled = false;
        character.careers.forEach(c => {
            if (careers.indexOf(c.career) > -1) {
                fulfilled = true;
            }
        });

        return fulfilled;
    }
}

class MilitaryCareerYearsPrerequisite implements IIconicCareerPrerequisite {
    years: number;

    constructor(years: number) {
    }

    isPrerequisiteFulfilled() {
        const careers = [...PrimaryCareersHelper.getMilitaryCareers()];

        let years = 0;
        character.careers.forEach(c => {
            if (careers.indexOf(c.career) > -1) {
                years += c.years;
            }
        });

        return years >= this.years;
    }
}

class StatusPrerequisite implements IIconicCareerPrerequisite {
    status: Status;

    constructor(status: Status) {
        this.status = status;
    }

    isPrerequisiteFulfilled() {
        return character.status >= this.status;
    }
}

class CommonerPrerequisite implements IIconicCareerPrerequisite {
    constructor() {
    }

    isPrerequisiteFulfilled() {
        return character.status >= Status.Faceless && character.status <= Status.Guildsman;
    }
}

class FamePrerequisite implements IIconicCareerPrerequisite {
    fame: number;

    constructor(fame: number) {
        this.fame = fame;
    }

    isPrerequisiteFulfilled() {
        return character.fame >= this.fame;
    }
}

class PillarPrerequisite implements IIconicCareerPrerequisite {
    pillar: Pillar;

    constructor(pillar: Pillar) {
        this.pillar = pillar;
    }

    isPrerequisiteFulfilled() {
        return character.pillar === this.pillar;
    }
}

class VariablePillarPrerequisite implements IIconicCareerPrerequisite {
    pillar1: Pillar;
    pillar2: Pillar;

    constructor(pillar1: Pillar, pillar2: Pillar) {
        this.pillar1 = pillar1;
        this.pillar2 = pillar2;
    }

    isPrerequisiteFulfilled() {
        return character.pillar === this.pillar1 ||
               character.pillar === this.pillar2;
    }
}

class PrimaryCareerPrerequisite implements IIconicCareerPrerequisite {
    career: PrimaryCareer;

    constructor(career: PrimaryCareer) {
        this.career = career;
    }

    isPrerequisiteFulfilled() {
        return character.hasPrimaryCareer(this.career);
    }
}

class NoKiSchoolPrerequisite implements IIconicCareerPrerequisite {
    constructor() {
    }

    isPrerequisiteFulfilled() {
        return character.kiSchool === 0;
    }
}

class KiSchoolPrerequisite implements IIconicCareerPrerequisite {
    constructor() {
    }

    isPrerequisiteFulfilled() {
        return character.kiSchool !== 0;
    }
}

class MentalismAspectPrerequisite implements IIconicCareerPrerequisite {
    private aspect: Skill;

    constructor(aspect: Skill) {
        this.aspect = aspect;
    }

    isPrerequisiteFulfilled() {
        var fulfilled = false;

        for (var talent in character.talents) {
            if (talent.indexOf("Violaceum") > -1 ||
                talent === "Contemplative Recuperation" ||
                talent === "Mental Fortress" ||
                talent === "Purity of Self" ||
                talent === "Self-Discipline") {
                fulfilled = true;
            }
        }

        return fulfilled;
    }
}

class LawSchoolPrerequisite implements IIconicCareerPrerequisite {
    isPrerequisiteFulfilled() {
        return (character.education === 27 || character.education === 28);
    }
}

class MedicalSchoolPrerequisite implements IIconicCareerPrerequisite {
    isPrerequisiteFulfilled() {
        return (character.education === 29 ||
                character.education === 30 ||
                character.education === 31);
    }
}

class BusinessSchoolPrerequisite implements IIconicCareerPrerequisite {
    isPrerequisiteFulfilled() {
        return (character.education === 25 || character.education === 26);
    }
}

class ClanPrerequisite implements IIconicCareerPrerequisite {
    private clan: Clan;

    constructor(clan: Clan) {
        this.clan = clan;
    }

    isPrerequisiteFulfilled() {
        return (character.clan === this.clan);
    }
}

class VariableClanPrerequisite implements IIconicCareerPrerequisite {
    private clan1: Clan;
    private clan2: Clan;

    constructor(clan1: Clan, clan2: Clan) {
        this.clan1 = clan1;
        this.clan2 = clan2;
    }

    isPrerequisiteFulfilled() {
        return (character.clan === this.clan1 ||
                character.clan === this.clan2);
    }
}

class SourcePrerequisite implements IIconicCareerPrerequisite {
    private source: Source;

    constructor(source: Source) {
        this.source = source;
    }

    isPrerequisiteFulfilled() {
        return character.hasSource(this.source);
    }
}

class NotSourcePrerequisite implements IIconicCareerPrerequisite {
    private source: Source;

    constructor(source: Source) {
        this.source = source;
    }

    isPrerequisiteFulfilled() {
        return !character.hasSource(this.source);
    }
}

class IconicCareerModel {
    name: string;
    description: string;
    factions: Faction[];
    prerequisites: IIconicCareerPrerequisite[];
    difficulty: number;
    mandatory: Skill[];
    elective: Skill[];
    signature: Skill[];
    talentsTier1: Skill[];
    talentsTier2: Skill[];
    talentsTier3: Skill[];
    equipment: string[];
    earnings: number;
    timelines: Timeline[];

    constructor(name: string, description: string, factions: Faction[], prerequisites: IIconicCareerPrerequisite[], difficulty: number, mandatory: Skill[], elective: Skill[], signature: Skill[], talentsTier1: Skill[], talentsTier2: Skill[], talentsTier3: Skill[], equipment: string[], earnings: number, timelines: Timeline[]) {
        this.name = name;
        this.description = description;
        this.factions = factions;
        this.prerequisites = prerequisites;
        this.difficulty = difficulty;
        this.mandatory = mandatory;
        this.elective = elective;
        this.signature = signature;
        this.talentsTier1 = talentsTier1;
        this.talentsTier2 = talentsTier2;
        this.talentsTier3 = talentsTier3;
        this.equipment = equipment;
        this.earnings = earnings;
        this.timelines = timelines;
    }
}

class IconicCareerViewModel extends IconicCareerModel {
    id: IconicCareer;

    constructor(id: IconicCareer, base: IconicCareerModel) {
        super(base.name, base.description, base.factions, base.prerequisites, base.difficulty, base.mandatory, base.elective, base.signature, base.talentsTier1, base.talentsTier2, base.talentsTier3, base.equipment, base.earnings, base.timelines);
        this.id = id;
    }
}

class IconicCareers {
    private _artAspects = [
        Skill.AspectOfChangeling,
        Skill.AspectOfElements,
        Skill.AspectOfExorcism,
        Skill.AspectOfKinetics,
        Skill.AspectOfManipulation,
        Skill.AspectOfMentalism,
        Skill.AspectOfPremonition
    ];

    private _careers: { [id: number]: IconicCareerModel } = {
        [IconicCareer.Heretic]: new IconicCareerModel(
            "Heretic",
            "TODO", // TODO
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar, Faction.Brotherhood],
            [new HereticAllowedPrerequisite(), new NotSourcePrerequisite(Source.DarkSoul)],
            99,
            [Skill.Willpower, Skill.Stealth, Skill.Persuade],
            [Skill.Mysticism, Skill.CloseCombat, Skill.Resistance],
            [Skill.Willpower, Skill.Stealth, Skill.Persuade, Skill.CloseCombat],
            [],
            [],
            [],
            [
                EquipmentHelper.getSMGs(),
                "Corporate clothing for two additional corporations",
            ],
            1,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Inquisitor]: new IconicCareerModel(
            "Inquisitor",
            "Inquisitors are at the forefront of the war against Darkness. Most warriors within the Brotherhood aspire to join the ranks of the Inquisition. The stereotype of the stoic, driven Inquisitor is a popular one in Capitolian action movies, though most know that this depiction is as much propaganda as anything else. The mere mention of an Inquisitor strikes fear into the hearts of all but the most faithful, for there are few whose thoughts are entirely pure, and the Inquisition has ways of exposing secrets.Inquisitors Majoris are the most powerful of their organisation, and few can withstand their prowess, whether on the battlefield or in the interrogation room.All Inquisitors are highly skilled in a single Aspect of the Art.",
            [Faction.Brotherhood],
            [new TalentPrerequisite("Mystic")],
            2,
            [Skill.Mysticism, Skill.Observation, Skill.Insight],
            [Skill.RangedWeapons, Skill.CloseCombat, Skill.Persuade],
            [Skill.Mysticism, Skill.Insight, Skill.RangedWeapons],
            [Skill.Mysticism, ...this._artAspects],
            [Skill.Observation, Skill.Insight, Skill.RangedWeapons, Skill.CloseCombat],
            [],
            [
                "Power controller",
                "P-60 Punisher",
                "Punisher Sword",
                "Inquisitorial Battledress"
            ],
            0,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Mystic]: new IconicCareerModel(
            "Mystic",
            "At the heart of the Brotherhood are the Mystics. Found both within their own Directorate, and in support of the other three, a Brotherhood Mystic is a powerful ally and a terrifying foe. They are the most accomplished and capable spell casters amongst all of humanity. Advancement through the ranks is arduous, requiring nothing less than absolute devotion and determination, both to achieve greater levels of mastery of the Arts, and to fortify themselves against the Darkness. The greatest amongst them, the Keepers of the Art, are some of the most powerful people in the system, and their attentions are devoted wholly to matters concerning the war against darkness and the survival of humanity.",
            [Faction.Brotherhood],
            [new TalentPrerequisite("Mystic"), new NotSourcePrerequisite(Source.Brotherhood)],
            2,
            [Skill.Mysticism, Skill.Education, Skill.Observation],
            [Skill.Treatment, Skill.Science, Skill.Insight],
            [Skill.Mysticism, Skill.Education, Skill.Observation],
            [Skill.Mysticism, ...this._artAspects],
            [Skill.Mysticism, ...this._artAspects],
            [],
            [
                "Power controller",
                "Armoured robes",
                "Combat helmet"
            ],
            0,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Mortificator]: new IconicCareerModel(
            "Mortificator",
            "Where the Inquisition and the Brotherhood’s armies are its mailed fist, the Mortifactors are its concealed blade. These experts in covert operations are called in for assassinations and lightning raids, and are widely believed to be a myth, for there are few who have seen one and lived to tell of it. Each Mortifactor is skilled in the use of an Aspect of the Art, giving him a considerable advantage over warriors not similarly skilled, and allowing him to reach and eliminate targets that he would not otherwise be able to overcome.",
            [Faction.Brotherhood],
            [new ExpertisePrerequisite(Skill.Stealth, 1), new TalentPrerequisite("Mystic")],
            2,
            [Skill.Mysticism, Skill.Stealth, Skill.CloseCombat],
            [Skill.Thievery, Skill.RangedWeapons, Skill.Survival],
            [Skill.Mysticism, Skill.Stealth, Skill.CloseCombat],
            [Skill.Mysticism, Skill.Stealth, Skill.CloseCombat, Skill.RangedWeapons, ...this._artAspects],
            [Skill.Mysticism, Skill.Stealth, Skill.CloseCombat, Skill.RangedWeapons, ...this._artAspects],
            [],
            [
                "Quietus Armour",
                "Mortis Sword",
                "Silenced Nemesis Handgun"
            ],
            0,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Conquistador]: new IconicCareerModel(
            "Conquistador",
            "Heroic explorers, spies, traders, and warriors; the Imperial Conquistadors are a class unto themselves. Issued with a Letter of Marque by the Serenity, they are free to use whatever means they require to advance Imperial’s ambitions as long as they can justify their actions to the Houses of Parliament. Many are recruited from one of the divisions of Imperial Security Command. The typical Conquistador is confident, brash, and larger-than-life. Their equipment and vehicles are all of the highest quality and well maintained, partly to live up to their reputations as the best-of-the-best, but also due to the more pragmatic knowledge that they often operate far from help and need reliability.When ‘in civilisation’ they favour exquisite suits, but when they are in deep space they are just as comfortable in armoured spacesuits.",
            [Faction.Imperial],
            [new ExpertisePrerequisite(Skill.Survival, 1), new ExpertisePrerequisite(Skill.Space, 1)],
            2,
            [Skill.Survival, Skill.Space, Skill.Resistance],
            [Skill.Observation, Skill.CloseCombat, Skill.Athletics],
            [Skill.Survival, Skill.Space, Skill.Resistance, Skill.Observation],
            [Skill.Survival, Skill.Space, Skill.Observation, Skill.CloseCombat],
            [Skill.Survival, Skill.Space, Skill.Observation, Skill.CloseCombat],
            [],
            [
                "P-60 Punisher",
                "Punisher Short Sword",
                "Fashionable suit",
                "Heavy civilian shoulder pads"
            ],
            4,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.MADAgent]: new IconicCareerModel(
            "Murder & Acquisitions Agent",
            "ISC-5 Murders & Acquisitions Department (MAD) agents are a perfectly terrifying blend of ruthless killers and cold- hearted accountants. For a MAD agent, the world and everything in it neatly falls into profit and loss tables, and his job is to secure the profits and eliminate the losses. Their primary role is to find potential new assets for Imperial and acquire them in any way possible. That often requires some dirty work, and MAD agents are chosen for their ‘moral flexibility’. They are not averse to using their fearsome reputation when it will give them an edge.",
            [Faction.Imperial],
            [new ExpertisePrerequisite(Skill.Stealth, 1), new ExpertisePrerequisite(Skill.Persuade, 1)],
            2,
            [Skill.Stealth, Skill.Persuade, Skill.Willpower],
            [Skill.CloseCombat, Skill.Survival, Skill.Insight],
            [Skill.Stealth, Skill.Persuade, Skill.Willpower, Skill.Insight],
            [Skill.Stealth, Skill.Persuade, Skill.Willpower, Skill.CloseCombat],
            [Skill.Stealth, Skill.Persuade, Skill.Willpower, Skill.CloseCombat],
            [],
            [
                "Fashionable suit",
                "Aggressor Handgun",
                "Sword cane",
                "Black notebook",
                "Hand crank calculator"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.BloodBeret]: new IconicCareerModel(
            "Blood Beret",
            "Arguably one of the most recognisable units battling the Dark Legion, the Blood Berets are a frequent feature of recruitment campaigns by the Imperial Defence Forces. Recruited primarily from units of the Defence Forces serving on Venus, there are a large percentage of Blood Berets from the non-Anglo Clans, giving the whole unit a truly multi-cultural feel. All Blood Berets receive additional training from the Brotherhood to prepare them for fighting the Dark Legion.",
            [Faction.Imperial],
            [new MilitaryEducationOrCareerPrerequisite(), new VariableExpertisePrerequisite(Skill.CloseCombat, 1, Skill.RangedWeapons, 1)],
            2,
            [Skill.RangedWeapons, Skill.Stealth, Skill.Athletics],
            [Skill.CloseCombat, Skill.Mechanics, Skill.Command],
            [Skill.RangedWeapons, Skill.CloseCombat, Skill.Stealth, Skill.Athletics],
            [Skill.CloseCombat, Skill.Stealth, Skill.Athletics, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Stealth, Skill.Athletics, Skill.RangedWeapons],
            [],
            [
                "Plasma Carbine",
                "Aggressor Handgun",
                "Mk. III Combat Armour",
                "Dagger"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.CorporateSamurai]: new IconicCareerModel(
            "Corporate Samurai",
            "The warrior-managers of Mishima’s samurai caste can be broadly split into two types: those who are soldiers through and through, and those who focus on the corporation’s business affairs. The former type are usually from lower ranking samurai families. They exist to fight for their lords and obey orders, carrying them out to the best of their ability. When not on active duty, these warriors train hard and play hard. Higher - ranking samurai must also be ready at a moment’s notice to take arms when they are commanded to do so. However, they spend far more time on their business affairs: overseeing production quotas, attending meetings, and so forth.",
            [Faction.Mishima],
            [new StatusPrerequisite(Status.LowShareholder)],
            2,
            [Skill.CloseCombat, Skill.Persuade, Skill.Lifestyle],
            [Skill.RangedWeapons, Skill.Command, Skill.Education],
            [Skill.CloseCombat, Skill.UnarmedCombat, Skill.Acrobatics, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Persuade, Skill.Lifestyle],
            [],
            [],
            [
                "Sode Class Light Battlesuit",
                "Katana",
                "Wakizashi",
                "Shogun Assault Rifle",
                "Business suit"
            ],
            4,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.TriadEnforcer]: new IconicCareerModel(
            "Triad Enforcer",
            "The pledged associates of the Triad crime outfits encounter all levels of Mishima society through their vice, smuggling, and extortion rackets.At the rank of enforcer, an associate is allowed a degree of autonomy from his master, having attained a high degree of trust, familiarity with the codes of his Triad, and an easy way with threatened violence.",
            [Faction.Mishima],
            [],
            1,
            [Skill.CloseCombat, Skill.Persuade, Skill.Thievery],
            [Skill.Acrobatics, Skill.Stealth, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Persuade, Skill.Thievery, Skill.Acrobatics],
            [Skill.CloseCombat, Skill.Persuade, Skill.Thievery, Skill.Stealth],
            [],
            [],
            [
                "Windrider SMG",
                "Bulletproof Vest",
                "Selection of loud clothing"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.ShadowWalker]: new IconicCareerModel(
            "Shadow Walker",
            "Industrial spies, corporate extraction specialists, and sometimes killers. Their name comes from the dreaded Shadow Walker Cult – a heretical order of assassins suppressed many years ago, or so Mishima management would have its employees believe. The more mundane shadow walkers are dangerous enough in their own right. Extensively trained in stealth, espionage, and combat, shadow walkers are the ultimate deniable assets, hired by corporate lords desperate enough to cross the boundaries of honour.",
            [Faction.Mishima],
            [],
            2,
            [Skill.CloseCombat, Skill.Stealth, Skill.Thievery],
            [Skill.UnarmedCombat, Skill.Acrobatics, Skill.Willpower],
            [Skill.CloseCombat, Skill.Stealth, Skill.Thievery, Skill.Acrobatics],
            [Skill.CloseCombat, Skill.Stealth, Skill.Thievery, Skill.Acrobatics],
            [Skill.CloseCombat, Skill.Stealth, Skill.Thievery, Skill.Acrobatics],
            [],
            [
                "Katana",
                "Ronin Handgun",
                "Ballistic nylon clothing",
                "Heavy civilian shoulder pads",
                "Rebreather",
                "Gas Grenades x3",
                "Camouflage clothing"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.TechnologicalArchaeologist]: new IconicCareerModel(
            "Technological Archaeologist",
            "Archaeologists of pre-Fall technology know where to find it, how to get it, and how not to get killed while doing so. Part adventurer and part academic, their travels take them from the steaming jungles of Venus to the vast deserts of Mars. They contend with ancient security machines, rival corporations, and, sometimes, the Brotherhood, to claim their prizes. That is fine by them; danger is part of the thrill. There is little they would not do to find ancient technology.",
            [Faction.Cybertronic],
            [new ExpertisePrerequisite(Skill.Education, 2)],
            1,
            [Skill.Science, Skill.Mechanics, Skill.Observation],
            [Skill.Survival, Skill.Stealth, Skill.Insight],
            [Skill.Science, Skill.Mechanics, Skill.Observation, Skill.Insight],
            [Skill.Science, Skill.Mechanics, Skill.Observation, Skill.Survival],
            [],
            [],
            [
                "SA-SG7200I Shotgun",
                "EYE-Tronic",
                "SARaH System"
            ],
            3,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.CyberInfiltrator]: new IconicCareerModel(
            "SWI Cyber-Infiltrator",
            "These are a mix of cyber-spy, agent, and assassin, augmented with cutting edge enhancements to perform espionage and wet work for Cybertronic. Quick as a snake, and just as lethal, there is little information they cannot obtain or rival corporate execs they cannot reach. While their existence is whispered about, those whispers strike fear in to corporate employees the system over. No one wants one on their tail.",
            [Faction.Cybertronic],
            [],
            2,
            [Skill.Stealth, Skill.Education, Skill.Linguistics],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Persuade],
            [Skill.Stealth, Skill.Education, Skill.CloseCombat, Skill.RangedWeapons],
            [Skill.Stealth, Skill.Education, Skill.Linguistics],
            [Skill.Stealth, Skill.Education, Skill.Linguistics],
            [],
            [
                "P1000 Handgun",
                "Subdermal Armour",
                "Cell Link",
                "EYE-Tronic"
            ],
            4,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Cyberscientist]: new IconicCareerModel(
            "Cyberscientist",
            "The best and brightest Cybertronic has to offer; their brains have been enhanced to calculate at inhuman speeds and their minds are finely tuned to the world of machines. Technical expertise is the cyberscientist’s specialty. While they can repair, jury-rig, or design current technology, their real talent lies in creating the new, stunning leaps in human imagination Cybertronic is known for. Their imagination is the only limitation, and their imagination is vast and cyber enhanced.",
            [Faction.Cybertronic],
            [new ExpertisePrerequisite(Skill.Science, 2)],
            1,
            [Skill.Education, Skill.Mechanics, Skill.Treatment],
            [Skill.Medicine, Skill.Mysticism, Skill.Science],
            [Skill.Education, Skill.Mechanics, Skill.Treatment, Skill.Medicine, Skill.Science],
            [Skill.Mechanics, Skill.Treatment, Skill.Medicine, Skill.Science],
            [],
            [],
            [
                "Automed",
                "DIANA System",
                "CX Multi-tool"
            ],
            3,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.BoneHussar]: new IconicCareerModel(
            "Bone Hussar",
            "With their signature bone swords in hand, a heart full of courage, and, as often as not, a belly full of vodka, the Bone Hussars seek out ever more fearsome foes to take on in hand-to-hand combat. There can be no greater glory for one of these fanatical warriors than to die in combat, facing off against insurmountable odds without a flicker of fear. Having heard of the terrors that stalk the colonies, a few Bone Hussars have been given permission by the Tsarina to hunt them down wherever they may be. These adventurous monster hunters voyage into space to take on new, even greater challenges than those they have faced on Earth.",
            [Faction.Whitestar],
            [new ExpertisePrerequisite(Skill.CloseCombat, 1)],
            3,
            [Skill.CloseCombat, Skill.Willpower, Skill.Acrobatics],
            [Skill.CloseCombat, Skill.Acrobatics, Skill.Resistance],
            [Skill.CloseCombat, Skill.Willpower, Skill.Acrobatics],
            [Skill.CloseCombat, Skill.Willpower, Skill.Acrobatics],
            [Skill.CloseCombat, Skill.Willpower, Skill.Acrobatics],
            [Skill.CloseCombat, Skill.Willpower, Skill.Acrobatics],
            [
                "Bone Sword",
                "Bone Sword",
                "Heavy military shoulder pads"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Resector]: new IconicCareerModel(
            "Resector",
            "The Resectors are explorers who scavenge for useful items in the wreckage of the old world. Adept at navigating the wilderness and urban ruins, Resectors always have an eye out for the main chance. After all, the next score could be the one that will set them up for life. Resectors can often be found braving the drifting wrecks and abandoned orbitals that were claimed by the Dark Symmetry. Moreover, although their flighty nature makes them somewhat unreliable, they are often chosen by the Tsarina for off-world missions, offering a different perspective on things from her military officers.",
            [Faction.Whitestar],
            [new ExpertisePrerequisite(Skill.Observation, 1), new ExpertisePrerequisite(Skill.Thievery, 1)],
            2,
            [Skill.Stealth, Skill.Thievery, Skill.Mechanics],
            [Skill.Pilot, Skill.AnimalHandling, Skill.Resistance],
            [Skill.Stealth, Skill.Thievery, Skill.Mechanics, Skill.Resistance],
            [Skill.Thievery, Skill.Mechanics, Skill.AnimalHandling, Skill.Resistance],
            [Skill.Thievery, Skill.Mechanics, Skill.AnimalHandling, Skill.Resistance],
            [],
            [
                "Iron Hand Autopistol",
                "Explorer's Pick",
                "Survival Kit|Vacuum suit",
                "Medkit"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.NightWitch]: new IconicCareerModel(
            "Night Witch",
            "The Night Witches are sentinels, scouts, and velocity addicts. Piloting their custom-built jetwings on Earth or at the helm of Whitestar’s jury-rigged spacecraft, the Night Witches must develop a sixth sense for the condition of their vehicles, and instinctively know just how far they can push them without something important falling off or catching fire. Night Witches are often chosen for off-planet assignments where pilot skill will be of vital importance, including combat missions and journeys of exploration, where anything might happen.",
            [Faction.Whitestar],
            [new ExpertisePrerequisite(Skill.Pilot, 1), new ExpertisePrerequisite(Skill.Mechanics, 1)],
            2,
            [Skill.Pilot, Skill.Mechanics, Skill.RangedWeapons],
            [Skill.Space, Skill.Mechanics, Skill.Pilot],
            [Skill.Pilot, Skill.Mechanics, Skill.RangedWeapons, Skill.Space],
            [Skill.Pilot, Skill.Mechanics, Skill.Space],
            [Skill.Pilot, Skill.Mechanics, Skill.Space],
            [],
            [
                "Electro-jolt",
                "Vacuum suit"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.LunaPDDetective]: new IconicCareerModel(
            "Luna PD Detective",
            "Founded by Capitol, Luna PD was transferred to the Cartel at its founding. Luna PD is the only law enforcement organisation with jurisdiction over the whole of Luna, and is a true inter-corporate organisation, with cops recruited and trained at the LPD Academy working alongside investigators seconded from Capitol Security Services and the Imperial Security Corps. To a lesser extent, Bauhaus, Mishima, and even Cybertronic second assets, though these are usually only for specific operations. Luna PD is underfunded and subject to the conflicting wills of the corporations, and is often forced into hiring freelancers to supplement its investigators.",
            [Faction.Freelancer, Faction.Microcorp, Faction.Criminal, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar],
            [new ExpertisePrerequisite(Skill.Observation, 1)],
            2,
            [Skill.Persuade, Skill.Education, Skill.Observation],
            [Skill.Stealth, Skill.RangedWeapons, Skill.Thievery],
            [Skill.Persuade, Skill.Education, Skill.Observation, Skill.RangedWeapons],
            [Skill.Persuade, Skill.Education, Skill.Observation, Skill.Thievery],
            [Skill.Persuade, Skill.Education, Skill.Observation, Skill.Thievery],
            [],
            [
                "Piranha Handgun",
                "Heavy civilian shoulder pad",
                "Radio",
                "Armoured Trench Coat"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Doomtrooper]: new IconicCareerModel(
            "Doomtrooper",
            "Doomtroopers are the Cartel’s elite military forces, established on behalf of the Brotherhood to represent the very finest warriors that mankind could produce, regardless of corporation. Their skills and exploits are legendary, and the sacrifice of each and every Doomtrooper that falls in battle is honoured in perpetuity. Doomtroopers can be called upon to serve in a wide variety of missions and circumstances, and are given almost complete autonomy to complete their objectives – they are the best, and are trusted to take every necessary action to ensure the continued survival of humanity.",
            [Faction.Freelancer, Faction.Microcorp, Faction.Criminal, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar],
            [new MilitaryCareerPrerequisite(), new ExpertisePrerequisite(Skill.RangedWeapons, 1), new ExpertisePrerequisite(Skill.CloseCombat, 1)],
            3,
            [Skill.RangedWeapons, Skill.Resistance, Skill.Willpower],
            [Skill.CloseCombat, Skill.HeavyWeapons, Skill.Mysticism],
            [Skill.RangedWeapons, Skill.CloseCombat, Skill.HeavyWeapons, Skill.Willpower],
            [Skill.Mysticism, Skill.RangedWeapons, Skill.Resistance, Skill.Willpower, Skill.CloseCombat, Skill.HeavyWeapons],
            [Skill.Mysticism, Skill.RangedWeapons, Skill.Resistance, Skill.Willpower, Skill.CloseCombat, Skill.HeavyWeapons],
            [Skill.Mysticism, Skill.RangedWeapons, Skill.Resistance, Skill.Willpower, Skill.CloseCombat, Skill.HeavyWeapons],
            [
                EquipmentHelper.getWeapons(),
                EquipmentHelper.getWeapons(),
                EquipmentHelper.getArmor()
            ],
            3,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Celebrity]: new IconicCareerModel(
            "Celebrity",
            "These are the voices, faces, bodies, and personalities that make up Capitol’s high society and entertainment empire. From film to radio to art galleries and beyond, these stars wield their fame with aplomb and can even come to have high political influence at times. It would surprise many a citizen to realise how many renowned actors and artists are trained not just to smile and pose well, but also to spy on targets during premiere tours, and have the fighting skills to defend themselves if the spotlight of suspicion ever falls on them.",
            [Faction.Capitol],
            [new FamePrerequisite(1)],
            1,
            [Skill.Persuade, Skill.Lifestyle, Skill.Education],
            [Skill.Lifestyle, Skill.Athletics, Skill.Persuade],
            [Skill.Lifestyle, Skill.Athletics, Skill.Education],
            [Skill.Lifestyle, Skill.Education, Skill.Athletics],
            [],
            [],
            [
                "Fashionable clothing",
                "Lavish apartment (paid for a month)"
            ],
            5,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Politician]: new IconicCareerModel(
            "Politician",
            "Politicians often fancy themselves the true leaders of all things Capitol. It is true that the vast administrative machine would grind to a halt without the blood of politicians greasing the wheels. Causes would not be ratified, votes would go uncounted, and budgets would not be funded without politicians and their networks. In some ways, they are the stars of their own stories, and their exploits can be as entertaining as the latest feature film. While some decry the system as a hive of villainy and corruption (and it is), this does not negate the fact that there are those officials who can steer entire colonies to their whim and turn the tide of a battle with a wellworded speech.",
            [Faction.Capitol],
            [],
            2,
            [Skill.Persuade, Skill.Education, Skill.Command],
            [Skill.Lifestyle, Skill.Linguistics, Skill.Persuade],
            [Skill.Persuade, Skill.Education, Skill.Command],
            [Skill.Persuade, Skill.Education, Skill.Command],
            [Skill.Persuade, Skill.Education, Skill.Command],
            [],
            [
                "Clothing",
                "Personal assistant",
                "Small office (paid for a month)"
            ],
            4,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.FreedomBrigade]: new IconicCareerModel(
            "Freedom Brigade",
            "One of two paths lands people here: either they had their old citizenship stripped away by a criminal conviction, or they decided that the chance to become a Capitol citizen offered enough perks and possibilities to risk their lives. Now they just have to survive long enough to earn a new life and clean past. The Freedom Brigade gets stationed at the most Light-forsaken hellholes on Mars, and sent on the worst missions available. Its members are also pumped full of a slow neurotoxin, with the antidote only available at their commanding officer’s discretion. Their gear and armour are all cast-offs from former Brigadiers, and they only get live ammo when in the field.",
            [Faction.Freelancer, Faction.Microcorp, Faction.Criminal, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar],
            [],
            1,
            [Skill.RangedWeapons, Skill.Resistance, Skill.CloseCombat],
            [Skill.Survival, Skill.Thievery, Skill.Stealth],
            [Skill.RangedWeapons, Skill.Stealth, Skill.Thievery],
            [Skill.RangedWeapons, Skill.Resistance, Skill.CloseCombat, Skill.Thievery],
            [Skill.RangedWeapons, Skill.Resistance, Skill.CloseCombat, Skill.Thievery],
            [],
            [
                "M50 Assault Rifle",
                "Tortoise Mk. 1 Armour"
            ],
            2,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.VenusianMarshal]: new IconicCareerModel(
            "Venusian Marshal",
            "The Venusian Marshals are an elite cadre of soldiers attached to battlegroups, but they typically operate with a great degree of independence. They are outriders and scouts, expected to carry out reconnaissance missions and lightning fast attacks. To become a marshal, a Bauhaus soldier must prove himself a competent warrior, expert rider, and survivalist. A marshal’s main task is to keep note of any enemy activity he observes and report back to the commanders of his battlegroup. He may also be tasked with acts of subterfuge and sabotage, and be ready to execute a fighting retreat at any given moment. Marshals’ wargear is much like that of the Venusian Rangers, from whom many of them are drawn. They can be distinguished by their characteristic heavy cloaks.",
            [Faction.Bauhaus],
            [new ExpertisePrerequisite(Skill.RangedWeapons, 1), new ExpertisePrerequisite(Skill.Survival, 1)],
            2,
            [Skill.RangedWeapons, Skill.Stealth, Skill.Survival],
            [Skill.Athletics, Skill.AnimalHandling, Skill.Observation],
            [Skill.RangedWeapons, Skill.Stealth, Skill.Survival, Skill.Observation],
            [Skill.RangedWeapons, Skill.Survival, Skill.Stealth, Skill.Athletics],
            [Skill.RangedWeapons, Skill.Survival, Skill.Stealth, Skill.Athletics],
            [],
            [
                "HG-14 Shotgun",
                "MP-105 Machine Pistol",
                "Guardsman Mk. III Armour",
                "Heavy Cloak",
                "Horse|Venusian Raptor"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.MerchantCaptain]: new IconicCareerModel(
            "Merchant Captain",
            "Bauhaus organises its own fleets of freighters and merchant vessels. The captains of these vessels are experienced pilots who need a fairly broad skillset. Many specialise in the transport of a particular type of freight, and develop some expertise in these items in order to better take stock of them. Many develop the skills of a negotiator. Whilst they rarely do the actual deals for the products they transport, they may be able to strike lucrative bargains when they collect the goods, or make profitable sales of add-ons when they deliver them. Some may even be tempted to further line their pockets by involving themselves in smuggling operations.",
            [Faction.Bauhaus],
            [new ExpertisePrerequisite(Skill.Space, 1), new StatusPrerequisite(Status.Retainer)],
            3,
            [Skill.Persuade, Skill.Command, Skill.Space],
            [Skill.Mechanics, Skill.CloseCombat, Skill.Lifestyle],
            [Skill.Persuade, Skill.Command, Skill.Space, Skill.Lifestyle],
            [Skill.Persuade, Skill.Space, Skill.Lifestyle],
            [Skill.Persuade, Skill.Space, Skill.Lifestyle],
            [],
            [
                "Duelling Sabre",
                "Light civilian shoulder pad",
                "Access to small transport freighter under licence (paid for a month)"
            ],
            4,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Rake]: new IconicCareerModel(
            "Rake",
            "There are some nobles, particularly amongst the youth, who find the exacting regime and taut manners that they are expected to adopt both arduous and dull. They would much rather enjoy all the perks of aristocracy, in particular amazing wealth and relative freedom from legal consequence. These affluent youngsters often enjoy a life of fast cars, loose companions, intoxicants, vandalism, and violent confrontation. The nobility does all in its collective power to limit the damage done by such wastrels and to see them brought to justice, knowing that the anarchists and insurrectionaries make much of their excesses. The commoners hold a noble gone bad in high contempt, and their resentments are only made worse through realising that were they to be held accountable for equivalent crimes they would no doubt face harsher punishment.",
            [Faction.Bauhaus],
            [new ExpertisePrerequisite(Skill.Lifestyle, 2), new StatusPrerequisite(Status.Nobility)],
            2,
            [Skill.CloseCombat, Skill.Lifestyle, Skill.Education],
            [Skill.Athletics, Skill.Lifestyle, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Lifestyle, Skill.Athletics],
            [Skill.CloseCombat, Skill.Lifestyle, Skill.Athletics],
            [Skill.CloseCombat, Skill.Lifestyle, Skill.Athletics],
            [],
            [
                "Duelling Sabre",
                "Heavy military shoulder pads",
                "Fashionable clothing (and cape)"
            ],
            5,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.BodyDouble]: new IconicCareerModel(
            "Body Double",
            "The highest form of personal defence is to have someone else to take the bullet for you. Body doubles are expensive, and the only ones worth hiring are the ones that are exceptional. They can assume the guise of a client with ease, donning accents and mannerisms as easily as others put on clothes. They are well versed in the techniques of disguise, altering their appearance radically with startling ease.",
            [Faction.Capitol],
            [new ExpertisePrerequisite(Skill.Persuade, 1), new ExpertisePrerequisite(Skill.Stealth, 1), new SourcePrerequisite(Source.Capitol)],
            2,
            [Skill.Education, Skill.Persuade, Skill.Stealth],
            [Skill.Observation, Skill.Resistance, Skill.Willpower],
            [Skill.Observation, Skill.Resistance, Skill.Willpower],
            [Skill.Observation, Skill.Education, Skill.Persuade, Skill.Stealth],
            [Skill.Observation, Skill.Education, Skill.Persuade, Skill.Stealth],
            [],
            [
                "Disguise kit",
                "Three sets of high quality clothing",
                "Bulletproof Vest"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Chauffeur]: new IconicCareerModel(
            "Chauffeur",
            "A skilled and specialised profession, a true chauffeur is a bodyguard, messenger, observer, and agent provocateur, in addition to being a damned good driver. There is a huge difference between a professional driver and a chauffeur, and thus chauffeurs command high salaries and great respect.",
            [Faction.Capitol],
            [new ExpertisePrerequisite(Skill.Observation, 1), new ExpertisePrerequisite(Skill.Pilot, 1), new SourcePrerequisite(Source.Capitol)],
            2,
            [Skill.Observation, Skill.Pilot, Skill.Stealth],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Thievery],
            [Skill.Observation, Skill.Pilot, Skill.Stealth, Skill.Thievery],
            [Skill.Pilot],
            [Skill.Observation, Skill.Pilot, Skill.Stealth, Skill.Thievery],
            [],
            [
                "Ballistic nylon suit",
                "Slingshot Handgun",
                "Pager"
            ],
            4,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.FreeMarine]: new IconicCareerModel(
            "Free Marine",
            "Free Marines are hardened killers. Each and every one is a veteran of multiple warzones, with years of combat experience in some other branch of the military. All of them have also been subject to Court Martial proceedings and sentenced to death by firing squad. Service in the Free Marines is regarded as the equivalent, but it also allows Capitol to spend these dead men’s lives in battle where their skills are most useful… and if they survive five two-year terms, then they earn their freedom, and their lives.",
            [Faction.Capitol],
            [new ExpertisePrerequisite(Skill.CloseCombat, 2), new ExpertisePrerequisite(Skill.RangedWeapons, 2), new MilitaryCareerPrerequisite(), new SourcePrerequisite(Source.Capitol)],
            3,
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Stealth],
            [Skill.Acrobatics, Skill.Mechanics, Skill.Treatment],
            [Skill.CloseCombat, Skill.Mechanics, Skill.RangedWeapons, Skill.Stealth],
            [Skill.CloseCombat, Skill.Mechanics, Skill.RangedWeapons, Skill.Stealth],
            [Skill.CloseCombat, Skill.Mechanics, Skill.RangedWeapons, Skill.Stealth],
            [Skill.CloseCombat, Skill.Mechanics, Skill.RangedWeapons, Skill.Stealth],
            [
                "Tortoise Mk. 1 Armour",
                "M50 Assault Rifle",
                "Punisher Short Sword",
                "Basic repair kit",
                "Three anti-armour grenades"
            ],
            1,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.HeavyInfantry]: new IconicCareerModel(
            "Heavy Infantry",
            "The men and women of Capitol Heavy Infantry are the hardened core of the Capitol Armed Forces; every one a toughened veteran of the harshest warzones that the AFC finds itself in. Mere experience is not sufficient, however, and candidates for the Heavy Infantry are held to an extraordinarily high standard. They are equipped with potent exo-armour and high-powered weaponry, the better to triumph in the most vicious battles.",
            [Faction.Capitol],
            [new ExpertisePrerequisite(Skill.CloseCombat, 2), new ExpertisePrerequisite(Skill.RangedWeapons, 2), new SourcePrerequisite(Source.Capitol)],
            3,
            [Skill.Athletics, Skill.HeavyWeapons, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Resistance, Skill.Treatment],
            [Skill.CloseCombat, Skill.Athletics, Skill.HeavyWeapons, Skill.RangedWeapons],
            [Skill.Athletics, Skill.CloseCombat, Skill.HeavyWeapons, Skill.RangedWeapons],
            [Skill.Athletics, Skill.CloseCombat, Skill.HeavyWeapons, Skill.RangedWeapons],
            [],
            [
                "Tortoise Mk. 2 Armour",
                "M66 Light Autocannon",
                "Chain Bayonet"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.K9Handler]: new IconicCareerModel(
            "K-9 Handler",
            "Originally established to protect against Mishiman sneak attacks, K-9 teams have been part of Capitolian forces for many centuries. These units – consisting of a handler and two or more dogs – were originally part of the AFC’s Ranger Corps, and the elite training of the Rangers directs the methods of K-9 units to this day. The utility of K-9 units is in detecting threats and dangers that human soldiers cannot easily spot, and there are few AFC detachments that do not have an attached K-9 unit.",
            [Faction.Capitol],
            [new ExpertisePrerequisite(Skill.AnimalHandling, 1), new ExpertisePrerequisite(Skill.Athletics, 2), new SourcePrerequisite(Source.Capitol)],
            2,
            [Skill.AnimalHandling, Skill.Athletics, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Observation, Skill.Survival],
            [Skill.AnimalHandling, Skill.Athletics, Skill.Observation, Skill.Resistance],
            [Skill.AnimalHandling],
            [Skill.AnimalHandling, Skill.Athletics, Skill.Observation, Skill.Survival],
            [],
            [
                "Tortoise Mk. 1 Armour",
                "M50 Assault Rifle",
                "Riot Shield",
                "Supersonic whistle",
                "Two K-9 guard dogs"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.MartianBanshee]: new IconicCareerModel(
            "Martian Banshee",
            "One of the more unusual Special Forces regiments in the AFC, Martian Banshees are sworn enemies of the Mishima corporation. The unit consists entirely of men and women who have lost family members to Mishiman operations. Martian Banshees are desperate, deadly soldiers sworn to vengeance, and they can be found at the heart of any battle. They are equipped with high-powered rocket packs, allowing them to range ahead of other forces and attack from unexpected directions.",
            [Faction.Capitol],
            [new ExpertisePrerequisite(Skill.Pilot, 1), new ExpertisePrerequisite(Skill.RangedWeapons, 2), new MilitaryCareerYearsPrerequisite(10), new SourcePrerequisite(Source.Capitol)],
            1,
            [Skill.Acrobatics, Skill.Pilot, Skill.RangedWeapons],
            [Skill.Athletics, Skill.CloseCombat, Skill.Willpower],
            [Skill.Acrobatics, Skill.Pilot, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [],
            [],
            [
                "M50 Assault Rifle",
                "Predator Mk. 1",
                "Rocket pack",
                "Three anti-armour grenades"
            ],
            1,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Producer]: new IconicCareerModel(
            "Producer",
            "Media content does not make itself. Producers are scattered across Capitol’s media empire, engaged in the art of coordinating talent, overseeing projects, gathering funding, and ensuring that everything runs as smoothly as possible.",
            [Faction.Capitol],
            [new ExpertisePrerequisite(Skill.Lifestyle, 1), new ExpertisePrerequisite(Skill.Persuade, 2), new SourcePrerequisite(Source.Capitol)],
            1,
            [Skill.Lifestyle, Skill.Observation, Skill.Persuade],
            [Skill.Command, Skill.Education, Skill.Insight],
            [Skill.Command, Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [Skill.Command, Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [],
            [],
            [
                "Ballistic nylon formal suit",
                "Cell phone"
            ],
            5,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.ReformedConvict]: new IconicCareerModel(
            "Reformed Convict",
            "A Criminal Record is a stain upon a Capitolian citizen’s life – it curtails his rights, hinders his career and financial opportunities, and isolates him from everything that is good and strong with his corporation. Certain acts can permit a citizen to expunge his record, and while many of these involve military service, some may prefer to face hard labour and imprisonment – working to redeem themselves in the eyes of the corporation, and picking up a few useful skills in the process.",
            [Faction.Capitol],
            [new HasCriminalRecordPrerequisite(), new SourcePrerequisite(Source.Capitol)],
            1,
            [Skill.Athletics, Skill.Resistance, Skill.Thievery],
            [Skill.Mechanics, Skill.Observation, Skill.Survival],
            [Skill.Observation, Skill.Resistance, Skill.Survival, Skill.Thievery],
            [Skill.Observation, Skill.Resistance, Skill.Survival, Skill.Thievery],
            [],
            [],
            [],
            1,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.SeaLion]: new IconicCareerModel(
            "Sea Lion",
            "Set apart from the rank-and-file of Capitol’s armed forces, the Sea Lions have a long and illustrious history, dating back to the First Corporate Wars. Founded to spearhead assaults across Venus, in environments that Capitol forces were spectacularly unsuited for, the Sea Lions are experts of guerrilla warfare, amphibious assaults, and long-range scouting operations across hostile terrain. Every Sea Lion is covered in elaborate tattoos, which can normally be used to identify members of the organisation even when they are out of uniform.",
            [Faction.Capitol],
            [new ExpertisePrerequisite(Skill.Athletics, 1), new ExpertisePrerequisite(Skill.RangedWeapons, 2), new ExpertisePrerequisite(Skill.Resistance, 1), new MilitaryCareerYearsPrerequisite(10), new SourcePrerequisite(Source.Capitol)],
            2,
            [Skill.RangedWeapons, Skill.Stealth, Skill.Survival],
            [Skill.Athletics, Skill.CloseCombat, Skill.Resistance],
            [Skill.Athletics, Skill.RangedWeapons, Skill.Stealth, Skill.Survival],
            [Skill.Athletics, Skill.RangedWeapons, Skill.CloseCombat, Skill.Survival],
            [Skill.Athletics, Skill.RangedWeapons, Skill.CloseCombat, Skill.Survival],
            [],
            [
                "M50 Assault Rifle",
                "Panther Armour",
                "Harbinger Survival Sword"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.SpecialAgent]: new IconicCareerModel(
            "Special Agent",
            "The character has earned a position of authority and power in the intelligence services, running networks of lesser agents and handling the highest priority cases. Agents are given free rein to take whatever actions they deem necessary to get the job done, and rely on anonymity to employ the most ruthless and brutal of methods as effectively as possible.",
            [Faction.Capitol],
            [new ExpertisePrerequisite(Skill.Observation, 2), new ExpertisePrerequisite(Skill.Stealth, 1), new SourcePrerequisite(Source.Capitol)],
            2,
            [Skill.Observation, Skill.Persuade, Skill.Stealth],
            [Skill.Education, Skill.Insight, Skill.Linguistics],
            [Skill.Education, Skill.Insight, Skill.Observation, Skill.Stealth],
            [Skill.Education, Skill.Insight, Skill.Observation, Skill.Stealth],
            [Skill.Education, Skill.Insight, Skill.Observation, Skill.Stealth],
            [],
            [
                "Ballistic nylon formal suit",
                "Slingshot Handgun",
                "Cell phone"
            ],
            4,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.StarAthlete]: new IconicCareerModel(
            "Star Athlete",
            "The very finest athletes command extraordinary salaries, dozens of sponsorship deals, and the attention of millions. Their skills are subject to the scrutiny of sports fans across the solar system, and every fan will have his favourite athletes and franchises.",
            [Faction.Capitol],
            [new ExpertisePrerequisite(Skill.Acrobatics, 1), new ExpertisePrerequisite(Skill.Athletics, 2), new SourcePrerequisite(Source.Capitol)],
            3,
            [Skill.Athletics, Skill.Acrobatics, Skill.Resistance],
            [Skill.CloseCombat, Skill.Persuade, Skill.Willpower],
            [Skill.Athletics, Skill.Acrobatics, Skill.CloseCombat, Skill.Resistance],
            [Skill.Athletics],
            [Skill.Acrobatics, Skill.Athletics, Skill.Resistance, Skill.Willpower],
            [],
            [],
            6,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.SunsetStriker]: new IconicCareerModel(
            "Sunset Striker",
            "The Sunset Strikers began as a security detail for Capitol’s holdings on Mishima-controlled Mercury, and the unit has grown from there. Surrounded by a culture of self-sacrifice and hierarchical respect, it adapted to its environment and learned the ways of Mishima. Drawing on the traditions of their hosts, its members studied the gruelling martial arts regimens of the samurai and adopted codes of honour and conduct loosely based on bushido. Sunset Strikers, owing to this training and their experiences in the Mercurian caverns, have extraordinary prowess in close quarters, and are steadfast to a fault.",
            [Faction.Capitol],
            [new ExpertisePrerequisite(Skill.CloseCombat, 1), new ExpertisePrerequisite(Skill.Willpower, 1), new SourcePrerequisite(Source.Capitol)],
            2,
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Willpower],
            [Skill.Athletics, Skill.RangedWeapons, Skill.UnarmedCombat],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.UnarmedCombat, Skill.Willpower],
            [Skill.CloseCombat],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.UnarmedCombat, Skill.Willpower],
            [],
            [
                "Tortoise Mk. 1 Armour",
                "M50 Assault Rifle",
                "Katana",
                "Wakizashi"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.TopGun]: new IconicCareerModel(
            "Top Gun",
            "The finest pilots in the finest air force anywhere in the solar system. The Capitol Advanced Strike Fighter Tactics programme, located at McCraig Air Command outside Burroughs, provides specialised training to the finest pilots in Capitol’s Air Force. Pilots wearing the patch of the ‘Top Gun’ programme, as it is colloquially known, are highly-regarded and revered for their skills and devotion. Many Top Guns go on to command or teaching roles within the CAF, passing on their skill and expertise.",
            [Faction.Capitol],
            [new ExpertisePrerequisite(Skill.Pilot, 2), new ExpertisePrerequisite(Skill.RangedWeapons, 2), new SourcePrerequisite(Source.Capitol)],
            3,
            [Skill.HeavyWeapons, Skill.RangedWeapons, Skill.Pilot],
            [Skill.Command, Skill.Persuade, Skill.Mechanics],
            [Skill.Command, Skill.HeavyWeapons, Skill.RangedWeapons, Skill.Pilot],
            [Skill.Pilot],
            [Skill.HeavyWeapons, Skill.RangedWeapons, Skill.Pilot],
            [],
            [
                "Vac suit",
                "AZH-15 Raptor Strike Fighter"
            ],
            4,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.EnhancedChasseur]: new IconicCareerModel(
            "Enhanced Chasseur",
            "With the standard Chasseur units having become a prominent and established element of Cybertronic’s armed forces, the corporation looked to expand its early successes. The Enhancement Program is the means by which the most effective and promising Chasseurs are improved upon, with these augmented soldiers upgraded even further to capitalise on the warrior’s aptitudes. Successful candidates for enhancement are submitted to a punishing regime of training and surgical augmentation, bolstering them in every conceivable way. To a man, they are larger and stronger than they once were, and fitted with advanced armour and an array of costly upgrades; Enhanced Chasseurs serve as elite strike and reconnaissance forces in support of their less-advanced brethren.",
            [Faction.Cybertronic],
            [new PrimaryCareerPrerequisite(PrimaryCareer.MCR_TIFF), new SourcePrerequisite(Source.Cybertronic)],
            3,
            [Skill.Observation, Skill.RangedWeapons, Skill.Resistance],
            [Skill.Athletics, Skill.HeavyWeapons, Skill.Mechanics],
            [Skill.HeavyWeapons, Skill.Observation, Skill.RangedWeapons, Skill.Resistance],
            [Skill.HeavyWeapons, Skill.Observation, Skill.RangedWeapons, Skill.Resistance],
            [Skill.HeavyWeapons, Skill.Observation, Skill.RangedWeapons, Skill.Resistance],
            [],
            [
                "CAW2000 Close Assault Weapon",
                "IA3000 Integrated armour suite",
                "IAS3100 blink generator",
                "Skeletal reinforcement",
                "Mitochondrial infusion",
                "Synth-blood transfusion"
            ],
            3,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Spokesperson]: new IconicCareerModel(
            "Spokesperson",
            "Calm, confident, and as comfortable with deception as most people are with breathing. The image of a Cybertronic spokesperson is a pervasive one, and so effective is Cybertronic’s public relations department that even when everyone knows the stereotype, these spokespeople are still extraordinarily persuasive. Normally hailing from ETP but assigned to every division, their valuable skills help apply a human face to a corporation that is otherwise driven by logic and bereft of emotion.",
            [Faction.Cybertronic],
            [new PillarPrerequisite(Pillar.TIFF_AEM), new ExpertisePrerequisite(Skill.Education, 1), new ExpertisePrerequisite(Skill.Persuade, 2), new SourcePrerequisite(Source.Cybertronic)],
            3,
            [Skill.Command, Skill.Education, Skill.Persuade],
            [Skill.Linguistics, Skill.Persuade, Skill.Willpower],
            [Skill.Command, Skill.Education, Skill.Linguistics, Skill.Persuade],
            [Skill.Command, Skill.Education, Skill.Linguistics, Skill.Persuade],
            [Skill.Command, Skill.Education, Skill.Linguistics, Skill.Persuade],
            [Skill.Command, Skill.Education, Skill.Linguistics, Skill.Persuade],
            [
                "Emotives control system",
                "Media kit",
                "Bespoke fashionable clothing"
            ],
            5,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.ExperimentalPsychologist]: new IconicCareerModel(
            "Experimental Psychologist",
            "While the pursuit of technology is vital to Cybertronic, machines are only half of the equation. Study of the human condition is an essential element of Cybertronic’s work, and thus there are numerous specialists who study the intricacies of human and AI psychology in order to understand better how they might interact peacefully. These specialists can come from a range of different fields, and the applications of their studies vary depending on whether they are from RDM or AEM.",
            [Faction.Cybertronic],
            [new ExpertisePrerequisite(Skill.Persuade, 1), new ExpertisePrerequisite(Skill.Science, 2), new SourcePrerequisite(Source.Cybertronic)],
            2,
            [Skill.Persuade, Skill.Science, Skill.Treatment],
            [Skill.Psychotherapy, Skill.Science, Skill.Command],
            [Skill.Command, Skill.Persuade, Skill.Psychotherapy, Skill.Science],
            [Skill.Persuade, Skill.Psychotherapy, Skill.Science],
            [Skill.Persuade, Skill.Psychotherapy, Skill.Science],
            [],
            [
                "DIANA system"
            ],
            3,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Reaver]: new IconicCareerModel(
            "Reaver",
            "Since its formation, Cybertronic has been beset with predators who wish nothing less than its complete dissolution. The Brotherhood has been one of the most destructive of these, responsible for a sizeable proportion of Cybertronic’s battlefield casualties. To help counter these threats, Cybertronic devised specialised soldiers to help oppose the mystical capabilities of Brotherhood forces. Reavers are recruited exclusively from those employees who have a history of being persecuted by the Brotherhood. These experiences fuel the Reavers’ rage, and this fury is stoked and encouraged throughout their training and conditioning.",
            [Faction.Cybertronic],
            [new VariablePillarPrerequisite(Pillar.TIFF_SWI, Pillar.VAC_SWI), new ExpertisePrerequisite(Skill.CloseCombat, 1), new ExpertisePrerequisite(Skill.RangedWeapons, 1), new SourcePrerequisite(Source.Cybertronic)],
            2,
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [Skill.HeavyWeapons, Skill.Mysticism, Skill.UnarmedCombat],
            [Skill.HeavyWeapons, Skill.Mysticism, Skill.UnarmedCombat, Skill.Willpower],
            [Skill.Mysticism, Skill.Willpower],
            [Skill.HeavyWeapons, Skill.UnarmedCombat],
            [],
            [
                "SSW4100 LMG",
                "IA3000 Integrated armour suite",
                "IAS3400 Metaphysical disruptor"
            ],
            3,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.TheSilent]: new IconicCareerModel(
            "The Silent",
            "Criticism and speculation about Cybertronic abounds across the solar system, but one thing is held to be true by all – Cybertronic is adaptable. In the early decades of defending itself from the other corporations and the Brotherhood, Cybertronic learned well the hard lessons delivered by its rivals – he who rules the skies rules the battlefield. The Silent are Cybertronic’s answer to units like the Martian Banshees, Bauhaus Blitzers, and Imperial Rams. Clad in state-of-theart integrated armour, the Silent are air-dropped from modified Sky Witch II helicopters into warzones requiring their specialised skills. The Silent get their name from the peculiar phenomena associated with them – in battle, they are perfectly silent, with their weapons, their anti-grav harnesses, and even the impacts of enemy bullets upon their armour making no sound whatsoever.",
            [Faction.Cybertronic],
            [new VariablePillarPrerequisite(Pillar.TIFF_SWI, Pillar.VAC_SWI), new ExpertisePrerequisite(Skill.RangedWeapons, 1), new SourcePrerequisite(Source.Cybertronic)],
            2,
            [Skill.Pilot, Skill.RangedWeapons, Skill.UnarmedCombat],
            [Skill.CloseCombat, Skill.Stealth, Skill.Willpower],
            [Skill.Pilot, Skill.RangedWeapons, Skill.Stealth, Skill.UnarmedCombat],
            [Skill.Pilot, Skill.RangedWeapons, Skill.Stealth, Skill.UnarmedCombat],
            [],
            [],
            [
                "AR3000 Assault Rifle",
                "CSA200 Power Fist",
                "IA3000 Integrated armour suite",
                "IAS3200 Anti-gravity harness",
                "Skeletal reinforcement",
                "SD99 Sonic Dampener"
            ],
            3,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.ShockTrooper]: new IconicCareerModel(
            "Shock Trooper",
            "Cybertronic’s small size means that it must marshal its forces carefully. Where the fifth corporation cannot pre-emptively end a conflict with a single bullet, it employs guerrilla tactics and lightning assaults to destroy an enemy before it knows a battle has begun. The troops who perform these duties are known as Shock Troopers. Equipped to deploy from airborne transports in small groups, Shock Troopers favour close range weaponry to dispatch their foes as quickly as possible. To increase the fear these warriors inspire, they sometimes employ weapons and techniques that are frowned on or even banned by the Cartel, such as chemical weaponry. Lacking the sheer numbers of other corporations, Cybertronic chooses to employ tactics that are ethically questionable but highly efficient, relying on a lack of surviving witnesses to maintain the secret.",
            [Faction.Cybertronic],
            [new VariablePillarPrerequisite(Pillar.TIFF_SWI, Pillar.VAC_SWI), new ExpertisePrerequisite(Skill.RangedWeapons, 1), new SourcePrerequisite(Source.Cybertronic)],
            2,
            [Skill.Acrobatics, Skill.Pilot, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Resistance, Skill.Survival],
            [Skill.Acrobatics, Skill.Pilot, Skill.RangedWeapons, Skill.Resistance],
            [Skill.Acrobatics, Skill.Pilot, Skill.RangedWeapons, Skill.Resistance],
            [],
            [],
            [
                "SA-SG7200",
                "3x G450 gas grenades",
                "IA3000 Integrated armour suite",
                "IAS3200 Anti-gravity harness",
                "Artificial lungs"
            ],
            4,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Technoseer]: new IconicCareerModel(
            "Technoseer",
            "The highest ranking operatives of FEF, Technoseers – often just referred to as Seers – employ a blend of ancient mysticism and higher mathematics in order to create statistical models of the future. Their use of superstitious methodologies is regarded by many as being at odds with the technology-minded Cybertronic, but the very existence of supernatural forces like the Light and the Dark Symmetry is held up as evidence to prove that the universe does not function on logic and mathematics alone. Technoseers are unnerving beings to encounter. Their minds are constantly processing the information they receive using algorithms derived from ancient numerology and mathemancy, allowing them to predict likely outcomes of any situation they witness with a remarkable degree of accuracy.",
            [Faction.Cybertronic],
            [new VariablePillarPrerequisite(Pillar.TIFF_AEM, Pillar.VAC_AEM), new ExpertisePrerequisite(Skill.Science, 2), new ExpertisePrerequisite(Skill.Observation, 2), new SourcePrerequisite(Source.Cybertronic)],
            2,
            [Skill.Observation, Skill.Science, Skill.Willpower],
            [Skill.Lifestyle, Skill.Mysticism, Skill.Insight],
            [Skill.Insight, Skill.Mysticism, Skill.Observation, Skill.Science],
            [Skill.Insight, Skill.Mysticism, Skill.Observation, Skill.Science],
            [Skill.Insight, Skill.Mysticism, Skill.Observation, Skill.Science],
            [],
            [
                "Compu-brain",
                "DIANA system",
                "EYE-tronic",
                "Sonicator receptor system"
            ],
            4,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.AIProgrammer]: new IconicCareerModel(
            "AI Programmer",
            "The science associated with artificial intelligence was, for a thousand years, lost to humanity. Cybertronic has resurrected the technology and the lore associated with it, sculpting expert systems and eventually giving birth to new thinking machines. Specialised programmers develop the underlying architecture of AI systems; for simpler Expert Systems like the SARaH, this is sufficient. For true thinking machines, such as DIANA systems and Cuirassier cores, this initial programming soon gives way to an education, teaching and guiding the development of these technological marvels.",
            [Faction.Cybertronic],
            [new VariablePillarPrerequisite(Pillar.TIFF_RDM, Pillar.VAC_RDM), new ExpertisePrerequisite(Skill.Science, 2), new SourcePrerequisite(Source.Cybertronic)],
            2,
            [Skill.Mechanics, Skill.Psychotherapy, Skill.Science],
            [Skill.Education, Skill.Linguistics, Skill.Treatment],
            [Skill.Education, Skill.Mechanics, Skill.Psychotherapy, Skill.Science],
            [Skill.Education, Skill.Mechanics, Skill.Psychotherapy, Skill.Science],
            [Skill.Education, Skill.Mechanics, Skill.Psychotherapy, Skill.Science],
            [],
            [
                "DIANA system",
                "Personal computer",
                "AI programming suite"
            ],
            4,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Arbiter]: new IconicCareerModel(
            "Arbiter",
            "Arbiters are charged with overseeing conflicts between the needs of Cybertronic and the corporation’s laws. It often seems unlikely that the corporation’s own laws would impede its best interests, but it has ever been the case in human civilisation that law and technology evolve at different rates. Arbiters are given complete freedom to seek out and resolve disputes, stepping aside only at the discretion of the Board. They are some of the few beings with anything approaching a ‘big picture’ perspective of Cybertronic, and they frequently consult with one another in subreality to ensure that all Arbiters are adhering to the same united vision.",
            [Faction.Cybertronic],
            [new VariablePillarPrerequisite(Pillar.TIFF_AEM, Pillar.VAC_AEM), new ExpertisePrerequisite(Skill.Education, 2), new SourcePrerequisite(Source.Cybertronic)],
            2,
            [Skill.Education, Skill.Linguistics, Skill.Persuade],
            [Skill.Command, Skill.Observation, Skill.Science],
            [Skill.Command, Skill.Education, Skill.Linguistics, Skill.Persuade],
            [Skill.Command, Skill.Education, Skill.Linguistics, Skill.Persuade],
            [Skill.Command, Skill.Education, Skill.Linguistics, Skill.Persuade],
            [],
            [
                "DIANA system",
                "Personal library (Education)",
                "Personal library (Linguistics)"
            ],
            5,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.SubrealityStar]: new IconicCareerModel(
            "Subreality Star",
            "You have made it big, and got in on the ground floor of the next revolution in human entertainment. You are one of the stars of this new enterprise, the face and/or voice of the new medium. You are diverse in your talents, active in your celebrity, and growing more widely recognised by the day. However, that is not all you are. You are an observer in the synthetic world, watchful for threats and signs of corruption. You are wellversed in hacking techniques, both to defend yourself in Subreality, and to crack open the secrets of others. You wield your popularity like a weapon, inviting others to flock to you so that you can discern their true intentions.",
            [Faction.Cybertronic],
            [new PillarPrerequisite(Pillar.TIFF_AEM), new ExpertisePrerequisite(Skill.Observation, 1), new ExpertisePrerequisite(Skill.Persuade, 1), new ExpertisePrerequisite(Skill.Science, 1), new SourcePrerequisite(Source.Cybertronic)],
            2,
            [Skill.Observation, Skill.Persuade, Skill.Science],
            [Skill.Insight, Skill.Lifestyle, Skill.Willpower],
            [Skill.Insight, Skill.Observation, Skill.Persuade, Skill.Science],
            [Skill.Insight, Skill.Observation, Skill.Persuade, Skill.Science],
            [Skill.Insight, Skill.Observation, Skill.Persuade, Skill.Science],
            [],
            [
                "3x 'Whisper' attack software",
                "Greater node upgrade",
                "Firewall 2",
                "Shield 1"
            ],
            4,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Mirrorman]: new IconicCareerModel(
            "Mirrorman",
            "Depicted by propaganda as Cybertronic’s ‘Shining Knights’, Mirrormen are an exclusive and elite force within SWI, equipped with some of the finest equipment available. Specialising in close assault and covert operations, Mirrormen epitomise the nature of SWI – a shining and glorious beacon for the corporation to rally behind, and yet also a hidden blade in the darkness, unseen and unheard until it is too late. It is falsely believed that Mirrormen are AI, similar to Cuirassiers. In truth, they are a rare variant of Enhanced Chasseurs, smaller and sleeker but no less deadly, drawing the finest recruits from across SWI.",
            [Faction.Cybertronic],
            [new VariablePillarPrerequisite(Pillar.TIFF_SWI, Pillar.VAC_SWI), new ExpertisePrerequisite(Skill.CloseCombat, 2), new ExpertisePrerequisite(Skill.Stealth, 1), new SourcePrerequisite(Source.Cybertronic)],
            3,
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Stealth],
            [Skill.Athletics, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.Stealth],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.Stealth],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.Stealth],
            [],
            [
                "P1000 Handgun",
                "CSA400 Combat Sword",
                "IA3000 Integrated armour suite",
                "IAS3300 Mirrorshard camouflage system",
                "EYE-tronic with telescopic sight and nightvision",
                "DIANA system",
                "Mitochondrial infusion",
                "Neurokinetic repeaters",
                "Tronic-reflexes"
            ],
            4,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Cybersurgeon]: new IconicCareerModel(
            "Cybersurgeon",
            "The specialised field of cybersurgery is one of vital importance to Cybertronic, given the sheer number of cybernetic implants the corporation manufactures and employs. Using a proprietary blend of engineering and advanced internal medicine, cybersurgeons are experts in the union of man and machine.",
            [Faction.Cybertronic],
            [new VariablePillarPrerequisite(Pillar.TIFF_RDM, Pillar.VAC_RDM), new ExpertisePrerequisite(Skill.Treatment, 1), new ExpertisePrerequisite(Skill.Science, 2), new SourcePrerequisite(Source.Cybertronic)],
            2,
            [Skill.Medicine, Skill.Science, Skill.Treatment],
            [Skill.Mechanics, Skill.Medicine, Skill.Psychotherapy],
            [Skill.Mechanics, Skill.Medicine, Skill.Science, Skill.Treatment],
            [Skill.Mechanics, Skill.Medicine, Skill.Science, Skill.Treatment],
            [Skill.Mechanics, Skill.Medicine, Skill.Science, Skill.Treatment],
            [],
            [
                "Experimental waldo (suit-mounted)",
                "Basic automed (suit-mounted)",
                "SARaH system"
            ],
            4,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Badlander]: new IconicCareerModel(
            "Badlander",
            "Badlanders are the folk who cling to life outside the main settlements of Luna, hardy people who have to fight for everything they’ve got. In an environment where not just Dark Symmetry-tainted crazed bandits are out to get you, but the very landscape and weather may take your life, you have to learn to be tough and get used to adversity. Some are born into being a Badlander and some are forced into it by circumstance, but they’re all resourceful figures who can survive by their wits and refusal to die too easily.",
            [Faction.Freelancer, Faction.Microcorp, Faction.Criminal, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar],
            [new SourcePrerequisite(Source.LunaPDFreelancers)],
            1,
            [Skill.Observation, Skill.Survival, Skill.Resistance],
            [Skill.Persuade, Skill.Stealth, Skill.Willpower],
            [Skill.Survival, Skill.Resistance, Skill.Stealth, Skill.Willpower],
            [Skill.Survival, Skill.Resistance, Skill.Willpower],
            [Skill.Survival, Skill.Resistance, Skill.Willpower],
            [],
            [
                "Dagger",
                "Ronin Handgun",
                "Survival kit",
                "Ragtag but functional clothing"
            ],
            1,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Sewerjack]: new IconicCareerModel(
            "Sewerjack",
            "The foundations of Luna are more Luna, and in plenty of places the architecture of ages gone by sits mouldering just beneath street level. This has helped to form whole subterranean regions where the top layers of ancient skyscrapers now form the basements and service tunnels for the newest generation of buildings. These places form ideal spots for congregations of heretics, criminals and mutants of all types. These are generally seen as undesirable elements that threaten the lives as well as the souls of the citizens of Luna, and to combat the vermin in their own nest, groups of brave men and women have been formed to flush them out. The overstretched Luna PD doesn’t have a dedicated subterranean unit so vigilantes and private security firms have to provide patrols to keep the underground realm free from taint that may bubble up to the surface. It takes a certain type of person to delve into the unknown with only a torch and a Piranha for company, but they seem to do their jobs well enough – at least the ones that make it back to the surface do anyway.",
            [Faction.Freelancer, Faction.Microcorp, Faction.Criminal, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar],
            [new SourcePrerequisite(Source.LunaPDFreelancers)],
            1,
            [Skill.RangedWeapons, Skill.Resistance, Skill.Stealth],
            [Skill.CloseCombat, Skill.Observation, Skill.Resistance],
            [Skill.CloseCombat, Skill.Observation, Skill.RangedWeapons, Skill.Stealth],
            [Skill.CloseCombat, Skill.Observation, Skill.RangedWeapons, Skill.Stealth],
            [Skill.CloseCombat, Skill.Observation, Skill.RangedWeapons, Skill.Stealth],
            [],
            [
                "Piranha Handgun",
                "Torch",
                "Radio",
                "Gas mask"
            ],
            2,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.BadlandsRanger]: new IconicCareerModel(
            "Badlands Ranger (Luna PD)",
            "The Badlands are a rough and wild place, romanticised in the media for their isolation and the freedom it brings. In reality they’re a hotbed of criminals, heretics and mutants with nobody to keep watch on the scum that breeds out of sight of the big settlements. This is where the Badlands Rangers come in, tough men and women who can operate alone in the wilderness, picking up fugitives and making sure the word of law isn’t forgotten in the Badlands farmsteads and backwater villages.",
            [Faction.Freelancer, Faction.Microcorp, Faction.Criminal, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar],
            [new ExpertisePrerequisite(Skill.Survival, 1), new SourcePrerequisite(Source.LunaPDFreelancers)],
            2,
            [Skill.AnimalHandling, Skill.RangedWeapons, Skill.Survival],
            [Skill.Resistance, Skill.Stealth, Skill.Willpower],
            [Skill.AnimalHandling, Skill.RangedWeapons, Skill.Survival, Skill.Willpower],
            [Skill.AnimalHandling, Skill.RangedWeapons, Skill.Survival],
            [Skill.AnimalHandling, Skill.RangedWeapons, Skill.Survival],
            [],
            [
                "Piranha Handgun",
                "M50 Assault Rifle",
                "Badlands horse",
                "Survival kit",
                "Badlands Ranger badge",
                "Armoured Trench Coat"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.InternalAffairs]: new IconicCareerModel(
            "Internal Affairs (Luna PD)",
            "Who watches the watchers? The Internal Affairs Division. Hard-bitten and uncompromising, they may not be popular with the rest of Luna PD but their job isn’t to win friends. They root out corruption and taint wherever it may be hiding. Their task is a thankless and paranoid one – when working in an environment where every action is questioned it can become habitual to doubt the motives of your colleagues and even your friends and loved ones.",
            [Faction.Freelancer, Faction.Microcorp, Faction.Criminal, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar],
            [new ExpertisePrerequisite(Skill.Observation, 1), new SourcePrerequisite(Source.LunaPDFreelancers)],
            2,
            [Skill.Observation, Skill.Thievery, Skill.Willpower],
            [Skill.Persuade, Skill.RangedWeapons, Skill.Stealth],
            [Skill.Observation, Skill.Persuade, Skill.Thievery, Skill.Willpower],
            [Skill.Observation, Skill.Persuade, Skill.Thievery],
            [Skill.Observation, Skill.Persuade, Skill.Thievery],
            [],
            [
                "Piranha Handgun",
                "Radio",
                "Luna PD Internal Affairs badge",
                "Surveillance kit",
                "Armoured Trench Coat"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.CartelAdvisor]: new IconicCareerModel(
            "Cartel Advisor",
            "Mediation, between corporations and even internal to the corporations, is in great demand during turbulent periods. Thankfully, the Cartel has an established body of experienced and well-trained personnel to act as go-betweens and ensure difficult situations are resolved with the minimum amount of bloodshed or loss of face and capital. When not frequenting the delegations throughout the Cartel Mall on Luna, Advisors are often to be found in places of corporate interest to assist in mediation through investigation. Free Charter sites, potential (or ongoing) conflict zones, and other such far-flung and hostile places are all locations which may be visited by these impartial arbiters of peace and tolerance.",
            [Faction.Freelancer, Faction.Microcorp, Faction.Criminal, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar],
            [new ExpertisePrerequisite(Skill.Persuade, 1), new SourcePrerequisite(Source.Cartel)],
            1,
            [Skill.Command, Skill.Observation, Skill.Persuade],
            [Skill.Lifestyle, Skill.Linguistics, Skill.Persuade],
            [Skill.Linguistics, Skill.Observation, Skill.Persuade, Skill.Willpower],
            [Skill.Persuade],
            [Skill.Command, Skill.Linguistics, Skill.Observation],
            [],
            [
                "Supply of headache medication"
            ],
            3,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.BlackMarketRacketeer]: new IconicCareerModel(
            "Black Market Racketeer",
            "The smugglers, thieves, and contraband peddlers that maintain the black market are often popular figures amongst the citizenry of the Federation, largely due to the fact that they flaunt Whitestar’s corporate sanctions in order to provide the wares that help to alleviate the drudgery of life underground. Consequently, the Tsarina and her officials often turn a blind eye to the trade, provided the Black Market Racketeers do not overstep their limits of course. Smuggling routes frequently cross the Wastelands in order to avoid tunnel patrols, so survival skills become essential.",
            [Faction.Whitestar],
            [new ExpertisePrerequisite(Skill.Persuade, 1), new ExpertisePrerequisite(Skill.Thievery, 2), new SourcePrerequisite(Source.Cartel)],
            3,
            [Skill.Observation, Skill.Persuade, Skill.Thievery],
            [Skill.CloseCombat, Skill.Survival, Skill.Stealth],
            [Skill.Observation, Skill.Persuade, Skill.Stealth, Skill.Thievery],
            [Skill.Observation, Skill.Persuade, Skill.Stealth, Skill.Thievery],
            [Skill.Observation, Skill.Persuade, Skill.Stealth, Skill.Thievery],
            [],
            [
                "Pistolet Gyutka",
                "Pioneer's Saw-Back",
                "Excellent fake ID",
                "Survival kit"
            ],
            4,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Commissar]: new IconicCareerModel(
            "Commissar",
            "The Commissars have earned their position by proving to have both a fearless demeanour and a fanatical devotion to the Tsarina. A citizen must apply for a Commissarial appointment and attend stringent training inside Mertruka Base itself, whereupon successful students are deployed to serve with Stronghold militias as appointed military representatives of Whitestar’s interests. Commissars aim to lead by example, and thereby inspire love and respect for both the Federation and its Tsarina.",
            [Faction.Whitestar],
            [new ExpertisePrerequisite(Skill.Command, 2), new ExpertisePrerequisite(Skill.Willpower, 1), new SourcePrerequisite(Source.Whitestar)],
            4,
            [Skill.Command, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Education, Skill.Persuade, Skill.Resistance],
            [Skill.Command, Skill.Education, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Command],
            [Skill.Command, Skill.Education, Skill.RangedWeapons, Skill.Willpower],
            [],
            [
                "Iron Hand Autopistol",
                "Ballistic nylon suit"
            ],
            2,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.GUFBForeignDepartment]: new IconicCareerModel(
            "GUFB Foreign Department",
            "The Main Directorate for Federation Security (Glavnoe Upravlenie Federalnoy Bezopasnosti, or GUFB) is the official body that protects the Federation from acts of espionage, treason, and terror – both internal and external. The Foreign Department, or INO to themselves, was formed in the wake of Whitestar’s expansion beyond Earth’s atmosphere, as it quickly became a prudent necessity to both gather intelligence against the corporations and curtail their schemes and initiatives. Although a fledgling outfit in comparison to other intelligence agencies, the agents of the Foreign Department are easily capable of matching their counterparts from the corporations.",
            [Faction.Whitestar],
            [new ExpertisePrerequisite(Skill.Persuade, 1), new ExpertisePrerequisite(Skill.Stealth, 1), new ExpertisePrerequisite(Skill.Thievery, 1), new SourcePrerequisite(Source.Whitestar)],
            3,
            [Skill.Persuade, Skill.Stealth, Skill.Willpower],
            [Skill.Education, Skill.Resistance, Skill.Thievery],
            [Skill.Education, Skill.Persuade, Skill.Stealth, Skill.Willpower],
            [Skill.Persuade],
            [Skill.Education, Skill.Persuade, Skill.Stealth, Skill.Willpower],
            [],
            [
                "Piranha Handgun",
                "Disguise kit",
                "Flawless fake ID",
                "Tape recorder"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Deacon]: new IconicCareerModel(
            "Deacon of the Orthodox Holy Orders",
            "The Deacons of the Zlogorian Orthodox Church are of the lowest degree of the Orthodox Holy Orders, yet despite this they undertake perhaps some of the most important functions, and are provided with the most freedom – in terms of roaming Whitestar’s territories at least – of any of the orders. Deacons can be tasked with any number of important spiritual projects, such as leading educational programs and youth groups, undertaking missionary work, and conducting social welfare projects; from liaising with the Brotherhood to undertaking a lifetime pilgrimage around the Federation, Deacons are tasked with spreading the words of the Scriptures through both prayer and deed.",
            [Faction.Whitestar],
            [new ExpertisePrerequisite(Skill.Insight, 1), new ExpertisePrerequisite(Skill.Persuade, 2), new SourcePrerequisite(Source.Whitestar)],
            2,
            [Skill.Education, Skill.Observation, Skill.Persuade],
            [Skill.Insight, Skill.Mysticism, Skill.Willpower],
            [Skill.Education, Skill.Insight, Skill.Observation, Skill.Persuade],
            [Skill.Education, Skill.Insight, Skill.Observation, Skill.Persuade],
            [Skill.Education, Skill.Insight, Skill.Observation, Skill.Persuade],
            [],
            [
                "Armoured Robes",
                "Zlogorian Scriptures",
                "Religious icon worth five assets"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Nameless]: new IconicCareerModel(
            "Nameless",
            "Joining the ranks of the Nameless is a decision that few take, and one that even fewer survive. Recruits are drawn to the Suicide Brigades through criminal conviction, critical illness, or often just sheer desperation, which means that those who survive the mutational effects of the gene altering injection at the culmination of their rite of initiation are hardened individuals who now only have two things to live for: the defence of the Whitestar Federation, and the provision of the Tsarina’s Gold to a nominated dependent upon their death.",
            [Faction.Whitestar],
            [new SourcePrerequisite(Source.Whitestar)],
            2,
            [Skill.Athletics, Skill.CloseCombat, Skill.Survival],
            [Skill.HeavyWeapons, Skill.Observation, Skill.RangedWeapons],
            [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Survival],
            [Skill.CloseCombat],
            [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Survival],
            [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Survival],
            [
                "Harmon-IV treatment set",
                "Blue coveralls",
                "A military service number"
            ],
            0,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.ReclamationCorps]: new IconicCareerModel(
            "Reclamation Corps Specialist",
            "The Reclamation Corps was the precursor to the Exploration & Defence Fleet, and has since been absorbed into its functions as an independent branch. It has been tasked with reclaiming the numerous satellites, orbital stations, and research facilities that slumber at the edge of Earth’s atmosphere; a mission that can often lead to a clash with those spacefaring Resectors who are looking to make a fast ruble by breaking up the very same equipment. Considered to be some of the best spacefaring mechanics available in Whitestar, a Reclamation Corps Specialist’s skills and experience can often mean that his services are in high demand across the fleet.",
            [Faction.Whitestar],
            [new ExpertisePrerequisite(Skill.Mechanics, 2), new ExpertisePrerequisite(Skill.Space, 1), new SourcePrerequisite(Source.Whitestar)],
            2,
            [Skill.Mechanics, Skill.Resistance, Skill.Vacuum],
            [Skill.Gunnery, Skill.Pilot, Skill.Space],
            [Skill.Mechanics, Skill.Pilot, Skill.Resistance, Skill.Space],
            [Skill.Mechanics, Skill.Pilot, Skill.Resistance, Skill.Space],
            [Skill.Mechanics, Skill.Pilot, Skill.Resistance, Skill.Space],
            [],
            [
                "Vac suit",
                "Pistolet Gyutka",
                "Basic repair kit"
            ],
            2,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Specnaz]: new IconicCareerModel(
            "Streltsy 2nd Specnaz Regiment",
            "The 2nd Specnaz refer to themselves as the Domoviye, a name that roughly translates as ‘house ghosts’, due to the fact that they are entrusted with internal anti-terrorist duties. The elite members of this Special Force train extensively in stealth insertion, tunnel fighting, urban combat, and house clearance in order to hone their skills to a keen edge. The Domoviye also study anti-Heretic tactics, part of which includes close combat training from the legendary Bone Hussars, for the all too frequent occasions that they are tasked with cleansing a den of Heresy.",
            [Faction.Whitestar],
            [new ExpertisePrerequisite(Skill.CloseCombat, 1), new ExpertisePrerequisite(Skill.RangedWeapons, 1), new ExpertisePrerequisite(Skill.Stealth, 1), new SourcePrerequisite(Source.Whitestar)],
            3,
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Stealth],
            [Skill.Mysticism, Skill.Observation, Skill.Resistance],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Resistance, Skill.Stealth],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Resistance, Skill.Stealth],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Resistance, Skill.Stealth],
            [],
            [
                "Ballistic nylon military uniform",
                "Bulletproof Vest",
                "Combat Helmet",
                "Medium military shoulder pads",
                "Respirator",
                "Iron Hand Autopistol",
                EquipmentHelper.getSMGs() + "|" + EquipmentHelper.getAssaultRifles(),
                "Laser sight|Telescopic sight|Night vision scope",
                "3 Stun Grenades"
            ],
            2,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.GUFBHomelandDepartment]: new IconicCareerModel(
            "GUFB Homeland Department",
            "The Homeland Department of the Main Directorate for Federation Security, often also called the Rodina, acts as the internal secret police force of the Federation. It reports directly to the Tsarina through the Interior Minister, currently Vasilav von Kultz, and was initially formed to seek out and undermine revolutionary organisations and political opponents, although part of its remit now also involves reporting signs of Heretical activity as the two often go hand-in-hand. Rodina agents also often file reports on black market activity as a means to ensure that any operation does not grow out of control.",
            [Faction.Whitestar],
            [new ExpertisePrerequisite(Skill.Insight, 1), new ExpertisePrerequisite(Skill.Persuade, 1), new ExpertisePrerequisite(Skill.Stealth, 1), new SourcePrerequisite(Source.Whitestar)],
            3,
            [Skill.Observation, Skill.Persuade, Skill.Stealth],
            [Skill.Insight, Skill.Resistance, Skill.Willpower],
            [Skill.Insight, Skill.Observation, Skill.Persuade, Skill.Stealth],
            [Skill.Insight],
            [Skill.Insight, Skill.Observation, Skill.Persuade, Skill.Stealth],
            [],
            [
                "Pistolet Gyutka",
                "Disguise kit",
                "Basic media kit",
                "Parabolic microphone"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Consul]: new IconicCareerModel(
            "Consul to the Federated Strongholds",
            "To become a Consul for the Tsarina is to occupy an honoured position within the Federation. Members of this unique social tier are hand chosen by the Tsarina and her Advisory Council based on both their diplomatic skills and loyalty to Whitestar. It is their task to provide advice to the leadership of the Strongholds when they are undertaking far-reaching decisions that can affect the prosperity of the Federation as a whole. Without legal recourse to back their counsel, however, the Consuls must rely solely upon their diplomatic skills to influence events. Consuls can often act as representatives for Whitestar in negotiations with the corporations.",
            [Faction.Whitestar],
            [new ExpertisePrerequisite(Skill.Lifestyle, 2), new ExpertisePrerequisite(Skill.Persuade, 1), new SourcePrerequisite(Source.Whitestar)],
            4,
            [Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [Skill.Insight, Skill.Observation, Skill.Resistance],
            [Skill.Education, Skill.Insight, Skill.Lifestyle, Skill.Persuade],
            [Skill.Education, Skill.Insight, Skill.Lifestyle, Skill.Persuade],
            [Skill.Education, Skill.Insight, Skill.Lifestyle, Skill.Persuade],
            [],
            [
                "Ballistic nylon suit",
                "Small personal office"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.WasteWalker]: new IconicCareerModel(
            "Waste Walker",
            "Opting for a life of hardship and ignominy amongst the desolate and barren Wastelands is preferable to some when weighed against becoming one of the Nameless. Either option often means death, but there are those who choose to become Waste Walkers in the hopes that they may be welcomed by one of the tribes, or perhaps they believe it possible to find a Stronghold that is not yet part of the Federation. Most people who are expelled into the Wastelands rarely survive more than a day or two, yet there are the rare hermits who manage to eke out an existence among the ruins of the old world, despite the inherent dangers now present. Some are even welcomed back if they return with a large enough prize.",
            [Faction.Whitestar],
            [new ExpertisePrerequisite(Skill.Resistance, 1), new ExpertisePrerequisite(Skill.Survival, 2), new SourcePrerequisite(Source.Whitestar)],
            2,
            [Skill.Resistance, Skill.Stealth, Skill.Survival],
            [Skill.Athletics, Skill.Observation, Skill.Willpower],
            [Skill.Observation, Skill.Resistance, Skill.Stealth, Skill.Survival],
            [Skill.Survival],
            [Skill.Observation, Skill.Resistance, Skill.Stealth, Skill.Survival],
            [],
            [
                "Survival kit",
                "Respirator",
                "Chemical detection kit|Radiation meter",
                "Knife"
            ],
            0,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Blitzer]: new IconicCareerModel(
           "Blitzer",
           "The corporation’s elite demolitions and anti-armour specialists, the Bauhaus Blitzers have a reputation for approaching their duties with what appears to be reckless enthusiasm. In truth, while most Blitzers are adrenaline junkies – facing down an enemy battle tank is not for the faint of heart – they’re extremely cool under pressure. Their maniacal demeanour and levity in the face of danger is their way of dealing with the stress of a dangerous job.",
           [Faction.Bauhaus],
           [new MilitaryCareerPrerequisite(), new ExpertisePrerequisite(Skill.RangedWeapons, 2), new ExpertisePrerequisite(Skill.Willpower, 1), new SourcePrerequisite(Source.Bauhaus)],
           2,
           [Skill.HeavyWeapons, Skill.Mechanics, Skill.Willpower],
           [Skill.Acrobatics, Skill.Athletics, Skill.RangedWeapons],
           [Skill.Athletics, Skill.HeavyWeapons, Skill.Mechanics, Skill.Willpower],
           [Skill.Athletics, Skill.HeavyWeapons, Skill.Mechanics, Skill.Willpower],
           [Skill.Athletics, Skill.HeavyWeapons, Skill.Mechanics, Skill.Willpower],
           [],
           [
               "Hussar Mk. V Armour",
               "Demolition charges (x2)|Firefist Rocket System"
           ],
           2,
           [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.ScribesCompanion]: new IconicCareerModel(
           "Companion of the Honourable Company of Scribes",
           "The humility implied by the title bears almost no resemblance to the powerful individuals who belong to the Honourable Company of Scribes. Its members are administrators, upper-level managers, executives, and diplomats of extraordinary power and influence, and the Order serves as a professional association for these powerful individuals. Information, gossip, business insights, and mutual favours are traded in the halls of the Order’s meeting houses.",
           [Faction.Bauhaus],
           [new ExpertisePrerequisite(Skill.Lifestyle, 2), new SourcePrerequisite(Source.Bauhaus)],
           3,
           [Skill.Education, Skill.Lifestyle, Skill.Persuade],
           [Skill.Command, Skill.Lifestyle, Skill.Willpower],
           [Skill.Command, Skill.Education, Skill.Lifestyle, Skill.Persuade],
           [Skill.Command, Skill.Education, Skill.Lifestyle, Skill.Persuade],
           [Skill.Command, Skill.Education, Skill.Lifestyle, Skill.Persuade],
           [Skill.Command, Skill.Education, Skill.Lifestyle, Skill.Persuade],
           [
               "Top-quality bespoke business attire"
           ],
           4,
           [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.WayfarersCompanion]: new IconicCareerModel(
           "Companion of the Order of Wayfarers",
           "While many Bauhausers undertake a pilgrimage at some point in their lives, a few take to the pilgrim’s life as if it were their calling. These individuals become Companions of the Order of Wayfarers, whose lives are devoted to guiding and supporting pilgrims. They maintain a network of Pilgrim Houses, liaise between the pilgrims and the Brotherhood, and generally serve to assist the vast number of pilgrims – many of whom may never have left their home cities before – to have a peaceful and fulfilling journey. Companions are worldly, widely-travelled, and often speak several languages. For an inexperienced pilgrim on a foreign world, a Companion’s presence can mean the difference between life and death.",
           [Faction.Bauhaus],
           [new PrimaryCareerPrerequisite(PrimaryCareer.Pilgrim), new SourcePrerequisite(Source.Bauhaus)],
           2,
           [Skill.Education, Skill.Linguistics, Skill.Willpower],
           [Skill.Lifestyle, Skill.Observation, Skill.Persuade],
           [Skill.Education, Skill.Observation, Skill.Linguistics, Skill.Willpower],
           [Skill.Education, Skill.Observation, Skill.Linguistics, Skill.Willpower],
           [Skill.Education, Skill.Observation, Skill.Linguistics, Skill.Willpower],
           [],
           [
               "Sturdy travelling clothes",
               "Abridged copy of the Book of the Law",
               "Symbol of the Brotherhood"
           ],
           1,
           [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.SavantsCompanion]: new IconicCareerModel(
           "Companion of the Venerable Order of Savants",
           "Bauhaus has a long history of scientific research and development, and the Venerable Order of Savants exists to support and celebrate this tradition. Alongside its role as a professional body, it serves as a publishing house for the most trusted scientific and technical journals, and its members have access to one of the most extensive and exclusive libraries of scientific and technical knowledge in the solar system. To be a Companion of the Order requires being published in one of its journals, an honour afforded only to the most insightful and learned scientists and engineers.",
           [Faction.Bauhaus],
           [new VariableExpertisePrerequisite(Skill.Mechanics, 2, Skill.Science, 2), new SourcePrerequisite(Source.Bauhaus)],
           2,
           [Skill.Education, Skill.Mechanics, Skill.Science],
           [Skill.Lifestyle, Skill.Persuade, Skill.Science],
           [Skill.Education, Skill.Lifestyle, Skill.Mechanics, Skill.Science],
           [Skill.Education, Skill.Lifestyle, Skill.Mechanics, Skill.Science],
           [Skill.Education, Skill.Lifestyle, Skill.Mechanics, Skill.Science],
           [],
           [
               "Laboratory|Workshop",
               "Access to Academic Library (all subjects)"
           ],
           4,
           [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.EtoilesMortant]: new IconicCareerModel(
           "Etoiles Mortant",
           "These traditionally female warriors are experts in covert operations, reconnaissance, and sabotage, particularly against the Dark Legion. They’re lightly armed and armoured, preferring to move quickly and silently rather than confronting the enemy head-on. The Etoiles Mortant even have the support of the Brotherhood, and many in their ranks have been given a degree of training in the Art. Though there is no official prohibition against male Etoiles Mortant, the overwhelming majority of Mortants are female.",
           [Faction.Bauhaus],
           [new MilitaryCareerPrerequisite(), new ExpertisePrerequisite(Skill.CloseCombat, 1), new VariableExpertisePrerequisite(Skill.Acrobatics, 1, Skill.Stealth, 1), new SourcePrerequisite(Source.Bauhaus)],
           2,
           [Skill.Acrobatics, Skill.CloseCombat, Skill.Stealth],
           [Skill.Mysticism, Skill.RangedWeapons, Skill.Willpower],
           [Skill.Acrobatics, Skill.CloseCombat, Skill.Stealth, Skill.Willpower],
           [Skill.Acrobatics, Skill.CloseCombat, Skill.Stealth, Skill.Willpower],
           [],
           [],
           [
               "P60 Punisher Handgun",
               "Punisher Short Sword",
               "Ballistic nylon suit",
               "Medium military shoulder pads"
           ],
           3,
           [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.StaffAndHandGuardian]: new IconicCareerModel(
           "Guardian of the Order of Staff and Hand",
           "Pilgrimage is an important milestone in a Bauhauser’s life, but it is also a vulnerable one. Pilgrims face many dangers on foreign worlds, and in the wilds between the cities, and not all of those dangers are physical. Away from the safety of a Bauhaus domain, pilgrims risk being exposed to foreign ideas as they cross paths with citizens from other megacorporations, or those who sit outside the corporate world. The Council of Electors founded the Order of Staff and Hand to help guard pilgrims against threats both physical and moral.",
           [Faction.Bauhaus],
           [new MilitaryCareerPrerequisite(), new PrimaryCareerPrerequisite(PrimaryCareer.Pilgrim), new ExpertisePrerequisite(Skill.Willpower, 2), new SourcePrerequisite(Source.Bauhaus)],
           2,
           [Skill.CloseCombat, Skill.Observation, Skill.Willpower],
           [Skill.Athletics, Skill.Persuade, Skill.RangedWeapons],
           [Skill.CloseCombat, Skill.Observation, Skill.Persuade, Skill.Willpower],
           [Skill.CloseCombat, Skill.Observation, Skill.Persuade, Skill.Willpower],
           [Skill.CloseCombat, Skill.Observation, Skill.Persuade, Skill.Willpower],
           [],
           [
               "Hussar Mk. V Armour",
               "Ironshod Ebony Staff",
               "HG-25 Equalizer Handgun",
           ],
           3,
           [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Homebuilder]: new IconicCareerModel(
           "Homebuilder",
           "Homebuilders – not to be confused with the common term ‘Homebuilders’ that Bauhausers often use to refer to themselves and their society – are dispatched to claim new domains. They’re usually under the command of a noble who has just received a Patent of Nobility or a new parcel of land, and who wishes to exploit that domain. Homebuilders are volunteers. They mostly consist of young men and women who seek adventure outside of the staid life of civilised domains and want to find their fortunes. The frontier gives them opportunities they would never find in an ordinary career. They’re jacks of all trades, as they need to be able to clear the jungle, build shelter, and fight to protect the domain against interlopers. Anyone can volunteer to become a Homebuilder, and there is always high demand for their skills.",
           [Faction.Bauhaus],
           [new ExpertisePrerequisite(Skill.Lifestyle, 1), new ExpertisePrerequisite(Skill.Survival, 1), new SourcePrerequisite(Source.Bauhaus)],
           1,
           [Skill.Athletics, Skill.Mechanics, Skill.Survival],
           [Skill.Lifestyle, Skill.Persuade, Skill.RangedWeapons],
           [Skill.Athletics, Skill.Lifestyle, Skill.Mechanics, Skill.Survival],
           [Skill.Athletics, Skill.Lifestyle, Skill.Mechanics, Skill.Survival],
           [],
           [],
           [
               EquipmentHelper.getColonialSurvivalKits(),
               "SG-35|HG-12 Handgun",
               "Extensive maps of new domains",
               "Compass"
           ],
           4,
           [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Juggernaut]: new IconicCareerModel(
           "Juggernaut",
           "Officially, these warriors are a specific sub-set of the Hussars – “Juggernaut” is a name given to them by their enemies. Each Armoured Hussar is fitted with an advanced suit of “Steel Strider” powered armour, designed for close quarters assaults in dense terrain. Many battles have been ended by a small squad of Juggernauts bursting through the terrain and laying waste to an unprepared foe. Many Armoured Hussars go on to pilot Vulkan Battlesuits.",
           [Faction.Bauhaus],
           [new MilitaryCareerPrerequisite(), new ExpertisePrerequisite(Skill.Athletics, 1), new ExpertisePrerequisite(Skill.CloseCombat, 1), new SourcePrerequisite(Source.Bauhaus)],
           2,
           [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons],
           [Skill.HeavyWeapons, Skill.Mechanics, Skill.UnarmedCombat],
           [Skill.Athletics, Skill.CloseCombat, Skill.Observation, Skill.Resistance],
           [Skill.Athletics, Skill.CloseCombat, Skill.Observation, Skill.Resistance],
           [Skill.Athletics, Skill.CloseCombat, Skill.Observation, Skill.Resistance],
           [],
           [
               "XO-102 'Steel Rider' Powered Armour"
           ],
           3,
           [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.SilverSkullJusticar]: new IconicCareerModel(
           "Justicar of the Order of the Silver Skull",
           "This colossal order is the military arm of the Ministry of Order. Its members serve to guard the great public buildings, such as the palaces of government. They have the same powers of arrest and detainment as the BLEUs, and are trained in riot suppression and the forcible maintenance of public order. Beyond these roles, the Order of the Silver Skull also deploys its Justicars to situations which require greater force of arms and military prowess than the BLEUs or Magistrates can bring to bear alone. Justicars are feared by the guilty, but they are seldom shown much respect by members of other Orders.",
           [Faction.Bauhaus],
           [new VariableExpertisePrerequisite(Skill.CloseCombat, 1, Skill.RangedWeapons, 1), new SourcePrerequisite(Source.Bauhaus)],
           1,
           [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
           [Skill.Athletics, Skill.Observation, Skill.Willpower],
           [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons, Skill.Willpower],
           [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons, Skill.Willpower],
           [],
           [],
           [
               "Hussar Mk. V Armour",
               "HG-14 Shotgun",
               "Bladed Nightstick",
               "Mini-torch"
           ],
           3,
           [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.OrderOfFearKommandant]: new IconicCareerModel(
           "Kommandant of the Order of Fear",
           "These dread warriors are renowned for their brutality and cruelty, and even the innocent fear their presence, for none wish to contemplate the Order of Fear’s unkind attentions. They seldom take to the field of battle unless circumstances are dire. Instead, their primary role is guarding, containing, and interrogating prisoners, and they are most commonly stationed in the infamous gulags, where their skills are frequently needed.",
           [Faction.Bauhaus],
           [new ExpertisePrerequisite(Skill.Persuade, 1), new ExpertisePrerequisite(Skill.Willpower, 2), new SourcePrerequisite(Source.Bauhaus)],
           2,
           [Skill.CloseCombat, Skill.Persuade, Skill.Willpower],
           [Skill.RangedWeapons, Skill.Resistance, Skill.Treatment],
           [Skill.CloseCombat, Skill.Persuade, Skill.Resistance, Skill.Willpower],
           [Skill.CloseCombat, Skill.Persuade, Skill.Resistance, Skill.Willpower],
           [Skill.CloseCombat, Skill.Persuade, Skill.Resistance, Skill.Willpower],
           [],
           [
               "Hussar Mk. V Armour",
               "Neurolash",
               "MP-103 Hellblazer SMG",
               "Interrogation tools"
           ],
           3,
           [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.MountedHussarVorreiter]: new IconicCareerModel(
           "Mounted Hussar (Vorreiter)",
           "These warriors serve as fast scouts and mobile reserves for their infantry counterparts. There are two broad kinds of Mounted Hussars, distinguished by the nature of their mount – those who ride into battle upon raptors, and those who ride upon the distinctive Vorreiter tracked bike. There’s a fierce rivalry between these two cadres of warrior, and they regard one another as the ‘poor cousins’.",
           [Faction.Bauhaus],
           [new MilitaryCareerPrerequisite(), new SourcePrerequisite(Source.Bauhaus)],
           2,
           [Skill.Observation, Skill.Pilot, Skill.RangedWeapons],
           [Skill.HeavyWeapons, Skill.Resistance, Skill.Survival],
           [Skill.HeavyWeapons, Skill.Observation, Skill.Pilot, Skill.RangedWeapons],
           [Skill.HeavyWeapons, Skill.Observation, Skill.Pilot, Skill.RangedWeapons],
           [Skill.HeavyWeapons, Skill.Observation, Skill.Pilot, Skill.RangedWeapons],
           [],
           [
               "Hussar Mk. IV Armour",
               "MP-105 Machine Pistol",
               "Vorreiter tracked bike"
           ],
           2,
           [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.MountedHussarRaptorRider]: new IconicCareerModel(
           "Mounted Hussar (Raptor Rider)",
           "These warriors serve as fast scouts and mobile reserves for their infantry counterparts. There are two broad kinds of Mounted Hussars, distinguished by the nature of their mount – those who ride into battle upon raptors, and those who ride upon the distinctive Vorreiter tracked bike. There’s a fierce rivalry between these two cadres of warrior, and they regard one another as the ‘poor cousins’.",
           [Faction.Bauhaus],
           [new MilitaryOrRuralCareerPrerequisite(), new ExpertisePrerequisite(Skill.AnimalHandling, 1), new SourcePrerequisite(Source.Bauhaus)],
           2,
           [Skill.AnimalHandling, Skill.CloseCombat, Skill.Observation],
           [Skill.RangedWeapons, Skill.Resistance, Skill.Survival],
           [Skill.AnimalHandling, Skill.CloseCombat, Skill.Observation, Skill.Survival],
           [Skill.AnimalHandling, Skill.CloseCombat, Skill.Observation, Skill.Survival],
           [Skill.AnimalHandling, Skill.CloseCombat, Skill.Observation, Skill.Survival],
           [],
           [
               "Hussar Mk. IV Armour",
               "MP-105 Machine Pistol",
               "Machete",
               "SI-34 Thermite Lance",
               "Venusian Raptor mount"
           ],
           2,
           [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Templar]: new IconicCareerModel(
           "Templar",
           "Templars belong to military orders, blurring the line between duty and devotion. They are warriors with an enormous dedication and a fanatical belief in both the Bauhaus corporation and the Cardinal’s cause. Individual Orders vary in nature and purpose a considerable degree, with some being de facto parts of the Ministry of War, while others are independent organisations, or controlled by other Ministries. The most devout of these Orders may even be granted training in the Art, something normally reserved for members of the Brotherhood.",
           [Faction.Bauhaus],
           [new PrimaryCareerPrerequisite(PrimaryCareer.Pilgrim), new VariableExpertisePrerequisite(Skill.CloseCombat, 1, Skill.RangedWeapons, 1), new SourcePrerequisite(Source.Bauhaus)],
           3,
           [Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
           [Skill.Athletics, Skill.Insight, Skill.Mysticism],
           [Skill.CloseCombat, Skill.RangedWeapons, Skill.Mysticism, Skill.Willpower],
           [Skill.CloseCombat, Skill.RangedWeapons, Skill.Mysticism, Skill.Willpower],
           [Skill.CloseCombat, Skill.RangedWeapons, Skill.Mysticism, Skill.Willpower],
           [Skill.CloseCombat, Skill.RangedWeapons, Skill.Mysticism, Skill.Willpower],
           [
               "Guardsman Mk. III Armour",
               "Templar Sword|Templar Axe|Templar Spear",
               "P60 Punisher Handgun|HG-25 Equalizer Handgun",              
           ],
           2,
           [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.VenusianRanger]: new IconicCareerModel(
           "Venusian Ranger",
           "The most famous of all Bauhauser Special Forces, the Venusian Rangers are trained in a wide range of military disciplines, and an intense regime of physical conditioning. Very few qualify for the Rangers, and fewer can complete the arduous training regime, which results in hardened, lethal men and women.",
           [Faction.Bauhaus],
           [new MilitaryCareerPrerequisite(), new ExpertisePrerequisite(Skill.RangedWeapons, 2), new AnyExpertisePrerequisite([Skill.Athletics, Skill.Stealth, Skill.Survival, Skill.Willpower], 1), new SourcePrerequisite(Source.Bauhaus)],
           3,
           [Skill.Athletics, Skill.RangedWeapons, Skill.Survival],
           [Skill.CloseCombat, Skill.Stealth, Skill.Willpower],
           [Skill.Athletics, Skill.RangedWeapons, Skill.Stealth, Skill.Survival],
           [Skill.Athletics, Skill.RangedWeapons, Skill.Stealth, Skill.Survival],
           [Skill.Athletics, Skill.RangedWeapons, Skill.Stealth, Skill.Survival],
           [Skill.Athletics, Skill.RangedWeapons, Skill.Stealth, Skill.Survival],
           [
               "Guardsman Mk. III Armour",
               "Panzerknacker Assault Rifle",
               "Heavy Cloak (counts as camouflage)"
           ],
           3,
           [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.DemonHunter]: new IconicCareerModel(
            "Demon Hunter",
            "In order to provide the people of Mishima with the defence they sorely need against the Darkness, the Order of Demon Hunters was founded during the Neronian Schism. Each Demon Hunter is rigorously trained upon Mercury’s Forbidden Isle, and not everyone survives the process. Those who emerge triumphant are mighty warriors against the forces of Darkness, permitted to wield some of the mightiest weapons and clad themselves in the mightiest armour. They are given the absolute freedom of all Mishiman realms, the better to hunt down Heretics and monsters.",
            [Faction.Mishima],
            [new ExpertisePrerequisite(Skill.Willpower, 2), new NoKiSchoolPrerequisite(), new SourcePrerequisite(Source.Mishima)],
            3,
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [Skill.HeavyWeapons, Skill.Insight, Skill.Mysticism],
            [Skill.CloseCombat, Skill.Insight, Skill.RangedWeapons, Skill.Willpower],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [],
            [
                "Kariudo Powersuit",
                "Darkslayer katana",
                "Darkslayer katana",
                "Dragonfire HMG",
                "Mystic talisman"
            ],
            4,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.VoidWasp]: new IconicCareerModel(
            "Void Wasp",
            "An elite order of samurai fighter pilots, the Void Wasps began within the Amida keiretsu, and it has spread amongst the war-fleets of each of the Lord Heirs. Each Void Wasp chooses to focus his skills upon the deadly dance of airborne and voidborne warfare, rather than upon the more traditional arts of sword and gun.",
            [Faction.Mishima],
            [new StatusPrerequisite(Status.Ronin), new ExpertisePrerequisite(Skill.Pilot, 2), new SourcePrerequisite(Source.Mishima)],
            2,
            [Skill.Pilot, Skill.RangedWeapons, Skill.Space],
            [Skill.Gunnery, Skill.Survival, Skill.Vacuum],
            [Skill.Gunnery, Skill.Pilot, Skill.Space, Skill.Vacuum],
            [Skill.Gunnery, Skill.Pilot, Skill.Space],
            [Skill.Gunnery, Skill.Pilot, Skill.Space],
            [],
            [
                "Suzumebachi-class Interceptor",
                "Vac Suit"
            ],
            4,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Noble]: new IconicCareerModel(
            "Noble",
            "The elite of Mishima, the high shareholders, are born to the boardroom. As well as holding positions of senior responsibility within their keiretsu, these scions of power are formidable warriors, for they train with the best instructors and have access to top-ofthe-line equipment.",
            [Faction.Mishima],
            [new StatusPrerequisite(Status.HighShareholder), new SourcePrerequisite(Source.Mishima)],
            3,
            [Skill.CloseCombat, Skill.Command, Skill.Lifestyle],
            [Skill.Persuade, Skill.RangedWeapons, Skill.Willpower],
            [Skill.CloseCombat, Skill.Command, Skill.Lifestyle, Skill.Willpower],
            [Skill.CloseCombat, Skill.Command, Skill.Lifestyle],
            [],
            [],
            [
                "Kote Powersuit",
                "Katana",
                "Wakizashi",
                "Shogun Assault Rifle",
                "Bespoke business suit"
            ],
            6,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Hatamoto]: new IconicCareerModel(
            "Hatamoto",
            "These samurai may not be from the highest-status families, but they enjoy great prestige, for they are the most trusted retainers of their lords. A hatamoto serves directly under the daimyo of a keiretsu, a Lord Heir, or the Overlord himself. Hatamoto serve as their daimyos’ personal bodyguards, and are also trusted with the most delicate and important duties, such as conveying secret messages, protecting vital resources, and looking after family members and visiting dignitaries.",
            [Faction.Mishima],
            [new StatusPrerequisite(Status.Ronin), new SourcePrerequisite(Source.Mishima)],
            3,
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Lifestyle, Skill.Persuade, Skill.UnarmedCombat],
            [Skill.CloseCombat, Skill.Persuade, Skill.UnarmedCombat, Skill.Willpower],
            [Skill.CloseCombat, Skill.Persuade, Skill.Willpower],
            [Skill.CloseCombat, Skill.Persuade, Skill.Willpower],
            [],
            [
                "Kote Powersuit",
                "Katana",
                "Wakizashi",
                "Shogun Assault Rifle"
            ],
            4,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.GuildMaster]: new IconicCareerModel(
            "Guild Master",
            "The master craftsmen of the guilds are those who have been recognised as experts in their craft. They are accorded great respect within their guild, and by outsiders if their trade is a prestigious one, such as swordsmithing, music, or engineering. Masters are entitled to vote on resolutions at guild meetings and to set up their own businesses without prior permission from the guild – only the local daimyo’s assent is needed.",
            [Faction.Mishima],
            [new CommonerPrerequisite(), new ExpertisePrerequisite(Skill.Education, 2), new ExpertisePrerequisite(Skill.Lifestyle, 1), new SourcePrerequisite(Source.Mishima)],
            2,
            [Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [Skill.Education, Skill.Mechanics, Skill.Science],
            [Skill.Education, Skill.Lifestyle, Skill.Mechanics, Skill.Science],
            [Skill.Education, Skill.Lifestyle, Skill.Mechanics, Skill.Science],
            [Skill.Education, Skill.Lifestyle, Skill.Mechanics, Skill.Science],
            [],
            [
                "Symbol of office"
            ],
            5,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Ronin]: new IconicCareerModel(
            "Ronin",
            "Legions of masterless samurai wander the realms of Mishima and beyond, making a living as mercenaries, spies, bandits, and enforcers. Much persecuted, these dregs of the samurai caste are still skilled warriors who must be treated with caution. This character type represents a samurai who, willingly or not, has settled in to the uncertain lifestyle of the ronin. For one who has only recently become masterless, any of the other samurai-caste archetypes may be used to reflect the character’s experiences and training.",
            [Faction.Mishima],
            [new StatusPrerequisite(Status.Ronin), new SourcePrerequisite(Source.Mishima)],
            1,
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Survival],
            [Skill.Persuade, Skill.Stealth, Skill.Willpower],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Survival, Skill.Willpower],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Survival],
            [],
            [],
            [
                "Sode Battlesuit",
                "Katana",
                "Wakizashi",
                "Shogun Assault Rifle",
                EquipmentHelper.getSurvivalKits()
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.ModelWorker]: new IconicCareerModel(
            "Model Worker",
            "The biggest celebrities on Mishima TV are the model workers – reality show stars whose heavily directed day-to-day lives are broadcast by the keiretsu as propaganda to encourage harmonious behaviour in the viewership. The most successful model workers succeed because they are able to make their lives interesting while navigating the numerous and constantly shifting content guidelines of the censorship board.",
            [Faction.Mishima],
            [new CommonerPrerequisite(), new SourcePrerequisite(Source.Mishima)],
            2,
            [Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [Skill.Athletics, Skill.Mechanics, Skill.Observation],
            [Skill.Education, Skill.Mechanics, Skill.Observation, Skill.Persuade],
            [Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [],
            [
                "Mobile phone",
                "High-quality version of work-appropriate clothing"
            ],
            4,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.InspectorMagistrate]: new IconicCareerModel(
            "Inspector-Magistrate",
            "The inspector-magistrates of Mercury are empowered to act as police, judge, jury, and – when necessary – executioner. Formed to replace the Panopticon AI system after the coming of the Dark Symmetry, the inspector-magistrates work for the Ga-Mon Office, which serves the Lord Heir directly to ensure order through the Mercurian provinces. The majority of inspector-magistrates are assigned to a district and conduct street patrols. They may later rise in the ranks to command positions or to detective teams.",
            [Faction.Mishima],
            [new StatusPrerequisite(Status.Ronin), new MilitaryOrPoliceCareerPrerequisite(), new SourcePrerequisite(Source.Mishima)],
            1,
            [Skill.CloseCombat, Skill.Observation, Skill.Persuade],
            [Skill.RangedWeapons, Skill.Thievery, Skill.Willpower],
            [Skill.CloseCombat, Skill.Observation, Skill.Persuade, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Observation, Skill.Persuade],
            [],
            [],
            [
                "Sode Battlesuit",
                "Katana",
                "Wakizashi"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.MartialArtist]: new IconicCareerModel(
            "Martial Artist",
            "Students of Mishima’s unique martial arts schools are trained not only in combat techniques but also in the use of Ki powers. Commoners and members of suppressed schools are frequent targets of persecution from the authorities.",
            [Faction.Mishima],
            [new KiSchoolPrerequisite(), new SourcePrerequisite(Source.Mishima)],
            99,
            [Skill.CloseCombat, Skill.UnarmedCombat, Skill.Willpower],
            [Skill.Acrobatics, Skill.Education, Skill.Observation],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.UnarmedCombat, Skill.Willpower],
            [],
            [],
            [],
            [
                "School training garb"
            ],
            1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.ShadowWalkerCultist]: new IconicCareerModel(
            "Shadow Walker Cultist",
            "Active members of the dreaded Shadow Walker Cult are trained to be unstoppable assassins. Raised to be killers and spies from birth, these children of the shadows are never permitted to leave the organisation, though they may appear to take other careers as part of a disguise.",
            [Faction.Mishima],
            [new ExpertisePrerequisite(Skill.Stealth, 2), new NoKiSchoolPrerequisite(), new SourcePrerequisite(Source.Mishima)],
            2,
            [Skill.Acrobatics, Skill.Observation, Skill.Stealth],
            [Skill.CloseCombat, Skill.Insight, Skill.Thievery],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Observation, Skill.Stealth],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Stealth],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Stealth],
            [],
            [
                "Katana",
                "Whisper Machine Pistol",
                "Shinobi robes",
                "Shuriken",
                "Blinding powder (5 uses)",
                "Mortuary enzymes"
            ],
            1,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Seeker]: new IconicCareerModel(
            "Seeker",
            "Although Whitestar insist that they do not need their help, the Brotherhood have charged their Watchmen with the guardianship of Dark Eden and its inhabitants. The Seekers were established to hunt down and destroy anyone who threatened that edict. Drawn from the Second Directorate and its Mortificator program, the Seekers are trained extensively in sniping rather than close combat, and are instead taught to stalk their prey across the harsh environments of Dark Eden as opposed to the sewers and back alleys of the corporate jungles. Like their renowned counterparts, each Seeker is trained in the use of an Aspect of the Art, which gives them a distinct advantage when tracking an opponent across the desolate wastelands of Earth.",
            [Faction.Brotherhood],
            [new TalentPrerequisite("Mystic"), new ExpertisePrerequisite(Skill.Insight, 1), new ExpertisePrerequisite(Skill.Observation, 1), new ExpertisePrerequisite(Skill.Survival, 1), new SourcePrerequisite(Source.DarkEden)],
            2,
            [Skill.Mysticism, Skill.RangedWeapons, Skill.Survival],
            [Skill.Athletics, Skill.Observation, Skill.Stealth],
            [Skill.Mysticism, Skill.RangedWeapons, Skill.Stealth],
            [Skill.Mysticism, Skill.Observation, Skill.RangedWeapons, Skill.Stealth],
            [Skill.Mysticism, Skill.Observation, Skill.RangedWeapons, Skill.Stealth],
            [Skill.Mysticism, Skill.Observation, Skill.RangedWeapons, Skill.Stealth],
            [
                "Quietus Armour",
                "'Gift of the Cardinal' Sniper Rifle",
                "P60 Punisher Handgun"
            ],
            0,
            [Timeline.DarkEden]),
        [IconicCareer.Watchman]: new IconicCareerModel(
            "Watchman",
            "Members of the First Directorate of the Brotherhood assigned to Dark Eden are called Watchmen. They are the planet’s protectors, sworn to guard the native peoples from corruption by either the Dark Soul or corporate agents. They are as happy to eliminate corporate infiltrators as they are cultists of the Dark Legion. Brotherhood Watchmen move overtly among the peoples of Dark Eden, ever alert for signs or servants of the Dark Soul.They not only monitor and report on the communities they watch, but also work to eradicate the corruption and taint of the Darkness wherever they find it.",
            [Faction.Brotherhood],
            [new TalentPrerequisite("Mystic"), new ExpertisePrerequisite(Skill.Insight, 1), new ExpertisePrerequisite(Skill.Survival, 1), new SourcePrerequisite(Source.DarkEden)],
            3,
            [Skill.Insight, Skill.Mysticism, Skill.Survival],
            [Skill.Observation, Skill.Resistance, Skill.Willpower],
            [Skill.Insight, Skill.Mysticism, Skill.Survival],
            [Skill.Insight, Skill.Mysticism, Skill.Survival],
            [Skill.Insight, Skill.Mysticism, Skill.Survival],
            [Skill.Insight, Skill.Mysticism, Skill.Survival],
            [
                "Power controller",
                "Armoured Vestment",
            ],
            0,
            [Timeline.DarkEden]),
        [IconicCareer.EarthwatchSentinel]: new IconicCareerModel(
            "Earthwatch Sentinel",
            "Capitol has seeded hundreds of Earthwatch bases across Dark Eden and hidden them beneath the surface of the land or submerged them on the sea bed in shallow waters off the coasts. Their function is to watch and wait. Each base holds a complement of a dozen soldiers. Most are veterans of Capitol’s special forces; all are volunteers due to the nature of their work.",
            [Faction.Capitol],
            [new MilitaryCareerPrerequisite(), new ExpertisePrerequisite(Skill.RangedWeapons, 2), new SourcePrerequisite(Source.DarkEden)],
            2,
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Acrobatics, Skill.Resistance, Skill.Survival],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [],
            [
                "Tortoise Mk. 1 Armour",
                "M50 Assault Rifle",
                "Earthwatch Implant"
            ],
            3,
            [Timeline.DarkEden]),
        [IconicCareer.StozzahnRider]: new IconicCareerModel(
            "Stosszahn Rider",
            "A unique creation of the continuing interaction between Bauhaus and the Sons of Rasputin, the Stosszahn Riders are Bauhaus citizens who have taken to the ornery mounts of the Rasputin cavalry – Rivetbulls. Stationed at the Winter Palace with the ambassadorial retinue, or elsewhere as part of the military advisory staff, Stosszahn Riders learn the art of riding a Rivetbull as part of their attempts to fit in and ingratiate themselves with their Rasputin hosts. It also has a practical value in traversing the hostile terrain of the planet. Those who really catch the bug for gallivanting around on these huge beasts have been known to bring Rivetbulls back home with them. Small but sustainable populations of Rivetbulls now live in breeding farms on Venus.",
            [Faction.Bauhaus],
            [new MilitaryOrRuralCareerPrerequisite(), new ExpertisePrerequisite(Skill.AnimalHandling, 1), new SourcePrerequisite(Source.DarkEden)],
            2,
            [Skill.AnimalHandling, Skill.CloseCombat, Skill.Observation],
            [Skill.RangedWeapons, Skill.Resistance, Skill.Survival],
            [Skill.AnimalHandling, Skill.CloseCombat, Skill.Observation, Skill.Survival],
            [Skill.AnimalHandling, Skill.CloseCombat, Skill.Observation, Skill.Survival],
            [Skill.AnimalHandling, Skill.CloseCombat, Skill.Observation, Skill.Survival],
            [],
            [
                "Hussar Mk. IV Armour",
                "MP-105 Machine Pistol",
                "Machete",
                "SI-34 Thermite Lance",
                "Rivetbull mount"
            ],
            2,
            [Timeline.DarkEden]),
        [IconicCareer.ConquistadorCorsair]: new IconicCareerModel(
            "Conquistador Corsair",
            "In addition to its formal and acknowledged contact with the Lutheran Triad, Imperial has other, more deniable people working to further the corporation’s interests – and their own – around Dark Eden. These individuals are the Conquistadors Corsairs, seafaring cousins of the Conquistadors who have done so much to advance the fortunes and reputations of Imperial throughout the solar system. Conquistador Corsairs travel to Dark Eden via orbital transfer to Whitestar’s Kosmograd spaceport.From there, they make their way to the sea via the markets of Urgamal, picking up a crew of bodyguards, sailors, and specialists on the way.At the coast, usually either close to Vostmor or Mertvaya Voda, the Corsair will have a ship waiting.The vessel is bought and paid for by the corporation via a chain of intermediaries and cut-outs.",
            [Faction.Imperial],
            [new ExpertisePrerequisite(Skill.Command, 1), new ExpertisePrerequisite(Skill.Survival, 1), new SourcePrerequisite(Source.DarkEden)],
            2,
            [Skill.Command, Skill.Pilot, Skill.Survival],
            [Skill.Athletics, Skill.CloseCombat, Skill.Observation],
            [Skill.Command, Skill.Observation, Skill.Resistance, Skill.Survival],
            [Skill.CloseCombat, Skill.Command, Skill.Observation, Skill.Survival],
            [Skill.CloseCombat, Skill.Command, Skill.Observation, Skill.Survival],
            [],
            [
                "P60 Punisher Handgun|Punisher Short Sword",
                "NBC Suit",
                "Heavy civilian shoulder pads"
            ],
            4,
            [Timeline.DarkEden]),
        [IconicCareer.VoidWalker]: new IconicCareerModel(
            "Void Walker",
            "The training of Mishima’s shadow walkers is comprehensive, intense, often fatal, and turns out corporate spies who are a match for any in the solar system. What it has not done, historically, is prepare the trainee for action in the cold vacuum of space. Increased activity in orbit and the extensive development of corporate space fleets in recent years forced that to change.The result is a new kind of stealth operative, comfortable in a zero gravity environment.These agents are called Void Walkers.Their missions are fraught with danger, even more so than for the average shadow walker.",
            [Faction.Mishima],
            [new ExpertisePrerequisite(Skill.Stealth, 1), new ExpertisePrerequisite(Skill.Vacuum, 1), new NoKiSchoolPrerequisite(), new SourcePrerequisite(Source.DarkEden)],
            3,
            [Skill.CloseCombat, Skill.Space, Skill.Stealth],
            [Skill.RangedWeapons, Skill.Thievery, Skill.Willpower],
            [Skill.CloseCombat, Skill.Space, Skill.Stealth, Skill.Thievery],
            [Skill.CloseCombat, Skill.Space, Skill.Stealth, Skill.Thievery],
            [Skill.CloseCombat, Skill.Space, Skill.Stealth, Skill.Thievery],
            [Skill.CloseCombat, Skill.Space, Skill.Stealth, Skill.Thievery],
            [
                "Katana",
                "Ronin Handgun",
                "Kyo Suit",
                "Heavy civilian shoulder pads",
                "2 anti-armour grenades",
                "Rebreather"
            ],
            3,
            [Timeline.DarkEden]),
        [IconicCareer.Kameleon]: new IconicCareerModel(
            "Kameleon",
            "Cybertronic’s hunger for data on Dark Eden is insatiable. The corporation’s most valuable assets in gathering that information are the Kameleon agents of the Security, Warfare, and Intelligence Division. These undercover agents first of all undergo an extensive period of surgery and cranial reconstruction to remove the original bone and musculature behind their faces and replace it with a nonmetallic, semi solid compound that can be controlled and reshaped via a cerebral implant adapted from a subreality rig.",
            [Faction.Cybertronic],
            [new VariablePillarPrerequisite(Pillar.TIFF_SWI, Pillar.VAC_SWI), new ExpertisePrerequisite(Skill.Athletics, 1), new ExpertisePrerequisite(Skill.Stealth, 1), new SourcePrerequisite(Source.DarkEden)],
            2,
            [Skill.Athletics, Skill.Stealth, Skill.Survival],
            [Skill.Mechanics, Skill.Observation, Skill.RangedWeapons],
            [Skill.Athletics, Skill.Stealth, Skill.Survival, Skill.Willpower],
            [Skill.Observation, Skill.Stealth, Skill.Survival],
            [Skill.Observation, Skill.Stealth, Skill.Survival],
            [],
            [
                "Kameleon Stealth Suit",
                "Automask",
                "P1000 Handgun",
                "Subdermal Armour",
                "Cellular Link",
                "EYE-Tronic"
            ],
            3,
            [Timeline.DarkEden]),
        [IconicCareer.SeekerDarkSoul]: new IconicCareerModel(
            "Seeker",
            "These are the spies and observers of the cults. They are not the type of covert operative that specialises in sabotage and assassinations, rather they are experts at observing and reading people. Seekers are used to find and survey possible cult recruits. They have a very keen eye and find people who are disillusioned, disenfranchised, and feel helpless. The cult provides the Seeker with a cover story and identity. In most cases, they are given a very affluent lifestyle while under cover. They use these assets to lure and cajole potential recruits. Part of their job is also to weed out potential infiltrators, and keep an ear to the ground for investigators who might be on to the cult.",
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar, Faction.Brotherhood],
            [new IsHereticPrerequisite(), new ExpertisePrerequisite(Skill.Observation, 2), new ExpertisePrerequisite(Skill.Stealth, 2), new SourcePrerequisite(Source.DarkSoul)],
            2,
            [Skill.Observation, Skill.Stealth, Skill.Willpower],
            [Skill.Insight, Skill.Persuade, Skill.Thievery],
            [Skill.Insight, Skill.Observation, Skill.Persuade, Skill.Stealth],
            [Skill.Insight, Skill.Observation, Skill.Persuade, Skill.Stealth],
            [Skill.Insight, Skill.Observation, Skill.Persuade, Skill.Stealth],
            [],
            [
                "Three suits of clothing (different types and qualities)",
                "Three decent fake IDs"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.MasterOfRites]: new IconicCareerModel(
            "Master of Rites",
            "The Master of Rites sees to it that all ceremonies and rituals are conducted properly. He has the ability to commune with the Darkness and ask for its favour, granting Dark Gifts to his brothers and sisters while in the Inner Sanctum of a temple. There can be more than one Master of Rites in each temple, but the one with the highest rank leads most of the ceremonies, while the others maintain the Inner Sanctum and ensure that the traditions are being upheld. They devote their life to the study of the Apostles and Dark Symmetry, and are quite often very well versed in the use of Dark Gifts.",
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar, Faction.Brotherhood],
            [new IsHereticPrerequisite(), new ExpertisePrerequisite(Skill.Mysticism, 2), new ExpertisePrerequisite(Skill.Willpower, 2), new SourcePrerequisite(Source.DarkSoul)],
            3,
            [Skill.Mysticism, Skill.Persuade, Skill.Willpower],
            [Skill.Command, Skill.Insight, Skill.Observation],
            [Skill.Command, Skill.Insight, Skill.Mysticism, Skill.Willpower],
            [Skill.Command, Skill.Insight, Skill.Mysticism, Skill.Willpower],
            [Skill.Command, Skill.Insight, Skill.Mysticism, Skill.Willpower],
            [],
            [
                "Symbol of Office",
                "Tome of Profane Secrets",
                "Dark robes"
            ],
            5,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.VoidWeaver]: new IconicCareerModel(
            "Void Weaver",
            "Void Weavers are the elite symmetry users of Ilian’s cults, which says a lot, considering that her average Heretics are quite masterful. This profession trains the Heretic to observe and absorb other symmetry patterns with even greater proficiency. Void Weavers are rightfully feared. These Heretics can stand against the most implant-riddled powerhouse among Algeroth’s Heretics. Their complete control of the symmetry more than makes up for their lack of physical power.",
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar, Faction.Brotherhood],
            [new IsHereticPrerequisite(), new ApostlePrerequisite(Apostle.Ilian), new ExpertisePrerequisite(Skill.Mysticism, 2), new ExpertisePrerequisite(Skill.Insight, 1), new SourcePrerequisite(Source.DarkSoul)],
            3,
            [Skill.Mysticism, Skill.Observation, Skill.Willpower],
            [Skill.Command, Skill.Insight, Skill.Persuade],
            [Skill.Command, Skill.Insight, Skill.Mysticism, Skill.Willpower],
            [Skill.Command, Skill.Insight, Skill.Mysticism, Skill.Willpower],
            [],
            [],
            [
                "Sacred Tome of Ilian",
                "Dark robes",
                "Dagger of Ilian"
            ],
            4,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.FrozenSoul]: new IconicCareerModel(
            "Frozen Soul",
            "The Frozen Souls is the title given to an elite group of Heretics who has been trained in combining close and ranged combat with the use of Dark Symmetry. They are top tier agents and operatives, skilled in assassinations and urban warfare.",
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar, Faction.Brotherhood],
            [new IsHereticPrerequisite(), new ApostlePrerequisite(Apostle.Ilian), new ExpertisePrerequisite(Skill.Stealth, 2), new ExpertisePrerequisite(Skill.Persuade, 2), new SourcePrerequisite(Source.DarkSoul)],
            2,
            [Skill.Persuade, Skill.Stealth, Skill.Willpower],
            [Skill.CloseCombat, Skill.Mechanics, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Stealth, Skill.Willpower],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Stealth, Skill.Willpower],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Stealth, Skill.Willpower],
            [],
            [
                "Excellent false ID",
                "Cell phone",
                EquipmentHelper.getBEKits(),
                EquipmentHelper.getBalancedWeapons()
            ],
            4,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Destroyer]: new IconicCareerModel(
            "Destroyer",
            "Heretics who walk the path of Destroyers dedicate their lives to becoming the ultimate killing machines. Day in and day out they train in the Flesh Forge, honing their skills. Being able to withstand pain and injury, and delivering death, is all they know. Their bodies and minds are completely devoted to the cause, and when they are sent out from the temple they perform their duties with pleasure.",
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar, Faction.Brotherhood],
            [new IsHereticPrerequisite(), new ApostlePrerequisite(Apostle.Algeroth), new VariableExpertisePrerequisite(Skill.RangedWeapons, 2, Skill.CloseCombat, 2), new SourcePrerequisite(Source.DarkSoul)],
            3,
            [Skill.Acrobatics, Skill.CloseCombat, Skill.RangedWeapons],
            [Skill.Athletics, Skill.Stealth, Skill.Willpower],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Stealth],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Stealth],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Stealth],
            [],
            [
                EquipmentHelper.getMeleeWeapons(),
                EquipmentHelper.getRangedWeapons()
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Technomancer]: new IconicCareerModel(
            "Technomancer",
            "Technomancers are students of the twisted and insane science of Algeroth. They study the intricate mysteries of Black Technology, biotechnology and necrotechnology. They augment the soldiers of Algeroth using implants, as well as modifying and designing equipment.",
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar, Faction.Brotherhood],
            [new IsHereticPrerequisite(), new ApostlePrerequisite(Apostle.Algeroth), new ExpertisePrerequisite(Skill.Mechanics, 2), new ExpertisePrerequisite(Skill.Science, 2), new SourcePrerequisite(Source.DarkSoul)],
            3,
            [Skill.Education, Skill.Mechanics, Skill.Science],
            [Skill.Medicine, Skill.Treatment, Skill.Willpower],
            [Skill.Mechanics, Skill.Medicine, Skill.Science, Skill.Willpower],
            [Skill.Mechanics, Skill.Medicine, Skill.Science, Skill.Willpower],
            [Skill.Mechanics, Skill.Medicine, Skill.Science, Skill.Willpower],
            [],
            [
                "Mechanics Workshop|Laboratory",
                "Neurological Augmentation Implant",
                "Neural Conduit Necrobionic"
            ],
            4,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.StrainWeaver]: new IconicCareerModel(
            "Strain Weaver",
            "This profession deals less with actual infection, and more with the design and procurement of new viral and bacterial strains. Strain Weavers usually come from a medical background, and can range from EMTs, to nurses, to surgeons. They receive expert training in virology and the symmetry pattern of Demnogonis – particularly how it is applied to create new viral strains and illnesses that are beyond known medical science. Most Strain Weavers still hold part time jobs within the healthcare system, as it gives them access to material and test subjects, as well as the access to actually contaminate and infect if so ordered to.",
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar, Faction.Brotherhood],
            [new IsHereticPrerequisite(), new ApostlePrerequisite(Apostle.Demnogonis), new ExpertisePrerequisite(Skill.Medicine, 2), new SourcePrerequisite(Source.DarkSoul)],
            2,
            [Skill.Medicine, Skill.Resistance, Skill.Treatment],
            [Skill.Education, Skill.Science, Skill.Willpower],
            [Skill.Medicine, Skill.Resistance, Skill.Science, Skill.Willpower],
            [Skill.Medicine, Skill.Resistance, Skill.Science, Skill.Willpower],
            [Skill.Medicine, Skill.Resistance, Skill.Science, Skill.Willpower],
            [],
            [
                "Paramedic medikit",
                "Laboratory",
                "Personal library (Medicine)"
            ],
            4,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.DarkCarrier]: new IconicCareerModel(
            "Dark Carrier",
            "Dark Carriers work in the slums and the poorest areas of the cities. Some run soup kitchens, while others take on the roles of transients, wandering from homeless camp to homeless camp. Carriers are very important, and one is seldom like the other as they have many roles. Some focus on the spreading of disease, while others cultivate contacts and acquaintances among the street folk in order to set up and maintain a primitive but effective spy network.",
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar, Faction.Brotherhood],
            [new IsHereticPrerequisite(), new ApostlePrerequisite(Apostle.Demnogonis), new ExpertisePrerequisite(Skill.Treatment, 1), new ExpertisePrerequisite(Skill.Survival, 1), new SourcePrerequisite(Source.DarkSoul)],
            2,
            [Skill.Stealth, Skill.Survival, Skill.Treatment],
            [Skill.CloseCombat, Skill.Persuade, Skill.Thievery],
            [Skill.Persuade, Skill.Stealth, Skill.Survival, Skill.Treatment],
            [Skill.Persuade, Skill.Stealth, Skill.Survival, Skill.Treatment],
            [Skill.Persuade, Skill.Stealth, Skill.Survival, Skill.Treatment],
            [],
            [
                "Ragged clothing",
                "Case of empty phials and disease samples"
            ],
            1,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.EngineerOfCorruption]: new IconicCareerModel(
            "Engineer of Corruption",
            "Those who become Engineers of Corruption, often called Engineers, are master manipulators. They are adept at profiling individuals, foreseeing the outcome of situations, and setting things up so that the outcome is favourable to the Cult of Semai. Engineers are those who plan the rigging of political elections, or how to frame an innocent for a crime. They are also experts at finding out what a person wants and how to exploit it.",
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar, Faction.Brotherhood],
            [new IsHereticPrerequisite(), new ApostlePrerequisite(Apostle.Semai), new ExpertisePrerequisite(Skill.Lifestyle, 2), new ExpertisePrerequisite(Skill.Persuade, 2), new SourcePrerequisite(Source.DarkSoul)],
            3,
            [Skill.Lifestyle, Skill.Persuade, Skill.Stealth],
            [Skill.Command, Skill.Insight, Skill.Observation],
            [Skill.Command, Skill.Insight, Skill.Persuade, Skill.Stealth],
            [Skill.Command, Skill.Insight, Skill.Persuade, Skill.Stealth],
            [Skill.Command, Skill.Insight, Skill.Persuade, Skill.Stealth],
            [Skill.Command, Skill.Insight, Skill.Persuade, Skill.Stealth],
            [
                "Several sets of clothing of different qualities",
                "Three Excellent fake IDs",
                "Cell phone"
            ],
            6,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Reaper]: new IconicCareerModel(
            "Reaper",
            "The Heretics of Semai seldom act openly, but it does not mean that they cannot act directly. Reapers are master assassins and they dedicate their lives to the art of killing. They work alone, and can infiltrate installations and places others cannot. Their skill and dedication makes them invaluable, and Semai use them as commodity, lending out their expertise to the cults of his siblings in exchange for favours. Only Ilian never makes use of them, which suits Semai fine.",
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar, Faction.Brotherhood],
            [new IsHereticPrerequisite(), new ApostlePrerequisite(Apostle.Semai), new ExpertisePrerequisite(Skill.CloseCombat, 2), new ExpertisePrerequisite(Skill.Stealth, 2), new SourcePrerequisite(Source.DarkSoul)],
            3,
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Stealth],
            [Skill.Athletics, Skill.Observation, Skill.Resistance],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.Stealth],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.Stealth],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.Stealth],
            [],
            [
                "Soulscythe"
            ],
            6,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.EaterOfSouls]: new IconicCareerModel(
            "Eater of Souls",
            "When someone important is to be scouted for recruitment or driven insane, the cult sends an Eater of Souls. These heretics are masters of subtle as well as overt tactics aimed at poking and prodding at the psyche of an individual. They are used to watch and test the mental strength of a possible recruit or sent to drive someone insane in order to destroy their credibility. At times, a subtle approach is much more fitting than an assassination.",
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar, Faction.Brotherhood],
            [new IsHereticPrerequisite(), new ApostlePrerequisite(Apostle.Muawijhe), new ExpertisePrerequisite(Skill.Persuade, 2), new ExpertisePrerequisite(Skill.Willpower, 2), new SourcePrerequisite(Source.DarkSoul)],
            2,
            [Skill.Persuade, Skill.Treatment, Skill.Willpower],
            [Skill.Observation, Skill.Psychotherapy, Skill.Stealth],
            [Skill.Persuade, Skill.Psychotherapy, Skill.Stealth, Skill.Willpower],
            [Skill.Persuade, Skill.Psychotherapy, Skill.Stealth, Skill.Willpower],
            [Skill.Persuade, Skill.Psychotherapy, Skill.Stealth, Skill.Willpower],
            [],
            [
                "Basic medkit",
                "Disguise kit",
                "Surveillance kit"
            ],
            2,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.DreadShadow]: new IconicCareerModel(
            "Dread Shadow",
            "The Dread Shadows are the bogeymen, the monster under the bed and the childhood nightmares come to life. They are experts at gaining access to secure locations with the intent of killing, terrorizing or kidnapping an individual. With their skill set, the Dread Shadows are very adapted to acting as spies and assassins. But they seldom just watch, they also unhinge the individual. While Eater of Souls aim at recruiting or drive targets insane, the Dread Shadows wish to drive their victims insane before they kill them or simply make them disappear.",
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar, Faction.Brotherhood],
            [new IsHereticPrerequisite(), new ApostlePrerequisite(Apostle.Muawijhe), new ExpertisePrerequisite(Skill.Stealth, 2), new ExpertisePrerequisite(Skill.Willpower, 2), new SourcePrerequisite(Source.DarkSoul)],
            3,
            [Skill.CloseCombat, Skill.Stealth, Skill.Willpower],
            [Skill.Acrobatics, Skill.Observation, Skill.Persuade],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Stealth, Skill.Willpower],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Stealth, Skill.Willpower],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Stealth, Skill.Willpower],
            [],
            [
                "Knife",
                "Knife",
                EquipmentHelper.getCamouflageKits()
            ],
            1,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Messenger]: new IconicCareerModel(
            "Messenger",
            "Serving to help spread the Durand brothers’ message to the furthest corners of human endeavour, Messengers serve as a mixture of preachers, managers, spies, and ambassadors. A Messenger may spend one day overseeing a shelter or hospice, spreading the message through acts of compassion, and then spend the next in a fine suit negotiating a business deal. They are the brothers’ eyes and ears in the world, and their voice in the darkest parts of the solar system.",
            [Faction.Brotherhood],
            [new ExpertisePrerequisite(Skill.Observation, 1), new ExpertisePrerequisite(Skill.Persuade, 2), new ExpertisePrerequisite(Skill.Lifestyle, 1), new SourcePrerequisite(Source.Brotherhood)],
            1,
            [Skill.Lifestyle, Skill.Observation, Skill.Persuade],
            [Skill.Insight, Skill.Resistance, Skill.Willpower],
            [Skill.Lifestyle, Skill.Observation, Skill.Persuade, Skill.Willpower],
            [Skill.Lifestyle, Skill.Observation, Skill.Persuade, Skill.Willpower],
            [],
            [],
            [
                "Ballistic nylon clothing",
                "Light military shoulder pads",
                "Case full of pamphlets and literature"
            ],
            3,
            [Timeline.DarkSymmetry]),
        [IconicCareer.Hunter]: new IconicCareerModel(
            "Hunter",
            "These guerrilla fighters are expert combatants, drawn from disenfranchised veterans from the corporate armies. Given a new purpose and a truly vile enemy, these warriors put aside rivalries and grudges forged between the corporations, and form the elite cadre at the heart of Alexander Durand’s war against the Darkness.",
            [Faction.Brotherhood],
            [new ExpertisePrerequisite(Skill.CloseCombat, 2), new ExpertisePrerequisite(Skill.RangedWeapons, 2), new ExpertisePrerequisite(Skill.Willpower, 1), new SourcePrerequisite(Source.Brotherhood)],
            2,
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Acrobatics, Skill.Resistance, Skill.Stealth],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [
                EquipmentHelper.getSMGs(),
                "Bulletproof Vest",
                "Medium military shoulder pads"
            ],
            3,
            [Timeline.DarkSymmetry]),
        [IconicCareer.StudentOfTheArt]: new IconicCareerModel(
            "Student of the Art",
            "The Students of the Art are the Brotherhood’s secret weapon, learning the secrets of a miraculous power that few have ever grasped before. They are pioneers, studying the little-understood effects of the Light and learning how it can be turned into both a weapon and a shield against the Darkness. They study a wide range of subjects, learning how the Art relates to the world.",
            [Faction.Brotherhood],
            [new ExpertisePrerequisite(Skill.Willpower, 2), new ExpertisePrerequisite(Skill.Insight, 1), new SourcePrerequisite(Source.Brotherhood)],
            3,
            [Skill.Mysticism, Skill.Observation, Skill.Willpower],
            [Skill.Education, Skill.Insight, Skill.Science],
            [Skill.Insight, Skill.Mysticism, Skill.Observation, Skill.Willpower],
            [Skill.Insight, Skill.Mysticism, Skill.Observation, Skill.Willpower, Skill.BrotherhoodArt],
            [Skill.Insight, Skill.Mysticism, Skill.Observation, Skill.Willpower, Skill.BrotherhoodArt],
            [],
            [
                "Personal library (Education)|Personal library (Mysticism)|Personal library (Science)"
            ],
            4,
            [Timeline.DarkSymmetry]),
        [IconicCareer.FuryElite]: new IconicCareerModel(
            "Fury Elite",
            "While it consists entirely of warriors, the Fury is not part of the Brotherhood’s military. Instead, the stalwart warriors of the Fury are charged with a singular task – the protection of the Brotherhood and the Curia. They enter battle only at the side of one of their charges, and at least two Fury Elites will be found within a few metres of any member of the Curia at any given moment. Fury Elites are hand-picked from the very finest warriors in the Brotherhood, most commonly from amongst the ranks of the Sacred Warriors and the First Directorate’s Pilgrim Sentinels. Almost universally, Fury Elites are chosen from amongst those warriors who have learned to harness the Art, and their powers give them a considerable advantage over anyone who seeks to harm one of the Brotherhood’s rulers.",
            [Faction.Brotherhood],
            [new TalentPrerequisite("Mystic"), new ExpertisePrerequisite(Skill.CloseCombat, 2), new ExpertisePrerequisite(Skill.Willpower, 2), new SourcePrerequisite(Source.Brotherhood)],
            3,
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Willpower],
            [Skill.CloseCombat, Skill.Mysticism, Skill.Persuade],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Mysticism, Skill.Willpower],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Mysticism, Skill.Willpower, ...this._artAspects],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Mysticism, Skill.Willpower, ...this._artAspects],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Mysticism, Skill.Willpower, ...this._artAspects],
            [
                "Fury Battleplate",
                "Deliverer Power Sword",
                "Protector Power Shield"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.WarriorMystic]: new IconicCareerModel(
            "Warrior Mystic",
            "Warriors, as the name suggests, are commonly found on the battlefield, providing mystical support to Inquisitors and other military operations. Although the Second Directorate has many powerful practitioners of the Art – Inquisitors, Mortificators, and a variety of other elite warriors all possess powers of their own – even their greatest cannot match the versatility and potency of a skilled Distorter in the use of battlefield powers. These warriors typically concentrate on the Aspects of Kinetics, Elements, and Mentalism, for those are the most directly useful in combat. Warriors are most commonly identified by their heavy robes and armour, their frontline role requiring protection to supplement their powers.",
            [Faction.Brotherhood],
            [new TalentPrerequisite("Mystic"), new SourcePrerequisite(Source.Brotherhood)],
            2,
            [Skill.Mysticism, Skill.Observation, Skill.Willpower],
            [Skill.CloseCombat, Skill.Insight, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Mysticism, Skill.Observation, Skill.RangedWeapons],
            [Skill.AspectOfElements, Skill.AspectOfKinetics, Skill.AspectOfMentalism],
            [Skill.AspectOfElements, Skill.AspectOfKinetics, Skill.AspectOfMentalism],
            [],
            [
                "Power controller",
                "Mystic War-Robes",
                "P60 Punisher Handgun",
                "Punisher Short Sword",
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.HealerMystic]: new IconicCareerModel(
            "Healer Mystic",
            "Healers are similarly found in a public-facing role, serving in field hospitals and within the Sanatoria of Cathedrals. They all practice the Aspect of Exorcism, though most study other Aspects as well. Their healing abilities are legendary, and countless lives have been saved by the intervention of one of their number. A few, drawing upon another Aspect for defence, even take on the role of battlefield medics, healing wounds inflicted by bullet, blade, and dark sorcery alike. Healers wear similar garb to their warrior counterparts, though with some of the armour stripped away. The threat of terrorist attacks against Cathedral Sanatoria is an ever-present one, and even without such a threat, the armour serves as readily to protect against biological contaminants of the sort commonly found in hospitals.",
            [Faction.Brotherhood],
            [new TalentPrerequisite("Mystic"), new ExpertisePrerequisite(Skill.Treatment, 1), new SourcePrerequisite(Source.Brotherhood)],
            2,
            [Skill.Mysticism, Skill.Observation, Skill.Treatment],
            [Skill.Insight, Skill.Medicine, Skill.Psychotherapy],
            [Skill.Medicine, Skill.Mysticism, Skill.Psychotherapy, Skill.Treatment],
            [Skill.Medicine, Skill.Mysticism, Skill.Psychotherapy, Skill.Treatment, ...this._artAspects],
            [Skill.AspectOfExorcism],
            [],
            [
                "Power controller",
                "Armoured Vestment",
                "Rebreather",
                "Paramedic medikit"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.InterrogatorMystic]: new IconicCareerModel(
            "Interrogator Mystic",
            "Interrogators operate in the depths of the cathedrals, working in close cooperation with Inquisitors to extract information from particularly recalcitrant or stubborn suspects. While most Inquisitors are up to the task of interrogating suspects, with those who study the Aspects of Changeling or Manipulation being the most proficient, even their skills cannot always overcome the will or fortitude of their suspects. An Interrogator possesses a broader range of supernatural capabilities, and can devote himself far more deeply to the Art than an Inquisiton – who has other duties to consider – ever could. As a result, an Interrogator can frequently employ techniques, and combinations of techniques, that most Inquisitors do not possess. Interrogators are typically clad in plain, heavy robes and featureless masks, maintaining an intimidating presence that only adds to their effectiveness.",
            [Faction.Brotherhood],
            [new TalentPrerequisite("Mystic"), new ExpertisePrerequisite(Skill.Insight, 1), new SourcePrerequisite(Source.Brotherhood)],
            2,
            [Skill.Insight, Skill.Mysticism, Skill.Willpower],
            [Skill.Education, Skill.Observation, Skill.Persuade],
            [Skill.Education, Skill.Insight, Skill.Mysticism, Skill.Observation],
            [Skill.AspectOfChangeling, Skill.AspectOfExorcism, Skill.AspectOfManipulation, Skill.AspectOfMentalism],
            [Skill.AspectOfChangeling, Skill.AspectOfExorcism, Skill.AspectOfManipulation, Skill.AspectOfMentalism],
            [],
            [
                "Power controller",
                "Armoured Vestment",
                "Combat Helmet",
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.LiaisonMystic]: new IconicCareerModel(
            "Liaison Mystic",
            "Liaisons range further afield, operating alongside the ambassadorial and diplomatic teams of the Fourth Directorate. Their skills are invaluable to those of the Cell of Diplomats, providing deeper insights into the various parties involved in a negotiation. These skilled individuals never involve themselves directly in the activities they support, often communicating telepathically rather than vocally to avoid interposing themselves in the proceedings. Many choose to study the Aspect of Premonition as well as the more traditional Changellor Arts, using pre and post-cognitive insights to augment their understanding of situations and people. Liaisons are commonly garbed in fine suits or hooded robes that cover their faces in shadow – a Liaison’s duties seldom require direct interaction with outsiders, and a simple, unobtrusive appearance helps them go largely ignored.",
            [Faction.Brotherhood],
            [new TalentPrerequisite("Mystic"), new ExpertisePrerequisite(Skill.Persuade, 1), new SourcePrerequisite(Source.Brotherhood)],
            2,
            [Skill.Education, Skill.Mysticism, Skill.Persuade],
            [Skill.Command, Skill.Observation, Skill.Willpower],
            [Skill.Education, Skill.Mysticism, Skill.Observation, Skill.Persuade],
            [Skill.AspectOfChangeling, Skill.AspectOfExorcism, Skill.AspectOfManipulation, Skill.AspectOfMentalism],
            [Skill.AspectOfChangeling, Skill.AspectOfExorcism, Skill.AspectOfManipulation, Skill.AspectOfMentalism],
            [],
            [
                "Bespoke business suit",
                "Fine-quality hooded robe",
                "Power controller",
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.SeerMystic]: new IconicCareerModel(
            "Seer Mystic",
            "Prophets look to the future, attempting to discern valuable information about events yet to come. The further ahead they gaze, the more indistinct and uncertain the visions, but even the vaguest prophecy is worth recording and following up on, for it may be invaluable. The archives of each cathedral are piled high with annotated transcripts of prophecies and detailed studies of years yet to happen, which are frequently referred to, and expanded upon, as new insights are gained. Apprentices to the Cell of Seers serve by transcribing and referencing these records of the future, helping their masters understand the collected information and present it in a meaningful form. Significant future events – once corroborated by several Prophets – are presented to the Curia and the Cardinal to allow them to make preparations.",
            [Faction.Brotherhood],
            [new TalentPrerequisite("Mystic"), new ExpertisePrerequisite(Skill.Insight, 1), new SourcePrerequisite(Source.Brotherhood)],
            2,
            [Skill.Insight, Skill.Mysticism, Skill.Observation],
            [Skill.Education, Skill.Linguistics, Skill.Willpower],
            [Skill.Education, Skill.Insight, Skill.Mysticism, Skill.Observation],
            [Skill.Education, Skill.Mysticism, Skill.Observation, Skill.Persuade, ...this._artAspects],
            [Skill.AspectOfPremonition],
            [],
            [
                "Power controller",
                "Media kit",
                "Personal library (Education)|Personal library (Linguistics)|Personal library (Mysticism)"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.PilgrimResonator]: new IconicCareerModel(
            "Pilgrim Resonator",
            "Veteran Pilgrim Protectors are often chosen to serve in some greater capacity, joining either the selective ranks of the Resonators, or the Sentinels. Resonators are fitted with sophisticated implants, devised by the Order of Engineers, that allow them to employ the Resonator Helm. These devices interfere with the energies drawn upon by Mystics and other users of supernatural power, hindering the skills of Nepharites, Dark Magi, and other supernaturally-powered foes.",
            [Faction.Brotherhood],
            [new ExpertisePrerequisite(Skill.Willpower, 2), new PrimaryCareerPrerequisite(PrimaryCareer.PilgrimProtector), new SourcePrerequisite(Source.Brotherhood)],
            2,
            [Skill.Mysticism, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat],
            [Skill.CloseCombat, Skill.Mysticism, Skill.RangedWeapons, Skill.Willpower],
            [Skill.CloseCombat, Skill.Mysticism, Skill.RangedWeapons, Skill.Willpower, ...this._artAspects],
            [Skill.CloseCombat, Skill.Mysticism, Skill.RangedWeapons, Skill.Willpower, ...this._artAspects],
            [],
            [
                "Believer Armour",
                "Resonator Helmet"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.PilgrimSentinel]: new IconicCareerModel(
            "Pilgrim Sentinel",
            "Veteran Pilgrim Protectors are often chosen to serve in some greater capacity, joining either the selective ranks of the Resonators, or the Sentinels. Pilgrim Sentinels form an elite cadre within the Pilgrim Protectors, specialising in ambush and close quarters combat, striking against powerful servants of Darkness as directed by the Mystics they serve. Sentinels who triumph against the most powerful foes are candidates for the Fury Elite, the greatest and most respected warriors within the Brotherhood.",
            [Faction.Brotherhood],
            [new ExpertisePrerequisite(Skill.CloseCombat, 1), new ExpertisePrerequisite(Skill.RangedWeapons, 1), new PrimaryCareerPrerequisite(PrimaryCareer.PilgrimProtector), new SourcePrerequisite(Source.Brotherhood)],
            2,
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Stealth],
            [Skill.Mysticism, Skill.Observation, Skill.Willpower],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Stealth, Skill.Willpower],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Stealth, Skill.Willpower],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Stealth, Skill.Willpower],
            [],
            [
                "Believer Armour",
                "Deliverer Power Sword",
                "Nemesis Handgun"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Revisor]: new IconicCareerModel(
            "Revisor",
            "The Cell of Intelligence is considered to be the ideal posting for Revisors, and it is rare for a senior Revisor to have achieved his status outside of this group; while their activities in the Cell of Inquisitors are vital, they often go unappreciated. Further, where the Cell of Inquisitors is focussed primarily on overcoming the Dark Symmetry, the Cell of Intelligence has a far broader remit, gathering information from and about a wide range of sources.",
            [Faction.Brotherhood],
            [new TalentPrerequisite("Mystic"), new ExpertisePrerequisite(Skill.Persuade, 1), new ExpertisePrerequisite(Skill.Observation, 1), new SourcePrerequisite(Source.Brotherhood)],
            3,
            [Skill.Observation, Skill.Persuade, Skill.Willpower],
            [Skill.Insight, Skill.Mysticism, Skill.Stealth],
            [Skill.Mysticism, Skill.Observation, Skill.Persuade, Skill.Stealth],
            [Skill.Mysticism, Skill.Observation, Skill.Persuade, Skill.Stealth, ...this._artAspects],
            [Skill.Mysticism, Skill.Observation, Skill.Persuade, Skill.Stealth, ...this._artAspects],
            [Skill.Mysticism, Skill.Observation, Skill.Persuade, Skill.Stealth, ...this._artAspects],
            [
                "Three different suits of corporate quality clothing",
                "Two excellent fake IDs"
            ],
            4,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.SacredWarrior]: new IconicCareerModel(
            "Sacred Warrior",
            "The Sacred Warriors are answerable to very few individuals, and their chain of command is extremely shallow. Individual Sacred Warriors may support an Inquisitor’s operations, or to join a Cartel Doomtrooper strike force for a protracted period, and a complex, deep chain of command would hinder this necessary flexibility. The Cell is split into small squads – seldom consisting of more than half a dozen warriors, and never more than a dozen – who are directed and assigned by the High Inquisitor, the Curia, and the Cardinal as required.",
            [Faction.Brotherhood],
            [new ExpertisePrerequisite(Skill.CloseCombat, 2), new ExpertisePrerequisite(Skill.Willpower, 1), new SourcePrerequisite(Source.Brotherhood)],
            2,
            [Skill.Athletics, Skill.CloseCombat, Skill.Willpower],
            [Skill.Acrobatics, Skill.Command, Skill.Mysticism],
            [Skill.Athletics, Skill.CloseCombat, Skill.Command, Skill.Willpower],
            [Skill.Athletics, Skill.CloseCombat, Skill.Command, Skill.Willpower],
            [Skill.Athletics, Skill.CloseCombat, Skill.Command, Skill.Willpower],
            [],
            [
                "Sacred Warrior Battle Armour",
                "Avenger Power Sword",
                "Protector Power Shield"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.BrotherhoodEliteTrooper]: new IconicCareerModel(
            "Brotherhood Elite Trooper",
            "Brotherhood Troopers are recruited from all walks of life, both within and without the Brotherhood. In theory, almost any person within the Brotherhood who does not have some other militarily-valuable role can be called to fight as a Trooper, but a dedicated core of professional full-time soldiers exists within the Second Directorate that will be called upon in preference to militia reserves from other Directorates.",
            [Faction.Brotherhood],
            [new ExpertisePrerequisite(Skill.CloseCombat, 1), new ExpertisePrerequisite(Skill.RangedWeapons, 1), new SourcePrerequisite(Source.Brotherhood)],
            1,
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Acrobatics, Skill.Athletics, Skill.Survival],
            [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [],
            [],
            [
                "Believer Armour",
                "Retaliator Sword",
                "Guardian Shield"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Archon]: new IconicCareerModel(
            "Archon",
            "Archangels are the Brotherhood’s pilot corps, Art-wielding expert aviators who employ the Aspect of Mentalism to heighten their piloting skills far beyond those of even the most skilled mundane pilots. The sophisticated Icarus Jetfighters they fly are craft from an age long passed, exceptionally challenging to operate without complex electronic control systems. Archangels revel in the fact that their skill – both mundane and supernatural – allows them to operate such deadly aircraft effectively. The best amongst them are known as Archons, and they are charged with operating and navigating the Brotherhood’s spacecraft.",
            [Faction.Brotherhood],
            [new TalentPrerequisite("Mystic"), new MentalismAspectPrerequisite(Skill.AspectOfMentalism), new ExpertisePrerequisite(Skill.Pilot, 2), new SourcePrerequisite(Source.Brotherhood)],
            3,
            [Skill.HeavyWeapons, Skill.Mysticism, Skill.Pilot],
            [Skill.Mechanics, Skill.RangedWeapons, Skill.Space],
            [Skill.HeavyWeapons, Skill.Mysticism, Skill.Pilot, Skill.Space],
            [Skill.HeavyWeapons, Skill.Mysticism, Skill.Pilot, Skill.Space, ...this._artAspects],
            [Skill.HeavyWeapons, Skill.Mysticism, Skill.Pilot, Skill.Space, ...this._artAspects],
            [Skill.HeavyWeapons, Skill.Mysticism, Skill.Pilot, Skill.Space, ...this._artAspects],
            [
                "Icarus Jetfighter|Daedalus Starfighter"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Vestal]: new IconicCareerModel(
            "Vestal",
            "Valkyries are elite shock-troops, composed entirely of female Artcapable warriors. Idealised by those outside the Brotherhood as being stunningly beautiful warrior-maidens, these warriors are far more terrifying in reality than the propaganda suggests. Their ferocity and ruthless efficiency in battle paint a very different picture to the angelic figures depicted in pulp novels and motion pictures. Both orders employ the Castigator power spear, a weapon that only they are trained to wield. Valkyries are rapid assault troops, descending from the skies to strike into the heart of an enemy force. Veteran Valkyries become leaders known as Vestals, or move on to become Inquisitors, and most choose to retain their signature armaments, frequently using the status and reputations of the Valkyries as an asset in investigations and negotiations. This Blessed Sisterhood is commonly called upon to liaise between the Brotherhood’s military and that of the corporations.",
            [Faction.Brotherhood],
            [new PrimaryCareerPrerequisite(PrimaryCareer.Valkyrie), new ExpertisePrerequisite(Skill.Persuade, 1), new SourcePrerequisite(Source.Brotherhood)],
            2,
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Command],
            [Skill.Persuade, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Command, Skill.Willpower],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Command, Skill.Mysticism, Skill.Willpower, ...this._artAspects],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Command, Skill.Mysticism, Skill.Willpower, ...this._artAspects],
            [],
            [
                "Power controller"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Crucifier]: new IconicCareerModel(
            "Crucifier",
            "Crucifiers are amongst the strangest and deadliest of the Brotherhood’s warriors. The works of the Order of Engineers created a sophisticated and powerful suit of powered armour, controlled through use of the Art rather than forbidden cybernetics. A Crucifier – already a potent warrior – undergoes extensive and invasive neurosurgery to implant the connections and control interface into his brain, allowing him to operate the Crucifier ExoArmour. The procedure connects directly into the parts of the brain that control the Art, with most applicants sacrificing mystical power for the ability to use this armour. This armour is fitted with a pair of additional limbs, which the warrior must learn to control as effectively as his original ones.",
            [Faction.Brotherhood],
            [new TalentPrerequisite("Mystic"), new ExpertisePrerequisite(Skill.CloseCombat, 2), new SourcePrerequisite(Source.Brotherhood)],
            3,
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Observation],
            [Skill.Athletics, Skill.CloseCombat, Skill.Insight],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.Insight],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.Insight],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.Insight],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.Insight],
            [
                "Crucifier Exo-Armour",
                "Mortis Sword",
                "Mortis Sword",
                "Nemesis Handgun",
                "Nemesis Handgun"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Locator]: new IconicCareerModel(
            "Locator",
            "The Order of Locators are analysts and researchers, whose efforts are directed towards determining where artefacts and technologies that still pose a threat may be located. The role is an unglamorous one, but even the lowliest Locator is a skilled and diligent analyst, able to discern patterns in unlikely places and identifying likely artefact locations through reports of seemingly coincidental events. It is rare that a Locator is required to enter the field personally – Inquisitors, Revisors, and squads of Troopers are far better tools for search and recovery operations – but the availability of military forces is not always guaranteed, and occasionally these Brothers must take up arms and recover the artefacts themselves. As all members of the Brotherhood must be ready and able to fight the forces of the Dark Legion, Locators are not as ill-equipped for this as they might seem at first.",
            [Faction.Brotherhood],
            [new ExpertisePrerequisite(Skill.Education, 1), new ExpertisePrerequisite(Skill.Insight, 1), new SourcePrerequisite(Source.Brotherhood)],
            2,
            [Skill.Education, Skill.Insight, Skill.Observation],
            [Skill.Mysticism, Skill.Science, Skill.Willpower],
            [Skill.Education, Skill.Insight, Skill.Mysticism, Skill.Observation],
            [Skill.Education, Skill.Insight, Skill.Mysticism, Skill.Observation],
            [Skill.Education, Skill.Insight, Skill.Mysticism, Skill.Observation],
            [],
            [
                "Formal robes",
                "Corporate-quality formal clothing",
                "Personal library (Education)|Personal library (Mysticism)|Personal library (Science)"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Caretaker]: new IconicCareerModel(
            "Caretaker",
            "The members of the Order of Caretakers are those tasked with cataloguing, studying, and containing the artefacts confiscated by the Brotherhood. They determine the nature of each item recovered, learning all they can about it, and deciding whether or not it should be sealed away, destroyed, or stored for later use. They frequently work in close concert with the First Directorate, whose Mystics can often discern information about artefacts that others cannot.",
            [Faction.Brotherhood],
            [new ExpertisePrerequisite(Skill.Education, 1), new ExpertisePrerequisite(Skill.Science, 1), new SourcePrerequisite(Source.Brotherhood)],
            2,
            [Skill.Education, Skill.Science, Skill.Willpower],
            [Skill.Linguistics, Skill.Mechanics, Skill.Mysticism],
            [Skill.Education, Skill.Mysticism, Skill.Science, Skill.Willpower],
            [Skill.Education, Skill.Mysticism, Skill.Science, Skill.Willpower],
            [Skill.Education, Skill.Mysticism, Skill.Science, Skill.Willpower],
            [],
            [
                "Robes",
                "Work overalls",
                "Personal laboratory"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Artisan]: new IconicCareerModel(
            "Artisan",
            "The Artisans, supported by Craftsmen studying under them, craft and customise equipment on request from individual Brothers. However, only select individuals within the Directorates have the right to make such requests – normally full-time elite and veteran soldiers, and prized individuals like Mystics and Inquisitors. Other Craftsmen manufacture ammunition, and perform standard maintenance and repairs.",
            [Faction.Brotherhood],
            [new ExpertisePrerequisite(Skill.Mechanics, 2), new ExpertisePrerequisite(Skill.Science, 1), new SourcePrerequisite(Source.Brotherhood)],
            2,
            [Skill.Education, Skill.Mechanics, Skill.Science],
            [Skill.Command, Skill.Persuade, Skill.Willpower],
            [Skill.Command, Skill.Education, Skill.Mechanics, Skill.Science],
            [Skill.Command, Skill.Education, Skill.Mechanics, Skill.Science],
            [Skill.Command, Skill.Education, Skill.Mechanics, Skill.Science],
            [],
            [
                "High-quality robes",
                "Workshop",
                "Craftsman apprentice"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Quartermaster]: new IconicCareerModel(
            "Quartermaster",
            "The Quartermasters perform the many administrative tasks necessary to ensure that every Brother who needs wargear and ammunition is supplied with it. They handle supply lines, organise maintenance schedules and manufacturing orders, and process the numerous requests for arms and armour made by warriors from all across the Brotherhood.",
            [Faction.Brotherhood],
            [new ExpertisePrerequisite(Skill.Mechanics, 1), new ExpertisePrerequisite(Skill.Lifestyle, 1), new SourcePrerequisite(Source.Brotherhood)],
            1,
            [Skill.Lifestyle, Skill.Mechanics, Skill.Science],
            [Skill.Education, Skill.Observation, Skill.Willpower],
            [Skill.Lifestyle, Skill.Mechanics, Skill.Observation, Skill.Persuade],
            [Skill.Lifestyle, Skill.Mechanics, Skill.Observation, Skill.Persuade],
            [],
            [],
            [
                "Formal robes",
                "Media kit",
                "Craftsman apprentice"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Banker]: new IconicCareerModel(
            "Banker",
            "The Order of Bankers takes advantage of financial expertise from all four of the original corporations: most within the Order have chosen to leave the corporations to serve the Brotherhood, transferring their skills to a higher cause. The Order of Bankers is relatively small, but possesses great economic power, which it wields carefully for the salvation of humanity.",
            [Faction.Brotherhood],
            [new ExpertisePrerequisite(Skill.Lifestyle, 2), new ExpertisePrerequisite(Skill.Persuade, 1), new SourcePrerequisite(Source.Brotherhood)],
            3,
            [Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [Skill.Command, Skill.Insight, Skill.Observation],
            [Skill.Command, Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [Skill.Command, Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [Skill.Command, Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [Skill.Command, Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [
                "Formal robes",
                "High-quality formal clothing"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Investigator]: new IconicCareerModel(
            "Investigator",
            "Investigators are sanctioned journalists, seeking out news to report upon. Unbeknownst to most, several high-profile Investigators are actually Revisors operating in relatively safe cover identities, and the interviews and investigations of these journalists are frequently scrutinised by both the Order of Archivists and the Cell of Intelligence.",
            [Faction.Brotherhood],
            [new ExpertisePrerequisite(Skill.Observation, 2), new ExpertisePrerequisite(Skill.Persuade, 1), new SourcePrerequisite(Source.Brotherhood)],
            2,
            [Skill.Insight, Skill.Observation, Skill.Persuade],
            [Skill.Education, Skill.Lifestyle, Skill.Linguistics],
            [Skill.Education, Skill.Insight, Skill.Observation, Skill.Persuade],
            [Skill.Education, Skill.Insight, Skill.Observation, Skill.Persuade],
            [Skill.Education, Skill.Insight, Skill.Observation, Skill.Persuade],
            [],
            [
                "High-quality formal clothing",
                "Media kit",
                "Cameraman"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.BrotherhoodProducer]: new IconicCareerModel(
            "Producer",
            "Producers handle the more technical and logistical side of getting news to the public.",
            [Faction.Brotherhood],
            [new ExpertisePrerequisite(Skill.Lifestyle, 2), new ExpertisePrerequisite(Skill.Persuade, 2), new SourcePrerequisite(Source.Brotherhood)],
            2,
            [Skill.Command, Skill.Lifestyle, Skill.Persuade],
            [Skill.Education, Skill.Mechanics, Skill.Observation],
            [Skill.Command, Skill.Lifestyle, Skill.Mechanics, Skill.Persuade],
            [Skill.Command, Skill.Lifestyle, Skill.Mechanics, Skill.Persuade],
            [Skill.Command, Skill.Lifestyle, Skill.Mechanics, Skill.Persuade],
            [],
            [
                "Corporate-quality formal clothing",
                "Media kit",
                "Technical assistant"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Counsellor]: new IconicCareerModel(
            "Counsellor",
            "Serving as the Brotherhood’s legal department, the Order of Counsellors intervenes in Cartel and corporate affairs when the Brotherhood’s interests are under threat. This role takes up the majority of the Order’s time, but is not its only purpose. Individuals from all walks of life often seek aid from the Brotherhood, and the Counsellors are tasked with providing legal support for these people, without charge – their services are covered by tithes and the Brotherhood’s other sources of income – though petitioners are often required to attend cathedral services, if they do not already.",
            [Faction.Brotherhood],
            [new ExpertisePrerequisite(Skill.Education, 2), new ExpertisePrerequisite(Skill.Persuade, 1), new SourcePrerequisite(Source.Brotherhood)],
            3,
            [Skill.Education, Skill.Insight, Skill.Persuade],
            [Skill.Linguistics, Skill.Observation, Skill.Willpower],
            [Skill.Education, Skill.Insight, Skill.Linguistics, Skill.Persuade],
            [Skill.Education, Skill.Insight, Skill.Linguistics, Skill.Persuade],
            [Skill.Education, Skill.Insight, Skill.Linguistics, Skill.Persuade],
            [Skill.Education, Skill.Insight, Skill.Linguistics, Skill.Persuade],
            [
                "Formal robes",
                "High-quality formal clothing",
                "Personal library (Education)|Personal library (Linguistics)"
            ],
            -1,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Doctor]: new IconicCareerModel(
            "Doctor",
            "The Order of Doctors is, in truth, a complete infrastructure for the provision of healthcare and medical treatment. The suggestion that it merely provides support for Mystic healers vastly undersells it. The Order consists of countless doctors, of a wide range of specialities, but also vast numbers of surgeons, psychotherapists, chemists, nurses, orderlies, and even paramedics complete with fleets of ambulances. The Brotherhood Military’s field medics all receive a mandatory two-year internship within a cathedral hospital studying emergency medicine, making them some of the most accomplished combat medics in the system. Eighty percent of the staff within a cathedral hospital, or one of the supplementary free clinics, are Brothers who have chosen to give entirely of themselves to the good of mankind, but the remainder are private physicians and medical students seeking practical experience. The Brotherhood pays reasonably for this service, but the main advantages it brings are the experience and the weight it adds to a resume.",
            [Faction.Brotherhood],
            [new ExpertisePrerequisite(Skill.Treatment, 2), new ExpertisePrerequisite(Skill.Medicine, 1), new SourcePrerequisite(Source.Brotherhood)],
            2,
            [Skill.Medicine, Skill.Persuade, Skill.Treatment],
            [Skill.Insight, Skill.Psychotherapy, Skill.Science],
            [Skill.Insight, Skill.Medicine, Skill.Psychotherapy, Skill.Science, Skill.Treatment],
            [Skill.Medicine, Skill.Psychotherapy, Skill.Treatment],
            [Skill.Medicine, Skill.Psychotherapy, Skill.Treatment],
            [],
            [
                "Armoured Vestment",
                "Disposable surgical garb",
                "Paramedic medikit"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Recruiter]: new IconicCareerModel(
            "Recruiter",
            "Recruiters are, by necessity, skilled at understanding people – they must learn to judge the suitability and skill of a given applicant, to better direct them to a suitable posting. Their skills are put to constant use – the recruitment stations are frequently filled with individuals queuing to commit themselves to the Brotherhood – and it can take hours to properly evaluate a person to determine the skills they possess, and their susceptibility to corruption. A small minority of applicants, identified by the skills of Recruiters, are silently taken for interrogation rather than sworn in, judged as potential threats or Heretic infiltrators.",
            [Faction.Brotherhood],
            [new ExpertisePrerequisite(Skill.Insight, 1), new ExpertisePrerequisite(Skill.Persuade, 1), new SourcePrerequisite(Source.Brotherhood)],
            2,
            [Skill.Insight, Skill.Observation, Skill.Persuade],
            [Skill.Education, Skill.Mysticism, Skill.Willpower],
            [Skill.Education, Skill.Insight, Skill.Observation, Skill.Persuade],
            [Skill.Education, Skill.Insight, Skill.Observation, Skill.Persuade],
            [Skill.Education, Skill.Insight, Skill.Observation, Skill.Persuade],
            [Skill.Education, Skill.Insight, Skill.Observation, Skill.Persuade],
            [
                "Armoured Vestment",
                "Lie detector",
                "Contact in the Inquisition"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Tutor]: new IconicCareerModel(
            "Tutor",
            "The Order of Tutors is responsible for all matters of education required by the Brotherhood, other than the tutelage of aspiring Mystics and the training of soldiers.",
            [Faction.Brotherhood],
            [new ExpertisePrerequisite(Skill.Athletics, 1), new ExpertisePrerequisite(Skill.Education, 1), new SourcePrerequisite(Source.Brotherhood)],
            3,
            [Skill.Athletics, Skill.Education, Skill.Persuade],
            [Skill.CloseCombat, Skill.Command, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Athletics, Skill.Command, Skill.Education, Skill.Persuade],
            [Skill.Athletics, Skill.Command, Skill.Education, Skill.Persuade],
            [Skill.Athletics, Skill.Command, Skill.Education, Skill.Persuade],
            [Skill.Athletics, Skill.Command, Skill.Education, Skill.Persuade],
            [
                "Formal robes",
                "High-quality formal clothing",
                "Personal library (Education)",
                "Teaching assistant"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Auditor]: new IconicCareerModel(
            "Auditor",
            "Auditors work closely with the Second Directorate’s Cell of Intelligence to collate information on pertinent threats to both the Brotherhood as a whole and to specific personages within, or in the care of, the Brotherhood. Largely invisible, Auditors seldom enter the field, instead working to provide the field Administrators with all the information they need to make informed security decisions.",
            [Faction.Brotherhood],
            [new ExpertisePrerequisite(Skill.Observation, 2), new ExpertisePrerequisite(Skill.Education, 1), new SourcePrerequisite(Source.Brotherhood)],
            2,
            [Skill.Education, Skill.Insight, Skill.Observation],
            [Skill.Command, Skill.Education, Skill.Persuade],
            [Skill.Command, Skill.Education, Skill.Insight, Skill.Observation],
            [Skill.Command, Skill.Education, Skill.Insight, Skill.Observation],
            [Skill.Command, Skill.Education, Skill.Insight, Skill.Observation],
            [],
            [
                "Formal robes",
                "Personal library (Education)"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Target]: new IconicCareerModel(
            "Target",
            "There are times when traditional forms of protection are insufficient. Sometimes, conventional bodyguards – even subtle ones – cannot effectively keep a target from harm. In such situations, drastic measures are necessary. Utilising false identities, disguises, and advanced infiltration techniques, Targets enter a client’s life covertly – sometimes even serving as a body double for the client – providing not only protection, but also investigative work that helps uncover the nature of an attacker and eliminate the threat permanently.",
            [Faction.Brotherhood],
            [new ExpertisePrerequisite(Skill.Stealth, 2), new ExpertisePrerequisite(Skill.Education, 1), new ExpertisePrerequisite(Skill.Observation, 1), new SourcePrerequisite(Source.Brotherhood)],
            3,
            [Skill.Observation, Skill.Persuade, Skill.Stealth],
            [Skill.Education, Skill.Insight, Skill.UnarmedCombat],
            [Skill.Observation, Skill.Persuade, Skill.Stealth, Skill.UnarmedCombat],
            [Skill.Stealth],
            [Skill.Stealth],
            [Skill.Observation, Skill.Persuade, Skill.Stealth, Skill.UnarmedCombat],
            [
                "Ballistic Nylon Clothing",
                "Ballistic Nylon Clothing",
                "Ballistic Nylon Clothing",
                "Surveillance kit",
                "Three flawless fake IDs"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Diplomat]: new IconicCareerModel(
            "Diplomat",
            "Senior personnel are referred to as Diplomats (in general), Emissaries (if they operate a mission in another organisation), Ministers (if they act within the Order of Receivers), or Ambassadors (a term reserved for the most senior Brothers of the Cell of Diplomats, regardless of their Order). Regardless of title, these experienced Brothers perform the most difficult and most rewarding duties. They deal with their opposite numbers in the corporations, as well as heads of state, Chief Executives, and other people of power.",
            [Faction.Brotherhood],
            [new ExpertisePrerequisite(Skill.Education, 2), new ExpertisePrerequisite(Skill.Persuade, 2), new SourcePrerequisite(Source.Brotherhood)],
            3,
            [Skill.Education, Skill.Insight, Skill.Persuade],
            [Skill.Command, Skill.Linguistics, Skill.Observation],
            [Skill.Command, Skill.Education, Skill.Insight, Skill.Persuade],
            [Skill.Command, Skill.Education, Skill.Insight, Skill.Persuade],
            [Skill.Command, Skill.Education, Skill.Insight, Skill.Persuade],
            [Skill.Command, Skill.Education, Skill.Insight, Skill.Persuade],
            [
                "Formal robes",
                "High-quality formal clothing",
                "Secretary assistant"
            ],
            -1,
            [Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Barrister]: new IconicCareerModel(
            "Barrister",
            "While solicitors represent the bulk of the legal profession within Imperial, barristers are the most iconic and visible part of it. Their ceremonial garb and skill at oratory makes them an extremely distinctive part of the Imperial legal system, and their involvement in important matters – often ones of life and death for their clients – means they frequently get involved in all manner of activities.",
            [Faction.Imperial],
            [new LawSchoolPrerequisite(), new ExpertisePrerequisite(Skill.Education, 2), new ExpertisePrerequisite(Skill.Persuade, 2), new SourcePrerequisite(Source.Imperial)],
            2,
            [Skill.Education, Skill.Observation, Skill.Persuade],
            [Skill.Insight, Skill.Lifestyle, Skill.Linguistics],
            [Skill.Education, Skill.Insight, Skill.Observation, Skill.Persuade],
            [Skill.Education, Skill.Insight, Skill.Lifestyle, Skill.Observation, Skill.Persuade],
            [Skill.Education, Skill.Insight, Skill.Lifestyle, Skill.Observation, Skill.Persuade],
            [],
            [
                "Formal robes",
                "High-quality formal clothing"
            ],
            4,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.CivilServant]: new IconicCareerModel(
            "Civil Servant",
            "While parliament and the Serenity are the official leaders of Imperial, and the major clans shape the businesses that allow Imperial to thrive, it is the labyrinthine bureaucracy of Imperial – sometimes dubbed the ‘civil service’ – that keeps the gears turning. The men and women within this monolithic cross-clan organisation must be experts at the subtleties of politics if they wish to see their agendas and their projects flourish, and they must be ruthless if they wish to thrive in the face of rivals and enemies.",
            [Faction.Imperial],
            [new ExpertisePrerequisite(Skill.Education, 2), new ExpertisePrerequisite(Skill.Lifestyle, 1), new SourcePrerequisite(Source.Imperial)],
            1,
            [Skill.Education, Skill.Lifestyle, Skill.Observation],
            [Skill.Command, Skill.Education, Skill.Persuade],
            [Skill.Education, Skill.Lifestyle, Skill.Observation],
            [Skill.Education, Skill.Lifestyle, Skill.Observation],
            [],
            [],
            [
                "High-quality formal clothing"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Stormtrencher]: new IconicCareerModel(
            "Stormtrencher",
            "The Ministry of War’s shock infantry are known as Stormtrenchers. Each one is a veteran of the defence forces, given additional training to breach enemy fortifications and defensive lines. They are extremely aggressive, dropping behind enemy lines from Doomlord gunships, causing massive disruption that can readily be exploited by other Imperial forces.",
            [Faction.Imperial],
            [new MilitaryCareerPrerequisite(), new SourcePrerequisite(Source.Imperial)],
            2,
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Survival],
            [Skill.Acrobatics, Skill.Resistance, Skill.Willpower],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Survival],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Survival],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Survival],
            [],
            [
                "Mk. II Medium Combat Armour",
                "Mandible Shotgun",
                "Jet-Chute"
            ],
            2,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.CollegePhysician]: new IconicCareerModel(
            "College Physician",
            "The professional body governing the practice of medicine is the Serene College of Physicians, which has offices in every major hospital in Imperial territory, as well as both the Cardinal’s and Mercy medical schools. Members are permitted to append their name with MSCP (Member of the Serene College of Physicians). College Physicians – properly Fellows of the Serene College of Physicians (FSCP) – are elected from amongst the College’s most illustrious and skilled members, and are highly sought after.",
            [Faction.Imperial],
            [new MedicalSchoolPrerequisite(), new ExpertisePrerequisite(Skill.Medicine, 2), new SourcePrerequisite(Source.Imperial)],
            2,
            [Skill.Education, Skill.Medicine, Skill.Treatment],
            [Skill.Persuade, Skill.Psychotherapy, Skill.Science],
            [Skill.Medicine, Skill.Psychotherapy, Skill.Science, Skill.Treatment],
            [Skill.Medicine, Skill.Psychotherapy, Skill.Treatment],
            [Skill.Medicine, Skill.Psychotherapy, Skill.Treatment],
            [],
            [
                "Paramedic medkit",
                "Tailored lab coat",
                "Access to academic library (Medicine)"
            ],
            5,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Entrepreneur]: new IconicCareerModel(
            "Entrepreneur",
            "An entrepreneurial spirit can be found at all levels of Imperial; indeed, the corporation would not exist without it. To this day, entrepreneurs can be found in every clan, driving family businesses in new directions and expanding Imperial’s prosperity to cover new fields.",
            [Faction.Imperial],
            [new BusinessSchoolPrerequisite(), new ExpertisePrerequisite(Skill.Lifestyle, 2), new SourcePrerequisite(Source.Imperial)],
            1,
            [Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [], // Same as education's elective skills
            [Skill.Education, Skill.Lifestyle],
            [...SkillsHelper.getSkills()],
            [],
            [],
            [
                "Expensive formal clothing"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.FreeTrader]: new IconicCareerModel(
            "Free Trader",
            "Free traders ply the routes between Imperial settlements amongst the Asteroid Belt and the inner planets, taking on whatever work they can find. They carry cargo (legal or otherwise) or passengers for a price. Free traders operate between the clans, and have considerable freedom to pursue whatever business opportunities they can obtain.",
            [Faction.Imperial],
            [new ExpertisePrerequisite(Skill.Pilot, 1), new ExpertisePrerequisite(Skill.Space, 1), new SourcePrerequisite(Source.Imperial)],
            3,
            [Skill.Lifestyle, Skill.Space, Skill.Vacuum],
            [Skill.Pilot, Skill.Persuade, Skill.Survival],
            [Skill.Lifestyle, Skill.Persuade, Skill.Space, Skill.Vacuum],
            [Skill.Lifestyle, Skill.Space, Skill.Vacuum],
            [],
            [],
            [
                "Loughton Lyonesse spaceship",
                "Vac suit",
                "Trader's license"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.ISCSpecialAgent]: new IconicCareerModel(
            "ISC Special Agent",
            "The agents of the Imperial Security Command are a diverse, pragmatic lot, their exploits the stuff of trashy spy thrillers. The truth is both less glamorous and more sinister than the dramatisation, and ISC Special Agents are all skilled operators who do not hesitate to act for the betterment of Imperial.",
            [Faction.Imperial],
            [new PoliceOrIntelligenceCareerPrerequisite(), new ExpertisePrerequisite(Skill.Observation, 2), new SourcePrerequisite(Source.Imperial)],
            2,
            [Skill.Observation, Skill.Stealth, Skill.Thievery],
            [Skill.CloseCombat, Skill.Insight, Skill.Willpower],
            [Skill.CloseCombat, Skill.Observation, Skill.Stealth, Skill.Thievery],
            [Skill.CloseCombat, Skill.Observation, Skill.Stealth, Skill.Thievery],
            [Skill.CloseCombat, Skill.Observation, Skill.Stealth, Skill.Thievery],
            [],
            [
                "Sword-Cane",
                "Corporate-quality nondescript business suit",
                "Notebook",
                "Briefcase",
                "Mk. I Light Personal Protection Suit"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Navvy]: new IconicCareerModel(
            "Navvy",
            "Professional skilled labourers, organised work-crews of Navvies are recruited for new industrial projects across Imperial territory. They pay is decent, and there is always work that needs doing somewhere, meaning that a navvy can be found almost anywhere where the Imperial banner flies.",
            [Faction.Imperial],
            [new ExpertisePrerequisite(Skill.Mechanics, 1), new ExpertisePrerequisite(Skill.Survival, 1), new SourcePrerequisite(Source.Imperial)],
            1,
            [Skill.Athletics, Skill.Mechanics, Skill.CloseCombat],
            [Skill.Survival, Skill.UnarmedCombat, Skill.Vacuum],
            [Skill.Athletics, Skill.Mechanics, Skill.Survival, Skill.UnarmedCombat],
            [Skill.Mechanics, Skill.Survival, Skill.UnarmedCombat, Skill.Vacuum],
            [Skill.Mechanics, Skill.Survival, Skill.UnarmedCombat, Skill.Vacuum],
            [],
            [
                "Vac suit",
                "Advanced repair kit"
            ],
            2,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.YardSuit]: new IconicCareerModel(
            "Yard Detective (Suit)",
            "Skilled investigators and determined enforcers of the law, ‘Suits’ are unassuming, persuasive, and cunning, resorting to violence only when no other option exists.",
            [Faction.Imperial],
            [new PoliceCareerPrerequisite(), new SourcePrerequisite(Source.Imperial)],
            1,
            [Skill.Education, Skill.Observation, Skill.Persuade],
            [Skill.Insight, Skill.Stealth, Skill.Willpower],
            [Skill.Education, Skill.Observation, Skill.Persuade, Skill.Willpower],
            [Skill.Observation, Skill.Persuade, Skill.Willpower],
            [],
            [],
            [
                "Serenity Pistol",
                "Corporate-quality suit",
                "Ballistic nylon trenchcoat",
                "Light civilian shoulder pads",
                "Cell phone"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.YardBrute]: new IconicCareerModel(
            "Yard Detective (Brute)",
            "Brutes are big, tough policemen, who are effective more through intimidation than through investigation. They are aggressive, ruthless, and often ‘dirty’, relying on an understanding of the criminal element and a heavy hand to keep things manageable.",
            [Faction.Imperial],
            [new PoliceCareerPrerequisite(), new SourcePrerequisite(Source.Imperial)],
            1,
            [Skill.CloseCombat, Skill.Persuade, Skill.UnarmedCombat],
            [Skill.Observation, Skill.RangedWeapons, Skill.Thievery],
            [Skill.Education, Skill.Observation, Skill.Persuade, Skill.Stealth],
            [Skill.Observation, Skill.Persuade, Skill.Stealth],
            [Skill.Observation, Skill.Persuade, Skill.Stealth],
            [],
            [
                "Diemansland Shotgun",
                "Bulletproof Vest",
                "Heavy civilian shoulder pads",
                "Brass Knuckles",
                EquipmentHelper.getNonFactionHandguns()
            ],
            1,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.WolfbaneCommando]: new IconicCareerModel(
            "Wolfbane Commando",
            "Commandos make up the bulk of Wolf Pack forces, forming a versatile core of formidable warriors around which other Wolf Pack units operate. Once a Wolfbairn has marked himself out amongst his pack mates, he receives a final initiation overseen by a Brotherhood Inquisitor, and is gifted his very own rune-etched claymore. Now a true Wolfbane, he may join a pack and fight amongst his new brothers.",
            [Faction.Imperial],
            [new PrimaryCareerPrerequisite(PrimaryCareer.MilitaryWolfbairn), new SourcePrerequisite(Source.Imperial)],
            1,
            [Skill.Athletics, Skill.CloseCombat, Skill.Stealth],
            [Skill.Acrobatics, Skill.Observation, Skill.RangedWeapons],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.Stealth],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Observation, Skill.Stealth],
            [],
            [],
            [
                "Mk. III Heavy Combat Armour",
                "Aggressor Handgun",
                "Clansman Claymore"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.BadSamaritans]: new IconicCareerModel(
            "Clan Special Forces (Bad Samaritans)",
            "",
            [Faction.Imperial],
            [new MilitaryCareerPrerequisite(), new ClanPrerequisite(Clan.Finn), new SourcePrerequisite(Source.Imperial)],
            2,
            [Skill.Athletics, Skill.CloseCombat, Skill.Willpower],
            [Skill.Resistance, Skill.Stealth, Skill.Treatment],
            [Skill.Athletics, Skill.CloseCombat, Skill.Stealth, Skill.Willpower],
            [Skill.Athletics, Skill.CloseCombat, Skill.Stealth, Skill.Willpower],
            [Skill.Athletics, Skill.CloseCombat, Skill.Stealth, Skill.Willpower],
            [],
            [
                "Mk. III Heavy Combat Armour",
                "Clansman Claymore",
                "Aggressor Handgun"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.BlackBerets]: new IconicCareerModel(
            "Clan Special Forces (Black Berets)",
            "",
            [Faction.Imperial],
            [new MilitaryCareerPrerequisite(), new ClanPrerequisite(Clan.Morgan), new SourcePrerequisite(Source.Imperial)],
            2,
            [Skill.CloseCombat, Skill.Stealth, Skill.Willpower],
            [Skill.Acrobatics, Skill.Mysticism, Skill.RangedWeapons],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Stealth, Skill.Willpower],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Stealth, Skill.Willpower],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Stealth, Skill.Willpower],
            [],
            [
                "Mk. III Heavy Combat Armour",
                "Interceptor SMG",
                "Chainsword"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.BlueBerets]: new IconicCareerModel(
            "Clan Special Forces (Blue Berets)",
            "",
            [Faction.Imperial],
            [new MilitaryCareerPrerequisite(), new ClanPrerequisite(Clan.Paladine), new SourcePrerequisite(Source.Imperial)],
            2,
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [Skill.Acrobatics, Skill.Command, Skill.Treatment],
            [Skill.CloseCombat, Skill.Command, Skill.RangedWeapons, Skill.Treatment],
            [Skill.CloseCombat, Skill.Command, Skill.RangedWeapons, Skill.Treatment],
            [Skill.CloseCombat, Skill.Command, Skill.RangedWeapons, Skill.Treatment],
            [],
            [
                "Mk. III Heavy Combat Armour",
                "Invader Battle Rifle",
                "Ornate dress uniform"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.BlueLions]: new IconicCareerModel(
            "Clan Special Forces (Blue Lions)",
            "",
            [Faction.Imperial],
            [new MilitaryCareerPrerequisite(), new ClanPrerequisite(Clan.Brannaghan), new SourcePrerequisite(Source.Imperial)],
            2,
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat],
            [Skill.RangedWeapons, Skill.Resistance, Skill.Treatment],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Resistance, Skill.Treatment],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Resistance, Skill.Treatment],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Resistance, Skill.Treatment],
            [],
            [
                "Mk. III Heavy Combat Armour",
                "Punisher Short Sword", // TODO: change to shortsword
                "Aggressor Handgun",
                "Paramedic medkit"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.GoldenLions]: new IconicCareerModel(
            "Clan Special Forces (Golden Lions)",
            "",
            [Faction.Imperial],
            [new MilitaryCareerPrerequisite(), new ClanPrerequisite(Clan.Murdoch), new SourcePrerequisite(Source.Imperial)],
            2,
            [Skill.Athletics, Skill.CloseCombat, Skill.UnarmedCombat],
            [Skill.Resistance, Skill.UnarmedCombat, Skill.Willpower],
            [Skill.Athletics, Skill.CloseCombat, Skill.UnarmedCombat, Skill.Willpower],
            [Skill.Athletics, Skill.CloseCombat, Skill.UnarmedCombat, Skill.Willpower],
            [Skill.Athletics, Skill.CloseCombat, Skill.UnarmedCombat, Skill.Willpower],
            [],
            [
                "Mk. IV Combat Proximity Armour",
                "Lion Claws",
                "Plasma Enrager PDW"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.GoldenPanthers]: new IconicCareerModel(
            "Clan Special Forces (Golden Panthers)",
            "",
            [Faction.Imperial],
            [new MilitaryCareerPrerequisite(), new ClanPrerequisite(Clan.OLoughton), new SourcePrerequisite(Source.Imperial)],
            2,
            [Skill.Acrobatics, Skill.RangedWeapons, Skill.Survival],
            [Skill.Athletics, Skill.CloseCombat, Skill.Pilot],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Survival],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Survival],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Survival],
            [],
            [
                "Mk. III Heavy Combat Armour",
                "Jet-Chute",
                "Invader Battle Rifle",
                "Punisher Short Sword"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Hunters]: new IconicCareerModel(
            "Clan Special Forces (Hunters)",
            "",
            [Faction.Imperial],
            [new MilitaryCareerPrerequisite(), new ClanPrerequisite(Clan.Dunsirn), new SourcePrerequisite(Source.Imperial)],
            2,
            [Skill.Observation, Skill.RangedWeapons, Skill.Stealth],
            [Skill.Athletics, Skill.CloseCombat, Skill.Survival],
            [Skill.Athletics, Skill.Observation, Skill.RangedWeapons, Skill.Stealth],
            [Skill.Athletics, Skill.Observation, Skill.RangedWeapons, Skill.Stealth],
            [Skill.Athletics, Skill.Observation, Skill.RangedWeapons, Skill.Stealth],
            [],
            [
                "Mk. III Heavy Combat Armour",
                "Invader Battle Rifle",
                "Punisher Short Sword"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Rams]: new IconicCareerModel(
            "Clan Special Forces (Rams)",
            "",
            [Faction.Imperial],
            [new MilitaryCareerPrerequisite(), new ClanPrerequisite(Clan.Loughton), new SourcePrerequisite(Source.Imperial)],
            2,
            [Skill.Athletics, Skill.CloseCombat, Skill.Pilot],
            [Skill.Acrobatics, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Athletics, Skill.CloseCombat, Skill.Pilot, Skill.RangedWeapons],
            [Skill.Athletics, Skill.CloseCombat, Skill.Pilot, Skill.RangedWeapons],
            [Skill.Athletics, Skill.CloseCombat, Skill.Pilot, Skill.RangedWeapons],
            [],
            [
                "Mk. III Heavy Combat Armour",
                "Chainsword",
                "Aggressor Handgun"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Shamrocks]: new IconicCareerModel(
            "Clan Special Forces (Shamrocks)",
            "",
            [Faction.Imperial],
            [new MilitaryCareerPrerequisite(), new ClanPrerequisite(Clan.Murray), new SourcePrerequisite(Source.Imperial)],
            2,
            [Skill.Acrobatics, Skill.CloseCombat, Skill.RangedWeapons],
            [Skill.Athletics, Skill.Resistance, Skill.Willpower],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons],
            [],
            [
                "Mk. III Heavy Combat Armour",
                "Invader Battle Rifle",
                "Punisher Short Sword"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.Sterlings]: new IconicCareerModel(
            "Clan Special Forces (Sterlings)",
            "",
            [Faction.Imperial],
            [new MilitaryCareerPrerequisite(), new VariableClanPrerequisite(Clan.Axelthorpe, Clan.Smythe), new SourcePrerequisite(Source.Imperial)],
            2,
            [Skill.CloseCombat, Skill.Observation, Skill.RangedWeapons],
            [Skill.Acrobatics, Skill.Athletics, Skill.Resistance],
            [Skill.Athletics, Skill.CloseCombat, Skill.Observation, Skill.RangedWeapons],
            [Skill.Athletics, Skill.CloseCombat, Skill.Observation, Skill.RangedWeapons],
            [Skill.Athletics, Skill.CloseCombat, Skill.Observation, Skill.RangedWeapons],
            [],
            [
                "Mk. III Heavy Combat Armour",
                "Mandible Shotgun"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        [IconicCareer.WildRoses]: new IconicCareerModel(
            "Clan Special Forces (Wild Roses)",
            "",
            [Faction.Imperial],
            [new MilitaryCareerPrerequisite(), new ClanPrerequisite(Clan.Drougan), new SourcePrerequisite(Source.Imperial)],
            2,
            [Skill.Athletics, Skill.RangedWeapons, Skill.Survival],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Resistance],
            [Skill.Athletics, Skill.RangedWeapons, Skill.Resistance, Skill.Survival],
            [Skill.Athletics, Skill.RangedWeapons, Skill.Resistance, Skill.Survival],
            [Skill.Athletics, Skill.RangedWeapons, Skill.Resistance, Skill.Survival],
            [],
            [
                "Mk. III Heavy Combat Armour",
                "Invader Battle Rifle"
            ],
            3,
            [Timeline.DarkSymmetry, Timeline.DarkLegion, Timeline.DarkEden]),
        //[IconicCareer.Heretic]: new IconicCareerModel(
        //    "",
        //    "",
        //    [Faction.],
        //    [],
        //    1,
        //    [Skill., Skill., Skill.],
        //    [Skill., Skill., Skill.],
        //    [Skill., Skill., Skill., Skill.],
        //    [],
        //    [],
        //    [],
        //    [
        //        ""
        //    ],
        //    1,
        //    [Timeline.]),
    };

    getCareers() {
        var careers: IconicCareerViewModel[] = [];
        var n = 0;

        for (var iconic in this._careers) {
            var ic = this._careers[iconic];
            if (ic.timelines.indexOf(character.timeline) === -1 ||
                ic.factions.indexOf(character.faction) === -1 ||
                character.prohibitedIconicCareers.indexOf(n) > -1) {
                n++;
                continue;
            }

            if (ic.prerequisites.length === 0 || ic.prerequisites.every(pre => pre.isPrerequisiteFulfilled())) {
                careers.push(new IconicCareerViewModel(n, ic));
            }

            n++;
        }

        careers = careers.sort((a, b) => { return a.name.localeCompare(b.name); });

        return careers;
    }

    getCareer(career: IconicCareer) {
        var iconicCareer = this._careers[career];

        if (career === IconicCareer.Homebuilder && character.status >= Status.Nobility) {
            iconicCareer.elective.push(Skill.Command);
        }
        else if (career === IconicCareer.MartialArtist && character.numberTalents > 0) {
            iconicCareer.talentsTier1 = [Skill.None];

            if (character.numberTalents > 1) {
                iconicCareer.talentsTier2 = [Skill.None];
            }

            if (character.numberTalents > 2) {
                iconicCareer.talentsTier3 = [Skill.None];
            }
        }
        else if (career === IconicCareer.Entrepreneur) {
            iconicCareer.elective.push(...this.getElectiveSkillsForEducation());
        }

        if (character.hasTalent("Mystic")) {
            if (iconicCareer.elective.indexOf(Skill.Mysticism) === -1) {
                iconicCareer.elective.push(Skill.Mysticism);
            }
        }

        return iconicCareer;
    }

    applyCareer(career: IconicCareer) {
        switch (career) {
            case IconicCareer.Celebrity:
                character.assets += 2;
                character.fame += 2;
                break;
            case IconicCareer.FreedomBrigade:
                character.faction = Faction.Capitol;
                character.applyCriminalRecord();
                break;
            case IconicCareer.Politician:
                character.fame += 1;
                break;
            case IconicCareer.FreedomBrigade:
            case IconicCareer.ReformedConvict:
                character.hasCriminalRecord = false;
                break;
            case IconicCareer.Producer:
                character.fame += 1;
                break;
            case IconicCareer.SpecialAgent:
                character.fame = Math.max(0, character.fame - 1);
                character.assets += 3;
                break;
            case IconicCareer.StarAthlete:
                character.assets += 10;
                character.fame += 2;
                break;
            case IconicCareer.EnhancedChasseur:
                character.attributes[Attribute.Strength].value++;
                character.attributes[Attribute.Physique].value++;
                break;
            case IconicCareer.Spokesperson:
                character.attributes[Attribute.Personality].value++;
                break;
            case IconicCareer.Technoseer:
                character.attributes[Attribute.Awareness].value++;
                character.attributes[Attribute.Intelligence].value++;
                break;
            case IconicCareer.Mirrorman:
                character.attributes[Attribute.Strength].value++;
                character.attributes[Attribute.Agility].value++;
                break;
            case IconicCareer.Commissar:
                character.addEvent("Foolhardy: -1D on Command/Willpower tests when acting upon this trait.");
                break;
            case IconicCareer.ScribesCompanion:
                character.assets += 5;
                character.addEvent("Three contacts elsewhere in Bauhaus.");
                character.addEvent("You gain 2 bonus Momentum on all Lifestyle tests.");
                break;
            case IconicCareer.WayfarersCompanion:
                character.addTalent("Tithed");
                character.addEvent("You reduce the cost of using a pilgrimage route by 2.");
                character.addEvent("Increase your Corruption Soak by 1.");
                break;
            case IconicCareer.SavantsCompanion:
                character.addEvent("You have access to an Academic Library of all subjects.");
                character.addEvent("You may re-roll 1d20 on all Lifestyle or Persuade tests when dealing with other members of the Order of Savants.");
                break;
            case IconicCareer.EtoilesMortant:
                character.addEvent("Any weapon you have owned for a longer period of time gains the Pious 1 quality.");
                break;
            case IconicCareer.SilverSkullJusticar:
                character.addEvent("You have the same amount of police power as a member of BLEU.");
                break;
            case IconicCareer.OrderOfFearKommandant:
                character.addEvent("You may re-roll 1d20 on any tests made when interrogating a subject.");
                break;
            case IconicCareer.DemonHunter:
                character.addEvent("+1 Corruption Soak");
                break;
            case IconicCareer.Hatamoto:
                character.assets += 3;
                character.addEvent("When representing your Daimyo, you may use his Social Standing in place of your own.");
                break;
            case IconicCareer.Noble:
            case IconicCareer.GuildMaster:
                character.assets += 10;
                break;
            case IconicCareer.MartialArtist:
                character.assets += 2;
                break;
            case IconicCareer.Ronin:
                character.earnings = Math.min(character.earnings, 3);
                break;
            case IconicCareer.SeekerDarkSoul:
                if (!character.hasDarkGift(Endowment.Obfuscation)) {
                    character.addDarkGift(Endowment.Obfuscation);
                }
                break;
            case IconicCareer.MasterOfRites:
                character.addEvent("You may convey unto other Heretics in your cell the use of any Dark Gift you know. This takes an hour-long ritual and a Challenging D2 Mysticism test.");
                break;
            case IconicCareer.DreadShadow:
                character.addEvent("When you attack an opponent while hidden, that opponent must attempt an Average D1 Willpower test or become Staggered until the end of its next turn.");
                break;
            case IconicCareer.DarkCarrier:
                if (!character.hasDarkGift(Endowment.SeeSickness)) {
                    character.addDarkGift(Endowment.SeeSickness);
                }
                break;
            case IconicCareer.FrozenSoul:
                if (!character.hasDarkGift(Endowment.Obfuscation)) {
                    character.addDarkGift(Endowment.Obfuscation);
                }
                if (!character.hasDarkGift(Endowment.DarkWard)) {
                    character.addDarkGift(Endowment.DarkWard);
                }
                break;
            case IconicCareer.VoidWeaver:
                character.addEvent("You do not suffer the normal increase in difficulty from using Weavings.");
                character.addEvent("You may use Mysticism instead of Willpower when using a Dark Gift or Weaving.");
                character.addEvent("You may re-roll 1d20 when using Mysticism to cast a Dark Gift or Weaving.");
                break;
            case IconicCareer.Technomancer:
                if (character.attributes[Attribute.Intelligence].value < 16) {
                    character.attributes[Attribute.Intelligence].value++;
                }
                break;
            case IconicCareer.Destroyer: {
                let implant = DarkGiftHelper.generateImplant();
                DarkGiftHelper.applyImplant(implant);
                character.addEquipment(DarkGiftHelper.getImplant(implant).name);
                break;
            }
            case IconicCareer.StudentOfTheArt:
                character.addTalent("Mystic");
                break;
            case IconicCareer.Revisor:
                character.assets += 25;
                break;
            case IconicCareer.Investigator: {
                let numContacts = Math.floor(Math.random() * 6) + 1;
                character.addEquipment(`${numContacts} contacts in other corporations`);
                break;
            }
            case IconicCareer.BrotherhoodProducer: {
                let numContacts = Math.floor(Math.random() * 6) + 1;
                character.addEquipment(`${numContacts} Investigator contacts`);
                break;
            }
            case IconicCareer.Auditor: {
                let numContacts = Math.floor(Math.random() * 6) + 1;
                character.addEquipment(`${numContacts} contacts in the Inquisition`);
                break;
            }
            case IconicCareer.Entrepreneur:
                character.assets += 20;
                break;
        }

        const iconicCareer = this.getCareer(career);
        iconicCareer.equipment.forEach(eq => {
            if (eq.indexOf("|") === -1 &&
                character.equipment.indexOf(eq) === -1) {
                character.addEquipment(eq);
            }
        });
    }

    private getElectiveSkillsForEducation() {
        let skills = [];

        switch (character.education) {
            case 23:
                skills = [Skill.Mechanics, Skill.Pilot, Skill.Willpower];
                break;
            case 24:
                skills = [Skill.Linguistics, Skill.Mechanics, Skill.Pilot];
                break;
            case 25:
                skills = [Skill.Command, Skill.Stealth, Skill.Thievery];
                break;
            case 26:
                skills = [Skill.Insight, Skill.Linguistics, Skill.Observation];
                break;
            case 27:
                skills = [Skill.Lifestyle, Skill.Linguistics, Skill.Command];
                break;
            case 28:
                skills = [Skill.Lifestyle, Skill.Command, Skill.Linguistics];
                break;
            case 29:
                skills = [Skill.Medicine, Skill.Psychotherapy, Skill.Insight];
                break;
            case 30:
                skills = [Skill.Medicine, Skill.Psychotherapy, Skill.Insight];
                break;
            case 31:
                skills = [Skill.Medicine, Skill.Psychotherapy, Skill.Mysticism];
                break;
            case 32:
                skills = [Skill.RangedWeapons, Skill.Resistance, Skill.Willpower];
                break;
            case 33:
                skills = [Skill.CloseCombat, Skill.Command, Skill.RangedWeapons];
                break;
            case 34:
                skills = [Skill.RangedWeapons, Skill.Resistance, Skill.Willpower];
                break;
            case 35:
                skills = [Skill.CloseCombat, Skill.Command, Skill.RangedWeapons];
                break;
            case 36:
                skills = [Skill.Pilot, Skill.Space, Skill.Survival];
                break;
            case 37:
                skills = [Skill.Linguistics, Skill.Pilot, Skill.Space];
                break;
        }

        return skills;
    }
}

export const IconicCareersHelper = new IconicCareers();