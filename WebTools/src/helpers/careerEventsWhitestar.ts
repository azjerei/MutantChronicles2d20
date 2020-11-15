import {character} from '../common/character';
import {EventModel, CareerEventModel} from '../common/eventModel';
import {Faction, FactionsHelper} from './factions';
import {PrimaryCareer} from'./primaryCareers';
import {Status, StatusHelper} from './status';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {TalentsHelper} from './talents';
import {DiceRoller} from './diceRoller';

class CareerEventsWhitestar {
    generateEvent(roll: number): CareerEventModel {
        switch (roll) {
            case 2:
                return new CareerEventModel(new EventModel(
                    "Disabling Disease. You contract a wasting disease. The treatment will cost fifty assets and until then you count as having wounds equal to one level lower on the Starting Wounds Table.",
                    "",
                    "You contract a wasting disease. The treatment will cost fifty assets and until then you count as having wounds equal to one level lower on the Starting Wounds Table "),
                    () => { character.woundsBonus--; });
            case 3:
                return new CareerEventModel(new EventModel(
                    "Somewhere, somehow, you’ve gained a significant amount of attention for the wrong reason. You can’t prove it, but someone is harbouring an intent against you and this makes you nervous. You gain a Commissar or Consul as an enemy.",
                    "Hidden Enemy",
                    "You gain a Commissar or Consul as an enemy."));
            case 4:
                return new CareerEventModel(new EventModel(
                    "You’re on the run. Who’s after you, and why? Gain an enemy in a Heretic cult, or the Brotherhood, or the GUFB.",
                    "",
                    "",
                    [
                        "Enemy in a Heretic cult",
                        "Enemy in the Brotherhood",
                        "Enemy in the GUFB"
                    ],
                    (option) => {
                        character.careerEvents[character.careerEvents.length - 1].effect = `You gain an ${option}.`;
                    }));
            case 5:
                return new CareerEventModel(new EventModel(
                    "Barred from a Stronghold – due to some regrettable foolishness on your part, a Stronghold that you once belonged to made the decision to bar you. Members of the organisation that led to your expulsion regard you as a disgrace. Gain an enemy in an organisation related to your career. You lose a single Federation Commendation (if you possess any).",
                    "",
                    "Gain an enemy in an organisation related to your career."),
                    () => { character.superPoints = Math.max(0, character.superPoints - 1); });
            case 6:
                return new CareerEventModel(new EventModel(
                    "You once unwittingly assisted forgers to duplicate products bearing the white star. The Homeland Department of the GUFB would very much like to subject you to torturous interrogations in regard to this crime.",
                    "Subject to Unkind Inquiries",
                    "You once unwittingly assisted forgers to duplicate products bearing the white star. The Homeland Department of the GUFB would very much like to subject you to torturous interrogations in regard to this crime."));
            case 7: {
                var options = ["Become Fired"];

                if (character.superPoints > 0) {
                    options.push("Avoid being Fired (-1 FC)");
                }

                var detailView = "";

                return new CareerEventModel(new EventModel(
                    "You were once accused of a serious crime. Fortunately for you, the Magistrate involved in the subsequent investigation did not deem you worthy of conviction. However, it did throw your career into chaos. You are Fired: You may spend a Federation Commendation to avoid this.",
                    "",
                    "You were once accused of a serious crime. Fortunately for you, the Magistrate involved in the subsequent investigation did not deem you worthy of conviction.",
                    options,
                    (option) => {
                        if (option.indexOf("Avoid") > -1) {
                            character.superPoints--;
                        }
                        else {
                            detailView = "FiredEvent";
                        }
                    },
                    detailView));
            }
            case 8: {
                const roll = Math.floor(Math.random() * 6) + 1;
                var faction = "";

                switch (roll) {
                    case 1: faction = "Cybertronic"; break;
                    case 2: faction = "Capitol"; break;
                    case 3: faction = "Imperial"; break;
                    case 4: faction = "Mishima"; break;
                    case 5: faction = "Bauhaus"; break;
                    case 6: faction = "the Cartel"; break;
                }

                return new CareerEventModel(new EventModel(
                    `Big business means you get to make big decisions that have big consequences. For the CEOs of one particular corporation, your decisions and influence prove a little too hard to swallow, gaining you a lifelong enemy and threat. You have a powerful enemy within ${faction} with whom you have a conflict.`,
                    "",
                    `You have a powerful enemy within ${faction} with whom you have a conflict.`));
            }
            case 9:
                return new CareerEventModel(new EventModel(
                    "Somebody that you treated poorly in the past, an ex-lover or someone who depended on your friendship, has recently had a streak of good fortune, and may be out for revenge. Gain an enemy – the person you’ve treated poorly. You can try to repair your relationship, but it won’t be easy.",
                    "",
                    "Somebody that you treated poorly in the past, an ex-lover or someone who depended on your friendship, has recently had a streak of good fortune, and may be out for revenge. Gain an enemy – the person you’ve treated poorly. You can try to repair your relationship, but it won’t be easy."));
            case 10:
                return new CareerEventModel(new EventModel(
                    "You were called in for questioning by the authorities, what did they want to know? They let you go, but on what condition? You owe a favour to someone in the GUFB or the Brotherhood.",
                    "",
                    "",
                    [
                        "GUFB",
                        "Brotherhood"
                    ],
                    (option) => {
                        character.careerEvents[character.careerEvents.length - 1].effect = `You owe a favour to someone in the ${option}.`;
                    }));
            case 11: {
                var options = character.canRemoveCriminalRecord
                    ? ["Ignore Criminal Record (-1 Earnings)", "Accept Criminal Record"]
                    : [];

                return new CareerEventModel(new EventModel(
                    "Your name was mentioned in connection with a criminal act and recorded with the GUFB and security databases. You are redeployed as a result. You are Fired, and may not continue in this Primary Career. Gain a Criminal Record.",
                    "",
                    "Your name was mentioned in connection with a criminal act and recorded with the GUFB and security databases. You are redeployed as a result.",
                    options,
                    (option) => {
                        if (option.indexOf("Ignore") > -1) {
                            character.canRemoveCriminalRecord = false;
                            character.earnings = Math.max(0, character.earnings - 1);
                        }
                        else {
                            character.applyCriminalRecord();
                        }
                    },
                    "FiredEvent"));
            }
            case 12: {
                const roll = Math.floor(Math.random() * 6) + 1;
                var faction = "";

                switch (roll) {
                    case 1: faction = "Cybertronic"; break;
                    case 2: faction = "Capitol"; break;
                    case 3: faction = "Imperial"; break;
                    case 4: faction = "Mishima"; break;
                    case 5: faction = "Bauhaus"; break;
                    case 6: faction = "the Cartel"; break;
                }

                return new CareerEventModel(new EventModel(
                    `You have been approached by corporate intelligence during one of your careers, who sought to buy Federation secrets from you. You must make the decision as to whether you took up this offer, and what it involved if so. Regardless as to whether you did or not, the contact has always remained approachable, though usually at a cost. You have a covert contact within ${faction}.`,
                    "",
                    `You have been approached by corporate intelligence during one of your careers, who sought to buy Federation secrets from you. You have a covert contact within ${faction}. `,
                    [
                        "Accept offer (+1 Assets, favour)",
                        "Refuse offer (+1 FC)"
                    ],
                    (option) => {
                        if (option.indexOf("Accept")) {
                            character.assets++;
                            character.careerEvents[character.careerEvents.length - 1].effect += `You accepted the offer. The contact owes you a favour.`;
                        }
                        else {
                            character.superPoints++;
                            character.careerEvents[character.careerEvents.length - 1].effect += `You refused the offer.`;
                        }
                    }));
            }
            case 13:
                return new CareerEventModel(new EventModel(
                    "Someone has been keeping an eye on you, they always seem to be there when you look around. What do you think they’re interested in? Who are they?",
                    "Under Surveillance",
                    "Someone has been keeping an eye on you, they always seem to be there when you look around."));
            case 14:
                return new CareerEventModel(new EventModel(
                    "Your ancestors have traced a lineage that can claim shares in the Bauhaus Fieldhausen holdings. The board have honoured your family’s claim, and while the shares are not worth much, your family have managed to live more comfortably; though much to the chagrin of your fellow citizens of course. At the end of each adventure (or after a period of time chosen by your GM), roll a number of [DS] equal to your earnings rating; for each Dark Symmetry Icon rolled, you gain one asset, as the shares pay dividends. Social test with members of your own faction are one step more difficult due to your family’s flamboyance.",
                    "",
                    "At the end of each adventure (or after a period of time chosen by your GM), roll a number of [DS] equal to your earnings rating; for each Dark Symmetry Icon rolled, you gain one asset, as the shares pay dividends. Social test with members of your own faction are one step more difficult due to your family’s flamboyance."));
            case 15:
                return new CareerEventModel(new EventModel(
                    "You’re obsessed with one of the beautiful prodavets or prodavshchitsa, the poster girls and boys used to entice citizens into joining the militia. You dream about them all the time. Oh it’ll never happen, you move in different worlds, but you just can’t stop thinking about them. Your obsession leads to easy temptation, reducing your Corruption Soak by one.",
                    "Impossible Infatuation",
                    "You’re obsessed with one of the beautiful prodavets or prodavshchitsa, the poster girls and boys used to entice citizens into joining the militia. Your obsession leads to easy temptation, reducing your Corruption Soak by one."));
            case 16:
                return new CareerEventModel(new EventModel(
                    "You don’t like it, but a Heretic (or Criminal) has a hold over you. What choices do you have to overthrow their control?",
                    "Blackmailed",
                    "You don’t like it, but a Heretic (or Criminal) has a hold over you. What choices do you have to overthrow their control?"));
            case 17:
                return new CareerEventModel(new EventModel(
                    "You have had a number of dealings with Cybertronic. This had led to you networking to positive effect with a number of people in the corporation. However, it has also alienated you from the more pious citizens of Whitestar. You have an ally in Cybertronic. However, you also have an enemy in either the Zlogorian Orthodox Church or the Brotherhood.",
                    "",
                    "You have had a number of dealings with Cybertronic. You have an ally in Cybertronic. ",
                    [
                        "Zlogorian Orthodox Church",
                        "Brotherhood"
                    ],
                    (option) => {
                        character.careerEvents[character.careerEvents.length - 1].effect += `You have an enemy in the ${option}.`;
                    }));
            case 18:
                return new CareerEventModel(new EventModel(
                    "Lost in the Wastelands – you were one of the few survivors when an expedition into the Wastelands encountered difficulties and lost its way before being rescued.",
                    "Wasteland Terrors",
                    "Lost in the Wastelands – you were one of the few survivors when an expedition into the Wastelands encountered difficulties and lost its way before being rescued."),
                    () => { character.age++; });
            case 19:
                return new CareerEventModel(new EventModel(
                    "You’re increasingly suffering from an unrelenting fury and moody outbursts. The secret experiments in Sector Black at Mertruka Base didn’t just change you physically. Questioning your own reasons for volunteering, you struggle to control the new you. You gain one additional Serious Wound and one additional Critical Wound. However, you reduce your maximum Mental Wounds by two.",
                    "",
                    "You’re increasingly suffering from an unrelenting fury and moody outbursts. The secret experiments in Sector Black at Mertruka Base didn’t just change you physically. Questioning your own reasons for volunteering, you struggle to control the new you."),
                    () => {
                        character.seriousWoundsIncrease++;
                        character.criticalWoundsIncrease++;
                        character.mentalWoundsIncrease -= 2;
                    });
            case 20:
                return new CareerEventModel(new EventModel(
                    "You are Fired. You may not continue in this Primary Career.",
                    "",
                    "You got Fired!",
                    [],
                    () => { },
                    "FiredEvent"));
            case 21:
                return new CareerEventModel(new EventModel(
                    "Your lover yearns for a higher social class. They hoard wealth and are considered flamboyant; you know that fellow citizens will soon turn on them, provided your lover doesn’t leave you first whilst seeking to improve their lot. Increase Earnings Rating by one (to a maximum of five) whilst they are still in love with you, but they are very demanding or vulnerable.",
                    "Vulnerable Lover",
                    "Your lover yearns for a higher social class. They hoard wealth and are considered flamboyant; you know that fellow citizens will soon turn on them, provided your lover doesn’t leave you first whilst seeking to improve their lot."),
                    () => { character.earnings = Math.min(5, character.earnings + 1); });
            case 22:
                return new CareerEventModel(new EventModel(
                    "You foiled a Heretic (or criminal) plot on your own, or with some friends. Why didn’t you call in the Brotherhood (or Authorities)? Gain an enemy in a Heretic cult. Gain five assets in ‘liberated equipment’.",
                    "",
                    "You foiled a Heretic (or criminal) plot on your own, or with some friends. Why didn’t you call in the Brotherhood (or Authorities)? Gain an enemy in a Heretic cult."),
                    () => { character.assets += 5; });
            case 23:
                return new CareerEventModel(new EventModel(
                    "Spending your time working spreading the message of the Brotherhood in their mission to gain a stronger presence on Earth has proven more beneficial than expected. Some contacts within the Brotherhood are a lot more friendly now than before. You have an ally in the Brotherhood, and gain one Federation Commendation.",
                    "",
                    "Spending your time working spreading the message of the Brotherhood in their mission to gain a stronger presence on Earth has proven more beneficial than expected. You have an ally in the Brotherhood."),
                    () => { character.superPoints++; });
            case 24:
                return new CareerEventModel(new EventModel(
                    "You gained employment on the Zolotoy Glaz for a season of external visits. While you rarely met the Tsarina, you still have contacts within her immediate workforce. Your friends can find your constant name-dropping tedious. You have an ally who is employed on the Zolotoy Glaz and gain three assets.",
                    "Annoying Name-Dropping",
                    "You gained employment on the Zolotoy Glaz for a season of external visits. You have an ally who is employed on the Zolotoy Glaz."),
                    () => {
                        character.assets += 3;
                    });
            case 25:
                return new CareerEventModel(new EventModel(
                    "A Council Elder or Leader once publicly chastised you for being workshy. You have never forgiven them, and your reputation is still somewhat tarnished. Gain an enemy from within your Stronghold’s leadership. Further, you lose one Federation Commendation (if you have any).",
                    "",
                    "A Council Elder or Leader once publicly chastised you for being workshy. Gain an enemy from within your Stronghold’s leadership."),
                    () => { character.superPoints = Math.max(0, character.superPoints - 1); });
            case 26: {
                const faction = FactionsHelper.getFaction(FactionsHelper.generateHeritage());

                return new CareerEventModel(new EventModel(
                    "You’d hoped to gain opportunities by volunteering to undertake special duties in the local Reserve forces. It worked. Regrettably it didn’t work as planned, and your current role comes at a cost. Gain a Federation Commendation. Choose one of the options below.",
                    "",
                    "You’d hoped to gain opportunities by volunteering to undertake special duties in the local Reserve forces. It worked. Regrettably it didn’t work as planned, and your current role comes at a cost.",
                    [
                        "-1 Serious Wounds",
                        "-1 Mental Wounds",
                        `Contact in ${faction}`
                    ],
                    (option) => {
                        if (option.indexOf("Serious") > -1) {
                            character.seriousWoundsIncrease--;
                        }
                        else if (option.indexOf("Mental") > -1) {
                            character.mentalWoundsIncrease--;
                        }
                        else {
                            character.careerEvents[character.careerEvents.length - 1].effect += ` You have a contact in ${faction}.`;
                        }
                    }));
            }
            case 27: {
                const faction = FactionsHelper.getFaction(FactionsHelper.generateHeritage());

                return new CareerEventModel(new EventModel(
                    `You are a strong believer in the Cartel cause. This has won you regard with some members of other corporations, at the cost of a degree of trust from your fellow citizens. You have a contact in ${faction}, but also a rival in Whitestar.`,
                    "",
                    `You are a strong believer in the Cartel cause. This has won you regard with some members of other corporations, at the cost of a degree of trust from your fellow citizens. You have a contact in ${faction}, but also a rival in Whitestar.`));
            }
            case 28:
                return new CareerEventModel(new EventModel(
                    "A colleague was exposed as a Heretic and you were given a one-way ticket to the nearest Brotherhood outpost by the authorities, who then turned you over to the Inquisition for questioning. You decided not to tell them that you had kept your own suspicions about the man quiet. This has left you feeling paranoid about the possibility of the Brotherhood finding out. Gain a favour from someone in a Heretic or rebel group.",
                    "",
                    "Gain a favour from someone in a Heretic or rebel group."));
            case 29:
                return new CareerEventModel(new EventModel(
                    "You were implicated in a Heretic plot, though you were exonerated by the authorities. Why were you involved? Why were you not delivered to the Brotherhood?",
                    "",
                    "You were implicated in a Heretic plot, though you were exonerated by the authorities. ",
                    [
                        "Contact in the Streltzy",
                        "Contact in the Zlogorian Orthodox Church"
                    ],
                    (option) => {
                        character.careerEvents[character.careerEvents.length - 1].effect += ` You have a ${option} who owes you a favour.`;
                    }));
            case 30:
                return new CareerEventModel(new EventModel(
                    "You helped the Streltsy to repel a mutant incursion. A number of the creatures escaped, but most were killed or executed. You were rewarded for your help by the garrison commander. Gain a Federation Commendation and two assets for your trouble.",
                    "Valiant",
                    "You helped the Streltsy to repel a mutant incursion. A number of the creatures escaped, but most were killed or executed."),
                    () => {
                        character.superPoints++;
                        character.assets += 2;
                    });
            case 31:
                return new CareerEventModel(new EventModel(
                    "During the course of your career you accompanied a team into the depths of a Heretic temple. Against your better judgement you took a small metal object, some token of the Dark Legion, as a souvenir of your expedition. You still keep it, believing it to bring you good fortune. Gain an enemy in a Heretic cult. Further, the ‘souvenir’ grants you one additional Chronicle point. Whenever you use a Chronicle point, roll a [DS] – if a Dark Symmetry icon is rolled, the character suffers a 3[DS] Corruption Roll.",
                    "",
                    "Gain an enemy in a Heretic cult. You have a ‘souvenir’ that grants you one additional Chronicle point. Whenever you use a Chronicle point, roll a [DS] – if a Dark Symmetry icon is rolled, the character suffers a 3[DS] Corruption Roll."));
            case 32:
                return new CareerEventModel(new EventModel(
                    "A GUFB agent once tasked you with assisting a black market operation. You feel uneasy about the nature of the work you helped perform, though you did gain a reliable contact. Gain a Federation Commendation and a contact with the GUFB. However, your doubts leave you vulnerable; reduce your Corruption Soak by one.",
                    "",
                    "Gain a contact with the GUFB. However, your doubts leave you vulnerable; reduce your Corruption Soak by one."),
                    () => { character.superPoints++; });
            case 33:
                return new CareerEventModel(new EventModel(
                    "You struck gold in meeting the expectations of a corporate purchaser. Either the work you carried out or product you provided resulted in a very happy customer. Despite sharing the profits with your community, you have still been left feeling flush. Gain five assets and a Federation Commendation.",
                    "",
                    "You struck gold in meeting the expectations of a corporate purchaser. Either the work you carried out or product you provided resulted in a very happy customer. Despite sharing the profits with your community, you have still been left feeling flush."),
                    () => {
                        character.assets += 5;
                        character.superPoints++;
                    });
            case 34:
                return new CareerEventModel(new EventModel(
                    "During the course of your work you have been asked to keep an eye out for certain Heretical activities, and to a make regular report of them to an anonymous contact. You think you are working for the GUFB, but your contacts are actually members of another insidious Heretical cult. Gain an ally. You believe this ally is from the GUFB, but they’re actually a Heretic. In addition, gain five assets as a ‘reward’ for your information.",
                    "",
                    "Gain an ally. You believe this ally is from the GUFB, but they’re actually a Heretic."),
                    () => { character.assets += 5; });
            case 35:
                return new CareerEventModel(new EventModel(
                    "You are a reluctant spy involved in counter-espionage. The GUFB runs the Homeland Department. For reasons that you hardly understand they have contacted you in order to report on any activity you notice that might be linked to the Foreign Department of the GUFB. Periodically during play, you will be contacted by your handler in the Foreign Department with an assignment to observe and report upon a particular individual, or to obtain particular documents. If you succeed at this assignment, you will gain an additional 100xp during that session.",
                    "",
                    "Periodically during play, you will be contacted by your handler in the Foreign Department with an assignment to observe and report upon a particular individual, or to obtain particular documents. If you succeed at this assignment, you will gain an additional 100xp during that session."));
            case 36:
                return new CareerEventModel(new EventModel(
                    "You became a minor star through the Whitestar propaganda machine for a minor deed that had been blown out of proportion. People occasionally recognise you, but your career isn’t set to take off in a big way. You gain one free Momentum on successful Command, Lifestyle, and Persuade tests, but all Stealth tests increase their difficulty by one step where being recognised would cause you a problem.",
                    "",
                    "You gain one free Momentum on successful Command, Lifestyle, and Persuade tests, but all Stealth tests increase their difficulty by one step where being recognised would cause you a problem."));
            case 37:
                return new CareerEventModel(new EventModel(
                    "You were disabled in a serious accident. All movement related skill tests are one difficulty harder, but you have gained a strong will. All Mental Strength tests are one difficulty lower (minimum of one).",
                    "",
                    "You were disabled in a serious accident. All movement related skill tests are one difficulty harder, but you have gained a strong will. All Mental Strength tests are one difficulty lower (minimum of one)."));
            case 38:
                return new CareerEventModel(new EventModel(
                    "Good Negotiator – whether it’s in the council chambers, doing a deal on the streets, or talking down an armed tribesman, you’re gifted at negotiating. All Lifestyle and Persuade tests made to negotiate reduce their difficulty by one step (minimum of zero).",
                    "",
                    "You’re gifted at negotiating. All Lifestyle and Persuade tests made to negotiate reduce their difficulty by one step (minimum of zero)."));
            case 39:
                return new CareerEventModel(new EventModel(
                    "You're harbouring an AI system, perhaps in a childhood toy. The AI is strongly degraded. You grew up with it and can't bare to part with it. Gain an item worth 5 Assets that houses the AI. The AI provides 1 Momentum to Education tests so long as the characters can freely converse with it.",
                    "",
                    "You're harbouring an AI system, perhaps in a childhood toy. The AI is strongly degraded. You grew up with it and can't bare to part with it. Gain an item worth 5 Assets that houses the AI. The AI provides 1 Momentum to Education tests so long as the characters can freely converse with it."
                ));
            case 40:
                return new CareerEventModel(new EventModel(
                    "Major Career success! You have been incredibly successful in this career path. Increase your Earnings Rating by one, and gain two Federation Commendation.",
                    "",
                    "Major Career success!"),
                    () => {
                        character.earnings++;
                        character.superPoints += 2;
                    });
        }
    }
}

export const WhitestarCareerEvents = new CareerEventsWhitestar();