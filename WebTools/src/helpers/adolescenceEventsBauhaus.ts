import {character} from '../common/character';
import {EventModel, AdolescenceEventModel} from '../common/eventModel';
import {Faction, FactionsHelper} from './factions';
import {PrimaryCareer, PrimaryCareersHelper} from'./primaryCareers';
import {StatusHelper} from './status';
import {Attribute} from './attributes';
import {Skill, SkillsHelper} from './skills';
import {TalentsHelper} from './talents';
import { MutationsHelper } from './mutations';
import { Source } from './sources';

class AdolescenceEventsBauhaus {
    generateEvent(roll: number): AdolescenceEventModel {
        switch (roll) {
            case 2:
                return new AdolescenceEventModel(new EventModel(
                    "You have no idea why, but as a youth a number of your acquaintances were rounded up and sent to the gulags. Whilst you have no idea what they had done, you fear you might be under suspicion. You have an Enemy in Law Enforcement, and you may not enter a Police career. Further, you may freely select the Criminal Primary Career at the start of your first Career Phase.",
                    "Guilt By Association",
                    "You have an Enemy in Law Enforcement."
                ),
				() => {
                    const careers = PrimaryCareersHelper.getPoliceCareers();
					for (var career in careers) {
						character.addProhibitedPrimaryCareer(careers[career]);
					}
					
					character.addFreeCareer(PrimaryCareer.Criminal);
				});
            case 3:
                return new AdolescenceEventModel(new EventModel(
                    "Your immediate family come from a branch of the family considered in some way disreputable. If noble, your forefathers have performed some act that has brought shame on the family. If a commoner, your family used to be noble, but have fallen into disgrace. You increase the Repercussion range of all Persuade, Lifestyle, and Command tests by one step. However, necessity means that you may re-roll one d20 on any Survival or Thievery test you attempt.",
                    "Bad Seed",
                    "You increase the Repercussion range of all Persuade, Lifestyle, and Command tests by one step. However, necessity means that you may re-roll one d20 on any Survival or Thievery test you attempt."
                ));
            case 4:
                return new AdolescenceEventModel(new EventModel(
                    "There’s something odd you can do, nothing much, just… weird. What is it, why are you afraid of showing people what you can do? What strange little thing can you do? It should not provide any Skill benefit and will make Command, Lifestyle, and Persuade tests more difficult by one step if people see you do it.",
                    "Mutation",
                    "Your mutation does not provide any Skill benefit and will make Command, Lifestyle, and Persuade tests more difficult by one step if people see you do it."
                ));
            case 5:
                return new AdolescenceEventModel(new EventModel(
                    "Your father was a military man, and his fathers before him. From birth your family have prepared you for your place in the army, but shouldn’t there be more to life? If you do not have the Teenage Draft, Military Academy, or Officer Training education, you must enter the Reserves. Further, you may always choose to enter a Military career for free. However, your resentment reduces your Corruption Soak by one.",
                    "Unwanted Heritage",
                    "Your resentment reduces your Corruption Soak by one."
                ),
				() => {
                    const careers = PrimaryCareersHelper.getMilitaryCareers();
					for (var career in careers) {
						character.addFreeCareer(careers[career]);
					}
				});
            case 6:
                return new AdolescenceEventModel(new EventModel(
                    "You just don’t know when to say no. Command and Persuade tests against you receive one bonus Momentum, but your openness to opportunity has paid off. Gain one Asset.",
                    "Weak Willed",
                    "Command and Persuade tests against you receive one bonus Momentum."
                ),
				() => { character.assets++; });
            case 7: {
                const skills = SkillsHelper.getSkills();
                const options = skills.map(s => {
                    return SkillsHelper.getSkillName(s);
                });
				
                return new AdolescenceEventModel(new EventModel(
                    "During your childhood you developed a naïve and self-taught ability to work a minor version of the Art. Nominate a single skill. When attempting a test using that skill, you may spend two Mental Wounds in order to add 1d20 to that test.",
                    "Natural Artist",
                    "When attempting a test using that skill, you may spend two Mental Wounds in order to add 1d20 to that test.",
                    options,
                    (option) => {
                        character.adolescenceEvent.effect.replace("that skill,", `${option},`);
                    }
                ));
			}
            case 8:
                return new AdolescenceEventModel(new EventModel(
                    "You are scrawny and lacking in strength. Reduce your Serious Wounds by one and increase your Critical Wounds by one.",
                    "You Feel Every Punch",
                    "Reduce your Serious Wounds by one and increase your Critical Wounds by one."
                ),
				() => {
					character.seriousWoundsIncrease--;
					character. criticalWoundsIncrease++;
				});
            case 9:
                return new AdolescenceEventModel(new EventModel(
                    "The hierarchical structure of Bauhaus gets you down. If a commoner, you feel your natural place is among the nobility. If noble, you sympathise with those amongst the common folk who advocate change. You have secret sympathies with Anarchist groups. Gain a contact amongst an Anarchist group, but also gain an enemy in the Nobility.",
                    "Anarchist Sympathies",
                    "Gain a contact amongst an Anarchist group, but also gain an enemy in the Nobility."
                ));
            case 10:
                return new AdolescenceEventModel(new EventModel(
                    "You're dim-witted. When you attempt a Willpower test against mental assault, you reduce the difficulty by one (to a minimum of one), but you always act at last in action scenes (after all NPCs have acted) unless you pay one Dark Symmetry point.",
                    "Slow to React",
                    "When you attempt a Willpower test against mental assault, you reduce the difficulty by one (to a minimum of one), but you always act at last in action scenes (after all NPCs have acted) unless you pay one Dark Symmetry point."
                ));
            case 11: {
				let years = Math.floor(Math.random() * 6) + 1;
                return new AdolescenceEventModel(new EventModel(
                    `As a young man, you committed a serious crime and spent some years in the Polar Gulags of Venus. Add ${years} years to your age and gain a criminal record.`,
                    "Criminal Record",
                    "As a young man, you committed a serious crime and spent some years in the Polar Gulags of Venus."
                ),
				() => {
					character.age += years;
					character.applyCriminalRecord();
				});
			}
            case 12: {
				let assets = Math.floor(Math.random() * 6) + 1;
                return new AdolescenceEventModel(new EventModel(
                    `You were raised in an orphanage. You often wonder who your parents might have been, and why they couldn’t take care of you themselves. Reduce your Social Status by one category. However, gain ${assets} assets at the age of 20 from an estate left to you.`,
                    "Orphan",
                    "You were raised in an orphanage. You often wonder who your parents might have been, and why they couldn’t take care of you themselves."
                ),
				() => { 
                    character.setAssetsTrigger(assets, 20); 
                    StatusHelper.reduceStatus();
				});
			}
            case 13:
                return new AdolescenceEventModel(new EventModel(
                    "You possess a degree of selfconfidence that borders on the unbearably arrogant. You gain one bonus Momentum on all Willpower tests, but you increase the Repercussion range of all Persuade tests by one.",
                    "Big Headed",
                    "You gain one bonus Momentum on all Willpower tests, but you increase the Repercussion range of all Persuade tests by one."
                ));
            case 14:
                return new AdolescenceEventModel(new EventModel(
                    "During your youth you fought a duel for love or honour. Your opponent was wounded and your honour was satisfied, though he apparently bears you a serious grudge. Gain your opponent as an enemy. If your character is not a Noble, this result indicates a confrontation that turned to violence, rather than a legitimate duel.",
                    "Duellist",
                    "Gain your opponent as an enemy."
                ));
            case 15:
                return new AdolescenceEventModel(new EventModel(
                    "You are wanted for a minor crime you committed as a youth. The magistrates have yet to apprehend you. Add one to the Repercussion range of all Persuade tests when dealing with Law Enforcement.",
                    "Wanted Man",
                    "Add one to the Repercussion range of all Persuade tests when dealing with Law Enforcement."
                ));
            case 16:
                return new AdolescenceEventModel(new EventModel(
                    "You had little contact with your peers as a child. Maybe you were raised in a rural backwater by poor farmers, or kept in private tuition by strict noble parents. Increase the difficulty of all Persuade tests by one step. However, due to your self-reliance, you gain two bonus Momentum on all Willpower tests.",
                    "Closeted Upbringing",
                    "Increase the difficulty of all Persuade tests by one step. However, due to your self-reliance, you gain two bonus Momentum on all Willpower tests."
                ));
            case 17:
                return new AdolescenceEventModel(new EventModel(
                    "Influential Godparent – you have a godparent with connections. You may choose any result from table A, or roll for free on table B.",
                    "Annoying Family",
                    "Influential Godparent – you have a godparent with connections."
                ),
				() => {
                    character.freeBasicCareer = true;
				});
            case 18:
                return new AdolescenceEventModel(new EventModel(
                    "You have always suffered from serious reactions to common allergens such as pollen or milk. All Resistance tests to resist the effects of artificial substances have their difficulty increased by one step. Coagulant used on the character provides no bonuses.",
                    "Industrial Hay Fever",
                    "All Resistance tests to resist the effects of artificial substances have their difficulty increased by one step. Coagulant used on the character provides no bonuses."
                ));
            case 19:
                return new AdolescenceEventModel(new EventModel(
                    "Criminal Family. You may freely choose the Criminal Primary Career. You are often a suspect on police enquiries and all Command and Persuade tests that involve police or security services increase in difficulty by one step. You gain a favour in a criminal organisation.",
                    "Connected to Criminals",
                    "All Command and Persuade tests that involve police or security services increase in difficulty by one step. You gain a favour in a criminal organisation."
                ),
				() => { character.freeCareers.push(PrimaryCareer.Criminal); });
            case 20:
                return new AdolescenceEventModel(new EventModel(
                    "Growing up in Bauhaus society has left you with the distinct impression that one’s worth is dictated by one’s social position. You idolise the nobility and harbour a distrust of the poor. Your fawning and obsequiousness have gained you an ally in the Bauhaus nobility. However, your scorn means that you increase the difficulty of all Persuade tests made to deal with anyone not of noble birth (regardless of corporation).",
                    "Snob",
                    "You have gained an ally in the Bauhaus nobility. However, your scorn means that you increase the difficulty of all Persuade tests made to deal with anyone not of noble birth (regardless of corporation)."
                ));
            case 21:
                return new AdolescenceEventModel(new EventModel(
                    "You’ll believe anything. Illusions seldom cause confusion. You either believe them, or you do not. All tests to deceive you with an illusion increase in difficulty by one step, but if they succeed, they last twice as long.",
                    "Naïve",
                    "All tests to deceive you with an illusion increase in difficulty by one step, but if they succeed, they last twice as long."
                ));
            case 22:
                return new AdolescenceEventModel(new EventModel(
                    "Your free time is spent largely in prayer and contemplation. You regularly attend services at the cathedral and can list the names and deeds of every Brotherhood Cardinal there has ever been. Increase your Corruption Soak by one, and re-roll one d20 on Education tests that pertain to Brotherhood history.",
                    "Pious",
                    "Increase your Corruption Soak by one, and re-roll one d20 on Education tests that pertain to Brotherhood history."
                ));
            case 23:
                return new AdolescenceEventModel(new EventModel(
                    "You spent much of your childhood in and out of hospital. Whilst you have made a full physical recovery the mental scars are still to fade. You dislike hospitals, and must attempt an Average D1 Willpower test or suffer one Dread when entering one.",
                    "Childhood Illness",
                    "You must attempt an Average D1 Willpower test or suffer one Dread when entering a hospital."
                ));
            case 24:
                return new AdolescenceEventModel(new EventModel(
                    "During your schooling you cultivated many interests, but found it hard to concentrate on any particular field of expertise. Your Signature Skills may only be trained up to four ranks of Expertise and Focus, rather than five. However, you ignore all penalties for being untrained in a skill.",
                    "Dilettante",
                    "Your Signature Skills may only be trained up to four ranks of Expertise and Focus, rather than five. However, you ignore all penalties for being untrained in a skill."
                ));
            case 25:
                return new AdolescenceEventModel(new EventModel(
                    "You once experienced a sudden trauma, like witnessing a death, or suffering an accident or an assault. It is sometimes difficult to take your mind off it. Sometimes you vividly relive the experience as if it is happening again. If you fail a Willpower test against mental assault, add +2[DS] to the dice rolled to determine mental damage.",
                    "PTSD",
                    "If you fail a Willpower test against mental assault, add +2[DS] to the dice rolled to determine mental damage."
                ));
            case 26:
                return new AdolescenceEventModel(new EventModel(
                    "You both rebel against, and internalise the attitudes of, an overweening father figure. You may reroll one d20 on any Persuade tests made to intimidate those weaker than you. However, you increase the difficulty of all other Persuade tests by one step.",
                    "Bully",
                    "You may reroll one d20 on any Persuade tests made to intimidate those weaker than you. However, you increase the difficulty of all other Persuade tests by one step."
                ));
            case 27:
                return new AdolescenceEventModel(new EventModel(
                    "During your childhood there was a great deal of conflict between your closest family members. You developed a talent for helping people find common ground. When attempting to prevent or defuse conflict, you may re-roll one d20 on Command and Persuade tests.",
                    "Mediator",
                    "When attempting to prevent or defuse conflict, you may re-roll one d20 on Command and Persuade tests."
                ));
            case 28:
                return new AdolescenceEventModel(new EventModel(
                    "You have been embroiled within a private war between two noble houses. If a noble or a retainer, you come from one of the feuding households. If a commoner or thrall, you have provided one of the families with a service that has linked you to their disputes. Gain the rival noble house as an enemy. However, you also gain five assets from the ‘spoils of war’ obtained during your part of the feud.",
                    "Noble Feuding",
                    "Gain the rival noble house as an enemy."
                ),
				() => {
					character.assets += 5;
				});
            case 29:
                return new AdolescenceEventModel(new EventModel(
                    "Pointing out the flaws in the thinking of others is a passion of yours. It is not always appreciated. You gain one bonus Momentum on Insight and Observation tests made when attempting to evaluate another person. However, you increase the difficulty of Persuade tests by one step due to your off-putting manner.",
                    "Gadfly",
                    "You gain one bonus Momentum on Insight and Observation tests made when attempting to evaluate another person. However, you increase the difficulty of Persuade tests by one step due to your off-putting manner."
                ));
            case 30:
                return new AdolescenceEventModel(new EventModel(
                    "Your parents made sure you had everything you wanted whilst growing up, and you have high expectations of the degree that others should accommodate you. You may re-roll one d20 on any Command or Lifestyle test. However, your high expectations and self-important manner increase the repercussion range of all Persuade tests you attempt by two.",
                    "Spoiled Brat",
                    "You may re-roll one d20 on any Command or Lifestyle test. However, your high expectations and self-important manner increase the repercussion range of all Persuade tests you attempt by two."
                ));
            case 31:
                return new AdolescenceEventModel(new EventModel(
                    "You spent a lot of time with the wrong people, either due to a rebellious streak or circumstances at home. Or, you could simply not have had a lot of options. Your friends taught you how to survive on the street, how to steal, beg, rob, or other “useful life lessons”. You may or may not have cut your ties with your old associates, but they surely remember you. Even if they don’t, the law certainly does. You are comfortable around low-lifes and know how to communicate with them. Gain one bonus Momentum on all Command or Persuade tests when dealing with criminals and Thralls. Alternately, gain a single Contact in a criminal organisation.",
                    "Bad Company",
                    "",
					[
						"Bonus momentum",
						"Contact in criminal organisation"
					],
					(option) => {
                        if (option === "Bonus momentum") {
                            character.adolescenceEvent.effect = "Gain one bonus Momentum on all Command or Persuade tests when dealing with criminals and Thralls.";
                        }
                        else {
                            character.adolescenceEvent.effect = "You have a contact in a criminal organisation.";
                        }
					}
                ));
            case 32:
                return new AdolescenceEventModel(new EventModel(
                    "A period of your youth was spent in an agricultural working environment, and you have learned much about herbalism and plant husbandry. You no longer suffer the untrained penalty for the Animal Handling and Survival skills. If you are trained in those skills, you may re-roll a single d20 on any test involving them.",
                    "Green Fingers",
                    "You no longer suffer the untrained penalty for the Animal Handling and Survival skills. If you are trained in those skills, you may re-roll a single d20 on any test involving them."
                ));
            case 33:
                return new AdolescenceEventModel(new EventModel(
                    "As a child you were quick to learn that the shops filled with bonbons and chocolate bars stood as testament to the fact that the solar system’s best confectioners work for Bauhaus. Overindulgence has left you overweight and somewhat unhealthy – increase the Repercussion range of all Resistance tests you attempt by one. However, you’re seldom without something sweet on your person, which allows you to re-roll one d20 on Persuade tests if you offer someone a sweet.",
                    "Sweet Tooth",
                    "Overindulgence has left you overweight and somewhat unhealthy – increase the Repercussion range of all Resistance tests you attempt by one. However, you’re seldom without something sweet on your person, which allows you to re-roll one d20 on Persuade tests if you offer someone a sweet."
                ));
            case 34:
                return new AdolescenceEventModel(new EventModel(
                    "Your body is very resistant to artificial substances and it takes a lot to make you intoxicated. All Resistance tests against artificial substances have their difficulty reduced by one step, to a minimum of one.",
                    "Extraordinary Chemical Tolerance",
                    "All Resistance tests against artificial substances have their difficulty reduced by one step, to a minimum of one."
                ));
            case 35:
                return new AdolescenceEventModel(new EventModel(
                    "Money has always been your primary incentive, and your thoughts are constantly on acquiring more. When you Apply Cash to purchasing an acquisition, you may re-roll as few or as many [DS] as you wish.",
                    "Greed",
                    "When you Apply Cash to purchasing an acquisition, you may re-roll as few or as many [DS] as you wish."
                ));
            case 36:
                return new AdolescenceEventModel(new EventModel(
                    "It’s not that you necessarily shirk work, but someone else in the vicinity always strikes you as better suited to whatever it is you might otherwise do. Your languid approach to work has gained you an enemy. However, you may reroll one d20 on any Command test you attempt, as you are quite good at delegating responsibility.",
                    "Lazy Bones",
                    "Your languid approach to work has gained you an enemy. However, you may reroll one d20 on any Command test you attempt, as you are quite good at delegating responsibility."
                ));
            case 37:
                return new AdolescenceEventModel(new EventModel(
                    "Whilst you can fake a cheery mood in company if you so wish, the truth is that you tend to focus on pessimistic perspectives on life, and that you can be melancholy. You’re seldom surprised when things go badly, so whenever you generate a Repercussion, the GM only adds one Dark Symmetry point to the pool instead of two.",
                    "What's the Point?",
                    "You’re seldom surprised when things go badly, so whenever you generate a Repercussion, the GM only adds one Dark Symmetry point to the pool instead of two."
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
                    }));
                } 
            case 39:
                return new AdolescenceEventModel(new EventModel(
                    "You were raised by parents who decided to inculcate you in unconventional beliefs. Whilst not heretical, you hold notions about history and science that vary wildly from the conventional. You increase the Repercussion range of all Education and Sciences tests by two, due to your unconventional education. However, for each d20 on an Education or Sciences test that rolls a natural 1, you generate one additional success, as your odd approach reaches an insightful conclusion.",
                    "Bad Education",
                    "You increase the Repercussion range of all Education and Sciences tests by two, due to your unconventional education. However, for each d20 on an Education or Sciences test that rolls a natural 1, you generate one additional success, as your odd approach reaches an insightful conclusion."
                ));
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

export const BauhausAdolescenceEvents = new AdolescenceEventsBauhaus();