import {character} from '../common/character';
import {Skill, SkillsHelper} from './skills';
import {Source} from './sources';
//import {Clan} from './clans';

interface ITalentPrerequisite {
    isPrerequisiteFulfilled(): boolean;
}

class TalentPrerequisite implements ITalentPrerequisite {
    private talent: string;

    constructor(talent: string) {
        this.talent = talent;
    }

    isPrerequisiteFulfilled() {
        var found = false;
        for (var talent in character.talents) {
            if (talent === this.talent) {
                found = true;
                break;
            }
        }

        return found;
    }
}

class TalentRankPrerequisite implements ITalentPrerequisite {
    private talent: string;
    private rank: number;

    constructor(talent: string, rank: number) {
        this.talent = talent;
        this.rank = rank;
    }

    isPrerequisiteFulfilled() {
        var found = false;
        for (var talent in character.talents) {
            var t = character.talents[talent];
            if (talent === this.talent && t.rank >= this.rank) {
                found = true;
                break;
            }
        }

        return found;
    }
}

class VariableTalentPrerequisite implements ITalentPrerequisite {
    private talent1: string;
    private talent2: string;

    constructor(talent1: string, talent2: string) {
        this.talent1 = talent1;
        this.talent2 = talent2;
    }

    isPrerequisiteFulfilled() {
        var found = false;
        for (var talent in character.talents) {
            if (talent === this.talent1 || talent === this.talent2) {
                found = true;
                break;
            }
        }

        return found;
    }
}

class VariableTalentsPrerequisite implements ITalentPrerequisite {
    private talents: string[];

    constructor(talents: string[]) {
        this.talents = talents;
    }

    isPrerequisiteFulfilled() {
        for (var talent in character.talents) {
            if (this.talents.indexOf(talent) > -1) {
                return true;
            }
        }

        return false;
    }
}

class ExpertisePrerequisite implements ITalentPrerequisite {
    private skill: Skill;
    private value: number;

    constructor(skill: Skill, value: number) {
        this.skill = skill;
        this.value = value;
    }

    isPrerequisiteFulfilled() {
        return character.skills[this.skill].expertise >= this.value;
    }
}

class FocusPrerequisite implements ITalentPrerequisite {
    private skill: Skill;
    private value: number;

    constructor(skill: Skill, value: number) {
        this.skill = skill;
        this.value = value;
    }

    isPrerequisiteFulfilled() {
        return character.skills[this.skill].focus >= this.value;
    }
}

class FactionPrerequisite implements ITalentPrerequisite {
    faction: number;

    constructor(faction: number) {
        this.faction = faction;
    }

    isPrerequisiteFulfilled() {
        return character.faction === this.faction;
    }
}

class VariableFactionPrerequisite implements ITalentPrerequisite {
    factions: number[];

    constructor(factions: number[]) {
        this.factions = factions;
    }

    isPrerequisiteFulfilled() {
        this.factions.forEach(f => {
            if (f === character.faction) {
                return true;
            }
        });

        return false;
    }
}

class EducationPrerequisite implements ITalentPrerequisite {
    education: number;

    constructor(education: number) {
        this.education = education;
    }

    isPrerequisiteFulfilled() {
        return character.education === this.education;
    }
}

class LearnArtPrerequisite implements ITalentPrerequisite {
    constructor() {
    }

    isPrerequisiteFulfilled() {
        return character.education === 15 || character.canLearnArt() || character.includeMysticTalent;
    }
}

class MysticPrerequisite implements ITalentPrerequisite {
    constructor() {
    }

    isPrerequisiteFulfilled() {
        if (!character.isMystic()) {
            for (var talent in character.talents) {
                if (talent.indexOf("Minoris") > -1) {
                    return false;
                }
            }
        }

        return true;
    }
}

class SourcePrerequisite implements ITalentPrerequisite {
    private source: Source;

    constructor(source: Source) {
        this.source = source;
    }

    isPrerequisiteFulfilled() {
        return character.hasSource(this.source);
    }
}

class AnyClanPrerequisite implements ITalentPrerequisite {
    private clans: number[];

    constructor(clans: number[]) {
        this.clans = clans;
    }

    isPrerequisiteFulfilled() {
        return this.clans.indexOf(character.clan) > -1;
    }
}

export class TalentModel {
    name: string;
    description: string;
    prerequisites: ITalentPrerequisite[];
    maxRank: number;

    constructor(name: string, desc: string, prerequisites: ITalentPrerequisite[], maxRank: number) {
        this.name = name;
        this.description = desc;
        this.prerequisites = prerequisites;
        this.maxRank = maxRank;
    }
}

export class TalentViewModel {
    id: string;
    name: string;
    rank: number;
    description: string;

    constructor(name: string, rank: number, showRank: boolean, description: string, skill: Skill) {
        this.id = name;
        this.description = description;
        this.name = name;

        if (showRank) {
            this.name += ' [Rank: ' + rank + ']';
        }

        if (skill !== Skill.None) {
            this.name += ' (' + SkillsHelper.getSkillName(skill) + ')';
        }
    }
}

export enum TalentSpecial {
    MaximumRanks_EducationFocus = -1,
    MaximumRanks_ScienceFocus = -2,
    MaximumRanks_SurvivalFocus = -3
}

export class Talents {
    private _talents: { [skill: number]: TalentModel[] } = {
        [Skill.Acrobatics]: [
            new TalentModel(
                "Graceful",
                "The character may re-roll one d20 when making an Acrobatics test, but must accept the new result.",
                [new ExpertisePrerequisite(Skill.Acrobatics, 1)],
                1),
            new TalentModel(
                "Catfall",
                "The character has learned to take advantage of wind resistance and surface conditions when making a landing. For every rank of Catfall, the character can reduce the distance fallen, when calculating damage, by three metres (one floor).",
                [new TalentPrerequisite("Strong Legs"), new ExpertisePrerequisite(Skill.Acrobatics, 2)],
                3),
            new TalentModel(
                "Roll With It",
                "When the character is targeted by a melee attack, or a ranged attack with the Blast quality, and fails a Dodge Response Action, he gains additional [DS] Soak equal to the character’s Acrobatics Focus.",
                [new TalentPrerequisite("Catfall")],
                1),
            new TalentModel(
                "Free Runner",
                "A Free Runner trains to recognise the environment and let his body move naturally in response to it, taking advantage of the terrain’s effects. A character with this talent may ignore all effects of moving through difficult terrain. This does not include hazardous terrain.",
                [new TalentPrerequisite("Graceful")],
                1),
            new TalentModel(
                "Hard Target",
                "Characters with the Hard Target talent are constantly in motion and difficult to hit with ranged attacks. When they make a Dodge Response Action, each rank of Hard Target counts as an additional point of Acrobatics Focus, possibly increasing the focus range beyond its normal limits.",
                [new TalentPrerequisite("Graceful")],
                3),
            new TalentModel(
                "Uncanny Dodge",
                "The character has a natural sense for when his life might be endangered. He may make a Dodge Response Action against any ranged attacks, including ones he might not have any reason to know about.",
                [new TalentPrerequisite("Hard Target"), new ExpertisePrerequisite(Skill.Acrobatics, 2)],
                1),
            new TalentModel(
                "Strong Legs",
                "Characters who intensely train their lower leg muscles and learn to coordinate their body can leap extraordinary distances. When making an Acrobatics test to jump, the character reduces the difficulty by one rank. This may eliminate the need for the skill test.",
                [new TalentPrerequisite("Graceful")],
                1),
        ],
        [Skill.AnimalHandling]: [
            new TalentModel(
                "Empathetic",
                "The character has spent much of his life in the company of animals. He can quickly recognise personality quirks and identify the sources of distress. On any Animal Handling test where the character generates at least one success, he may immediately roll an additional number of dice equal to his ranks of Empathetic. Any successes generated on these additional dice are added to the initial success total and Repercussions on these additional dice may be ignored.",
                [new ExpertisePrerequisite(Skill.AnimalHandling, 1)],
                3),
            new TalentModel(
                "Recognise Cues",
                "The character has come to recognise when an animal is reacting to the environment. Any time the character is in the company of animals and needs to make an Observation test, he may substitute his Animal Handling skill instead.",
                [new TalentPrerequisite("Empathetic")],
                1),
            new TalentModel(
                "Firm Command",
                "The character has worked with animals that are resistant to training. Any time the character attempts to direct an animal to take an action that goes against its instinct or training – including if the animal is in service of another – any DSPs paid to add extra dice to the skill test add two d20s to the dice pool, instead of one.",
                [new TalentPrerequisite("Regonise Cues"), new ExpertisePrerequisite(Skill.AnimalHandling, 2)],
                1),
            new TalentModel(
                "Smells Right",
                "Some characters spend so much time among animals that they learn to blend in with other animals naturally. Any time the character encounters a new animal, he may make an Average D1 Animal Handling test as a Restricted Action. On success, the animal immediately considers him to be a friend. If the target is a guard animal, it does not alert its handlers to the character’s presence.",
                [new TalentPrerequisite("Firm Command")],
                1),
            new TalentModel(
                "Strong Rider",
                "The character is particularly adept at riding mounts. When making a skill test to ride an animal, the character reduces the difficulty by one rank. This may eliminate the need for the skill check.",
                [new TalentPrerequisite("Empathetic")],
                1),
            new TalentModel(
                "Symbiosis",
                "The character is particularly adept at recognising the needs of his animal companions. Any time the character succeeds at a Survival test, he automatically also finds adequate food and shelter for his animal companions. Note that their presence does not increase the difficulty of the test for characters with this talent.",
                [new TalentPrerequisite("Empathetic")],
                1),
            new TalentModel(
                "Animal Healer",
                "Any time the character is called upon to make a Treatment or Medicine test upon an animal, he may instead substitute his Animal Handling skill. Characters with this talent may also substitute their Animal Handling skill for Treatment tests upon humans, but increase the difficulty of any such tests by one rank.",
                [new TalentPrerequisite("Symbiosis"), new ExpertisePrerequisite(Skill.AnimalHandling, 2)],
                1),
        ],
        [Skill.Athletics]: [
            new TalentModel(
                "Rigorous Training",
                "The character is exceptionally athletic and nearly as gifted as professional sportsmen. For each rank of Rigorous Training, a character generates one additional success on any Athletics test that generates at least one success.",
                [new ExpertisePrerequisite(Skill.Athletics, 1)],
                3),
            new TalentModel(
                "Leverage",
                "The character is able to perform feats of strength that seem at odds with his physique, due to a combination of training and expertise. On any test to lift or move an inanimate object where the character generates at least one success, he may immediately roll an additional number of d20s equal to his rank of Leverage. Any successes generated on these additional dice are added to the initial success total and Repurcussions on these additional dice may be ignored.",
                [new TalentPrerequisite("Rigorous Training")],
                3),
            new TalentModel(
                "Irresistible Force",
                "The character gains the weapon quality Knockdown on all melee attacks.",
                [new TalentPrerequisite("Leverage"), new ExpertisePrerequisite(Skill.Athletics, 2)],
                1),
            new TalentModel(
                "Strong Grip",
                "The character never drops or surrenders an object unless he has chosen to do so. He is immune to Disarm actions taken against him.",
                [new TalentPrerequisite("Irresistible Force")],
                1),
            new TalentModel(
                "Strong Swimmer",
                "The character is a prodigious swimmer. He reduces the difficulty of any swimming test by one step per rank of Strong Swimmer. This may eliminate the need for the skill test.",
                [new TalentPrerequisite("Rigorous Training")],
                3),
            new TalentModel(
                "Cliff Dweller",
                "The character has spent a significant portion of his life in an environment that involves a great deal of climbing, often in the presence of sheer drops. He is very comfortable acting in these environments and never suffers from vertigo or fear of heights. In addition, he may reduce the difficulty of any climbing test by one step. This may eliminate the need for the skill test.",
                [new TalentPrerequisite("Rigorous Training")],
                1),
            new TalentModel(
                "Wall Crawler",
                "The character has learned to climb comfortably using only his body, even while carrying significant burdens. The character never suffers any penalty for climbing without proper equipment. Further, if rope, harness, and other supplies are available, the character may add one additional d20 to his Athletics skill test.",
                [new TalentPrerequisite("Cliff Dweller"), new ExpertisePrerequisite(Skill.Athletics, 2)],
                1),
        ],
        [Skill.CloseCombat]: [
            new TalentModel(
                "No Mercy",
                "Some characters are ruthless in combat, seeking to cause as much damage as possible. When making a Close Combat attack, a character may re-roll a number of damage dice equal to the total number of Close Combat talents he has acquired. The new die rolls must be accepted.",
                [new ExpertisePrerequisite(Skill.CloseCombat, 1)],
                1),
            new TalentModel(
                "Deflection",
                "Careful study has enabled the character to become particularly proficient at using a weapon to parry melee attacks. Characters with this talent do not need to pay a Dark Symmetry point in order to take a Parry Response Action in a combat turn.",
                [new TalentPrerequisite("No Mercy")],
                1),
            new TalentModel(
                "Riposte",
                "Some characters learn that the instant after an opponent strikes is when they are most vulnerable. After successfully executing a Parry Response Action, characters with this talent may immediately pay one Dark Symmetry point to make a standard melee attack against the foe they parried. Momentum remaining from the Parry action may be carried over to this melee attack.",
                [new TalentPrerequisite("Deflection"), new ExpertisePrerequisite(Skill.CloseCombat, 2)],
                1),
            new TalentModel(
                "Reflexive Block",
                "The character has become so attuned to his melee expertise that he can use it to defend against ranged attacks. The player may substitute his Close Combat skill for his Acrobatics any time he attempts a Dodge Response Action.",
                [new TalentPrerequisite("Riposte")],
                1),
            new TalentModel(
                "Quick Draw",
                "The character is always prepared for melee combat. The character does not need to have a weapon in his hand to parry. So long as he has a free hand and a weapon within Reach (see page 128), he can always attempt a Parry Response Action.",
                [new TalentPrerequisite("No Mercy")],
                1),
            new TalentModel(
                "Specialist (1H)",
                "Some individuals train extensively with specific classes of weapons. For these characters, the weapon type becomes an extension of their body. When using 1H weapons, each Dark Symmetry point paid to gain additional dice for a test provides two dice instead of one.",
                [new TalentPrerequisite("No Mercy")],
                1),
            new TalentModel(
                "Specialist (2H)",
                "Some individuals train extensively with specific classes of weapons. For these characters, the weapon type becomes an extension of their body. When using 2H weapons, each Dark Symmetry point paid to gain additional dice for a test provides two dice instead of one.",
                [new TalentPrerequisite("No Mercy")],
                1),
            new TalentModel(
                "Specialist (Unbalanced)",
                "Some individuals train extensively with specific classes of weapons. For these characters, the weapon type becomes an extension of their body. When using Unbalanced weapons, each Dark Symmetry point paid to gain additional dice for a test provides two dice instead of one.",
                [new TalentPrerequisite("No Mercy")],
                1),
            new TalentModel(
                "Weapon Master (1H)",
                "Characters that continue their focus with 1H weapons become particularly proficient with them. When wielding 1H weapons, each point of Momentum on a successful attack adds two points of damage instead of one.",
                [new TalentPrerequisite("Specialist (1H)"), new ExpertisePrerequisite(Skill.CloseCombat, 2)],
                1),
            new TalentModel(
                "Weapon Master (2H)",
                "Characters that continue their focus with 2H weapons become particularly proficient with them. When wielding 2H weapons, each point of Momentum on a successful attack adds two points of damage instead of one.",
                [new TalentPrerequisite("Specialist (2H)"), new ExpertisePrerequisite(Skill.CloseCombat, 2)],
                1),
            new TalentModel(
                "Weapon Master (Unbalanced)",
                "Characters that continue their focus with Unbalanced weapons become particularly proficient with them. When wielding Unbalanced weapons, each point of Momentum on a successful attack adds two points of damage instead of one.",
                [new TalentPrerequisite("Specialist (Unbalanced)"), new ExpertisePrerequisite(Skill.CloseCombat, 2)],
                1),
        ],
        [Skill.Command]: [
            new TalentModel(
                "Professional",
                "The character has learned to issue orders in such a way that they are clear to the recipient, with little margin for misinterpretation. The character may re-roll one d20 when making a Command test, but must accept the new result.",
                [new ExpertisePrerequisite(Skill.Command, 1)],
                1),
            new TalentModel(
                "Air of Authority",
                "When attempting to draw the attention of a large group of people, the character may pay one Dark Symmetry point. In return, the target characters stop what they are doing, and pay attention to his words for the duration of a brief monologue. If used during combat, the character may attempt a Command test with difficulty equal to the number of NPCs whose attention he is trying to draw. If the test succeeds, the targeted NPCs are distracted and may not make any actions against the character until after that character’s next turn. Any other actions attempted by the NPCs that require a skill test, have the difficulty increased by one step.",
                [new TalentPrerequisite("Professional")],
                1),
            new TalentModel(
                "Commanding Presence",
                "The character speaks in such a way that even those who do not know him, or fully understand his language, recognise his charisma and persuasive abilities. The character reduces the difficulty of any Command test by one for each rank of Commanding Presence. This may eliminate the need for a test.",
                [new TalentPrerequisite("Air of Authority"), new ExpertisePrerequisite(Skill.Command, 2)],
                3),
            new TalentModel(
                "Minions",
                "Individuals under the character’s authority become extremely loyal to him, even willing to sacrifice themselves. Any time the character comes under attack and has a character under his command within Reach, he may pay one Dark Symmetry point. In return, a character under his command immediately succeeds at a Guard Response Action, becoming the new target of the attack.",
                [new TalentPrerequisite("Commanding Presence")],
                1),
            new TalentModel(
                "Font of Courage",
                "The character is an inspiring presence to those who follow him. Any time forces under his direct command must make a Willpower test, they reduce the difficulty by one step for each rank of Font of Courage. This may eliminate the need for a test.",
                [new TalentPrerequisite("Professional")],
                3),
            new TalentModel(
                "Group Dynamics",
                "The character is very familiar with the way a crowd would normally act, and recognises actions that are unusual. When dealing with places full of people – even if the people are not organised – the character may substitute his Command skill for any Observation or Insight tests that deal with the crowd or the area.",
                [new TalentPrerequisite("Professional")],
                1),
            new TalentModel(
                "Coordinator",
                "The character has become proficient in making certain that the actions of a group are well coordinated. Any time the character is involved in a teamwork test – even if he is not the leader for the test – all characters involved may choose to re-roll any die that results in a failure on the initial roll. They must accept the results of the re-roll, even if they are worse than the initial roll.",
                [new TalentPrerequisite("Group Dynamics"), new ExpertisePrerequisite(Skill.Command, 2)],
                1),
        ],
        [Skill.Education]: [
            new TalentModel(
                "Disciplined Student",
                "The character paid attention in classes and sometimes even studied materials that went beyond the scope of the minimum necessary training. If the character generates at least one success when attempting an Education test, he may immediately roll an additional 1d20 and add the result to the skill test. Ignore any Repercussions from these bonus dice.",
                [new ExpertisePrerequisite(Skill.Education, 1)],
                1),
            new TalentModel(
                "Know Factions",
                "The character is familiar with the philosophies, styles, and motivations of various political and corporate entities. When interacting with an opponent, the character may attempt an Average D1 Education test as a Restricted Action. On a success, he recognises the foe’s political and corporate affiliations based upon his mannerisms and actions.",
                [new TalentPrerequisite("Disciplined Student")],
                1),
            new TalentModel(
                "Recognise Motives",
                "When analysing an opponent’s pattern of actions – including crime scenes, tactical engagements, and business transactions – the character has learned to recognise his foe’s overall strategy. Once the character has assembled the available clues, he may spend one Dark Symmetry point. The GM must then truthfully reveal the opponent’s short term goals.",
                [new TalentPrerequisite("Know Factions"), new ExpertisePrerequisite(Skill.Education, 2)],
                1),
            new TalentModel(
                "Counter Offer",
                "The character has come to recognise the reasons why an opponent is acting in a particular way, and can use that to dissuade him from acting. The character may substitute his Education skill for Persuade or Command when making a test against an opponent whose motivations he understands.",
                [new TalentPrerequisite("Recognise Motives")],
                1),
            new TalentModel(
                "Newsmonger",
                "The character keeps up on current events, both globally and throughout the solar system. On any Education test that deals with a familiarity of events within the past twenty years, the character reduces the difficulty by one step per rank of Newsmonger. This may eliminate the need for the test.",
                [new TalentPrerequisite("Disciplined Student")],
                3),
            new TalentModel(
                "Spot Context",
                "The character has a broad education that includes an understanding of history and culture from a variety of different perspectives. When interacting with an opponent, the character may attempt an Average D1 Education test as a Restricted Action. On success, he recognises an element of common ground for discussion in his opponent. Any Momentum from the Education test may be immediately added to a Persuade or Command test taken as a Standard Action.",
                [new TalentPrerequisite("Disciplined Student")],
                1),
            new TalentModel(
                "Play the Part",
                "The character is so familiar with foreign cultures that he has learned to effectively impersonate the members of a broad range of cultures. This includes style of dress, speech, and other mannerisms. When attempting to make use of a disguise, the character may substitute his Education skill for Stealth.",
                [new TalentPrerequisite("Spot Context"), new ExpertisePrerequisite(Skill.Education, 2)],
                1),
        ],
        [Skill.Gunnery]: [
            new TalentModel(
                "Cool Hand",
                "When making a Gunnery attack, a character may re-roll a number of damage dice equal to the number of Gunnery talents he has acquired. The new die rolls must be accepted.",
                [new ExpertisePrerequisite(Skill.Gunnery, 1)],
                1),
            new TalentModel(
                "Natural Calculator",
                "The character has experience firing from a moving platform and compensating for its motion, as well as atmospheric conditions and poor lighting. For each rank of Natural Calculator, the character can reduce the difficulty of a Gunnery test by one step. This may never reduce the difficulty below one.",
                [new TalentPrerequisite("Cool Hand")],
                3),
            new TalentModel(
                "Duplicate Shot",
                "The character has learned how to focus his fire carefully against a large enemy target. When making a test to fire a weapon using the Gunnery skill, the character may spend two Momentum in order to guarantee that his next attack against the target before the end of his next turn hits the same location.",
                [new TalentPrerequisite("Natural Calculator"), new ExpertisePrerequisite(Skill.Gunnery, 2)],
                1),
            new TalentModel(
                "Lethal Barrage",
                "The character is an expert at targeting large-scale weapons. When spending Momentum for bonus damage after a successful Gunnery attack, each point of Momentum spent adds two damage.",
                [new TalentPrerequisite("Duplicate Shot")],
                1),
            new TalentModel(
                "Expert Spotter",
                "The character is familiar with being a spotter to coordinate artillery barrages and long-range missile attacks. When performing this role, he may roll his normally Gunnery dice pool when assisting another character’s Gunnery test, rather than the normal 1d20 for assisting.",
                [new TalentPrerequisite("Cool Hand")],
                1),
            new TalentModel(
                "Crew Chief",
                "The character has become particularly adept at coordinating the actions of a weapons crew. When working with a weapons crew, the character may substitute his Gunnery skill for Command or Persuade.",
                [new TalentPrerequisite("Cool Hand")],
                1),
            new TalentModel(
                "Lightning Crew",
                "The character has learned how to coordinate his crew so that the weapon may be prepared for firing much more quickly. During combat, he may spend a Restricted Action to increase his rate of fire, allowing him to spend one more Reload with the weapon that turn than he would normally be allowed to. For example, a character with this talent using a semi-automatic weapon would be allowed to spend up to two Reloads, rather than the normal limit of one.",
                [new TalentPrerequisite("Crew Chief"), new ExpertisePrerequisite(Skill.Gunnery, 2)],
                1),
        ],
        [Skill.HeavyWeapons]: [
            new TalentModel(
                "Rain of Fire",
                "When making an attack with a heavy weapon, a character may re-roll a number of damage dice equal to the number of Heavy Weapon talents he has acquired. The new result must be accepted.",
                [new ExpertisePrerequisite(Skill.HeavyWeapons, 1)],
                1),
            new TalentModel(
                "Big Boom",
                "When making a successful heavy weapons attack, the character gains the Spread quality, with a rating equal to the number of ranks of Big Boom. If the weapon already has the Spread quality, its rating increases by that amount.",
                [new TalentPrerequisite("Rain of Fire")],
                3),
            new TalentModel(
                "Fire for Effect",
                "The character is particularly adept at using heavy weapons fire to unsettle his foes. If the character is wielding a heavy weapon with the Blast quality, he may pay one Dark Symmetry point to use this talent against an opponent, or group of opponents within a single zone. This is treated as an opposed test between the character’s Heavy Weapons skill and the target’s Willpower (using the highest Willpower amongst the target group, if attacking multiple targets). The attack deals no physical damage. Instead, success, and each point of Momentum inflicts one rank of Rattled upon the target(s).",
                [new TalentPrerequisite("Big Boom")],
                1),
            new TalentModel(
                "Booya! (LMG)",
                "The character has learned to operate a specific class of heavy weapon in a way that is particularly deadly. When firing an LMG, the character may choose to spend a Chronicle Point before attacking with the weapon to prevent the target form taking a Dodge Response Action. In the case of weapons with the Blast or Torrent qualities, this may include multiple targets. Note that no Momentum form this attack may be spent on selecting secondary targets.",
                [new TalentPrerequisite("Fire for Effect"), new ExpertisePrerequisite(Skill.HeavyWeapons, 2)],
                1),
            new TalentModel(
                "Booya! (HMG)",
                "The character has learned to operate a specific class of heavy weapon in a way that is particularly deadly. When firing an HMG, the character may choose to spend a Chronicle Point before attacking with the weapon to prevent the target form taking a Dodge Response Action. In the case of weapons with the Blast or Torrent qualities, this may include multiple targets. Note that no Momentum form this attack may be spent on selecting secondary targets.",
                [new TalentPrerequisite("Fire for Effect"), new ExpertisePrerequisite(Skill.HeavyWeapons, 2)],
                1),
            new TalentModel(
                "Booya! (Rocket Launchers)",
                "The character has learned to operate a specific class of heavy weapon in a way that is particularly deadly. When firing a Rocket Launcher, the character may choose to spend a Chronicle Point before attacking with the weapon to prevent the target form taking a Dodge Response Action. In the case of weapons with the Blast or Torrent qualities, this may include multiple targets. Note that no Momentum form this attack may be spent on selecting secondary targets.",
                [new TalentPrerequisite("Fire for Effect"), new ExpertisePrerequisite(Skill.HeavyWeapons, 2)],
                1),
            new TalentModel(
                "Booya! (Autocannons)",
                "The character has learned to operate a specific class of heavy weapon in a way that is particularly deadly. When firing an Autocannon, the character may choose to spend a Chronicle Point before attacking with the weapon to prevent the target form taking a Dodge Response Action. In the case of weapons with the Blast or Torrent qualities, this may include multiple targets. Note that no Momentum form this attack may be spent on selecting secondary targets.",
                [new TalentPrerequisite("Fire for Effect"), new ExpertisePrerequisite(Skill.HeavyWeapons, 2)],
                1),
            new TalentModel(
                "Booya! (Heavy Flamethrowers)",
                "The character has learned to operate a specific class of heavy weapon in a way that is particularly deadly. When firing a Heavy Flamethrower, the character may choose to spend a Chronicle Point before attacking with the weapon to prevent the target form taking a Dodge Response Action. In the case of weapons with the Blast or Torrent qualities, this may include multiple targets. Note that no Momentum form this attack may be spent on selecting secondary targets.",
                [new TalentPrerequisite("Fire for Effect"), new ExpertisePrerequisite(Skill.HeavyWeapons, 2)],
                1),
            new TalentModel(
                "Steady Arms",
                "The character has learned to balance a specific weapon, and recoil is much less of a problem. Each time the character purchases Steady Arms, the character must select a specific model of heavy weapon. (for example, an Improved M89). When firing a heavy weapon of the selected type, all attacks count as being braced. This talent may be purchased once per model of heavy weapon.",
                [new TalentPrerequisite("Rain of Fire")],
                10),
            new TalentModel(
                "Smooth Reload",
                "The character has trained with his weapon to the point that its functions are intuitive. During combat, he may spend a Restricted Action to increase his rate of fire, allowing him to spend one more Reload than normal for the weapon that turn. For example, a character with this talent using an automatic weapon would be allowed to spend up to four Reloads, rather than the normal limit of three.",
                [new TalentPrerequisite("Rain of Fire")],
                1),
            new TalentModel(
                "Suppressive",
                "The character is particularly talented at using his heavy weapon’s functions to keep his opponents suppressed. When the character performs a Covering Fire action using a heavy weapon, attacks made against the assisted character have their difficulty increased by two instead of one.",
                [new TalentPrerequisite("Smooth Reload"), new ExpertisePrerequisite(Skill.HeavyWeapons, 2)],
                1),
        ],
        [Skill.Insight]: [
            new TalentModel(
                "Sixth Sense",
                "The character may re-roll one d20 when making an Insight test, but must accept the new result.",
                [new ExpertisePrerequisite(Skill.Insight, 1)],
                1),
            new TalentModel(
                "Unnatural Sensitivity",
                "A character may spend one Momentum from an Insight test to instantly recognise the reason the test was made. If this occurred prior to entering a conflict, the character may add 1d20 to any skill test made during his first turn, without paying any Dark Symmetry points.",
                [new TalentPrerequisite("Sixth Sense")],
                1),
            new TalentModel(
                "Expanded Senses",
                "During combat, the character may make an Average D1 Insight test as a Restricted Action. If the test is passed, he can identify one special power that an opponent has in use. Each Momentum spent allows the character to recognise an additional power.",
                [new TalentPrerequisite("Unnatural Sensitivity"), new ExpertisePrerequisite(Skill.Insight, 2)],
                1),
            new TalentModel(
                "Know the Signs",
                "The character has dealt with the effects of the supernatural, and recognises the signs of its activity. Whenever he is in the presence of a person or object that was affected by supernatural abilities within the last five hours, he may attempt an Insight test with a difficulty equal to the number of hours ago the person or object was affected. On success, the character can recognise the taint of powers. By spending two points of Momentum, he can identify the specific powers in use.",
                [new TalentPrerequisite("Expanded Senses")],
                1),
            new TalentModel(
                "New Perspective",
                "The character can intuitively relate his alternate senses to the physical world. He may substitute his Insight skill for Observation.",
                [new TalentPrerequisite("Sixth Sense")],
                1),
            new TalentModel(
                "Pierce the Veil",
                "The character has a knack for recognising the subtle cues of supernatural ability. Whenever the character is in the presence of the supernatural or beings with unusual powers – particularly if the character is not aware of it – the GM should call for the character make an Average D1 Insight test. On success, the character recognises that the opponent has supernatural abilities, and may spend two Momentum to identify the type of abilities. This test should be made even if the target does not have any abilities active.",
                [new TalentPrerequisite("Sixth Sense")],
                1),
            new TalentModel(
                "Avoid Corruption",
                "The character’s mind and soul are guarded against Corruption. Each rank of Avoid Corruption increases the character’s Corruption Soak by one.",
                [new TalentPrerequisite("Pierce the Veil"), new ExpertisePrerequisite(Skill.Insight, 2)],
                3),
        ],
        [Skill.Lifestyle]: [
            new TalentModel(
                "Good Impression",
                "The character may re-roll one d20 when making a Lifestyle test, but must accept the new result.",
                [new ExpertisePrerequisite(Skill.Lifestyle, 1)],
                1),
            new TalentModel(
                "Network",
                "The character has a broad range of contacts in different fields and in different regions. Any time the character needs assistance from other individuals, he may reduce the difficulty to find a contact by one step per rank of Network. This may eliminate the need for a test.",
                [new TalentPrerequisite("Good Impression")],
                3),
            new TalentModel(
                "Reallocate Asset",
                "Having friends with valuable assets can be the quickest way to acquire equipment that is needed for an assignment which is of questionable legal status. Characters with Reallocate Asset may reduce the restriction rating of any item or service by one per rank of Reallocate Asset, to a minimum of one. However, the item or service is regarded as illegally-obtained, which may cause other problems later.",
                [new TalentPrerequisite("Network"), new ExpertisePrerequisite(Skill.Lifestyle, 2)],
                3),
            new TalentModel(
                "High Command",
                "The character’s network of contacts is extensive, and includes individuals who are in positions of significant authority. When selecting this talent, the character must specify the type and allegiance of his High Command contact. He must also obtain GM approval for that selection. The character may make a Daunting D3 Lifestyle test to ask the selected contact for a favour. On success, the contact responds with resources proportionate to the NPC’s level of importance, providing one asset, plus an additional asset per point of Momentum spent. The character can make such a skill test once per game month. It takes one hour if the character is on the same planet, or eight hours if he is on a different planet, to make the attempt. High Command may be purchased multiple times, with each purchase establishing a new highly placed contact.",
                [new TalentPrerequisite("Reallocate Asset")],
                1),
            new TalentModel(
                "Silver Spoon",
                "The character has several financial streams of income and knows how to manage them effectively. Each rank of Silver Spoon increases a character’s Earnings Rating by one.",
                [new TalentPrerequisite("Good Impression")],
                3),
            new TalentModel(
                "Bribe",
                "The character recognises that everyone has their price, and he knows how to pay it – particularly without raising any flags. He may substitute his Lifestyle skill for Persuade when attempting to bribe, coerce, or deceive an NPC.",
                [new TalentPrerequisite("Good Impression")],
                1),
            new TalentModel(
                "Big Spender",
                "The character knows the best ways to raise awareness and draw others to a cause. When attempting to spread a message across a large group of people, or even a region, the character can substitute his Lifestyle skill for Command.",
                [new TalentPrerequisite("Bribe"), new ExpertisePrerequisite(Skill.Lifestyle, 2)],
                1),
        ],
        [Skill.Linguistics]: [
            new TalentModel(
                "Ear for Language",
                "The character may re-roll one d20 when making a Linguistics test, but must accept the new result.",
                [new ExpertisePrerequisite(Skill.Linguistics, 1)],
                1),
            new TalentModel(
                "Puzzler",
                "The character has knack for solving word and number puzzles, regardless of how they are formed. The difficulty of any test to translate language, crack a code, or decrypt a cypher is reduced by one step per rank of Puzzler. This may eliminate the need for a test.",
                [new TalentPrerequisite("Ear for Language")],
                3),
            new TalentModel(
                "Encrypter",
                "The character has developed countless different encryption schemes, and has learned various ways to make them extremely difficult for an opponent to crack. When creating an encryption scheme, passing along a code, or using non-verbal cues to express a message, each Dark Symmetry point spent to add an additional die to the test adds two dice instead of one.",
                [new TalentPrerequisite("Puzzler"), new ExpertisePrerequisite(Skill.Linguistics, 2)],
                1),
            new TalentModel(
                "In Plain Sight",
                "The character is aware that often a bit of secret information can be effectively communicated in plain sight, without the opponent becoming aware. Any time the character is using a cypher to perform an act of misdirection, the character can substitute Linguistics for Command, Persuade, or Stealth.",
                [new TalentPrerequisite("Encrypter")],
                1),
            new TalentModel(
                "Way with Words",
                "The character is familiar with the idioms and speech patterns of a broad range of different populations. He knows not just how to speak a language, but how to speak it in a fashion that sets a native speaker at ease, often even exploiting a local dialect. The character can substitute Linguistics for Persuade.",
                [new TalentPrerequisite("Ear for Language")],
                1),
            new TalentModel(
                "Intuitive Communicator",
                "The character recognises that language is merely one aspect of communication. He is also comfortable communicating through inflection, tone, body language, and gestures. He can converse with any being that is ostensibly human without penalty for a language barrier.",
                [new TalentPrerequisite("Ear for Language")],
                1),
            new TalentModel(
                "Instant Translator",
                "The character has studied a broad range of foreign languages, including many that are no longer in use. Any time the character discovers a written work in a language he does not know, he may spend one Dark Symmetry point. In return, he can instinctively decrypt a basic meaning from a text without having to spend the arduous time normally required to translate it. However, producing a more comprehensive translation will require time and tests as normal.",
                [new TalentPrerequisite("Intuitive Communicator"), new ExpertisePrerequisite(Skill.Linguistics, 2)],
                1),
        ],
        [Skill.Mechanics]: [
            new TalentModel(
                "Natural Engineer",
                "The character may re-roll a single d20 that did not generate a success on the initial roll, but must accept the new result.",
                [new ExpertisePrerequisite(Skill.Mechanics, 1)],
                1),
            new TalentModel(
                "Design Savant",
                "The character has knack for designing novel solutions to problems. Any time the character chooses to design a new piece of equipment – or modify an existing design – he may reduce the difficulty of the Mechanics test by one step per rank of Design Savant. This may eliminate the need for a test.",
                [new TalentPrerequisite("Natural Engineer")],
                3),
            new TalentModel(
                "Repurpose Device",
                "The character has the vision to recognise alternative uses of common devices. With success on a Challenging D2 Mechanics test, the character can adapt existing equipment at hand to solve a problem. This adaptation is only good for a single use. Any Momentum from the test can be spent to provide an additional use per point of Momentum. After the final use has been completed, the equipment is ruined for both the alternative use and its originally intended use.",
                [new TalentPrerequisite("Design Savant"), new ExpertisePrerequisite(Skill.Mechanics, 2)],
                1),
            new TalentModel(
                "Assembly Line",
                "The character is capable of identifying ways to mass-produce parts and resources from little more than scrap. Once the necessary components are obtained, the character can attempt an Average D1 Mechanics test. With success, a single load of Parts or a single Reload can be created. Every point of Momentum spent on this test can produce an additional load. All creations are subject to GM approval.",
                [new TalentPrerequisite("Repurpose Device")],
                1),
            new TalentModel(
                "Snap Diagnosis",
                "The character is able to identify the problem with any broken device – or to recognise a vulnerability that could be used to break a device. The character reduces the difficulty of any Mechanics test by one. This may reduce the difficulty to zero, removing the need for a test. When an exploit weakness action is taken, Snap Diagnosis also grants the Armour Piercing weapon quality to the character’s subsequent attack for a value equal to their Mechanics Focus.",
                [new TalentPrerequisite("Natural Engineer")],
                1),
            new TalentModel(
                "Greasemonkey",
                "The character is familiar with mechanical systems, and recognises the most likely points of failure intuitively. When attempting a repair, each point of Momentum spent to reduce the repair time reduces the time taken by two steps, rather than one.",
                [new TalentPrerequisite("Natural Engineer")],
                1),
            new TalentModel(
                "Jury Rig",
                "Often when a critical piece of equipment breaks down – either due to wear and tear or Corruption – components necessary to replace it are unavailable. Characters with this talent have a knack for making do without the necessary missing components. The character may make an Average D1 Mechanics test to repair a device temporarily when necessary components are unavailable. On success, it will function normally for one hour. Each point of Momentum earned on the test can be spent to add an additional hour of function.",
                [new TalentPrerequisite("Greasemonkey"), new ExpertisePrerequisite(Skill.Mechanics, 2)],
                1),
            new TalentModel(
                "Runescribe",
                "The character has been taught the ways of rune magic, enabling him to craft items that contain mystical power. The demand for individuals skilled in the craft increases the character’s Earnings Rating by one, though it also places him under the scrutiny of the Brotherhood.",
                [new SourcePrerequisite(Source.Imperial), new AnyClanPrerequisite([2, 7, 16]), new ExpertisePrerequisite(Skill.Mechanics, 2)],
                1),
        ],
        [Skill.Medicine]: [
            new TalentModel(
                "Physician",
                "The character may re-roll any dice that did not generate a success on the initial roll when making a Medicine test, but must accept the new result.",
                [new ExpertisePrerequisite(Skill.Medicine, 1)],
                1),
            new TalentModel(
                "Therapeutic Caregiver",
                "Different patients respond to different types of long-term care in very different ways. Some physicians specialise in tailoring the treatment to the patient. When making a Teamwork test to assist a patient in long-term care, the character may roll a number of dice equal to the number of Medicine talents he possesses instead of the single die normally permitted.",
                [new TalentPrerequisite("Physician")],
                1),
            new TalentModel(
                "Healer",
                "The character has learned techniques to aid a character in recovering from particularly grievous injuries. The character may reduce the difficulty of a Treat Wounds test by one step per rank of Healer he possesses. This may eliminate the need for the skill check.",
                [new TalentPrerequisite("Therapeutic Caregiver"), new ExpertisePrerequisite(Skill.Medicine, 2)],
                3),
            new TalentModel(
                "Trauma Surgeon",
                "The character is particularly adept at keeping patients alive, even in the face of gruesome trauma. The character may reduce the difficulty of a Stabilise test by one step per rank of Trauma Surgeon he possesses. This may eliminate the need for the skill check.",
                [new TalentPrerequisite("Healer")],
                3),
            new TalentModel(
                "Field Dressing",
                "The character has become particularly adept at practicing medicine in situations where few resources are available. He suffers no penalty for Medicine tests attempted without a medkit or other tools.",
                [new TalentPrerequisite("Physician")],
                1),
            new TalentModel(
                "Find Antidote",
                "Swift treatment with an antivenin or anti-toxin can dramatically reduce the effects of poison. A trained physician can sometimes identify a cure for a deadly poison by recognising the nature of its symptoms. The character can attempt an Average D1 Medicine test any time he encounters a poisoned or drugged patient. On success, he is able to identify both the poison or drug and the antidote necessary to relieve its symptoms. The character may spend Momentum to have the antidote at hand, though the amount required is subject to GM discretion, based upon the rarity and toxicity of the poison or drug.",
                [new TalentPrerequisite("Physician")],
                1),
            new TalentModel(
                "Bolster Immunity",
                "Serious diseases are often difficult to diagnose, and even more difficult to treat. Some physicians specialise in identifying treatments that are effective against the disease and that minimise the side effects for the patient. The character can attempt an Average D1 Medicine test to identify the best treatment for any patient he encounters. On success, he is able to identify both the disease and the best possible treatment plan. The character may spend Momentum to have the necessary pharmaceuticals, though the cost is subject to GM discretion, based upon the rarity and severity of the disease.",
                [new TalentPrerequisite("Find Antidote"), new ExpertisePrerequisite(Skill.Medicine, 2)],
                1),
        ],
        [Skill.Mysticism]: [
            new TalentModel(
                "Spiritual Understanding",
                "The character may re-roll one d20 when making a Mysticism test, but must accept the new result.",
                [new ExpertisePrerequisite(Skill.Mysticism, 1)],
                1),
            new TalentModel(
                "Dark Knowledge",
                "The character has an understanding of the creatures of the Dark Legion, and is adept at identifying these vile beasts and the powers they manifest. The character reduces the difficulty of any Mysticism test to identify a creature or power of Darkness by one for each rank of Dark Knowledge. This may eliminate the need for a test.",
                [new TalentPrerequisite("Spiritual Understanding")],
                3),
            new TalentModel(
                "Dark Defence",
                "The character has turned his knowledge of the Darkness to the practical matter of saving his life. As a Standard Action, during a combat where there is at least one Heretic or creature of the Dark Soul on the opposing side, he may attempt an Average D1 Mysticism test. If this test is passed, he gains a free Response Action against an attack from a Heretic or creature of the Dark Soul, due to his defensive tactics. For every Momentum spent, he gains an additional free Response Action. These free Response Actions may be used at any point before the end of the combat.",
                [new TalentPrerequisite("Dark Knowledge"), new ExpertisePrerequisite(Skill.Mysticism, 2)],
                1),
            new TalentModel(
                "Slayer of Darkness",
                "The character has learned how to most effectively harm and kill the creatures of Darkness. As a Restricted Action, the character may nominate a single creature of Darkness and attempt a Challenging D2 Mysticism test. If this succeeds, then the character’s next attack against that creature inflicts one additional point of damage per Momentum spent, in addition to the normal bonus damage gained from spending Momentum from the attack itself.",
                [new TalentPrerequisite("Dark Defence")],
                1),
            new TalentModel(
                "Ritualist",
                "The character is versed in the arcane arts, understanding enough to assist true masters of those arts in their work. As a Standard Action, the character can attempt an Average D1 Mysticism test to assist another character. If passed, this test has no benefits of its own, but immediately adds all its Momentum to the assisted characters’ next Mysticism test, rather than going to the group Momentum pool. Multiple characters with this talent can assist a single test, allowing for some truly spectacular spells to be cast by large groups. This may not be used to assist Mysticism tests made as Free Actions.",
                [new TalentPrerequisite("Spiritual Understanding")],
                1),
            new TalentModel(
                "Spiritual Armour",
                "The character’s mind and body are armoured against the supernatural. Against any damage-dealing supernatural power – Arts, Dark Gifts, or any other supernatural power – the character counts his Soak as one higher than normal for every rank of this talent he possesses.",
                [new TalentPrerequisite("Spiritual Understanding")],
                3),
            new TalentModel(
                "Mystic Ward",
                "The character has learned the way to protect himself from the spells and sorcery of his foes. By spending an hour meditating and performing a minor ritual, the character may perform a Response Action to resist a spell or supernatural power used on him, so long as he is aware of the attacker. The test to use the power now becomes an opposed test, opposed by the defending character’s Mysticism skill. For supernatural powers that do not require a test, the character may attempt a Mysticism test to resist the power’s effect, instead of any normal test to resist (if any), and gains a bonus d20 on that test. The benefits of this ritual last a day.",
                [new TalentPrerequisite("Spiritual Armour"), new ExpertisePrerequisite(Skill.Mysticism, 2)],
                1),

            // Brotherhood
            new TalentModel(
                "Spiritual Fortitude",
                "The character has fortified his body and mind against the terrors of the Dark Symmetry. He may re-roll one d20 when making a Willpower test to resist mental assault, but must accept the new result.",
                [new TalentPrerequisite("Mystic"), new ExpertisePrerequisite(Skill.Willpower, 1)],
                1),
            new TalentModel(
                "Devoted Inquiry",
                "The character has a gift for discerning the influence of the Dark Symmetry, and reduces the difficulty of Insight tests to detect the effects of the Dark Symmetry by one, to a minimum of one.",
                [new TalentPrerequisite("Mystic"), new ExpertisePrerequisite(Skill.Insight, 1)],
                1),
            new TalentModel(
                "Mystic",
                "The character has, through much study and great effort, learned to harness the supernatural potential within himself such that he can conjure potent effects from the Light. During character creation, the character may always select Mysticism as an elective skill for any career chosen. The character learns three basic spells, which he may attempt to cast using the Mysticism skill.",
                [new LearnArtPrerequisite()],
                1),
        ],
        [Skill.Observation]: [
            new TalentModel(
                "Sharp Senses",
                "The character may re-roll one d20 when making an Observation test, but must accept the new result.",
                [new ExpertisePrerequisite(Skill.Observation, 1)],
                1),
            new TalentModel(
                "Quick Survey",
                "A character may spend one Momentum from an Observation test to recognise the reason the test was made. If this occurred prior to entering a conflict, the character may add 1d20 to any skill test made during his first turn, without paying any Dark Symmetry points.",
                [new TalentPrerequisite("Sharp Senses")],
                1),
            new TalentModel(
                "Battlefield Perception",
                "During combat, the character may make an Average D1 Observation test as a Restricted Action. If the test is passed, he can determine the severity of his opponent’s worst wound. Each Momentum spent allows the character to know how many Light Wounds remain on the hit location of his choice.",
                [new TalentPrerequisite("Quick Survey"), new ExpertisePrerequisite(Skill.Observation, 2)],
                1),
            new TalentModel(
                "Find the Weak Spot",
                "During combat, the character may make an Average D1 Observation test as a Restricted Action. If he passes the test and makes a Ranged or Close Combat Action, he immediately applies additional damage dice equal to his Observation focus level. Momentum carries forward as normal.",
                [new TalentPrerequisite("Battlefield Perception")],
                1),
            new TalentModel(
                "Sense Memory",
                "The character is more likely to recognise people, places, and objects he has interacted with, even when attempts have been made to obscure, disguise, or hide them. A successful Observation test when attempting to detect, locate, or recognise such targets provides one bonus Momentum for each rank of Sense Memory.",
                [new TalentPrerequisite("Sharp Senses")],
                3),
            new TalentModel(
                "Toss the Room",
                "The character is adept at thoroughly searching an area quickly. The search is obvious, with a difficulty determined by the size of the area searched. Searching within Reach requires an Average D1 Observation test, while searching within Close range takes a Challenging D2 test instead. If the character passes the Observation test, the character identifies all of the important clues in the space. Momentum can be spent to reduce the amount of time required, or to obfuscate the fact the area was searched. Searching within Reach takes one minute, while searching within Close range takes ten minutes.",
                [new TalentPrerequisite("Sharp Senses")],
                1),
            new TalentModel(
                "Subtle Examination",
                "The character can perform the Toss the Room action as described, but in half the normal time, or subtly, without leaving tell-tale evidence of the search. In order for anyone to notice that a search has been undertaken subtly, they must succeed at a Challenging D3 Observation test.",
                [new TalentPrerequisite("Toss the Room"), new ExpertisePrerequisite(Skill.Observation, 2)],
                1),
        ],
        [Skill.Persuade]: [
            new TalentModel(
                "Charismatic",
                "The character’s Influence bonus rating is increased by +1 [DS].",
                [new ExpertisePrerequisite(Skill.Persuade, 1)],
                1),
            new TalentModel(
                "Strong-Armed Tactics",
                "The character recognises others’ limitations and is always willing to exploit them. When attempting to intimidate an opponent, he is able to immediately recognise the most effective strategies to use. He gains one additional d20 to any Persuade or Command test per rank of Strong-Armed Tactics.",
                [new TalentPrerequisite("Charismatic")],
                3),
            new TalentModel(
                "Haggler",
                "The character is particularly proficient at striking a bargain to obtain either goods or favours. Prior to attempting a Lifestyle check, the character may make an Average D1 Persuade test. Every point of Momentum earned on the Persuade test provides an additional d20 to the Lifestyle test.",
                [new TalentPrerequisite("Strong-Armed Tactics"), new ExpertisePrerequisite(Skill.Persuade, 2)],
                1),
            new TalentModel(
                "Obfuscation",
                "Some individuals thrive on the fact that others are limited in the speed with which they can process information. They prey on individuals by dissembling, speaking quickly, and using obscure references or idioms. When the character attempts to fast-talk an opponent, each Dark Symmetry Point spent on the test provides two bonus d20s to the Persuade test instead of one.",
                [new TalentPrerequisite("Haggler")],
                1),
            new TalentModel(
                "Bedroom Eyes",
                "The character is particularly adept at seducing others. When attempting a seduction, the character gains two additional d20s to his Persuade test per Dark Symmetry Point paid, instead of one.",
                [new TalentPrerequisite("Charismatic")],
                1),
            new TalentModel(
                "Naturally Charming",
                "The character has a warm personality and a winning smile. People trust him. A successful Persuade test yields one additional point of Momentum per rank of Naturally Charming.",
                [new TalentPrerequisite("Charismatic")],
                3),
            new TalentModel(
                "Remorseless",
                "The character is willing and able to tell any lie that he feels is necessary to overcome an opponent’s social defences. When lying to an opponent, the character gains one additional d20 to his Persuade or Command test per rank of Remorseless.",
                [new TalentPrerequisite("Naturally Charming"), new ExpertisePrerequisite(Skill.Persuade, 2)],
                3),
        ],
        [Skill.Pilot]: [
            new TalentModel(
                "Ace",
                "The character may re-roll one d20 when making a Pilot test, but must accept the new result.",
                [new ExpertisePrerequisite(Skill.Pilot, 1)],
                1),
            new TalentModel(
                "Born to the Wheel",
                "The character is particularly adept at driving in difficult situations. Decrease the difficulty rating for any Pilot tests using ground-based vehicles by one, to a minimum of one.",
                [new TalentPrerequisite("Ace")],
                1),
            new TalentModel(
                "Keep Trucking",
                "The character has mastered tactics for keeping a vehicle running effectively, even when it is seriously damaged. When performing a Pilot test with a damaged vehicle, for each rank of Keep Trucking the character has, the damage modifies the difficulty of the test by one step less than normal.",
                [new TalentPrerequisite("Born to the Wheel"), new ExpertisePrerequisite(Skill.Pilot, 2)],
                3),
            new TalentModel(
                "Ramming Speed",
                "A vehicle can be an exceptionally deadly weapon. The character has studied and mastered techniques to increase its lethality. If the character uses a ground-based vehicle to ram a target, each point of Momentum spent to add additional damage adds two damage instead of one.",
                [new TalentPrerequisite("Keep Trucking")],
                1),
            new TalentModel(
                "Storm Breaker",
                "The character has become an expert at piloting watercraft under extreme conditions. The character may ignore any penalties to a Pilot test for a water-based vehicle that are due to choppy waters, severe weather, or other environmental conditions.",
                [new TalentPrerequisite("Ace")],
                1),
            new TalentModel(
                "Push the Envelope",
                "The character is particularly adept at making atmospheric craft perform beyond their design specifications. When attempting to increase the speed or performance of an airborne vehicle, each Dark Symmetry point spent to add dice to the Pilot pool adds two d20s instead of one.",
                [new TalentPrerequisite("Ace")],
                1),
            new TalentModel(
                "Winged Victory",
                "The character is an expert in the use of single-pilot flight craft. He may substitute his Pilot skill for Gunnery when firing weapons mounted on an airborne vehicle that he is also piloting.",
                [new TalentPrerequisite("Push the Envelope"), new ExpertisePrerequisite(Skill.Pilot, 2)],
                1),
        ],
        [Skill.Psychotherapy]: [
            new TalentModel(
                "Counsellor",
                "The character may re-roll any dice that did not generate a success on the initial roll when making a Psychotherapy test, but must accept the new result.",
                [new ExpertisePrerequisite(Skill.Psychotherapy, 1)],
                1),
            new TalentModel(
                "Psychologist",
                "The character has become devoted to preserving the rational world and eliminating madness in all its forms from his patients. When making a Psychotherapy test to reduce madness, every Dark Symmetry point spent to add dice to the Psychotherapy test provides two d20s instead of one.",
                [new TalentPrerequisite("Counsellor")],
                1),
            new TalentModel(
                "Psycho-Surgeon",
                "The character has worked with countless patients, who suffered from multiple types of madness simultaneously. He has learned to isolate these different strains and cure each one individually. The difficulty step increase for multiple instances of madness is decreased by one for each rank of Psycho-surgeon the character has. This may eliminate the need for a test.",
                [new TalentPrerequisite("Psychologist"), new ExpertisePrerequisite(Skill.Psychotherapy, 2)],
                3),
            new TalentModel(
                "Alienist",
                "The character has become skilled at working with patients who have fallen prey to the supernatural. When attempting Psychotherapy to help another character recover from Dread, the difficulty of the test is reduced by one step, to a minimum of one.",
                [new TalentPrerequisite("Psycho-Surgeon")],
                1),
            new TalentModel(
                "Psychoanalyst",
                "Rest is an effective means to recover Mental Wounds. A trained counsellor is often able to guide a patient’s focus while resting in order to expedite the recovery process. The character may perform a Psychotherapy test to assist a character already undergoing natural rest. This is conducted as assisting in a teamwork test; however, the character may use his full Psychotherapy dice pool instead of a single die.",
                [new TalentPrerequisite("Counsellor")],
                1),
            new TalentModel(
                "Cognitive Therapist",
                "The character has come to specialise in assisting individuals in recovering from mental trauma. When helping a patient to recover Mental Wounds, the patient recovers two Mental Wounds per Momentum spent on the test, instead of one.",
                [new TalentPrerequisite("Counsellor")],
                1),
            new TalentModel(
                "Remote Specialist",
                "There are far more individuals suffering from mental trauma than there are trained psychotherapists. The character has learned how best to provide therapy when a face to face meeting is impossible. The character does not suffer a difficulty increase in situations where he is unable to interact with a patient face-to-face.",
                [new TalentPrerequisite("Cognitive Therapist"), new ExpertisePrerequisite(Skill.Psychotherapy, 2)],
                1),
        ],
        [Skill.RangedWeapons]: [
            new TalentModel(
                "Sniper",
                "When making an attack with a ranged weapon, a character may re-roll a number of damage dice equal to the number of Ranged Weapons talents he has acquired. The new results must be accepted.",
                [new ExpertisePrerequisite(Skill.RangedWeapons, 1)],
                1),
            new TalentModel(
                "Gun in Hand",
                "The character is always prepared for a gunfight. As a Response Action the character may respond to an attack with an attack of his own with any weapon he can wield in one hand. This attack has a base difficulty of Daunting D3, and is resolved before the enemy attack. If this reaction kills or otherwise incapacitates the attacker, then his attack is prevented.",
                [new TalentPrerequisite("Sniper")],
                1),
            new TalentModel(
                "Speed Loader",
                "The character can disassemble and reassemble his weapon and its components with little thought. During combat, he may spend a Restricted Action to increase his rate of fire, allowing him to spend one more Reload with the weapon that turn than he would normally be allowed to. For example, a character with this talent using a semiautomatic weapon would be allowed to spend up to two Reloads, rather than the normal limit of one.",
                [new TalentPrerequisite("Gun in Hand"), new ExpertisePrerequisite(Skill.RangedWeapons, 2)],
                1),
            new TalentModel(
                "Double Tap",
                "The character has learned to fire his weapon rapidly without sacrificing accuracy. If the character succeeds at a Ranged Weapon attack and spends Momentum to perform a Swift Strike, there is no increase in difficulty rating for the attack taken with Swift Strike. However, Double Tap can only be used once per turn.",
                [new TalentPrerequisite("Speed Loader")],
                1),
            new TalentModel(
                "Through and Through",
                "When the character spends Momentum on a Secondary Target effect for a Ranged Weapons attack, it only costs one Momentum. In addition, the character can select an additional Secondary Target for each Momentum spent, equal to his rank of Through and Through.",
                [new TalentPrerequisite("Sniper")],
                3),
            new TalentModel(
                "Clear Shot",
                "The character has learned to compensate instinctively for variations in weapon manufacturing, weather conditions, and other anomalies that could affect the trajectory of an attack. He reduces the penalty for firing at a range other than the weapon’s optimal range by one step, to a minimum of zero.",
                [new TalentPrerequisite("Sniper")],
                1),
            new TalentModel(
                "Precise Targeting",
                "The character knows that just hitting a man-sized target is seldom accurate enough. Instead, he has come to focus his attacks far more precisely. When spending Momentum for the Called Shot benefit on an attack made with the Ranged Weapons skill, each point of Momentum may be spent to shift the hit location roll by up to two faces of the damage die.",
                [new TalentPrerequisite("Clear Shot"), new ExpertisePrerequisite(Skill.RangedWeapons, 2)],
                1),
        ],
        [Skill.Resistance]: [
            new TalentModel(
                "Hardy",
                "The character may re-roll any dice that did not generate a success on the initial roll when making a Resistance test, but must accept the new result.",
                [new ExpertisePrerequisite(Skill.Resistance, 1)],
                1),
            new TalentModel(
                "Just a Scratch",
                "The character has a knack for shrugging off minor injuries and quickly recovers from wounds. When resting or recovering naturally, a character recovers one additional Light Wound per rank of Just a Scratch.",
                [new TalentPrerequisite("Hardy")],
                3),
            new TalentModel(
                "Rub Some Dirt On It",
                "The character has been injured before, and has probably faced something more grievous than what just happened to him. When attempting to recover from a temporary status effect, the difficulty rating is reduced by one step, to a minimum of one.",
                [new TalentPrerequisite("Just a Scratch"), new ExpertisePrerequisite(Skill.Resistance, 2)],
                1),
            new TalentModel(
                "Quick Healer",
                "When attempting to heal via natural healing, the character can add an additional 1d20 to the Resistance test per rank of Quick Healer.",
                [new TalentPrerequisite("Rub Some Dirt On It")],
                3),
            new TalentModel(
                "Resilient",
                "The character’s physique is particularly resilient to injuries. When someone triggers an effect would require a Resistance test to avoid a status condition, the difficulty of the Resistance test to resist the negative effects is reduced by one step per rank of Resilient. This may reduce the difficulty to zero, removing the need for a test.",
                [new TalentPrerequisite("Hardy")],
                3),
            new TalentModel(
                "Strong Liver",
                "The character has been exposed to countless toxins, and possibly pharmaceuticals. Through exposure, he has developed a powerful resistance to their effects. When the character needs to make a Resistance test against a poison, toxin, or to resist the effects of alcohol or other drugs, he may reduce the difficulty of the test by one step per rank of Strong Liver. This may eliminate the need for a test.",
                [new TalentPrerequisite("Hardy")],
                3),
            new TalentModel(
                "Fever Dreams",
                "The character has gone through grievous injuries and survived massive benders. He has learned how to stubbornly face down the seemingly insurmountable, and he relies on his physical stamina to do so. When already suffering from a physical injury, the character may substitute his Resistance skill for Willpower.",
                [new TalentPrerequisite("Strong Liver"), new ExpertisePrerequisite(Skill.Resistance, 2)],
                1),
        ],
        [Skill.Science]: [
            new TalentModel(
                "Operator",
                "The character may re-roll one d20 when making a Sciences test, but must accept the new result.",
                [new ExpertisePrerequisite(Skill.Science, 1)],
                1),
            new TalentModel(
                "Technician",
                "The character’s education included a thorough grounding in mathematics and the physical sciences. Any time he spends a Dark Symmetry point to add additional dice to a Sciences test that deals with complex mathematics or the physical sciences, he adds two d20s instead of one.",
                [new TalentPrerequisite("Operator")],
                1),
            new TalentModel(
                "Researcher",
                "The character has a broad grounding in the physical sciences, and has become adept at applying them in everyday life. The character may substitute Sciences for any tests of Mechanics or Education.",
                [new TalentPrerequisite("Technician"), new ExpertisePrerequisite(Skill.Science, 2)],
                1),
            new TalentModel(
                "Scientist",
                "The character has intensely studied the physical sciences, conducted independent research, and has formulated advanced theories about the core nature of reality. He may reduce the difficulty of any Sciences test by one step per rank of Scientist. This may eliminate the need for a test.",
                [new TalentPrerequisite("Researcher")],
                3),
            new TalentModel(
                "Comptographer",
                "The character is adept at operating comptography equipment. The character may reduce the difficulty of any Sciences tests related to comptography tests by one step per rank of Comptographer to a minimum of one.",
                [new TalentPrerequisite("Operator")],
                2),
            new TalentModel(
                "Biologist",
                "The character has a familiarity with all of the different living things that can be found throughout the solar system. Whenever the character attempts to recall information about or identify an organism, for every Dark Symmetry point spent to add dice to the test, the character adds two d20s instead of one.",
                [new TalentPrerequisite("Operator")],
                1),
            new TalentModel(
                "Bioengineer",
                "The character is not only familiar with the different organisms that dwell in the solar system, he is also comfortable creating new forms of life. If the character has access to laboratory facilities, he can create living machines, effectively substituting Sciences for Mechanics when creating living devices.",
                [new TalentPrerequisite("Biologist"), new ExpertisePrerequisite(Skill.Science, 2)],
                1),
            new TalentModel(
                "Runescribe",
                "The character has been taught the ways of rune magic, enabling him to craft items that contain mystical power. The demand for individuals skilled in the craft increases the character’s Earnings Rating by one, though it also places him under the scrutiny of the Brotherhood.",
                [new SourcePrerequisite(Source.Imperial), new AnyClanPrerequisite([2, 7, 16]), new ExpertisePrerequisite(Skill.Science, 2)],
                1),
        ],
        [Skill.Space]: [
            new TalentModel(
                "Astronaut",
                "The character may re-roll one d20 when making a Space test, but must accept the new result.",
                [new ExpertisePrerequisite(Skill.Space, 1)],
                1),
            new TalentModel(
                "Trans-Atmospheric",
                "Many spacecraft are also capable of atmospheric flight. However, re-entry can always pose a risk for any craft entering an atmosphere. The character has mastered this flight technique and can reduce the difficulty of any re-entry by one step per rank of Trans-atmospheric to a minimum of one.",
                [new TalentPrerequisite("Astronaut")],
                3),
            new TalentModel(
                "Rocket Jockey",
                "The character is particularly adept at flying a spacecraft in difficult and dangerous situations. Decrease the difficulty rating for any Space tests involving piloting by one step per rank of Rocket Jockey. This may eliminate the need for a test.",
                [new TalentPrerequisite("Trans-Atmospheric"), new ExpertisePrerequisite(Skill.Space, 2)],
                3),
            new TalentModel(
                "Starfighter",
                "The character is an expert in the use of relatively small spacecraft, designed for crews of five or fewer. He may substitute his Space skill for Gunnery when firing weapons mounted on Light Craft.",
                [new TalentPrerequisite("Rocket Jockey")],
                1),
            new TalentModel(
                "Alone in the Night",
                "Often, when a spacecraft encounters a mechanical difficulty it is unable to reach a facility where repairs can be made – without at least achieving some interim solution. The character has become familiar with his craft and with possible solutions to common problems. The character may substitute his Space skill for Mechanics when attempting repairs on a spacecraft.",
                [new TalentPrerequisite("Astronaut")],
                1),
            new TalentModel(
                "Navigation",
                "The character has learned to navigate a space cruiser throughout the various navigational hazards present in the solar system. The character may ignore any penalties to the difficulty of a Space test incurred by situational hazards, including cosmic radiation, solar flares, rogue objects, and similar dangers.",
                [new TalentPrerequisite("Astronaut")],
                1),
            new TalentModel(
                "Fleet Action",
                "The character has commanded squadrons of spacecraft during conflicts and has survived the experience. He may substitute his Space skill for Command in any such conflicts.",
                [new TalentPrerequisite("Navigation"), new ExpertisePrerequisite(Skill.Space, 2)],
                1),
        ],
        [Skill.Stealth]: [
            new TalentModel(
                "Scout",
                "The character may re-roll one d20 when making a Stealth test, but must accept the new result.",
                [new ExpertisePrerequisite(Skill.Stealth, 1)],
                1),
            new TalentModel(
                "Living Shadow",
                "A successful Stealth test when attempting to remain unseen or unnoticed will provide an amount of additional Momentum equal to the total number of Stealth talent ranks the character has purchased.",
                [new TalentPrerequisite("Scout")],
                1),
            new TalentModel(
                "Camouflage",
                "The character recognises that often it is not important for just him to remain unseen, but also his allies and any equipment they may be using. When attempting to conceal anything vehicle sized or larger, the character may add two d20s per Dark Symmetry point spent on the Stealth test instead of one.",
                [new TalentPrerequisite("Living Shadow"), new ExpertisePrerequisite(Skill.Stealth, 2)],
                1),
            new TalentModel(
                "Insertion",
                "The character has learned a variety of techniques necessary to bypass security measures when infiltrating a target facility. The character may substitute Stealth for Thievery when attempting to bypass physical security measures.",
                [new TalentPrerequisite("Camouflage")],
                1),
            new TalentModel(
                "Obscure Trail",
                "The character has learned how to make it substantially harder for someone to follow him. When he suspects or fears that he might be pursued, the character may make an Average D1 Stealth test. Success means that the difficulty of any pursuer’s tests to follow the character increases by one step, plus an extra step per Momentum spent.",
                [new TalentPrerequisite("Scout")],
                1),
            new TalentModel(
                "Disguise",
                "The character has learned to capably impersonate a broad range of different types of people, effectively blending into the background and acting like he belongs. For each extra success gained on a Stealth test made to create a disguise, the character gains two Momentum instead of one.",
                [new TalentPrerequisite("Scout")],
                1),
            new TalentModel(
                "Impersonation",
                "The character has learned to effectively mimic the appearance, personality, and physical mannerisms of other specific individuals. When impersonating another, the character may substitute his Stealth skill for Persuade, Command, or Education.",
                [new TalentPrerequisite("Disguise"), new ExpertisePrerequisite(Skill.Stealth, 2)],
                1),
        ],
        [Skill.Survival]: [
            new TalentModel(
                "Self Sufficient",
                "The character may re-roll one d20 when making a Survival test, but must accept the new result.",
                [new ExpertisePrerequisite(Skill.Survival, 1)],
                1),
            new TalentModel(
                "Risks (Arctic)",
                "The character is familiar with the various environmental hazards implicit in the wilderness. Any time the character travels within a particular kind of environment, chosen when this talent is purchased, he may make an Average D1 Survival test. On success, the character is able to avoid all implicit dangers – possibly avoiding dangerous encounters. Each point of Momentum may be spent to protect one of the character’s allies from these same risks.",
                [new TalentPrerequisite("Self Sufficient")],
                1),
            new TalentModel(
                "Risks (Desert)",
                "The character is familiar with the various environmental hazards implicit in the wilderness. Any time the character travels within a particular kind of environment, chosen when this talent is purchased, he may make an Average D1 Survival test. On success, the character is able to avoid all implicit dangers – possibly avoiding dangerous encounters. Each point of Momentum may be spent to protect one of the character’s allies from these same risks.",
                [new TalentPrerequisite("Self Sufficient")],
                1),
            new TalentModel(
                "Risks (Jungle)",
                "The character is familiar with the various environmental hazards implicit in the wilderness. Any time the character travels within a particular kind of environment, chosen when this talent is purchased, he may make an Average D1 Survival test. On success, the character is able to avoid all implicit dangers – possibly avoiding dangerous encounters. Each point of Momentum may be spent to protect one of the character’s allies from these same risks.",
                [new TalentPrerequisite("Self Sufficient")],
                1),
            new TalentModel(
                "Risks (Mountain)",
                "The character is familiar with the various environmental hazards implicit in the wilderness. Any time the character travels within a particular kind of environment, chosen when this talent is purchased, he may make an Average D1 Survival test. On success, the character is able to avoid all implicit dangers – possibly avoiding dangerous encounters. Each point of Momentum may be spent to protect one of the character’s allies from these same risks.",
                [new TalentPrerequisite("Self Sufficient")],
                1),
            new TalentModel(
                "Risks (Forest)",
                "The character is familiar with the various environmental hazards implicit in the wilderness. Any time the character travels within a particular kind of environment, chosen when this talent is purchased, he may make an Average D1 Survival test. On success, the character is able to avoid all implicit dangers – possibly avoiding dangerous encounters. Each point of Momentum may be spent to protect one of the character’s allies from these same risks.",
                [new TalentPrerequisite("Self Sufficient")],
                1),
            new TalentModel(
                "Risks (Plains)",
                "The character is familiar with the various environmental hazards implicit in the wilderness. Any time the character travels within a particular kind of environment, chosen when this talent is purchased, he may make an Average D1 Survival test. On success, the character is able to avoid all implicit dangers – possibly avoiding dangerous encounters. Each point of Momentum may be spent to protect one of the character’s allies from these same risks.",
                [new TalentPrerequisite("Self Sufficient")],
                1),
            new TalentModel(
                "Risks (Subterranean)",
                "The character is familiar with the various environmental hazards implicit in the wilderness. Any time the character travels within a particular kind of environment, chosen when this talent is purchased, he may make an Average D1 Survival test. On success, the character is able to avoid all implicit dangers – possibly avoiding dangerous encounters. Each point of Momentum may be spent to protect one of the character’s allies from these same risks.",
                [new TalentPrerequisite("Self Sufficient")],
                1),
            new TalentModel(
                "Risks (Urban)",
                "The character is familiar with the various environmental hazards implicit in the wilderness. Any time the character travels within a particular kind of environment, chosen when this talent is purchased, he may make an Average D1 Survival test. On success, the character is able to avoid all implicit dangers – possibly avoiding dangerous encounters. Each point of Momentum may be spent to protect one of the character’s allies from these same risks.",
                [new TalentPrerequisite("Self Sufficient")],
                1),
            new TalentModel(
                "Remedies",
                "The character knows various natural or traditional remedies for illness and sickness that can be found in the wild. When outside of the city, the character may substitute his Survival skill for Treatment.",
                [new VariableTalentsPrerequisite(["Risks (Arctic)", "Risks (Desert)", "Risks (Jungle)", "Risks (Mountain)", "Risks (Forest)", "Risks (Plains)", "Risks (Subterranean", "Risks (Urban)"]), new ExpertisePrerequisite(Skill.Survival, 2)],
                1),
            new TalentModel(
                "Rewards",
                "The character recognises that there is a broad range of valuable resources that grow or may be recovered from wilderness areas. When travelling through the wilderness, he may make a Challenging D2 Survival test once per week. Success, and each point of Momentum earned provides a type of resource that can be brokered or traded for one asset.",
                [new TalentPrerequisite("Remedies")],
                1),
            new TalentModel(
                "Tracker",
                "The character has learned to recognise all the signs of passage, from the subtle to the obvious, and has become particularly adept at following a target. When tracking an opponent, the character reduces the difficulty of the Survival test by one step per rank of Tracker. This may eliminate the need for a test.",
                [new TalentPrerequisite("Self Sufficient")],
                3),
            new TalentModel(
                "Scrounger",
                "Useful items and resources are often discarded or abandoned. A resourceful individual can often recover these for his own purposes. The character may reduce the Restriction value when attempting to acquire an item equal to his ranks of Scrounger, to a minimum of one.",
                [new TalentPrerequisite("Self Sufficient")],
                2),
            new TalentModel(
                "Provider",
                "The character is particularly capable of finding the necessities of life. When attempting to find food, water, or shelter, each point of Momentum earned on the Survival test can be spent to provide necessities for two additional allies, or for two additional days if on his own.",
                [new TalentPrerequisite("Scrounger"), new ExpertisePrerequisite(Skill.Survival, 2)],
                1),
        ],
        [Skill.Thievery]: [
            new TalentModel(
                "Life of Crime",
                "After years of dealing with the criminal underworld, the character has a basic familiarity of how to interact with this segment of the population. When the character generates at least one success on a Persuade or Education test to relate to or interact with the criminal element, he may immediately roll one additional d20 and add the result to the skill test.",
                [new ExpertisePrerequisite(Skill.Thievery, 1)],
                1),
            new TalentModel(
                "Spot the Mark",
                "The character is particularly astute at recognising profitable opportunities. He may substitute his Thievery skill for Observation on any tests that are related to committing a crime.",
                [new TalentPrerequisite("Life of Crime")],
                1),
            new TalentModel(
                "Petty Larceny",
                "The character has become particularly adept at picking pockets, short cons, and other minor crimes. When committing such feats, an opponent’s difficulty to detect the scam or crime is increased by one for each rank of Petty Larceny.",
                [new TalentPrerequisite("Spot the Mark"), new ExpertisePrerequisite(Skill.Thievery, 1)],
                3),
            new TalentModel(
                "Misdirection",
                "A successful theft relies on making sure the target has no reason to expect it. In an opposed Thievery test (such as against Observation to see if the theft is noticed), if the character generates at least one success, he may immediately roll one additional d20 and add the result to the skill test.",
                [new TalentPrerequisite("Petty Larceny"), new ExpertisePrerequisite(Skill.Thievery, 2)],
                1),
            new TalentModel(
                "Know the Risks",
                "The character may re-roll one d20 when making a Thievery test, but must accept the new result.",
                [new TalentPrerequisite("Life of Crime")],
                1),
            new TalentModel(
                "Inconspicuous",
                "Committing a crime is easy, getting away with it is another matter entirely. Through practice, the thief has learned how to avoid notice by blending in with the crowd. He may substitute his Thievery skill for Stealth when attempting to escape from a crime scene.",
                [new TalentPrerequisite("Know the Risks"), new ExpertisePrerequisite(Skill.Thievery, 1)],
                1),
            new TalentModel(
                "Bypass Security",
                "The character has studied different security systems and has developed a broad range of different techniques to mitigate their efficiency. Any time a character with Bypass Security attempt to pick a lock or overcome a security system – regardless of whether it is mechanical or electronic – he may re-roll a number of d20s equal to his ranks of Thievery Expertise. The results on the re-rolled dice must be accepted.",
                [new TalentPrerequisite("Life of Crime"), new ExpertisePrerequisite(Skill.Thievery, 1)],
                1),
            new TalentModel(
                "Manipulate the Odds",
                "The character recognises that the only way to be sure of succeeding at crimes continually, is by always working to shift the odds in his favour. When preparing to commit a crime – or investigating another criminal’s methods – he reduces the difficulty rating for all Education, Observation, and Persuade tests by one per rank of Manipulate the Odds, to a minimum difficulty of one.",
                [new TalentPrerequisite("Bypass Security"), new ExpertisePrerequisite(Skill.Thievery, 2)],
                3),
        ],
        [Skill.Treatment]: [
            new TalentModel(
                "First Responder",
                "Some characters are used to being the first to arrive at the scene of an accident or injury, and are capable of providing care under difficult conditions. The character may re-roll one d20 when making a Treatment test, but must accept the new result.",
                [new ExpertisePrerequisite(Skill.Treatment, 1)],
                1),
            new TalentModel(
                "Ration Meds",
                "The character has had to work with very limited resources in the past, and has learned to take full advantage of them when available. Each dose of Coagulant from a medkit or automed adds two Momentum to the Treatment test instead of the usual one.",
                [new TalentPrerequisite("First Responder")],
                1),
            new TalentModel(
                "Empathic Healer",
                "The character has a natural sense for the treatment of injuries, and understands that often a careful, gentle approach can be more effective than hurried, drastic action. When the character passes a Treatment test while performing first aid, each Momentum spent allows the target to recover two Light Wounds to the hit location of the healer’s choice.",
                [new TalentPrerequisite("Ration Meds"), new ExpertisePrerequisite(Skill.Treatment, 2)],
                1),
            new TalentModel(
                "Flexible Techniques",
                "The character has learned a range of different approaches to healing injuries, and is capable of adapting those techniques in the field. The difficulty for any Treatment test is reduced by 1 step, to a minimum of one.",
                [new TalentPrerequisite("Empathic Healer")],
                1),
            new TalentModel(
                "Avoid Danger",
                "The character recognises various environmental risks and knows how to mitigate them. The character may substitute his Treatment skill for Survival for the purposes of avoiding hazards.",
                [new TalentPrerequisite("First Responder")],
                1),
            new TalentModel(
                "Comforting Words",
                "The character has learned how to best assist individuals in working through the mental consequences of a particularly traumatic experience. When the character passes a Treatment test while assisting a character recovering Mental Wounds, each Momentum spent allows the target to recover one additional Mental Wound.",
                [new TalentPrerequisite("First Responder")],
                1),
            new TalentModel(
                "Reassuring Guidance",
                "The character recognises that rest and relaxation within a controlled environment can be an effective means to recover Mental Wounds. The character may perform a Treatment test to assist a character already undergoing natural rest who is attempting to recover Mental Wounds. This is conducted as assisting in a teamwork test.",
                [new TalentPrerequisite("Comforting Words"), new ExpertisePrerequisite(Skill.Treatment, 2)],
                1),
        ],
        [Skill.UnarmedCombat]: [
            new TalentModel(
                "Martial Artist",
                "When making an unarmed combat attack, a character may re-roll a number of damage dice equal to the number of Unarmed Combat talents he has acquired. The new die rolls must be accepted.",
                [new ExpertisePrerequisite(Skill.UnarmedCombat, 1)],
                1),
            new TalentModel(
                "Quick Grab",
                "The character’s training has focused upon speed and accuracy, enabling him to snatch an item from an opponent. When spending Momentum to disarm an opponent, the cost is reduced by one point. In addition, the character may spend one additional Momentum to gain hold of the item the target dropped.",
                [new TalentPrerequisite("Martial Artist")],
                1),
            new TalentModel(
                "Sensitive Area",
                "The character has studied anatomy and fighting styles, and recognises which portions of the body are most vulnerable to a precise attack. When spending Momentum for the Called Shot benefit on an attack made with the Unarmed Combat skill, each point of Momentum may be spent to shift the hit location roll by up to two points.",
                [new TalentPrerequisite("Quick Grab"), new ExpertisePrerequisite(Skill.UnarmedCombat, 2)],
                1),
            new TalentModel(
                "Down Target",
                "Often, success in a battle can be won by keeping an opponent disrupted. Any time the character successfully makes an Unarmed Combat attack, he gains the Stun and Knockdown weapon qualities.",
                [new TalentPrerequisite("Sensitive Area")],
                1),
            new TalentModel(
                "Block the Arm",
                "The character has learned that stopping an attack does not necessarily mean blocking the weapon. He can attempt to parry, using his Unarmed Combat skill, even when he does not have a close combat weapon drawn.",
                [new TalentPrerequisite("Martial Artist")],
                1),
            new TalentModel(
                "Avoidance",
                "As part of his unarmed combat training, the character has learned how to effectively avoid ranged attacks. He may substitute Unarmed Combat for Acrobatics when taking a Dodge Response Action.",
                [new TalentPrerequisite("Martial Artist")],
                1),
            new TalentModel(
                "Flow Like Water",
                "",
                [new TalentPrerequisite("Avoidance"), new ExpertisePrerequisite(Skill.UnarmedCombat, 2)],
                1),
        ],
        [Skill.Vacuum]: [
            new TalentModel(
                "Colonist",
                "The character may re-roll one d20 when making a Vacuum test, but must accept the new result.",
                [new ExpertisePrerequisite(Skill.Vacuum, 1)],
                1),
            new TalentModel(
                "Slow Metabolism",
                "The character has learned to function at a decreased atmospheric pressure and with a reduced level of oxygen, in order to extend time when operating in an environment that requires a pressure suit. Any time the character begins strenuous activity in a pressure suit, he may make an Average D1 Vacuum test. On a success, he does not use up any of the suit’s Oxygen Loads.",
                [new TalentPrerequisite("Colonist")],
                1),
            new TalentModel(
                "Dietary Tolerance",
                "When spending an extended time in an environment that is not terraformed, many nutritional requirements are less readily available. Substitutions must be made, but they can have serious ramifications. Some individuals are capable of adapting to these changes more effectively than others. The character may substitute Vacuum for Resistance when dealing with the consequences of malnutrition, dehydration, or sleeplessness.",
                [new TalentPrerequisite("Slow Metabolism"), new ExpertisePrerequisite(Skill.Vacuum, 2)],
                1),
            new TalentModel(
                "Radiation Resistance",
                "Either due to a genetic quirk or a deliberate anatomical modification, the character is less subject to the affects of cosmic radiation. The character may substitute Vacuum for Resistance when faced with Radiation poisoning or comparable environmental hazards.",
                [new TalentPrerequisite("Dietary Tolerance")],
                1),
            new TalentModel(
                "Spacewalk",
                "The character has significant experience in using a spacesuit and operating in zero gravity environments. Whenever a test is required for working in such an environment, the character adds two d20s to their Vacuum pool for every Dark Symmetry point spent, instead of one.",
                [new TalentPrerequisite("Colonist")],
                1),
            new TalentModel(
                "Gloved Finesse",
                "The character has learned how to work fine tools effectively, even when wearing the thick gloves that are part of a pressure suit. The character may ignore any penalties associated with wearing a pressure suit or otherwise encumbering equipment.",
                [new TalentPrerequisite("Colonist")],
                1),
            new TalentModel(
                "Gravity Savant",
                "The character has worked in a broad range of different gravitational environments and has learned to quickly adapt to such changes. The character can ignore any penalties associated with working in situations of gravity that differ from Earth normal.",
                [new TalentPrerequisite("Gloved Finesse"), new ExpertisePrerequisite(Skill.Vacuum, 2)],
                1),
        ],
        [Skill.Willpower]: [
            new TalentModel(
                "Stubborn",
                "The character may re-roll one d20 when making a Willpower test, but must accept the new result.",
                [new ExpertisePrerequisite(Skill.Willpower, 1)],
                1),
            new TalentModel(
                "Irrepressible",
                "The character has survived countless challenges and is prepared to face even more. When the character takes a Shake it Off action, he may recover two Light or Mental Wounds (or one of each) for each Momentum spent on the Willpower test.",
                [new TalentPrerequisite("Stubborn")],
                1),
            new TalentModel(
                "Courageous",
                "When confronted with a traumatic event, some characters are simply more capable of standing up to it than others. When the character must attempt a Willpower test due to exposure to a traumatic event, he may reduce the difficulty of the test one step per rank of Courageous. This may eliminate the need for a test.",
                [new TalentPrerequisite("Irrepressible"), new ExpertisePrerequisite(Skill.Willpower, 2)],
                3),
            new TalentModel(
                "Out of Darkness",
                "Some characters have such an organised mental framework that they are better able to recover from the long term effects of a traumatic event. When attempting to recover from madness, the character can reduce the difficulty of the Willpower test by one step per rank of Out of Darkness, to a minimum of one.",
                [new TalentPrerequisite("Courageous")],
                2),
            new TalentModel(
                "Jaded",
                "The character has observed and suffered cruelties repeatedly. He has built up a tolerance to mental suffering. The character increases his number of Mental Wounds by one for each rank of Jaded.",
                [new TalentPrerequisite("Stubborn")],
                3),
            new TalentModel(
                "Wary",
                "The character has seen countless advertisements and been the target of countless sales pitches. He is a cautious consumer and is hesitant to believe the hype. Any time the character is the target of a Persuade or Command action, any Dark Symmetry points paid to add dice to the Willpower test adds two dice instead of one.",
                [new TalentPrerequisite("Stubborn")],
                1),
            new TalentModel(
                "Psychic Hole",
                "The character is particularly resistant to attempts to directly manipulate his perceptions, beliefs, and mental processes. Any time the character attempts to resist supernatural powers that target his mind, any Dark Symmetry point paid to add dice to the Willpower test adds two dice instead of one.",
                [new TalentPrerequisite("Wary"), new ExpertisePrerequisite(Skill.Willpower, 2)],
                1),
        ],
        [Skill.BrotherhoodArt]: [
            new TalentModel(
                "Prophet (Gaze)",
                "You know the Gaze spell.",
                [new TalentPrerequisite("Mystic"), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Prophet (Object Reading)",
                "You know the Object Reading spell.",
                [new TalentPrerequisite("Mystic"), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Prophet (Omen)",
                "You know the Omen spell.",
                [new TalentPrerequisite("Mystic"), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Kinetic (Barrer)",
                "You know the Barrier spell.",
                [new TalentPrerequisite("Mystic"), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Kinetic (Impel)",
                "You know the Impel spell.",
                [new TalentPrerequisite("Mystic"), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Kinetic (Strike)",
                "You know the Strike spell.",
                [new TalentPrerequisite("Mystic"), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Deceiver (Cloak of Doubt)",
                "You know the Cloak of Doubt spell.",
                [new TalentPrerequisite("Mystic"), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Deceiver (Compel)",
                "You know the Compel spell.",
                [new TalentPrerequisite("Mystic"), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Deceiver (Seeming)",
                "You know the Seeming spell.",
                [new TalentPrerequisite("Mystic"), new SourcePrerequisite(Source.Brotherhood)],
                1),
        ],
        [Skill.AspectOfChangeling]: [
            new TalentModel(
                "Viridulum Minoris",
                "The character has elected to study the Aspect of Changeling, and has a solid grasp of the fundamental elements of this discipline. The character gains the Cloak of Doubt spell.",
                [new TalentPrerequisite("Mystic"), new MysticPrerequisite(), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Viridulum Mediatoris",
                "The character has achieved the first true tier of expertise in the Aspect of Changeling, and has learned to twist the minds of enemies in subtle ways. The character gains the Compel and Seeming spells.",
                [new TalentPrerequisite("Viridulum Minoris"), new ExpertisePrerequisite(Skill.Mysticism, 1), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Viridulum Majoris",
                "The character has grown skilled with the Aspect of Changeling, learning to perceive more clearly his own mind and those of his foes. The character gains the Empathy and Mind-Wall spells.",
                [new TalentPrerequisite("Viridulum Minoris"), new ExpertisePrerequisite(Skill.Mysticism, 2), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Viridulum Dominus",
                "The character has mastered the Aspect of Changeling, learning to wield emotions with surgical precision. The character gains the Glamour and Hymn of Durand spells.",
                [new TalentPrerequisite("Viridulum Majoris"), new TalentPrerequisite("Clarity of Thought"), new TalentPrerequisite("Psychic Artist"), new ExpertisePrerequisite(Skill.Mysticism, 3), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Slip from Thought",
                "The character has become skilled at minimising his presence in the awareness of others; their eyes may see him, but their minds seldom notice him unless he means them to. The character may substitute his Mysticism skill when attempting to hide or sneak.",
                [new TalentPrerequisite("Viridulum Majoris"), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Compelling Voice",
                "The character’s voice is aided by his powers, and it resonates deeply in the subconscious of his audience, reaching them almost in spite of themselves. The character may re-roll any dice on Command or Persuade tests that do not generate a success on the initial roll. The results of this re-roll must be accepted.",
                [new TalentPrerequisite("Viridulum Mediatoris"), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Clarity of Thought",
                "The character knows well the deepest recesses of his own mind, and remains in perfect control of himself. When attempting a Willpower test against mental assault, the character may increase his Willpower Focus by a number of ranks equal to his ranks in Clarity of Thought. This may increase the character’s focus beyond its normal upper limit.",
                [new TalentPrerequisite("Viridulum Majoris"), new SourcePrerequisite(Source.Brotherhood)],
                3),
            new TalentModel(
                "Psychic Artist",
                "The character is deft and careful with his powers, able to sculpt particularly convincing and effective images and emotions. When the character generates at least one success when attempting a Mysticism test to cast a Changeling spell, he may immediately roll an additional d20 and add the result to the skill test.",
                [new TalentPrerequisite("Viridulum Mediatoris"), new SourcePrerequisite(Source.Brotherhood)],
                1),
        ],
        [Skill.AspectOfElements]: [
            new TalentModel(
                "Cyaneum Minoris",
                "The character has elected to study the Aspect of Elements, and has learned to bend the air to his will. The character gains the Zephyr spell.",
                [new TalentPrerequisite("Mystic"), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Cyaneum Mediatoris",
                "The character has achieved the first true tier of expertise in the Aspect of Elements, and has learned to command liquids. The character gains the Deluge and Torrent spells.",
                [new TalentPrerequisite("Cyaneum Minoris"), new ExpertisePrerequisite(Skill.Mysticism, 1), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Cyaneum Majoris",
                "The character has reached new levels of skill with the Aspect of Elements, learning how to influence the structure and movement of solid materials. The character gains the Earthshape and Tremor spells.",
                [new TalentPrerequisite("Cyaneum Mediatoris"), new ExpertisePrerequisite(Skill.Mysticism, 2), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Cyaneum Dominus",
                "The character has mastered the Aspect of Elements, learning to conjure and wield plasma and raw energy. The character gains the Lightning and Inferno spells.",
                [new TalentPrerequisite("Cyaneum Majoris"), new TalentPrerequisite("Union of Forces"), new TalentPrerequisite("Wrath of Nature"), new ExpertisePrerequisite(Skill.Mysticism, 3), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Irresistible Force",
                "The character has learned well that the forces of nature are inexorable, and his spells reflect this. The Dark Symmetry point cost of Response Actions against spells from the Aspect of Elements is increased by X, where X is the character’s rank in Irresistible Force.",
                [new TalentPrerequisite("Cyaneum Mediatoris"), new SourcePrerequisite(Source.Brotherhood)],
                3),
            new TalentModel(
                "Immovable Object",
                "The elemental forces are unyielding, seldom subject to outside influences, and the character has learned to turn this to his advantage. When the character benefits from Cover Soak, each Dark Symmetry Icon generated adds +X Soak, where X is the character’s rank in Immovable Object.",
                [new TalentPrerequisite("Cyaneum Mediatoris"), new SourcePrerequisite(Source.Brotherhood)],
                3),
            new TalentModel(
                "Wrath of Nature",
                "When directed in anger, elemental forces are devastating. When wielding a damage-dealing spell from the Aspect of Elements, the character may spend one or more Momentum to add the Spread X quality to the spells’ damage roll, where X is equal to the Momentum spent.",
                [new TalentPrerequisite("Cyaneum Majoris"), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Union of Forces",
                "Alone, an onslaught of stone, water, or flame can be a dangerous thing. In concert, multiple elements can be particularly devastating. By spending one Momentum after casting an Aspect of Elements spell, the character may gain an additional Standard Action that may only be used to cast another, different, Aspect of Elements spell. This may only be done once per turn, and cannot be used on the same turn as he uses the Swift Strike Momentum Spend.",
                [new TalentPrerequisite("Cyaneum Majoris"), new SourcePrerequisite(Source.Brotherhood)],
                1),
        ],
        [Skill.AspectOfExorcism]: [
            new TalentModel(
                "Aureum Minoris",
                "The character has elected to study the Aspect of Exorcism, and has a solid grasp of the fundamental elements of this discipline. The character gains the Ease Suffering spell.",
                [new TalentPrerequisite("Mystic"), new MysticPrerequisite()],
                1),
            new TalentModel(
                "Aureum Mediatoris",
                "The character has achieved the first true tier of expertise in the Aspect of Exorcism, and has learnt how to heal injuries and drive out poisons. The character gains the Exorcise Wound and Exorcise Poison spells.",
                [new TalentPrerequisite("Aureum Minoris"), new ExpertisePrerequisite(Skill.Mysticism, 1)],
                1),
            new TalentModel(
                "Aureum Majoris",
                "The character has reached new levels of skill with the Aspect of Exorcism, expelling diseases of mind and body from their patients. The character gains the Exorcise Disease and Exorcise Madness spells.",
                [new TalentPrerequisite("Aureum Mediatoris"), new ExpertisePrerequisite(Skill.Mysticism, 2)],
                1),
            new TalentModel(
                "Aureum Dominus",
                "The character has mastered the Aspect of Exorcism, obtaining the most potent and complex techniques and allowing his care to purge the insidious presence of the Dark Symmetry, or even revive the recently-dead. The character gains the Exorcise Dark Influence and Exorcise Mortality spells.",
                [new TalentPrerequisite("Aureum Mediatoris"), new TalentPrerequisite("Tend to Many"), new TalentPrerequisite("Body and Mind"), new ExpertisePrerequisite(Skill.Mysticism, 3)],
                1),
            new TalentModel(
                "First Response",
                "The Mystic acts fast when people suffer. When casting an Aspect of Exorcism spell, the Mystic may re-roll one d20 if the target’s condition (injury, Mental Wounds, poison, disease, or corruption, as applicable to the spell being cast) began within the last five minutes. This does not apply to the Exorcise Mortality spell, as that is already limited to use in such immediate situations.",
                [new TalentPrerequisite("Aureum Mediatoris"), new FocusPrerequisite(Skill.Mysticism, 1)],
                1),
            new TalentModel(
                "Life for Life",
                "The Mystic is willing to suffer so that his patients do not. When casting an Aspect of Exorcism spell, the Mystic may suffer a single Serious Wound. If he does so, he gains two additional Momentum.",
                [new TalentPrerequisite("Aureum Mediatoris"), new FocusPrerequisite(Skill.Mysticism, 1)],
                1),
            new TalentModel(
                "Tend to Many",
                "The character is a veritable font of vitality; his grace and presence bring ease and succour to many. When casting an Aspect of Exorcism spell, he gains additional Momentum, which may only be used to increase the number of targets affected. The amount of additional Momentum gained is equal to the character’s rank in Tend to Many.",
                [new TalentPrerequisite("Aureum Majoris")],
                3),
            new TalentModel(
                "Body and Mind",
                "The character’s power and skill are such that the distinction between body and mind are blurred. When using an Aspect of Exorcism spell that does not heal physical wounds, the spell gains an additional Momentum spend: heal a single Light Wound per Momentum spent. When using an Aspect of Exorcism spell which does not heal Mental Wounds, the spell gains an additional Momentum spend: heal a single Mental Wound per Momentum spent.",
                [new TalentPrerequisite("Aureum Majoris")],
                1),
        ],
        [Skill.AspectOfKinetics]: [
            new TalentModel(
                "Rubrum Minoris",
                "The character has elected to study the Aspect of Kinetics, and has a solid grasp of the fundamental elements of this discipline. The character gains the Impel spell.",
                [new TalentPrerequisite("Mystic"), new MysticPrerequisite()],
                1),
            new TalentModel(
                "Rubrum Mediatoris",
                "The character has achieved the first true tier of expertise in the Aspect of Kinetics, and has learned some of the more battle-ready techniques. The character gains the Strike and Barrier spells.",
                [new TalentPrerequisite("Rubrum Minoris"), new ExpertisePrerequisite(Skill.Mysticism, 1)],
                1),
            new TalentModel(
                "Rubrum Majoris",
                "The character has reached new levels of skill with the Aspect of Kinetics, learning the ways of gravity manipulation. The character gains the Singularity and Levitate spells.",
                [new TalentPrerequisite("Rubrum Mediatoris"), new ExpertisePrerequisite(Skill.Mysticism, 2)],
                1),
            new TalentModel(
                "Rubrum Dominus",
                "The character has mastered the Aspect of Kinetics, learning to fold space and bend the very fabric of reality. The character gains the Distortion and Teleportation spells.",
                [new TalentPrerequisite("Rubrum Majoris"), new TalentPrerequisite("Kinetic Momentum"), new TalentPrerequisite("Crimson Bulwark"), new ExpertisePrerequisite(Skill.Mysticism, 3)],
                1),
            new TalentModel(
                "Crimson Bulwark",
                "The character has learned a valuable new technique, weaving the energies of his spells into protective layers of force to fortify himself in battle. The character’s Aspect of Kinetics spells gain an additional new use for Momentum: each Momentum spent, to a maximum equal to the character’s Mysticism Focus, can grant the caster +1 Soak, stacking with any armour he is already wearing. This additional Soak lasts until the start of the Mystic’s next turn.",
                [new TalentPrerequisite("Rubrum Majoris")],
                1),
            new TalentModel(
                "Distant Will",
                "The character’s grasp of the Kinetic has increased, allowing him to affect distant foes more reliably. When the character successfully casts a spell from the Aspect of Kinetics, he gains additional Momentum, which may only be used to increase the range of that spell. The amount of additional Momentum gained is equal to the character’s rank in Distant Will.",
                [new TalentPrerequisite("Rubrum Mediatoris")],
                3),
            new TalentModel(
                "Kinetic Momentum",
                "The character’s grasp of the Aspect of Kinetics has grown more refined, deftly using the power gathered for one spell to bolster the next. When the character attempts to cast a spell from the Aspect of Kinetics, and uses Momentum from the group Momentum pool, he gains an additional bonus Momentum.",
                [new TalentPrerequisite("Rubrum Majoris")],
                1),
            new TalentModel(
                "Violent Force",
                "The character has learned to unleash the most brutal and sudden forces with his spells, casting enemies aside and leaving them broken in the wake of his power. When the character successfully casts a spell from the Aspect of Kinetics, he gains additional Momentum, which may only be used to increase the damage of that spell. The amount of additional Momentum gained is equal to the character’s rank in Violent Force.",
                [new TalentPrerequisite("Rubrum Mediatoris")],
                3),
        ],
        [Skill.AspectOfManipulation]: [
            new TalentModel(
                "Aurantium Minoris",
                "The character has elected to study the Aspect of Manipulation, and has a solid grasp of the fundamental elements of this discipline. The character gains the Missive spell.",
                [new TalentPrerequisite("Mystic"), new MysticPrerequisite()],
                1),
            new TalentModel(
                "Aurantium Mediatoris",
                "The character has achieved the first true tier of expertise in the Aspect of Manipulation, and can gently push his will into the minds of others. The character gains the Hypnosis and Discern Truth spells.",
                [new TalentPrerequisite("Aurantium Minoris"), new ExpertisePrerequisite(Skill.Mysticism, 1)],
                1),
            new TalentModel(
                "Aurantium Majoris",
                "The character has reached new levels of skill with the Aspect of Manipulation, discovering how to delve deeper, both into his inner strength and into the wills of others. The character gains the Communion and Suggestion spells.",
                [new TalentPrerequisite("Aurantium Mediatoris"), new ExpertisePrerequisite(Skill.Mysticism, 2)],
                1),
            new TalentModel(
                "Aurantium Dominus",
                "The character has mastered the Aspect of Manipulation, and the minds of others are an open book to him. The character gains the Deeper Gaze and Domination spells.",
                [new TalentPrerequisite("Aurantium Majoris"), new TalentPrerequisite("Whispers of the Mind"), new TalentPrerequisite("Know Thy Foe"), new ExpertisePrerequisite(Skill.Mysticism, 3)],
                1),
            new TalentModel(
                "Whispers of the Mind",
                "The Mystic’s senses are so attuned that even without concentrating he is aware of the minds of others nearby. When the character passes an Observation test, he may spend one Momentum to know the number and location of all living, intelligent creatures within ten metres. For one additional Momentum, he may determine which of them, if any, have hostile intentions towards him.",
                [new TalentPrerequisite("Aurantium Majoris")],
                1),
            new TalentModel(
                "Know Thy Foe",
                "The Mystic has learned to pick up on the subtle psychological cues that suggest an intent to strike in those whose minds he reads. When casting any Aspect of Manipulation spell, the spell gains an additional Momentum spend: for one Momentum, perform a Response Action before your next turn against the target’s attacks without paying a Dark Symmetry point.",
                [new TalentPrerequisite("Aurantium Majoris")],
                1),
            new TalentModel(
                "Forceful Presence",
                "The character weaves his powers into his voice and his manner, lending him a presence that is difficult to ignore. When attempting any Personality-based skill test, if the character scores at least one success, he gains an additional Momentum for every rank of Forceful Presence.",
                [new TalentPrerequisite("Aurantium Mediatoris"), new FocusPrerequisite(Skill.Mysticism, 1)],
                3),
            new TalentModel(
                "Undeniable Interrogator",
                "The character’s force of will make him a formidable questioner, and few can keep secrets from him. Once per turn, the character can attempt an opposed Willpower test as a Free Action before making a Persuade test. If he succeeds, he rolls one additional d20 on that Persuade test, plus an additional d20 for every two Momentum spent.",
                [new TalentPrerequisite("Aurantium Mediatoris"), new FocusPrerequisite(Skill.Mysticism, 1)],
                1),
        ],
        [Skill.AspectOfMentalism]: [
            new TalentModel(
                "Violaceum Minoris",
                "The character has elected to study the Aspect of Mentalism, and has a solid grasp of the fundamental elements of this discipline. The character gains the Inner Gaze spell.",
                [new TalentPrerequisite("Mystic"), new MysticPrerequisite()],
                1),
            new TalentModel(
                "Violaceum Mediatoris",
                "The character has achieved the first true tier of expertise in the Aspect of Mentalism, and has learnt how to heighten his natural capabilities. The character gains the Paragon and Regeneration spells.",
                [new TalentPrerequisite("Violaceum Minoris"), new ExpertisePrerequisite(Skill.Mysticism, 1)],
                1),
            new TalentModel(
                "Violaceum Majoris",
                "The character has reached new levels of skill with the Aspect of Mentalism, discovering how to push his body beyond mortal limitations. The character gains the Perfection and Swiftness spells.",
                [new TalentPrerequisite("Violaceum Mediatoris"), new ExpertisePrerequisite(Skill.Mysticism, 2)],
                1),
            new TalentModel(
                "Violaceum Dominus",
                "The character has mastered the Aspect of Mentalism, obtaining the most potent and complex techniques and transcending the limitations of humanity. The character gains the Avatar and Void spells.",
                [new TalentPrerequisite("Violaceum Majoris"), new TalentPrerequisite("Self-Discipline"), new TalentPrerequisite("Contemplative Recuperation"), new ExpertisePrerequisite(Skill.Mysticism, 3)],
                1),
            new TalentModel(
                "Contemplative Recuperation",
                "The character has learnt how to speed his own recovery, using his understanding of the Light to focus his mind and body. He may use the Mysticism skill in place of the Treatment skill when attempting to recover his own wounds with first aid, and does not suffer the normal penalties for treating himself or for lacking any tools.",
                [new TalentPrerequisite("Violaceum Majoris")],
                1),
            new TalentModel(
                "Mental Fortress",
                "The character has achieved greater mastery of his mind. He gains an additional Mental Wound box per rank of Mental Fortress.",
                [new TalentPrerequisite("Violaceum Mediatoris"), new FocusPrerequisite(Skill.Mysticism, 1)],
                3),
            new TalentModel(
                "Purity of Self",
                "The character’s clarity and concentration have reached impressive levels. He gains an additional Momentum spend on all spells with a duration of Concentration: For one Momentum, change the duration to five minutes.",
                [new TalentPrerequisite("Violaceum Mediatoris"), new FocusPrerequisite(Skill.Mysticism, 1)],
                1),
            new TalentModel(
                "Self-Discipline",
                "The character has absolute control over his self, an iron discipline that comes from a supernatural understanding of his capabilities. When the character attempts a Mysticism test to cast a Mentalism spell, he may roll one additional d20 if he scores at least one success.",
                [new TalentPrerequisite("Violaceum Majoris")],
                1),
        ],
        [Skill.AspectOfPremonition]: [
            new TalentModel(
                "Venetum Minoris",
                "The character has elected to study the Aspect of Premonition, and has begun to explore his ability to see other times and places. The character gains the Gaze spell.",
                [new TalentPrerequisite("Mystic"), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Venetum Mediatoris",
                "The character has achieved the first true tier of expertise in the Aspect of Premonition, and has learned to focus his precognitive gaze. The character gains the Object Reading and Omen spells.",
                [new TalentPrerequisite("Venetum Minoris"), new ExpertisePrerequisite(Skill.Mysticism, 1), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Venetum Majoris",
                "The character has reached new levels of skill with the Aspect of Premonition, learning how apply his skills to the immediate future. The character gains the Glimpse and Prescient Dodge spells.",
                [new TalentPrerequisite("Venetum Mediatoris"), new ExpertisePrerequisite(Skill.Mysticism, 2), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Venetum Dominus",
                "The character has mastered the Aspect of Premonition, learning to turn foresight into wisdom and insight. The character gains the True Premonition and Foresight spells.",
                [new TalentPrerequisite("Venetum Majoris"), new TalentPrerequisite("History Repeats"), new TalentPrerequisite("Deeper Sight"), new ExpertisePrerequisite(Skill.Mysticism, 3), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Pertinent Dreams",
                "The character’s dreams are often filled with visions and symbolism that are relevant to his duties. After sleeping, the character may spend a Chronicle point in order to have had some particular vision about the following day’s events. At any point during that day, the character may call upon that vision in one of two ways: to succeed automatically on any one test without rolling and generate three Momentum on that test, or to increase the difficulty of any test made against him by three, to a maximum of five.",
                [new TalentPrerequisite("Venetum Mediatoris"), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Prophetic Insights",
                "The character sees glimpses of other times and places in everything he does, observing the fundamental patterns that govern cause and effect, and gaining insights into how events should unfold. When the character spends a Chronicle point, he may roll a DS: on a 1 or 2, immediately add that many points to the group Momentum pool. If a Dark Symmetry Icon is generated, immediately add one point to the Dark Symmetry pool.",
                [new TalentPrerequisite("Venetum Mediatoris"), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "History Repeats",
                "The character has observed the cyclical nature of time, growing to comprehend how all that has happened before will happen again. On any successful skill test, the character may spend two Momentum to keep a single d20 result from that test. On any subsequent test using that same skill, the character may substitute that d20 result for one of the d20s rolled for the new test, after the dice have been rolled. This can be used to prevent a Repercussion, by replacing a roll of 20 with a lower roll.",
                [new TalentPrerequisite("Venetum Majoris"), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Deeper Sight",
                "The character has learned never to regard existence at face value, for even the most insignificant events can have an effect on the future. When the character succeeds on a skill test, but does not roll enough successes to generate Momentum, he immediately adds one Momentum to the group Momentum pool.",
                [new TalentPrerequisite("Venetum Majoris"), new SourcePrerequisite(Source.Brotherhood)],
                1),
        ],
        [Skill.None]: [
            // Factions
            new TalentModel(
                "Under the Radar",
                "Being under the radar of the corporations, living in the gaps in society, allows you a certain amount of freedom. By necessity, plan, or desperation you have better access to items. This reduces all Restriction Ratings by one but all items come with the Quality ‘Black Market’. Possession of any equipment with this quality is illegal as the item is stolen, a knock-off, or otherwise restricted by law. Penalties start with fines and end with summary execution, depending on the faction.",
                [new VariableFactionPrerequisite([0, 1, 2])],
                1),
            new TalentModel(
                "Vassal of Mishima",
                "The character has a place within the fabric of Mishiman society, with all the advantages and responsibilities that accompany it. When legally purchasing any item manufactured by the Mishima corporation or one of its many keiretsu or subsidiaries, the character may reduce the Restriction Rating and Cost by one. All Mishimans of samurai rank have the power of life and death over their subordinates, but must abide by strict codes of conduct or lose face amongst their peers and betters. While Mishiman commoners have no particular rights, they also lack the responsibilities that burden their betters.",
                [new FactionPrerequisite(3)],
                1),
            new TalentModel(
                "Shareholder of Capitol",
                "The character has one or more shares in the Capitol corporation, and benefits from belonging to that vast and dynamic culture. When legally purchasing any item manufactured by the Capitol corporation or any of its subsidiaries, the character may reduce the Restriction Rating by one and the Cost by two. All Capitolian citizens have the full and unreserved right to possess and bear weapons of any sort within a Capitolian territory, and cannot be denied a permit or licence for a weapon unless they have a criminal record. All Capitol citizens also have the right to fair trial, the right to particular working conditions, and the right to free expression of political and spiritual beliefs.",
                [new FactionPrerequisite(4)],
                1),
            new TalentModel(
                "Subject of Bauhaus",
                "The character contributes to, and benefits from, belonging to such an ordered and prosperous society. When legally purchasing any item manufactured by the Bauhaus Corporation or any of its subsidiaries, you may reduce the Restriction Rating by one and Cost by two. All Bauhauser citizens are well-provided-for by their corporation, ensuring that their needs are met so that they, in turn, can support the corporation to the fullest degree. Bauhauser citizens receive basic healthcare from the corporation, counting as Medical Insurance with a Restriction of 1 and a Maintenance of 4, which is completely free and requires no effort or expenditure on the citizen’s part.",
                [new FactionPrerequisite(5)],
                1),
            new TalentModel(
                "Kinsman of Imperial",
                "The character has a place within the fabric of Imperial society, with all the advantages and responsibilities that accompany it. When legally purchasing any item manufactured by the Imperial corporation or one of its many clans or subsidiary companies, you may reduce the Restriction Rating and Cost by one. The reduction in Cost increases to two for any item produced by the character’s own clan. Imperial citizens cannot deny air or water to a fellow Kinsman of Imperial in need, though they have the permission to regard those who have received supplies as trespassing if they linger too long. An Imperial’s home is his castle, and thus he may defend his home with any force necessary without legal consequences.",
                [new FactionPrerequisite(6)],
                1),
            new TalentModel(
                "Employee of Cybertronic",
                "The character is one small part of the grand machine of Cybertronic society, with all the advantages and responsibilities that accompany it. When legally purchasing any item manufactured by the Cybertronic corporation, you may reduce the Restriction Rating and Cost by one. You are routinely issued with doses of the drug XLR8, sufficient to maintain your clarity of focus and protect you from the Darkness. You also have full rights to access subreality at any point (though not in such a way as would interfere with your duties).",
                [new FactionPrerequisite(7)],
                1),
            new TalentModel(
                "Tovarich of Whitestar",
                "The character takes great pride in being part of the mutual support system of the Strongholds that form the Whitestar Federation. When legally purchasing any item manufactured by Whitestar or any of its communities, he may reduce the Restriction Rating by one and Cost by one. This reduction in Cost increases to two for any item produced by the character’s own Stronghold. All Whitestar citizens have endured a near constant struggle for survival and are well aware that help may be days or even weeks away, despite the concord of support between Strongholds; every citizen of Whitestar is expected to contribute meaningfully to his Stronghold, and thereby the larger community, whilst within its walls, as even one freeloader can mean the death of several dependable contributors. Each citizen of Whitestar is entitled to freely offer his offspring to the Tsarina herself for adoption, safe in the knowledge that they will be raised in a role that will contribute to the continuation of Whitestar.",
                [new FactionPrerequisite(8)],
                1),
            new TalentModel(
                "Brother",
                "All members of the Brotherhood devote themselves to a live of poverty and prayer. Upon taking their vows, all their worldly possessions are given to the Brotherhood, but they are given the assurance that all of their material needs will be provided for by the Brotherhood. Cost is of little concern – the Brotherhood is extraordinarily wealthy. Need is the only consideration.",
                [new FactionPrerequisite(9)],
                1),
            new TalentModel(
                "Book of Law",
                "All members of the Brotherhood are issued with, and expected to know, the Book of Law – the organisation’s sacred tome and operations manual, providing both spiritual guidance and practical instruction on a wide range of subjects. A character with this talent is a member of the Brotherhood, ordained and initiated to become part of the Cardinal’s Calling. The character is afforded all the rights and privileges given to members of the Brotherhood, but he also carries the responsibilities and restrictions of the organisation as well. The character loses his Earnings Rating, and may not possess any assets – he is required to donate all existing assets and all other possessions to the Brotherhood upon gaining this talent. However, he may petition the Brotherhood for equipment necessary to his role and duties for free. Further, as a result of the intensive spiritual testing, the character’s basic Corruption Soak is three, instead of two.",
                [new FactionPrerequisite(9), new SourcePrerequisite(Source.Brotherhood)],
                1),
            new TalentModel(
                "Secret Kohort",
                "The character is a Heretic, a servant of the Dark Soul. Firstly, the character cannot be affected by Corruption personally – he is immune to any Corruption Roll that would otherwise affect him, due to the fact that his soul has already been given to the Dark Apostles, and while technology he uses can be affected by Corruption, corrupted technology is less likely to malfunction or act against him, as the malign presence recognises him as a kindred spirit. Further, a Heretic reduces the difficulty of all Willpower tests made to resist Fear caused by Dark Legion creatures by one step (which may remove the need for a test) – his tainted soul, and his familiarity with the Darkness, means that they are less horrifying to him than they are to others. The character may also learn Dark Gifts and have other abilities bestowed upon him as he progresses through the ranks of his Cult.",
                [new FactionPrerequisite(666), new SourcePrerequisite(Source.DarkSoul)],
                1),

            // Brotherhood
            new TalentModel(
                "Tithed",
                "Any character may voluntarily choose to pay additional Brotherhood tithes. To indicate that the character has made this decision, he reduces his Earnings rating by one. Tithed characters may make Persuade tests as outlined in the Brother talent, above. Once this decision is made it cannot be undone without explaining to several inquisitors why your personal need is more than that of humanity. Characters with Tithed cannot make tests to acquire weapons, ammo, or armour. Players may choose to be Tithed at any point, but must surrender ten percent of their assets if this is done during play.",
                [],
                1),

            // Other
            //new TalentModel(
            //    "",
            //    "",
            //    [],
            //    1),
        ],
    };

    getTalents() {
        return this._talents;
    }

    getTalent(name: string) {
        var talent: TalentModel = null;

        var found = false;
        for (var tal in this._talents) {
            if (found) {
                break;
            }

            for (var i = 0; i < this._talents[tal].length; i++) {
                var t = this._talents[tal][i];
                if (t.name === name) {
                    talent = t;
                    break;
                }
            }
        }

        return talent;
    }

    getTalentsForSkills(skills: Skill[]) {
        var talents: TalentViewModel[] = [];

        skills.forEach((s, i) => {
            if (!s) {
                return;
            }

            for (var i = 0; i < this._talents[s].length; i++) {
                var include = true;
                var talent = this._talents[s][i];

                talent.prerequisites.forEach((p, i) => {
                    if (!p.isPrerequisiteFulfilled()) {
                        include = false;
                    }
                });

                if (include) {
                    if (talent.maxRank > 1) {
                        if (character.hasTalent(talent.name) && character.talents[talent.name].rank === talent.maxRank) {
                            include = false;
                        }
                    }
                    else if (talent.maxRank === TalentSpecial.MaximumRanks_EducationFocus) {
                        if (character.hasTalent(talent.name) && character.talents[talent.name].rank === character.skills[Skill.Education].focus) {
                            include = false;
                        }
                    }
                    else if (talent.maxRank === TalentSpecial.MaximumRanks_ScienceFocus) {
                        if (character.hasTalent(talent.name) && character.talents[talent.name].rank === character.skills[Skill.Science].focus) {
                            include = false;
                        }
                    }
                    else if (talent.maxRank === TalentSpecial.MaximumRanks_SurvivalFocus) {
                        if (character.hasTalent(talent.name) && character.talents[talent.name].rank === character.skills[Skill.Survival].focus) {
                            include = false;
                        }
                    }
                    else {
                        if (character.hasTalent(talent.name)) {
                            include = false;
                        }
                    }

                    if (include) {
                        var rank = character.hasTalent(talent.name)
                            ? character.talents[talent.name].rank + 1
                            : 1;

                        talents.push(new TalentViewModel(talent.name, rank, talent.maxRank > 1, talent.description, s));
                    }
                }
            }
        });

        talents.sort((a, b) => a.name.localeCompare(b.name));

        return talents;
    }

    getSkillForTalent(talent: string) {
        for (var skill in this._talents) {
            var n = parseInt(skill);

            for (var i = 0; i < this._talents[skill].length; i++) {
                var t = this._talents[skill][i];
                if (t.name === talent) {
                    return n;
                }
            }
        }

        return 0;
    }

    getFirstTalents() {
        var talents = [];

        for (var skill in character.skills) {
            const t = this._talents[skill];
            talents.push(t[0].name);
        }

        return talents;
    }

    getTopTalents() {
        return [
            "Roll With It",
            "Uncanny Dodge",
            "Free Runner",
            "Smells Right",
            "Strong Rider",
            "Animal Healer",
            "Strong Grip",
            "Strong Swimmer",
            "Wall Crawler",
            "Reflexive Block",
            "Quick Draw",
            "Weapon Master (1H)",
            "Weapon Master (Unbalanced)",
            "Weapon Master (2H)",
            "Minions",
            "Font Of Courage",
            "Coordinator",
            "Counter Offer",
            "Newsmonger",
            "Play The Part",
            "Lethal Barrage",
            "Expert Spotter",
            "Lightning Crew",
            "Booya!",
            "Steady Arms",
            "Suppressive",
            "Know The Signs",
            "New Perspective",
            "Avoid Corruption",
            "High Command",
            "Silver Spoon",
            "Big Spender",
            "In Plain Sight",
            "Way With Words",
            "Instant Translator",
            "Assembly Line",
            "Snap Diagnosis",
            "Jury Rig",
            "Trauma Surgeon",
            "Field Dressing",
            "Bolster Immunity",
            "Slayer Of Darkness",
            "Ritualist",
            "Mystic Ward",
            "Find The Weak Spot",
            "Sense Memory",
            "Subtle Examination",
            "Obfuscation",
            "Bedroom Eyes",
            "Remorseless",
            "Ramming Speed",
            "Storm Breaker",
            "Winged Victory",
            "Alienist",
            "Psychoanalyst",
            "Remote Specialist",
            "Double Tap",
            "Through and Through",
            "Precise Targeting",
            "Quick Healer",
            "Resilient",
            "Fever Dreams",
            "Scientist",
            "Comptographer",
            "Bioengineer",
            "Starfighter",
            "Alone In The Night",
            "Fleet Action",
            "Insertion",
            "Obscure Trail",
            "Impersonation",
            "Rewards",
            "Tracker",
            "Provider",
            "Misdirection",
            "Inconspicuous",
            "Manipulate The Odds",
            "Flexible Techniques",
            "Avoid Danger",
            "Reassuring Guidance",
            "Down Target",
            "Block The Arm",
            "Flow Like Water",
            "Radiation Resistance",
            "Spacewalk",
            "Gravity Savant",
            "Out Of Darkness",
            "Jaded",
            "Psychic Hole"
        ].sort((a, b) => a.localeCompare(b));
    }
}

export const TalentsHelper = new Talents();