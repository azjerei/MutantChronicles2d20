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

class AdolescenceEventsCapitol {
    generateEvent(roll: number): AdolescenceEventModel {
        switch (roll) {
            case 2:
                return new AdolescenceEventModel(new EventModel(
                    "A stranger visited your family and they spoke in hushed tones with a family member - what did they talk about? Your family's surname is infamous amongst Corporate elite; Persuade tests when dealing with them are 1 difficulty greater.",
                    "Shady Past",
                    "Your family's surname is infamous amongst Corporate elite; Persuade tests when dealing with them are 1 difficulty greater."
                ));
            case 3:
                return new AdolescenceEventModel(new EventModel(
                    "Notorious: Something your family did haunts you wherever you go – what is it? Security guards tend to become alert when they hear your name. When trying to pass unnoticed, increase the difficulty of Stealth or Persuade tests by one if your identity is known.",
                    "Infamous",
                    "When trying to pass unnoticed, increase the difficulty of Stealth or Persuade tests by one if your identity is known."
                ));
            case 4:
                return new AdolescenceEventModel(new EventModel(
                    "Slender: Your body is thin, and you have never been able to build up much body mass. Use the next worst row on the Starting Wounds Table to determine your starting wounds.",
                    "Frail",
                    "Use the next worst row on the Starting Wounds Table to determine your starting wounds."
                ),
                () => { character.woundsBonus--; }); 
            case 5:
                return new AdolescenceEventModel(new EventModel(
                    "Sick of the Brotherhood: You were dragged to cathedral services every single week without fail. Now, you are sick of the sight of Brotherhood missionaries. Your seething resentment reduces your Corruption Soak by one.",
                    "Anti-Religion",
                    "Your seething resentment reduces your Corruption Soak by one."
                )); 
            case 6:
                return new AdolescenceEventModel(new EventModel(
                    "Far Too Trusting: You just do not know when to say no. Social tests against you receive one bonus Momentum, but your openness to adventure has paid off – gain one asset.",
                    "Weak Willed",
                    "Social tests against you receive one bonus Momentum."
                ),
                () => { character.assets++; }); 
            case 7:
                return new AdolescenceEventModel(new EventModel(
                    "Impoverished: Your family has fallen upon hard times. Reduce your Earnings rating by one.",
                    "Spendthrift",
                    "Your family has fallen upon hard times."
                ),
                () => { character.earnings = Math.max(0, character.earnings - 1); }); 
            case 8: {
                var years = Math.floor(Math.random() * 6) + 1;
                return new AdolescenceEventModel(new EventModel(
                    `Criminal Record: For whatever reason, you were caught up in criminal activities. Spend ${years} years in jail. Gain a criminal record.`,
                    "Criminal Record",
                    "Criminal Record: For whatever reason, you were caught up in criminal activities."
                ),
                () => {
                    character.age += years;
                    character.applyCriminalRecord();
                });
            }
            case 9:
                return new AdolescenceEventModel(new EventModel(
                    "School Sports Hero: You led your school’s sports team to several championships and were expected to become one of the greats... but something got in the way of your potential, and you never fulfilled your dreams. Your Fame increases by one, as people still recognise you from time to time, but your Corruption Soak is reduced by one because of bitterness and resentment.",
                    "Washed Up",
                    "Your Fame increased by one, as people still recognise you from time to time, but your Corruption Soak is reduced by one because of bitterness and resentment."
                ),
                () => { character.fame++; }); 
            case 10:
                return new AdolescenceEventModel(new EventModel(
                    "Indebted: You owe a favour to a notable politician, one of Capitol’s high-ranking political elite. The politician can call in your debt at any point, requesting a service from you. If you refuse, you gain a powerful enemy.",
                    "Burden of Debt",
                    "You owe a favour to a notable politician, one of Capitol’s high-ranking political elite. The politician can call in your debt at any point, requesting a service from you. If you refuse, you gain a powerful enemy."
                )); 
            case 11:
                return new AdolescenceEventModel(new EventModel(
                    "Devoted Employee: Even as a child, you worked hard and helped to support your family. You may re-roll 1d20 on any Lifestyle test made to acquire an item, but increase the Repercussion range of all untrained skill use by one.",
                    "Workaholic",
                    "You may re-roll 1d20 on any Lifestyle test made to acquire an item, but increase the Repercussion range of all untrained skill use by one."
                )); 
            case 12:
                return new AdolescenceEventModel(new EventModel(
                    "A Heretic in the Family: One of your family members was exposed as a Heretic and dragged away for ‘reconditioning’ by the Brotherhood. Your family has never been able to get out from under the cloud of suspicion. All Persuade tests made when dealing with members of the Brotherhood increase in difficulty by one step.",
                    "Sullied Reputation",
                    "All Persuade tests made when dealing with members of the Brotherhood increase in difficulty by one step."
                )); 
            case 13:
                return new AdolescenceEventModel(new EventModel(
                    "McCraig Mishap: An older relative or a close family friend was killed in battle at the McCraig Line. You have been determined to avenge his death ever since. You may always choose to enter a Military Primary Career.",
                    "Never Give Up",
                    "An older relative or a close family friend was killed in battle at the McCraig Line. You have been determined to avenge his death ever since."
                ),
                () => {
                    const militaryCareers = PrimaryCareersHelper.getMilitaryCareers();
                    for (var i = 0; i < militaryCareers.length; i++) {
                        character.addFreeCareer(militaryCareers[i]);
                    }
                });
            case 14:
                return new AdolescenceEventModel(new EventModel(
                    "Diseased: A childhood illness forever plagues you. The illness is treatable, but incurable. You must have one dose of medication (Restriction 1, Cost 4) each day, or you have one fewer Serious Wound box and one fewer Critical Wound box than normal that day.",
                    "Sickly",
                    "A childhood illness forever plagues you. The illness is treatable, but incurable. You must have one dose of medication (Restriction 1, Cost 4) each day, or you have one fewer Serious Wound box and one fewer Critical Wound box than normal that day."
                )); 
            case 15:
                return new AdolescenceEventModel(new EventModel(
                    "A Lot of Fights: Violence is a universal language, and you are fluent in it. You know that most fights are won before the other side even knows it has started. During the first round of a combat, so long as the enemy does not have surprise, you may take an Exploit Weakness action as a Restricted Action.",
                    "Bully",
                    "During the first round of a combat, so long as the enemy does not have surprise, you may take an Exploit Weakness action as a Restricted Action."
                )); 
            case 16:
                return new AdolescenceEventModel(new EventModel(
                    "Injured: You had a terrible childhood accident. All movement related skill tests are one difficulty step harder, but you have gained a strong will. All Mental Strength tests are one difficulty step lower (minimum 1).",
                    "Disabled",
                    "All movement related skill tests are one difficulty step harder, but you have gained a strong will. All Mental Strength tests are one difficulty step lower (minimum 1)."
                )); 
            case 17:
                return new AdolescenceEventModel(new EventModel(
                    "Child Star: You were in movies, TV, or radio as a child. Whether you like it or not, that fame will follow you, often in the form of “Where are they now?” documentaries. Your Fame increases by one, and you may always choose to enter a Media Primary Career.",
                    "Grew Up In The Spotlight",
                    "You were in movies, TV, or radio as a child. Whether you like it or not, that fame will follow you, often in the form of “Where are they now?” documentaries."
                ),
                () => { character.fame++; });
            case 18:
                return new AdolescenceEventModel(new EventModel(
                    "Allergic Reaction: Your body is intolerant of a number of chemical substances. All Resistance tests for artificial substances are increased by one level of difficulty. Coagulant provides no bonuses to Treatment or Medicine tests when used on you.",
                    "Industrial Hay Fever",
                    "All Resistance tests for artificial substances are increased by one level of difficulty. Coagulant provides no bonuses to Treatment or Medicine tests when used on you."
                )); 
            case 19:
                return new AdolescenceEventModel(new EventModel(
                    "Criminal Family: A friend or distant relative has ties to criminal enterprise. You may freely choose the Criminal Primary Career. You are often called upon to perform favours – no questions asked – for ‘a mutual friend’, but you can ask for a favour in return for any favour you perform.",
                    "Friends in Low Places",
                    "A friend or distant relative has ties to criminal enterprise. You are often called upon to perform favours – no questions asked – for ‘a mutual friend’, but you can ask for a favour in return for any favour you perform."
                ),
                () => { character.addFreeCareer(PrimaryCareer.Criminal); }); 
            case 20:
                return new AdolescenceEventModel(new EventModel(
                    "Local Hero: You performed an act of such exceptional heroism that it was picked up by the corporate media. Increase your Fame by one.",
                    "Egotistical",
                    "You performed an act of such exceptional heroism that it was picked up by the corporate media."
                ),
                () => { character.fame++; });
            case 21:
                return new AdolescenceEventModel(new EventModel(
                    "Gifted Student: Your talent at your studies have brought you to the attention of a leading academic. You gain an ally in the form of a leading academic in a particular field you excel at, and may freely choose the Academic Primary Career. However, you also gain a rival in the form of someone jealous of your accomplishments.",
                    "The Jealousy of Others",
                    "You gain an ally in the form of a leading academic in a particular field you excel at. However, you also gain a rival in the form of someone jealous of your accomplishments."
                ),
                () => { character.addFreeCareer(PrimaryCareer.AcademicResearcher); }); 
            case 22:
                return new AdolescenceEventModel(new EventModel(
                    "Patriot: You believe more strongly in the righteousness of Capitol than in anything else; even faith in the Brotherhood is secondary to the glory of Capitol. You may re-roll 1d20 on any Willpower test to resist coercion or influence from another – even from supernatural sources. However, you increase the difficulty of Education tests by one due to your blind adherence to corporate dogma.",
                    "Loyal to a Fault",
                    "You may re-roll 1d20 on any Willpower test to resist coercion or influence from another – even from supernatural sources. However, you increase the difficulty of Education tests by one due to your blind adherence to corporate dogma."
                )); 
            case 23:
                return new AdolescenceEventModel(new EventModel(
                    "Political Ambition: You have a knack for being in the right place at the right time, claiming responsibility for successes while creatively distancing yourself from failures. You may re-roll 1d20 on a Lifestyle or Persuade test made to deceive or present a success as your own. However, you increase the difficulty of all Command tests by one, because your subordinates do not trust you.",
                    "Sneaky",
                    "You may re-roll 1d20 on a Lifestyle or Persuade test made to deceive or present a success as your own. However, you increase the difficulty of all Command tests by one, because your subordinates do not trust you."
                )); 
            case 24:
                return new AdolescenceEventModel(new EventModel(
                    "Foot in your Mouth: You have a terrible way with words. Persuasion tests increase their difficulty by one step, but when successful gain one additional Momentum.",
                    "Tactless",
                    "Persuasion tests increase their difficulty by one step, but when successful gain one additional Momentum."
                ));
            case 25:
                return new AdolescenceEventModel(new EventModel(
                    "Fanatical: You obsess about one particular subject or topic, and know far more about it than most. Nominate a single narrow field of interest. Gain a single bonus Momentum on Education tests relating to your chosen field of interest.",
                    "Obsessive",
                    "Nominate a single narrow field of interest. Gain a single bonus Momentum on Education tests relating to your chosen field of interest."
                )); 
            case 26:
                return new AdolescenceEventModel(new EventModel(
                    "Informant: You helped solve a serious crime. You have a contact in the Capitol Security Services. If you ever gain a Criminal Record, you may reduce your Earnings Rating by one to remove it. Social tests with this contact are one difficulty step lower.",
                    "Snitch",
                    "You have a contact in the Capitol Security Services. Social tests with this contact are one difficulty step lower."
                ),
                () => { character.canRemoveCriminalRecord = true; });
            case 27: {
                const roll = Math.floor(Math.random() * 6) + 1;
                const directorate = roll === 1
                    ? "Mystics"
                    : roll === 2
                        ? "Inquisition"
                        : roll <= 4
                            ? "The Mission"
                            : "The Administration";

                return new AdolescenceEventModel(new EventModel(
                    `Contact Within The Brotherhood: An old friend of yours joined the Brotherhood. You have endeavoured to stay in contact. You have a contact within the Brotherhood (${directorate}).`,
                    "Pious",
                    `You have a contact within the Brotherhood (${directorate}).`
                ));
            }
            case 28: {
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
            case 29:
                return new AdolescenceEventModel(new EventModel(
                    "Contact with the Underworld: You spend a lot of time with the wrong kinds of people, either due to a rebellious streak or circumstances at home. Your friends taught you how to survive on the streets, how to steal, beg, rob, or other ‘useful life lessons’. You may or may not have cut ties with your old associates, but they certainly remember you. You are comfortable working on the wrong side of the law, and know how to communicate with people. You gain one bonus Momentum on successful Persuade and Thievery tests made to interact with the criminal element, including gang members.",
                    "Bad Company",
                    "You gain one bonus Momentum on successful Persuade and Thievery tests made to interact with the criminal element, including gang members."
                )); 
            case 30: {
                var assets = Math.floor(Math.random() * 6) + 1;

                return new AdolescenceEventModel(new EventModel(
                    `Inheritance: A relative leaves you money in their will. Gain ${assets} Assets at age of 20 as long as you don't get a criminal record before then.`,
                    "Annoying Family",
                    "A relative leaves you money in their will."
                ),
                () => { character.setAssetsTrigger(assets, 20); });
            }
            case 31:
                return new AdolescenceEventModel(new EventModel(
                    "Could’ve been a Contender: You have been getting in fights since you were a child, and even spent some time training to try to control your violent instincts. Your familiarity with violence increases your melee bonus damage by +1[DS].",
                    "Merciless",
                    "Your familiarity with violence increases your melee bonus damage by +1[DS]."
                ),
                () => { character.meleeIncrease++; }); 
            case 32: {
                const effect = character.isOptional
                    ? "You may reduce the Life Point cost of your first career by one, to a minimum of zero."
                    : "You roll twice when determining your first Primary Career and get to choose between the two.";

                return new AdolescenceEventModel(new EventModel(
                    `Top of Your Class: You were highly proficient in your studies, which makes you highly desirable to employers. ${effect}`,
                    "Egotistical",
                    "Top of Your Class: You were highly proficient in your studies, which makes you highly desirable to employers."
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
                    "Stock Savant: You see the patterns in numbers like few others, and you became one of the youngest in your generation to make a fortune in the stock market. Job offers follow in abundance. Your Earnings Rating increases by two and you may enter an Executive Primary Career.",
                    "Number Cruncher",
                    "You see the patterns in numbers like few others, and you became one of the youngest in your generation to make a fortune in the stock market. Job offers follow in abundance."
                ),
                () => {
                    character.earnings += 2;
                    character.addFreeCareer(PrimaryCareer.CorporateExecutive);
                }); 
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
                    "No Fear: You stood up to muggers and gangs as a kid, and you have got the scars to prove it. You do not scare easily. You gain one bonus Momentum on Willpower tests to resist mental assaults.",
                    "Reckless",
                    "You gain one bonus Momentum on Willpower tests to resist mental assaults."
                )); 
            case 37:
                return new AdolescenceEventModel(new EventModel(
                    "Rags to Riches Story: Your family’s wealth and prestige grew almost overnight. However, the change in standing has left you unsympathetic to those who have not been as fortunate. Increase your Earnings Rating and Fame by one each.",
                    "Disdainful of the Poor",
                    "Your family’s wealth and prestige grew almost overnight. However, the change in standing has left you unsympathetic to those who have not been as fortunate."
                ),
                () => {
                    character.earnings++;
                    character.fame++;
                }); 
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
                    }));
                } 
            case 39:
                return new AdolescenceEventModel(new EventModel(
                    "Ten-HUT! Your parents ran your family with military discipline, and you were given little sympathy from the moment you were born. You have had to work for everything, and few things compare to the harshness of your upbringing. Use the next best row when determining starting Wounds.",
                    "Unsympathetic to Weakness",
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

export const CapitolAdolescenceEvents = new AdolescenceEventsCapitol();