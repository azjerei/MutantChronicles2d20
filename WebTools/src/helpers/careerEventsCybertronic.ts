import {character} from '../common/character';
import {EventModel, CareerEventModel} from '../common/eventModel';
import {Faction, FactionsHelper} from './factions';
import {PrimaryCareer} from'./primaryCareers';
import {Status, StatusHelper} from './status';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {TalentsHelper} from './talents';
import {DiceRoller} from './diceRoller';

export class CareerEventsCybertronic {
    generateEvent(roll: number): CareerEventModel {
        switch (roll) {
            case 2:
                return new CareerEventModel(new EventModel(
                    "Contamination: You were poisoned by some horrific toxic or radioactive contaminant during a scientific or industrial accident. The treatment will cost fifty assets and until then you count as having wounds equal to one level lower on the Wounds Table.",
                    "",
                    "Contamination: You were poisoned by some horrific toxic or radioactive contaminant during a scientific or industrial accident. The treatment will cost fifty assets and until then you count as having wounds equal to one level lower on the Wounds Table."),
                    () => { character.woundsBonus--; });
            case 3:
                return new CareerEventModel(new EventModel(
                    "Industrial Accident: You were badly injured in an accident in a factory or research facility, but narrowly survived with just a scar. What were you doing there and what happened?",
                    "Ugly Old Scar",
                    "Industrial Accident: You were badly injured in an accident in a factory or research facility, but narrowly survived with just a scar. What were you doing there and what happened?"));
            case 4:
                return new CareerEventModel(new EventModel(
                    "Brotherhood Scrutiny: The Brotherhood has identified you as being connected to a major Heretic cell in some way, but your place within Cybertronic prevents it from getting too close. Gain an enemy in the Inquisition.",
                    "",
                    "Brotherhood Scrutiny: The Brotherhood has identified you as being connected to a major Heretic cell in some way, but your place within Cybertronic prevents it from getting too close. Gain an enemy in the Inquisition."));
            case 5:
                return new CareerEventModel(new EventModel(
                    "Financial Repercussions: The section you work for suffered great losses during the financial year, and your pay was cut as a result. Reduce your Earnings by one.",
                    "",
                    "Financial Repercussions: The section you work for suffered great losses during the financial year, and your pay was cut as a result."),
                    () => { character.earnings = Math.max(character.earnings - 1, 0); });
            case 6: {
                const faction = FactionsHelper.getFaction(FactionsHelper.generateOriginFaction()).name;

                return new CareerEventModel(new EventModel(
                    `The Past Catches Up: Some element of your pre-Cybertronic past has caught up with you, and even with the protection of the corporation, you are struggling to avoid the consequences. Gain an enemy in ${faction}.`,
                    "Pursued by an Old Foe",
                    `The Past Catches Up: Some element of your pre-Cybertronic past has caught up with you, and even with the protection of the corporation, you are struggling to avoid the consequences. Gain an enemy in ${faction}.`));
            }
            case 7:
                return new CareerEventModel(new EventModel(
                    "Blackmail: You have received a folder filled with photographs of you in a compromising position or engaged in dubious actions. Whoever sent the folder is making demands, or they release copies to the public. Gain you blackmailer as an enemy, and reduce your Earnings Rating by one.",
                    "",
                    "Blackmail: You have received a folder filled with photographs of you in a compromising position or engaged in dubious actions. Whoever sent the folder is making demands, or they release copies to the public. Gain your blackmailer as an enemy."),
                    () => { character.earnings = Math.max(character.earnings - 1, 0); });
            case 8:
                return new CareerEventModel(new EventModel(
                    "Battered: You were lynched during a period of anti-Cybertronic sentiment, and suffered serious injuries that have never completely healed. Reduce your Serious Wounds by one.",
                    "",
                    "Battered: You were lynched during a period of anti-Cybertronic sentiment, and suffered serious injuries that have never completely healed. Reduce your Serious Wounds by one."),
                    () => { character.seriousWoundsIncrease--; });
            case 9:
                return new CareerEventModel(new EventModel(
                    "Rivalry: You have an intense rivalry with a colleague in the same department. Who are they and how does your rivalry manifest?",
                    "",
                    "Rivalry: You have an intense rivalry with a colleague in the same department. Who are they and how does your rivalry manifest?"));
            case 10:
                return new CareerEventModel(new EventModel(
                    "Red In The Ledger: You killed someone and left his body rotting in an alley. You managed to avoid investigations and unwanted scrutiny, but you are certain that the higher-ups in Cybertronic know of your actions and are keeping quiet for some sinister reason.",
                    "Paranoid",
                    "Red In The Ledger: You killed someone and left his body rotting in an alley. You managed to avoid investigations and unwanted scrutiny, but you are certain that the higher-ups in Cybertronic know of your actions and are keeping quiet for some sinister reason."));
            case 11: {
                const years = Math.floor(Math.random() * 6) + 1;

                return new CareerEventModel(new EventModel(
                    `Fraudulent Activities: You were connected to an attempt to defraud Cybertronic and subjected to the judgement of LAJ. You do not speak of that time. Add ${years} years to your age and reduce your Earnings Rating by one.`,
                    "Unspeakable Punishment",
                    "Fraudulent Activities: You were connected to an attempt to defraud Cybertronic and subjected to the judgement of LAJ. You do not speak of that time."),
                    () => {
                        character.age += years;
                        character.earnings = Math.max(character.earnings - 1, 0);
                    });
            }
            case 12:
                return new CareerEventModel(new EventModel(
                    "Black outs: You are prone to blackouts of up to twenty four hours. When you awake you have no knowledge of what you did during that period but you are terrified it is something terrible. Your uncertainty and dread reduce your Mental Wounds by one. You also gain one enemy and one ally, both of whom know the truth.",
                    "",
                    "Black outs: You are prone to blackouts of up to twenty four hours. When you awake you have no knowledge of what you did during that period but you are terrified it is something terrible. You gain one enemy and one ally, both of whom know the truth."),
                    () => { character.mentalWoundsIncrease--; });
            case 13:
                return new CareerEventModel(new EventModel(
                    "Demoted: You made the wrong call or were the victim of politics, but whatever the reason you got demoted, and spent years working to reclaim your old position. Reduce your Earnings Rating by one and increase your age by two.",
                    "",
                    "Demoted: You made the wrong call or were the victim of politics, but whatever the reason you got demoted, and spent years working to reclaim your old position."),
                    () => {
                        character.age += 2;
                        character.earnings = Math.max(character.earnings - 1, 0);
                    });
            case 14: {
                const roll = Math.floor(Math.random() * 6) + 1;

                return new CareerEventModel(new EventModel(
                    `Foreign Travel: You had the opportunity to travel to a distant human settlement. Where did you go and what made you come back home? You have made ${roll} friends and enemies in other corporations.`,
                    "",
                    `Foreign Travel: You had the opportunity to travel to a distant human settlement. Where did you go and what made you come back home? You have made ${roll} friends and enemies in other corporations.`));
            }
            case 15:
                return new CareerEventModel(new EventModel(
                    "Pollutants: You have spent too much time around bizarre chemicals and strange minerals, and have acquired a persistent cough. Annoying, but rarely fatal. You are easily winded by physical exertion, and increase the Repercussion Range of Athletics tests by one step. This penalty is removed if you gain Artificial Lungs.",
                    "",
                    "Pollutants: You have spent too much time around bizarre chemicals and strange minerals, and have acquired a persistent cough. Annoying, but rarely fatal. You are easily winded by physical exertion, and increase the Repercussion Range of Athletics tests by one step."));
            case 16:
                return new CareerEventModel(new EventModel(
                    "Criminal Activities: You have been involved in some highly lucrative criminal acts – laundering money, insider trading, car theft, counterfeiting, or something similar. It has brought in a lot of money, but no illicit act goes unnoticed forever, and there is a particularly tenacious investigator on your trail. Increase you Earnings by one, but gain an enemy in LAJ.",
                    "",
                    "Criminal Activities: You have been involved in some highly lucrative criminal acts – laundering money, insider trading, car theft, counterfeiting, or something similar. It has brought in a lot of money, but no illicit act goes unnoticed forever, and there is a particularly tenacious investigator on your trail. Gain an enemy in LAJ."),
                    () => { character.earnings++; });
            case 17:
                return new CareerEventModel(new EventModel(
                    "Oathkeeper: You suffered greatly in order to preserve your honour. What was your sacrifice?",
                    "Honour At Any Cost",
                    "Oathkeeper: You suffered greatly in order to preserve your honour. What was your sacrifice?"));
            case 18:
                return new CareerEventModel(new EventModel(
                    "Progress At A Cost: You volunteered to take part in a secret medical experiment that succeeded... well, almost. You may choose to suffer 4[DS] Mental Wounds as a Free Action in order to gain a Chronicle point.",
                    "Unforeseen Side-Effects",
                    "Progress At A Cost: You volunteered to take part in a secret medical experiment that succeeded... well, almost. You may choose to suffer 4[DS] Mental Wounds as a Free Action in order to gain a Chronicle point."));
            case 19:
                return new CareerEventModel(new EventModel(
                    "Shadowed: Someone is following you, but you do not know who or why. Your continual paranoia makes you particularly cautious; you may re-roll one d20 on Observation tests made to determine Surprise at the beginning of combat.",
                    "",
                    "Shadowed: Someone is following you, but you do not know who or why. Your continual paranoia makes you particularly cautious; you may re-roll one d20 on Observation tests made to determine Surprise at the beginning of combat."));
            case 20: {
                const years = Math.floor(Math.random() * 6) + 1;

                return new CareerEventModel(new EventModel(
                    `Serious Transgression: You made a major mistake, revealed some vital secret to an outsider, or otherwise broke the corporation’s trust in you. Cybertronic does not fire people, but it does have ways to punish transgressors. Add ${years} years to your age, and reduce your total Mental Wounds by one.`,
                    "Unspeakable Punishment",
                    "Serious Transgression: You made a major mistake, revealed some vital secret to an outsider, or otherwise broke the corporation’s trust in you. Cybertronic does not fire people, but it does have ways to punish transgressors."),
                    () => {
                        character.age += years;
                        character.mentalWoundsIncrease--;
                    });
            }
            case 21:
                return new CareerEventModel(new EventModel(
                    "Generous Patron: You have a wealthy and pliable benefactor. Increase Earnings Rating by one whilst he is still your patron.",
                    "Patron's Agenda",
                    "Generous Patron: You have a wealthy and pliable benefactor."),
                    () => { character.earnings++; });
            case 22: {
                const faction = FactionsHelper.getFaction(FactionsHelper.generateOriginFaction()).name;

                return new CareerEventModel(new EventModel(
                    `Stopped a Plot: You foiled a foreign plot on your own or with a group of friends. Why didn’t you report it to management? Gain an enemy in ${faction}. Gain five assets worth of ‘liberated equipment’.`,
                    "",
                    `Stopped a Plot: You foiled a foreign plot on your own or with a group of friends. Why didn’t you report it to management? Gain an enemy in ${faction}. Gain five assets worth of ‘liberated equipment’.`));
            }
            case 23:
                return new CareerEventModel(new EventModel(
                    "Survivor: You were one of just a few survivors from an enemy raid, in which many people died. You lost something in the collapse, and brought something out with you. What were they? Something terrible happened, but you survived. You gain one favour from a useful contact, one enemy made during the disaster, and one asset as compensation for the trauma. You also have an issue with enclosed spaces.",
                    "Claustrophobia",
                    "Survivor: You were one of just a few survivors from an enemy raid, in which many people died. You lost something in the collapse, and brought something out with you. What were they? You gain one favour from a useful contact, and one enemy made during the disaster."),
                    () => { character.assets++; });
            case 24:
                return new CareerEventModel(new EventModel(
                    "Promoted: Your actions have not gone unnoticed and you have been promoted and commended for your performance. Increase your Earnings Rating by one.",
                    "",
                    "Promoted: Your actions have not gone unnoticed and you have been promoted and commended for your performance."),
                    () => { character.earnings++; });
            case 25:
                return new CareerEventModel(new EventModel(
                    "Judicial Connection: You have a personal connection to a member of the LAJ, who you helped to solve a particularly challenging case or issue. You have an ally in LAJ.",
                    "",
                    "Judicial Connection: You have a personal connection to a member of the LAJ, who you helped to solve a particularly challenging case or issue. You have an ally in LAJ."));
            case 26:
                return new CareerEventModel(new EventModel(
                    "SWI Contacts: You have developed contacts within SWI, and have acquired security clearance. The GM determine which departments your contacts are in.",
                    "",
                    "SWI Contacts: You have developed contacts within SWI, and have acquired security clearance. The GM determine which departments your contacts are in."));
            case 27: {
                const faction = FactionsHelper.getFaction(FactionsHelper.generateOriginFaction()).name;

                return new CareerEventModel(new EventModel(
                    `Foreign Contact: You know someone outside of Cybertronic – maybe they are an old friend, maybe they are a new acquaintance. You have a contact in ${faction} who owes you a favour.`,
                    "",
                    `Foreign Contact: You know someone outside of Cybertronic – maybe they are an old friend, maybe they are a new acquaintance. You have a contact in ${faction} who owes you a favour.`));
            }
            case 28:
                return new CareerEventModel(new EventModel(
                    "Dangerous Connection: You know, or knew, someone who has been identified as a Heretic. The Board has asked that you maintain the relationship while SWI gathers intelligence on him. Increase your Earnings Rating by one. Further, you gain two allies – the Heretic, and the IES agent assigned to the operation. The Heretic ally will become an enemy when SWI carries out its operation.",
                    "",
                    "Dangerous Connection: You know, or knew, someone who has been identified as a Heretic. The Board has asked that you maintain the relationship while SWI gathers intelligence on him. You gain two allies – the Heretic, and the IES agent."),
                    () => { character.earnings++; });
            case 29: {
                const years = Math.floor(Math.random() * 6) + 1;

                return new CareerEventModel(new EventModel(
                    `Captured and Retrieved: You were captured by the Brotherhood and subjected to a long period of incarceration and interrogation beneath a cathedral. You held out, but when you were rescued, you returned different. Gain a member of the Inquisition as an enemy, and the IES agent who rescued you as an ally. Add ${years} years to your age.`,
                    "Nervous Around the Brotherhood",
                    `Captured and Retrieved: You were captured by the Brotherhood and subjected to a long period of incarceration and interrogation beneath a cathedral. You held out, but when you were rescued, you returned different. Gain a member of the Inquisition as an enemy, and the IES agent who rescued you as an ally.`),
                    () => { character.age += years; });
            }
            case 30:
                return new CareerEventModel(new EventModel(
                    "Olive Branch: You worked alongside an agent of the Brotherhood on a mission with the Cartel against the Dark Legion, and you saved each other’s lives in spite of your differences. The Board has encouraged this unusual bond. Gain the Brotherhood agent as an ally, and increase your Earnings Rating by one.",
                    "",
                    "Olive Branch: You worked alongside an agent of the Brotherhood on a mission with the Cartel against the Dark Legion, and you saved each other’s lives in spite of your differences. The Board has encouraged this unusual bond. Gain the Brotherhood agent as an ally."),
                    () => { character.earnings++; });
            case 31:
                return new CareerEventModel(new EventModel(
                    "Suspicious Object: You stumbled upon someone’s secret hideout. Whose was it and what did you discover there? Gain a single item worth no more than five assets. This item is distinctive and missed by its owner. Gain the item’s owner as an enemy.",
                    "",
                    "Suspicious Object: You stumbled upon someone’s secret hideout. Whose was it and what did you discover there? Gain a single item worth no more than five assets. This item is distinctive and missed by its owner. Gain the item’s owner as an enemy."));
            case 32:
                return new CareerEventModel(new EventModel(
                    "Lucky Find: You lucked upon a rare or unique item that had been lost. What is it? You have a single item worth fifteen assets.",
                    "",
                    "Lucky Find: You lucked upon a rare or unique item that had been lost. What is it? You have a single item worth fifteen assets."));
            case 33:
                return new CareerEventModel(new EventModel(
                    "Performance Bonus: Because of your hard work, you and your colleagues received a bonus, in both hard currency and shares in the corporation. Gain five assets.",
                    "",
                    "Performance Bonus: Because of your hard work, you and your colleagues received a bonus, in both hard currency and shares in the corporation."),
                    () => { character.assets += 5; });
            case 34:
                return new CareerEventModel(new EventModel(
                    "Deeply Persuasive: You have a knack for getting people to back down, whether in the boardroom or on the streets. All Command and Persuade tests you attempt while negotiating have their difficulty reduced by one, which may remove the need for a test.",
                    "",
                    "Deeply Persuasive: You have a knack for getting people to back down, whether in the boardroom or on the streets. All Command and Persuade tests you attempt while negotiating have their difficulty reduced by one, which may remove the need for a test."));
            case 35:
                return new CareerEventModel(new EventModel(
                    "Cartel Appointment: You have been called to serve as a consultant to some division of the Cartel, giving you considerable access to the other corporations, and many opportunities for insight into foreign cultures. You may reduce the difficulty of Education tests by one (to a minimum of 1) when dealing with information about other corporations.",
                    "",
                    "Cartel Appointment: You have been called to serve as a consultant to some division of the Cartel, giving you considerable access to the other corporations, and many opportunities for insight into foreign cultures. You may reduce the difficulty of Education tests by one (to a minimum of 1) when dealing with information about other corporations."));
            case 36:
                return new CareerEventModel(new EventModel(
                    "Minor Subreality Star: You became a minor celebrity on subreality; your exploits are followed and noted, whether or not you want it. While in subreality, gain one free Momentum on successful social skill tests, but all Stealth tests to go unnoticed in a populated area increase in difficulty by one step.",
                    "",
                    "Minor Subreality Star: You became a minor celebrity on subreality; your exploits are followed and noted, whether or not you want it. While in subreality, gain one free Momentum on successful social skill tests, but all Stealth tests to go unnoticed in a populated area increase in difficulty by one step."));
            case 37:
                return new CareerEventModel(new EventModel(
                    "Maimed in service: You suffered a serious injury in the line of duty. Your determination to continue on has increased, but you are less able than you once were. All movement-related skill tests increase their difficulty by one step, but all Willpower tests reduce their difficulty by one step. Being fitted with a Cyberlimb (leg) will remove this penalty.",
                    "",
                    "Maimed in service: You suffered a serious injury in the line of duty. Your determination to continue on has increased, but you are less able than you once were. All movement-related skill tests increase their difficulty by one step, but all Willpower tests reduce their difficulty by one step."));
            case 38:
                return new CareerEventModel(new EventModel(
                    "Asteroid Base: Somehow, you have been granted a base or research station in the Asteroid Belt. Fully equipped with life support, this is an ideal base. You now own a facility in the Asteroid Belt, about ten hours flight from Ceres Base.",
                    "",
                    "Asteroid Base: Somehow, you have been granted a base or research station in the Asteroid Belt. Fully equipped with life support, this is an ideal base. You now own a facility in the Asteroid Belt, about ten hours flight from Ceres Base."));
            case 39:
                return new CareerEventModel(new EventModel(
                    "Startling Nightmares: You have recurring dreams relating to a traumatic event in your past. Nightmarish or benevolent, you often must take time to distinguish dream from real events when you awake.",
                    "Vivid Dreams",
                    "Startling Nightmares: You have recurring dreams relating to a traumatic event in your past. Nightmarish or benevolent, you often must take time to distinguish dream from real events when you awake."));
            case 40:
                return new CareerEventModel(new EventModel(
                    "Diamondisation: You have gained the highest status available to any employee of Cybertronic, earning the respect and trust of the Board. You are a celebrated hero of Cybertronic, and your deeds are held in high regard. More than that, you receive access to the finest equipment and virtually limitless freedom to pursue the corporation’s goals. Increase your Earnings Rating by two, and gain a contact on the Board. In addition, if you do not already possess one, you gain a DIANA system implant, which replaces any SARaH or DIANA system you already possess. This system is more closely integrated, and allows you to re-roll one d20 on any skill test that the DIANA possesses training in.",
                    "",
                    "Diamondisation: You have gained the highest status available to any employee of Cybertronic, earning the respect and trust of the Board. You are a celebrated hero of Cybertronic, and your deeds are held in high regard. More than that, you receive access to the finest equipment and virtually limitless freedom to pursue the corporation’s goals. You have a contact on the Board."),
                    () => {
                        character.earnings += 2;

                        if (character.equipment.indexOf("DIANA system") === -1) {
                            character.equipment.indexOf("Closely integrated DIANA system");

                            var sarah = character.equipment.indexOf("SARaH system");
                            if (sarah > -1) {
                                character.equipment.splice(sarah, 1);
                            }
                        }
                    });
        }
    }
}

export const CybertronicCareerEvents = new CareerEventsCybertronic();