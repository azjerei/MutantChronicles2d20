import {character} from '../common/character';
import {Skill} from './skills';
import {Attribute} from './attributes';
import {Faction} from './factions';
import {PrimaryCareer, PrimaryCareersHelper} from './primaryCareers';
import {TalentModel, TalentsHelper} from './talents';
import {EquipmentHelper} from './equipment';
import {Pillar} from './pillars';
import {Status} from './status';
import {Timeline} from './timelines';
import {Source} from './sources';

export enum Education {
    // Core
    GrewUpOnTheStreets,
    TechnicalOTJTraining,
    RuralColonialEducation,
    ClericalEducation,
    TeenageDraft,
    TechnicalPreCareerTraining,
    CreativePreCareerTraining,
    MilitaryAcademy,
    ManagerialExperience,
    BrotherhoodEducated,
    PostGraduateTechnical,
    PostGraduateScientific,
    CreativeEducation,
    OfficerTrained,
    ManagerialEducation,
    BrotherhoodApprenticeship,

    // Capitol
    SchoolOfHardKnocks,
    TheFamilyBusiness,
    SportsFanatic,
    AthleticScholarship,

    // Mishima
    TaughtByASage,
    BushidoTraining,
    TempleUpbringing,

    // Imperial
    Galway,
    Stratford,
    Langfrey,
    Wexford,
    Hampshire,
    Serenitys,
    Mercy,
    LunaMemorial,
    Cardinals,
    NewBristol,
    Paxton,
    SerenitysMilitaryCollegeStd,
    SerenitysMilitaryCollegeElite,
    IIT,
    Babbage,
    RollStandard,
    RollElite
}

class EducationModel {
    name: string;
    description: string;
    attributes: number[];
    mandatory: Skill[];
    elective: Skill[];
    talents: Skill[];
    equipment: string[];
    freeCareers: PrimaryCareer[];
    factions: Faction[];

    constructor(name: string, description: string, attributes: number[], mandatory: Skill[], elective: Skill[], talents: Skill[], equipment: string[], careers: PrimaryCareer[], factions: Faction[]) {
        this.name = name;
        this.description = description;
        this.attributes = attributes;
        this.mandatory = mandatory;
        this.elective = elective;
        this.talents = talents;
        this.equipment = equipment;
        this.freeCareers = careers;
        this.factions = factions;
    }
}

export class EducationViewModel extends EducationModel {
    id: Education;

    constructor(id: Education, base: EducationModel) {
        super(base.name, base.description, base.attributes, base.mandatory, base.elective, base.talents, base.equipment, base.freeCareers, base.factions);
        this.id = id;
    }
}

export class Educations {
    private _educations: { [id: number]: EducationModel } = {
        [Education.GrewUpOnTheStreets]: new EducationModel(
            "Grew up on the streets",
            "You got by on the streets, kept your head down, and learned how to survive on your wits.",
            [1,1,1,0,1,0,2,2],
            [Skill.Survival, Skill.Resistance, Skill.Willpower, Skill.Stealth, Skill.Observation],
            [Skill.CloseCombat, Skill.Athletics, Skill.Lifestyle],
            [Skill.Survival, Skill.Resistance, Skill.Willpower, Skill.Stealth, Skill.Observation],
            [],
            [PrimaryCareer.Criminal],
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar]
        ),
        [Education.TechnicalOTJTraining]: new EducationModel(
            "Technical 'On the  job' Training",
            "The vast majority of blue collar employees are trained with a faded copy of a health and safety manual and the tirades of their supervisor. Along the way, they often learn to keep an eye open and bend the rules on occasion.",
            [1,2,1,2,0,0,1,1],
            [Skill.Education, Skill.Mechanics, Skill.Observation, Skill.Pilot, Skill.Thievery],
            [Skill.CloseCombat, Skill.Lifestyle, Skill.Survival],
            [Skill.Education, Skill.Mechanics, Skill.Observation, Skill.Pilot, Skill.Thievery],
            [
                "Basic Repair Kit",
            ],
            [...PrimaryCareersHelper.getTechnicalCareers()],
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar]
        ),
        [Education.RuralColonialEducation]: new EducationModel(
            "Rural/Colonial Education",
            "Whether raised on a giant agribusiness or out on the frontier, scraping by collecting animal samples for the genebanks there are many open spaces if you know where to look. Often ignored, the rural colonies are home to the quick and hardy. Specialists such as K9 Handlers and Venusian Marshals often have such humble backgrounds.",
            [2,2,1,1,0,0,1,1],
            [Skill.Education, Skill.Mechanics, Skill.Pilot, Skill.Survival, Skill.Resistance],
            [Skill.AnimalHandling, Skill.Athletics, Skill.Observation],
            [Skill.Education, Skill.Mechanics, Skill.Pilot, Skill.Survival, Skill.Resistance],
            [
                "Basic Regional Survival Kit",
            ],
            [PrimaryCareer.FarmerFrontiersman],
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar]
        ),
        [Education.ClericalEducation]: new EducationModel(
            "Clerical Education",
            "Many billions of people across the system spend their working lives in office cubicles, toiling away to perform the basic service and administrative tasks necessary to keep even small parts of the massive corporations running. It is a humble background, and one that many people share, as little beyond basic numeracy, literacy, and the ability to follow simple instructions is required for such roles.",
            [1,1,1,1,2,2,0,0],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Stealth, Skill.Persuade],
            [Skill.Willpower, Skill.Thievery, Skill.Pilot],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Stealth, Skill.Persuade],
            [
                "Suit of corporate quality clothing",
            ],
            [PrimaryCareer.CorporateWorker],
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar]
        ),
        [Education.TeenageDraft]: new EducationModel(
            "Teenage Draft",
            "You lucked out. The army decided that you were ideal for its purposes; you and half a million others were conscripted out of school. If you were lucky, you were assigned to policing one of the more recently pacified colonies. Failing that, you enjoyed a life of drudgery and pointless drills.",
            [1,1,1,0,1,0,2,2],
            [Skill.Athletics, Skill.CloseCombat, Skill.Education, Skill.RangedWeapons, Skill.Survival],
            [Skill.Acrobatics, Skill.Resistance, Skill.Willpower],
            [Skill.Athletics, Skill.CloseCombat, Skill.Education, Skill.RangedWeapons, Skill.Survival],
            [
                "Light military shoulder pads",
                "Set of regular quality military fatigues"
            ],
            [...PrimaryCareersHelper.getMilitaryCareers()],
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar]
        ),
        [Education.TechnicalPreCareerTraining]: new EducationModel(
            "Technical Pre-career Training",
            "Whether from an apprenticeship, or from a specialist technical college, you studied your chosen craft for some time before you began your first real job, and entered the workforce with valuable skills.",
            [1,2,2,3,0,0,1,1],
            [Skill.Education, Skill.Mechanics, Skill.Pilot, Skill.Lifestyle, Skill.Observation],
            [Skill.Space, Skill.Treatment, Skill.Survival],
            [Skill.Education, Skill.Mechanics, Skill.Pilot, Skill.Lifestyle, Skill.Observation],
            [
                "Basic First Aid Kit|Basic Tool Kit",
            ],
            [...PrimaryCareersHelper.getMedicalCareers(), PrimaryCareer.ShipCrew, ...PrimaryCareersHelper.getTechnicalCareers()],
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar]
        ),
        [Education.CreativePreCareerTraining]: new EducationModel(
            "Creative Pre-career Training",
            "You were always artistic as a child, and that internship, or the year you spent at that art college, was a valuable way to learn how to express yourself even better.",
            [1,2,1,2,0,3,1,0],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Willpower, Skill.Persuade],
            [Skill.Insight, Skill.Pilot, Skill.Mechanics],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Willpower, Skill.Persuade],
            [
                "Media Kit",
            ],
            [...PrimaryCareersHelper.getMediaCareers()],
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar]
        ),
        [Education.MilitaryAcademy]: new EducationModel(
            "Military Academy",
            "Your childhood was one of rigorous discipline, learning the military way of doing things. You are likely to end up a soldier as a result, but many jobs within the corporations suit someone who is fit, driven, and accustomed to following orders.",
            [1,0,1,0,3,1,2,2],
            [Skill.Education, Skill.CloseCombat, Skill.Observation, Skill.Acrobatics, Skill.Athletics],
            [Skill.RangedWeapons, Skill.Resistance, Skill.Willpower],
            [Skill.Education, Skill.CloseCombat, Skill.Observation, Skill.Acrobatics, Skill.Athletics, Skill.RangedWeapons],
            [
                "Light military shoulder pads",
                "Set of corporate quality dress military uniform"
            ],
            [...PrimaryCareersHelper.getMilitaryCareers()],
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar]
        ),
        [Education.ManagerialExperience]: new EducationModel(
            "Management Experience",
            "Entering the workforce through one of countless management training schemes is a common way to bypass the drudgery of working your way up from the bottom.",
            [1,2,1,1,2,3,0,0],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Willpower, Skill.Persuade],
            [Skill.Command, Skill.Thievery, Skill.Stealth],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Willpower, Skill.Persuade, Skill.Command],
            [
                "Good-quality smart business attire",
            ],
            [PrimaryCareer.CorporateExecutive],
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar]
        ),
        [Education.BrotherhoodEducated]: new EducationModel(
            "Brotherhood Educated",
            "The Brotherhood runs numerous prestigious academies, offering an education that produces disciplined, learned individuals to contribute to the well- being of society. These schools are technically free, offering only placements to those who meet their criteria for a scholarship, but are very limited in spaces. Often a student application is accompanied by a large tithe to the Brotherhood.",
            [1,2,0,2,3,1,1,0],
            [Skill.Education, Skill.Willpower, Skill.Persuade, Skill.Observation, Skill.Resistance],
            [Skill.Insight, Skill.Athletics, Skill.CloseCombat],
            [Skill.Education, Skill.Willpower, Skill.Persuade, Skill.Observation, Skill.Resistance, Skill.Insight],
            [
                "Set of corporate qualit clothing",
                "Small symbol of the Brotherhood"
            ],
            [PrimaryCareer.CorporateWorker, PrimaryCareer.TechnicalRepairman, PrimaryCareer.FarmerFrontiersman, PrimaryCareer.MilitaryBasic, PrimaryCareer.PoliceBeatCop, PrimaryCareer.Criminal],
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar]
        ),
        [Education.PostGraduateTechnical]: new EducationModel(
            "Post Graduate Technical",
            "Extensive training in a particular technical field produces many of the specialists that society needs to continue functioning – doctors, engineers, and scientists. These highly-educated persons are invaluable, for it takes considerable dedication to reach such a level of training, let alone to thrive in the careers that follow this training.",
            [1,2,2,3,1,1,0,0],
            [Skill.Education, Skill.Lifestyle, Skill.Pilot, Skill.Mechanics, Skill.Treatment],
            [Skill.Space, Skill.Science, Skill.Medicine],
            [Skill.Education, Skill.Lifestyle, Skill.Pilot, Skill.Mechanics, Skill.Treatment, Skill.Science, Skill.Medicine],
            [
                "Mechanics Tool Kit|Laboratory (personal)",
            ],
            [...PrimaryCareersHelper.getAcademicCareers(), ...PrimaryCareersHelper.getMedicalCareers(), ...PrimaryCareersHelper.getTechnicalCareers()],
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar]
        ),
        [Education.PostGraduateScientific]: new EducationModel(
            "Post Graduate Scientific",
            "Extensive training in a particular technical field produces many of the specialists that society needs to continue functioning – doctors, engineers, and scientists. These highly-educated persons are invaluable, for it takes considerable dedication to reach such a level of training, let alone to thrive in the careers that follow this training.",
            [1, 2, 2, 3, 1, 1, 0, 0],
            [Skill.Education, Skill.Lifestyle, Skill.Pilot, Skill.Mechanics, Skill.Treatment],
            [Skill.Space, Skill.Science, Skill.Medicine],
            [Skill.Education, Skill.Lifestyle, Skill.Pilot, Skill.Mechanics, Skill.Treatment, Skill.Science, Skill.Medicine],
            [
                "Mechanics Tool Kit|Laboratory (personal)",
            ],
            [...PrimaryCareersHelper.getAcademicCareers(), ...PrimaryCareersHelper.getMedicalCareers(), ...PrimaryCareersHelper.getTechnicalCareers()],
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar]
        ),
        [Education.CreativeEducation]: new EducationModel(
            "Creative Education",
            "A few years at art school, or studying under a private teacher of whatever creative endeavours your talents best suit, have prepared you for a life of performance and creativity, where the limelight is seldom far away.",
            [1,2,1,2,0,3,1,0],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Persuade, Skill.Insight],
            [Skill.Linguistics, Skill.Mechanics, Skill.Pilot],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Persuade, Skill.Insight],
            [
                "Media Kit",
            ],
            [...PrimaryCareersHelper.getMediaCareers()],
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar]
        ),
        [Education.OfficerTrained]: new EducationModel(
            "Officer Training",
            "You have spent years of your life learning not only how to fight, but how to lead others to risk their lives in battle. Your commanding presence is considerable, and your training in how to handle life-or-death matters is as valuable in the boardroom as it is on the battlefield.",
            [0,0,1,1,2,3,2,1],
            [Skill.Education, Skill.Persuade, Skill.Observation, Skill.Athletics, Skill.Command],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Acrobatics],
            [Skill.Education, Skill.Persuade, Skill.Observation, Skill.Athletics, Skill.Command],
            [
                "Light military shoulder pads",
                "Set of military dress uniform",
                "FACTION_HANDGUN",
            ],
            [...PrimaryCareersHelper.getMilitaryCareers(), PrimaryCareer.CorporateExecutive],
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar]
        ),
        [Education.ManagerialEducation]: new EducationModel(
            "Managerial Education",
            "Years of hard work and knowing all the right people pay off – internships with an old associate or friend of the family’s firm, going to the right schools, belonging to the right exclusive societies, and having the right connections.",
            [1,2,1,1,2,3,0,0],
            [Skill.Education, Skill.Lifestyle, Skill.Willpower, Skill.Persuade, Skill.Command],
            [Skill.Insight, Skill.Thievery, Skill.Observation],
            [Skill.Education, Skill.Lifestyle, Skill.Willpower, Skill.Persuade, Skill.Command, Skill.Observation],
            [
                "Set of corporate quality business attire",
                "Set of fashionable clothing"
            ],
            [PrimaryCareer.CorporateExecutive],
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar]
        ),
        [Education.BrotherhoodApprenticeship]: new EducationModel(
            "Brotherhood Apprenticeship",
            "You were chosen at a young age by the Brotherhood, because you have a gift – you have the innate potential within you to master the Arts of the Light.You have spent your life in study and contemplation, mastering this hidden power within yourself so that you can serve the Cardinal’s vision.",
            [1,2,1,2,3,0,1,0],
            [Skill.Education, Skill.Observation, Skill.Willpower, Skill.Persuade, Skill.Mysticism],
            [Skill.Insight, Skill.Resistance, Skill.Athletics],
            [],
            [
                "Brotherhood symbol pendant",
                "Brotherhood robes",
                "Book of the Law"
            ],
            [...PrimaryCareersHelper.getAcademicCareers()],
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar]
        ),
        [Education.SchoolOfHardKnocks]: new EducationModel(
            "School of Hard Knocks",
            "You have had few chances for book learning and technical knowledge, but you are a savvy survivalist out of pure necessity. You are suspicious of others, particularly those who are educated, and you are constantly drifting from one situation to the next. Life comes to you one day at a time, and you have a knack for making your way with whatever comes to hand.",
            [1,2,1,1,0,0,2,1],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.Survival, Skill.Resistance],
            [Skill.RangedWeapons, Skill.Treatment, Skill.Mechanics],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.Survival, Skill.Resistance],
            [
                "Cudgel",
                "Piranha Handgun",
                "Basic Tool Kit"
            ],
            [PrimaryCareer.Criminal, ...PrimaryCareersHelper.getMilitaryCareers()],
            [Faction.Capitol]
        ),
        [Education.TheFamilyBusiness]: new EducationModel(
            "The 'Family' Business",
            "A criminal upbringing in a gang or other criminal network has given you thorough insight on how the world really works: dirty deals in shady back rooms, under the real threat of violence. More ruthless and conniving than most people, you have cultivated favours all your life, and gained more than a few unpleasant secrets of your own.",
            [1,2,1,1,0,2,0,1],
            [Skill.CloseCombat, Skill.Lifestyle, Skill.Mechanics, Skill.Observation, Skill.Thievery],
            [Skill.Insight, Skill.Persuade, Skill.RangedWeapons],
            [Skill.CloseCombat, Skill.Lifestyle, Skill.Mechanics, Skill.Observation, Skill.Thievery],
            [
                "Cudgel",
                "Slingshot Handgun",
                EquipmentHelper.getBEKits()
            ],
            [PrimaryCareer.Criminal, ...PrimaryCareersHelper.getMilitaryCareers()],
            [Faction.Capitol]
        ),
        [Education.SportsFanatic]: new EducationModel(
            "Sports Fanatic",
            "You know how to play every popular game and sport from across the solar system, and have a knack for remembering player’s names, scores, stats, and team histories. You have got the physical condition to match your obsession, and you played on several local teams. Your collection of sporting memorabilia is a source of envy or astonishment, but your fanaticism has left you without much of an academic side.",
            [1,1,1,0,0,1,2,2],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Resistance],
            [Skill.Observation, Skill.Pilot, Skill.UnarmedCombat],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons, Skill.Resistance],
            [
                "Sports padding",
                "Brass Knuckles",
                "Slingshot Handgun"
            ],
            [...PrimaryCareersHelper.getAthleteCareers(), ...PrimaryCareersHelper.getMilitaryCareers()],
            [Faction.Capitol]
        ),
        [Education.AthleticScholarship]: new EducationModel(
            "Athletic Scholarship",
            "You got into a good school, and have good prospects, but more because you are quick on your feet or because you have got a solid right hook than because of a particular aptitude for study. Still, you took the opportunity seriously, and studied hard to justify your place both as a student and as an athlete.",
            [2,0,1,1,1,1,2,2],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.Education, Skill.Resistance],
            [Skill.Mechanics, Skill.Willpower, Skill.UnarmedCombat],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.Education, Skill.Resistance],
            [
                "Sports padding",
                "Brass Knuckles",
                "Cudgel"
            ],
            [...PrimaryCareersHelper.getAthleteCareers(), ...PrimaryCareersHelper.getMilitaryCareers()],
            [Faction.Capitol]
        ),
        [Education.TaughtByASage]: new EducationModel(
            "Taught by a Sage",
            "Wandering sages often linger in communities to pass on their wisdom to others, and you were lucky enough to receive that wisdom. You spent much of your childhood studying at the feet of the wise and knowledgeable, giving you a far greater appreciation of the world than many of your peers.",
            [1,2,0,2,3,1,1,0],
            [Skill.Education, Skill.Observation, Skill.Persuade, Skill.Resistance, Skill.Willpower],
            [Skill.Athletics, Skill.CloseCombat, Skill.Insight],
            [Skill.Education, Skill.Observation, Skill.Persuade, Skill.Resistance, Skill.Willpower, Skill.Insight],
            [
                "One set of average-quality robes",
                "Small symbol of one of the Seven Sages"
            ],
            [PrimaryCareer.AcademicResearcher],
            [Faction.Mishima]
        ),
        [Education.BushidoTraining]: new EducationModel(
            "Bushido Training",
            "You spend your formative years learning the arts of blade and rifle, and studying the virtues that define the warrior lifestyle. Most keiretsu honour those who study warfare, and there are many opportunities for a skilled warrior to progress.",
            [2,0,1,0,2,1,2,2],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.Education, Skill.Observation],
            [Skill.RangedWeapons, Skill.Resistance, Skill.Willpower],
            [Skill.Acrobatics, Skill.Athletics, Skill.CloseCombat, Skill.Education, Skill.Observation, Skill.Willpower],
            [
                "Pair of light military shoulder pads",
                "One set of good quality smart business attire"
            ],
            [...PrimaryCareersHelper.getMilitaryCareers()],
            [Faction.Mishima]
        ),
        [Education.TempleUpbringing]: new EducationModel(
            "Temple Upbringing",
            "The character was raised not in a school or apprenticed to a master, but within one of numerous temples devoted to the Seven Sages’ teachings. Such samurai tend to focus far more closely on the virtues and ideals of existence, as espoused in those teachings, rather than on the minutia of business. While those raised in a temple are seldom likely to thrive in the boardroom, they are welcomed in the courts of many daimyo as warrior-scholars, and many eventually become Hatamoto.",
            [2,1,0,1,3,2,0,1],
            [Skill.CloseCombat, Skill.Education, Skill.Observation, Skill.Resistance, Skill.Willpower],
            [Skill.Athletics, Skill.Insight, Skill.UnarmedCombat],
            [Skill.CloseCombat, Skill.Education, Skill.Observation, Skill.Resistance, Skill.Willpower, Skill.Insight],
            [
                "One set of ornate robes",
                "Personal shrine devoted to one of the Seven Sages"
            ],
            [...PrimaryCareersHelper.getMilitaryCareers()],
            [Faction.Mishima]
        ),
        [Education.Galway]: new EducationModel(
            "Galway",
            "According to some – most notably Stratford alumni – Galway’s school motto is “We aren’t picky”. In a very real sense, this is true: Galway is required by law to accept any Imperial citizen who wishes to enrol. While this means that many of its students are those who were not accepted anywhere else, it also means that Galway has the single largest student body of any Imperial school.",
            [1, 2, 1, 2, 0, 2, 0, 1],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Athletics, Skill.Persuade],
            [Skill.Mechanics, Skill.Pilot, Skill.Willpower],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Athletics, Skill.Persuade],
            [
                "One suit of corporate quality clothing",
            ],
            [PrimaryCareer.CorporateWorker, PrimaryCareer.FarmerFrontiersman, ...PrimaryCareersHelper.getTechnicalCareers()],
            [Faction.Imperial]
        ),
        [Education.Stratford]: new EducationModel(
            "Stratford",
            "Of Imperial’s two universal liberal arts schools, Stratford University is by far the better, and it is the oldest of all Imperial schools. The humanities are heavily favoured at Stratford, as are the performing arts. Its acting troupes consistently put on award-winning productions of both classic and modern plays. If being cultured is important to you, then Stratford is the place to be.",
            [1, 2, 1, 2, 0, 3, 1, 0],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Persuade, Skill.Insight],
            [Skill.Linguistics, Skill.Mechanics, Skill.Pilot],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Persuade, Skill.Insight],
            [
                "Media kit",
            ],
            [...PrimaryCareersHelper.getMedicalCareers(), ...PrimaryCareersHelper.getAcademicCareers(), ...PrimaryCareersHelper.getMediaCareers()],
            [Faction.Imperial]
        ),
        [Education.Langfrey]: new EducationModel(  // TODO: include as Education for everybody (1 LP)
            "Langfrey",
            "Located on Luna, Langfrey is one of the few Imperial schools that accepts foreign students (albeit very rarely), meaning that its influence can be felt across the solar system. Langfrey is an excellent school, and one with alumni spread far and wide, though it struggles to compare to the other Imperial business school in the eyes of most Imperials.",
            [1, 2, 1, 2, 1, 2, 0, 0],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Persuade, Skill.Willpower],
            [Skill.Command, Skill.Stealth, Skill.Thievery],
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Persuade, Skill.Willpower, Skill.Command],
            [
                "Good quality smart business attire",
            ],
            [PrimaryCareer.CorporateWorker],
            [Faction.Imperial]
        ),
        [Education.Wexford]: new EducationModel(
            "Wexford",
            "If you have sufficient wealth, connections, or proven talent, then you can make it at Wexford. Growing out of Stratford University, the Wexford School of Business is the foremost way to make it in finance or economics. A degree from Wexford is sufficient to set a person up for life. More than eighty percent of the staff of Smythe, Smythe & Axelthorpe, including the entire board of directors, are Wexford alumni. It is reckoned that the majority of major business deals in Imperial are done through connections forged amongst graduates of this prestigious school.",
            [1, 2, 1, 3, 1, 2, 0, 0],
            [Skill.Education, Skill.Lifestyle, Skill.Persuade, Skill.Command, Skill.Willpower],
            [Skill.Insight, Skill.Linguistics, Skill.Observation],
            [Skill.Education, Skill.Lifestyle, Skill.Persuade, Skill.Command, Skill.Willpower, Skill.Observation],
            [
                "One set of corporate quality business attire",
                "One set of fashionable clothing"
            ],
            [PrimaryCareer.CorporateExecutive],
            [Faction.Imperial]
        ),
        [Education.Hampshire]: new EducationModel(
            "Hampshire",
            "Focussed primarily on internal and clan law, Hampshire College educates the majority of Imperial’s barristers and solicitors – the two main forms of lawyer within the Imperial legal system – as well as those who need a solid understanding of Imperial law for other professional reasons.",
            [1, 2, 1, 2, 1, 2, 0, 0],
            [Skill.Education, Skill.Observation, Skill.Insight, Skill.Persuade, Skill.Thievery],
            [Skill.Lifestyle, Skill.Linguistics, Skill.Command],
            [Skill.Education, Skill.Observation, Skill.Insight, Skill.Persuade, Skill.Thievery],
            [
                "One set of corporate quality clothing",
            ],
            [PrimaryCareer.CorporateWorker, ...PrimaryCareersHelper.getAcademicCareers()],
            [Faction.Imperial]
        ),
        [Education.Serenitys]: new EducationModel(
            "Serenity's",
            "Founded by Michael Murdoch, Imperial’s first High Serene Leader, Serenity’s School of Law has a strong reputation for producing some of the finest political minds in the solar system. As Imperial business practices are often regarded as controversial by the other corporations, a graduate of Serenity’s has a firm grounding not only in Imperial law, but also in the laws of the Cartel and other corporations. These graduates often find themselves working for the Cartel, or serving as intercorporate liaisons or diplomats, rather than engaged in the matters of civil or criminal law.",
            [1, 2, 1, 2, 1, 3, 0, 0],
            [Skill.Education, Skill.Persuade, Skill.Willpower, Skill.Insight, Skill.Observation],
            [Skill.Lifestyle, Skill.Command, Skill.Linguistics],
            [Skill.Education, Skill.Persuade, Skill.Willpower, Skill.Insight, Skill.Observation],
            [
                "One set of corporate quality business attire",
                "One set of fashionable clothing"
            ],
            [PrimaryCareer.CorporateExecutive, ...PrimaryCareersHelper.getAcademicCareers()],
            [Faction.Imperial]
        ),
        [Education.Mercy]: new EducationModel(
            "Mercy",
            "For countless generations, Clan Finn has been running Mercy Medical School and training doctors from all walks of life. While its founder, Martha Finn, was a prominent woman who brought her family into the Imperial fold, she was also a devout follower of the Brotherhood, who felt a need to provide doctors for a civilisation so threatened by the malign influence of Darkness.",
            [0, 1, 1, 2, 1, 2, 1, 1],
            [Skill.Education, Skill.Treatment, Skill.Persuade, Skill.Observation, Skill.Willpower],
            [Skill.Medicine, Skill.Psychotherapy, Skill.Insight],
            [Skill.Education, Skill.Treatment, Skill.Persuade, Skill.Observation, Skill.Willpower],
            [
                "Basic medkit",
            ],
            [...PrimaryCareersHelper.getMedicalCareers()],
            [Faction.Imperial]
        ),
        [Education.LunaMemorial]: new EducationModel(
            "Luna Memorial",
            "",
            [0, 1, 1, 2, 1, 2, 1, 1],
            [Skill.Education, Skill.Treatment, Skill.Persuade, Skill.Observation, Skill.Willpower],
            [Skill.Medicine, Skill.Psychotherapy, Skill.Insight],
            [Skill.Education, Skill.Treatment, Skill.Persuade, Skill.Observation, Skill.Willpower],
            [
                "Basic medkit",
            ],
            [...PrimaryCareersHelper.getMedicalCareers()],
            [Faction.Imperial]
        ),
        [Education.Cardinals]: new EducationModel(
            "Cardinal's",
            "Established by Cardinal Toth Alexander VIII for the citizens of Imperial, Cardinal’s Medical School is the more prestigious of Imperial’s medical schools, though this is more of a technicality. Certainly, Cardinal’s graduates are more technically accomplished, but their training is focussed far more on research and study than on care. Amongst other things, this means that their bedside manner leaves something to be desired. However, as part of a Brotherhood edict, Cardinal’s has limited access to information about the Dark Legion, allowing its students and researchers to study the influence of the Darkness and its plagues upon body and mind.",
            [1, 2, 1, 3, 2, 1, 0, 0],
            [Skill.Education, Skill.Science, Skill.Treatment, Skill.Observation, Skill.Willpower],
            [Skill.Medicine, Skill.Psychotherapy, Skill.Mysticism],
            [Skill.Education, Skill.Science, Skill.Treatment, Skill.Observation, Skill.Willpower, Skill.Medicine],
            [
                "Advanced medkit|Personal laboratory",
            ],
            [...PrimaryCareersHelper.getAcademicCareers(), ...PrimaryCareersHelper.getMedicalCareers()],
            [Faction.Imperial]
        ),
        [Education.NewBristol]: new EducationModel(
            "New Bristol",
            "The primary defence school of the Ministry of War, the overwhelming majority of New Bristol graduates enter the defence forces upon finishing their studies. New Bristol is a vast school, as is only fitting for a school that serves the Imperial need for a large military.",
            [1, 0, 1, 0, 2, 1, 2, 2],
            [Skill.Education, Skill.CloseCombat, Skill.Observation, Skill.Acrobatics, Skill.Athletics],
            [Skill.RangedWeapons, Skill.Willpower, Skill.Resistance],
            [Skill.Education, Skill.CloseCombat, Skill.Observation, Skill.Acrobatics, Skill.Athletics, Skill.RangedWeapons],
            [
                "Light military shoulder pads",
                "One corporate quality dress military uniform"
            ],
            [...PrimaryCareersHelper.getMilitaryCareers()],
            [Faction.Imperial]
        ),
        [Education.Paxton]: new EducationModel(
            "Paxton",
            "Paxton is a school for the elite. Almost every member of any of Imperial’s special forces, and a significant proportion of all Imperial military officers, are trained there, either during their youth, or for additional training as an adult. At Paxton, students are taught every way there is to defeat every foe that Imperial has ever faced.",
            [1, 0, 2, 0, 1, 3, 1, 2],
            [Skill.Athletics, Skill.Education, Skill.Observation, Skill.Persuade, Skill.Willpower],
            [Skill.CloseCombat, Skill.Command, Skill.RangedWeapons],
            [Skill.Athletics, Skill.Education, Skill.Observation, Skill.Persuade, Skill.Willpower, Skill.CloseCombat, Skill.Command, Skill.RangedWeapons],
            [
                "Light military shoulder pads",
                "One military dress uniform",
                "Aggressor Handgun"
            ],
            [...PrimaryCareersHelper.getMilitaryCareers()],
            [Faction.Imperial]
        ),
        [Education.SerenitysMilitaryCollegeStd]: new EducationModel(
            "Serenity's Military College",
            "",
            [1, 0, 1, 0, 2, 1, 2, 2],
            [Skill.Education, Skill.CloseCombat, Skill.Observation, Skill.Acrobatics, Skill.Athletics],
            [Skill.RangedWeapons, Skill.Willpower, Skill.Resistance],
            [Skill.Education, Skill.CloseCombat, Skill.Observation, Skill.Acrobatics, Skill.Athletics, Skill.RangedWeapons],
            [
                "Light military shoulder pads",
                "One corporate quality dress military uniform"
            ],
            [...PrimaryCareersHelper.getMilitaryCareers()],
            [Faction.Imperial]
        ),
        [Education.SerenitysMilitaryCollegeElite]: new EducationModel(
            "Serenity's Military College",
            "",
            [1, 0, 2, 0, 1, 3, 1, 2],
            [Skill.Athletics, Skill.Education, Skill.Observation, Skill.Persuade, Skill.Willpower],
            [Skill.CloseCombat, Skill.Command, Skill.RangedWeapons],
            [Skill.Athletics, Skill.Education, Skill.Observation, Skill.Persuade, Skill.Willpower, Skill.CloseCombat, Skill.Command, Skill.RangedWeapons],
            [
                "Light military shoulder pads",
                "One military dress uniform",
                "Aggressor Handgun"
            ],
            [...PrimaryCareersHelper.getMilitaryCareers()],
            [Faction.Imperial]
        ),
        [Education.IIT]: new EducationModel(
            "IIT",
            "The Imperial Institute of Technology focuses primarily on teaching engineers and practical scientists to turn theories and speculation in to something that is useful to humans. IIT consistently produces Imperial’s best engineers and technicians, sufficient to rival those of any other corporation barring Cybertronic.",
            [0, 1, 2, 3, 0, 1, 1, 1],
            [Skill.Education, Skill.Mechanics, Skill.Science, Skill.Lifestyle, Skill.Observation],
            [Skill.Space, Skill.Pilot, Skill.Survival],
            [Skill.Education, Skill.Mechanics, Skill.Science, Skill.Lifestyle, Skill.Observation, Skill.Pilot, Skill.Space],
            [
                "Basic scientific kit|Basic tool kit",
            ],
            [...PrimaryCareersHelper.getTechnicalCareers(), PrimaryCareer.ShipCrew],
            [Faction.Imperial]
        ),
        [Education.Babbage]: new EducationModel(
            "Babbage",
            "Babbage College is the stereotype of an ivory tower, right down to the alabaster walls that surround this scientific retreat deep within the asteroid belt. The men and women who attend this institution are almost entirely isolated from the real world, and have little opportunity to make contact with the rest of the solar system – not that they would want to. Purity of thought – insofar as it concerns the pursuit of scientific and technological progress, while remaining within the edicts of the Brotherhood – reigns supreme at Babbage, and all else is considered secondary.",
            [1, 2, 2, 3, 1, 0, 1, 0],
            [Skill.Education, Skill.Observation, Skill.Mechanics, Skill.Science, Skill.Treatment],
            [Skill.Space, Skill.Linguistics, Skill.Pilot],
            [Skill.Education, Skill.Observation, Skill.Mechanics, Skill.Science, Skill.Treatment],
            [
                "Mechanic's tool kit|Personal laboratory",
            ],
            [...PrimaryCareersHelper.getAcademicCareers(), ...PrimaryCareersHelper.getTechnicalCareers()],
            [Faction.Imperial]
        ),
        [Education.RollStandard]: new EducationModel(
            "Roll standard school",
            "",
            [],
            [],
            [],
            [],
            [],
            [],
            [Faction.Imperial]
        ),
        [Education.RollElite]: new EducationModel(
            "Roll elite school",
            "",
            [],
            [],
            [],
            [],
            [],
            [],
            [Faction.Imperial]
        ),
        //[Education.GrewUpOnTheStreets]: new EducationModel(
        //    "",
        //    "",
        //    [],
        //    [Skill., Skill., Skill., Skill., Skill.],
        //    [Skill., Skill., Skill.],
        //    [Skill.],
        //    [
        //        "",
        //    ],
        //    [PrimaryCareer.],
        //    [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Mishima, Faction.Capitol, Faction.Bauhaus, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar],
        //),
    };

    getEducationsFromTableA() {
        if (character.heritage === Faction.Capitol && character.hasSource(Source.Capitol)) {
            return [
                Education.SchoolOfHardKnocks,
                Education.TheFamilyBusiness,
                Education.SportsFanatic,
                Education.TechnicalOTJTraining,
                Education.RuralColonialEducation,
                Education.ClericalEducation,
                Education.TeenageDraft,
            ];
        }
        else {
            var educations = [
                Education.GrewUpOnTheStreets,
                Education.TechnicalOTJTraining,
                Education.RuralColonialEducation,
                Education.ClericalEducation,
                Education.TeenageDraft,
            ];

            if (character.heritage === Faction.Bauhaus && character.status !== Status.Thrall &&
                character.hasSource(Source.Bauhaus)) {
                educations.splice(0, 1);
            }

            return educations;
        }
    }

    getEducationsFromTableB() {
        var edus = [
            Education.TechnicalPreCareerTraining,
            Education.CreativePreCareerTraining,
            Education.MilitaryAcademy,
            Education.ManagerialExperience
        ];

        if (character.faction !== Faction.Cybertronic &&
            character.timeline !== Timeline.DarkSymmetry) {
            edus.push(Education.BrotherhoodEducated);
        }

        return edus;
    }

    getEducationsFromTableC() {
        var edus = [
            Education.PostGraduateTechnical,
            Education.PostGraduateScientific,
            Education.CreativeEducation,
            Education.OfficerTrained,
            Education.ManagerialEducation
        ];

        if (character.faction !== Faction.Cybertronic &&
            character.timeline !== Timeline.DarkSymmetry) {
            edus.push(Education.BrotherhoodApprenticeship);
        }

        return edus;
    }

    getCybertronicEducations() {
        var edus = [];
        switch (character.pillar) {
            case Pillar.TIFF_AEM:
            case Pillar.VAC_AEM:
                edus = [
                    { education: Education.ClericalEducation, cost: 1 },
                    { education: Education.TechnicalPreCareerTraining, cost: 1 },
                    { education: Education.ManagerialExperience, cost: 1 },
                    { education: Education.ManagerialEducation, cost: 2 },
                    { education: Education.PostGraduateTechnical, cost: 2 },
                ];
                break;
            case Pillar.TIFF_RDM:
            case Pillar.VAC_RDM:
                edus = [
                    { education: Education.TechnicalOTJTraining, cost: 1 },
                    { education: Education.RuralColonialEducation, cost: 1 },
                    { education: Education.TechnicalPreCareerTraining, cost: 1 },
                    { education: Education.CreativePreCareerTraining, cost: 1 },
                    { education: Education.PostGraduateTechnical, cost: 2 },
                    { education: Education.CreativeEducation, cost: 2 },
                ];
                break;
            case Pillar.TIFF_SWI:
            case Pillar.VAC_SWI:
                edus = [
                    { education: Education.ClericalEducation, cost: 1 },
                    { education: Education.TeenageDraft, cost: 1 },
                    { education: Education.MilitaryAcademy, cost: 1 },
                    { education: Education.OfficerTrained, cost: 2 },
                ];
                break;
        }

        return edus;
    }

    getCommonerEducations() {
        return [
            Education.TechnicalPreCareerTraining,
            Education.CreativePreCareerTraining,
            Education.TeenageDraft,
            Education.RuralColonialEducation,
            Education.TechnicalOTJTraining,
            Education.ClericalEducation,
            Education.TaughtByASage
        ];
    }

    getSamuraiEducations() {
        return [
            Education.ManagerialExperience,
            Education.PostGraduateTechnical,
            Education.BushidoTraining,
            Education.OfficerTrained,
            Education.PostGraduateScientific,
            Education.TempleUpbringing
        ];
    }

    getEducation(education: Education) {
        return this._educations[education];
    }

    generateEducationFromTableA(): Education[] {
        var roll = Math.floor(Math.random() * 6) + 1;
        var n = 0;

        var candidates = this.getEducationsFromTableA();

        if ((character.heritage === Faction.Capitol && character.hasSource(Source.Capitol)) ||
            (character.heritage === Faction.Bauhaus && character.hasSource(Source.Bauhaus))) {
            switch (character.heritage) {
                case Faction.Capitol: {
                    switch (roll) {
                        case 1: {
                            roll = Math.floor(Math.random() * 6) + 1;
                            switch (roll) {
                                case 1:
                                case 2: return [Education.SchoolOfHardKnocks];
                                case 3:
                                case 4: return [Education.TheFamilyBusiness];
                                case 5:
                                case 6: return [Education.SportsFanatic];
                            }
                            break;
                        }
                        case 2: return [Education.TechnicalOTJTraining];
                        case 3: return [Education.RuralColonialEducation];
                        case 4: return [Education.ClericalEducation];
                        case 5: return [Education.TeenageDraft];
                        case 6: return candidates;
                    }
                }
                case Faction.Bauhaus: {
                    switch (roll) {
                        case 1: return character.status === Status.Thrall ? [Education.GrewUpOnTheStreets] : this.generateEducationFromTableA();
                        case 2: return [Education.TechnicalOTJTraining];
                        case 3: return [Education.RuralColonialEducation];
                        case 4: return [Education.ClericalEducation];
                        case 5: return [Education.TeenageDraft];
                        case 6: return candidates;
                    }
                }
                default: {
                    switch (roll) {
                        case 1: return [Education.GrewUpOnTheStreets];
                        case 2: return [Education.TechnicalOTJTraining];
                        case 3: return [Education.RuralColonialEducation];
                        case 4: return [Education.ClericalEducation];
                        case 5: return [Education.TeenageDraft];
                        case 6: return candidates;
                    }
                }
            }
        }
        else {
            switch (roll) {
                case 1: return [Education.GrewUpOnTheStreets];
                case 2: return [Education.TechnicalOTJTraining];
                case 3: return [Education.RuralColonialEducation];
                case 4: return [Education.ClericalEducation];
                case 5: return [Education.TeenageDraft];
                case 6: return candidates;
            }
        }

        return [];
    }

    generateEducationFromTableB(): Education[] {
        var roll = Math.floor(Math.random() * 6) + 1;
        var n = 0;

        switch (roll) {
            case 1:
                return character.heritage === Faction.Capitol && character.hasSource(Source.Capitol)
                ? [Education.AthleticScholarship]
                : [Education.TechnicalPreCareerTraining];
            case 2: return [Education.TechnicalPreCareerTraining];
            case 3: return [Education.CreativePreCareerTraining];
            case 4: return [Education.MilitaryAcademy];
            case 5: return [Education.ManagerialExperience];
            case 6:
                return character.heritage === Faction.Cybertronic
                    ? [Education.TechnicalPreCareerTraining]
                    : [Education.BrotherhoodEducated];
        }

        return [];
    }

    generateEducationFromTableC(): Education[] {
        var roll = Math.floor(Math.random() * 6) + 1;
        var n = 0;

        switch (roll) {
            case 1: return [Education.PostGraduateTechnical];
            case 2: return [Education.PostGraduateScientific];
            case 3: return [Education.CreativeEducation];
            case 4: return [Education.OfficerTrained];
            case 5: return [Education.ManagerialEducation];
            case 6:
                return character.heritage === Faction.Cybertronic
                    ? [Education.PostGraduateTechnical]
                    : [Education.BrotherhoodApprenticeship];
        }

        return [];
    }

    generateCybertronicEducation() {
        const roll = Math.floor(Math.random() * 6) + 1;

        switch (roll) {
            case 1:
                if (character.pillar === Pillar.TIFF_AEM || character.pillar === Pillar.VAC_AEM) return Education.ClericalEducation;
                if (character.pillar === Pillar.TIFF_RDM || character.pillar === Pillar.VAC_RDM) return Education.TechnicalOTJTraining;
                if (character.pillar === Pillar.TIFF_SWI || character.pillar === Pillar.VAC_SWI) return Education.ClericalEducation;
                break;
            case 2:
                if (character.pillar === Pillar.TIFF_AEM || character.pillar === Pillar.VAC_AEM) return Education.ClericalEducation;
                if (character.pillar === Pillar.TIFF_RDM || character.pillar === Pillar.VAC_RDM) return Education.RuralColonialEducation;
                if (character.pillar === Pillar.TIFF_SWI || character.pillar === Pillar.VAC_SWI) return Education.TeenageDraft;
                break;
            case 3:
                if (character.pillar === Pillar.TIFF_AEM || character.pillar === Pillar.VAC_AEM) return Education.TechnicalPreCareerTraining;
                if (character.pillar === Pillar.TIFF_RDM || character.pillar === Pillar.VAC_RDM) return Education.TechnicalPreCareerTraining;
                if (character.pillar === Pillar.TIFF_SWI || character.pillar === Pillar.VAC_SWI) return Education.TeenageDraft;
                break;
            case 4:
                if (character.pillar === Pillar.TIFF_AEM || character.pillar === Pillar.VAC_AEM) return Education.ManagerialExperience;
                if (character.pillar === Pillar.TIFF_RDM || character.pillar === Pillar.VAC_RDM) return Education.CreativePreCareerTraining;
                if (character.pillar === Pillar.TIFF_SWI || character.pillar === Pillar.VAC_SWI) return Education.MilitaryAcademy;
                break;
            case 5:
                if (character.pillar === Pillar.TIFF_AEM || character.pillar === Pillar.VAC_AEM) return Education.ManagerialEducation;
                if (character.pillar === Pillar.TIFF_RDM || character.pillar === Pillar.VAC_RDM) return Education.PostGraduateTechnical;
                if (character.pillar === Pillar.TIFF_SWI || character.pillar === Pillar.VAC_SWI) return Education.MilitaryAcademy;
                break;
            case 6:
                if (character.pillar === Pillar.TIFF_AEM || character.pillar === Pillar.VAC_AEM) return Education.PostGraduateTechnical;
                if (character.pillar === Pillar.TIFF_RDM || character.pillar === Pillar.VAC_RDM) return Education.CreativeEducation;
                if (character.pillar === Pillar.TIFF_SWI || character.pillar === Pillar.VAC_SWI) return Education.OfficerTrained;
                break;
        }

        return null;
    }

    generateCommonerEducation() {
        const roll = Math.floor(Math.random() * 11) + 2;

        switch (roll) {
            case 2: 
            case 12: return this.getCommonerEducations();
            case 3: 
            case 10: return [Education.TechnicalPreCareerTraining];
            case 4: return [Education.CreativePreCareerTraining];
            case 5: 
            case 9: return [Education.TeenageDraft];
            case 6: return [Education.RuralColonialEducation];
            case 7: return [Education.TechnicalOTJTraining];
            case 8: return [Education.ClericalEducation];
            case 11: return [Education.TaughtByASage];
        }

        return null;
    }

    generateSamuraiEducation() {
        const roll = Math.floor(Math.random() * 11) + 2;

        switch (roll) {
            case 2:
            case 12: return this.getSamuraiEducations();
            case 3:
            case 5:
            case 7:
            case 10: return [Education.ManagerialExperience];
            case 4: return [Education.PostGraduateTechnical];
            case 6: return [Education.BushidoTraining];
            case 8: return [Education.OfficerTrained];
            case 9: return [Education.PostGraduateScientific];
            case 11: return [Education.TempleUpbringing];
        }

        return null;
    }

    applyEducation(education: Education) {
        var edu = this.getEducation(education);

        for (var i = 0; i < edu.attributes.length; i++) {
            character.attributes[i].value += edu.attributes[i];
        }

        if (education === Education.BrotherhoodApprenticeship) {
            character.addTalent("Mystic");
            character.addTalent("Brother");
            character.addTalent("Book of Law");

            character.removeTalent("Under the Radar");
            character.removeTalent("Vassal of Mishima");
            character.removeTalent("Shareholder of Capitol");
            character.removeTalent("Subject of Bauhaus");
            character.removeTalent("Kinsman of Imperial");
            character.removeTalent("Employee of Cybertronic");
            character.removeTalent("Tovarich of Whitestar");

            if (character.hasSource(Source.Brotherhood)) {
                character.freeCareers = []; // Clear any previous, non-BH careers
            }

            character.faction = Faction.Brotherhood;
        }

        if (character.hasSource(Source.Cybertronic)) {
            if (character.faction !== Faction.Cybertronic) {
                edu.freeCareers.forEach(c => {
                    character.addFreeCareer(c);
                });
            }
        }
        else {
            edu.freeCareers.forEach(c => {
                character.addFreeCareer(c);
            });
        }

        if (character.faction === Faction.Whitestar &&
            character.earnings > 0 &&
            character.hasSource(Source.Whitestar)) {
            if (character.status >= Status.ThoseWhoGovern) {
                edu.equipment.push("Iron Hand Autopistol|Zhivotnoye Infantry Weapon");
            }
            else {
                edu.equipment.push("Zhivotnoye Infantry Weapon");
            }

            edu.equipment.push("Combat Helmet");
            edu.equipment.push("Bulletproof Vest");

            if (edu.equipment.indexOf("Light military shoulder pads") === -1) {
                edu.equipment.push("Light military shoulder pads");
            }

            PrimaryCareersHelper.getMilitaryCareers().forEach(c => {
                character.addFreeCareer(c);
            });
        }
        else if (character.faction === Faction.Bauhaus &&
            character.status >= Status.Commoner &&
            character.status <= Status.NobleElectorHouse &&
            character.hasSource(Source.Bauhaus)) {
            edu.equipment.push("Combat Helmet");
            edu.equipment.push("Bulletproof Vest");
            edu.equipment.push("AG-11 Assault Rifle");
            edu.equipment.push("Light military shoulder pads");
            character.addFreeCareer(character.status < Status.Nobility ? PrimaryCareer.MilitaryHussarRegular : PrimaryCareer.MilitaryHussarOfficer);
        }

        edu.equipment.forEach((e, i) => {
            if (e.indexOf('|') === -1) {
                character.addEquipment(e);
            }
        });
    }
}

export const EducationsHelper = new Educations();