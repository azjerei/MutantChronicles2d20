import {character} from '../common/character';
import {EventModel, CareerEventModel} from '../common/eventModel';
import {Faction, FactionsHelper} from './factions';
import {PrimaryCareer} from'./primaryCareers';
import {Status, StatusHelper} from './status';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {TalentsHelper} from './talents';
import {DiceRoller} from './diceRoller';
import {EquipmentHelper} from './equipment';

class CareerEventsMishima {
    generateEvent(roll: number): CareerEventModel {
        switch (roll) {
            case 2:
                return new CareerEventModel(new EventModel(
                    "You were poisoned by a chemical spill, fallout in the Kirin Mutant Zones, or exposure to solar radiation on the surface of Mercury.",
                    "",
                    "Toxic contamination. The treatment will cost fifty Assets and until then you count as having wounds equal to one level lower on the Wounds Table."
                ),
                    () => { character.woundsBonus--; });
            case 3:
                return new CareerEventModel(new EventModel(
                    "You have been marked for death by the Shadow Walker Cult. Why? And how are you not dead yet?",
                    "",
                    "You have been marked for death by the Shadow Walker Cult. Why? And how are you not dead yet? You have an enemy in the Shadow Walker Cult."
                ),
                    () => { });
            case 4:
                return new CareerEventModel(new EventModel(
                    "You have changed your identity, moved away from your family, and are living under an assumed name. Why?",
                    "",
                    "You have changed your identity, moved away from your family, and are living under an assumed name. Why?",
					[
						"Enemy in a position of authority",
						"Enemy in a Heretic Cult"
					],
					(option) => {
						character.careerEvents[character.careerEvents.length-1].effect += ` You have an ${option}.`;
					}
                ),
                    () => { });
            case 5:
                return new CareerEventModel(new EventModel(
                    "You have a powerful enemy, one who holds seniority over you though, fortunately, is not a direct superior able to command you. What happened?",
                    "Pursued by the Powerful",
                    "You have a powerful enemy, one who holds seniority over you though, fortunately, is not a direct superior able to command you. What happened? You have an Enemy."
                ));
            case 6:
                return new CareerEventModel(new EventModel(
                    "Your family has been embroiled in scandal, and you bear the burden of the recompense to the slighted party. You are Dishonoured, and may not continue in this career. Gain a Criminal Record, and a Debt to an important samurai.",
                    "",
                    "Your family has been embroiled in scandal, and you bear the burden of the recompense to the slighted party. You owe a debt to an important samurai.",
					[],
					() => {},
					"Fired" // TODO
                ),
                () => {
                    const career = character.careers[character.careers.length - 1];
                    if (career.isIconic) {
                        character.addProhibitedIconicCareer(career.career);
                    }
                    else {
                        character.addProhibitedPrimaryCareer(career.career);
                    }

                    character.applyCriminalRecord();
                    character.hasCriminalRecord = true;
				});
            case 7:
                return new CareerEventModel(new EventModel(
                    "Guilty or not you have been sentenced to death for committing a serious crime. What are the terms of your stay of execution? You are Dishonoured, and may not continue in this career. Gain a Criminal Record, and a Debt to an important samurai.",
                    "",
                    "Guilty or not you have been sentenced to death for committing a serious crime. What are the terms of your stay of execution? You owe a debt to an important samurai.",
					[],
					() => {},
					"Fired" // TODO
                ),
                () => {
                    const career = character.careers[character.careers.length - 1];
                    if (career.isIconic) {
                        character.addProhibitedIconicCareer(career.career);
                    }
                    else {
                        character.addProhibitedPrimaryCareer(career.career);
                    }

                    character.applyCriminalRecord();
					character.hasCriminalRecord = true;
				});
            case 8:
                return new CareerEventModel(new EventModel(
                    "You have an intense rivalry with a Mishima employee of equal rank to you. Who are they and how does your rivalry manifest? You have a rival within your faction with whom you have a conflict.",
                    "",
                    "You have an intense rivalry with a Mishima employee of equal rank to you. Who are they and how does your rivalry manifest? You have a rival within your faction with whom you have a conflict."
                ));
            case 9:
                return new CareerEventModel(new EventModel(
                    "You find yourself in a brief, illicit relationship with someone higher or lower ranking than yourself. If anyone found out, the scandal would be considerable.",
                    "Shameful Liaisons",
                    "You find yourself in a brief, illicit relationship with someone higher or lower ranking than yourself. If anyone found out, the scandal would be considerable."
                ),
                    () => { });
            case 10:
                return new CareerEventModel(new EventModel(
                    "You saw something you should not have, and the local Triads made an example of you. What did you see, and why did they allow you to live? Gain a debt to one of the Triads.",
                    "",
                    "You saw something you should not have, and the local Triads made an example of you. What did you see, and why did they allow you to live? Gain a debt to one of the Triads."
                ));
            case 11:
                return new CareerEventModel(new EventModel(
                    "You are connected to an attempt to defraud your keiretsu and demoted to the most menial tasks available to your class. You are Dishonored and may not continue in this career. Gain a criminal record.",
                    "",
                    "You are connected to an attempt to defraud your keiretsu and demoted to the most menial tasks available to your class.",
					[],
					() => {},
					"Fired"
                ),
                    () => {
                        character.applyCriminalRecord();
                        character.hasCriminalRecord = true;

                        const career = character.careers[character.careers.length - 1];
                        if (career.isIconic) {
                            character.addProhibitedIconicCareer(career.career);
                        }
                        else {
                            character.addProhibitedPrimaryCareer(career.career);
                        }
                    });
            case 12: {
                let loc = DiceRoller.rollHitLocation();

                return new CareerEventModel(new EventModel(
                    "You were involved in a shooting 'accident'. Who shot you and why is it suspicious? Your " + loc + " has a gunshot wound that hasn't healed well.",
                    "Old War Wound",
                    "You were involved in a shooting 'accident'. Who shot you and why is it suspicious? Your " + loc + " has a gunshot wound that hasn't healed well."
                ));
			}
            case 13:
                return new CareerEventModel(new EventModel(
                    "Your activities have been under scrutiny, watched by the agents of a daimyo, cult leader, or triad master. They always seem to be nearby. What do you think they are looking for?",
                    "Under Surveillance",
                    "Your activities have been under scrutiny, watched by the agents of a daimyo, cult leader, or triad master. They always seem to be nearby. What do you think they are looking for?"
                ));
            case 14:
                return new CareerEventModel(new EventModel(
                    "You had the opportunity to travel far away from home. Where did you go and what made you come back home?",
                    "Foreign Ideas",
                    "You had the opportunity to travel far away from home. Where did you go and what made you come back home?",
					[
						"Contact in another keiretsu",
						"Contact in Bauhaus",
						"Contact in Capitol",
						"Contact in Cybertronic",
						"Contact in Imperial",
						"Contact in Whitestar"
                    ],
					(option) => {
                        character.careerEvents[character.careerEvents.length - 1].effect += ` You have a ${option}.`;
					}
                ));
            case 15:
                return new CareerEventModel(new EventModel(
                    "They are on to you! Who are they and what have you done?",
                    "Paranoia",
                    "They are on to you! Who are they and what have you done?"
                ),
                    () => { });
            case 16:
                return new CareerEventModel(new EventModel(
                    "You discovered an act of treachery against the keiretsu but you are keeping your mouth shut. What hold does the perpetrator have over you that keeps you silent?",
                    "Blackmailed",
                    "You discovered an act of treachery against the keiretsu but you are keeping your mouth shut. What hold does the perpetrator have over you that keeps you silent?"
                ),
                    () => { character.earnings++; });
            case 17:
                return new CareerEventModel(new EventModel(
                    "You suffered greatly in order to preserve your honour. What was your sacrifice?",
                    "Honour At Any Cost",
                    "You suffered greatly in order to preserve your honour. What was your sacrifice?"
                ));
            case 18: {
				let years = Math.floor(Math.random() * 6) + 1;
				
                return new CareerEventModel(new EventModel(
                    "Your work unit was abandoned, cut off from contact with your keiretsu for a long period of time.",
                    "Uncomfortable Amongst Strangers",
                    "Your work unit was abandoned, cut off from contact with your keiretsu for a long period of time."
                ),
				() => {
					character.careers[character.careers.length-1].years += years;
				});
            }
            case 19: {
				let implant = EquipmentHelper.generateBionicImplant();
				
                return new CareerEventModel(new EventModel(
                    `You volunteered to be a test user for an advanced cyberware item. It is a real boon, most of the time. You gain a single Cybernetic implant (${implant}).`,
                    "",
                    `You volunteered to be a test user for an advanced cyberware item. It is a real boon, most of the time. You gain a single Cybernetic implant (${implant}), with Reliability reduced by one.`
                ),
				() => { character.addEquipment(implant + "(-1 Rel)"); });
			}
            case 20:
                return new CareerEventModel(new EventModel(
                    "You earned the ire of a superior and were reassigned, as well as gaining an enemy. What did you do? You are Dishonored and may not continue in this career.",
                    "",
                    "You earned the ire of a superior and were reassigned, as well as gaining an enemy. What did you do?",
					[],
					() => {},
					"Fired"
                ),
                    () => {
                        const career = character.careers[character.careers.length - 1];
                        if (career.isIconic) {
                            character.addProhibitedIconicCareer(career.career);
                        }
                        else {
                            character.addProhibitedPrimaryCareer(career.career);
                        }
                    });
            case 21: {
                return new CareerEventModel(new EventModel(
                    "You have a wealthy and pliable benefactor. Increase Earnings Rating by one whilst they are still your patron.",
                    "Patron's Agenda",
                    "You have a wealthy and pliable benefactor."
                ));
			}
            case 22: {
                let faction = FactionsHelper.generateHeritage();
                while (faction === Faction.Mishima) {
                    faction = FactionsHelper.generateHeritage();
                }

                let name = FactionsHelper.getFaction(faction).name;

                return new CareerEventModel(new EventModel(
                    `You foiled a foreign plot on your own or with a group of friends. Why didn’t you report it to management? Gain an Enemy in ${name}. Gain five Assets worth of 'liberated equipment'.`,
                    "",
                    `You foiled a foreign plot on your own or with a group of friends. Why didn’t you report it to management? Gain an Enemy in ${name}.`
                ),
				() => { character.assets += 5; });
			}
            case 23:
                return new CareerEventModel(new EventModel(
                    "You were one of just a few survivors from a massive tunnel collapse, in which many people died. You lost something in the collapse, and brought something out with you. What were they? You gain one favour from a useful contact, one Enemy made during the disaster, and one Asset as compensation for the trauma. You also have an issue with enclosed spaces.",
                    "Claustrophobia",
                    "You were one of just a few survivors from a massive tunnel collapse, in which many people died. You gain one favour from a useful contact, and one Enemy made during the disaster."
                ));
            case 24:
                return new CareerEventModel(new EventModel(
                    "You broke an oath or otherwise publicly failed to live up to your class’ obligations. What was so important to make you do that? You are Dishonored and may not continue in this career.",
                    "",
                    "You broke an oath or otherwise publicly failed to live up to your class’ obligations. What was so important to make you do that?",
					[
						"Gain one ally",
						"Gain five assets"
					],
					(option) => {
                        if (option.indexOf("assets") > -1) {
                            character.assets += 5;
                        }
                        else {
                            character.careerEvents[character.careerEvents.length - 1].effect += `You gain one ally.`;
                        }
					},
					"Fired"
                ),
                    () => {
                        const career = character.careers[character.careers.length - 1];
                        if (career.isIconic) {
                            character.addProhibitedIconicCareer(career.career);
                        }
                        else {
                            character.addProhibitedPrimaryCareer(career.career);
                        }
                    });
            case 25:
                return new CareerEventModel(new EventModel(
                    "You aided a magistrate in quelling an incident of public unrest, and have gained his confidence. Gain a favour from a senior magistrate.",
                    "",
                    "You aided a magistrate in quelling an incident of public unrest, and have gained his confidence. Gain a favour from a senior magistrate."
                ),
                    () => { character.fame++; });
            case 26: {
                if (character.status === Status.Faceless) {
                    const roll1 = Math.floor(Math.random() * 20) + 1;
                    const roll2 = Math.floor(Math.random() * 20) + 1;
                    return this.generateEvent(roll1 + roll2);
				}
				
                return new CareerEventModel(new EventModel(
                    "Your deeds earn you great recognition, and an accompanying increase in prosperity. Increase Earnings Rating by one, to a maximum of five. If your Earnings are already five or higher, gain a favour from your daimyo instead.",
                    "",
                    "Your deeds earn you great recognition, and an accompanying increase in prosperity."
                ),
				() => {
					if (character.earnings >= 5) {
						character.addEvent("Your daimyo owes you a favour.");
					}
					else {
						character.earnings++;
					}
				});
			}
            case 27: {
                let faction = FactionsHelper.generateHeritage();
                while (faction === Faction.Mishima) {
                    faction = FactionsHelper.generateHeritage();
                }

                let name = FactionsHelper.getFaction(faction).name;

                return new CareerEventModel(new EventModel(
                    `You have a friend in ${name} (who owes you a favour). How did you meet? How do you explain this suspicious friendship to others?`,
                    "Foreign Ideas",
                    `You have a friend in ${name} (who owes you a favour). How did you meet? How do you explain this suspicious friendship to others?`
                ));
			}
            case 28:
                return new CareerEventModel(new EventModel(
                    "A close colleague or friend was a Heretic or a rebel, and the authorities demanded your aid in stopping them. Did you help them or not?",
                    "",
                    "A close colleague or friend was a Heretic or a rebel, and the authorities demanded your aid in stopping them.",
					[
						"Yes",
						"No"
					],
					(option) => {
						if (option.indexOf("Yes")) {
                            character.careerEvents[character.careerEvents.length - 1].effect += " You decided to help your friend, and they now owe you a favour.";
						}
						else {
                            character.careerEvents[character.careerEvents.length - 1].effect += " You decided to help the authorities, and they now owe you a favour.";
						}
					}
                ));
            case 29:
                return new CareerEventModel(new EventModel(
                    "You were taken prisoner by a daimyo who is a rival to your own. Why did they let you go? Gain a debt to a member of the other daimyo's organisation.",
                    "",
                    "You were taken prisoner by a daimyo who is a rival to your own. Why did they let you go? Gain a debt to a member of the other daimyo's organisation."
                ));
            case 30:
                return new CareerEventModel(new EventModel(
                    "You spent time on retreat in a secluded temple. Who did you meet there, and what did they teach you? You will automatically gain one success when trying to find a master for a Ki school.",
                    "",
                    "You spent time on retreat in a secluded temple. Who did you meet there, and what did they teach you?"
                ),
				() => { character.kiBonus++; });
            case 31:
                return new CareerEventModel(new EventModel(
                    "You stumbled upon someone’s secret hideout. Whose was it and what did you discover there? Gain an item worth five assets. The item is distinctive and missed by its owner. Gain an enemy in the owner.",
                    "",
                    "You stumbled upon someone’s secret hideout. Whose was it and what did you discover there? Gain an item worth five assets. The item is distinctive and missed by its owner. Gain an enemy in the owner."
                ));
            case 32:
                return new CareerEventModel(new EventModel(
                    "You defeated an enemy in a fight, and took something strange and interesting from their body. What was it? You have an item worth ten assets.",
                    "",
                    "You defeated an enemy in a fight, and took something strange and interesting from their body. What was it? You have an item worth ten assets."
                ),
                    () => { });
            case 33:
                return new CareerEventModel(new EventModel(
                    "Because of your work unit’s hard work, everyone received a bonus. For commoners, this comes as scrip usable at Mishiman stores, while for samurai it comes as dividends on their shares. Gain five assets.",
                    "",
                    "Because of your work unit’s hard work, everyone received a bonus. For commoners, this comes as scrip usable at Mishiman stores, while for samurai it comes as dividends on their shares."
                ),
				() => {
					character.assets += 5;
				});
            case 34:
                return new CareerEventModel(new EventModel(
                    "You stood in for someone as their champion in a duel. Who did you represent, and why? Gain the person you represented as an Ally.",
                    "",
                    "You stood in for someone as their champion in a duel. Who did you represent, and why? Gain the person you represented as an Ally."
                ));
            case 35:
                return new CareerEventModel(new EventModel(
                    "You received a big windfall when an older relative died, either because they willed it to you or the person who died was next in line ahead of you. The inheritance is potentially lifechanging, but other relatives are extremely envious. Gain 5, 10 or 15 assets, but gain one Enemy per five assets.",
                    "",
                    "You received a big windfall when an older relative died, either because they willed it to you or the person who died was next in line ahead of you. The inheritance is potentially lifechanging, but other relatives are extremely envious.",
					[
						"5",
						"10",
						"15"
					],
					(option) => {
						const assets = parseInt(option);
						character.assets += assets;
						
						const numEnemies = assets / 5;
                        character.careerEvents[character.careerEvents.length - 1].effect += ` You gain ${numEnemies} enemies.`;
					}
                ));
            case 36:
                return new CareerEventModel(new EventModel(
                    "You became involved in a Model Worker reality show, whether or not you wanted to. Gain one free Momentum on successful social skill tests, but all Stealth tests to go unnoticed in a populated area increase in difficulty by one step.",
                    "",
                    "You became involved in a Model Worker reality show, whether or not you wanted to. Gain one free Momentum on successful social skill tests, but all Stealth tests to go unnoticed in a populated area increase in difficulty by one step."
                ));
            case 37:
                return new CareerEventModel(new EventModel(
                    "You suffered a serious injury in the line of duty. Your determination to carry on has increased, but you are less able than you once were. All movement-related skill tests increase their difficulty by one step, but all Willpower tests reduce their difficulty by one step. Treatment to remove the penalty to movement-related skill tests costs fifty Assets.",
                    "",
                    "You suffered a serious injury in the line of duty. Your determination to carry on has increased, but you are less able than you once were. All movement-related skill tests increase their difficulty by one step, but all Willpower tests reduce their difficulty by one step. Treatment to remove the penalty to movement-related skill tests costs fifty Assets."
                ),
                    () => { });
            case 38:
                return new CareerEventModel(new EventModel(
                    "Someone close to you committed seppuku. Who was it, and how were you involved in the events leading up to their suicide? Gain two assets, bestowed by the will of the character who committed seppuku.",
                    "",
                    "Someone close to you committed seppuku. Who was it, and how were you involved in the events leading up to their suicide?"
                ),
				() => { character.assets += 2; });
            case 39:
                return new CareerEventModel(new EventModel(
                    "You have recurring dreams relating to a traumatic event in your past. Nightmarish or benevolent, you often must take time to distinguish dream from real events when you awake.",
                    "Vivid Dreams",
                    "You have recurring dreams relating to a traumatic event in your past. Nightmarish or benevolent, you often must take time to distinguish dream from real events when you awake."
                ),
                    () => { });
            case 40: {
				let effect = "";
				let desc = "";
				
				if (character.earnings >= 5) {
					desc += " You gain a favour from your daimyo.";
					effect += " You gain a favour from your daimyo.";
				}
				else {
					desc += " Increase earnings by one.";
				}
				
				if (character.status === Status.Lord) {
					desc += " You gain a favour from your daimyo.";
					effect += " You gain a favour from your daimyo.";
				}
				else if (character.status <= Status.Guildsman) {
					desc += " You become a samurai.";
				}
				else {
					desc += " Your samurai rank increases.";
				}
				
                return new CareerEventModel(new EventModel(
                    `You are one in a million, possibly literally, and have been named Employee of the Year. How did you win this mark of excellence?${desc}`,
                    "",
                    `You are one in a million, possibly literally, and have been named Employee of the Year. How did you win this mark of excellence?${effect}`
                ),
				() => {
					if (character.earnings <= 5) {
						character.earnings++;
					}
					
					if (character.status <= Status.Guildsman) {
						character.status = Status.Life;
					}
					else if (character.status < Status.Lord) {
						StatusHelper.increaseStatus();
					}
				});
			}
        }
    }
}

export const MishimaCareerEvents = new CareerEventsMishima();