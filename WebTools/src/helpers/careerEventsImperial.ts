import {character} from '../common/character';
import {EventModel, CareerEventModel} from '../common/eventModel';
import {Faction, FactionsHelper} from './factions';
import {PrimaryCareer} from'./primaryCareers';
import {Status, StatusHelper} from './status';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {TalentsHelper} from './talents';
import {DiceRoller} from './diceRoller';
import {ClansHelper} from './clans';
import {Timeline} from './timelines';

class CareerEventsImperial {
    generateEvent(roll: number): CareerEventModel {
        switch (roll) {
            case 2:
                return new CareerEventModel(new EventModel(
                    "Traitor. You or your family are known traitors of the Imperial corporation. Why were you declared traitors? Are the allegations true? If not, how will you clear your name?",
                    "Poor Reputation",
                    "You or your family are known traitors of the Imperial corporation. Why were you declared traitors? Are the allegations true? If not, how will you clear your name?"),
                    () => { });
            case 3:
                return new CareerEventModel(new EventModel(
                    "Mining Accident. You were badly injured in a cave-in on a nameless Imperial mining asteroid, but narrowly survived with just a scar. What were you doing there and what happened?",
                    "Ugly Old Scar",
                    "You were badly injured in a cave-in on a nameless Imperial mining asteroid, but narrowly survived with just a scar. What were you doing there and what happened?"),
                    () => { });
            case 4:
                return new CareerEventModel(new EventModel(
                    "Suspected of Heresy. The Brotherhood has you marked as a potential Heretic, but despite several forceful interrogations has never been able to prove it. Instead it has to content itself with following your every move. How will you clear your name, and lose your Inquisitorial shadow?",
                    "Inquisitorial Scrutiny",
                    "The Brotherhood has you marked as a potential Heretic, but despite several forceful interrogations has never been able to prove it. Instead it has to content itself with following your every move. How will you clear your name, and lose your Inquisitorial shadow?"),
                    () => { });
            case 5: {
                let clan = ClansHelper.generateClan();
                while (clan === character.clan) {
                    clan = ClansHelper.generateClan();
                }

                const clanName = ClansHelper.getClan(clan).name;

                return new CareerEventModel(new EventModel(
                    `Major Clan Enemy. You have earned the enmity of Clan ${clanName}. It has sworn vengeance on you as a matter of honour. What did you do?`,
                    "",
                    `You have earned the enmity of Clan ${clanName}. It has sworn vengeance on you as a matter of honour. What did you do?`),
                    () => { });
            }
            case 6:
                return new CareerEventModel(new EventModel(
                    "Insulted the Serenity. Meeting the Serenity is a great privilege, but your social faux pas made the papers when you accidentally – but very publically – snubbed the Serenity. Your social standing is reduced by one.",
                    "",
                    "Meeting the Serenity is a great privilege, but your social faux pas made the papers when you accidentally – but very publically – snubbed the Serenity."),
                    () => { StatusHelper.reduceStatus(); });
            case 7:
                return new CareerEventModel(new EventModel(
                    "Imperial Entanglements. ISC-6 Internal Revision pulled your life apart, believing you to be a double agent for another corporation. Are you? How are you going to clear your name? Due to official scrutiny, and the scandal associated with your name, you struggle to maintain your business. Reduce your Earnings Rating by one.",
                    "",
                    "ISC-6 Internal Revision pulled your life apart, believing you to be a double agent for another corporation. Are you? How are you going to clear your name?"),
                    () => { character.earnings = Math.max(0, character.earnings - 1); });
            case 8:
                return new CareerEventModel(new EventModel(
                    "A question of legitimacy. Apparently your birth was the subject of quite some scandal. Perhaps you are a bastard offspring of a powerful noble, or a love child conceived in a foolish act of passion. Either way, this information has escaped and now you are tainted by the stigma. Your social standing is reduced by one. You gain an ally in your clan's Core Family.",
                    "",
                    "Apparently your birth was the subject of quite some scandal. Perhaps you are a bastard offspring of a powerful noble, or a love child conceived in a foolish act of passion. Either way, this information has escaped and now you are tainted by the stigma. You gain an ally in your clan's Core Family."),
                    () => { StatusHelper.reduceStatus(); });
            case 9:
                return new CareerEventModel(new EventModel(
                    "Fired: You lost your job. What are you going to do about it?",
                    "",
                    "Fired: You lost your job. What are you going to do about it?",
                    [],
                    () => { },
                    "Fired"),
                    () => { });
            case 10:
                return new CareerEventModel(new EventModel(
                    "Manslaughter. Perhaps in the heat of the moment your gun went off, or your aim was poor, but whatever the cause the end result was the death of a friendly: an ally or an innocent bystander. The Court of Inquiry cleared you of all charges, but still the memory of that fatal incident haunts you.",
                    "Haunted by a Mistake",
                    "Perhaps in the heat of the moment your gun went off, or your aim was poor, but whatever the cause the end result was the death of a friendly: an ally or an innocent bystander. The Court of Inquiry cleared you of all charges, but still the memory of that fatal incident haunts you."),
                    () => { });
            case 11:
                return new CareerEventModel(new EventModel(
                    "Wounded in the Line of Duty. You were badly wounded and spent several months recuperating. You still have the scars. What happened? Your serious wounds are reduced by one.",
                    "",
                    "You were badly wounded and spent several months recuperating. You still have the scars. What happened?"),
                    () => { character.seriousWoundsIncrease--; });
            case 12:
                return new CareerEventModel(new EventModel(
                    "Black outs. You are prone to blackouts of up to twenty four hours. When you awake, you have no knowledge of what you did during that period – but you are terrified it was something terrible. Your Corruption Soak is reduced by one.",
                    "",
                    "You are prone to blackouts of up to twenty four hours. When you awake, you have no knowledge of what you did during that period – but you are terrified it was something terrible. Your Corruption Soak is reduced by one."),
                    () => { });
            case 13:
                return new CareerEventModel(new EventModel(
                    "Demoted. You made the wrong call or were the victim of politics, but whatever the reason you got demoted. How are you going to get your old rank back? Your social standing and earnings are both reduced by one.",
                    "",
                    "You made the wrong call or were the victim of politics, but whatever the reason you got demoted. How are you going to get your old rank back?"),
                    () => {
                        StatusHelper.reduceStatus();
                        character.earnings = Math.max(0, character.earnings - 1);
                    });
            case 14:
                return new CareerEventModel(new EventModel(
                    "Miner’s Lung. You have spent too much time around mines and have acquired a distinctive cough. Annoying, but rarely fatal. You are easily winded by physical exertion, and increase the Repercussion Range of Athletics tests by one step.",
                    "",
                    "You have spent too much time around mines and have acquired a distinctive cough. Annoying, but rarely fatal. You are easily winded by physical exertion, and increase the Repercussion Range of Athletics tests by one step."),
                    () => { });
            case 15:
                return new CareerEventModel(new EventModel(
                    "Angered a Minor Clan. You have earned the ire of a minor clan and it is looking for ways to even the score – though it will have to be more covert as it lacks the resources of the big boys. Which clan did you anger, and how?",
                    "",
                    " You have earned the ire of a minor clan and it is looking for ways to even the score – though it will have to be more covert as it lacks the resources of the big boys. Which clan did you anger, and how?"),
                    () => { });
            case 16:
                return new CareerEventModel(new EventModel(
                    "Run afoul of the DLA. You have been asking the right questions in the wrong places, and revealed a terrorist cell of the DLA working unseen within Imperial society. You were publically commended for your actions, but you have made an enemy of the DLA. How are you going to shake it? Increase your Social Standing by one, but gain an enemy in the DLA.",
                    "",
                    "You have been asking the right questions in the wrong places, and revealed a terrorist cell of the DLA working unseen within Imperial society. You were publically commended for your actions, but you have made an enemy of the DLA. How are you going to shake it? Gain an enemy in the DLA."),
                    () => { StatusHelper.increaseStatus(); });
            case 17:
                return new CareerEventModel(new EventModel(
                    "Only survivor of a crash. Your transport went down and you were the only one to survive, but now you are considered a jinx!",
                    "Ill-Omened",
                    "Your transport went down and you were the only one to survive, but now you are considered a jinx!"),
                    () => { });
            case 18: {
                return new CareerEventModel(new EventModel(
                    "You suspect your boss of heresy. The signs are there if you know where to look, and you are sure he is a Heretic. But he is powerful and connected. What are you going to do? You have a pile of evidence that is priceless to the right people. If you choose to hand it over, the tip is worth twenty assets, but you are Fired and gain your former boss as an enemy.",
                    "",
                    "",
                    [
                        "Keep the evidence",
                        "Hand over the evidence"
                    ],
                    (option) => {
                        if (option.indexOf("Hand over") > -1) {
                            character.careerEvents[character.careerEvents.length - 1].effect = "You suspected your boss of heresy and turned over the evidence to the right people. Your (former) boss is now your enemy.";
                            character.careerEvents[character.careerEvents.length - 1].detailView = "Fired";
                            character.assets += 20;
                        }
                        else {
                            character.careerEvents[character.careerEvents.length - 1].effect = "You suspect your boss of heresy but have chosen to keep the evidence. Why?";
                        }
                    }),
                    () => { });
            }
            case 19:
                return new CareerEventModel(new EventModel(
                    "Shadowed. Someone is following you, but you do not know who or why. Your continual paranoia makes you particularly cautious; you may re-roll one d20 on Observation tests made to determine Surprise at the beginning of combat.",
                    "",
                    "Someone is following you, but you do not know who or why. Your continual paranoia makes you particularly cautious; you may re-roll one d20 on Observation tests made to determine Surprise at the beginning of combat."),
                    () => { });
            case 20:
                return new CareerEventModel(new EventModel(
                    "Blackballed by society. Your actions have been deemed questionable and society has collectively made the decision to give you the cold shoulder. Nothing overt, but restaurant bookings, theatre tickets, and party invitations are lost, cancelled, or simply ignored. How will you clear your name? Reduce your Social Standing by one, but your questionable acts increase your Earnings Rating by one.",
                    "",
                    "Your actions have been deemed questionable and society has collectively made the decision to give you the cold shoulder. Nothing overt, but restaurant bookings, theatre tickets, and party invitations are lost, cancelled, or simply ignored. How will you clear your name?"),
                    () => {
                        StatusHelper.reduceStatus();
                        character.earnings++;
                    });
            case 21:
                return new CareerEventModel(new EventModel(
                    "Inherited an apartment in Fukido. It has great views and is far above what you could afford. Who left it to you and why? Gain a large apartment in an exclusive apartment complex in Fukido.",
                    "",
                    "Inherited an apartment in Fukido. It has great views and is far above what you could afford. Who left it to you and why?"),
                    () => { });
            case 22:
                return new CareerEventModel(new EventModel(
                    "Friend of a Minor Clan. You have earned the gratitude of an entire minor clan. It may not have broad power like the major clans, but it is still connected. What did you do to earn its gratitude?",
                    "",
                    "You have earned the gratitude of an entire minor clan. It may not have broad power like the major clans, but it is still connected. What did you do to earn its gratitude?"),
                    () => { });
            case 23:
                return new CareerEventModel(new EventModel(
                    "Honourable. You have earned a reputation as a person of honour. Your oaths are trusted and your word is respected, a precious commodity in these times. Your social standing is increased by one.",
                    "",
                    "You have earned a reputation as a person of honour. Your oaths are trusted and your word is respected, a precious commodity in these times."),
                    () => { StatusHelper.increaseStatus(); });
            case 24:
                return new CareerEventModel(new EventModel(
                    "Promoted. Your actions have not gone unnoticed and you have been promoted and commended for your performance. Your earnings rating is increased by one.",
                    "",
                    "Your actions have not gone unnoticed and you have been promoted and commended for your performance."),
                    () => { });
            case 25:
                return new CareerEventModel(new EventModel(
                    "Grendel Connection. You have a personal connection to Grendel Armaments that allows you get hold of weaponry normally restricted to people like you. Reduce the Restricton Rating of any Bartholomew & Grendel weapon by one.",
                    "",
                    "You have a personal connection to Grendel Armaments that allows you get hold of weaponry normally restricted to people like you. Reduce the Restricton Rating of any Bartholomew & Grendel weapon by one."),
                    () => { });
            case 26:
                return new CareerEventModel(new EventModel(
                    "ISC Contacts. You have developed contacts within the ISC and have acquired security clearance. What Department are your contacts in? You have an ally in the ISC (GM choses department).",
                    "",
                    "You have developed contacts within the ISC and have acquired security clearance. What Department are your contacts in? You have an ally in the ISC (GM choses department)."),
                    () => { });
            case 27:
                return new CareerEventModel(new EventModel(
                    "Hero of the Hour. It all happened so fast, one moment you were simply riding the transport like everyone else, the next you had defeated a hijacking attempt and subdued the hijacker. Truth is, you cannot remember what happened, but now you are a hero. Your social standing is increased by one, but you have an enemy in the one person who knows what really happened.",
                    "",
                    "It all happened so fast, one moment you were simply riding the transport like everyone else, the next you had defeated a hijacking attempt and subdued the hijacker. Truth is, you cannot remember what happened, but now you are a hero. Your social standing is increased by one, but you have an enemy in the one person who knows what really happened."),
                    () => { });
            case 28: {
                const roll = Math.max(Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1);
                let clans = [];
                for (var i = 0; i < roll; i++) {
                    clans.push(ClansHelper.getClan(ClansHelper.generateClan()).name);
                }

                return new CareerEventModel(new EventModel(
                    `Discretion. Your discretion has saved the reputation of several high ranking nobles, and now you have a book full of nobles who owe you legal or semi-legal favours: ${clans.join(",")}`,
                    "",
                    `Your discretion has saved the reputation of several high ranking nobles, and now you have a book full of nobles who owe you legal or semi-legal favours: ${clans.join(",")}`),
                    () => { });
            }
            case 29: {
                const clan = ClansHelper.getClan(ClansHelper.generateClan()).name;

                return new CareerEventModel(new EventModel(
                    `Friend in Major Clan. You have made a good friend of a minor noble in Clan ${clan}.`,
                    "",
                    `You have made a good friend of a minor noble in Clan ${clan}.`),
                    () => { });
            }
            case 30:
                return new CareerEventModel(new EventModel(
                    "Imperial Propaganda Star. You were chosen as the face of Imperial for a recent campaign and now you are famous, which is great unless you do not want to be constantly recognised! You are famous, and are likely to be noticed in the street. You gain one bonus Momentum on Persuade tests, but increase the difficulty of Stealth tests to disguise yourself.",
                    "",
                    "You are famous, and are likely to be noticed in the street. You gain one bonus Momentum on Persuade tests, but increase the difficulty of Stealth tests to disguise yourself."),
                    () => { });
            case 31:
                return new CareerEventModel(new EventModel(
                    "Part owner of a spaceship. You have a minor stake in the ownership of a ship that lets you use it from time to time. What is it called and where is it berthed? You have access to a Loughton Lancelot which, if available, can be ready within four hours.",
                    "",
                    "You have a minor stake in the ownership of a ship that lets you use it from time to time. What is it called and where is it berthed? You have access to a Loughton Lancelot which, if available, can be ready within four hours."),
                    () => { });
            case 32:
                return new CareerEventModel(new EventModel(
                    "Lucky Find. You lucked upon a rare or unique item that had been lost. What is it? The item is worth 15 assets.",
                    "",
                    "You lucked upon a rare or unique item that had been lost. What is it? The item is worth 15 assets."),
                    () => { });
            case 33:
                return new CareerEventModel(new EventModel(
                    "Inheritor. A relative you never knew you had left everything to you in his will, and now you have inherited a modest fortune. Your earnings rating is increased by one and you gain 5 assets.",
                    "",
                    "A relative you never knew you had left everything to you in his will, and now you have inherited a modest fortune."),
                    () => {
                        character.earnings++;
                        character.assets += 5;
                    });
            case 34: {
                const clan = ClansHelper.getClan(ClansHelper.generateClan()).name;

                return new CareerEventModel(new EventModel(
                    `Imperial Patronage. A noble in Clan ${clan} has taken a personal shine to you, and has become your patron and mentor. Do not disappoint him.`,
                    "",
                    `A noble in Clan ${clan} has taken a personal shine to you, and has become your patron and mentor. Do not disappoint him.`),
                    () => { });
            }
            case 35: {
                let clans = [
                    "Axelthorpe",
                    "Bartholomew",
                    "Brannaghan",
                    "Drougan",
                    "Dunsirn",
                    "Fergan",
                    "Finn",
                    "Kingsfield",
                    "Loughton",
                    "MacGuire",
                    "Morgan",
                    "Murdoch",
                    "Murray",
                    "OLoughton",
                    "Oakenfist",
                    "Paladine",
                    "Smythe",
                ];

                if (character.timeline === Timeline.DarkSymmetry) {
                    clans.push("Gallagher");
                }
                else {
                    clans.push("Fieldhausen");
                }

                return new CareerEventModel(new EventModel(
                    "Political Marriage. You have married well and firmly established yourself as a member of the aristocracy. Which clan did you marry into? Choose a Clan. Your social status will be set to match that Clan's core family. You will also gain an ally in that Clan.",
                    "",
                    "You have married well and firmly established yourself as a member of the aristocracy.",
                    [
                        
                    ],
                    (clan) => {
                        const cln = ClansHelper.getClanByName(clan);
                        character.status = cln.families[0].socialStanding;

                        character.careerEvents[character.careerEvents.length - 1].effect += ` You have married into Clan ${cln.name}, and have an ally in that Clan's core family.`;
                    }),
                    () => { });
            }
            case 36:
                return new CareerEventModel(new EventModel(
                    "Voice of the First Cardinal. You have started hearing the voice of the First Cardinal in your thoughts, guiding and advising you. Several times he has warned you of potential dangers. Why has the spirit of the First Cardinal chosen you? You may spend a Chronicle point to ask the GM a single question about the immediate threats present in a scene. The GM must answer honestly, though he may still be cryptic.",
                    "",
                    "Voice of the First Cardinal. You may spend a Chronicle point to ask the GM a single question about the immediate threats present in a scene. The GM must answer honestly, though he may still be cryptic."),
                    () => { });
            case 37:
                return new CareerEventModel(new EventModel(
                    "Friend of the Blood Berets. You are considered an honorary member of the Blood Berets and have the tattoo to prove it. You can call on their assistance. Gain a high-ranking Blood Beret officer as an ally.",
                    "",
                    "You are considered an honorary member of the Blood Berets and have the tattoo to prove it. You can call on their assistance. Gain a high-ranking Blood Beret officer as an ally."),
                    () => { });
            case 38:
                return new CareerEventModel(new EventModel(
                    "Your own asteroid. Somehow you have acquired your own private asteroid in the Asteroid Belt. Fully equipped with life support, this is an ideal base. You own an estate in the Asteroid Belt, about ten hours' voyage from Victoria.",
                    "",
                    "Somehow you have acquired your own private asteroid in the Asteroid Belt. Fully equipped with life support, this is an ideal base. You own an estate in the Asteroid Belt, about ten hours' voyage from Victoria."),
                    () => { });
            case 39:
                return new CareerEventModel(new EventModel(
                    "Honour of the Clansmen. You single-handedly defeated a Dark Legion attack and were made an honorary Wolfbane (unless already a Wolfbane). You have made a friend of Sean Gallagher. The Wolfbanes will come if you call them, but only once.",
                    "",
                    "You single-handedly defeated a Dark Legion attack and were made an honorary Wolfbane (unless already a Wolfbane). You have made a friend of Sean Gallagher. The Wolfbanes will come if you call them, but only once."),
                    () => { });
            case 40: {
                const enemies = Math.floor(Math.random() * 6) + 2;

                return new CareerEventModel(new EventModel(
                    `Order of the Serene Cross. You have earned the highest medal awarded to Imperial Citizens in recognition of outstanding gallantry and selfless heroism. You are a true hero, and the award comes with the title of Marquis and an estate on Victoria. How did you win it? Increase your Social Standing to 6, increase your Earnings Rating by one, and gain a luxurious estate on Victoria. However, you also gain ${enemies} enemies in other clans, as your status is quickly accompanied by the inevitable envious rivals.`,
                    "",
                    `Order of the Serene Cross. You have earned the highest medal awarded to Imperial Citizens in recognition of outstanding gallantry and selfless heroism. You are a true hero, and the award comes with the title of Marquis and an estate on Victoria. How did you win it? However, you also gain ${enemies} enemies in other clans.`),
                    () => {
                        character.status = 6;
                        character.earnings++;
                    });
            }
        }
    }
}

export const ImperialCareerEvents = new CareerEventsImperial();