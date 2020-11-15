import {character} from '../common/character';
import {EventModel, CareerEventModel} from '../common/eventModel';
import {Faction, FactionsHelper} from './factions';
import {PrimaryCareer, PrimaryCareersHelper} from'./primaryCareers';
import {StatusHelper} from './status';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {TalentsHelper} from './talents';
import {DiceRoller} from './diceRoller';

class CareerEventsBrotherhood {
    generateEvent(roll: number): CareerEventModel {
        switch (roll) {
            case 2: {
                const age = Math.floor(Math.random() * 6) + 4;

                return new CareerEventModel(new EventModel(
                    `Mortal Sin: You have been accused of a heinous sin against the Cardinal and the Brotherhood. Guilty or not, you are poorlyregarded by your brethren, and have encountered first-hand the brutal side of the Brotherhood. Your name is infamous amongst the Brotherhood hierarchy, and you spent a considerable amount of time under severe scrutiny. Increase your age by ${age}.`,
                    "",
                    "You have been accused of a heinous sin against the Cardinal and the Brotherhood. Guilty or not, you are poorlyregarded by your brethren, and have encountered first-hand the brutal side of the Brotherhood. Your name is infamous amongst the Brotherhood hierarchy, and you spent a considerable amount of time under severe scrutiny."
                ),
                    () => { character.age += age; });
            }
            case 3:
                return new CareerEventModel(new EventModel(
                    "Disabled: An accident or injury almost cripples you, but leaves only a scar.",
                    "Ugly Old Scar",
                    "An accident or injury almost cripples you, but leaves only a scar."
                ));
            case 4:
                return new CareerEventModel(new EventModel(
                    "Involved in a Mystical Experiment: You volunteered for some secretive experiment into the nature of the Art, but the experiment failed. Reduce your Mental Wounds by two.",
                    "",
                    "You volunteered for some secretive experiment into the nature of the Art, but the experiment failed."
                ),
                    () => { character.mentalWoundsIncrease -= 2; });
            case 5:
                return new CareerEventModel(new EventModel(
                    "Venial Sin: You have been accused of a minor transgression against the Brotherhood. Although your conscience may be clear, your record has been blemished and you must make amends. Your name is ill-regarded by your superiors, and your penance was a difficult time in your life. You increase your age by an additional two.",
                    "",
                    "You have been accused of a minor transgression against the Brotherhood. Although your conscience may be clear, your record has been blemished and you must make amends. Your name is ill-regarded by your superiors, and your penance was a difficult time in your life."
                ),
                    () => { character.age += 2; });
            case 6: {
                const age = Math.floor(Math.random() * 6) + 2;

                return new CareerEventModel(new EventModel(
                    `Bone Disease: Your body is particularly fragile after developing a wasting condition. You may suffer with the disease and continue on, or you may petition a Healer to restore you to health. If you choose to continue on, use the next worst row for your Wounds. If you choose to petition a Healer, add an additional ${age} years to your age instead, as your focus on your own recovery stalls your progress within the Brotherhood.`,
                    "",
                    "",
                    [
                        "Continue on",
                        "Petition a Healer"
                    ],
                    (option) => {
                        if (option.indexOf("Continue on") > -1) {
                            character.woundsBonus -= 1;
                            character.careerEvents[character.careerEvents.length - 1].effect = "Your body is particularly fragile after developing a wasting condition.";
                        }
                        else {
                            character.age += age;
                            character.careerEvents[character.careerEvents.length - 1].effect = "Your body suffered from a wasting condition, but you petitioned a Healer to restore you.";
                        }
                    }
                ));
            }
            case 7:
                return new CareerEventModel(new EventModel(
                    "Blackmail: You have received a folder filled with photographs of you in a compromising position or engaged in dubious actions. Whoever sent the folder is making demands, or they release copies to the public. Gain your blackmailer as an enemy.",
                    "Subject of Extortion",
                    "You have received a folder filled with photographs of you in a compromising position or engaged in dubious actions. Whoever sent the folder is making demands, or they release copies to the public. Gain your blackmailer as an enemy."
                ));
            case 8: {
                return new CareerEventModel(new EventModel(
                    "Misfortune: Through intrigue, error, or being in the wrong place at the wrong time, you’ve fallen from grace with your superiors. Lose a single Life Point. You may enter the Preacher Primary Career without rolling.",
                    "",
                    "Through intrigue, error, or being in the wrong place at the wrong time, you’ve fallen from grace with your superiors."
                ),
                    () => {
                        character.lifePoints = Math.max(0, character.lifePoints - 1);
                        character.addFreeCareer(PrimaryCareer.Preacher);
                    });
            }
            case 9:
                return new CareerEventModel(new EventModel(
                    "Powerful Enemy: You gain a persistent and powerful enemy, who may or may not be in the Brotherhood. This person has personally vowed to see your downfall or your demise, and they have the power to back up that threat.",
                    "",
                    "You gain a persistent and powerful enemy, who may or may not be in the Brotherhood. This person has personally vowed to see your downfall or your demise, and they have the power to back up that threat."
                ));
            case 10:
                return new CareerEventModel(new EventModel(
                    "Questioned: You were called in for questioning by the Inquisition. What did they want to know? They let you go, but on what condition? Gain a debt to the Inquisition.",
                    "",
                    "You were called in for questioning by the Inquisition. What did they want to know? They let you go, but on what condition? Gain a debt to the Inquisition."
                ));
            case 11:
                return new CareerEventModel(new EventModel(
                    "Good Negotiator: Your skills of persuasion are legendary: it is said that you could sell lightbulbs to the Dark Legion. You gain one bonus Momentum on all Persuade tests, but your skill with words makes you reluctant to strike first, and you must pay a Dark Symmetry point to make an attack during the first round of a combat.",
                    "",
                    "You gain one bonus Momentum on all Persuade tests, but your skill with words makes you reluctant to strike first, and you must pay a Dark Symmetry point to make an attack during the first round of a combat."
                ));
            case 12: {
                const location = DiceRoller.rollHitLocation();

                return new CareerEventModel(new EventModel(
                    `Wounded: You were caught in a Heretic terror attack against a Cathedral, or were injured in battle (${location}) against the Dark Legion. The injury has never healed quite right.`,
                    "Old War Wound",
                    "You were caught in a Heretic terror attack against a Cathedral, or were injured in battle (${location}) against the Dark Legion. The injury has never healed quite right."
                ));
            }
            case 13:
                return new CareerEventModel(new EventModel(
                    "It’s Not Paranoia... Someone has been keeping an eye on you. They always seem to be near when you look around. What do you think they’re interested in? Who are they?",
                    "Under Surveillance",
                    "It’s Not Paranoia... Someone has been keeping an eye on you. They always seem to be near when you look around. What do you think they’re interested in? Who are they?"
                ));
            case 14:
                return new CareerEventModel(new EventModel(
                    "Traumatised: You have experienced the worst that the solar system has to offer, whether a disaster in civilian life or atrocities in military service, and it changed you. Reduce your Mental Wounds by one.",
                    "",
                    "You have experienced the worst that the solar system has to offer, whether a disaster in civilian life or atrocities in military service, and it changed you."
                ),
                    () => { character.mentalWoundsIncrease--; });
            case 15: {
                const years = Math.max(0, Math.floor(Math.random() * 6) - 1);

                return new CareerEventModel(new EventModel(
                    `Intensive Training: You were given a crash course in your field, and subjected to an accelerated training program. Your current career only adds ${years} to your age.`,
                    "",
                    "You were given a crash course in your field, and subjected to an accelerated training program."
                ),
                    () => {
                        character.age -= character.careers[character.careers.length - 1].years;
                        character.age += years;

                        character.careers[character.careers.length - 1].years = years;
                    });
            }
            case 16:
                return new CareerEventModel(new EventModel(
                    "Traumatic Experiences: You were caught in a Heretic (or criminal) plot and suffered an intensive debrief at the hands of the Inquisition in the aftermath. What did they do to you, and what one thing will you remember for the rest of your life?",
                    "Nightmares",
                    "You were caught in a Heretic (or criminal) plot and suffered an intensive debrief at the hands of the Inquisition in the aftermath. What did they do to you, and what one thing will you remember for the rest of your life?"
                ));
            case 17:
                return new CareerEventModel(new EventModel(
                    "Oathkeeper: You suffered greatly in order to preserve your honour. What was your sacrifice?",
                    "Honour At Any Cost",
                    "You suffered greatly in order to preserve your honour. What was your sacrifice?"
                ));
            case 18:
                return new CareerEventModel(new EventModel(
                    "Cursed with Sight: You have begun having terrifying, agonising insights into the worst parts of the past and future. While you would not wish them on your worst enemy, they are occasionally valuable. You may choose to suffer 4[DS] Mental Wounds as a Free Action to gain a Chronicle Point.",
                    "Migraines and Monstrous Visions",
                    "You may choose to suffer 4[DS] Mental Wounds as a Free Action to gain a Chronicle Point."
                ));
            case 19:
                return new CareerEventModel(new EventModel(
                    "Shadowed! Someone is following you, but you do not know who or why. Your continual paranoia makes you particularly cautious; you may re-roll one d20 on Observation tests made to determine Surprise at the beginning of combat.",
                    "",
                    "Someone is following you, but you do not know who or why. Your continual paranoia makes you particularly cautious; you may re-roll one d20 on Observation tests made to determine Surprise at the beginning of combat."
                ));
            case 20: {
                const effect = character.hasTalent("Mystic") ? "You gain one bonus Momentum on all Mysticism tests made to cast a spell." : "";

                return new CareerEventModel(new EventModel(
                    "A Talent for the Art: Your studies and the sermons you have attended have paid off; you understand the Art in a way you could not before. " + effect,
                    "",
                    "Your studies and the sermons you have attended have paid off; you understand the Art in a way you could not before. " + effect
                ),
                    () => {
                        if (!character.hasTalent("Mystic")) {
                            character.includeMysticTalent = true;
                        }
                    });
            }
            case 21: {
                const effect = character.hasTalent("Mystic") ? "You gain one bonus Momentum on all Mysticism tests made to cast a spell." : "You may now select the mystic talent for free.";

                return new CareerEventModel(new EventModel(
                    "A Talent for the Art: Your studies and the sermons you have attended have paid off; you understand the Art in a way you could not before. " + effect,
                    "",
                    "Your studies and the sermons you have attended have paid off; you understand the Art in a way you could not before. " + effect
                ),
                    () => {
                        if (!character.hasTalent("Mystic")) {
                            character.includeMysticTalent = true;
                        }
                    });
            }
            case 22:
                return new CareerEventModel(new EventModel(
                    "Triumphant: You foiled a Heretic or criminal plot on your own, or with some close allies. Contrary to procedure, you did not call for support from the Inquisition. Why not? Gain an enemy in a Heretic cult. Gain a single item with a cost of five or less in ‘liberated equipment’.",
                    "",
                    "You foiled a Heretic or criminal plot on your own, or with some close allies. Contrary to procedure, you did not call for support from the Inquisition. Why not? Gain an enemy in a Heretic cult. Gain a single item with a cost of five or less in ‘liberated equipment’."
                ));
            case 23:
                return new CareerEventModel(new EventModel(
                    "Survivor: You were one of just a few survivors from a massive disaster, in which many people died. You lost something in the collapse, and brought something out with you. What were they? Something terrible happened, but you survived. You gain one favour from a useful contact, and one enemy made during the disaster. You also have an issue with enclosed spaces.",
                    "Claustrophobia",
                    "Something terrible happened, but you survived. You gain one favour from a useful contact, and one enemy made during the disaster."
                ));
            case 24: {
                let faction = FactionsHelper.generateHeritage();
                if (faction === Faction.Cybertronic || faction === Faction.Mishima) {
                    faction = FactionsHelper.generateHeritage();
                }

                const factionName = FactionsHelper.getFaction(faction).name;

                return new CareerEventModel(new EventModel(
                    `Contact Within a Corporation: You have established a working relationship within one of the corporations (${factionName}).`,
                    "",
                    `You have established a working relationship within one of the corporations (${factionName}).`
                ));
            }
            case 25: {
                let directorate = "";
                switch (Math.floor(Math.random() * 6) + 1) {
                    case 1: directorate = "First Directorate"; break;
                    case 2: directorate = "Second Directorate"; break;
                    case 3:
                    case 4: directorate = "Third Directorate"; break;
                    case 5:
                    case 6: directorate = "Fourth Directorate"; break;
                }

                return new CareerEventModel(new EventModel(
                    `Contact within a Directorate: You have a contact within one of the Directorates (${directorate}).`,
                    "",
                    `You have a contact within one of the Directorates (${directorate}).`
                ));
            }
            case 26: {
                return new CareerEventModel(new EventModel(
                    "Inquisition Contacts: You have developed a strong working relationship with an Inquisitor, Revisor, or a Paladin, and have acquired clearance to view and assist with their operations.",
                    "",
                    "You have developed a strong working relationship with an Inquisitor, Revisor, or a Paladin, and have acquired clearance to view and assist with their operations."
                ));
            }
            case 27: {
                return new CareerEventModel(new EventModel(
                    "Pain Conditioning: You spent months undergoing intensive pain conditioning and acclimatisation, hardening you against harm. Use the next best row when determining Starting Wounds.",
                    "",
                    "You spent months undergoing intensive pain conditioning and acclimatisation, hardening you against harm."
                ),
                    () => { character.woundsBonus++; });
            }
            case 28:
                return new CareerEventModel(new EventModel(
                    "Chance of a Lifetime: Someone powerful has taken a liking to you and he wants you by his side. You regain one Life Point.",
                    "",
                    "Someone powerful has taken a liking to you and he wants you by his side."
                ),
                    () => { character.lifePoints++; });
            case 29:
                return new CareerEventModel(new EventModel(
                    "Political Connections: You have staked your worth and reputation on the career of a particular high-ranking Brother. You support him with words and deeds alike. You gain the Brother you are supporting as an Ally. You can get access to your Ally in an official capacity with only 24 hours’ notice.",
                    "",
                    "You have staked your worth and reputation on the career of a particular high-ranking Brother. You support him with words and deeds alike. You gain the Brother you are supporting as an Ally. You can get access to your Ally in an official capacity with only 24 hours’ notice."
                ));
            case 30: {
                const effect = character.hasTalent("Mystic") ? "You gain one bonus Momentum on all Mysticism tests made to cast a spell." : "You may now select the Mystic talent for free.";

                return new CareerEventModel(new EventModel(
                    "Involved in a Mystical Experiment: You volunteered for some secretive experiment into the nature of the Art, and the experiment greatly boosted your spiritual fortitude. " + effect + " You also gain one additional Mental Wound.",
                    "",
                    "You volunteered for some secretive experiment into the nature of the Art, and the experiment greatly boosted your spiritual fortitude. " + effect
                ),
                    () => {
                        if (!character.hasTalent("Mystic")) {
                            character.includeMysticTalent = true;
                        }

                        character.mentalWoundsIncrease++;
                    });
            }
            case 31:
                return new CareerEventModel(new EventModel(
                    "Foil a Plot: While performing your normal duties, you spot a clue that leads to a Heretic plot being foiled. Gain one bonus Momentum on Command tests when dealing with your subordinates within the Brotherhood.",
                    "",
                    "While performing your normal duties, you spot a clue that leads to a Heretic plot being foiled. Gain one bonus Momentum on Command tests when dealing with your subordinates within the Brotherhood."
                ));
            case 32:
                return new CareerEventModel(new EventModel(
                    "See the Light: You have had an epiphany, and now have a clear understanding of the Brotherhood’s role as the saviours of humanity. Gain one additional Mental Wound.",
                    "",
                    "You have had an epiphany, and now have a clear understanding of the Brotherhood’s role as the saviours of humanity."
                ),
                    () => { character.mentalWoundsIncrease++; });
            case 33:
                return new CareerEventModel(new EventModel(
                    "Spurn the Darkness: You have had an inadvertent encounter with someone under the sway of the Dark Symmetry. You survive the encounter, and the experience hardens your resolve. Increase your Corruption Soak by one.",
                    "",
                    "You have had an inadvertent encounter with someone under the sway of the Dark Symmetry. You survive the encounter, and the experience hardens your resolve. Increase your Corruption Soak by one."
                ));
            case 34:
                return new CareerEventModel(new EventModel(
                    "Blessed by the Cardinal: For whatever reason, your class of apprentices receives a personal blessing from the Cardinal himself. You gain one bonus Momentum on Persuade tests when dealing with other members of the Brotherhood.",
                    "",
                    "For whatever reason, your class of apprentices receives a personal blessing from the Cardinal himself. You gain one bonus Momentum on Persuade tests when dealing with other members of the Brotherhood."
                ));
            case 35:
                return new CareerEventModel(new EventModel(
                    "Cartel Appointment: You have been called to serve as a consultant to some division of the Cartel, giving you considerable access to the other corporations, and many opportunities for insight into foreign cultures. You may reduce the difficulty of Education tests by one when dealing with information about other corporations.",
                    "",
                    "You have been called to serve as a consultant to some division of the Cartel, giving you considerable access to the other corporations, and many opportunities for insight into foreign cultures. You may reduce the difficulty of Education tests by one when dealing with information about other corporations."
                ));
            case 36:
                return new CareerEventModel(new EventModel(
                    "Voice of the First Cardinal! You have started hearing the voice of the first Cardinal in your thoughts, guiding and advising you. Several times he has warned you of potential dangers. Why has the spirit of the First Cardinal chosen you? You may spend a Chronicle point to ask the GM a single question about the immediate threats present in a scene. The GM must answer honestly, though he may still be cryptic.",
                    "",
                    "You have started hearing the voice of the first Cardinal in your thoughts, guiding and advising you. You may spend a Chronicle point to ask the GM a single question about the immediate threats present in a scene. The GM must answer honestly, though he may still be cryptic."
                ));
            case 37:
                return new CareerEventModel(new EventModel(
                    "Maimed in service: You suffered a serious injury in the line of duty. Your determination to continue on has increased, but you are less able than you once were. All movement-related skill tests increase their difficulty by one step, but all Willpower tests reduce their difficulty by one step. Treatment to remove the penalty to movement-related skill tests costs fifty assets.",
                    "",
                    "All movement-related skill tests increase their difficulty by one step, but all Willpower tests reduce their difficulty by one step. Treatment to remove the penalty to movement-related skill tests costs fifty assets."
                ));
            case 38:
                return new CareerEventModel(new EventModel(
                    "Contact within the Curia: You have somehow made contact with a member of the Curia.",
                    "",
                    "You have somehow made contact with a member of the Curia."
                ));
            case 39:
                return new CareerEventModel(new EventModel(
                    "Startling Nightmares: You have recurring dreams relating to a traumatic event in your past. Nightmarish or benevolent, you often must take time to distinguish dream from real events when you awake.",
                    "Vivid Dreams",
                    "You have recurring dreams relating to a traumatic event in your past. Nightmarish or benevolent, you often must take time to distinguish dream from real events when you awake."
                ));
            case 40:
                return new CareerEventModel(new EventModel(
                    "Audience with the Cardinal: You have distinguished yourself sufficiently that you receive an audience with the Cardinal himself. Your deeds are lauded by many, and whispers of your advancement surround you constantly. You gain one bonus Momentum on Persuade tests when dealing with other members of the Brotherhood, and gain one additional Life point.",
                    "",
                    "You have distinguished yourself sufficiently that you receive an audience with the Cardinal himself. Your deeds are lauded by many, and whispers of your advancement surround you constantly. You gain one bonus Momentum on Persuade tests when dealing with other members of the Brotherhood."
                ),
                    () => { character.lifePoints++; });
        }
    }
}

export const BrotherhoodCareerEvents = new CareerEventsBrotherhood();