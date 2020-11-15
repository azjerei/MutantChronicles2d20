import {character} from '../common/character';
import {EventModel, AdolescenceEventModel} from '../common/eventModel';
import {Faction, FactionsHelper} from './factions';
import {PrimaryCareer, PrimaryCareersHelper} from'./primaryCareers';
import {StatusHelper} from './status';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {TalentsHelper} from './talents';
import { Source } from './sources';
import { MutationsHelper } from './mutations';

class AdolescenceEventsCybertronic {
    generateEvent(roll: number): AdolescenceEventModel {
        switch (roll) {
            case 2:
                return new AdolescenceEventModel(new EventModel(
                    "XLR8 Intolerance: Your brain chemistry did not respond to Brain Grease in the correct way, at least not at first. You were locked away for years while they worked to correct the problem. Your implants still do not work quite right, but you have learned to live with it. Whenever you suffer Dread, you gain one more Dread than usual.",
                    "Firmware Glitch",
                    "Whenever you suffer Dread, you gain one more Dread than usual."
                ));
            case 3: {
                return new AdolescenceEventModel(new EventModel(
                    "Genetic Defect: For whatever reason, your genes have produced a bizarre quirk that marks you out as different. What strange little thing can you do? It should not provide any Skill benefit. The defect increases the difficulty of Command, Lifestyle and Persuade tests amongst people who have seen your bizarre quirk.",
                    "Scientific Scrutiny",
                    "Your genes have produced a bizarre quirk. What strange little thing can you do? The defect increases the difficulty of Command, Lifestyle and Persuade tests amongst people who have seen your bizarre quirk."
                ));
            }
            case 4: {
                var limb = "leg";
                const roll = Math.floor(Math.random() * 6) + 1;
                if (roll <= 3) limb = "arm";

                return new AdolescenceEventModel(new EventModel(
                    `Maimed and Rebuilt: Whether because of the circumstances that brought you to Cybertronic, or some accident during your recovery, you are not intact. You had the injury corrected with a cybernetic, but it has never quite felt right. You have a Cyberlimb (${limb}). Due to PDD you have one fewer Mental Wound.`,
                    "Prosthetic Dissociation Disorder",
                    `You are not fully intact. You had the injury corrected with a cybernetic, but it has never quite felt right. You have a Cyberlimb (${limb}).`
                ),
                    () => { character.mentalWoundsIncrease--; });
            }
            case 5:
                return new AdolescenceEventModel(new EventModel(
                    "Diseased: An illness or other malady forever plagues you. The illness is treatable, but incurable. You have one fewer Serious Wound box and one fewer Critical Wound box than normal.",
                    "Sickly",
                    "The illness is treatable, but incurable. You have one fewer Serious Wound box and one fewer Critical Wound box than normal."
                ),
                    () => { character.seriousWoundsIncrease--; character.criticalWoundsIncrease--; });
            case 6:
                return new AdolescenceEventModel(new EventModel(
                    "Bad Reputation: You are a devoted employee, but you do not always act as your superiors would like, and have gained a reputation for poor discipline and insubordination. Increase the repercussion range by one for any Command, Lifestyle, or Persuade test made to interact with another Cybertronic employee.",
                    "Bad Reputation",
                    "Increase the repercussion range by one for any Command, Lifestyle, or Persuade test made to interact with another Cybertronic employee."
                ));
            case 7:
                return new AdolescenceEventModel(new EventModel(
                    "Financial Incentive: Problematic signs in your aptitude testing result in you being given a poorer work placement. Reduce your Earnings Rating by one.",
                    "Low Expectations",
                    "Problematic signs in your aptitude testing result in you being given a poorer work placement."
                ),
                    () => { character.earnings = Math.max(character.earnings - 1, 0); });
            case 8:
                return new AdolescenceEventModel(new EventModel(
                    "Isolated Node: For reasons nobody has ever quite explained, you do not interact well with other people. You gain one bonus Momentum on all skill tests outside of combat, but cannot use Momentum from the group pool.",
                    "Doesn't Play Well With Others",
                    "You gain one bonus Momentum on all skill tests outside of combat, but cannot use Momentum from the group pool."
                ));
            case 9:
                return new AdolescenceEventModel(new EventModel(
                    "A Lot of Fights: Violence is a universal language, and you are fluent in it. You know that most fights are won before the other side knows it has even started. During the first round of a combat, so long as the enemy does not have surprise, you may take an Exploit Weakness action as a Restricted Action.",
                    "Violent",
                    "During the first round of a combat, so long as the enemy does not have surprise, you may take an Exploit Weakness action as a Restricted Action."
                ));
            case 10:
                return new AdolescenceEventModel(new EventModel(
                    "Unknowing Infamy: You did something in your life before Cybertronic, or you look like someone who did, and people tend to recognise you for it. It is quite inconvenient. You increase the repercussion range by one of any Command, Lifestyle, or Persuade test made to interact with non-Cybertronic characters.",
                    "Recognisable Face",
                    "You increase the repercussion range by one of any Command, Lifestyle, or Persuade test made to interact with non-Cybertronic characters."
                ));
            case 11:
                return new AdolescenceEventModel(new EventModel(
                    "Allergic Reaction: Your body is intolerant of a number of chemical substances. All Resistance tests for artificial substances are increased by one level of difficulty. Coagulant provides no bonuses to Treatment or Medicine tests when used on you.",
                    "Industrial Hay Fever",
                    "All Resistance tests for artificial substances are increased by one level of difficulty. Coagulant provides no bonuses to Treatment or Medicine tests when used on you."
                ));
            case 12:
                return new AdolescenceEventModel(new EventModel(
                    "Devoted Employee: Almost from the moment you awoke, you worked hard and helped to support Cybertronic. You may re-roll 1d20 on any Lifestyle test made to acquire an item, but increase the repercussion range of all untrained skill use by one.",
                    "Workaholic",
                    "You may re-roll 1d20 on any Lifestyle test made to acquire an item, but increase the repercussion range of all untrained skill use by one."
                ));
            case 13:
                return new AdolescenceEventModel(new EventModel(
                    "Ferocious Demeanour: Your manner is harsh and unsettling, too cold and hard to be entirely human, and too cruel to be entirely machine. On a successful Persuade test when attempting to intimidate someone, you may spend one Momentum to inflict one Dread on the target. However, Persuade tests to befriend or calm others increase in difficulty by one step.",
                    "Intimidating",
                    "On a successful Persuade test when attempting to intimidate someone, you may spend one Momentum to inflict one Dread on the target. However, Persuade tests to befriend or calm others increase in difficulty by one step."
                ));
            case 14:
                return new AdolescenceEventModel(new EventModel(
                    "Sleep When You’re Dead: Because of some quirk of your recruitment, or some experimental process or implant used on you, your sleep patterns are erratic. However, you have learned to cope by taking countless impromptu microsleeps during downtime. You may re-roll one d20 when making a Resistance test against sleep deprivation.",
                    "Light Sleep",
                    "You may re-roll one d20 when making a Resistance test against sleep deprivation."
                ));
            case 15:
                return new AdolescenceEventModel(new EventModel(
                    "Unforeseen Connection: Your subreality link initially gave you strange visions of a man trapped in Cybertronic Tower, calling out to you. The next software update put an end to the visions, and you have been under quiet scrutiny ever since. You are extraordinarily wary; when you make an Observation or Insight test, and roll within the skill’s Focus range, you generate three successes instead of two.",
                    "Being Observed",
                    "You are extraordinarily wary; when you make an Observation or Insight test, and roll within the skill’s Focus range, you generate three successes instead of two."
                ));
            case 16:
                return new AdolescenceEventModel(new EventModel(
                    "Humourless: You have little patience for, or understanding of, the mirth of others. You are always focussed on the job at hand, with no time for frivolity. You increase the difficulty of Persuade tests made outside of formal situations by one step. However, you gain one more Mental Wound than normal.",
                    "Relentlessly Serious",
                    "You increase the difficulty of Persuade tests made outside of formal situations by one step. However, you gain one more Mental Wound than normal."
                ),
                    () => { character.mentalWoundsIncrease++; });
            case 17:
                return new AdolescenceEventModel(new EventModel(
                    "Sick of the Brotherhood: You have reacted strongly and violently to learning of the Brotherhood’s oppression of your fellow Cybers, and are actively intolerant of them, rather than merely disdainful. You increase the difficulty of Command, Lifestyle, and Persuade tests when dealing with members of the Brotherhood and those you know to be devout cathedral-goers.",
                    "Anti-Religious",
                    "You increase the difficulty of Command, Lifestyle, and Persuade tests when dealing with members of the Brotherhood and those you know to be devout cathedral-goers."
                ));
            case 18:
                return new AdolescenceEventModel(new EventModel(
                    "Subreality Beta Test: You have been involved in trialling pre-release versions of subreality systems, and have a mild addiction to the experience of subreality. You may re-roll one d20 on any test made in subreality. However, you must pass an Average D1 Willpower test each day you do not use subreality; failure indicates that you suffer one Dread. The difficulty of this test increases by one for each successive day without subreality use.",
                    "Tech Addict",
                    "You may re-roll one d20 on any test made in subreality. However, you must pass an Average D1 Willpower test each day you do not use subreality; failure indicates that you suffer one Dread. The difficulty of this test increases by one for each successive day without subreality use."
                ));
            case 19:
                return new AdolescenceEventModel(new EventModel(
                    "Contact Network: Perhaps in anticipation of some future mission, your education contained an in-depth understanding of the local criminal underworld. Under the guise of a freelancer, you have cultivated ties with these people. Cybertronic gives you the freedom to maintain these connections as you see fit. You gain one bonus Momentum on Stealth or Thievery tests to pass yourself off as a freelancer or criminal. You are often called upon to perform favours – no questions asked – for ‘a mutual friend’, but you can ask for a favour in return for any favour you perform.",
                    "Friends in Low Places",
                    "You gain one bonus Momentum on Stealth or Thievery tests to pass yourself off as a freelancer or criminal. You are often called upon to perform favours – no questions asked – for ‘a mutual friend’, but you can ask for a favour in return for any favour you perform."
                ));
            case 20:
                return new AdolescenceEventModel(new EventModel(
                    "Philosophical Insight: You were one of a test batch of TIFFs given an intensive course on ancient philosophy and spiritualism in an effort to aid social development. You gain one bonus Momentum on Insight tests, but increase the repercussion range of Insight tests by one as well – you are good at reading people, but do not always read the signals right.",
                    "Frequently Cryptic",
                    "You gain one bonus Momentum on Insight tests, but increase the repercussion range of Insight tests by one as well."
                ));
            case 21:
                return new AdolescenceEventModel(new EventModel(
                    "Gifted Student: Your talent at your studies have brought you to the attention of Cybertronic’s academic community. You gain an ally in the form of a leading academic in a particular field you excel at. However, you also gain a rival in the form of someone jealous of your accomplishments.",
                    "The Jealousy of Others",
                    "You gain an ally in the form of a leading academic in a particular field you excel at. However, you also gain a rival in the form of someone jealous of your accomplishments."
                ));
            case 22: {
                const faction = FactionsHelper.getFaction(FactionsHelper.generateOriginFaction()).name;

                return new AdolescenceEventModel(new EventModel(
                    `Revealed a Traitor: Your actions – deliberately or inadvertently – revealed a traitor or the plans of another faction. Gain an enemy in ${faction}. Your success means you get better job opportunities than most, increasing your Earnings Rating by one.`,
                    "An Enemy's Revenge",
                    `Your actions – deliberately or inadvertently – revealed a traitor or the plans of another faction. Gain an enemy in ${faction}.`
                ),
                    () => { character.earnings++; });
            }
            case 23:
                return new AdolescenceEventModel(new EventModel(
                    "Superb Senses: You have got extremely sharp senses, and have a knack for spotting trouble. When determining surprise at the start of a combat, you may re-roll 1d20 on your Observation test.",
                    "Cautious",
                    "When determining surprise at the start of a combat, you may re-roll 1d20 on your Observation test."
                ));
            case 24:
                return new AdolescenceEventModel(new EventModel(
                    "Strong-Willed: Unending disputes with your employers or your customers have hardened your determination. You may re-roll 1d20 on any Willpower test.",
                    "Stubborn to a Fault",
                    "You may re-roll 1d20 on any Willpower test."
                ));
            case 25:
                return new AdolescenceEventModel(new EventModel(
                    "Obsessive Fan: You know way too much about something. Gain one Momentum on Education tests to know things about your obsessive topic.",
                    "Obsessive",
                    "Gain one Momentum on Education tests to know things about your obsessive topic."
                ));
            case 26:
                return new AdolescenceEventModel(new EventModel(
                    "Internal Calm: You have extremely good control over your mental state, able to compartmentalise and shut away your anxieties when threatened. Gain one bonus Momentum on the Willpower test attempted on a Shake It Off Action.",
                    "Detached and Dispassionate",
                    "Gain one bonus Momentum on the Willpower test attempted on a Shake It Off Action."
                ));
            case 27:
                return new AdolescenceEventModel(new EventModel(
                    "Blind Obedience: Your devotion to Cybertronic’s senior management is unswerving. You follow orders from your superiors to the letter, to the detriment of critical thinking or self-preservation. You may re-roll 1d20 on any Willpower test to resist coercion or influence from another – even from supernatural sources. However, you increase the difficulty of Education skill tests by one due to your blind adherence to your managers’ dogma.",
                    "Loytal to a Fault",
                    "You may re-roll 1d20 on any Willpower test to resist coercion or influence from another – even from supernatural sources. However, you increase the difficulty of Education skill tests by one due to your blind adherence to your managers’ dogma."
                ));
            case 28:
                return new AdolescenceEventModel(new EventModel(
                    "Cartel Briefings: You were thoroughly prepared and instructed on the nuances of Cartel politics, and you know how to work the system… to the frustrations of others when your negotiations move with all the speed of glaciers. You gain two bonus Momentum on all Persuade tests made when dealing with characters from other corporations. However, you also increase the time taken to make those Persuade tests by one step.",
                    "Bureaucratic Obstruction",
                    "You gain two bonus Momentum on all Persuade tests made when dealing with characters from other corporations. However, you also increase the time taken to make those Persuade tests by one step."
                ));
            case 29:
                return new AdolescenceEventModel(new EventModel(
                    "Secretive: You do not share what you know, unless it is absolutely necessary, and even then only reluctantly. You gain one bonus Momentum on Stealth tests, but increase the difficulty of Persuade tests by one step.",
                    "Secretive",
                    "You gain one bonus Momentum on Stealth tests, but increase the difficulty of Persuade tests by one step."
                ));
            case 30:
                return new AdolescenceEventModel(new EventModel(
                    "High Performance Expectations: You are placed in high-importance positions due to promising aptitude testing. There is a lot of pressure, but the rewards make up for it. Increase your Earnings Rating by one.",
                    "Stressful Work Environment",
                    "You are placed in high-importance positions due to promising aptitude testing. There is a lot of pressure, but the rewards make up for it."
                ),
                    () => { character.earnings++; });
            case 31:
                return new AdolescenceEventModel(new EventModel(
                    "Chasseur Preparation: During your training regimen, you were given additional basic combat drills to test your suitability for SWI. You demonstrated a particular knack for inflicting harm. Increase either your Ranged or Melee damage bonus by +1[DS].",
                    "Merciless",
                    "During your training regimen, you were given additional basic combat drills to test your suitability for SWI. You demonstrated a particular knack for inflicting harm.",
                    [
                        "Ranged damage bonus",
                        "Melee damage bonus"
                    ],
                    (option) => {
                        if (option.indexOf("Ranged") > -1) {
                            character.rangedIncrease++;
                        }
                        else {
                            character.meleeIncrease++;
                        }
                    }
                ));
            case 32: {
                const effect = character.isOptional
                    ? "You may reduce the Life Point cost of your first career by one, to a minimum of zero."
                    : "You roll twice when determining your first Primary Career and get to choose between the two.";

                return new AdolescenceEventModel(new EventModel(
                    `Extremely Promising: You were highly proficient in your studies, which makes you highly desirable to employers. ${effect}`,
                    "Egotistical",
                    "You were highly proficient in your studies, which makes you highly desirable to employers."
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
            case 33:
                return new AdolescenceEventModel(new EventModel(
                    "Addiction: There is something you cannot get enough of. What is it? You will take risks to satisfy your craving. Availability tests for procuring your addiction are Difficulty 1.",
                    "Addict",
                    "Availability tests for procuring your addiction are Difficulty 1."
                ));
            case 34:
                return new AdolescenceEventModel(new EventModel(
                    "Foil a Plot: You managed to prevent harm coming to Cybertronic, and received an additional stipend as a reward. Gain five assets.",
                    "Noteworthy",
                    "You managed to prevent harm coming to Cybertronic, and received an additional stipend as a reward."
                ),
                () => { character.assets += 5; });
            case 35: {
                const effect = character.isOptional
                    ? "You may reduce the Life Point cost of your first career by one, to a minimum of zero."
                    : "You roll twice when determining your first Primary Career and get to choose between the two.";

                return new AdolescenceEventModel(new EventModel(
                    `Influential Patron: Your godparent has connections everywhere, and is willing to use them on your behalf. ${effect}. Further, because you get a better job than most, increase your Earnings Rating by one.`,
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

                    character.earnings++;
                });
            }
            case 36:
                return new AdolescenceEventModel(new EventModel(
                    "No Fear: The synthetic nature of subreality skewed your perceptions, and you seldom regard even deadly peril with the fear such situations should warrant. You reduce the difficulty of Willpower tests against mental assaults by one.",
                    "Reckless",
                    "You reduce the difficulty of Willpower tests against mental assaults by one."
                ));
            case 37:
                return new AdolescenceEventModel(new EventModel(
                    "Experimental Subject: You volunteer for a complex experiment that you do not entirely understand. You came out the other end with a top-of-the-line implant, and tend to take success in stride… to the point where you are more than a little obnoxious about it. Gain a single implant with Cost of 20 or less.",
                    "Obnoxious",
                    "Gain a single implant with Cost of 20 or less."
                ));
            case 38: {
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
            case 39:
                return new AdolescenceEventModel(new EventModel(
                    "Hardened by the Frontier: A life on the edge of civilisation can be hard, and you had the worst of it where you came from. The punishing life has given you a strong body. Use the next best row when determining starting Wounds.",
                    "Unsympathetic to the Weak",
                    "Use the next best row when determining starting Wounds."
                ),
                () => { character.woundsBonus++ }); 
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

export const CybertronicAdolescenceEvents = new AdolescenceEventsCybertronic();