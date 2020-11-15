import {character} from '../common/character';
import {EventModel, AdolescenceEventModel} from '../common/eventModel';
import {Faction, FactionsHelper} from './factions';
import {PrimaryCareer, PrimaryCareersHelper} from'./primaryCareers';
import {StatusHelper, Status} from './status';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {TalentsHelper} from './talents';
import {EquipmentHelper} from './equipment';
import { Source } from './sources';
import { MutationsHelper } from './mutations';

class AdolescenceEventsMishima {
    generateEvent(roll: number): AdolescenceEventModel {
        switch (roll) {
            case 2:
                return new AdolescenceEventModel(new EventModel(
                    "Family Obliterated: Your entire family displeased your liege lord and was executed as a result, leaving you as the only survivor. Reduce your Earnings Rating by two, to a minimum of zero. If you are a commoner, you are now faceless. If you are a samurai, you are now ronin. You are now subject to Persecution.",
                    "Vengeful",
                    "Your entire family displeased your liege lord and was executed as a result, leaving you as the only survivor."
                ),
				() => {
					character.earnings = Math.max(0, character.earnings - 2);
					
					if (character.status <= Status.Guildsman) {
						character.status = Status.Faceless;
					}
					else {
						character.status = Status.Ronin;
					}
				});
            case 3:
                return new AdolescenceEventModel(new EventModel(
                    "Overlord Displeased: Your family displeased the Overlord, one of the Lord Heirs, or someone similarly important. Your family’s name is infamous amongst the Mishiman elite; your Social tests amongst them are one difficulty rank higher.",
                    "Social Pariah",
                    "Your family’s name is infamous amongst the Mishiman elite; your Social tests amongst them are one difficulty rank higher."
                ));
            case 4:
                return new AdolescenceEventModel(new EventModel(
                    "Family Demoted: For some failure, real or perceived, your family was disgraced and lowered in rank. Reduce your social status and Earnings Rating both by one step. Samurai cannot be reduced lower than ronin, while commoners can be reduced to faceless.",
                    "Deeply Shamed",
                    "For some failure, real or perceived, your family was disgraced and lowered in rank."
                ),
				() => {
					character.earnings = Math.max(0, character.earnings - 1);
					StatusHelper.reduceStatus();
				});
            case 5:
                return new AdolescenceEventModel(new EventModel(
                    "Accursed Bloodline: Your family labours under an ancient curse, and many generations of misfortune. You start each session with one fewer Chronicle point. At the GM’s discretion, certain prestigious deeds may lift this familial curse.",
                    "Reckless Ambition",
                    "Your family labours under an ancient curse, and many generations of misfortune. You start each session with one fewer Chronicle point."
                ));
            case 6:
                return new AdolescenceEventModel(new EventModel(
                    "Bad Reputation: Your family has acquired a bad reputation, which may lead your peers and betters to insult your lineage and remind you endlessly of the events that caused your family to lose its good name. Increase the Repercussion range of any Command, Lifestyle, or Persuade test made to interact with another Mishiman by one.",
                    "Bad Reputation",
                    "Increase the Repercussion range of any Command, Lifestyle, or Persuade test made to interact with another Mishiman by one."
                ));
            case 7:
                return new AdolescenceEventModel(new EventModel(
                    "Impoverished: Your family has fallen upon hard times. Reduce your earnings rating by one.",
                    "Spendthrift",
                    "Your family has fallen upon hard times."
                ),
                () => {
					character.earnings = Math.max(0, character.earnings - 1);
				});
            case 8:
                return new AdolescenceEventModel(new EventModel(
                    "Hikikomori: At some point during your adolescence, you became withdrawn from society, and you became hermitlike in your isolation. You gain one bonus Momentum on all skill tests outside of combat, but cannot use Momentum from the group pool.",
                    "Doesn't Play Well With Others",
                    "You gain one bonus Momentum on all skill tests outside of combat, but cannot use Momentum from the group pool."
                ));
            case 9:
                return new AdolescenceEventModel(new EventModel(
                    "Ancient Feud: Your family has a long-standing feud with another family of similar standing. They will stop at nothing to settle this feud and all scions of both your family and theirs are bound to this enmity from birth. Gain the rival family as an Enemy.",
                    "Holds a Grudge",
                    "Your family has a long-standing feud with another family of similar standing. Gain the rival family as an Enemy."
                ));
            case 10:
                return new AdolescenceEventModel(new EventModel(
                    "Wandering Master: In your youth, you encountered a wandering master of a Martial Arts school, who taught you some of the fundamentals of his school’s techniques. You cannot forget this event, and will not let others forget it either. You reduce the experience point cost of any Ki power you purchase by 50.",
                    "Insufferable",
                    "You reduce the experience point cost of any Ki power you purchase by 50."
                ));
            case 11:
                return new AdolescenceEventModel(new EventModel(
                    "Prophecy of Glory: Your early life was shaped by the words of a diviner or fortune teller, foretelling great things for you. Your confidence and certainty means you have one more Mental Wound.",
                    "Egotistical",
                    "Your early life was shaped by the words of a diviner or fortune teller, foretelling great things for you. Your confidence and certainty means you have one more Mental Wound."
                ),
				() => { character.mentalWoundsIncrease++; });
            case 12:
                return new AdolescenceEventModel(new EventModel(
                    "Devoted Employee: Even as a child, you worked hard and helped to support your family, work unit, and keiretsu. You may re-roll 1d20 on any Lifestyle test made to acquire an item, but increase the Repercussion range of all untrained skill use by one.",
                    "Workaholic",
                    "You may re-roll 1d20 on any Lifestyle test made to acquire an item, but increase the Repercussion range of all untrained skill use by one."
                ));
            case 13:
                return new AdolescenceEventModel(new EventModel(
                    "Ferocious Reputation: As a youth, you personally acquired such a fearsome reputation that people still think twice about crossing you. On a successful Persuade test when attempting to intimidate someone, you may spend one Momentum to inflict one Dread on the target. However, Persuade tests to befriend or calm others increase in difficulty by one step.",
                    "Intimidating",
                    "On a successful Persuade test when attempting to intimidate someone, you may spend one Momentum to inflict one Dread on the target. However, Persuade tests to befriend or calm others increase in difficulty by one step."
                ));
            case 14:
                return new AdolescenceEventModel(new EventModel(
                    "Inemuri Expert: You have mastered the art of falling asleep briefly in almost any situation – at your desk, while standing on a train, leaning against a wall, or anywhere else. It is invaluable for those who work twenty hours a day, but it does not compare to a full night’s sleep. You may re-roll one d20 when making a Resistance test against sleep deprivation.",
                    "Tired All The Time",
                    "You have mastered the art of falling asleep briefly in almost any situation. You may re-roll one d20 when making a Resistance test against sleep deprivation."
                ));
            case 15:
                return new AdolescenceEventModel(new EventModel(
                    "Thin Skinned: You have always been prideful, and your sense of honour will allow you to suffer no indignity or insult. Your pride allows you to reduce the difficulty of any Willpower test against mental trauma by one step, to a minimum of one. However, you also gain one Enemy, a peer who you perceive as having slighted you.",
                    "Easily Offended",
                    "Your pride allows you to reduce the difficulty of any Willpower test against mental trauma by one step, to a minimum of one. However, you also gain one Enemy, a peer who you perceive as having slighted you."
                ));
            case 16:
                return new AdolescenceEventModel(new EventModel(
                    "Ki Negative: You have no talent for or understanding of the mystical whatsoever. This limitation has always been a source of shame and frustration. You cannot learn any Ki powers at any point.",
                    "Frustrated",
                    "You cannot learn any Ki powers at any point."
                ),
				() => { character.noKi = true; });
            case 17:
                return new AdolescenceEventModel(new EventModel(
                    "Tunnel Rat: You have a knack for navigating the caverns and tunnels of Mercury. You may re-roll 1d20 on any Survival test made to navigate or survive in a subterranean environment. However, you increase the difficulty of Survival tests made to navigate or survive in other environments by one step.",
                    "Agoraphobic",
                    "You may re-roll 1d20 on any Survival test made to navigate or survive in a subterranean environment. However, you increase the difficulty of Survival tests made to navigate or survive in other environments by one step."
                ));
            case 18:
                return new AdolescenceEventModel(new EventModel(
                    "Allergic Reaction: Whether through a quirk of genetics or a problematic exposure during your youth, you react poorly to a number of toxic substances. All Resistance tests made to resist the effects of artificial substances have their difficulty increased by one step.",
                    "Severe Allergies",
                    "All Resistance tests made to resist the effects of artificial substances have their difficulty increased by one step."
                ));
            case 19:
                return new AdolescenceEventModel(new EventModel(
                    "Triad Initiation: You were inducted as an apprentice in one of the Triads. Whether or not you want it, you are still considered an affiliate of theirs. You may freely choose the Criminal Primary Career. You are often called upon to perform favours – no questions asked – for your brothers in the Triads, but you can ask for a favour in return for any favour you perform.",
                    "Friends in Low Places",
                    "You are often called upon to perform favours – no questions asked – for your brothers in the Triads, but you can ask for a favour in return for any favour you perform."
                ),
				() => { character.addFreeCareer(PrimaryCareer.Criminal); });
            case 20:
                return new AdolescenceEventModel(new EventModel(
                    "Owed a Debt of Honour: Someone in high places owes your family a debt of honour. You can call upon this debt once, for almost any purpose. During character creation, this counts as a single additional Life point. If not used during character creation, you may use it to gain three bonus Momentum on a single Lifestyle test.",
                    "Name-Dropping",
                    "Someone in high places owes your family a debt of honour."
                ),
				() => { character.lifePoints++; }); // TODO: if 1 LP is saved, gain the other effect
            case 21:
                return new AdolescenceEventModel(new EventModel(
                    "Martial Arts Training: You studied the arts of warfare during your childhood, preparing you to embrace advanced techniques as an adult. You may re-roll a single d20 on any test to find a master during character creation (this will happen automatically).",
                    "Hard-Hearted",
                    "You studied the arts of warfare during your childhood, preparing you to embrace advanced techniques as an adult."
                ));
            case 22: {
				let factionName = "";
				let faction = FactionsHelper.generateHeritage();
				if (faction === Faction.Mishima) {
					factionName = "someone who has betrayed Mishima";
				}
				else {
					factionName = FactionsHelper.getFaction(faction).name;
				}
				
                return new AdolescenceEventModel(new EventModel(
                    `Hero: Your actions revealed the activities of a traitor or another faction. Gain an Enemy in ${factionName}. Your actions see you rewarded and promoted; increase your Earnings Rating by one.`,
                    "Enemy",
                    `Your actions revealed the activities of a traitor or another faction. Gain an Enemy in ${factionName}.`
                ),
				() => { character.earnings++; });
			}
            case 23:
                return new AdolescenceEventModel(new EventModel(
                    "Model Employee: You have a knack for being in the right place at the right time, claiming respontsibility for successes while creatively distancing yourself from failures. You may re-roll one d20 on a Lifestyle or Persuade test made to deceive or present a success as your own. However, you increase the difficulty of all Command tests by one, because your subordinates do not trust you.",
                    "Sneaky",
                    "You may re-roll one d20 on a Lifestyle or Persuade test made to deceive or present a success as your own. However, you increase the difficulty of all Command tests by one, because your subordinates do not trust you."
                ));
            case 24:
                return new AdolescenceEventModel(new EventModel(
                    "Gifted Student: You took to your studies extremely well, and have always had a knack for coming up with the right answer... much to the irritation of those around you. Dark Symmetry points spent to gain additional dice on Education test grant 2d20 instead of 1d20, but increase the difficulty of Command and Persuade tests by one step.",
                    "Smart Ass",
                    "Dark Symmetry points spent to gain additional dice on Education test grant 2d20 instead of 1d20, but increase the difficulty of Command and Persuade tests by one step."
                ));
            case 25:
                return new AdolescenceEventModel(new EventModel(
                    "Otaku: You obsess about one particular subject or topic, and know far more about it than most. Nominate a single narrow field of interest. Gain a single bonus Momentum on Education tests relating to your chosen field of interest.",
                    "Obsessive",
                    "Nominate a single narrow field of interest. Gain a single bonus Momentum on Education tests relating to your chosen field of interest."
                ));
            case 26:
                return new AdolescenceEventModel(new EventModel(
                    "Internal Calm: You use meditation techniques to focus on any upcoming challenge by tuning out all distractions. Gain one bonus Momentum on the Willpower test when attempting a Shake It Off Action.",
                    "Optimistic",
                    "Gain one bonus Momentum on the Willpower test when attempting a Shake It Off Action."
                ));
            case 27:
                return new AdolescenceEventModel(new EventModel(
                    "Blind Obedience: Your devotion to your keiretsu’s senior management is unswerving. You follow orders from your superiors to the letter, to the detriment of critical thinking or selfpreservation. You may re-roll 1d20 on any Willpower test to resist coercion or influence from another – even from supernatural sources. However, you increase the difficulty of Education skill tests by one due to your blind adherence to your managers’ dogma.",
                    "Loyal to a Fault",
                    "You may re-roll 1d20 on any Willpower test to resist coercion or influence from another – even from supernatural sources. However, you increase the difficulty of Education skill tests by one due to your blind adherence to your managers’ dogma."
                ));
            case 28:
                return new AdolescenceEventModel(new EventModel(
                    "Hwabyeong: as a result of constant unfair pressure at school, to which you were unable to respond, you suffer from bouts of severe depression punctuated by outbursts of anger. Roll 1d20 at the start of each session. On a roll of 1-5, gain one additional Chronicle point that session. On a roll of 16-20, gain one fewer Chronicle point than normal that session. On any other result, there is no change.",
                    "Repressed Rage",
                    "Roll 1d20 at the start of each session. On a roll of 1-5, gain one additional Chronicle point that session. On a roll of 16-20, gain one fewer Chronicle point than normal that session. On any other result, there is no change."
                ));
            case 29:
                return new AdolescenceEventModel(new EventModel(
                    "Contact with the Underworld: You spend a lot of time with the wrong kinds of people, either due to a rebellious streak or circumstances at home. Your friends taught you how to survive on the streets, how to steal, beg, rob, or other ‘useful life lessons’. You may or may not have cut ties with your old associates, but they certainly remember you. You are comfortable working on the wrong side of the law, and know how to communicate with people. You gain one bonus Momentum on successful Persuade and Thievery tests made to interact with the criminal element, including gang members, and the faceless.",
                    "Bad Company",
                    "You are comfortable working on the wrong side of the law, and know how to communicate with people. You gain one bonus Momentum on successful Persuade and Thievery tests made to interact with the criminal element, including gang members, and the faceless."
                ));
            case 30:
                return new AdolescenceEventModel(new EventModel(
                    "Prosperous Work Unit: Your parents and their colleagues were part of a particularly wealthy and successful keiretsu, and everyone receives some of the benefit. Increase your Earnings Rating by one.",
                    "Solving Problems with Money",
                    "Your parents and their colleagues were part of a particularly wealthy and successful keiretsu, and everyone receives some of the benefit."
                ),
				() => { character.earnings++; });
            case 31:
                return new AdolescenceEventModel(new EventModel(
                    "Tawra: You became involved in the practice of tawra, ritualised street fighting between gangs of high school students after important exams. You still carry with you some scars and tall tales from that time, and you have lost little of your viciousness. Your familiarity with violence increases your melee bonus damage by +1[DS].",
                    "Merciless",
                    "You became involved in the practice of tawra, ritualised street fighting between gangs of high school students after important exams. Your familiarity with violence increases your melee bonus damage by +1[DS]."
                ),
				() => { character.meleeBonus++; });
            case 32:
                return new AdolescenceEventModel(new EventModel(
                    "Natural Ki Power: You have a wellspring of mystical power within you, as if you were born with a stronger connection to the world. You gain one automatic success on any test to find a master during character creation.",
                    "Unemotional",
                    "You have a wellspring of mystical power within you, as if you were born with a stronger connection to the world."
                ),
				() => { character.kiBonus++; });
            case 33:
                return new AdolescenceEventModel(new EventModel(
                    "Addicted: There is something you cannot get enough of. What is it? You will take risks to satisfy your craving. Availability tests for procuring your addiction are Difficulty 1.",
                    "Addict",
                    "There is something you cannot get enough of. What is it? You will take risks to satisfy your craving. Availability tests for procuring your addiction are Difficulty 1."
                ));
            case 34:
                return new AdolescenceEventModel(new EventModel(
                    "Toxin Resistance: Your body is very resistant to artificial substances. All Resistance tests for artificial substances are reduced by one level of difficulty.",
                    "Nothing Helps the Pain",
                    "All Resistance tests for artificial substances are reduced by one level of difficulty."
                ));
            case 35: {
				let property = EquipmentHelper.generateMusashiBladeProperty();
				
                return new AdolescenceEventModel(new EventModel(
                    "Heirloom Sword: Your character possesses an ancient and valuable heirloom, a katana forged by a legendary smith. If he is a commoner, the weapon was recovered from a battlefield by an ancestor. If he is a samurai, then the weapon is part of your family’s legacy. In either case, the blade must be restored before it can be used. You possess a Mushashi Blade, a katana with one special property (${property}). The blade cannot be used until it has been properly restored by a swordsmith, requiring an acquisition test for a Restriction 3, Cost 15 service. Possession of any katana is illegal for those who are not samurai, but a commoner bearing a Mushashi Blade can easily use it to bargain for almost anything.",
                    "Live By the Sword",
                    `You possess a Mushashi Blade, a katana with one special property (${property}). The blade cannot be used until it has been properly restored by a swordsmith, requiring an acquisition test for a Restriction 3, Cost 15 service. Possession of any katana is illegal for those who are not samurai, but a commoner bearing a Mushashi Blade can easily use it to bargain for almost anything.`
                ),
				() => { character.addEquipment(`Broken Mushashi Blade (${property})`); });
			}
            case 36:
                return new AdolescenceEventModel(new EventModel(
                    "Legacy of Honour: You come from a family that has served bravely and honourably for generations, and its service has not gone unnoticed. The respect your family is given provides a certain degree of freedom. You may ignore the first Persecution check, or the first time you become Dishonoured, during character creation. During play, you gain one bonus Momentum on Lifestyle tests when acting openly and honourably.",
                    "Unyielding Honour",
                    "You come from a family that has served bravely and honourably for generations, and its service has not gone unnoticed. You gain one bonus Momentum on Lifestyle tests when acting openly and honourably."
                ),
				() => {
					character.ignoreFired = true;
					character.ignorePersecution = true;
				});
            case 37:
                return new AdolescenceEventModel(new EventModel(
                    "Family Promoted: Your family was promoted in rank in exchange for some favour to a daimyo, or the meritorious deeds one of your relatives. Increase your Earnings Rating by one. Further, increase your Social Status by one step; or gain a favour from your daimyo if you are already at maximum status.",
                    "Prideful",
                    "Your family was promoted in rank in exchange for some favour to a daimyo, or the meritorious deeds one of your relatives."
                ),
				() => {
					character.earnings++;
					
					if (character.status !== Status.Guildsman && character.status !== Status.Lord) {
						StatusHelper.increaseStatus();
					}
					else {
						character.adolescenceEvent.effect += " You gain a favour from your daimyo.";
					}
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
                   }
				));
			} 
            case 39:
                return new AdolescenceEventModel(new EventModel(
                    "Resistant to Pain: Your control over your body allows you to endure what others cannot. Determine your wounds from the next best row of the wounds table.",
                    "Unsympathetic to the Weak",
                    "Your control over your body allows you to endure what others cannot. Determine your wounds from the next best row of the wounds table."
                ),
				() => {
					character.woundsBonus++;
				});
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

export const MishimaAdolescenceEvents = new AdolescenceEventsMishima();