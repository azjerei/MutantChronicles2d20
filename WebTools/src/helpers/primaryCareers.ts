import {character} from '../common/character';
import {Skill, SkillsHelper} from './skills';
import {Faction} from './factions';
import {Pillar} from './pillars';
import {Status} from './status';
import {Source} from './sources';
//import {House} from './houses';
import {EquipmentHelper} from './equipment';
import {CareerEventModel, EventModel} from '../common/eventModel';

export enum PrimaryCareer {
    // Core
    Unemployed,
    CorporateWorker,
    TechnicalRepairman,
    FarmerFrontiersman,
    MilitaryBasic,
    PoliceBeatCop,
    Criminal,
    MedicalFirstResponder,
    AcademicResearcher,
    MediaReporter,
    CorporateExecutive,
    ShipCrew,
    IntelligenceOperative,

    // Capitol
    Accountant,
    Attorney,
    Salesman,
    Secretary,
    AthleteSportsman,
    AthletePrizeFighter,
    AthleteStuntMan,
    MilitaryAirborneCavalry,
    MilitaryCAFPilot,
    PoliceAIPO,
    PoliceBodyguard,
    PolicePrivateInvestigator,
    MediaRadioJockey,
    MediaTalentAgent,
    MediaPhotographer,
    MediaFashionDesigner,
    MediaPoliticalCampaigner,

    // Cybertronic
    LAJ_VAC,
    LAJ_TIFF,
    ETP_VAC,
    ETP_TIFF,
    ABC_VAC,
    ABC_TIFF,
    FEF_VAC,
    FEF_TIFF,
    ARD_VAC,
    ARD_TIFF,
    EPD_VAC,
    EPD_TIFF,
    CRI_VAC,
    CRI_TIFF,
    EDA_VAC,
    EDA_TIFF,
    MCR_VAC,
    MCR_TIFF,
    IES_VAC,
    IES_TIFF,
    APH_VAC,
    APH_TIFF,

    // Luna PD
    PoliceCIO,
    PoliceFRO,
    PoliceRiot,
    PoliceTSO,
    MediaPR,

    // Freelancers
    Cabbie,
    Engineer,
    Archaeologist,

    // Cartel
    CartelInvestigator,
    Lobbyist,
    Bodyguard,
    Consultant,

    // Whitestar
    OrganisationAdministrator,
    OrganisationAllotmentMinister,
    OrganisationFacilitiesDivisor,
    OrganisationCommissioner,
    TechnicalFactoryWorkerWhitestar,
    TechnicalPatchworkMekhanik,
    TechnicalKuznets,
    TechnicalInzhener,
    GatheringOkhotnik,
    GatheringRazvedchik,
    GatheringPilot,
    PreservationMilitaryRegular,
    PreservationMilitaryOfficer,
    PreservationStreltsyGorodskiye,
    PreservationStreltsyVyborniye,
    PreservationStreltsyGorodskiyeOfficer,
    PreservationStreltsyVyborniyeOfficer,

    // Bauhaus
    StudentMilitary,
    StudentMedia,
    StudentBusiness,
    StudentTechnical,
    Pilgrim,
    TechnicalFreightDriver,
    TechnicalFactoryWorkerBauhaus,
    TechnicalFieldMechanic,
    TechnicalPrecisionEngineer,
    TechnicalDesigner,
    RuralDrover,
    RuralScout,
    RuralLumberman,
    MilitaryHussarRegular,
    MilitaryHussarOfficer,
    MilitaryGuardOrderRegular,
    MilitaryGuardOrderOfficer,
    MilitaryArtilleryKorpsRegular,
    MilitaryArtilleryKorpsOfficer,
    MilitaryDragoonRegular,
    MilitaryDragoonOfficer,
    OrderOfTheWolfRegular,
    OrderOfTheWolfOfficer,
    OrderOfTheCondorRegular,
    OrderOfTheCondorOfficer,
    OrderOfTheDragonRegular,
    OrderOfTheDragonOfficer,
    OrderOfTheBearRegular,
    OrderOfTheBearOfficer,
    OrderOfTheGriffinRegular,
    OrderOfTheGriffinOfficer,
    OrderOfTheUnicornRegular,
    OrderOfTheUnicornOfficer,
    OrderOfTheSpiderRegular,
    OrderOfTheSpiderOfficer,

    // Mishima
    Salaryman,
    JuniorManager,
    Bushi,
    Ashigaru,
    Magistrate,
    Watchman,

    // Dark Soul
    Sacristan,

    // Brotherhood
    Disciple,
    Scribe,
    Server,
    SecretaryBH,
    PilgrimMachinist,
    Craftsman,
    PilgrimProtector,
    BrotherhoodTrooper,
    Paladin,
    Qualifier,
    PilgrimScholar,
    Archivist,
    Analyst,
    Advisor,
    Administrator,
    Observer,
    Archangel,
    Valkyrie,
    Preacher,

    // Imperial
    MilitaryTrencher,
    MilitaryReservist,
    MilitaryWolfbairn,
    MilitaryGreyGhost,
    MilitaryClanRegiment,
    AcademicSolicitor,
}

class PrimaryCareerModel {
    name: string;
    description: string;
    attributes: number[];
    mandatory: Skill[];
    elective: Skill[];
    signature: Skill[];
    talents: Skill[];
    equipment: string[];
    earnings: number;

    constructor(name: string, description: string, attributes: number[], mandatory: Skill[], elective: Skill[], signature: Skill[], talents: Skill[], equipment: string[], earnings: number) {
        this.name = name;
        this.description = description;
        this.attributes = attributes;
        this.mandatory = mandatory;
        this.elective = elective;
        this.signature = signature;
        this.talents = talents;
        this.equipment = equipment;
        this.earnings = earnings;
    }
}

export class PrimaryCareerViewModel extends PrimaryCareerModel {
    id: PrimaryCareer;

    constructor(id: PrimaryCareer, base: PrimaryCareerModel) {
        super(base.name, base.description, base.attributes, base.mandatory, base.elective, base.signature, base.talents, base.equipment, base.earnings);
        this.id = id;
    }
}

export class PrimaryCareers {
    private _artAspects = [
        Skill.AspectOfChangeling,
        Skill.AspectOfElements,
        Skill.AspectOfExorcism,
        Skill.AspectOfKinetics,
        Skill.AspectOfManipulation,
        Skill.AspectOfMentalism,
        Skill.AspectOfPremonition
    ];

    private _careers: { [career: number]: PrimaryCareerModel } = {
        [PrimaryCareer.Unemployed]: new PrimaryCareerModel(
            "Unemployed",
            "The last career was a dead end, or you just could not get on the ladder. Whatever the reason you are walking the streets, looking for a job.",
            [2,1,2,1,1,0,2,2],
            [Skill.Survival],
            [...SkillsHelper.getSkills()],
            [Skill.Survival],
            [...SkillsHelper.getSkills()],
            [],
            0),
        [PrimaryCareer.CorporateWorker]: new PrimaryCareerModel(
            "Corporate Worker",
            "You are a small cog in a vast wheel, helping keep the goods moving, or the paperwork flowing. You dream of better things, but you have seen people better than you chewed up and spat out.",
            [1,2,2,1,2,2,1,0],
            [Skill.Lifestyle, Skill.Observation, Skill.Stealth],
            [Skill.Persuade, Skill.Willpower, Skill.Education],
            [Skill.Lifestyle, Skill.Observation, Skill.Persuade, Skill.Education],
            [Skill.Lifestyle, Skill.Observation, Skill.Stealth],
            [
                "Corporate quality suit|Basic Survival Kit (Urban)"
            ],
            1),
        [PrimaryCareer.TechnicalRepairman]: new PrimaryCareerModel(
            "Technical (Repairman)",
            "You have got a fistful of parts and a head full of plans. In a world of machines, you are on the front line.",
            [2,2,1,2,0,1,2,1],
            [Skill.Mechanics, Skill.Pilot, Skill.Thievery],
            [Skill.Observation, Skill.Resistance, Skill.Willpower],
            [Skill.Mechanics, Skill.Pilot, Skill.Thievery, Skill.Resistance],
            [Skill.Mechanics, Skill.Pilot, Skill.Thievery],
            [
                "Basic Tool Kit",
                EquipmentHelper.getBEKits()
            ],
            1),
        [PrimaryCareer.FarmerFrontiersman]: new PrimaryCareerModel(
            "Farmer/Frontiersman",
            "Those city folks forget where the food that ends up on their table comes from. Out here, it is tough making sure the shipments get through, what with enemies probing the borders and those... things.",
            [2,2,1,1,2,0,2,1],
            [Skill.Survival, Skill.AnimalHandling, Skill.Resistance],
            [Skill.Willpower, Skill.Athletics, Skill.Thievery],
            [Skill.Survival, Skill.AnimalHandling, Skill.Resistance, Skill.Athletics],
            [Skill.Survival, Skill.AnimalHandling, Skill.Resistance],
            [
                "Colonist Survival Kit (home region)"
            ],
            1),
        [PrimaryCareer.MilitaryBasic]: new PrimaryCareerModel(
            "Military (Basic)",
            "It is a good life, ensuring accommodation and three square meals a day. It toughens you up, and puts a solid gun in your hands. It is not an easy life – there is always some new and dangerous challenge to face, or some new war to fight. Maybe you will get lucky and join one of the elite outfits.",
            [1,1,2,1,2,0,2,2],
            [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons],
            [Skill.Survival, Skill.Acrobatics, Skill.Mechanics],
            [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Survival],
            [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons],
            [
                "Ballistic nylon military uniform",
                "FACTION_ASSAULT_RIFLE",
                "Medium military shoulder pads"
            ],
            1),
        [PrimaryCareer.PoliceBeatCop]: new PrimaryCareerModel(
            "Police (Beat Cop)",
            "You are on the front line, down on the streets. If it was not for you, the cities would be anarchy. You sort out people’s problems, and deal with the people who are everyone’s problem.",
            [2,2,2,0,2,1,1,1],
            [Skill.Athletics, Skill.Observation, Skill.Persuade],
            [Skill.RangedWeapons, Skill.CloseCombat, Skill.Treatment],
            [Skill.Athletics, Skill.Observation, Skill.Persuade, Skill.RangedWeapons],
            [Skill.Athletics, Skill.Observation, Skill.Persuade],
            [
                "Uniform",
                "Heavy civilian shoulder pads",
                "FACTION_HANDGUN",
            ],
            2),
        [PrimaryCareer.Criminal]: new PrimaryCareerModel(
            "Criminal",
            "Maybe it was just a little crime, or maybe you are in deep. You are breaking the rules, maybe the law, but you need to, right ? It could be for your family, maybe you just want to get rich, or maybe you are being blackmailed.",
            [2,2,2,2,0,1,1,1],
            [Skill.Thievery, Skill.Observation, Skill.Stealth],
            [Skill.RangedWeapons, Skill.CloseCombat, Skill.Mechanics],
            [Skill.Thievery, Skill.Observation, Skill.Stealth, Skill.RangedWeapons],
            [Skill.Thievery, Skill.Observation, Skill.Stealth],
            [
                `${EquipmentHelper.getBEKits()}|Disguise Kit` 
            ],
            2),
        [PrimaryCareer.MedicalFirstResponder]: new PrimaryCareerModel(
            "Medical (First Responder)",
            "Stay out of trouble, your mother said. If she could see you now – dodging bullets on the street, dealing with drugged up gangers, or mad old freaks, just to patch them up so they can go out and do it again.",
            [1,2,0,2,3,1,1,1],
            [Skill.Treatment, Skill.Athletics, Skill.Medicine],
            [Skill.Psychotherapy, Skill.AnimalHandling, Skill.Survival],
            [Skill.Treatment, Skill.Medicine, Skill.Psychotherapy, Skill.Survival],
            [Skill.Treatment, Skill.Athletics, Skill.Medicine, Skill.Psychotherapy],
            [
                "Hospital Class Medkit",
                "Ballistic nylon medical uniform"
            ],
            3),
        [PrimaryCareer.AcademicResearcher]: new PrimaryCareerModel(
            "Academic (Researcher)",
            "You are head deep in the old records, working on theories or overseeing a breakthrough. The laboratory, library, or college is your home from home.",
            [1,2,1,3,2,1,1,0],
            [Skill.Education, Skill.Persuade, Skill.Science],
            [Skill.Linguistics, Skill.Education, Skill.Treatment],
            [Skill.Education, Skill.Science, Skill.Linguistics, Skill.Persuade],
            [Skill.Education, Skill.Persuade, Skill.Science],
            [
                `Laboratory (personal)|${EquipmentHelper.getPersonalLibraries()}`
            ],
            3),
        [PrimaryCareer.MediaReporter]: new PrimaryCareerModel(
            "Media (Reporter)",
            "It is all about the story... just get the story. They just never tell you the crazy stuff you have to do to get that story.",
            [2,3,0,2,1,2,1,0],
            [Skill.Education, Skill.Persuade, Skill.Insight],
            [Skill.Linguistics, Skill.Willpower, Skill.Stealth],
            [Skill.Education, Skill.Persuade, Skill.Insight, Skill.Stealth],
            [Skill.Education, Skill.Persuade, Skill.Insight],
            [
                "Media Kit|Surveillance Kit"
            ],
            3),
        [PrimaryCareer.CorporateExecutive]: new PrimaryCareerModel(
            "Corporate Executive",
            "You are climbing the food chain and have so many opportunities. You are moving in the right circles, and this is just the beginning. A desk with a view, a phone book full of contacts, and an office ready to do your bidding.",
            [1,2,1,2,2,3,0,0],
            [Skill.Persuade, Skill.Lifestyle, Skill.Command],
            [Skill.Education, Skill.Lifestyle, Skill.Willpower],
            [Skill.Persuade, Skill.Lifestyle, Skill.Command, Skill.Education],
            [Skill.Persuade, Skill.Lifestyle, Skill.Command],
            [
                "Fashionable quality corporate suit"
            ],
            4),
        [PrimaryCareer.ShipCrew]: new PrimaryCareerModel(
            "Ship Crew",
            "Out in the cold hard depths of space a quick mind and steady nerves are vital. You know how to fix anything your life relies on, and you are never far from a vacuum suit. These old ships have been going for centuries, but look after them and they will see you through one more journey.",
            [1,2,1,3,2,0,1,1],
            [Skill.Survival, Skill.Mechanics, Skill.Vacuum],
            [Skill.Space, Skill.Science, Skill.Pilot],
            [Skill.Survival, Skill.Mechanics, Skill.Vacuum, Skill.Space],
            [Skill.Survival, Skill.Mechanics, Skill.Vacuum],
            [
                "Vacuum Suit (3 Oxygen Loads)",
                "Mechanics Tool Kit",
                "5 assets towards the cost of a spaceship"
            ],
            3),
        [PrimaryCareer.IntelligenceOperative]: new PrimaryCareerModel(
            "Intelligence Operative",
            "With so many factions vying for secrets, there is plenty of work for those who know how to find them. Maybe you are in-house with one of the corporations, or a freelancer working for the highest bidder. Just watch your back.",
            [2,3,1,2,2,1,0,0],
            [Skill.Observation, Skill.Stealth, Skill.Insight],
            [Skill.Mysticism, Skill.Linguistics, Skill.Thievery],
            [Skill.Observation, Skill.Stealth, Skill.Insight, Skill.Thievery],
            [Skill.Observation, Skill.Stealth, Skill.Insight],
            [
                "Fake ID",
                "FACTION_HANDGUN",
                "Bulletproof Vest",
                "Disguise Kit"
            ],
            3),
        [PrimaryCareer.Accountant]: new PrimaryCareerModel(
            "Corporate Worker (Accountant)",
            "The other corporations do not have such widespread financial freedoms as Capitol does. A citizen’s money is his own to do with as he desires, and many aspirational Capitolians venture into the labyrinthine business of finance, investing their hard-earned cash into other ventures. Accountants provide advice to people from all walks of life about the risks, benefits, and options available, and make a tidy living doing it. Similar professionals exist in the other corporations, of course, but Capitol has them in abundance.",
            [1,2,1,3,2,1,1,0],
            [Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [Skill.Observation, Skill.Science, Skill.Lifestyle],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Persuade],
            [Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [
                "Expensive business suit",
                "Comptograph"
            ],
            3),
        [PrimaryCareer.Attorney]: new PrimaryCareerModel(
            "Corporate Worker (Attorney)",
            "Capitolian business exists in a balance between the profits of individual companies (and thus the corporation itself) and the rights of its citizens. Every Capitolian has the right to fair trial and legal representation, and between this and a range of civil actions for injury, stress, breach of individual rights, etc., the legal profession is never lacking for clients. Resentment towards attorneys can be severe, so most keep a small sidearm hidden on their person as insurance.",
            [1,2,1,2,2,2,1,0],
            [Skill.Education, Skill.Persuade, Skill.Observation],
            [Skill.Education, Skill.Lifestyle, Skill.Insight],
            [Skill.Education, Skill.Persuade, Skill.Willpower, Skill.Lifestyle],
            [Skill.Education, Skill.Persuade, Skill.Observation],
            [
                "Expensive business suit",
                "Personal library (Education)",
                "Slingshot Handgun",
                "Concealed holster for handgun"
            ],
            3),
        [PrimaryCareer.Salesman]: new PrimaryCareerModel(
            "Corporate Worker (Salesman)",
            "Going door-to-door in the cities, working in gleaming showrooms, or making unsolicited phone calls, salesmen are at once proud examples and maligned products of a society built upon absolute free trade. Few people care to be disturbed by the attentions of a salesman, but their persuasive talents see them selling all manner of items across Capitolian territories. Salesmen are highly competitive, even ruthless at times, their income dependent upon the size and number of sales they confirm.",
            [0,1,1,2,2,3,1,1],
            [Skill.Observation, Skill.Persuade, Skill.Willpower],
            [Skill.Insight, Skill.Lifestyle, Skill.Command],
            [Skill.Insight, Skill.Observation, Skill.Persuade, Skill.Willpower],
            [Skill.Observation, Skill.Persuade, Skill.Willpower],
            [
                "Expensive business suit",
                "Cell phone",
                "Case full of brochures",
                "Slingshot Handgun",
                "Concealed holster for handgun"
            ],
            3),
        [PrimaryCareer.Secretary]: new PrimaryCareerModel(
            "Corporate Worker (Secretary)",
            "The rich and powerful rely on secretaries and similar personal assistants to ensure that their busy lives run smoothly. Secretaries are not always appreciated for their work, for the work of a good secretary should be unobtrusive, but they are precious for their ability to bring order to a busy and chaotic world.",
            [1,3,1,2,2,2,0,0],
            [Skill.Education, Skill.Observation, Skill.Willpower],
            [Skill.Lifestyle, Skill.Linguistics, Skill.Stealth],
            [Skill.Education, Skill.Observation, Skill.Willpower, Skill.Stealth],
            [Skill.Education, Skill.Observation, Skill.Willpower],
            [
                "Smart business suit",
                "Pager",
                "Tape recorder"
            ],
            2),
        [PrimaryCareer.AthleteSportsman]: new PrimaryCareerModel(
            "Athlete (Sportsman)",
            "Sports that date back to the distant days of Old Earth still persist in Capitolian arenas. The disciplines of track and field, as well as ancient games like the many forms of football remain popular, while new sports emerge every decade, some of which gain traction in a crowded marketplace.",
            [2,1,1,0,1,2,2,2],
            [Skill.Athletics, Skill.Acrobatics, Skill.Resistance],
            [Skill.CloseCombat, Skill.Persuade, Skill.Willpower],
            [Skill.Athletics, Skill.Acrobatics, Skill.CloseCombat, Skill.Resistance],
            [Skill.Athletics, Skill.Acrobatics, Skill.Resistance],
            [
                "Athletic padding"
            ],
            2),
        [PrimaryCareer.AthletePrizeFighter]: new PrimaryCareerModel(
            "Athlete (Prize Fighter)",
            "Boxing, wrestling, and other martial arts remain popular, continuing the human appreciation for violent sports and the exploitation of combat prowess as a form of entertainment.",
            [2,2,1,0,1,1,2,2],
            [Skill.Athletics, Skill.CloseCombat, Skill.UnarmedCombat],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Willpower],
            [Skill.Athletics, Skill.Acrobatics, Skill.CloseCombat, Skill.UnarmedCombat],
            [Skill.Athletics, Skill.CloseCombat, Skill.UnarmedCombat],
            [
                "Brass Knuckles"
            ],
            2),
        [PrimaryCareer.AthleteStuntMan]: new PrimaryCareerModel(
            "Athlete (Stunt Man)",
            "A little different from other athletes, stunt men spend their effort making others look good – a stunt man performs the jobs too dangerous or difficult for actors and the like to attempt, and takes very little credit for it. Regardless, they are well-compensated for the dangerous tasks they undertake, and there is good work for soldiers and security specialists looking for other opportunities.",
            [2,2,2,1,1,0,2,1],
            [Skill.Acrobatics, Skill.Athletics, Skill.Pilot],
            [Skill.CloseCombat, Skill.UnarmedCombat, Skill.Willpower],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.Pilot],
            [Skill.Acrobatics, Skill.Athletics, Skill.Pilot],
            [
                "Corporate quality suit",
                "Basic Survival Kit (Urban)",
            ],
            3),
        [PrimaryCareer.MilitaryAirborneCavalry]: new PrimaryCareerModel(
            "Military (Airborne Cavalry)",
            "One of the iconic images of the AFC is its brave men and women dropping into battle from helicopters and drop-ships, descending by parachute into the fury of battle. These airborne cavalry swoop into the fray heedless of peril. Thrill-seekers, daredevils, and adrenaline junkies form the majority of airborne cavalry units, who have a reputation for being brash and reckless, but are consummate soldiers.",
            [2,1,2,0,2,1,2,1],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.RangedWeapons],
            [Skill.Athletics, Skill.Pilot, Skill.Willpower],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.RangedWeapons],
            [
                "Tortoise Mk. 1 Armour",
                "M50 Assault Rifle"
            ],
            2),
        [PrimaryCareer.MilitaryCAFPilot]: new PrimaryCareerModel(
            "Military (CAF Pilot)",
            "The pilots of the Capitol Air Force are regarded as elite amongst the AFC, and are highly prized. It takes a lot of time and effort to train a pilot, and a lot to equip him with an aircraft, so no effort and expense is spared to ensure that Capitol’s pilots are not only good at their job, but also good enough to survive.",
            [2,2,3,1,2,0,1,0],
            [Skill.HeavyWeapons, Skill.RangedWeapons, Skill.Pilot],
            [Skill.Acrobatics, Skill.Mechanics, Skill.Survival],
            [Skill.HeavyWeapons, Skill.Pilot, Skill.RangedWeapons, Skill.Willpower],
            [Skill.HeavyWeapons, Skill.RangedWeapons, Skill.Pilot],
            [
                "Ballistic nylon flight suit",
                "Slingshot Handgun",
                "Rebreather"
            ],
            2),
        [PrimaryCareer.PoliceAIPO]: new PrimaryCareerModel(
            "Police (Armed Interdiction Police Officer)",
            "Feared by citizens across the Capitol holdings, the brutal attentions of the ‘Apes’ – the nickname given to officers of the Armed Interdiction Police Squads – are something that everyone wishes to avoid. These men and women are brutal enforcers of law, more akin to soldiers than to police officers, sent out to quell riots and crush the most dangerous criminals.",
            [2,1,2,0,2,1,1,2],
            [Skill.Athletics, Skill.Observation, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Persuade, Skill.Resistance],
            [Skill.Athletics, Skill.CloseCombat, Skill.Observation, Skill.RangedWeapons],
            [Skill.Athletics, Skill.Observation, Skill.RangedWeapons],
            [
                "Hardback Armour",
                "CAR-24 Close Assault Rifle",
                "Baton"
            ],
            2),
        [PrimaryCareer.PoliceBodyguard]: new PrimaryCareerModel(
            "Police (Bodyguard)",
            "A vast number of private security firms specialise in personal protection, ensuring that their clients remain safe from a range of threats. These bodyguards are tough, observant, and ready for anything, and often identified by their dark suits, dark glasses, and sombre disposition.",
            [2,2,2,0,1,1,1,2],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Observation],
            [Skill.Athletics, Skill.UnarmedCombat, Skill.RangedWeapons],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Observation, Skill.Resistance],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Observation],
            [
                "Ballistic nylon suit",
                "Brass Knuckles",
                "Bolter Handgun"
            ],
            2),
        [PrimaryCareer.PolicePrivateInvestigator]: new PrimaryCareerModel(
            "Police (Private Investigator)",
            "Many smaller security companies – and freelance operations bought out by Capitol – focus more on investigating threats than preventing them. Private investigative work is often mundane and dull, but it is interspersed with bursts of danger and excitement, particularly when an investigation stumbles upon agents of the Dark Symmetry.",
            [1,2,2,0,1,2,2,1],
            [Skill.Insight, Skill.Observation, Skill.Resistance],
            [Skill.Acrobatics, Skill.Persuade, Skill.RangedWeapons],
            [Skill.Insight, Skill.Observation, Skill.RangedWeapons, Skill.Resistance],
            [Skill.Insight, Skill.Observation, Skill.Resistance],
            [
                "Ballistic Trenchcoat",
                "Bolter Handgun",
                "Media kit"
            ],
            2),
        [PrimaryCareer.MediaRadioJockey]: new PrimaryCareerModel(
            "Media (Radio Jockey)",
            "Radio stations both private and corporate can be found scattered across Capitol’s holdings, providing news, music, and entertainment for millions of listeners. These stations require people with presence and oratorical skill to be their ‘voice’, who also have the technical savvy to operate the broadcast equipment.",
            [1,2,1,2,1,3,1,0],
            [Skill.Observation, Skill.Persuade, Skill.Mechanics],
            [Skill.Linguistics, Skill.Insight, Skill.Willpower],
            [Skill.Linguistics, Skill.Mechanics, Skill.Observation, Skill.Persuade],
            [Skill.Observation, Skill.Persuade, Skill.Mechanics],
            [
                "Media kit|Surveillance kit"
            ],
            3),
        [PrimaryCareer.MediaTalentAgent]: new PrimaryCareerModel(
            "Media (Talent Agent)",
            "It is a sad truth of the media that simply having talent is not always enough to get you to the top. Talent agents have the contacts and experience to help rising stars continue to rise, in exchange for a cut of the profits.",
            [1,2,0,3,1,2,2,0],
            [Skill.Education, Skill.Persuade, Skill.Lifestyle],
            [Skill.Insight, Skill.Stealth, Skill.Willpower],
            [Skill.Education, Skill.Insight, Skill.Lifestyle, Skill.Persuade],
            [Skill.Education, Skill.Persuade, Skill.Lifestyle],
            [
                "Fashionable smart clothing",
                "Fashionable formal clothing",
                "Cell phone",
                "Membership at three VIP clubs"
            ],
            3),
        [PrimaryCareer.MediaPhotographer]: new PrimaryCareerModel(
            "Media (Photographer)",
            "“Pictures or it didn’t happen.” These words are the credo of Capitolian news media, which employs huge numbers of staff and independent photographers to provide them with pictures and footage of events across Capitol’s holdings.",
            [3,2,1,2,1,1,1,0],
            [Skill.Education, Skill.Observation, Skill.Stealth],
            [Skill.Insight, Skill.Pilot, Skill.Willpower],
            [Skill.Education, Skill.Insight, Skill.Observation, Skill.Stealth],
            [Skill.Education, Skill.Observation, Skill.Stealth],
            [
                "Camera",
                "Video camera",
                "Media kit"
            ],
            3),
        [PrimaryCareer.MediaFashionDesigner]: new PrimaryCareerModel(
            "Media (Fashion Designer)",
            "The rich and the powerful can afford the latest styles. Those at the top of the fashion industry make and promote those styles. To those of a more pragmatic bent, this industry can seem fickle and flighty, though the image conveyed by particular styles of clothing, and even the way someone wears armour or a sidearm (important accessories on the mean streets of San Dorado) is an important part of public image.",
            [2,1,0,2,3,2,1,0],
            [Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [Skill.Insight, Skill.Linguistics, Skill.Observation],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Persuade],
            [Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [
                "Media kit",
                "Ultra-fashionable clothing"
            ],
            3),
        [PrimaryCareer.MediaPoliticalCampaigner]: new PrimaryCareerModel(
            "Media (Political Analyst)",
            "Capitolian politics is a labyrinth of policies, lobbyists, public opinion, and compromise. It is too complex for any one person, no matter how intelligent, to oversee all of it, and every successful politician is surrounded by an equally accomplished staff of analysts and advisors. Many of these analysts aspire to office themselves, and use their time as analysts and counsellors to gain vital experience and valuable connections.",
            [1,2,1,2,1,3,1,0],
            [Skill.Command, Skill.Observation, Skill.Persuade],
            [Skill.Insight, Skill.Lifestyle, Skill.Willpower],
            [Skill.Command, Skill.Insight, Skill.Observation, Skill.Persuade],
            [Skill.Command, Skill.Observation, Skill.Persuade],
            [
                "Fashionable smart clothing",
                "Cell phone"
            ],
            4),
        [PrimaryCareer.LAJ_VAC]: new PrimaryCareerModel(
            "LAJ",
            "VACs within the Legislation and Applied Justice division are collectively known as the Right, maintaining peace and order with rigorous discipline and flawless logic. They are not the aggressive policemen of other corporations, with a serene demeanour that makes them all the more intimidating when they pursue a suspect.",
            [0,2,2,1,3,0,2,1],
            [Skill.Education, Skill.Observation, Skill.Willpower],
            [Skill.RangedWeapons, Skill.Insight, Skill.Science],
            [Skill.Education, Skill.Observation, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Education, Skill.Observation, Skill.Willpower],
            [
                "P1000 Handgun",
                "Light civilian shoulder pads",
                "Bulletproof nylon uniform",
                "EYE-tronic",
                "Basic forensics kit"
            ],
            1),
        [PrimaryCareer.LAJ_TIFF]: new PrimaryCareerModel(
            "LAJ",
            "TIFFs working within LAJ are collectively known as the Left, studying the laws of Cybertronic and of other corporations in intricate detail and determining ways to bend and manipulate them to the corporation’s advantage. To these individuals, the ends justify the means, so long as the ends do not involve actually breaking the law; laws can be bent and twisted, but never broken.",
            [0,2,1,3,2,2,1,0],
            [Skill.Education, Skill.Command, Skill.Persuade],
            [Skill.Linguistics, Skill.Insight, Skill.Lifestyle],
            [Skill.Education, Skill.Command, Skill.Linguistics, Skill.Persuade],
            [Skill.Education, Skill.Command, Skill.Persuade],
            [
                "SARaH system",
                "Media kit",
                "Bespoke fashionable clothing",
                "Subdermal Armour"
            ],
            3),
        [PrimaryCareer.ETP_VAC]: new PrimaryCareerModel(
            "ETP",
            "VACs within the Education, Training, and Publicity division are frequently teachers, instructors, journalists, and media producers. Their responsibility is to guide, inform, and educate both the people of Cybertronic and it’s customers. Only in Cybertronic can you find producers who specialise solely in subreal media, giving the corporation a monopoly on information and education within that simulated reality.",
            [1,2,2,2,2,2,0,0],
            [Skill.Education, Skill.Linguistics, Skill.Science],
            [Skill.Mechanics, Skill.Observation, Skill.Persuade],
            [Skill.Education, Skill.Linguistics, Skill.Mechanics, Skill.Science],
            [Skill.Education, Skill.Linguistics, Skill.Science],
            [
                "SARaH system",
                EquipmentHelper.getPersonalLibraries(),
                "Subreal link",
                "Media kit"
            ],
            2),
        [PrimaryCareer.ETP_TIFF]: new PrimaryCareerModel(
            "ETP",
            "TIFFs working within ETP are commonly advertisers, propagandists, entertainers, and investigative journalists; the lines between these professions are blurred within this division. Cybertronic’s allimportant public relations department, which speaks on behalf of each division, sits at the top of ETP, and is masterful at manipulating the perceptions of the public. These individuals are high-profile, and frequently asked to use their positions to gather information.",
            [1,2,1,2,2,3,0,0],
            [Skill.Education, Skill.Observation, Skill.Persuade],
            [Skill.Command, Skill.Linguistics, Skill.Insight],
            [Skill.Command, Skill.Education, Skill.Observation, Skill.Persuade],
            [Skill.Education, Skill.Observation, Skill.Persuade],
            [
                "SARaH system",
                "Media kit",
                "Bespoke fashionable clothing",
                "Subdermal Armour"
            ],
            4),
        [PrimaryCareer.ABC_VAC]: new PrimaryCareerModel(
            "ABC",
            "VACs within the Administrative Bureaucratic Control division are administrators and bureaucrats. Theirs are the minds that permit and restrict access to the workings of the corporation, giving them absolute control over the flow of resources and information.",
            [2,2,1,2,3,0,1,0],
            [Skill.Education, Skill.Lifestyle, Skill.Willpower],
            [Skill.Observation, Skill.Science, Skill.Stealth],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Willpower],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Willpower],
            [
                "Personal computer",
                "Media kit",
                "Smart corporate-quality clothing"
            ],
            1),
        [PrimaryCareer.ABC_TIFF]: new PrimaryCareerModel(
            "ABC",
            "TIFFs working within ABC are rare, as the Line does not require a great deal of intuition, empathy, or creativity. Those few who do serve in policy-making roles, establishing the protocols and regulations that the ABC operates under.",
            [1,2,1,2,3,1,1,0],
            [Skill.Education, Skill.Lifestyle, Skill.Willpower],
            [Skill.Education, Skill.Observation, Skill.Science],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Willpower],
            [Skill.Education, Skill.Lifestyle, Skill.Willpower],
            [
                "Personal computer",
                "Media kit",
                "Smart corporate-quality clothing"
            ],
            3),
        [PrimaryCareer.FEF_VAC]: new PrimaryCareerModel(
            "FEF",
            "VACs within the Finance and Economic Forecasting division are financiers, bankers, accountants, and speculative traders, handling the wealth and economy of Cybertronic. Their efforts, guided by implants and honed by their use of XLR8, allow them to manipulate the financial world more deftly than all but the most gifted analysts and traders.",
            [0,3,2,3,2,0,1,0],
            [Skill.Lifestyle, Skill.Observation, Skill.Science],
            [Skill.Education, Skill.Lifestyle, Skill.Willpower],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Science],
            [Skill.Lifestyle, Skill.Observation, Skill.Science],
            [
                "SARaH system",
                "Comptograph"
            ],
            3),
        [PrimaryCareer.FEF_TIFF]: new PrimaryCareerModel(
            "FEF",
            "TIFFs working within FEF are chosen from the most gifted of abstract thinkers, individuals who are able to collate and interpret information in unusual ways and discern patterns that few others may notice. Using implants and exotic techniques to guide them in their predictions, they can forecast economies – and other trends – with remarkable precision.",
            [3,1,1,3,2,1,0,0],
            [Skill.Lifestyle, Skill.Science, Skill.Willpower],
            [Skill.Observation, Skill.Insight, Skill.Mysticism],
            [Skill.Lifestyle, Skill.Observation, Skill.Science, Skill.Willpower],
            [Skill.Lifestyle, Skill.Mysticism, Skill.Science, Skill.Willpower],
            [
                "SARaH system",
                "Mathematic sequencer"
            ],
            4),
        [PrimaryCareer.ARD_VAC]: new PrimaryCareerModel(
            "ARD",
            "VACs within the Advanced Research and Development division are labourers and laboratory technicians, providing the utility and support work necessary to allow their superiors to make the discoveries and progress that is vital for Cybertronic’s future.",
            [2,1,1,2,1,0,2,2],
            [Skill.Education, Skill.Mechanics, Skill.Observation],
            [Skill.Athletics, Skill.Science, Skill.Survival],
            [Skill.Education, Skill.Mechanics, Skill.Observation, Skill.Survival],
            [Skill.Education, Skill.Mechanics, Skill.Observation],
            [
                "Basic repair kit",
                EquipmentHelper.getSurvivalKits()
            ],
            1),
        [PrimaryCareer.ARD_TIFF]: new PrimaryCareerModel(
            "ARD",
            "TIFFs working within ARD are researchers, designers, and academics. Their efforts are spent unlocking the secrets of ancient technology, and turning those secrets into practical uses.",
            [2,3,1,3,0,0,1,1],
            [Skill.Education, Skill.Mechanics, Skill.Science],
            [Skill.Linguistics, Skill.Observation, Skill.Survival],
            [Skill.Education, Skill.Mechanics, Skill.Observation, Skill.Science],
            [Skill.Education, Skill.Mechanics, Skill.Science],
            [
                "Advanced analytical kit",
                "CX-Multitool"
            ],
            2),
        [PrimaryCareer.EPD_VAC]: new PrimaryCareerModel(
            "EPD",
            "VACs within the Execution, Production and Distribution division are factory workers, warehouse staff and delivery drivers, serving as the chain between an idea and the finished product.",
            [1,1,2,2,0,1,2,2],
            [Skill.Lifestyle, Skill.Mechanics, Skill.Pilot],
            [Skill.Athletics, Skill.Resistance, Skill.Space],
            [Skill.Lifestyle, Skill.Mechanics, Skill.Pilot, Skill.Resistance],
            [Skill.Lifestyle, Skill.Mechanics, Skill.Pilot],
            [
                "CX-Multitool",
                "Cell link"
            ],
            1),
        [PrimaryCareer.EPD_TIFF]: new PrimaryCareerModel(
            "EPD",
            "TIFFs working within EPD are salesmen and customer services representatives. They are often armed, if only to prevent thieves and other criminals from trying to steal their products.",
            [1,2,1,2,1,3,1,0],
            [Skill.Education, Skill.Observation, Skill.Persuade],
            [Skill.Insight, Skill.Lifestyle, Skill.RangedWeapons],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Persuade],
            [Skill.Education, Skill.Observation, Skill.Persuade],
            [
                "SARaH system",
                "Basic survival kit (Urban)",
                "P1000 Handgun"
            ],
            2),
        [PrimaryCareer.CRI_VAC]: new PrimaryCareerModel(
            "CRI",
            "VACs within the Cybernetic Research and Implementation division are technicians, medical researchers, and engineers. CRI is a small, elite division focussed on the development and application of cybernetics and the integration of technology with humanity.",
            [2,2,1,3,2,0,1,0],
            [Skill.Mechanics, Skill.Science, Skill.Treatment],
            [Skill.Insight, Skill.Medicine, Skill.Observation],
            [Skill.Observation, Skill.Mechanics, Skill.Medicine, Skill.Science],
            [Skill.Mechanics, Skill.Medicine, Skill.Science, Skill.Treatment],
            [
                "CX repair tool",
                "Basic medkit"
            ],
            3),
        [PrimaryCareer.CRI_TIFF]: new PrimaryCareerModel(
            "CRI",
            "TIFFs working within CRI are pioneering experts at the top of their field, driving the research and development of their peers with their creativity and grand ambition. The VACs they work with are extremely capable when it comes to the technical side of CRI’s work, but they lack the imaginative spark that allows them to drive development.",
            [1,2,1,3,1,2,1,0],
            [Skill.Mechanics, Skill.Science, Skill.Treatment],
            [Skill.Insight, Skill.Medicine, Skill.Observation],
            [Skill.Observation, Skill.Mechanics, Skill.Medicine, Skill.Science],
            [Skill.Mechanics, Skill.Medicine, Skill.Science, Skill.Treatment],
            [
                "Personal computer",
                "Basic repair waldo|Automed"
            ],
            4),
        [PrimaryCareer.EDA_VAC]: new PrimaryCareerModel(
            "EDA",
            "VACs within the Engineering, Development, and Application division are coordinators, assistants, strategic administrators, and technical managers. They are seeded through the other divisions of RDM to guide their activities and ensure that their projects are in line with the grand design.",
            [1,3,1,2,2,2,0,0],
            [Skill.Education, Skill.Lifestyle, Skill.Observation],
            [Skill.Insight, Skill.Mechanics, Skill.Science],
            [Skill.Education, Skill.Insight, Skill.Lifestyle, Skill.Observation],
            [Skill.Education, Skill.Lifestyle, Skill.Observation],
            [
                "SARaH system",
                "Cell link",
                "Personal computer"
            ],
            3),
        [PrimaryCareer.EDA_TIFF]: new PrimaryCareerModel(
            "EDA",
            "TIFFs working within EDA are Cybertronic’s big-picture thinkers, interpreting the dictates of the Board and turning them into a strategy for development and production. They have an iron will, and insight into elements of the corporation’s strategy and role that few others share.",
            [1,3,1,2,3,1,0,0],
            [Skill.Education, Skill.Observation, Skill.Willpower],
            [Skill.Insight, Skill.Mysticism, Skill.Science],
            [Skill.Education, Skill.Mysticism, Skill.Observation, Skill.Willpower],
            [Skill.Education, Skill.Mysticism, Skill.Observation, Skill.Willpower],
            [
                "DIANA system",
                "Personal computer"
            ],
            4),
        [PrimaryCareer.MCR_VAC]: new PrimaryCareerModel(
            "MCR",
            "VACs within the Military Conflict and Resolution division are commonly known as People’s Volunteers, or simply PV. These militiamen are used to guard sensitive locations and to support front line forces. In spite of their status as a militia, the PV are closer to the standard soldiery of the other corporations in practical terms than to part-time defence forces, and when not deployed in the field they spend every day training. Their routine dose of XLR8 makes them impervious to boredom, while their implants help render them impervious to pain and fear.",
            [1,2,2,0,2,0,2,2],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Acrobatics, Skill.Pilot, Skill.Observation],
            [Skill.CloseCombat, Skill.Observation, Skill.RangedWeapons, Skill.Willpower],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [
                "AR3000 Assault Rifle",
                "Ballistic nylon military uniform",
                "Medium military shoulder pads",
                "Neural filter implant"
            ],
            2),
        [PrimaryCareer.MCR_TIFF]: new PrimaryCareerModel(
            "MCR",
            "TIFFs working within MCR are well-known across the solar system as Chasseurs, Cybertronic’s front line cybernetically-enhanced infantry. These soldiers are unremarkable in their capabilities, but unique in that their armament and equipment are closely integrated into the warrior’s body – a Chasseur’s wargear is an extension of his body, and it is difficult to mistake a Chasseur for anything else. Celebrity Chasseurs like Vince Diamond are extensively augmented and highly recognisable.",
            [1,2,2,0,2,0,2,2],
            [Skill.Acrobatics, Skill.RangedWeapons, Skill.Willpower],
            [Skill.CloseCombat, Skill.Pilot, Skill.UnarmedCombat],
            [Skill.Acrobatics, Skill.RangedWeapons, Skill.UnarmedCombat, Skill.Willpower],
            [Skill.Acrobatics, Skill.RangedWeapons, Skill.Willpower],
            [
                "AR3501 Assault Rifle",
                "Electric Fists",
                "Titanium Plate Implants",
                "Neural filter implant",
                "EYE-tronic"
            ],
            3),
        [PrimaryCareer.IES_VAC]: new PrimaryCareerModel(
            "IES",
            "VACs within the Internal and External Security division are relatively few in number, for their dispassion and atrophied creativity prevent them from becoming truly excellent operatives. In practical terms, VACs are better for short-term missions, particularly assassinations, as they can rely more upon planning than improvisation to succeed.",
            [2,2,2,1,1,0,1,2],
            [Skill.Observation, Skill.RangedWeapons, Skill.Stealth],
            [Skill.CloseCombat, Skill.Education, Skill.Thievery],
            [Skill.Observation, Skill.RangedWeapons, Skill.Stealth, Skill.Thievery],
            [Skill.Observation, Skill.RangedWeapons, Skill.Stealth, Skill.Thievery],
            [
                "Subdermal Armour",
                "Decent fake ID",
                "P1000 Handgun",
                "Silencer",
                "Garrotte",
                "Disguise kit"
            ],
            3),
        [PrimaryCareer.IES_TIFF]: new PrimaryCareerModel(
            "IES",
            "TIFFs working within IES are the division’s top agents, turned into living instruments of the corporation’s will. Their skills are superlative, and only the most paranoid will realise they are subject to IES attentions until it is too late. Their talent for infiltration allows them to enter the trust of others as easily as an ordinary person may pass through an open door.",
            [1,2,1,2,2,3,0,0],
            [Skill.Observation, Skill.Persuade, Skill.Stealth],
            [Skill.Education, Skill.Linguistics, Skill.Thievery],
            [Skill.Education, Skill.Observation, Skill.Persuade, Skill.Stealth],
            [Skill.Education, Skill.Observation, Skill.Persuade, Skill.Stealth],
            [
                "Subdermal Armour",
                "Flawless fake ID",
                "Automask"
            ],
            4),
        [PrimaryCareer.APH_VAC]: new PrimaryCareerModel(
            "APH",
            "VACs within the Analytical Processing and Hypothesis division are analysts, logisticians, and combat statisticians, utilising vast networks of information and complex formulae to determine the likely outcomes of military operations before they happen. Their analysis gives SWI operations a great degree of focus and clarity in practice, as countless variables have been mapped and analysed long before a shot is fired. A few APH VACs operate near the front lines, handling logistics and communicating the latest data back to headquarters.",
            [1,2,1,3,2,0,1,0],
            [Skill.Education, Skill.Science, Skill.Willpower],
            [Skill.Linguistics, Skill.Pilot, Skill.RangedWeapons],
            [Skill.Education, Skill.RangedWeapons, Skill.Science, Skill.Willpower],
            [Skill.Education, Skill.RangedWeapons, Skill.Science, Skill.Willpower],
            [
                "Personal computer",
                "SARaH system",
                "Mathematic sequencer"
            ],
            3),
        [PrimaryCareer.APH_TIFF]: new PrimaryCareerModel(
            "APH",
            "TIFFs working within APH craft the battle plans and operations engaged in by SWI forces. Their minds are augmented and shaped so that they can devise effective stratagems for life-and-death situations, and these strategists are trained to regard life and death as the results of an equation, distancing them from the lives that are lost because of a plan engineered in a command centre far from the battlefield. They are fitted with implants that suppress their emotions, in order to keep them from dwelling on the human cost of their decisions.",
            [1,2,2,2,1,3,1,0],
            [Skill.Education, Skill.Science, Skill.Willpower],
            [Skill.Linguistics, Skill.Persuade, Skill.Command],
            [Skill.Education, Skill.RangedWeapons, Skill.Science, Skill.Willpower],
            [Skill.Education, Skill.Science, Skill.RangedWeapons, Skill.Willpower],
            [
                "Personal computer",
                "SARaH system",
                "Neural filter implant"
            ],
            3),
        [PrimaryCareer.PoliceCIO]: new PrimaryCareerModel(
            "Police (Criminal Intelligence Officer, Luna PD)",
            "Working undercover can be a nerve-wracking experience and can totally change your life. Sometimes you can go for years posing as some of the worst criminal scum Luna has to offer, but if that helps you catch the overall bad guys then it’s a price worth paying.",
            [1,2,1,2,3,2,0,0],
            [Skill.Observation, Skill.Stealth, Skill.Thievery],
            [Skill.Insight, Skill.Linguistics, Skill.RangedWeapons],
            [Skill.Observation, Skill.RangedWeapons, Skill.Stealth, Skill.Thievery],
            [Skill.Observation, Skill.Stealth, Skill.Thievery],
            [
                "Piranha Handgun",
                "Fake ID",
                "Disguise kit"
            ],
            2),
        [PrimaryCareer.PoliceFRO]: new PrimaryCareerModel(
            "Police (Fire and Rescue Officer, Luna PD)",
            "Fire and accident is not uncommon in a place as on edge and volatile as Luna City. Sometimes poorly-maintained facilities cause blazes, other times gangs light each other’s territory up to show who’s boss, but it’s always the same people who need to save the day – you!",
            [2,1,1,1,2,0,2,0],
            [Skill.Athletics, Skill.Observation, Skill.Willpower],
            [Skill.Mechanics, Skill.Pilot, Skill.Resistance],
            [Skill.Athletics, Skill.Observation, Skill.Resistance, Skill.Willpower],
            [Skill.Athletics, Skill.Observation, Skill.Willpower],
            [
                "Luna PD Fire and Rescue uniform",
                "Rebreather"
            ],
            2),
        [PrimaryCareer.PoliceRiot]: new PrimaryCareerModel(
            "Police (Riot Officer, Luna PD)",
            "When things go wrong, people get scared and scared people can soon become angry. Before you know it groups of angry people are coming together to vent in public places, and that’s when things can get ugly. Thankfully you’ll always be present with your trusty baton and sturdy shield to help keep order, whether it looks like it will be a peaceful demonstration or a full-blown riot.",
            [1,3,2,0,1,0,2,2],
            [Skill.Athletics, Skill.CloseCombat, Skill.Observation],
            [Skill.Acrobatics, Skill.RangedWeapons, Skill.Treatment],
            [Skill.Athletics, Skill.CloseCombat, Skill.Observation, Skill.RangedWeapons],
            [Skill.Athletics, Skill.CloseCombat, Skill.Observation],
            [
                "Hardback Armour",
                "Luna PD uniform",
                "Baton",
                "Riot Shield"
            ],
            2),
        [PrimaryCareer.PoliceTSO]: new PrimaryCareerModel(
            "Police (Tactical Services Officer, Luna PD)",
            "When the bad guys go in all guns blazing, you’re the one to take them on. When they hole up in their dens of vice, or they take a load of innocent citizens hostage, you go in and sort them out. Well-trained and ready for anything, you’re a soldier of justice in the war on crime.",
            [1,2,2,1,1,0,2,2],
            [Skill.Athletics, Skill.Observation, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Pilot, Skill.Treatment],
            [Skill.Athletics, Skill.Observation, Skill.RangedWeapons, Skill.Treatment],
            [Skill.Athletics, Skill.Observation, Skill.RangedWeapons],
            [
                "Hardback Armour",
                "Luna PD uniform",
                "CAR-24 Close Assault Rifle",
                "Smoke grenades and torch attachment to assault rifle"
            ],
            2),
        [PrimaryCareer.MediaPR]: new PrimaryCareerModel(
            "Media (PR Officer, Luna PD)",
            "You’re the people that make the boys in blue look good. You talk to journalists, arrange photo-opportunities and when some bright spark in command thinks it’s time to ‘connect with the youth’ you’re burdened with designing mascots and leaflets to explain to kids that if they get involved with crime they will definitely do the time.",
            [1,2,1,2,2,3,0,0],
            [Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [Skill.Linguistics, Skill.Observation, Skill.Willpower],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Persuade],
            [Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [
                "Luna PD uniform",
                "Cell phone",
                "Media kit"
            ],
            3),
        [PrimaryCareer.Cabbie]: new PrimaryCareerModel(
            "Cabbie",
            "You’re one of the many cab drivers that save people from the crush and tedium of public transport for a very competitive fee. Your job can be pretty repetitive sometimes, but occasionally you actually get to meet interesting people and hear some pretty interesting stories.",
            [1,2,2,2,1,2,1,0],
            [Skill.Mechanics, Skill.Observation, Skill.Pilot],
            [Skill.Persuade, Skill.Psychotherapy, Skill.Willpower],
            [Skill.Mechanics, Skill.Observation, Skill.Pilot],
            [Skill.Mechanics, Skill.Observation, Skill.Pilot],
            [
                "Cab driver's license",
                "User car (on loan from cab company)"
            ],
            1),
        [PrimaryCareer.Engineer]: new PrimaryCareerModel(
            "Engineer",
            "Simply put, you design, build, and fix stuff. Bridges, communication networks, cars, pressurised pipelines containing highly toxic effluent – yours is not necessarily a glamourous job, but someone needs to think up how to make things and solve the problems when they break!",
            [1,1,2,3,2,0,1,1],
            [Skill.Education, Skill.Mechanics, Skill.Science],
            [Skill.Observation, Skill.Vacuum, Skill.Willpower],
            [Skill.Education, Skill.Mechanics, Skill.Science, Skill.Vacuum],
            [Skill.Education, Skill.Mechanics, Skill.Science],
            [
                "Comptograph|Personal laboratory"
            ],
            3),
        [PrimaryCareer.Archaeologist]: new PrimaryCareerModel(
            "Archaeologist",
            "You are a scholar of history, but you go one step beyond the academics who content themselves to read accounts in old books. You get down into the dirt and the rubble, toiling to bring the truth to light with the application of perseverance, educated guesswork and a little luck.",
            [1,3,2,0,1,0,2,2],
            [Skill.Education, Skill.Linguistics, Skill.Observation, Skill.Persuade],
            [Skill.Athletics, Skill.Science, Skill.Willpower],
            [Skill.Education, Skill.Linguistics, Skill.Observation, Skill.Willpower],
            [Skill.Education, Skill.Linguistics, Skill.Observation, Skill.Persuade],
            [
                "Archaeology excavation toolkit",
                EquipmentHelper.getPersonalLibraries()
            ],
            3),
        [PrimaryCareer.CartelInvestigator]: new PrimaryCareerModel(
            "Police (Cartel Investigator)",
            "The Cartel needs its own investigators, both externally and internally. They’re tasked with tirelessly hunting down heretics and the insidious influence of the Dark Symmetry, as well as gathering intelligence on the other factions and trying to prevent conflict from the shadows. It’s a difficult and thankless task, but their efforts are not in vain – who knows how many have been saved by the work of an investigator!",
            [1,2,2,1,2,2,2,0],
            [Skill.Observation, Skill.Persuade, Skill.Stealth],
            [Skill.RangedWeapons, Skill.Treatment, Skill.Willpower],
            [Skill.RangedWeapons, Skill.Observation, Skill.Persuade, Skill.Willpower],
            [Skill.Observation, Skill.Persuade, Skill.Stealth],
            [
                "Investigator badge in flip wallet",
                "Shoulder holster",
                "Piranha Handgun",
                "Bulletproof Vest"
            ],
            3),
        [PrimaryCareer.Lobbyist]: new PrimaryCareerModel(
            "Corporate (Lobbyist)",
            "Sometimes people need to make decisions about important issues like whether to lower trade tariffs or who to award the latest longrange freight contract to. Unfortunately, they don’t always make the right decision, and so this is where the lobbyists come in. Smooth operators who have a way with words, it’s their job to make sure that important decisions go the way they want – and they’ll make sure that the way they want is the most attractive option available.",
            [0,3,1,2,2,3,0,0],
            [Skill.Lifestyle, Skill.Observation, Skill.Persuade],
            [Skill.Linguistics, Skill.Persuade, Skill.Willpower],
            [Skill.Education, Skill.Lifestyle, Skill.Persuade, Skill.Willpower],
            [Skill.Lifestyle, Skill.Observation, Skill.Persuade],
            [
                "Fashionable quality suit",
                "Standing order with telegram provider"
            ],
            4),
        [PrimaryCareer.Bodyguard]: new PrimaryCareerModel(
            "Military (Bodyguard)",
            "Close quarter security isn’t something everyone can do – it takes dedication and training in order to protect a client. Whether it’s for a corporate superior or as a freelancing job for a less-thanlegitimate employer, the bodyguard is expected to put themselves in the firing line.",
            [1,3,2,0,1,0,2,2],
            [Skill.CloseCombat, Skill.Observation, Skill.RangedWeapons],
            [Skill.Athletics, Skill.Mechanics, Skill.RangedWeapons],
            [Skill.Athletics, Skill.CloseCombat, Skill.Observation, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Observation, Skill.RangedWeapons],
            [
                "Shoulder holster",
                EquipmentHelper.getFactionHandguns(Faction.Freelancer),
                "Bulletproof Vest"
            ],
            3),
        [PrimaryCareer.Consultant]: new PrimaryCareerModel(
            "Corporate (Consultant)",
            "Sometimes a department or team needs a skillset it doesn’t possess, or the top brass consider an outside opinion needed before they proceed. This is where consultants are invited in – often well paid for their services, they’re not always liked by the people they’re supposed to be helping and they generally know it. A hefty consultancy pay check certainly helps them get through any animosity they may encounter.",
            [0,2,1,3,2,3,0,0],
            [Skill.Education, Skill.Lifestyle, Skill.Linguistics],
            [Skill.Medicine, Skill.Persuade, Skill.Science],
            [Skill.Education, Skill.Lifestyle, Skill.Medicine, Skill.Science],
            [Skill.Education, Skill.Lifestyle, Skill.Linguistics],
            [
                "Expensive bespoke suit",
                "Endless supply of business cards"
            ],
            4),
        [PrimaryCareer.OrganisationAdministrator]: new PrimaryCareerModel(
            "Organisation (Administrator)",
            "Not every Stronghold maintains a system of paperwork or an official means of recording its affairs. Regardless, though, every item of equipment, building, or function requires some form of administration to avoid the resultant chaos. The Administrators work furiously behind the scenes to catalogue, issue, requisition, and redistribute any and all of the goods or services that their Strongholds may require to survive from day to day.",
            [1,3,1,2,2,1,1,0],
            [Skill.Education, Skill.Lifestyle, Skill.Observation],
            [Skill.Linguistics, Skill.Resistance, Skill.Willpower],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Willpower],
            [Skill.Education, Skill.Lifestyle, Skill.Observation],
            [
                "Functional regional clothing"
            ],
            2),
        [PrimaryCareer.OrganisationAllotmentMinister]: new PrimaryCareerModel(
            "Organisation (Allotment Minister)",
            "Everyone contributes, everyone receives a share of the contribution. It is the task of the Allotment Ministers to oversee the distribution of the Stronghold’s equipment and necessities, such as food and water. In times of surplus, those that contribute the most may receive an extra return on their input in comparison to others. From tallying timesheets, to understanding the quality of contribution, nothing escapes the Allotment Ministers’ scrutiny.",
            [1,2,1,2,2,2,1,0],
            [Skill.Education, Skill.Observation, Skill.Persuade],
            [Skill.Command, Skill.Lifestyle, Skill.Resistance],
            [Skill.Education, Skill.Observation, Skill.Persuade, Skill.Resistance],
            [Skill.Education, Skill.Observation, Skill.Persuade],
            [
                "Functional regional clothing",
                "Black notebook and pen"
            ],
            2),
        [PrimaryCareer.OrganisationFacilitiesDivisor]: new PrimaryCareerModel(
            "Organisation (Facilities Divisor)",
            "Juggling the sometimes insurmountable accommodation problems of the larger Strongholds and cities is the nightmare task of the Facilities Divisors. Allocating building space between production, manufacture, and living quarters can be an arduous task when space is limited by the very walls that protect you; there is always a seemingly endless queue of dissatisfied citizens to contend with, and countless torrents of hurled abuse, both physical and verbal, to dodge.",
            [2,1,1,2,2,2,1,0],
            [Skill.Acrobatics, Skill.Education, Skill.Willpower],
            [Skill.Lifestyle, Skill.Persuade, Skill.Resistance],
            [Skill.Acrobatics, Skill.Education, Skill.Persuade, Skill.Willpower],
            [Skill.Acrobatics, Skill.Education, Skill.Willpower],
            [
                "Functional regional clothing",
                "Painkillers"
            ],
            2),
        [PrimaryCareer.OrganisationCommissioner]: new PrimaryCareerModel(
            "Organisation (Commissioner)",
            "In a vast, complex, and seemingly chaotic machine such as Whitestar, it would normally be an easy task to slip through the cracks. Despite the fact that the notion is anathema to most of the citizens of the Federation, there are those who do attempt to skive at every opportunity. The Commissioners keep idle bodies busy by finding the most suitable work for available hands. It is their task to evaluate an individual’s skills and competencies in order to more effectively focus his labour, then issue the appropriate tasks.",
            [1,2,0,2,2,3,1,0],
            [Skill.Command, Skill.Education, Skill.Observation],
            [Skill.Insight, Skill.Persuade, Skill.Resistance],
            [Skill.Command, Skill.Education, Skill.Observation, Skill.Persuade],
            [Skill.Command, Skill.Education, Skill.Observation],
            [
                "Functional regional clothing"
            ],
            2),
        [PrimaryCareer.TechnicalFactoryWorkerWhitestar]: new PrimaryCareerModel(
            "Technical (Factory Worker)",
            "The Federation depends upon manual labour for any number of tasks, from clothing manufacture to vehicle assembly; there is just not enough functioning pre-Exodus equipment anywhere to perform the vast number of tasks that are commonly automated by the corporations. Some view their task as a dull and tedious repetition that requires concentrated willpower to survive, whilst others enjoy the stability that continuous employment in a structured environment brings, but regardless of their viewpoint, this seemingly modest role is a fairly respected one amongst the citizenry of Whitestar.",
            [1,2,2,2,2,0,1,1],
            [Skill.Lifestyle, Skill.Mechanics, Skill.Willpower],
            [Skill.Observation, Skill.Pilot, Skill.Resistance],
            [Skill.Lifestyle, Skill.Mechanics, Skill.Pilot, Skill.Willpower],
            [Skill.Lifestyle, Skill.Mechanics, Skill.Willpower],
            [
                "Basic tool kit",
                "Hard-wearing work uniform"
            ],
            1),
        [PrimaryCareer.TechnicalPatchworkMekhanik]: new PrimaryCareerModel(
            "Technical (Patchwork Mekhanik)",
            "Maintaining and repairing the pre-Exodus equipment and facilities that Whitestar has managed to salvage is often as much a work of art as it is technical ability. From the huge tunnelling machines to the delicate nuclear fusion reactors that power some of the larger Strongholds, the sheer range of technology that mechanics repair means that they must quickly master various technical competencies and perform heroics on equipment that should have been decommissioned centuries ago. The life of a Patchwork Mekhanik can be extremely dangerous, but it is one that is greatly respected in every walk of life throughout the Federation.",
            [1,2,1,2,2,0,2,1],
            [Skill.Education, Skill.Mechanics, Skill.Observation],
            [Skill.Pilot, Skill.Resistance, Skill.Science],
            [Skill.Education, Skill.Mechanics, Skill.Observation, Skill.Pilot],
            [Skill.Education, Skill.Mechanics, Skill.Observation],
            [
                EquipmentHelper.getSurvivalKits(),
                "Mini-torch",
                "Advanced repair kit"
            ],
            1),
        [PrimaryCareer.TechnicalKuznets]: new PrimaryCareerModel(
            "Technical (Kuznets)",
            "The ramshackle buildings and rust-covered vehicles of the Federation are usually forged anew or welded together from several other sources. The blacksmiths of Whitestar learn the ancient arts of their forebears from several fields of expertise in order to become true masters of bricolage. A truly intensive labour that requires infinite patience, an eye for impurity, and excellent coordination also means that not only the metal they work upon, but also body and mind, are hardened at the forge.",
            [0,1,2,1,2,0,2,3],
            [Skill.Athletics, Skill.Mechanics, Skill.Resistance],
            [Skill.Education, Skill.Observation, Skill.Willpower],
            [Skill.Athletics, Skill.Mechanics, Skill.Resistance, Skill.Willpower],
            [Skill.Athletics, Skill.Mechanics, Skill.Resistance],
            [
                "Blacksmith's hammer",
                "Hard-wearing work uniform and apron",
                "Blast visor"
            ],
            1),
        [PrimaryCareer.TechnicalInzhener]: new PrimaryCareerModel(
            "Technical (Inzhener)",
            "Repurposing equipment and components is a different matter to fixing machinery. Teams of multi-discipline and specialist engineers pore over ancient blueprints, damaged circuitry, recovered tech, and defunct machinery in the hopes of rediscovering old secrets or recreating lost marvels from the pre-Exodus days. Transformation and metamorphosis are the buzz words of the Whitestar Inzhener, rather than new concept or innovative design.",
            [1,2,2,2,1,2,1,0],
            [Skill.Education, Skill.Mechanics, Skill.Science],
            [Skill.Observation, Skill.Persuade, Skill.Willpower],
            [Skill.Education, Skill.Mechanics, Skill.Persuade, Skill.Science],
            [Skill.Education, Skill.Mechanics, Skill.Science],
            [
                "Hard-wearing work uniform",
                "Workshop"
            ],
            2),
        [PrimaryCareer.GatheringOkhotnik]: new PrimaryCareerModel(
            "Gathering (Okhotnik)",
            "Finding food or game in the acid-scarred Wasteland would seem like a fool’s errand or impossible task, yet there are those who manage to do so. The Okhotniki of the more remote Strongholds are true masters of foraging and gathering, often finding prey or abandoned foodstuffs in the unlikeliest of places. Of course, the question as to whether it will be edible varies wildly from hunter to hunter.",
            [1,2,2,2,0,1,2,1],
            [Skill.Observation, Skill.RangedWeapons, Skill.Survival],
            [Skill.Athletics, Skill.AnimalHandling, Skill.Resistance],
            [Skill.AnimalHandling, Skill.Observation, Skill.RangedWeapons, Skill.Survival],
            [Skill.Observation, Skill.RangedWeapons, Skill.Survival],
            [
                "Okhotnik 778 Sniper Rifle",
                EquipmentHelper.getSurvivalKits()
            ],
            1),
        [PrimaryCareer.GatheringRazvedchik]: new PrimaryCareerModel(
            "Gathering (Razvedchik)",
            "Scouts exist in every community, always pushing the envelope in search of new pathways between Strongholds, or constantly seeking a new discovery that will allow them to take up the mantle of Resector. Most Razvedchiki also volunteer within their local Milita, where they help to patrol the tunnels and immediate surroundings of their home in order to prevent mutant attacks or tribal incursions. They often operate alone and on foot in extremely hostile territory, which means that the average scout is easily capable of stealthily navigating tricky ground, but will be less than comfortable toasting kvass with strangers.",
            [2,2,1,1,1,0,2,2],
            [Skill.Athletics, Skill.Observation, Skill.Survival],
            [Skill.RangedWeapons, Skill.Resistance, Skill.Stealth],
            [Skill.Athletics, Skill.Observation, Skill.Stealth, Skill.Survival],
            [Skill.Athletics, Skill.Observation, Skill.Survival],
            [
                "Iron Hand Autopistol",
                EquipmentHelper.getSurvivalKits(),
                "Binoculars",
                "Pioneer's Saw-Back"
            ],
            1),
        [PrimaryCareer.GatheringPilot]: new PrimaryCareerModel(
            "Gathering (Pilot)",
            "The pilots are the people who transport the personnel and materials of the Federation from Stronghold to Stronghold. Most pilots learn to master a particular vehicle that then evolves into a trusted companion for the rest of their career, whilst a few ensure that they vary their competencies across a broad range of categories (or ‘tooling up the garage’ as the popular saying goes); from spacecraft that range across the Solar System to trains that crawl the Sub- Siberian tunnels, some pilots just want it all.",
            [1,2,2,2,1,0,2,1],
            [Skill.Mechanics, Skill.Pilot, Skill.Resistance],
            [Skill.Gunnery, Skill.Space, Skill.Willpower],
            [Skill.Mechanics, Skill.Pilot, Skill.Resistance, Skill.Willpower],
            [Skill.Mechanics, Skill.Pilot, Skill.Resistance],
            [
                "Enviro-suit",
                EquipmentHelper.getSurvivalKits()
            ],
            2),
        [PrimaryCareer.PreservationMilitaryRegular]: new PrimaryCareerModel(
            "Preservation (Military Regular)",
            "The soldiers of the Militia are the citizens of the Stronghold who have been chosen to be the first line of defence in the provision of security to the other residents. This life is not for everybody. Duties can range from tunnel patrols to hydroponic garden security duty, which means that volunteers for the role are few.",
            [1,1,2,0,2,1,2,2],
            [Skill.Athletics, Skill.RangedWeapons, Skill.Resistance],
            [Skill.CloseCombat, Skill.Survival, Skill.Willpower],
            [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Resistance],
            [Skill.Athletics, Skill.RangedWeapons, Skill.Resistance],
            [
                "Bulletproof Vest",
                "Medium military shoulder pads",
                "Combat Helmet",
                "Zhivotnoye Infantry Weapon"
            ],
            2),
        [PrimaryCareer.PreservationMilitaryOfficer]: new PrimaryCareerModel(
            "Preservation (Military Officer)",
            "The officers of the militia have been chosen to lead the defence of the Stronghold, which places a large burden of responsibility on their shoulders. The officers are taught the nuances of command, in addition to the diplomatic skills that will be necessary when dealing with the Tsarina’s representatives in matters martial; the convoluted internal politics of the military structure can often be as confusing as the countless bureaucracies that keep Whitestar functioning as a Federation.",
            [1,1,2,0,2,2,1,2],
            [Skill.Command, Skill.RangedWeapons, Skill.Resistance],
            [Skill.Persuade, Skill.Survival, Skill.Willpower],
            [Skill.Command, Skill.Persuade, Skill.RangedWeapons, Skill.Resistance],
            [Skill.Command, Skill.RangedWeapons, Skill.Resistance],
            [
                "Bulletproof Vest",
                "Medium military shoulder pads",
                "Combat Helmet",
                "Iron Hand Autopistol"
            ],
            2),
        [PrimaryCareer.PreservationStreltsyGorodskiye]: new PrimaryCareerModel(
            "Preservation (Streltsy Gorodskiye)",
            "The Gorodskiye is the principal defence force of the capital, Zlogora. All Streltsy begin the same punishing training regime upon their induction, it is only when they are chosen to wear the red or blue plume that their skill sets diversify; the Gorodskiye focus more on tunnel fighting and stubborn defence, whereas the Vyborniye train to defy the many environments they may face.",
            [1,2,2,1,1,0,2,2],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Gunnery, Skill.HeavyWeapons, Skill.Resistance],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Resistance, Skill.Willpower],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [
                "WF-01 Streltsy Armour",
                "Zhivotnoye Infantry Weapon"
            ],
            2),
        [PrimaryCareer.PreservationStreltsyVyborniye]: new PrimaryCareerModel(
            "Preservation (Streltsy Vyborniye)",
            "The Vyborniye of the Streltsy are the exterior presence of the Tsarina’s personal guard. They man the outposts and garrisons that protect the weakest points of the Federation, including those on the far extremes of Whitestar’s planetary reach. Well trained, loyal to their last breath, and often serving as military diplomats, they command respect from the armed forces of all the corporations.",
            [0,2,2,1,1,1,2,2],
            [Skill.RangedWeapons, Skill.Resistance, Skill.Willpower],
            [Skill.Athletics, Skill.CloseCombat, Skill.Survival],
            [Skill.RangedWeapons, Skill.Resistance, Skill.Willpower],
            [Skill.RangedWeapons, Skill.Resistance, Skill.Willpower],
            [
                "WF-01 Streltsy Armour",
                "Zhivotnoye Infantry Weapon"
            ],
            2),
        [PrimaryCareer.PreservationStreltsyGorodskiyeOfficer]: new PrimaryCareerModel(
            "Preservation (Streltsy Gorodskiye Officer)",
            "The Gorodskiye is the principal defence force of the capital, Zlogora. All Streltsy begin the same punishing training regime upon their induction, it is only when they are chosen to wear the red or blue plume that their skill sets diversify; the Gorodskiye focus more on tunnel fighting and stubborn defence, whereas the Vyborniye train to defy the many environments they may face.",
            [],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Command, Skill.Observation, Skill.Persuade],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Resistance, Skill.Willpower],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [
                "WF-01 Streltsy Armour",
                "Zhivotnoye Infantry Weapon"
            ],
            2),
        [PrimaryCareer.PreservationStreltsyVyborniyeOfficer]: new PrimaryCareerModel(
            "Preservation (Streltsy Vyborniye)",
            "The Vyborniye of the Streltsy are the exterior presence of the Tsarina’s personal guard. They man the outposts and garrisons that protect the weakest points of the Federation, including those on the far extremes of Whitestar’s planetary reach. Well trained, loyal to their last breath, and often serving as military diplomats, they command respect from the armed forces of all the corporations.",
            [0,2,2,1,1,1,2,2],
            [Skill.RangedWeapons, Skill.Resistance, Skill.Willpower],
            [Skill.Command, Skill.Insight, Skill.Persuade],
            [Skill.RangedWeapons, Skill.Resistance, Skill.Willpower],
            [Skill.RangedWeapons, Skill.Resistance, Skill.Willpower],
            [
                "WF-01 Streltsy Armour",
                "Zhivotnoye Infantry Weapon"
            ],
            2),
        [PrimaryCareer.StudentMilitary]: new PrimaryCareerModel(
            "Student (Military)",
            "Students being retrained for the Military are often Reservists seeking to become professional soldiers. Their re-education is sufficient to prepare them for a new life in the armed forces, though it pales in comparison to the training received at proper Military Academies.",
            [2,1,2,1,1,0,2,2],
            [Skill.Athletics, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Survival, Skill.Willpower],
            [Skill.RangedWeapons],
            [Skill.Athletics, Skill.RangedWeapons],
            [
                "Military fatigues"
            ],
            1),
        [PrimaryCareer.StudentMedia]: new PrimaryCareerModel(
            "Student (Media)",
            "Students being retrained for the Media are given opportunities to see more of Bauhaus than most ever do. Their training covers primarily the technical side of the media, such as operating cameras, radio equipment, and the craft of journalism. The creative flair to succeed in the media must be provided by the citizen himself.",
            [1,1,1,2,1,2,1,0],
            [Skill.Education, Skill.Observation],
            [Skill.Insight, Skill.Mechanics, Skill.Persuade],
            [Skill.Education],
            [Skill.Education, Skill.Observation],
            [
                "Media kit"
            ],
            1),
        [PrimaryCareer.StudentBusiness]: new PrimaryCareerModel(
            "Student (Business)",
            "Students being retrained for business are taught the fundaments of administration, finance, and people management, allowing them to keep the wheels of the great Bauhaus machine running smoothly.",
            [1,2,1,2,2,2,1,0],
            [Skill.Education, Skill.Lifestyle],
            [Skill.Observation, Skill.Persuade, Skill.Willpower],
            [Skill.Lifestyle],
            [Skill.Education, Skill.Lifestyle],
            [
                "Corporate quality suit"
            ],
            1),
        [PrimaryCareer.StudentTechnical]: new PrimaryCareerModel(
            "Student (Technical)",
            "Technical Students learn practical skills that allow them to work in one of the many factories, workshops, or other technical industries that Bauhaus is famous for. Most commoners retrained for technical work end up as technicians or factory workers, as the more prestigious technical roles require many years of specialised training and experience.",
            [2,2,1,2,0,1,2,1],
            [Skill.Mechanics, Skill.Pilot],
            [Skill.Observation, Skill.Resistance, Skill.Science],
            [Skill.Mechanics],
            [Skill.Mechanics, Skill.Pilot],
            [
                "Basic tool kit"
            ],
            1),
        [PrimaryCareer.Pilgrim]: new PrimaryCareerModel(
            "Pilgrim",
            "It is commonplace for nobles and wealthy commoners, as well as many of those who have lost their job for whatever reason, to take a two-year leave of absence from their work to become a Pilgrim. They wander across the solar system seeing the sights and attending ceremonies at each of the Brotherhood’s Cathedrals. Pilgrimages are a fine way to demonstrate faith and devotion, and most parts of the corporation find a former Pilgrim to be a laudable employee. Some Orders only accept those who have undertaken Pilgrimage, regarding such an outward demonstration of faith to be essential for their membership.",
            [1,2,0,1,3,2,1,1],
            [Skill.Survival, Skill.Willpower],
            [Skill.Observation, Skill.Persuade, Skill.Resistance],
            [Skill.Willpower],
            [Skill.Survival, Skill.Willpower],
            [
                "Symbol of the Brotherhood",
                "Abridged copy of the Book of Law"
            ],
            0),
        [PrimaryCareer.TechnicalFreightDriver]: new PrimaryCareerModel(
            "Technical (Freight Driver)",
            "All across Venus, and across Bauhauser territories on Mars, there are massive freight convoys, moving raw materials and completed machinery from warehouse to warehouse. Other drivers operate the orbitals and shuttles that carry freight from surface to ship and back again. Their work is not glamourous, and hauling freight commonly requires long weeks or months away from home, but such individuals are lauded for their self-reliance and dedication.",
            [1,1,2,1,2,0,1,2],
            [Skill.Mechanics, Skill.Pilot, Skill.Survival],
            [Skill.Athletics, Skill.Observation, Skill.Space],
            [Skill.Mechanics, Skill.Observation, Skill.Pilot, Skill.Survival],
            [Skill.Mechanics, Skill.Pilot, Skill.Survival],
            [
                "Basic tool kit",
                "Truck",
                EquipmentHelper.getSurvivalKits()
            ],
            2),
        [PrimaryCareer.TechnicalFactoryWorkerBauhaus]: new PrimaryCareerModel(
            "Technical (Factory Worker)",
            "The common image of the Bauhauser commoner to outsiders is the mutely obedient factory worker, slaving away in an austere factory. The truth isn’t too far from this, but factory efficiency comes mostly from well-trained and highly-motivated workers, rather than treating people like machines, and the factories have complex hierarchies of machinists, order stewards, and supervisors.",
            [1,2,1,2,0,1,2,2],
            [Skill.Education, Skill.Lifestyle, Skill.Mechanics],
            [Skill.Observation, Skill.Persuade, Skill.Pilot],
            [Skill.Education, Skill.Lifestyle, Skill.Mechanics, Skill.Observation],
            [Skill.Education, Skill.Lifestyle, Skill.Mechanics],
            [
                "Basic tool kit",
                "Hard-wearing work uniform"
            ],
            1),
        [PrimaryCareer.TechnicalFieldMechanic]: new PrimaryCareerModel(
            "Technical (Field Mechanic)",
            "Rural communities, such as farms, logging camps, and frontier outposts, often make use of heavy-duty machinery. While anyone working with such equipment must have some understanding of repairs and maintenance, things aren’t always simple to fix. Consequently, many Homebuilder companies employ roving Field Mechanics to travel out to the wilderness and fix things. These frontiersmen-engineers are extremely valued employees, and they frequently work alone in the most gruelling conditions.",
            [1,2,1,2,2,0,2,1],
            [Skill.Mechanics, Skill.Resistance, Skill.Survival],
            [Skill.Athletics, Skill.Pilot, Skill.Willpower],
            [Skill.Athletics, Skill.Mechanics, Skill.Resistance, Skill.Survival],
            [Skill.Mechanics, Skill.Resistance, Skill.Survival],
            [
                EquipmentHelper.getColonialSurvivalKits(),
                "Cell phone",
                "Advanced repair kit"
            ],
            2),
        [PrimaryCareer.TechnicalPrecisionEngineer]: new PrimaryCareerModel(
            "Technical (Precision Engineer)",
            "The Homebuilders’ reputation for high-quality goods comes down to the skill of their precision engineers. Ensuring that products are designed and manufactured with tolerances down to a few micrometres, their diligence and talent allow Bauhaus to dominate the upper end of the market in a variety of fields.",
            [1,2,2,2,1,1,1,0],
            [Skill.Education, Skill.Mechanics, Skill.Observation],
            [Skill.Insight, Skill.Science, Skill.Willpower],
            [Skill.Education, Skill.Mechanics, Skill.Observation, Skill.Science],
            [Skill.Education, Skill.Mechanics, Skill.Observation],
            [
                "Advanced repair kit",
                "Workshop"
            ],
            3),
        [PrimaryCareer.TechnicalDesigner]: new PrimaryCareerModel(
            "Technical (Designer)",
            "Designing products is a different matter to making them. Teams of designers – design engineers, draftsmen, conceptual consultants, prototype machinists, etc. — create, develop, test, and refine new product concepts over months or years, until they have a final schematic that can be passed on to factories for mass-production.",
            [1,2,2,1,1,2,1,0],
            [Skill.Education, Skill.Mechanics, Skill.Science],
            [Skill.Observation, Skill.Persuade, Skill.Willpower],
            [Skill.Education, Skill.Mechanics, Skill.Persuade, Skill.Science],
            [Skill.Education, Skill.Mechanics, Skill.Science],
            [
                "Media kit",
                "Workshop"
            ],
            3),
        [PrimaryCareer.RuralDrover]: new PrimaryCareerModel(
            "Rural (Drover)",
            "These individuals are specialists in raising large herds of animals and driving them across the land, from pasture to pasture, from market to market, and so forth. Drovers – also known as Viehtreiber on some parts of Venus – tend to ride along with their herds on horse – or raptor-back, or using an ATV. They’re skilled in dealing with panicky or recalcitrant animals, even in large numbers, but they’re also talented salesmen, dealing with auctioneers at massive regional herd-markets.",
            [1,1,2,0,1,2,2,2],
            [Skill.AnimalHandling, Skill.Lifestyle, Skill.Pilot],
            [Skill.Athletics, Skill.Resistance, Skill.Survival],
            [Skill.AnimalHandling, Skill.Lifestyle, Skill.Pilot, Skill.Survival],
            [Skill.AnimalHandling, Skill.Lifestyle, Skill.Pilot],
            [
                "Riding animal|Sabretooth half-track",
                EquipmentHelper.getSurvivalKits(),
                "Handler's kit"
            ],
            1),
        [PrimaryCareer.RuralScout]: new PrimaryCareerModel(
            "Rural (Scout)",
            "Scouts exist on the frontiers, pushing out into the unknown in order to make it known. Whether exploring new or unexploited territories, or moving into hostile regions to determine the threats, scouts are a vital part of both civilian and military expansion. All scouts are comfortable moving through rough terrain on foot, but some also favour use of a riding beast for long-range scouting as well. Vehicles are less favoured, as they require too much fuel and maintenance to be convenient. Almost all scouts carry a firearm for personal defence, often a sturdy rifle.",
            [2,2,1,1,1,0,2,2],
            [Skill.Athletics, Skill.Observation, Skill.Survival],
            [Skill.AnimalHandling, Skill.RangedWeapons, Skill.Stealth],
            [Skill.Athletics, Skill.Observation, Skill.Stealth, Skill.Survival],
            [Skill.Athletics, Skill.Observation, Skill.Survival],
            [
                "SG-35 Rifle",
                EquipmentHelper.getColonialSurvivalKits(),
                "Binoculars"
            ],
            2),
        [PrimaryCareer.RuralLumberman]: new PrimaryCareerModel(
            "Rural (Lumberman)",
            "Massive, burly woodsmen are a common sight in rural parts of Venus. Logging camps are commonly established in frontier regions, to help clear the land long before it can be turned over to another use. The Venusian forests and jungles are dense enough to require logging on an industrial scale, and hardy lumbermen – or Holzfäller, in some older Bauhauser dialects – are needed to cut down the trees, haul them away, and prepare the wood for transport back to the mills.",
            [1,1,2,1,1,0,2,3],
            [Skill.Athletics, Skill.Mechanics, Skill.Survival],
            [Skill.CloseCombat, Skill.Pilot, Skill.Resistance],
            [Skill.Athletics, Skill.CloseCombat, Skill.Mechanics, Skill.Survival],
            [Skill.Athletics, Skill.Mechanics, Skill.Survival],
            [
                "Woodsman's Axe",
                "Survival kit (jungle)|Survival kit (forest)"
            ],
            1),
        [PrimaryCareer.MilitaryHussarRegular]: new PrimaryCareerModel(
            "Military (Hussar)",
            "The common line infantry of the Bauhauser military are the Hussars. They’re well-equipped by corporate infantry standards, but Homebuilder military doctrine uses Hussars as a second line after the armour has shattered the enemy.",
            [1,1,2,0,2,1,2,2],
            [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons],
            [Skill.Acrobatics, Skill.Survival, Skill.Willpower],
            [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Survival],
            [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons],
            [
                "Hussar Mk. IV Armour",
                "Panzerknacker Assault Rifle"
            ],
            1),
        [PrimaryCareer.MilitaryHussarOfficer]: new PrimaryCareerModel(
            "Military (Hussar)",
            "The common line infantry of the Bauhauser military are the Hussars. They’re well-equipped by corporate infantry standards, but Homebuilder military doctrine uses Hussars as a second line after the armour has shattered the enemy.",
            [1, 1, 2, 0, 2, 1, 2, 2],
            [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons],
            [Skill.Command, Skill.Persuade, Skill.Survival],
            [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Survival],
            [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons],
            [
                "Hussar Mk. IV Armour",
                "Panzerknacker Assault Rifle"
            ],
            1),
        [PrimaryCareer.MilitaryGuardOrderRegular]: new PrimaryCareerModel(
            "Military (Guard Order)",
            "Separate from the regular armed forces, the Orders of Guards are the private militaries of each noble house, dating back to less certain times. These forces are similar to the Hussars, though equipped according to the means of their house, and to join a Guard Order is regarded as a prestigious posting, though rumours persist of the Guard Orders being used in a range of clandestine operations.",
            [1,1,2,0,2,2,1,2],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [Skill.Acrobatics, Skill.Stealth, Skill.Willpower],
            [Skill.CloseCombat, Skill.Persuade, Skill.Stealth, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [
                "Hussar Mk. V Armour",
                "Panzerknacker Assault Rifle",
                "Sword",
            ],
            2),
        [PrimaryCareer.MilitaryGuardOrderOfficer]: new PrimaryCareerModel(
            "Military (Guard Order)",
            "Separate from the regular armed forces, the Orders of Guards are the private militaries of each noble house, dating back to less certain times. These forces are similar to the Hussars, though equipped according to the means of their house, and to join a Guard Order is regarded as a prestigious posting, though rumours persist of the Guard Orders being used in a range of clandestine operations.",
            [1, 1, 2, 0, 2, 2, 1, 2],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [Skill.Acrobatics, Skill.Command, Skill.Stealth],
            [Skill.CloseCombat, Skill.Persuade, Skill.Stealth, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [
                "Hussar Mk. V Armour",
                "Panzerknacker Assault Rifle",
                "Sword",
            ],
            2),
        [PrimaryCareer.MilitaryArtilleryKorpsRegular]: new PrimaryCareerModel(
            "Military (Artillery Korps)",
            "The Bauhaus Artillery Korps (BAK) are responsible for the operation and maintenance of all Bauhauser field artillery. Mounted on heavyduty carriages and drawn by a variety of trucks and tracked vehicles (and sometimes horses or draught-raptors), these artillery pieces provide Bauhauser forces with considerable long-range firepower. The engineers responsible for these pieces are not only skilled soldiers, but also talented mechanics and technicians, owing to the complexity of the machines.",
            [0,2,2,2,1,1,1,2],
            [Skill.Gunnery, Skill.Mechanics, Skill.RangedWeapons],
            [Skill.Athletics, Skill.Pilot, Skill.Observation],
            [Skill.Gunnery, Skill.Mechanics, Skill.Observation, Skill.RangedWeapons],
            [Skill.Gunnery, Skill.Mechanics, Skill.RangedWeapons],
            [
                "Hussar Mk. IV Armour",
                "MP-105 Machine Pistol"
            ],
            1),
        [PrimaryCareer.MilitaryArtilleryKorpsOfficer]: new PrimaryCareerModel(
            "Military (Artillery Korps)",
            "The Bauhaus Artillery Korps (BAK) are responsible for the operation and maintenance of all Bauhauser field artillery. Mounted on heavyduty carriages and drawn by a variety of trucks and tracked vehicles (and sometimes horses or draught-raptors), these artillery pieces provide Bauhauser forces with considerable long-range firepower. The engineers responsible for these pieces are not only skilled soldiers, but also talented mechanics and technicians, owing to the complexity of the machines.",
            [0, 2, 2, 2, 1, 1, 1, 2],
            [Skill.Gunnery, Skill.Mechanics, Skill.RangedWeapons],
            [Skill.Command, Skill.Observation, Skill.Persuade],
            [Skill.Gunnery, Skill.Mechanics, Skill.Observation, Skill.RangedWeapons],
            [Skill.Gunnery, Skill.Mechanics, Skill.RangedWeapons],
            [
                "Hussar Mk. IV Armour",
                "MP-105 Machine Pistol"
            ],
            1),
        [PrimaryCareer.MilitaryDragoonRegular]: new PrimaryCareerModel(
            "Military (Dragoon)",
            "The mighty Dragoons, the glorious iron fist of the Homebuilders, are celebrated by Bauhausers everywhere. Driving into battle in great fume-belching war machines, Dragoons rely on their armoured steeds for offence and defence in the heat of battle. These lauded warriors revel in their celebrity, though seldom so much that they dishonour themselves.",
            [0,2,3,2,1,1,1,1],
            [Skill.HeavyWeapons, Skill.Pilot, Skill.RangedWeapons],
            [Skill.Gunnery, Skill.Mechanics, Skill.Persuade],
            [Skill.HeavyWeapons, Skill.Persuade, Skill.Pilot, Skill.RangedWeapons],
            [Skill.HeavyWeapons, Skill.Pilot, Skill.RangedWeapons],
            [
                "Bulletproof Vest",
                "Light military shoulder pads",
                "MP-105 Machine Pistol"
            ],
            2),
        [PrimaryCareer.MilitaryDragoonOfficer]: new PrimaryCareerModel(
            "Military (Dragoon)",
            "The mighty Dragoons, the glorious iron fist of the Homebuilders, are celebrated by Bauhausers everywhere. Driving into battle in great fume-belching war machines, Dragoons rely on their armoured steeds for offence and defence in the heat of battle. These lauded warriors revel in their celebrity, though seldom so much that they dishonour themselves.",
            [0, 2, 3, 2, 1, 1, 1, 1],
            [Skill.HeavyWeapons, Skill.Pilot, Skill.RangedWeapons],
            [Skill.Command, Skill.Persuade, Skill.Willpower],
            [Skill.HeavyWeapons, Skill.Persuade, Skill.Pilot, Skill.RangedWeapons],
            [Skill.HeavyWeapons, Skill.Pilot, Skill.RangedWeapons],
            [
                "Bulletproof Vest",
                "Light military shoulder pads",
                "MP-105 Machine Pistol"
            ],
            2),

        [PrimaryCareer.OrderOfTheWolfRegular]: new PrimaryCareerModel(
            "Military (Order of the Wolf)",
            "The Order of the Wolf is the House Guard of the Elector Duke Romanov. It is renowned as the finest body of warriors on Venus, as would be expected from those who serve the head of the Supreme Ministry of War. Its black uniforms and silver wolf cresthelms are famed throughout the Solar System. The Order is unusual in providing their very own tank division, which is often seen at the vanguard of major Bauhaus military offensives. The Order of the Wolf has a strict code of discipline and etiquette. Its members are famous for being loyal, honest, principled, and quick to fight duels in defence of their honour.",
            [1, 1, 2, 0, 2, 2, 1, 2],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [Skill.Acrobatics, Skill.Pilot, Skill.Willpower],
            [Skill.CloseCombat, Skill.Persuade, Skill.Pilot, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [
                "Hussar Mk. V Armour",
                "Panzerknacker Assault Rifle",
                "Sword",
            ],
            2),
        [PrimaryCareer.OrderOfTheWolfOfficer]: new PrimaryCareerModel(
            "Military (Order of the Wolf)",
            "The Order of the Wolf is the House Guard of the Elector Duke Romanov. It is renowned as the finest body of warriors on Venus, as would be expected from those who serve the head of the Supreme Ministry of War. Its black uniforms and silver wolf cresthelms are famed throughout the Solar System. The Order is unusual in providing their very own tank division, which is often seen at the vanguard of major Bauhaus military offensives. The Order of the Wolf has a strict code of discipline and etiquette. Its members are famous for being loyal, honest, principled, and quick to fight duels in defence of their honour.",
            [1, 1, 2, 0, 2, 2, 1, 2],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [Skill.Acrobatics, Skill.Command, Skill.Pilot],
            [Skill.CloseCombat, Skill.Persuade, Skill.Pilot, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [
                "Hussar Mk. V Armour",
                "Panzerknacker Assault Rifle",
                "Sword",
            ],
            2),
        [PrimaryCareer.OrderOfTheCondorRegular]: new PrimaryCareerModel(
            "Military (Order of the Condor)",
            "The Order of the Condor is famed for their ruthlessness, savagery, and pride. Others often refer to them as the Vultures, but not within earshot of an active member. They are affiliated with House Saglielli and their reputation for brutality runs counter to the popular conception that Bauhaus forces fight according to a code of honour protecting prisoners and affording mercy to its enemies. The Order of the Condor mostly fights against forces of the Dark Legion, and perhaps this is the reason for their bloody-handed ruthlessness. Members of the order are also known to work undercover, rooting out heretics and other malefactors.",
            [1, 1, 2, 0, 2, 2, 1, 2],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [Skill.Mysticism, Skill.Stealth, Skill.Willpower],
            [Skill.CloseCombat, Skill.Persuade, Skill.Stealth, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [
                "Hussar Mk. V Armour",
                "Panzerknacker Assault Rifle",
                "Sword",
            ],
            2),
        [PrimaryCareer.OrderOfTheCondorOfficer]: new PrimaryCareerModel(
            "Military (Order of the Condor)",
            "The Order of the Condor is famed for their ruthlessness, savagery, and pride. Others often refer to them as the Vultures, but not within earshot of an active member. They are affiliated with House Saglielli and their reputation for brutality runs counter to the popular conception that Bauhaus forces fight according to a code of honour protecting prisoners and affording mercy to its enemies. The Order of the Condor mostly fights against forces of the Dark Legion, and perhaps this is the reason for their bloody-handed ruthlessness. Members of the order are also known to work undercover, rooting out heretics and other malefactors.",
            [1, 1, 2, 0, 2, 2, 1, 2],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [Skill.Mysticism, Skill.Command, Skill.Stealth],
            [Skill.CloseCombat, Skill.Persuade, Skill.Stealth, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [
                "Hussar Mk. V Armour",
                "Panzerknacker Assault Rifle",
                "Sword",
            ],
            2),
        [PrimaryCareer.OrderOfTheDragonRegular]: new PrimaryCareerModel(
            "Military (Order of the Dragon)",
            "The Order of the Dragon is affiliated with the Great House of Richthausen and is noted for its honour, precision, and deadliness. In many ways it is an exemplary order, and its members follow the Articles of Battle to the letter. They treat their prisoners with every courtesy and are expected to behave with honour at all times. They have a considerable rivalry with the Order of the Wolf, and members of the two orders are known to brawl or even duel when off duty.",
            [1, 1, 2, 0, 2, 2, 1, 2],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [Skill.Acrobatics, Skill.Pilot, Skill.Willpower],
            [Skill.CloseCombat, Skill.Persuade, Skill.Pilot, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [
                "Hussar Mk. V Armour",
                "Panzerknacker Assault Rifle",
                "Sword",
            ],
            2),
        [PrimaryCareer.OrderOfTheDragonOfficer]: new PrimaryCareerModel(
            "Military (Order of the Dragon)",
            "The Order of the Dragon is affiliated with the Great House of Richthausen and is noted for its honour, precision, and deadliness. In many ways it is an exemplary order, and its members follow the Articles of Battle to the letter. They treat their prisoners with every courtesy and are expected to behave with honour at all times. They have a considerable rivalry with the Order of the Wolf, and members of the two orders are known to brawl or even duel when off duty.",
            [1, 1, 2, 0, 2, 2, 1, 2],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [Skill.Acrobatics, Skill.Command, Skill.Pilot],
            [Skill.CloseCombat, Skill.Persuade, Skill.Pilot, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [
                "Hussar Mk. V Armour",
                "Panzerknacker Assault Rifle",
                "Sword",
            ],
            2),
        [PrimaryCareer.OrderOfTheBearRegular]: new PrimaryCareerModel(
            "Military (Order of the Bear)",
            "Also known informally as the Grizzlies, the Order of the Bear are the elite troops of House Bernheim. They are all huge men and women, chosen for their size and strength and their prowess in close combat. This also enables them to use the heaviest of heavy weapons, such as the Atlas Megacannon and the Nimrod Autocannon. They have a reputation for being short-tempered, often getting drunk and brawling when off duty. However, their battlefield prowess is doubted by no one.",
            [1, 1, 2, 0, 2, 1, 1, 3],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [Skill.Acrobatics, Skill.HeavyWeapons, Skill.Willpower],
            [Skill.CloseCombat, Skill.Persuade, Skill.HeavyWeapons, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [
                "Hussar Mk. V Armour",
                "Panzerknacker Assault Rifle",
                "Sword",
            ],
            2),
        [PrimaryCareer.OrderOfTheBearOfficer]: new PrimaryCareerModel(
            "Military (Order of the Bear)",
            "Also known informally as the Grizzlies, the Order of the Bear are the elite troops of House Bernheim. They are all huge men and women, chosen for their size and strength and their prowess in close combat. This also enables them to use the heaviest of heavy weapons, such as the Atlas Megacannon and the Nimrod Autocannon. They have a reputation for being short-tempered, often getting drunk and brawling when off duty. However, their battlefield prowess is doubted by no one.",
            [1, 1, 2, 0, 2, 1, 1, 3],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [Skill.Acrobatics, Skill.Command, Skill.HeavyWeapons],
            [Skill.CloseCombat, Skill.Persuade, Skill.HeavyWeapons, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [
                "Hussar Mk. V Armour",
                "Panzerknacker Assault Rifle",
                "Sword",
            ],
            2),
        [PrimaryCareer.OrderOfTheGriffinRegular]: new PrimaryCareerModel(
            "Military (Order of the Griffin)",
            "This order specialises in airborne assaults. It is basically an air cavalry unit with its own small air force, paid for by House Giraud. Its troops are often called upon by the High Command to airdrop into enemy areas during states of emergency. Its members have a reputation for daring and bravery second to none.",
            [2, 1, 2, 0, 2, 2, 1, 1],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [Skill.Acrobatics, Skill.Pilot, Skill.Willpower],
            [Skill.CloseCombat, Skill.Persuade, Skill.Pilot, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [
                "Hussar Mk. V Armour",
                "Panzerknacker Assault Rifle",
                "Sword",
            ],
            2),
        [PrimaryCareer.OrderOfTheGriffinOfficer]: new PrimaryCareerModel(
            "Military (Order of the Griffin)",
            "This order specialises in airborne assaults. It is basically an air cavalry unit with its own small air force, paid for by House Giraud. Its troops are often called upon by the High Command to airdrop into enemy areas during states of emergency. Its members have a reputation for daring and bravery second to none.",
            [2, 1, 2, 0, 2, 2, 1, 1],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [Skill.Acrobatics, Skill.Command, Skill.Pilot],
            [Skill.CloseCombat, Skill.Persuade, Skill.Pilot, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [
                "Hussar Mk. V Armour",
                "Panzerknacker Assault Rifle",
                "Sword",
            ],
            2),
        [PrimaryCareer.OrderOfTheUnicornRegular]: new PrimaryCareerModel(
            "Military (Order of the Unicorn)",
            "This is the famed Guard unit of Fieldhausen. It specialises in armoured warfare, but its members are trained heavily in hand-to-hand fighting as well.",
            [1, 1, 2, 0, 2, 2, 1, 2],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [Skill.Acrobatics, Skill.Pilot, Skill.Willpower],
            [Skill.CloseCombat, Skill.Persuade, Skill.Pilot, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [
                "Hussar Mk. V Armour",
                "Panzerknacker Assault Rifle",
                "Sword",
            ],
            2),
        [PrimaryCareer.OrderOfTheUnicornOfficer]: new PrimaryCareerModel(
            "Military (Order of the Unicorn)",
            "This is the famed Guard unit of Fieldhausen. It specialises in armoured warfare, but its members are trained heavily in hand-to-hand fighting as well.",
            [1, 1, 2, 0, 2, 2, 1, 2],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [Skill.Acrobatics, Skill.Command, Skill.Pilot],
            [Skill.CloseCombat, Skill.Persuade, Skill.Pilot, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [
                "Hussar Mk. V Armour",
                "Panzerknacker Assault Rifle",
                "Sword",
            ],
            2),
        [PrimaryCareer.OrderOfTheSpiderRegular]: new PrimaryCareerModel(
            "Military (Order of the Spider)",
            "This sinister and feared order is often called upon to lead assaults into the warzones surrounding Citadels. Its members are often eccentric to the point of insanity, having been subjected to strange experimental processes by their masters in House Salvatore. Because of their reputation for insane cruelty and bravery, they tend to be shunned by members of the other orders.",
            [1, 1, 2, 0, 2, 2, 2, 1],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [Skill.Resistance, Skill.Stealth, Skill.Willpower],
            [Skill.CloseCombat, Skill.Persuade, Skill.Stealth, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [
                "Hussar Mk. V Armour",
                "Panzerknacker Assault Rifle",
                "Sword",
            ],
            2),
        [PrimaryCareer.OrderOfTheSpiderOfficer]: new PrimaryCareerModel(
            "Military (Order of the Spider)",
            "This sinister and feared order is often called upon to lead assaults into the warzones surrounding Citadels. Its members are often eccentric to the point of insanity, having been subjected to strange experimental processes by their masters in House Salvatore. Because of their reputation for insane cruelty and bravery, they tend to be shunned by members of the other orders.",
            [1, 1, 2, 0, 2, 2, 2, 1],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [Skill.Resistance, Skill.Command, Skill.Stealth],
            [Skill.CloseCombat, Skill.Persuade, Skill.Stealth, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Persuade, Skill.RangedWeapons],
            [
                "Hussar Mk. V Armour",
                "Panzerknacker Assault Rifle",
                "Sword",
            ],
            2),
        [PrimaryCareer.Salaryman]: new PrimaryCareerModel(
            "Corporate Worker (Salaryman)",
            "Commoner characters who enter the Corporate Worker Primary Career become salarymen, slaving away in a small office cubicle.",
            [1,2,2,1,2,2,1,0],
            [Skill.Lifestyle, Skill.Observation, Skill.Stealth],
            [Skill.Education, Skill.Persuade, Skill.Willpower],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Persuade],
            [Skill.Lifestyle, Skill.Observation, Skill.Stealth],
            [
                "One corporate quality suit|Basic urban survival kit"
            ],
            1),
        [PrimaryCareer.JuniorManager]: new PrimaryCareerModel(
            "Corporate Worker (Junior Manager)",
            "Samurai characters who enter the Corporate Worker Primary Career become junior managers, overseeing the activities of a small work unit.",
            [0,2,1,2,2,2,1,1],
            [Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [Skill.CloseCombat, Skill.Command, Skill.Willpower],
            [Skill.Command, Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [
                "One good quality suit",
                "Shinken"
            ],
            3),
        [PrimaryCareer.Bushi]: new PrimaryCareerModel(
            "Military (Bushi)",
            "Samurai characters who enter the Military Primary Career become Bushi, continuing their studies in the arts of warfare until they are deemed ready to step into battle. They cannot entirely neglect the arts and the study of business, for such things are as much a part of the samurai tradition as mastery of the sword, but their focus is primarily upon skill-at-arms.",
            [2,0,1,1,2,2,1,2],
            [Skill.CloseCombat, Skill.Education, Skill.Willpower],
            [Skill.Acrobatics, Skill.Lifestyle, Skill.Observation],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Education, Skill.Observation],
            [Skill.CloseCombat, Skill.Education, Skill.Willpower],
            [
                "Ballistic nylon suit",
                "Medium military shoulder pads",
                "Shinken"
            ],
            4),
        [PrimaryCareer.Ashigaru]: new PrimaryCareerModel(
            "Military (Ashigaru)",
            "Commoner characters who enter the Military Primary Career become ashigaru, serving as foot soldiers in the armies of their liege lord. The new class of commoner warriors live to prove themselves in battle. By showing exceptional valour in the service of their companies, a select few just might be elevated to the ranks of the samurai. Many more die before that can happen, as they are considered highly expendable by their commanders.",
            [1,2,2,1,1,0,2,2],
            [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons],
            [Skill.Acrobatics, Skill.Resistance, Skill.Survival],
            [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Survival],
            [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons],
            [
                "Ashigaru Pads",
                "Yari Shogun Assault Rifle",
            ],
            2),
        [PrimaryCareer.Magistrate]: new PrimaryCareerModel(
            "Police (Magistrate)",
            "Samurai characters who enter the Police Primary Career become Magistrates, enforcing their lord’s will upon the people of his territory.",
            [2,2,1,0,2,2,1,1],
            [Skill.Athletics, Skill.Observation, Skill.Persuade],
            [Skill.Command, Skill.CloseCombat, Skill.RangedWeapons],
            [Skill.Athletics, Skill.Observation, Skill.Persuade, Skill.RangedWeapons],
            [Skill.Athletics, Skill.Observation, Skill.Persuade],
            [
                "Ballistic nylon suit",
                "Heavy civilian shoulder pads",
                "Wakizashi"
            ],
            2),
        [PrimaryCareer.Watchman]: new PrimaryCareerModel(
            "Police (Watchman)",
            "Commoner characters who enter the Police Primary Career become Watchmen, helping maintain the peace in their communities.",
            [2,2,1,0,3,1,1,1],
            [Skill.Athletics, Skill.Observation, Skill.Persuade],
            [Skill.CloseCombat, Skill.Stealth, Skill.Treatment],
            [Skill.Athletics, Skill.CloseCombat, Skill.Observation, Skill.Persuade],
            [Skill.Athletics, Skill.Observation, Skill.Persuade],
            [
                "Symbol of status",
                "Baton"
            ],
            2),
        [PrimaryCareer.Sacristan]: new PrimaryCareerModel(
            "Sacristan",
            "Sacristans perform simple tasks, such as cooking, cleaning, and standing as temple guards. They are also ardent students of lore, and do everything in their power to increase their knowledge. Though not treated badly, their tasks are tedious and monotonous.",
            [1,2,1,2,1,0,2,2],
            [Skill.Education, Skill.Observation, Skill.Willpower],
            [Skill.Athletics, Skill.CloseCombat, Skill.Mysticism],
            [Skill.Athletics, Skill.Education, Skill.Observation, Skill.Willpower],
            [Skill.Education, Skill.Observation, Skill.Willpower],
            [
                "Knife",
                "Dark robes",
                "Book of Heretical Lore"
            ],
            1),
        [PrimaryCareer.Disciple]: new PrimaryCareerModel(
            "Disciple",
            "Brothers who find themselves without fitting duties, or who seek to change their place within the Brotherhood, tend to go into a period of study and contemplation. These individuals, who sit outside the structure of the Directorates, are collectively referred to as Disciples.",
            [0,2,1,2,2,2,1,1],
            [Skill.Education],
            [...SkillsHelper.getSkills()],
            [Skill.Education],
            [...SkillsHelper.getSkills()],
            [
                "Robes"
            ],
            0),
        [PrimaryCareer.Scribe]: new PrimaryCareerModel(
            "Scribe",
            "These men and women spend their days transcribing by hand all the documents the Brotherhood requires of them. Around half of the workload at any given time will be the production of copies of the Book of Law, whether full copies to be given to new Brothers or the abridged copies distributed to the public. The rest of their work is the production and transcription of sanctified literature – propaganda pieces, press releases, and similar works – to be distributed both within and beyond the Brotherhood.",
            [1,2,1,3,2,2,0,0],
            [Skill.Education, Skill.Linguistics, Skill.Observation],
            [Skill.Insight, Skill.Mysticism, Skill.Willpower],
            [Skill.Education, Skill.Insight, Skill.Linguistics, Skill.Mysticism],
            [Skill.Education, Skill.Linguistics, Skill.Observation],
            [
                "Robes",
                "Media kit"
            ],
            0),
        [PrimaryCareer.Server]: new PrimaryCareerModel(
            "Server",
            "Perhaps the least glamorous of the Orders within the Cell of the Mission, the Order of Servers mirrors the corporate service industry. It includes catering, messaging services, maintenance and cleaning, and any form of unskilled or semi-skilled labour necessary in ensuring that such a monolithic organisation keeps functioning. Its members, by and large, consist of those with few other valuable skills – people who wish to serve the Brotherhood but whose aptitudes do not fit any other, higher-priority roles. Though there are a number of skilled roles within the Order – food services and maintenance roles require technical knowledge that most Servers roles do not – they are a relative minority compared to the humble souls carrying missives, hauling loads, and mopping floors within Brotherhood facilities.",
            [2,1,2,1,1,0,2,2],
            [Skill.Athletics, Skill.Mechanics, Skill.Resistance],
            [Skill.Pilot, Skill.Stealth, Skill.Willpower],
            [Skill.Athletics, Skill.Mechanics, Skill.Resistance, Skill.Willpower],
            [Skill.Athletics, Skill.Mechanics, Skill.Resistance],
            [
                "Sturdy work uniform",
                "Repair kit"
            ],
            0),
        [PrimaryCareer.SecretaryBH]: new PrimaryCareerModel(
            "Secretary",
            "The majority of the Cell of Diplomats' personnel are Secretaries. They handle most of the routine diplomatic tasks – low-level and preliminary discussions, correspondence with other offices, etc – and serve as assistants and administrative staff for their senior colleagues. They have relatively few major responsibilities, and are often inexperienced Brothers studying the craft of diplomacy.",
            [1,2,1,3,2,2,0,0],
            [Skill.Education, Skill.Linguistics, Skill.Persuade],
            [Skill.Education, Skill.Insight, Skill.Persuade],
            [Skill.Education, Skill.Insight, Skill.Linguistics, Skill.Persuade],
            [Skill.Education, Skill.Linguistics, Skill.Persuade],
            [
                "Robes",
                "Personal library (Education)|Personal library (Linguistics)"
            ],
            0),
        [PrimaryCareer.PilgrimMachinist]: new PrimaryCareerModel(
            "Pilgrim Machinist",
            "Pilgrim Machinists support the works of the Engineers in the development and construction of their miraculous creations.",
            [2,2,1,2,2,0,1,1],
            [Skill.Education, Skill.Mechanics, Skill.Willpower],
            [Skill.Observation, Skill.Science, Skill.Mysticism],
            [Skill.Education, Skill.Mechanics, Skill.Mysticism, Skill.Willpower],
            [Skill.Education, Skill.Mechanics, Skill.Willpower],
            [
                "Advanced repair kit"
            ],
            0),
        [PrimaryCareer.Craftsman]: new PrimaryCareerModel(
            "Craftsman",
            "Craftsmen manufacture ammunition, and perform standard maintenance and repairs.",
            [1,2,2,2,0,1,1,2],
            [Skill.Insight, Skill.Mechanics, Skill.Willpower],
            [Skill.Lifestyle, Skill.Observation, Skill.Resistance],
            [Skill.Insight, Skill.Lifestyle, Skill.Mechanics, Skill.Willpower],
            [Skill.Insight, Skill.Mechanics, Skill.Willpower],
            [
                "Work overalls",
                "Basic tool kit"
            ],
            0),
        [PrimaryCareer.PilgrimProtector]: new PrimaryCareerModel(
            "Pilgrim Protector",
            "Soldiers from the Second Directorate who are subjected to rigorous physical, mental, and spiritual tests. These hardened individuals escort Mystics into dangerous or unknown territory, serving as scouts and bodyguards for their blessed brethren. They are perpetually vigilant, allowing them to react swiftly to threats against the well-being of their charges.",
            [2,1,2,1,2,0,2,1],
            [Skill.RangedWeapons, Skill.Stealth, Skill.Willpower],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Stealth, Skill.Willpower],
            [Skill.RangedWeapons, Skill.Stealth, Skill.Willpower],
            [
                "Armoured Vestment",
                "Combat Helmet",
                "Medium military shoulder pads",
                "Volcano Assault Rifle"
            ],
            0),
        [PrimaryCareer.BrotherhoodTrooper]: new PrimaryCareerModel(
            "Brotherhood Trooper",
            "Brotherhood Troopers are recruited from all walks of life, both within and without the Brotherhood. In theory, almost any person within the Brotherhood who does not have some other militarily-valuable role can be called to fight as a Trooper, but a dedicated core of professional full-time soldiers exists within the Second Directorate that will be called upon in preference to militia reserves from other Directorates.",
            [1,1,2,1,2,0,1,1],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Acrobatics, Skill.Athletics, Skill.Survival],
            [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Willpower],
            [
                "Believer Armour",
                "Volcano Assault Rifle"
            ],
            0),
        [PrimaryCareer.Paladin]: new PrimaryCareerModel(
            "Paladin",
            "Commissioned more than a millennium ago, in the aftermath of the First Dark Legion War, the Paladins were established to serve as the Brotherhood’s military police. Charged with the enforcement of the Cardinal’s Will within cities, as well as serving as security forces within cathedrals and other Brotherhood facilities, the Paladins can be recognised by their cobalt robes and armour, and the symbolic skull that adorns their shoulder pads.",
            [2,2,2,0,2,1,1,1],
            [Skill.Athletics, Skill.Observation, Skill.Persuade],
            [Skill.Insight, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Athletics, Skill.Insight, Skill.Persuade, Skill.RangedWeapons],
            [Skill.Athletics, Skill.Observation, Skill.Persuade],
            [
                "Armoured Vestment",
                "Light military shoulder pads",
                "Nemesis Handgun"
            ],
            0),
        [PrimaryCareer.Qualifier]: new PrimaryCareerModel(
            "Qualifier",
            "Seldom known by outsiders, Qualifiers serve as students and apprentices to Inquisitors, which provides the intensive training and specialised skills necessary for someone to fulfil the duties of an Inquisitor. Qualifiers are combat-trained, but they seldom enter the field – their duties are to study the cases that cross their masters’ desks, to learn the nature of the enemy, and to distinguish between the suspects and the wrongfully-accused. Not all Inquisitors are former Qualifiers – others come from different branches of the military – while some particularly gifted Qualifiers enter the field as Revisors.",
            [2,2,2,0,2,1,1,1],
            [Skill.Insight, Skill.Observation, Skill.Persuade],
            [Skill.CloseCombat, Skill.Mysticism, Skill.RangedWeapons],
            [Skill.Athletics, Skill.CloseCombat, Skill.Observation, Skill.Persuade],
            [...SkillsHelper.getSkills()],
            [
                "Armoured Vestment",
                "Light civilian shoulder pads",
                "Dagger"
            ],
            0),
        [PrimaryCareer.PilgrimScholar]: new PrimaryCareerModel(
            "Pilgrim Scholar",
            "Pilgrim Scholars aid Seers and Keepers of the Art in their research, gathering and compiling information from the Brotherhood’s extensive archives.",
            [0,2,1,3,2,2,1,0],
            [Skill.Education, Skill.Science, Skill.Willpower],
            [Skill.Linguistics, Skill.Mysticism, Skill.Persuade],
            [Skill.Education, Skill.Linguistics, Skill.Mysticism, Skill.Science],
            [Skill.Education, Skill.Science, Skill.Willpower],
            [
                "Personal laboratory|Personal library (Education)|Personal library (Linguistics)|Personal library (Mysticism)"
            ],
            0),
        [PrimaryCareer.Archivist]: new PrimaryCareerModel(
            "Archivist",
            "Archivists are knowledgeable people, well versed in the wide range of subjects they encounter during the course of their duties. They are required to understand the works they collect, and different forms and genres of material are often given over to those familiar with that style, creating experts in particular fields. As with their Brother Scribes, Archivists are often consulted in matters of their field of expertise, contributing their knowledge to the betterment of the Brotherhood. Numerous operations against deeply embedded Heretics have triumphed because of small but significant details interpreted by an Archivist’s knowledge, while others have been set in motion after an Archivist spotted signs of corruption within some published work the Brotherhood had collected.",
            [0,3,1,2,2,2,1,0],
            [Skill.Education, Skill.Insight, Skill.Observation],
            [Skill.Linguistics, Skill.Mysticism, Skill.Willpower],
            [Skill.Education, Skill.Insight, Skill.Linguistics, Skill.Mysticism],
            [Skill.Education, Skill.Insight, Skill.Observation],
            [
                "Robes",
                "Personal library (Education)|Personal library (Linguistics)|Personal library (Mysticism)"
            ],
            0),
        [PrimaryCareer.Analyst]: new PrimaryCareerModel(
            "Analyst",
            "Analysts’ activities are unglamorous – sifting through reams of reports and collating observations to archive or pass to other branches of the Brotherhood. Their activities favour personnel who have keen attention to detail and the capability to effectively interpret and process large amounts of information, but as with Observers, there are few Analysts who do not aspire to some more active role within the Brotherhood.",
            [1,2,2,3,2,1,0,0],
            [Skill.Education, Skill.Linguistics, Skill.Observation],
            [Skill.Insight, Skill.Science, Skill.Willpower],
            [Skill.Education, Skill.Insight, Skill.Linguistics, Skill.Mysticism],
            [Skill.Education, Skill.Linguistics, Skill.Observation],
            [
                "Robes",
                "Personal library (Education)|Personal library (Linguistics)",
                "Comptograph"
            ],
            0),
        [PrimaryCareer.Advisor]: new PrimaryCareerModel(
            "Advisor",
            "Advisors, regardless of their particular role, can be seen both within the cathedrals and in corporate offices across the solar system, constantly working to ensure that the Brotherhood’s needs are maintained. Their business suits are typically accompanied by robes, mantles, or some detail element – a broach, handkerchief, or tie – in the silver, white, and grey of the Cell of Advisors.",
            [1,2,1,2,2,3,0,0],
            [Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [Skill.Lifestyle, Skill.Observation, Skill.Willpower],
            [Skill.Education, Skill.Lifestyle, Skill.Persuade, Skill.Willpower],
            [Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [
                "High-quality formal clothing"
            ],
            0),
        [PrimaryCareer.Administrator]: new PrimaryCareerModel(
            "Administrator",
            "Regarded more as a polite euphemism than a strict description of its nature, the Cell of Administrators seldom engages in administrative work in the conventional sense. In truth, most of the work done by the Cell of Administrators overlaps with the duties of the Second Directorate in nature, though the purpose of that work is different. The Cell’s primary duty is to ensure the security and wellbeing of important persons within the Brotherhood, as well as official guests that the Brotherhood is host to.",
            [2,3,1,1,2,0,1,1],
            [Skill.Acrobatics, Skill.Observation, Skill.Stealth],
            [Skill.CloseCombat, Skill.Insight, Skill.Thievery],
            [Skill.Acrobatics, Skill.Observation, Skill.Stealth, Skill.Thievery],
            [Skill.Acrobatics, Skill.Observation, Skill.Stealth],
            [
                "Armoured Vestment",
                "Surveillance kit",
                "Nemesis Handgun",
                "Punisher Short Sword"
            ],
            0),
        [PrimaryCareer.Observer]: new PrimaryCareerModel(
            "Observer",
            "Observers are a regular sight for anyone in the business world, and their smart green and black hooded robes – typically worn over tailored business suits – can be found in the vast majority of corporate offices and high-level meetings across the solar system. The ubiquity of their presence, and the faceless, uniformed appearance they present, ensure that they are treated as neutral observers, more akin to human cameras than snooping interlopers. However, the Brotherhood knows that even the most devout people may not be entirely willing to speak openly in the presence of an agent of the Brotherhood. As a result, it employs covert Observers as well, infiltrating the business world as secretaries, clerks, personal assistants, and other ubiquitous personnel whose presence will go unremarked in the halls of high finance and corporate politics.",
            [2,3,1,2,2,1,0,0],
            [Skill.Education, Skill.Observation, Skill.Stealth],
            [Skill.Lifestyle, Skill.Linguistics, Skill.Insight],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Stealth],
            [Skill.Education, Skill.Observation, Skill.Stealth],
            [
                "Hooded formal robes",
                "High-quality formal clothing",
                "Surveillance kit"
            ],
            0),
        [PrimaryCareer.Archangel]: new PrimaryCareerModel(
            "Archangel",
            "Archangels are the Brotherhood’s pilot corps, Art-wielding expert aviators who employ the Aspect of Mentalism to heighten their piloting skills far beyond those of even the most skilled mundane pilots. The sophisticated Icarus Jetfighters they fly are craft from an age long passed, exceptionally challenging to operate without complex electronic control systems. Archangels revel in the fact that their skill – both mundane and supernatural – allows them to operate such deadly aircraft effectively. The best amongst them are known as Archons, and they are charged with operating and navigating the Brotherhood’s spacecraft.",
            [2, 2, 3, 1, 2, 0, 1, 0],
            [Skill.HeavyWeapons, Skill.Pilot, Skill.RangedWeapons],
            [Skill.Mechanics, Skill.Mysticism, Skill.Willpower],
            [Skill.HeavyWeapons, Skill.Mysticism, Skill.Pilot, Skill.Willpower],
            [Skill.AspectOfMentalism],
            [
                "Ballistic nylon flight suit",
                "Piranha Handgun"
            ],
            -1),
        [PrimaryCareer.Valkyrie]: new PrimaryCareerModel(
            "Valkyrie",
            "Valkyries are elite shock-troops, composed entirely of female Artcapable warriors. Idealised by those outside the Brotherhood as being stunningly beautiful warrior-maidens, these warriors are far more terrifying in reality than the propaganda suggests. Their ferocity and ruthless efficiency in battle paint a very different picture to the angelic figures depicted in pulp novels and motion pictures. Both orders employ the Castigator power spear, a weapon that only they are trained to wield. Valkyries are rapid assault troops, descending from the skies to strike into the heart of an enemy force.",
            [2, 1, 1, 1, 2, 0, 2, 2],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Mysticism],
            [Skill.Persuade, Skill.RangedWeapons, Skill.Willpower],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Mysticism, Skill.Persuade],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Mysticism, ...this._artAspects],
            [
                "Valkyrie Combat Armour",
                "Castigator Power Spear",
                "P60 Punisher Handgun",
            ],
            -1),
        [PrimaryCareer.Preacher]: new PrimaryCareerModel(
            "Preacher",
            "One of the most visible presences of the Brotherhood is the Order of Preachers. Its members can be found on most street corners, market districts, transit hubs, and in a variety of other places where people gather or move in large groups. A copy of the Book of Law in hand, they spread the Cardinal’s message to any who will listen.",
            [2, 2, 2, 0, 1, 2, 1, 1],
            [Skill.Observation, Skill.Persuade, Skill.Willpower],
            [Skill.CloseCombat, Skill.Insight, Skill.RangedWeapons],
            [Skill.Insight, Skill.Observation, Skill.Persuade, Skill.Willpower],
            [Skill.Observation, Skill.Persuade, Skill.Willpower],
            [
                "Armoured Vestment",
                "Light civilian shoulder pads",
                "P60 Punisher Handgun",
                "Punisher Short Sword"
            ],
            -1),
        [PrimaryCareer.MilitaryTrencher]: new PrimaryCareerModel(
            "Military (Trencher)",
            "Trenchers – officially called the Imperial Line Infantry – face some of the harshest and most extreme environments of any Imperial soldiers, and are thus some of the toughest and fiercest rank and file infantry of any corporation. Their lives are bleak, and often brief, and the conditions they face would shatter the minds of lesser men, even with the help of the narcotics they are supplied with to calm their nerves.",
            [1, 1, 2, 0, 2, 0, 3, 2],
            [Skill.RangedWeapons, Skill.Resistance, Skill.Willpower],
            [Skill.CloseCombat, Skill.HeavyWeapons, Skill.Survival],
            [Skill.RangedWeapons, Skill.Resistance, Skill.Survival, Skill.Willpower],
            [Skill.RangedWeapons, Skill.Resistance, Skill.Willpower],
            [
                "Mk. I Light Personal Protection Suit",
                "Invader Battle Rifle",
                "Bayonet",
                "Gas mask",
                "Fear suppressant drugs (3 doses)"
            ],
            1),
        [PrimaryCareer.MilitaryReservist]: new PrimaryCareerModel(
            "Military (Reservist)",
            "Many Imperials choose to join the military on a part-time basis, before returning to their family’s business. This is regarded as a valuable compromise by some – military training breeds discipline and determination – but the soldiers it produces are seldom held in particularly high esteem. Local Defence Forces, or LDFs, established by individual communities are often the subject of mockery by professional soldiers, who claim that the acronym actually stands for “look, duck, and flee”.",
            [2, 2, 2, 0, 2, 1, 1, 1],
            [Skill.Persuade, Skill.RangedWeapons, Skill.Resistance],
            [Skill.Athletics, Skill.CloseCombat, Skill.Lifestyle],
            [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Resistance],
            [Skill.Persuade, Skill.RangedWeapons, Skill.Resistance],
            [
                "Ballistic nylon military uniform",
                "Plasma Intruder SMG",
                "Medium military shoulder pads"
            ],
            1),
        [PrimaryCareer.MilitaryWolfbairn]: new PrimaryCareerModel(
            "Military (Wolfbairn)",
            "The newest members of the Wolf Packs, these rebellious, vicious young recruits have decided to renounce clan ties and seek out a different life. They serve a tour of duty amongst the ‘cubs’ (as their betters call them), before being truly regarded as Wolfbanes.",
            [2, 1, 1, 0, 1, 1, 2, 3],
            [Skill.Athletics, Skill.CloseCombat, Skill.Stealth],
            [Skill.Acrobatics, Skill.Observation, Skill.RangedWeapons],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.Stealth],
            [Skill.Athletics, Skill.CloseCombat, Skill.Stealth],
            [
                "Mk. I Light Personal Protection Suit",
                "Aggressor Handgun",
                "Punisher Short Sword",
                "Wolfpelt cloak"
            ],
            2),
        [PrimaryCareer.MilitaryGreyGhost]: new PrimaryCareerModel(
            "Military (Grey Ghost)",
            "When recruits first join the Defence Forces, the most mechanically gifted are given an opportunity to serve in the Grey Ghosts. These specialised soldiers are skilled in urban warfare and combat engineering, and are scattered widely through other units. They are modest and focus entirely on getting the job done quickly and efficiently, without flash displays of prowess, which sets them apart from many units.",
            [2, 2, 2, 2, 0, 1, 1, 1],
            [Skill.Mechanics, Skill.RangedWeapons, Skill.Stealth],
            [Skill.Acrobatics, Skill.CloseCombat, Skill.Persuade],
            [Skill.Acrobatics, Skill.Mechanics, Skill.RangedWeapons, Skill.Stealth],
            [Skill.Mechanics, Skill.RangedWeapons, Skill.Stealth],
            [
                "Ballistic nylon clothing",
                "Light military shoulder pads",
                "Aggressor Handgun",
                "Assailant Sniper Rifle",
                "Climbing gear",
                "Advanced repair kit"
            ],
            3),
        [PrimaryCareer.MilitaryClanRegiment]: new PrimaryCareerModel(
            "Military (Clan Regimental Brigade)",
            "Almost every clan maintains its own special forces, which are fielded to defend its own interests and acquire new properties. These forces are likely to see action against the Dark Legion, or other corporations, and are distinct from units like the Blood Berets and other regiments governed by the Ministry of War. While some amongst these forces are picked from existing defence forces troopers, others spend years in additional training within their clan’s regimental brigade before they take to the field.",
            [2, 1, 2, 1, 0, 1, 2, 2],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Resistance],
            [Skill.Acrobatics, Skill.Athletics, Skill.Survival],
            [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Resistance],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Resistance],
            [
                "Ballistic nylong military uniform",
                "Interceptor SMG",
                "Medium military shoulder pads"
            ],
            2),
        [PrimaryCareer.AcademicSolicitor]: new PrimaryCareerModel(
            "Academic (Solicitor)",
            "A particular necessity when navigating the complex relationships between the clans, and between Imperial and its rival corporations, solicitors form the bulk of the practicing legal profession. Law firms consisting primarily of solicitors take clients of all sorts, providing advice and taking action on their clients’ behalf. The matter of standing in court before a judge is reserved for barristers, who are hired by law firms as required, though most barristers will have years of experience as a solicitor.",
            [0, 2, 1, 3, 2, 2, 1, 0],
            [Skill.Education, Skill.Persuade, Skill.Willpower],
            [Skill.Education, Skill.Lifestyle, Skill.Linguistics],
            [Skill.Education, Skill.Lifestyle, Skill.Persuade, Skill.Willpower],
            [Skill.Education, Skill.Persuade, Skill.Willpower],
            [
                "Expensive business suit",
                "Personal library (Education)"
            ],
            3),
        //[PrimaryCareer.IES_TIFF]: new PrimaryCareerModel(
        //    "",
        //    "",
        //    [],
        //    [Skill., Skill., Skill.],
        //    [Skill., Skill., Skill.],
        //    [Skill., Skill., Skill., Skill.],
        //    [Skill., Skill., Skill., Skill.],
        //    [
        //        ""
        //    ],
        //    4),
    };

    generateCareerFromTableA() {
        var career: PrimaryCareer[] = undefined;
        var roll = Math.floor(Math.random() * 6) + 1;

        if (character.faction === Faction.Capitol && character.hasSource(Source.Capitol)) {
            return this.generateCapitolCareerFromTableA(roll);
        }
        else if (character.faction === Faction.Whitestar && character.hasSource(Source.Whitestar)) {
            return this.generateWhitestarCareerFromTableA(roll);
        }
        else if (character.faction === Faction.Bauhaus && character.hasSource(Source.Bauhaus)) {
            return this.generateBauhausCareerFromTableA(roll);
        }

        switch (roll) {
            case 1:
                if (character.faction === Faction.Brotherhood && character.hasSource(Source.Brotherhood)) {
                    career = [PrimaryCareer.Disciple];
                }
                else {
                    career = [PrimaryCareer.Unemployed];
                }
                break;
            case 2:
                if (character.faction === Faction.Mishima && character.hasSource(Source.Mishima)) {
                    if (character.isSamurai()) {
                        career = [PrimaryCareer.JuniorManager];
                    }
                    else {
                        career = [PrimaryCareer.Salaryman];

                        if (character.hasSource(Source.LunaPDFreelancers)) {
                            career.push(PrimaryCareer.Cabbie);
                        }
                    }
                }
                else if (character.faction === Faction.Brotherhood && character.hasSource(Source.Brotherhood)) {
                    switch (Math.floor(Math.random() * 6) + 1) {
                        case 1:
                        case 2: career = [PrimaryCareer.Preacher, PrimaryCareer.Scribe]; break;
                        case 3:
                        case 4: career = [PrimaryCareer.Preacher, PrimaryCareer.Server]; break;
                        case 5:
                        case 6: career = [PrimaryCareer.Preacher, PrimaryCareer.SecretaryBH]; break;
                    }
                }
                else {
                    career = [PrimaryCareer.CorporateWorker];

                    if (character.hasSource(Source.LunaPDFreelancers)) {
                        career.push(PrimaryCareer.Cabbie);
                    }
                }
                break;
            case 3:
                if (character.faction === Faction.Brotherhood && character.hasSource(Source.Brotherhood)) {
                    switch (Math.floor(Math.random() * 6) + 1) {
                        case 1:
                        case 2:
                        case 3: career = [PrimaryCareer.PilgrimMachinist]; break;
                        case 4:
                        case 5:
                        case 6: career = [PrimaryCareer.Craftsman]; break;
                    }
                }
                else {
                    career = [PrimaryCareer.TechnicalRepairman];
                }
                break;
            case 4:
                if (character.faction === Faction.Brotherhood && character.hasSource(Source.Brotherhood)) {
                    return this.generateCareerFromTableA();
                }
                else {
                    career = [PrimaryCareer.FarmerFrontiersman];
                }
                break;
            case 5:
                career = this.getCareersFromTableA();
                break;
            case 6:
                career = this.generateCareerFromTableB();
                break;
        }

        return career;
    }

    generateCareerFromTableB() {
        var career: PrimaryCareer[] = undefined;
        var roll = Math.floor(Math.random() * 6) + 1;

        if (character.faction === Faction.Capitol && character.hasSource(Source.Capitol)) {
            return this.generateCapitolCareerFromTableB(roll);
        }
        else if (character.faction === Faction.Whitestar && character.hasSource(Source.Whitestar)) {
            return this.generateWhitestarCareerFromTableB(roll);
        }
        else if (character.faction === Faction.Bauhaus && character.hasSource(Source.Bauhaus)) {
            return this.generateBauhausCareerFromTableB(roll);
        }
        else if (character.faction === Faction.Imperial && character.hasSource(Source.Imperial)) {
            return this.generateImperialCareerFromTableB(roll);
        }

        switch (roll) {
            case 1:
            case 2:
            case 3:
                if (character.faction === Faction.Brotherhood && character.hasSource(Source.Brotherhood)) {
                    switch (Math.floor(Math.random() * 6) + 1) {
                        case 1:
                        case 2: 
                        case 3: career = [PrimaryCareer.PilgrimProtector, PrimaryCareer.Archangel, PrimaryCareer.Valkyrie]; break;
                        case 4:
                        case 5:
                        case 6: career = [PrimaryCareer.BrotherhoodTrooper, PrimaryCareer.Archangel, PrimaryCareer.Valkyrie]; break;
                    }
                }
                else if (character.faction === Faction.Mishima && character.hasSource(Source.Mishima)) {
                    if (character.isSamurai()) {
                        career = [PrimaryCareer.Bushi];
                    }
                    else {
                        career = [PrimaryCareer.Ashigaru];
                    }
                }
                else {
                    career = [PrimaryCareer.MilitaryBasic];
                }

                if (character.hasSource(Source.Cartel)) {
                    career.push(PrimaryCareer.Bodyguard);
                }

                break;
            case 4:
            case 5:
                if (character.faction === Faction.Mishima && character.hasSource(Source.Mishima)) {
                    if (character.isSamurai()) {
                        career = [PrimaryCareer.Magistrate];
                    }
                    else {
                        career = [PrimaryCareer.Watchman];
                    }

                    if (character.hasSource(Source.LunaPDFreelancers)) {
                        career.push(...[
                            PrimaryCareer.PoliceCIO,
                            PrimaryCareer.PoliceFRO,
                            PrimaryCareer.PoliceRiot,
                            PrimaryCareer.PoliceTSO
                        ]);
                    }
                }
                else if (character.faction === Faction.Brotherhood && character.hasSource(Source.Brotherhood)) {
                    if (character.hasTalent("Mystic")) {
                        career = [PrimaryCareer.Qualifier, PrimaryCareer.Paladin];
                    }
                    else {
                        career = [PrimaryCareer.Paladin];
                    }
                }
                else {
                    career = [PrimaryCareer.PoliceBeatCop];

                    if (character.hasSource(Source.LunaPDFreelancers)) {
                        career.push(PrimaryCareer.PoliceCIO);
                        career.push(PrimaryCareer.PoliceFRO);
                        career.push(PrimaryCareer.PoliceRiot);
                        career.push(PrimaryCareer.PoliceTSO);
                    }

                    if (character.hasSource(Source.Cartel)) {
                        career.push(PrimaryCareer.CartelInvestigator);
                    }
                }
                break;
            case 6:
                if (character.faction === Faction.Brotherhood && character.hasSource(Source.Brotherhood)) {
                    return this.generateCareerFromTableB();
                }
                else {
                    career = [PrimaryCareer.Criminal];
                }
                break;
        }

        return career;
    }

    generateCareerFromTableC() {
        var career: PrimaryCareer[] = undefined;
        var roll = Math.floor(Math.random() * 6) + 1;

        if (character.faction === Faction.Capitol && character.hasSource(Source.Capitol)) {
            return this.generateCapitolCareerFromTableC(roll);
        }
        else if (character.faction === Faction.Imperial && character.hasSource(Source.Imperial)) {
            return this.generateImperialCareerFromTableC(roll);
        }

        switch (roll) {
            case 1:
            case 2:
                if (character.faction === Faction.Brotherhood && character.hasSource(Source.Brotherhood)) {
                    return this.generateCareerFromTableC();
                }
                else {
                    career = [PrimaryCareer.MedicalFirstResponder];

                    if (character.hasSource(Source.LunaPDFreelancers)) {
                        career.push(PrimaryCareer.Engineer);
                    }
                }
                break;
            case 3:
            case 4:
                if (character.faction === Faction.Brotherhood && character.hasSource(Source.Brotherhood)) {
                    switch (Math.floor(Math.random() * 6) + 1) {
                        case 1:
                        case 2: 
                        case 3: career = [PrimaryCareer.PilgrimScholar]; break;
                        case 4:
                        case 5:
                        case 6: career = [PrimaryCareer.Archivist]; break;
                    }
                }
                else {
                    career = [PrimaryCareer.AcademicResearcher];
                }
                break;
            case 5:
            case 6:
                if (character.faction === Faction.Brotherhood && character.hasSource(Source.Brotherhood)) {
                    return this.generateCareerFromTableC();
                }
                else {
                    career = [
                        PrimaryCareer.MediaReporter
                    ];

                    if (character.hasSource(Source.LunaPDFreelancers)) {
                        career.push(...[
                            PrimaryCareer.MediaPR,
                            PrimaryCareer.Archaeologist
                        ]);
                    }
                }
                break;
        }

        return career;
    }

    generateCareerFromTableD() {
        var career: PrimaryCareer[] = undefined;
        var roll = Math.floor(Math.random() * 6) + 1;

        switch (roll) {
            case 1:
            case 2:
                if (character.faction === Faction.Brotherhood && character.hasSource(Source.Brotherhood)) {
                    switch (Math.floor(Math.random() * 6) + 1) {
                        case 1:
                        case 2:
                        case 3: career = [PrimaryCareer.Analyst]; break;
                        case 4:
                        case 5:
                        case 6: career = [PrimaryCareer.Advisor]; break;
                    }
                }
                else {
                    career = [PrimaryCareer.CorporateExecutive];

                    if (character.hasSource(Source.Cartel)) {
                        career.push(PrimaryCareer.Consultant);
                        career.push(PrimaryCareer.Lobbyist);
                    }
                }
                break;
            case 3:
            case 4:
                if (character.faction === Faction.Brotherhood && character.hasSource(Source.Brotherhood)) {
                    return this.generateCareerFromTableD();
                }
                else {
                    career = [PrimaryCareer.ShipCrew];
                }
                break;
            case 5:
            case 6:
                if (character.faction === Faction.Brotherhood && character.hasSource(Source.Brotherhood)) {
                    switch (Math.floor(Math.random() * 6) + 1) {
                        case 1:
                        case 2:
                        case 3: career = [PrimaryCareer.Administrator]; break;
                        case 4:
                        case 5:
                        case 6: career = [PrimaryCareer.Observer]; break;
                    }
                }
                else {
                    career = [PrimaryCareer.IntelligenceOperative];
                }
                break;
        }

        return career;
    }

    generateCybertronicCareer() {
        const roll = Math.floor(Math.random() * 6) + 1;
        switch (roll) {
            case 1:
                if (character.pillar === Pillar.VAC_AEM) return PrimaryCareer.LAJ_VAC;
                if (character.pillar === Pillar.TIFF_AEM) return PrimaryCareer.LAJ_TIFF;
                if (character.pillar === Pillar.VAC_RDM) return PrimaryCareer.ARD_VAC;
                if (character.pillar === Pillar.TIFF_RDM) return PrimaryCareer.ARD_TIFF;
                if (character.pillar === Pillar.VAC_SWI) return PrimaryCareer.MCR_VAC;
                if (character.pillar === Pillar.TIFF_SWI) return PrimaryCareer.MCR_TIFF;
                break;
            case 2:
                if (character.pillar === Pillar.VAC_AEM) return PrimaryCareer.LAJ_VAC;
                if (character.pillar === Pillar.TIFF_AEM) return PrimaryCareer.LAJ_TIFF;
                if (character.pillar === Pillar.VAC_RDM) return PrimaryCareer.EPD_VAC;
                if (character.pillar === Pillar.TIFF_RDM) return PrimaryCareer.EPD_TIFF;
                if (character.pillar === Pillar.VAC_SWI) return PrimaryCareer.MCR_VAC;
                if (character.pillar === Pillar.TIFF_SWI) return PrimaryCareer.MCR_TIFF;
                break;
            case 3:
                if (character.pillar === Pillar.VAC_AEM) return PrimaryCareer.ETP_VAC;
                if (character.pillar === Pillar.TIFF_AEM) return PrimaryCareer.ETP_TIFF;
                if (character.pillar === Pillar.VAC_RDM) return PrimaryCareer.EPD_VAC;
                if (character.pillar === Pillar.TIFF_RDM) return PrimaryCareer.EPD_TIFF;
                if (character.pillar === Pillar.VAC_SWI) return PrimaryCareer.IES_VAC;
                if (character.pillar === Pillar.TIFF_SWI) return PrimaryCareer.IES_TIFF;
                break;
            case 4:
                if (character.pillar === Pillar.VAC_AEM) return PrimaryCareer.ETP_VAC;
                if (character.pillar === Pillar.TIFF_AEM) return PrimaryCareer.ETP_TIFF;
                if (character.pillar === Pillar.VAC_RDM) return PrimaryCareer.EPD_VAC;
                if (character.pillar === Pillar.TIFF_RDM) return PrimaryCareer.EPD_TIFF;
                if (character.pillar === Pillar.VAC_SWI) return PrimaryCareer.IES_VAC;
                if (character.pillar === Pillar.TIFF_SWI) return PrimaryCareer.IES_TIFF;
                break;
            case 5:
                if (character.pillar === Pillar.VAC_AEM) return PrimaryCareer.ABC_VAC;
                if (character.pillar === Pillar.TIFF_AEM) return PrimaryCareer.ABC_TIFF;
                if (character.pillar === Pillar.VAC_RDM) return PrimaryCareer.CRI_VAC;
                if (character.pillar === Pillar.TIFF_RDM) return PrimaryCareer.CRI_TIFF;
                if (character.pillar === Pillar.VAC_SWI) return PrimaryCareer.APH_VAC;
                if (character.pillar === Pillar.TIFF_SWI) return PrimaryCareer.APH_TIFF;
                break;
            case 6:
                if (character.pillar === Pillar.VAC_AEM) return PrimaryCareer.FEF_VAC;
                if (character.pillar === Pillar.TIFF_AEM) return PrimaryCareer.FEF_TIFF;
                if (character.pillar === Pillar.VAC_RDM) return PrimaryCareer.EDA_VAC;
                if (character.pillar === Pillar.TIFF_RDM) return PrimaryCareer.EDA_TIFF;
                if (character.pillar === Pillar.VAC_SWI) return PrimaryCareer.APH_VAC;
                if (character.pillar === Pillar.TIFF_SWI) return PrimaryCareer.APH_TIFF;
                break;
        }

        return undefined;
    }

    getCareersFromTableA() {
        var careers: PrimaryCareer[] = [];

        if ((character.faction === Faction.Capitol && character.hasSource(Source.Capitol)) ||
            (character.faction === Faction.Whitestar && character.hasSource(Source.Whitestar)) ||
            (character.faction === Faction.Bauhaus && character.hasSource(Source.Bauhaus)) ||
            (character.faction === Faction.Mishima && character.hasSource(Source.Mishima)) ||
            (character.faction === Faction.Brotherhood && character.hasSource(Source.Brotherhood))) {
            switch (character.faction) {
                case Faction.Capitol:
                    careers = [
                        PrimaryCareer.Unemployed,
                        PrimaryCareer.CorporateWorker,
                        PrimaryCareer.Accountant,
                        PrimaryCareer.Attorney,
                        PrimaryCareer.Salesman,
                        PrimaryCareer.Secretary,
                        PrimaryCareer.TechnicalRepairman,
                        PrimaryCareer.FarmerFrontiersman,
                        PrimaryCareer.AthleteSportsman,
                        PrimaryCareer.AthletePrizeFighter,
                        PrimaryCareer.AthleteStuntMan
                    ];

                    if (character.hasSource(Source.LunaPDFreelancers)) {
                        careers.push(PrimaryCareer.Cabbie);
                    }

                    break;
                case Faction.Whitestar:
                    careers = [
                        PrimaryCareer.Unemployed,
                        PrimaryCareer.CorporateWorker,
                        PrimaryCareer.OrganisationAdministrator,
                        PrimaryCareer.OrganisationAllotmentMinister,
                        PrimaryCareer.OrganisationFacilitiesDivisor,
                        PrimaryCareer.OrganisationCommissioner,
                        PrimaryCareer.TechnicalRepairman,
                        PrimaryCareer.TechnicalFactoryWorkerWhitestar,
                        PrimaryCareer.TechnicalPatchworkMekhanik,
                        PrimaryCareer.TechnicalKuznets,
                        PrimaryCareer.TechnicalInzhener,
                        PrimaryCareer.FarmerFrontiersman,
                        PrimaryCareer.GatheringOkhotnik,
                        PrimaryCareer.GatheringRazvedchik,
                        PrimaryCareer.GatheringPilot
                    ];
                    break;
                case Faction.Bauhaus:
                    careers = [
                        PrimaryCareer.CorporateWorker,
                        PrimaryCareer.TechnicalFreightDriver,
                        PrimaryCareer.TechnicalFactoryWorkerBauhaus,
                        PrimaryCareer.TechnicalFieldMechanic,
                        PrimaryCareer.TechnicalPrecisionEngineer,
                        PrimaryCareer.TechnicalDesigner,
                        PrimaryCareer.FarmerFrontiersman,
                        PrimaryCareer.RuralDrover,
                        PrimaryCareer.RuralScout,
                        PrimaryCareer.RuralLumberman
                    ];

                    if (character.status === Status.Thrall) {
                        careers.push(PrimaryCareer.Unemployed);
                    }
                    else {
                        if (this.canStudyMilitary()) {
                            careers.push(PrimaryCareer.StudentMilitary);
                        }

                        if (this.canStudyMedia()) {
                            careers.push(PrimaryCareer.StudentMedia);
                        }

                        if (this.canStudyBusiness()) {
                            careers.push(PrimaryCareer.StudentBusiness);
                        }

                        if (this.canStudyTechnical()) {
                            careers.push(PrimaryCareer.StudentTechnical);
                        }

                        careers.push(PrimaryCareer.Pilgrim);
                    }

                    if (character.hasSource(Source.LunaPDFreelancers)) {
                        careers.push(PrimaryCareer.Cabbie);
                    }

                    break;
                case Faction.Mishima:
                    if (character.isSamurai()) {
                        careers = [
                            PrimaryCareer.Unemployed,
                            PrimaryCareer.JuniorManager,
                            PrimaryCareer.TechnicalRepairman,
                            PrimaryCareer.FarmerFrontiersman,
                        ];
                    }
                    else {
                        careers = [
                            PrimaryCareer.Unemployed,
                            PrimaryCareer.Salaryman,
                            PrimaryCareer.TechnicalRepairman,
                            PrimaryCareer.FarmerFrontiersman,
                        ];

                        if (character.hasSource(Source.LunaPDFreelancers)) {
                            careers.push(PrimaryCareer.Cabbie);
                        }
                    }
                    break;
                case Faction.Brotherhood:
                    careers = [
                        PrimaryCareer.Disciple,
                        PrimaryCareer.Scribe,
                        PrimaryCareer.Server,
                        PrimaryCareer.SecretaryBH,
                        PrimaryCareer.PilgrimMachinist,
                        PrimaryCareer.Craftsman
                    ];
                    break;
                default:
                    careers = [
                        PrimaryCareer.Unemployed,
                        PrimaryCareer.CorporateWorker,
                        PrimaryCareer.TechnicalRepairman,
                        PrimaryCareer.FarmerFrontiersman,
                    ];

                    if (character.hasSource(Source.LunaPDFreelancers)) {
                        careers.push(PrimaryCareer.Cabbie);
                    }

                    break;
            }
        }
        else {
            careers = [
                PrimaryCareer.Unemployed,
                PrimaryCareer.CorporateWorker,
                PrimaryCareer.TechnicalRepairman,
                PrimaryCareer.FarmerFrontiersman,
            ];

            if (character.hasSource(Source.LunaPDFreelancers)) {
                careers.push(PrimaryCareer.Cabbie);
            }
        }

        careers = careers.filter(c => character.prohibitedPrimaryCareers.indexOf(c) === -1);

        return careers;
    }

    getCareersFromTableB() {
        var careers = [];

        if ((character.faction === Faction.Capitol && character.hasSource(Source.Capitol)) ||
            (character.faction === Faction.Whitestar && character.hasSource(Source.Whitestar)) ||
            (character.faction === Faction.Bauhaus && character.hasSource(Source.Bauhaus)) ||
            (character.faction === Faction.Mishima && character.hasSource(Source.Mishima)) ||
            (character.faction === Faction.Brotherhood && character.hasSource(Source.Brotherhood)) ||
            (character.faction === Faction.Imperial && character.hasSource(Source.Imperial))) {
            switch (character.faction) {
                case Faction.Capitol:
                    careers = [
                        PrimaryCareer.MilitaryBasic,
                        PrimaryCareer.MilitaryAirborneCavalry,
                        PrimaryCareer.MilitaryCAFPilot,
                        PrimaryCareer.PoliceBeatCop,
                        PrimaryCareer.PoliceAIPO,
                        PrimaryCareer.PoliceBodyguard,
                        PrimaryCareer.PolicePrivateInvestigator,
                        PrimaryCareer.Criminal
                    ];

                    if (character.hasSource(Source.Cartel)) {
                        careers.push(PrimaryCareer.Bodyguard);
                        careers.push(PrimaryCareer.CartelInvestigator);
                    }

                    if (character.hasSource(Source.LunaPDFreelancers)) {
                        careers.push(...[
                            PrimaryCareer.PoliceCIO,
                            PrimaryCareer.PoliceFRO,
                            PrimaryCareer.PoliceRiot,
                            PrimaryCareer.PoliceTSO,
                        ]);
                    }

                    break;
                case Faction.Whitestar:
                    careers = [
                        PrimaryCareer.PreservationMilitaryRegular,
                        PrimaryCareer.PreservationMilitaryOfficer,
                        PrimaryCareer.PreservationStreltsyGorodskiye,
                        PrimaryCareer.PreservationStreltsyVyborniye
                    ];
                    break;
                case Faction.Bauhaus:
                    careers = [
                        PrimaryCareer.PoliceBeatCop,
                        PrimaryCareer.Criminal
                    ];

                    if (character.status < Status.Nobility) {
                        careers.push(PrimaryCareer.MilitaryHussarRegular);
                        careers.push(this.getGuardOrderRegular());
                        careers.push(PrimaryCareer.MilitaryArtilleryKorpsRegular);
                        careers.push(PrimaryCareer.MilitaryDragoonRegular);
                    }
                    else {
                        careers.push(PrimaryCareer.MilitaryHussarOfficer);
                        careers.push(this.getGuardOrderOfficer());
                        careers.push(PrimaryCareer.MilitaryArtilleryKorpsOfficer);
                        careers.push(PrimaryCareer.MilitaryDragoonOfficer);
                    }

                    if (character.hasSource(Source.Cartel)) {
                        careers.push(PrimaryCareer.Bodyguard);
                        careers.push(PrimaryCareer.CartelInvestigator);
                    }

                    if (character.hasSource(Source.LunaPDFreelancers)) {
                        careers.push(...[
                            PrimaryCareer.PoliceCIO,
                            PrimaryCareer.PoliceFRO,
                            PrimaryCareer.PoliceRiot,
                            PrimaryCareer.PoliceTSO,
                        ]);
                    }

                    break;
                case Faction.Mishima:
                    if (character.isSamurai()) {
                        careers = [
                            PrimaryCareer.Bushi,
                            PrimaryCareer.Magistrate,
                            PrimaryCareer.Criminal
                        ];
                    }
                    else {
                        careers = [
                            PrimaryCareer.Ashigaru,
                            PrimaryCareer.Watchman,
                            PrimaryCareer.Criminal
                        ];
                    }

                    if (character.hasSource(Source.Cartel)) {
                        careers.push(PrimaryCareer.Bodyguard);
                        careers.push(PrimaryCareer.CartelInvestigator);
                    }

                    if (character.hasSource(Source.LunaPDFreelancers)) {
                        careers.push(...[
                            PrimaryCareer.PoliceCIO,
                            PrimaryCareer.PoliceFRO,
                            PrimaryCareer.PoliceRiot,
                            PrimaryCareer.PoliceTSO,
                        ]);
                    }

                    break;
                case Faction.Brotherhood:
                    careers = [
                        PrimaryCareer.PilgrimProtector,
                        PrimaryCareer.BrotherhoodTrooper,
                        PrimaryCareer.Paladin
                    ];

                    if (character.hasTalent("Mystic")) {
                        careers.push(PrimaryCareer.Qualifier);
                    }

                    break;
                case Faction.Imperial:
                    careers = [
                        PrimaryCareer.MilitaryBasic,
                        PrimaryCareer.MilitaryTrencher,
                        PrimaryCareer.MilitaryReservist,
                        PrimaryCareer.MilitaryWolfbairn,
                        PrimaryCareer.MilitaryGreyGhost,
                        PrimaryCareer.MilitaryClanRegiment,
                        PrimaryCareer.PoliceBeatCop,
                        PrimaryCareer.Criminal
                    ];

                    if (character.hasSource(Source.Cartel)) {
                        careers.push(PrimaryCareer.Bodyguard);
                        careers.push(PrimaryCareer.CartelInvestigator);
                    }

                    if (character.hasSource(Source.LunaPDFreelancers)) {
                        careers.push(...[
                            PrimaryCareer.PoliceCIO,
                            PrimaryCareer.PoliceFRO,
                            PrimaryCareer.PoliceRiot,
                            PrimaryCareer.PoliceTSO,
                        ]);
                    }

                    break;
                default:
                    careers = [
                        PrimaryCareer.MilitaryBasic,
                        PrimaryCareer.PoliceBeatCop,
                        PrimaryCareer.Criminal
                    ];

                    if (character.hasSource(Source.LunaPDFreelancers)) {
                        careers.push(...[
                            PrimaryCareer.PoliceCIO,
                            PrimaryCareer.PoliceFRO,
                            PrimaryCareer.PoliceRiot,
                            PrimaryCareer.PoliceTSO,
                        ]);
                    }

                    break;
            }
        }
        else {
            careers = [
                PrimaryCareer.MilitaryBasic,
                PrimaryCareer.PoliceBeatCop,
                PrimaryCareer.Criminal
            ];

            if (character.hasSource(Source.Cartel)) {
                careers.push(PrimaryCareer.Bodyguard);
                careers.push(PrimaryCareer.CartelInvestigator);
            }

            if (character.hasSource(Source.LunaPDFreelancers)) {
                careers.push(...[
                    PrimaryCareer.PoliceCIO,
                    PrimaryCareer.PoliceFRO,
                    PrimaryCareer.PoliceRiot,
                    PrimaryCareer.PoliceTSO,
                ]);
            }
        }

        careers = careers.filter(c => character.prohibitedPrimaryCareers.indexOf(c) === -1);

        return careers;
    }

    getCareersFromTableC() {
        var careers = [];

        if ((character.faction === Faction.Capitol && character.hasSource(Source.Capitol)) ||
            (character.faction === Faction.Whitestar && character.hasSource(Source.Whitestar)) ||
            (character.faction === Faction.Bauhaus && character.hasSource(Source.Bauhaus)) ||
            (character.faction === Faction.Mishima && character.hasSource(Source.Mishima)) ||
            (character.faction === Faction.Brotherhood && character.hasSource(Source.Brotherhood)) ||
            (character.faction === Faction.Imperial && character.hasSource(Source.Imperial))) {
            switch (character.faction) {
                case Faction.Capitol:
                    careers = [
                        PrimaryCareer.MedicalFirstResponder,
                        PrimaryCareer.AcademicResearcher,
                        PrimaryCareer.MediaReporter,
                        PrimaryCareer.MediaRadioJockey,
                        PrimaryCareer.MediaTalentAgent,
                        PrimaryCareer.MediaPhotographer,
                        PrimaryCareer.MediaFashionDesigner,
                        PrimaryCareer.MediaPoliticalCampaigner
                    ];

                    if (character.hasSource(Source.LunaPDFreelancers)) {
                        careers.push(...[
                            PrimaryCareer.Engineer,
                            PrimaryCareer.MediaPR,
                            PrimaryCareer.Archaeologist
                        ]);
                    }
                    break;
                case Faction.Brotherhood:
                    careers = [
                        PrimaryCareer.PilgrimScholar,
                        PrimaryCareer.Archivist
                    ];
                    break;
                case Faction.Imperial:
                    careers = [
                        PrimaryCareer.MedicalFirstResponder,
                        PrimaryCareer.AcademicResearcher,
                        PrimaryCareer.AcademicSolicitor,
                        PrimaryCareer.MediaReporter,
                    ];

                    if (character.hasSource(Source.LunaPDFreelancers)) {
                        careers.push(...[
                            PrimaryCareer.Engineer,
                            PrimaryCareer.MediaPR,
                            PrimaryCareer.Archaeologist
                        ]);
                    }
                    break;
                default:
                    careers = [
                        PrimaryCareer.MedicalFirstResponder,
                        PrimaryCareer.AcademicResearcher,
                        PrimaryCareer.MediaReporter
                    ];

                    if (character.hasSource(Source.LunaPDFreelancers)) {
                        careers.push(...[
                            PrimaryCareer.Engineer,
                            PrimaryCareer.MediaPR,
                            PrimaryCareer.Archaeologist
                        ]);
                    }
                    break;
            }
        }
        else {
            careers = [
                PrimaryCareer.MedicalFirstResponder,
                PrimaryCareer.AcademicResearcher,
                PrimaryCareer.MediaReporter
            ];

            if (character.hasSource(Source.LunaPDFreelancers)) {
                careers.push(...[
                    PrimaryCareer.Engineer,
                    PrimaryCareer.MediaPR,
                    PrimaryCareer.Archaeologist
                ]);
            }
        }

        careers = careers.filter(c => character.prohibitedPrimaryCareers.indexOf(c) === -1);

        return careers;
    }

    getCareersFromTableD() {
        var careers = [];

        if (character.faction === Faction.Brotherhood && character.hasSource(Source.Brotherhood)) {
            careers = [
                PrimaryCareer.Analyst,
                PrimaryCareer.Advisor,
                PrimaryCareer.Administrator,
                PrimaryCareer.Observer
            ];
        }
        else {
            careers = [
                PrimaryCareer.CorporateExecutive,
                PrimaryCareer.ShipCrew,
                PrimaryCareer.IntelligenceOperative,
            ];

            if (character.hasSource(Source.Cartel)) {
                careers.push(PrimaryCareer.Lobbyist);
                careers.push(PrimaryCareer.Consultant);
            }
        }

        careers = careers.filter(c => character.prohibitedPrimaryCareers.indexOf(c) === -1);

        return careers;
    }

    getCybertronicCareers() {
        switch (character.pillar) {
            case Pillar.TIFF_AEM:
                return [
                    PrimaryCareer.LAJ_TIFF,
                    PrimaryCareer.ETP_TIFF,
                    PrimaryCareer.ABC_TIFF,
                    PrimaryCareer.FEF_TIFF
                ];
            case Pillar.VAC_AEM:
                return [
                    PrimaryCareer.LAJ_VAC,
                    PrimaryCareer.ETP_VAC,
                    PrimaryCareer.ABC_VAC,
                    PrimaryCareer.FEF_VAC
                ];
            case Pillar.TIFF_RDM:
                return [
                    PrimaryCareer.ARD_TIFF,
                    PrimaryCareer.EPD_TIFF,
                    PrimaryCareer.CRI_TIFF,
                    PrimaryCareer.EDA_TIFF
                ];
            case Pillar.VAC_RDM:
                return [
                    PrimaryCareer.ARD_VAC,
                    PrimaryCareer.EPD_VAC,
                    PrimaryCareer.CRI_VAC,
                    PrimaryCareer.EDA_VAC
                ];
            case Pillar.TIFF_SWI:
                return [
                    PrimaryCareer.MCR_TIFF,
                    PrimaryCareer.IES_TIFF,
                    PrimaryCareer.APH_TIFF
                ];
            case Pillar.VAC_SWI:
                return [
                    PrimaryCareer.MCR_VAC,
                    PrimaryCareer.IES_VAC,
                    PrimaryCareer.APH_VAC
                ];
        }

        return null;
    }

    getTechnicalCareers(): PrimaryCareer[] {
        var careers = [];
        careers.push(PrimaryCareer.TechnicalRepairman);

        if ((character.faction === Faction.Whitestar && character.hasSource(Source.Whitestar)) ||
            (character.faction === Faction.Bauhaus && character.hasSource(Source.Bauhaus))) {
            switch (character.faction) {
                case Faction.Whitestar:
                    careers.push(PrimaryCareer.TechnicalFactoryWorkerWhitestar);
                    careers.push(PrimaryCareer.TechnicalPatchworkMekhanik);
                    careers.push(PrimaryCareer.TechnicalKuznets);
                    careers.push(PrimaryCareer.TechnicalInzhener);
                    break;
                case Faction.Bauhaus:
                    careers.push(PrimaryCareer.TechnicalDesigner);
                    careers.push(PrimaryCareer.TechnicalFactoryWorkerBauhaus);
                    careers.push(PrimaryCareer.TechnicalFieldMechanic);
                    careers.push(PrimaryCareer.TechnicalFreightDriver);
                    careers.push(PrimaryCareer.TechnicalPrecisionEngineer);
                    break;
            }
        }

        return careers;
    }

    getMilitaryCareers(): PrimaryCareer[] {
        var careers = [];
        careers.push(PrimaryCareer.MilitaryBasic);

        if ((character.faction === Faction.Whitestar && character.hasSource(Source.Whitestar)) ||
            (character.faction === Faction.Capitol && character.hasSource(Source.Capitol)) ||
            (character.faction === Faction.Imperial && character.hasSource(Source.Imperial)) ||
            (character.faction === Faction.Bauhaus && character.hasSource(Source.Bauhaus))) {
            switch (character.faction) {
                case Faction.Capitol:
                    careers.push(PrimaryCareer.MilitaryAirborneCavalry);
                    careers.push(PrimaryCareer.MilitaryCAFPilot);
                    break;
                case Faction.Whitestar:
                    careers.push(PrimaryCareer.PreservationMilitaryRegular);
                    careers.push(PrimaryCareer.PreservationMilitaryOfficer);
                    careers.push(PrimaryCareer.PreservationStreltsyGorodskiye);
                    careers.push(PrimaryCareer.PreservationStreltsyVyborniye);
                    careers.splice(0, 1); // No basic military
                    break;
                case Faction.Bauhaus:
                    if (character.status < Status.Nobility) {
                        careers.push(PrimaryCareer.MilitaryHussarRegular);
                        careers.push(PrimaryCareer.MilitaryArtilleryKorpsRegular);
                        careers.push(PrimaryCareer.MilitaryDragoonRegular);
                        careers.push(this.getGuardOrderRegular());
                    }
                    else {
                        careers.push(PrimaryCareer.MilitaryHussarOfficer);
                        careers.push(PrimaryCareer.MilitaryArtilleryKorpsOfficer);
                        careers.push(PrimaryCareer.MilitaryDragoonOfficer);
                        careers.push(this.getGuardOrderOfficer());
                    }
                    break;
                case Faction.Imperial:
                    careers.push(PrimaryCareer.MilitaryTrencher);
                    careers.push(PrimaryCareer.MilitaryReservist);
                    careers.push(PrimaryCareer.MilitaryGreyGhost);
                    careers.push(PrimaryCareer.MilitaryWolfbairn);
                    careers.push(PrimaryCareer.MilitaryClanRegiment);
                    break;
            }
        }

        return careers;
    }

    getMedicalCareers(): PrimaryCareer[] {
        var careers = [];
        careers.push(PrimaryCareer.MedicalFirstResponder);
        return careers;
    }

    getMediaCareers(): PrimaryCareer[] {
        var careers = [];
        careers.push(PrimaryCareer.MediaReporter);

        if (character.hasSource(Source.LunaPDFreelancers)) {
            careers.push(PrimaryCareer.MediaPR);
            careers.push(PrimaryCareer.Archaeologist);
        }

        if ((character.faction === Faction.Capitol && character.hasSource(Source.Capitol))) {
            switch (character.faction) {
                case Faction.Capitol:
                    careers.push(PrimaryCareer.MediaFashionDesigner);
                    careers.push(PrimaryCareer.MediaPhotographer);
                    careers.push(PrimaryCareer.MediaPoliticalCampaigner);
                    careers.push(PrimaryCareer.MediaRadioJockey);
                    careers.push(PrimaryCareer.MediaTalentAgent);
                    break;
            }
        }

        return careers;
    }

    getAcademicCareers(): PrimaryCareer[] {
        var careers = [];
        careers.push(PrimaryCareer.AcademicResearcher);

        if ((character.faction === Faction.Imperial && character.hasSource(Source.Imperial))) {
            switch (character.faction) {
                case Faction.Imperial:
                    careers.push(PrimaryCareer.AcademicSolicitor);
                    break;
            }
        }

        return careers;
    }

    getAthleteCareers(): PrimaryCareer[] {
        var careers = [];
        careers.push(PrimaryCareer.AthletePrizeFighter);
        careers.push(PrimaryCareer.AthleteSportsman);
        careers.push(PrimaryCareer.AthleteStuntMan);
        return careers;
    }

    getRuralCareers(): PrimaryCareer[] {
        var careers = [PrimaryCareer.FarmerFrontiersman];
        
        if (character.faction === Faction.Bauhaus && character.hasSource(Source.Bauhaus)) {
            careers.push(PrimaryCareer.RuralDrover);
            careers.push(PrimaryCareer.RuralLumberman);
            careers.push(PrimaryCareer.RuralScout);
        }

        return careers;
    }

    getPoliceCareers(): PrimaryCareer[] {
        var careers = [PrimaryCareer.PoliceBeatCop];

        if (character.faction === Faction.Capitol && character.hasSource(Source.Capitol)) {
            careers.push(PrimaryCareer.PoliceAIPO);
            careers.push(PrimaryCareer.PoliceBodyguard);
            careers.push(PrimaryCareer.PolicePrivateInvestigator);
        }

        return careers;
    }

    getCareer(career: PrimaryCareer) {
        var model = new PrimaryCareerViewModel(career, this._careers[career]);
        this.configureCareer(model);
        return model;
    }

    applyCareer(career: PrimaryCareer) {
        var c = this.getCareer(career);

        if (character.careers.length === 1) {
            for (var i = 0; i < c.attributes.length; i++) {
                character.attributes[i].value += c.attributes[i];
            }
        }

        let careerCounter = 0;
        character.careers.forEach(c => {
            if (c.career === career) {
                careerCounter++;
            }
        });

        if (careerCounter === 1) {
            c.equipment.forEach(eq => {
                if (eq.indexOf('|') === -1) {
                    character.addEquipment(eq);
                }
            });
        }

        if (c.earnings > character.earnings) {
            character.earnings = c.earnings;
        }

        switch (career) {
            case PrimaryCareer.Accountant:
            case PrimaryCareer.FEF_TIFF:
                character.assets += 5;
                break;
            case PrimaryCareer.FEF_VAC:
                character.assets += 3;
                break;
            case PrimaryCareer.Pilgrim:
                character.superPoints++;
                break;
            case PrimaryCareer.OrderOfTheWolfOfficer:
            case PrimaryCareer.OrderOfTheWolfRegular:
                character.careerEvents.push(new CareerEventModel(new EventModel("", "", "Gained a contact in the House of Romanov")));
                break;
            case PrimaryCareer.OrderOfTheCondorOfficer:
            case PrimaryCareer.OrderOfTheCondorRegular:
                character.careerEvents.push(new CareerEventModel(new EventModel("", "", "Gained a contact in the House of Saglielli")));
                break;
            case PrimaryCareer.OrderOfTheDragonOfficer:
            case PrimaryCareer.OrderOfTheDragonRegular:
                character.careerEvents.push(new CareerEventModel(new EventModel("", "", "Gained a contact in the House of Richthausen")));
                break;
            case PrimaryCareer.OrderOfTheBearOfficer:
            case PrimaryCareer.OrderOfTheBearRegular:
                character.careerEvents.push(new CareerEventModel(new EventModel("", "", "Gained a contact in the House of Bernheim")));
                break;
            case PrimaryCareer.OrderOfTheGriffinOfficer:
            case PrimaryCareer.OrderOfTheGriffinRegular:
                character.careerEvents.push(new CareerEventModel(new EventModel("", "", "Gained a contact in the House of Giraud")));
                break;
            case PrimaryCareer.OrderOfTheUnicornOfficer:
            case PrimaryCareer.OrderOfTheUnicornRegular:
                character.careerEvents.push(new CareerEventModel(new EventModel("", "", "Gained a contact in the House of Fieldhausen")));
                break;
            case PrimaryCareer.OrderOfTheSpiderOfficer:
            case PrimaryCareer.OrderOfTheSpiderRegular:
                character.careerEvents.push(new CareerEventModel(new EventModel("", "", "Gained a contact in the House of Salvatore")));
                character.careerEvents.push(new CareerEventModel(new EventModel("", "", "You may choose to increase your Expertise and Focus on any skill test, at a price: the first time this is done, the character must attempt an Average D1 Willpower test or suffer a mental assault. The difficulty of this test increases by one for each use after the first, until the character rests for at least eight hours, at which point the test difficulty resets to Average D1.")));
                break;
            case PrimaryCareer.MilitaryWolfbairn:
                character.careerEvents.push(new CareerEventModel(new EventModel("", "", "You are a member of the Wolf Packs and have broken all ties to your clan and family.")));
                break;
        }

        character.firstCareerCostReduction = 0; // Reset
        character.rollTwoCareers = false;
    }

    private configureCareer(career: PrimaryCareerViewModel) {
        if (character.faction === Faction.Whitestar && character.hasSource(Source.Whitestar)) {
            switch (career.id) {
                case PrimaryCareer.PoliceBeatCop:
                    career.name = "Preservation (Politsiya)";
                    break;
                case PrimaryCareer.MedicalFirstResponder:
                    career.name = "Preservation (Medical - First Responder)";
                    break;
                case PrimaryCareer.AcademicResearcher:
                    career.name = "Renewal (Academic - Researcher)";
                    break;
                case PrimaryCareer.MediaReporter:
                    career.name = "Preservation (Media - Reporter)";
                    break;
                case PrimaryCareer.CorporateExecutive:
                    career.name = "Governance (Corporate Executive)";
                    break;
            }
        }

        if (character.hasTalent("Mystic")) {
            if (career.elective.indexOf(Skill.Mysticism) === -1) {
                career.elective.push(Skill.Mysticism);
            }
        }
    }

    private generateCapitolCareerFromTableA(roll: number) {
        switch (roll) {
            case 1: return [PrimaryCareer.Unemployed];
            case 2: {
                roll = Math.floor(Math.random() * 6) + 1;
                switch (roll) {
                    case 1:
                    case 2: return [PrimaryCareer.CorporateWorker, PrimaryCareer.Cabbie];
                    case 3: return [PrimaryCareer.Accountant];
                    case 4: return [PrimaryCareer.Attorney];
                    case 5: return [PrimaryCareer.Salesman];
                    case 6: return [PrimaryCareer.Secretary]; 
                }
            }
            case 3: return [PrimaryCareer.TechnicalRepairman];
            case 4: return [PrimaryCareer.FarmerFrontiersman];
            case 5: {
                roll = Math.floor(Math.random() * 6) + 1;
                switch (roll) {
                    case 1:
                    case 2: return [PrimaryCareer.AthleteSportsman];
                    case 3:
                    case 4: return [PrimaryCareer.AthletePrizeFighter];
                    case 5: 
                    case 6: return [PrimaryCareer.AthleteStuntMan];
                }
            }
            case 6: return this.generateCapitolCareerFromTableB(Math.floor(Math.random() * 6) + 1);
        }
    }

    private generateCapitolCareerFromTableB(roll: number) {
        switch (roll) {
            case 1:
            case 2:
            case 3: {
                roll = Math.floor(Math.random() * 6) + 1;
                switch (roll) {
                    case 1:
                    case 2:
                    case 3: return [PrimaryCareer.MilitaryBasic];
                    case 4:
                    case 5: return [PrimaryCareer.MilitaryAirborneCavalry];
                    case 6: return [PrimaryCareer.MilitaryCAFPilot];
                }
            }
            case 4: 
            case 5: {
                roll = Math.floor(Math.random() * 6) + 1;
                switch (roll) {
                    case 1:
                    case 2:
                    case 3: return [PrimaryCareer.PoliceBeatCop, PrimaryCareer.PoliceCIO, PrimaryCareer.PoliceFRO, PrimaryCareer.PoliceRiot, PrimaryCareer.PoliceTSO];
                    case 4: return [PrimaryCareer.PoliceAIPO, PrimaryCareer.PoliceCIO, PrimaryCareer.PoliceFRO, PrimaryCareer.PoliceRiot, PrimaryCareer.PoliceTSO];
                    case 5: return [PrimaryCareer.PoliceBodyguard, PrimaryCareer.PoliceCIO, PrimaryCareer.PoliceFRO, PrimaryCareer.PoliceRiot, PrimaryCareer.PoliceTSO];
                    case 6: return [PrimaryCareer.PolicePrivateInvestigator, PrimaryCareer.PoliceCIO, PrimaryCareer.PoliceFRO, PrimaryCareer.PoliceRiot, PrimaryCareer.PoliceTSO];
                }
            }
            case 6: return [PrimaryCareer.Criminal];
        }
    }

    private generateCapitolCareerFromTableC(roll: number) {
        switch (roll) {
            case 1: 
            case 2: return [PrimaryCareer.MedicalFirstResponder, PrimaryCareer.Engineer, PrimaryCareer.Bodyguard];
            case 3:
            case 4: return [PrimaryCareer.AcademicResearcher, PrimaryCareer.Lobbyist];
            case 5: 
            case 6: {
                roll = Math.floor(Math.random() * 6) + 1;
                switch (roll) {
                    case 1: return [PrimaryCareer.MediaReporter, PrimaryCareer.MediaPR, PrimaryCareer.Archaeologist, PrimaryCareer.CartelInvestigator];
                    case 2: return [PrimaryCareer.MediaRadioJockey, PrimaryCareer.MediaPR];
                    case 3: return [PrimaryCareer.MediaTalentAgent, PrimaryCareer.MediaPR];
                    case 4: return [PrimaryCareer.MediaPhotographer, PrimaryCareer.MediaPR];
                    case 5: return [PrimaryCareer.MediaFashionDesigner, PrimaryCareer.MediaPR];
                    case 6: return [PrimaryCareer.MediaPoliticalCampaigner, PrimaryCareer.MediaPR];
                }
            }
        }
    }

    private generateWhitestarCareerFromTableA(roll: number) {
        switch (roll) {
            case 1: return [PrimaryCareer.Unemployed];
            case 2: {
                roll = Math.floor(Math.random() * 6) + 1;
                switch (roll) {
                    case 1:
                    case 2: return [PrimaryCareer.CorporateWorker, PrimaryCareer.Cabbie];
                    case 3: return [PrimaryCareer.OrganisationAdministrator];
                    case 4: return [PrimaryCareer.OrganisationAllotmentMinister];
                    case 5: return [PrimaryCareer.OrganisationFacilitiesDivisor];
                    case 6: return [PrimaryCareer.OrganisationCommissioner]; 
                }
            }
            case 3: {
                roll = Math.floor(Math.random() * 6) + 1;
                switch (roll) {
                    case 1:
                    case 2: return [PrimaryCareer.TechnicalRepairman];
                    case 3: return [PrimaryCareer.TechnicalFactoryWorkerWhitestar];
                    case 4: return [PrimaryCareer.TechnicalPatchworkMekhanik];
                    case 5: return [PrimaryCareer.TechnicalKuznets];
                    case 6: return [PrimaryCareer.TechnicalInzhener]; 
                }
            }
            case 4: {
                roll = Math.floor(Math.random() * 6) + 1;
                switch (roll) {
                    case 1:
                    case 2:
                    case 3: return [PrimaryCareer.FarmerFrontiersman];
                    case 4: return [PrimaryCareer.GatheringOkhotnik];
                    case 5: return [PrimaryCareer.GatheringRazvedchik];
                    case 6: return [PrimaryCareer.GatheringPilot];
                }
            }
            case 5: return this.getCareersFromTableA();
            case 6: return this.generateCapitolCareerFromTableB(Math.floor(Math.random() * 6) + 1);
        }
    }

    private generateWhitestarCareerFromTableB(roll: number) {
        switch (roll) {
            case 1:
            case 2:
            case 3: {
                roll = Math.floor(Math.random() * 6) + 1;
                switch (roll) {
                    case 1:
                    case 2:
                    case 3: return [PrimaryCareer.PreservationMilitaryRegular];
                    case 4: return [PrimaryCareer.PreservationMilitaryOfficer];
                    case 5: return [PrimaryCareer.PreservationStreltsyGorodskiye];
                    case 6: return [PrimaryCareer.PreservationStreltsyVyborniye];
                }
            }
            case 4: 
            case 5: return [PrimaryCareer.PoliceBeatCop];
            case 6: return [PrimaryCareer.Criminal];
        }
    }

    private generateBauhausCareerFromTableA(roll: number) {
        switch (roll) {
            case 1: {
                if (character.status === Status.Thrall) {
                    return [PrimaryCareer.Unemployed];
                }
                else {
                    roll = Math.floor(Math.random() * 6) + 1;
                    switch (roll) {
                        case 1: return [PrimaryCareer.StudentMilitary];
                        case 2: return [PrimaryCareer.StudentMedia];
                        case 3: return [PrimaryCareer.StudentBusiness];
                        case 4: return [PrimaryCareer.StudentTechnical];
                        case 5:
                        case 6: return [PrimaryCareer.Pilgrim];
                    }
                }
                break;
            }
            case 2: return [PrimaryCareer.CorporateWorker];
            case 3: {
                roll = Math.floor(Math.random() * 6) + 1;
                switch (roll) {
                    case 1: return [PrimaryCareer.TechnicalRepairman];
                    case 2: return [PrimaryCareer.TechnicalFreightDriver];
                    case 3: return [PrimaryCareer.TechnicalFactoryWorkerBauhaus];
                    case 4: return [PrimaryCareer.TechnicalFieldMechanic];
                    case 5: return [PrimaryCareer.TechnicalPrecisionEngineer];
                    case 6: return [PrimaryCareer.TechnicalDesigner];
                }
            }
            case 4: {
                roll = Math.floor(Math.random() * 6) + 1;
                switch (roll) {
                    case 1:
                    case 2:
                    case 3: return [PrimaryCareer.FarmerFrontiersman];
                    case 4: return [PrimaryCareer.RuralDrover];
                    case 5: return [PrimaryCareer.RuralScout];
                    case 6: return [PrimaryCareer.RuralLumberman];
                }
            }
            case 5: return this.getCareersFromTableA();
            case 6: return this.generateBauhausCareerFromTableB(Math.floor(Math.random() * 6) + 1);
        }
    }

    private generateBauhausCareerFromTableB(roll: number) {
        switch (roll) {
            case 1:
            case 2:
            case 3: {
                roll = Math.floor(Math.random() * 6) + 1;
                switch (roll) {
                    case 1:
                    case 2:
                    case 3: return character.status < Status.Nobility ? [PrimaryCareer.MilitaryHussarRegular] : [PrimaryCareer.MilitaryHussarOfficer];
                    case 4: return character.status < Status.Nobility ? [...this.getGuardOrderRegular()] : [...this.getGuardOrderOfficer()];
                    case 5: return character.status < Status.Nobility ? [PrimaryCareer.MilitaryArtilleryKorpsRegular] : [PrimaryCareer.MilitaryArtilleryKorpsOfficer];
                    case 6: return character.status < Status.Nobility ? [PrimaryCareer.MilitaryDragoonRegular] : [PrimaryCareer.MilitaryDragoonOfficer];
                }
            }
            case 4:
            case 5: return [PrimaryCareer.PoliceBeatCop];
            case 6: return [PrimaryCareer.Criminal];
        }
    }

    private canStudyMilitary() {
        return !(character.education === 4 || character.education === 7 || character.education === 13 ||
            character.hasPrimaryCareer(PrimaryCareer.MilitaryHussarRegular) ||
            character.hasPrimaryCareer(PrimaryCareer.MilitaryHussarOfficer) ||
            character.hasPrimaryCareer(PrimaryCareer.MilitaryGuardOrderRegular) ||
            character.hasPrimaryCareer(PrimaryCareer.OrderOfTheBearRegular) ||
            character.hasPrimaryCareer(PrimaryCareer.OrderOfTheCondorRegular) ||
            character.hasPrimaryCareer(PrimaryCareer.OrderOfTheDragonRegular) ||
            character.hasPrimaryCareer(PrimaryCareer.OrderOfTheGriffinRegular) ||
            character.hasPrimaryCareer(PrimaryCareer.OrderOfTheSpiderRegular) ||
            character.hasPrimaryCareer(PrimaryCareer.OrderOfTheUnicornRegular) ||
            character.hasPrimaryCareer(PrimaryCareer.OrderOfTheWolfRegular) ||
            character.hasPrimaryCareer(PrimaryCareer.MilitaryGuardOrderOfficer) ||
            character.hasPrimaryCareer(PrimaryCareer.OrderOfTheBearOfficer) ||
            character.hasPrimaryCareer(PrimaryCareer.OrderOfTheCondorOfficer) ||
            character.hasPrimaryCareer(PrimaryCareer.OrderOfTheDragonOfficer) ||
            character.hasPrimaryCareer(PrimaryCareer.OrderOfTheGriffinOfficer) ||
            character.hasPrimaryCareer(PrimaryCareer.OrderOfTheSpiderOfficer) ||
            character.hasPrimaryCareer(PrimaryCareer.OrderOfTheUnicornOfficer) ||
            character.hasPrimaryCareer(PrimaryCareer.OrderOfTheWolfOfficer) ||
            character.hasPrimaryCareer(PrimaryCareer.MilitaryArtilleryKorpsRegular) ||
            character.hasPrimaryCareer(PrimaryCareer.MilitaryArtilleryKorpsOfficer) ||
            character.hasPrimaryCareer(PrimaryCareer.MilitaryDragoonRegular) ||
            character.hasPrimaryCareer(PrimaryCareer.MilitaryDragoonOfficer))
    }

    private canStudyMedia() {
        return !(character.education === 6 || character.education === 12 ||
            character.hasPrimaryCareer(PrimaryCareer.MediaReporter));
    }

    private canStudyBusiness() {
        return !(character.education === 3 || character.education === 8 || character.education === 14 ||
            character.hasPrimaryCareer(PrimaryCareer.CorporateExecutive) ||
            character.hasPrimaryCareer(PrimaryCareer.CorporateWorker));
    }

    private canStudyTechnical() {
        return !(character.education === 1 || character.education === 5 || character.education === 10 || character.education === 11 ||
            character.hasPrimaryCareer(PrimaryCareer.TechnicalDesigner) ||
            character.hasPrimaryCareer(PrimaryCareer.TechnicalFactoryWorkerBauhaus) ||
            character.hasPrimaryCareer(PrimaryCareer.TechnicalFieldMechanic) ||
            character.hasPrimaryCareer(PrimaryCareer.TechnicalFreightDriver) ||
            character.hasPrimaryCareer(PrimaryCareer.TechnicalPrecisionEngineer) ||
            character.hasPrimaryCareer(PrimaryCareer.ShipCrew));
    }

    private getGuardOrderRegular() {
        switch (character.house) {
            case 17: return [PrimaryCareer.OrderOfTheWolfRegular];
            case 20: return [PrimaryCareer.OrderOfTheCondorRegular];
            case 18: return [PrimaryCareer.OrderOfTheDragonRegular];
            case 19: return [PrimaryCareer.OrderOfTheBearRegular];
            case 11: return [PrimaryCareer.OrderOfTheGriffinRegular];
            case 7: return [PrimaryCareer.OrderOfTheUnicornRegular];
            case 9: return [PrimaryCareer.OrderOfTheSpiderRegular];
        }

        return [PrimaryCareer.MilitaryGuardOrderRegular];
    }

    private getGuardOrderOfficer() {
        switch (character.house) {
            case 17: return [PrimaryCareer.OrderOfTheWolfOfficer];
            case 20: return [PrimaryCareer.OrderOfTheCondorOfficer];
            case 18: return [PrimaryCareer.OrderOfTheDragonOfficer];
            case 19: return [PrimaryCareer.OrderOfTheBearOfficer];
            case 11: return [PrimaryCareer.OrderOfTheGriffinOfficer];
            case 7: return [PrimaryCareer.OrderOfTheUnicornOfficer];
            case 9: return [PrimaryCareer.OrderOfTheSpiderOfficer];
        }

        return [PrimaryCareer.MilitaryGuardOrderOfficer];
    }

    private generateImperialCareerFromTableB(roll: number) {
        switch (roll) {
            case 1:
            case 2:
            case 3: {
                roll = Math.floor(Math.random() * 6) + 1;
                switch (roll) {
                    case 1: return [PrimaryCareer.MilitaryBasic];
                    case 2: return [PrimaryCareer.MilitaryTrencher];
                    case 3: return [PrimaryCareer.MilitaryReservist];
                    case 4: return [PrimaryCareer.MilitaryWolfbairn];
                    case 5: return [PrimaryCareer.MilitaryGreyGhost];
                    case 6: return [PrimaryCareer.MilitaryClanRegiment];
                }
            }
            case 4:
            case 5: {
                roll = Math.floor(Math.random() * 6) + 1;
                switch (roll) {
                    case 1:
                    case 2:
                    case 3: return [PrimaryCareer.PoliceBeatCop, PrimaryCareer.PoliceCIO, PrimaryCareer.PoliceFRO, PrimaryCareer.PoliceRiot, PrimaryCareer.PoliceTSO];
                    case 4: return [PrimaryCareer.PoliceAIPO, PrimaryCareer.PoliceCIO, PrimaryCareer.PoliceFRO, PrimaryCareer.PoliceRiot, PrimaryCareer.PoliceTSO];
                    case 5: return [PrimaryCareer.PoliceBodyguard, PrimaryCareer.PoliceCIO, PrimaryCareer.PoliceFRO, PrimaryCareer.PoliceRiot, PrimaryCareer.PoliceTSO];
                    case 6: return [PrimaryCareer.PolicePrivateInvestigator, PrimaryCareer.PoliceCIO, PrimaryCareer.PoliceFRO, PrimaryCareer.PoliceRiot, PrimaryCareer.PoliceTSO];
                }
            }
            case 6: return [PrimaryCareer.Criminal];
        }
    }

    private generateImperialCareerFromTableC(roll: number) {
        switch (roll) {
            case 1:
            case 2: return [PrimaryCareer.MedicalFirstResponder, PrimaryCareer.Engineer, PrimaryCareer.Bodyguard];
            case 3:
            case 4: {
                roll = Math.floor(Math.random() * 6) + 1;
                switch (roll) {
                    case 1:
                    case 2:
                    case 3:
                        return [PrimaryCareer.AcademicResearcher, PrimaryCareer.Lobbyist];
                    case 4:
                    case 5:
                    case 6:
                        return [PrimaryCareer.AcademicSolicitor, PrimaryCareer.Lobbyist];
                }
            }
            case 5:
            case 6: {
                roll = Math.floor(Math.random() * 6) + 1;
                switch (roll) {
                    case 1: return [PrimaryCareer.MediaReporter, PrimaryCareer.MediaPR, PrimaryCareer.Archaeologist, PrimaryCareer.CartelInvestigator];
                    case 2: return [PrimaryCareer.MediaRadioJockey, PrimaryCareer.MediaPR];
                    case 3: return [PrimaryCareer.MediaTalentAgent, PrimaryCareer.MediaPR];
                    case 4: return [PrimaryCareer.MediaPhotographer, PrimaryCareer.MediaPR];
                    case 5: return [PrimaryCareer.MediaFashionDesigner, PrimaryCareer.MediaPR];
                    case 6: return [PrimaryCareer.MediaPoliticalCampaigner, PrimaryCareer.MediaPR];
                }
            }
        }
    }
}

export const PrimaryCareersHelper = new PrimaryCareers();