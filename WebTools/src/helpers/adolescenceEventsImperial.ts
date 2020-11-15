import {character} from '../common/character';
import {EventModel, AdolescenceEventModel} from '../common/eventModel';
import {Faction, FactionsHelper} from './factions';
import {PrimaryCareer, PrimaryCareersHelper} from'./primaryCareers';
import {StatusHelper} from './status';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {TalentsHelper} from './talents';
import {ClansHelper} from './clans';
import {ClanAdolescenceEvents} from './clanAdolescenceEvents';
import { Source } from './sources';
import { MutationsHelper } from './mutations';

class AdolescenceEventsImperial {
    generateEvent(roll: number): AdolescenceEventModel {
        switch (roll) {
            case 2:
                return new AdolescenceEventModel(new EventModel(
                    "Disowned: You, or a member of your immediate family, stand accused of a horrific crime against your clan. Whether true or not, your family’s name is tarnished. Your social standing is reduced by 1.",
                    "Shunned",
                    "You, or a member of your immediate family, stand accused of a horrific crime against your clan. Whether true or not, your family’s name is tarnished."),
                    () => {
                        StatusHelper.reduceStatus();
                    });
            case 3:
                return new AdolescenceEventModel(new EventModel(
                    "Genetic Defect: For whatever reason, your genes have produced a bizarre quirk that marks you out as different. What strange little thing can you do? It should not provide any skill benefit. The defect increases the difficulty of Command, Lifestyle, and Persuade tests amongst people who have seen your bizarre quirk.",
                    "Freak",
                    "Your mutation does not provide any Skill benefit and will make Command, Lifestyle, and Persuade tests more difficult by one step if people see you do it."));
            case 4:
                return new AdolescenceEventModel(new EventModel(
                    "Disabled: You had a terrible childhood accident. All movement related skill tests are one difficulty level harder, but you have gained a strong will. All Mental Strength tests are one difficulty lower (minimum 1).",
                    "Disabled",
                    "All movement related skill tests are one difficulty level harder, but you have gained a strong will. All Mental Strength tests are one difficulty lower (minimum 1)."));
            case 5:
                return new AdolescenceEventModel(new EventModel(
                    "Diseased: A childhood illness forever plagues you. The illness is treatable, but incurable. Each day, you require one dose of medicine (Restriction 1, Cost 4) or you have one fewer Serious Wound box and one fewer Critical Wound box than normal that day.",
                    "Sickly",
                    "A childhood illness forever plagues you. The illness is treatable, but incurable. Each day, you require one dose of medicine (Restriction 1, Cost 4) or you have one fewer Serious Wound box and one fewer Critical Wound box than normal that day."));
            case 6: {
                const effect = character.family === 0
                    ? " You have been raised in an affiliated family. Your social standing and earnings is reduced to match that family."
                    : " You have been raised in the core family. Your social standing and earnings is increased to match that family.";

                return new AdolescenceEventModel(new EventModel(
                    `Switched at Birth: Although born to the core family of your clan, you were exchanged at birth for the child of an affiliated family. ${effect}. If your true heritage is ever discovered, your social standing and earnings will be reset to your true family.`,
                    "Unknown Legacy",
                    `Although born to the core family of your clan, you were exchanged at birth for the child of an affiliated family. ${effect}. If your true heritage is ever discovered, your social standing and earnings will be reset to your true family.`));
            }
            case 7: {
                const years = Math.floor(Math.random() * 6) + 1;

                return new AdolescenceEventModel(new EventModel(
                    `Serious Crime Committed: Guilty or not, you are implicated and convicted of a serious crime. You spend ${years} years in juvenile detention.`,
                    "Criminal Record",
                    `Guilty or not, you are implicated and convicted of a serious crime. You spend ${years} years in juvenile detention.`),
                    () => {
                        character.age += years;
                        character.applyCriminalRecord();
                    });
            }
            case 8:
                return new AdolescenceEventModel(new EventModel(
                    "Minor Crime Committed: You messed up and are convicted of a minor crime. You spend 1 year in juvenile detention.",
                    "Criminal Record",
                    "You messed up and are convicted of a minor crime. You spend 1 year in juvenile detention."),
                    () => {
                        character.age++;
                        character.applyCriminalRecord();
                    });
            case 9:
                return new AdolescenceEventModel(new EventModel(
                    "Criminal in the Family: A close relative is in prison during your childhood, giving you a glimpse of the criminal world. You may freely choose the Criminal Primary Career. You are often a suspect in police enquiries, and all Persuade tests made with security or law enforcement are one step more difficult. However, you gain your criminal relative as an ally.",
                    "Connected to Criminals",
                    "You are often a suspect in police enquiries, and all Persuade tests made with security or law enforcement are one step more difficult. However, you gain your criminal relative as an ally."),
                    () => { character.addFreeCareer(PrimaryCareer.Criminal); });
            case 10:
                return new AdolescenceEventModel(new EventModel(
                    "A Lot of Fights: Violence is a universal language, and you are fluent in it. You know that most fights are won before the other side knows it has even started. During the first round of a combat, so long as the enemy does not have surprise, you may take an Exploit Weakness action as a Restricted Action.",
                    "Bully",
                    "During the first round of a combat, so long as the enemy does not have surprise, you may take an Exploit Weakness action as a Restricted Action."));
            case 11:
                return new AdolescenceEventModel(new EventModel(
                    "Allergic Reaction: Your body is intolerant of a number of chemical substances. All Resistance tests for artificial substances are increased by one level of difficulty. Coagulant provides no bonuses to Treatment or Medicine tests when used on you.",
                    "Industrial Hay Fever",
                    "All Resistance tests for artificial substances are increased by one level of difficulty. Coagulant provides no bonuses to Treatment or Medicine tests when used on you."));
            case 12: {
                const assets = Math.floor(Math.random() * 6) + 1;

                return new AdolescenceEventModel(new EventModel(
                    `Orphaned: Your parents died in a mysterious accident, and you were sent to an orphanage. Your social standing is reduced, and you gain ${assets} assets when you turn 20, from an estate left to you.`,
                    "All By Yourself",
                    "Your parents died in a mysterious accident, and you were sent to an orphanage."),
                    () => {
                        StatusHelper.reduceStatus();
                        character.setAssetsTrigger(assets, 20);
                    });
            }
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
                return ClanAdolescenceEvents.generateEvent(character.clan);
            case 21:
                return new AdolescenceEventModel(new EventModel(
                    "Gifted Student: Your talent at your studies have brought you to the attention of a leading academic. You gain an ally in the form of a leading academic in a particular field you excel at, and may freely choose the Academic Primary Career. However, you also gain a rival in the form of someone jealous of your accomplishments.",
                    "The Jealousy of Others",
                    "Your talent at your studies have brought you to the attention of a leading academic. You gain an ally in the form of a leading academic in a particular field you excel at. However, you also gain a rival in the form of someone jealous of your accomplishments."),
                    () => {
                        character.addFreeCareer(PrimaryCareer.AcademicResearcher);
                        character.addFreeCareer(PrimaryCareer.AcademicSolicitor);
                    });
            case 22: {
                const faction = FactionsHelper.generateHeritage();
                const factionName = FactionsHelper.getFaction(faction).name;

                return new AdolescenceEventModel(new EventModel(
                    `Revealed a Traitor: Your actions – deliberately or inadvertently – revealed a traitor, or the plans of ${factionName}. You gain an enemy in ${faction}. Your success means that you get better job opportunities, your Earnings Rating increase by one.`,
                    "An Enemy's Revenge",
                    `Your actions – deliberately or inadvertently – revealed a traitor, or the plans of ${factionName}. You gain an enemy in ${faction}.`),
                    () => { character.earnings++; });
            }
            case 23:
                return new AdolescenceEventModel(new EventModel(
                    "Superb Senses: You have got extremely sharp senses, and have a knack for spotting trouble. When determining surprise at the start of a combat, you may re-roll 1d20 on your Observation test.",
                    "Cautious",
                    "When determining surprise at the start of a combat, you may re-roll 1d20 on your Observation test."));
            case 24:
                return new AdolescenceEventModel(new EventModel(
                    "Strong-Willed: Unending disputes with your parents, employers, or your customers have hardened your determination.  You may re-roll 1d20 on any Willpower test.",
                    "Stubborn to a Fault",
                    " You may re-roll 1d20 on any Willpower test."));
            case 25:
                return new AdolescenceEventModel(new EventModel(
                    "Obsessive Fan: You know way too much about something. Gain one Momentum on Education tests to know things about your obsessive topic.",
                    "Obsessive",
                    "You know way too much about something. Gain one Momentum on Education tests to know things about your obsessive topic."));
            case 26:
                return new AdolescenceEventModel(new EventModel(
                    "Grass: You helped solve a serious crime. You have a contact in the Gendarmerie. If you ever gain a Criminal Record, you may reduce your Earnings Rating by one to remove it. Social tests with this contact are one difficulty level lower.",
                    "Snitch",
                    "You helped solve a serious crime. You have a contact in the Gendarmerie. Social tests with this contact are one difficulty level lower."),
                    () => { character.canRemoveCriminalRecord = true; });
            case 27: {
                let clan = ClansHelper.generateClan();
                if (clan === character.clan) {
                    clan = ClansHelper.generateClan();
                }

                const clanName = ClansHelper.getClan(clan).name;

                return new AdolescenceEventModel(new EventModel(
                    `Contact Within Another Clan: A friend at school has influence within his own clan. You kept in touch. You have a contact in the core family of Clan ${clanName}.`,
                    "Social Butterfly",
                    `A friend at school has influence within his own clan. You kept in touch. You have a contact in the core family of Clan ${clanName}.`));
            }
            case 28: {
                const roll = Math.floor(Math.random() * 6) + 1;
                const directorate = roll === 1
                    ? "Mystics"
                    : roll === 2
                        ? "Inquisition"
                        : roll <= 4
                            ? "The Mission"
                            : "The Administration";

                return new AdolescenceEventModel(new EventModel(
                    `Contact Within The Brotherhood: You have a contact within the Brotherhood (${directorate}).`,
                    "Pious",
                    `You have a contact within the Brotherhood (${directorate}).`
                ));
            }
            case 29: {
                var faction = FactionsHelper.generateHeritage();
                while (faction === Faction.Capitol) {
                    faction = FactionsHelper.generateHeritage();
                }

                var name = FactionsHelper.getFaction(faction).name;

                return new AdolescenceEventModel(new EventModel(
                    `Contact Within Another Corporation: You made a friend from ${name} when you were younger.`,
                    "Well-Travelled",
                    `You made a friend from ${name} when you were younger.`
                ));
            }
            case 30: {
                var assets = Math.floor(Math.random() * 6) + 1;

                return new AdolescenceEventModel(new EventModel(
                    `Inheritance: A relative leaves you money in their will. Gain ${assets} Assets at age of 20 as long as you don't get a criminal record before then.`,
                    "Annoying Family",
                    "A relative left you money in their will."),
                    () => { character.setAssetsTrigger(assets, 20); });
            }
            case 31:
                return new AdolescenceEventModel(new EventModel(
                    "Friends in Low Places: You spent a lot of time with the wrong people, either due to a rebellious streak or circumstances at home; or you could simply not have had a lot of options. Your friends taught you how to survive on the street, how to steal, beg, rob, or other “useful life lessons”. You may or may not have cut your ties with your old associates, but they surely remember you. Even if they do not, the law certainly does. You are comfortable around low-lifes and know how to communicate with them. Gain a free Momentum on successful Social tests with criminals, gang members, or people with Social Status 0 or 1. Alternatively, gain a criminal contact.",
                    "Bad Company",
                    "You are comfortable around low-lifes and know how to communicate with them. Gain a free Momentum on successful Social tests with criminals, gang members, or people with Social Status 0 or 1. Alternatively, gain a criminal contact."));
            case 32: {
                const effect = character.isOptional
                    ? "You may reduce the Life Point cost of your first career by one, to a minimum of zero."
                    : "You roll twice when determining your first Primary Career and get to choose between the two.";

                return new AdolescenceEventModel(new EventModel(
                    `Top of Your Class: You were highly proficient in your studies, which makes you highly desirable to employers. ${effect}`,
                    "Egotistical",
                    "Top of Your Class: You were highly proficient in your studies, which makes you highly desirable to employers."),
                    () => {
                        if (character.isOptional) {
                            character.firstCareerCostReduction++;
                        }
                        else {
                            character.rollTwoCareers = true;
                        }
                    });
            }
            case 33:
                return new AdolescenceEventModel(new EventModel(
                    "Addiction: There is something you cannot get enough of. What is it? You will take risks to satisfy your craving. Availability tests for procuring your addiction are Difficulty 1.",
                    "Addict",
                    "There is something you cannot get enough of. What is it? You will take risks to satisfy your craving. Availability tests for procuring your addiction are Difficulty 1."));
            case 34:
                return new AdolescenceEventModel(new EventModel(
                    "Foil a Plot: You managed to prevent harm coming to your clan. Increase your social standing by one.",
                    "Noteworthy",
                    "You managed to prevent harm coming to your clan."));
            case 35: {
                const effect = character.isOptional
                    ? "You may reduce the Life Point cost of your first career by one, to a minimum of zero."
                    : "You roll twice when determining your first Primary Career and get to choose between the two.";

                return new AdolescenceEventModel(new EventModel(
                    `Influential Godparent: Your godparent has connections everywhere, and is willing to use them on your behalf. ${effect}`,
                    "Name-Dropping",
                    "Your godparent has connections everywhere, and is willing to use them on your behalf."
                ),
                    () => {
                        if (character.isOptional) {
                            character.firstCareerCostReduction++;
                        }
                        else {
                            character.rollTwoCareers = true;
                        }
                    });
            }
            case 36:
                return new AdolescenceEventModel(new EventModel(
                    "Heir Apparent: You are named the heir to your family, once the current head of the family dies. This is a lot of responsibility for someone so young, but you need to prepare for your ascension. Your Social Standing increases by one, and once the current head of the family dies, you increase your Earnings Rating by one as well, as you take control of the family’s concerns. However, you also become the primary target of the family’s enemies, and decisions about the family fall to you.",
                    "Weight of Responsibility",
                    "You are named the heir to your family, once the current head of the family dies. This is a lot of responsibility for someone so young, but you need to prepare for your ascension. Your Social Standing increases by one, and once the current head of the family dies, you increase your Earnings Rating by one as well, as you take control of the family’s concerns. However, you also become the primary target of the family’s enemies, and decisions about the family fall to you."));
            case 37: {
                var t = [];

                if (character.hasSource(Source.Mutants)) {
                    t.push(...MutationsHelper.generateLesserPower().map(p => { return MutationsHelper.getMutation(p).name; }));
                }
                else {
                    t.push(...TalentsHelper.getTopTalents());
                }

                return new AdolescenceEventModel(new EventModel(
                    "Minor Mutation: There's something quite cool you can do, it got you in trouble a few times before you learned to hide it. What is it? Why did your parents tell you never to tell anyone about it? You try not to use it much as you get killer headaches afterwards. You can pay a Chronicle Point to use this ability however you take a D2 Mental Assault afterwards, from the pain it causes. Describe how your mutant heritage allows you to do this.",
                    "Mutant",
                    "You can pay a Chronicle Point to use your mutation, however you take a D2 Mental Assault afterwards, from the pain it causes.",
                    t,
                    (option) => {
                        if (!character.hasSource(Source.Mutants)) {
                            character.addTalent(option);
                            character.adolescenceEvent.effect = `${option}. ${character.adolescenceEvent.effect}`;
                        }
                        else {
                            const effect = MutationsHelper.getMutationByName(option).description;
                            character.adolescenceEvent.effect = `${option}. ${effect} ${character.adolescenceEvent.effect}`;
                            character.addTalent(option);
                        }
                    }
                ));
            }
            case 38:
                return new AdolescenceEventModel(new EventModel(
                    "Lottery Win: You won a massive prize, sufficient to make you independently wealthy. Increase your Earnings Rating by two, and gain ten additional assets. You also gain the attention of distant relatives who only show up to borrow money.",
                    "Money Solves All Problems",
                    "You won a massive prize, sufficient to make you independently wealthy. You gain the attention of distant relatives who only show up to borrow money."),
                    () => {
                        character.earnings += 2;
                        character.assets += 10;
                    });
            case 39:
                return new AdolescenceEventModel(new EventModel(
                    "Hardened by the Frontier: A life in the colonies can be hard, and you had the worst of it where you came from. The punishing life or training has given you a strong body. Take your wounds from the next best row in the wounds table.",
                    "Unsympathetic to the Weak",
                    "A life in the colonies can be hard, and you had the worst of it where you came from. The punishing life or training has given you a strong body."),
                    () => { character.woundsBonus++; });
            case 40: {
                var t = [];

                if (character.hasSource(Source.Mutants)) {
                    t.push(...MutationsHelper.generateLesserPower().map(p => { return MutationsHelper.getMutation(p).name; }));
                }
                else {
                    t.push(...TalentsHelper.getTopTalents());
                }

                return new AdolescenceEventModel(new EventModel(
                    "You're changing, you can feel it, there's something going on inside your body since you were a kid, you have these odd dreams, and you're afraid people will think your corrupted or something. What one thing about you is different from other people that you have to hide? You can pay a Chronicle Point to use this ability. Describe how your mutant heritage allows you to do this.",
                    "Mutant",
                    "You can pay a Chronicle Point to use your mutation.",
                    t,
                    (option) => {
                        if (!character.hasSource(Source.Mutants)) {
                            character.addTalent(option);
                            character.adolescenceEvent.effect = `${option}. ${character.adolescenceEvent.effect}`;
                        }
                        else {
                            const effect = MutationsHelper.getMutationByName(option).description;
                            character.adolescenceEvent.effect = `${option}. ${effect} ${character.adolescenceEvent.effect}`;
                            character.addTalent(option);
                        }
                    }
                ));
            }
        }
    }
}

export const ImperialAdolescenceEvents = new AdolescenceEventsImperial();