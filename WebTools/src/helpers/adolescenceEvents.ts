import { character } from '../common/character';
import { EventModel, AdolescenceEventModel } from '../common/eventModel';
import { Faction, FactionsHelper } from './factions';
import { PrimaryCareer } from './primaryCareers';
import { StatusHelper } from './status';
import { Attribute } from './attributes';
import { Skill } from './skills';
import { TalentsHelper } from './talents';
import { CapitolAdolescenceEvents } from './adolescenceEventsCapitol';
import { CybertronicAdolescenceEvents } from './adolescenceEventsCybertronic';
import { WhitestarAdolescenceEvents } from './adolescenceEventsWhitestar';
import { BauhausAdolescenceEvents } from './adolescenceEventsBauhaus';
import { BrotherhoodAdolescenceEvents } from './adolescenceEventsBrotherhood';
import { ImperialAdolescenceEvents } from './adolescenceEventsImperial';
import { MishimaAdolescenceEvents } from './adolescenceEventsMishima';
import { HereticEventsHelper } from './hereticEvents';
import { Source } from './sources';
import { MutationsHelper } from './mutations';

class AdolescenceEvents {
    generateEvent(pickedResult?: number): AdolescenceEventModel {
        var roll1 = Math.floor(Math.random() * 20) + 1;
        var roll2 = Math.floor(Math.random() * 20) + 1;
        var roll = roll1 + roll2;

        if (pickedResult) {
            roll = pickedResult;
        }

        var ev: AdolescenceEventModel = null;

        if (character.heritage === Faction.Capitol && character.hasSource(Source.Capitol)) {
            ev = CapitolAdolescenceEvents.generateEvent(roll);
        }

        if (character.faction === Faction.Cybertronic && !character.isVAC() && character.hasSource(Source.Cybertronic)) {
            ev = CybertronicAdolescenceEvents.generateEvent(roll);
        }

        if (character.heritage === Faction.Whitestar && character.hasSource(Source.Whitestar)) {
            ev = WhitestarAdolescenceEvents.generateEvent(roll);
        }

        if (character.heritage === Faction.Bauhaus && character.hasSource(Source.Bauhaus)) {
            ev = BauhausAdolescenceEvents.generateEvent(roll);
        }

        if (character.heritage === Faction.Brotherhood && character.hasSource(Source.Brotherhood)) {
            ev = BrotherhoodAdolescenceEvents.generateEvent(roll);
        }

        if (character.heritage === Faction.Imperial && character.hasSource(Source.Imperial)) {
            ev = ImperialAdolescenceEvents.generateEvent(roll);
        }

        if (character.heritage === Faction.Mishima && character.hasSource(Source.Mishima)) {
            ev = MishimaAdolescenceEvents.generateEvent(roll);
        }

        if (ev === null) {
            switch (roll) {
                case 2:
                    ev = new AdolescenceEventModel(new EventModel(
                        "A stranger visited your family and they spoke in hushed tones with a family member - what did they talk about? Your family's surname is infamous amongst Corporate elite, your Social tests amongst them are 1 difficulty greater.",
                        "Shady Past",
                        "Your family's surname is infamous amongst Corporate elite, your Social tests amongst them are 1 difficulty greater."
                    ));
                    break;
                case 3:
                    ev = new AdolescenceEventModel(new EventModel(
                        "Something your family did haunts you wherever you go – what is it? Security guards tend to become alert when they hear your name. Difficulty to avoid attention is 1 higher when your identity is known.",
                        "Infamous",
                        "Difficulty to avoid attention is 1 higher when your identity is known."
                    ));
                    break;
                case 4:
                    ev = new AdolescenceEventModel(new EventModel(
                        "There's something odd you can do, nothing much, just... weird. What is it, why are you afraid of showing people what you can do? What strange little thing can you do – it should not provide any Skill benefit and will make Social Tests one difficulty harder if people see you do it.",
                        "Mutant",
                        "Your mutation does not provide any Skill benefit but will make Social Tests one difficulty harder if people see you do it."
                    ));
                    break;
                case 5:
                    ev = new AdolescenceEventModel(new EventModel(
                        "A stranger came to the house and left a package for you. What is so important about it? How will you know when to open it? You gain an artefact worth 5 Assets that you must never lose and do not know what is inside. Decide when you will know whether to open the package.",
                        "Unwanted Heritage",
                        "You gain an artefact worth 5 Assets that you must never lose and do not know what is inside. Decide when you will know whether to open the package."
                    ));
                    break;
                case 6:
                    ev = new AdolescenceEventModel(new EventModel(
                        "You just don’t know when to say no. Social tests against you receive one bonus Momentum but your openness to adventure has paid off, gain 1 Asset.",
                        "Weak Willed",
                        "Social tests against you receive one bonus Momentum."
                    ));
                    break;
                case 7:
                    var faction = FactionsHelper.generateHeritage();
                    var factonName = FactionsHelper.getFaction(faction).name;

                    ev = new AdolescenceEventModel(new EventModel(
                        `Something has been handed down through the family for generations and your ancestors nearly didn't make it off Earth because of it, what is it, why do you think it's so important, and what must you never do to it? You gain an artefact worth 5 Assets that is coveted by others and unique in some fashion. Gain an enemy from ${name} who is aware of the artefact.`,
                        "Dangerous Possession",
                        `You gain an artefact worth 5 Assets that is coveted by others and unique in some fashion. Gain an enemy from ${name} who is aware of the artefact.`
                    ));
                    break;
                case 8:
                    ev = new AdolescenceEventModel(new EventModel(
                        "You feel every punch. Reduce your serious wounds by 1 and increase your critical wounds by 1.",
                        "Slender Body",
                        "Reduce your serious wounds by 1 and increase your critical wounds by 1. (already included)"
                    ),
                        () => { character.seriousWoundsIncrease--; character.criticalWoundsIncrease++; });
                    break;
                case 9:
                    ev = new AdolescenceEventModel(new EventModel(
                        "You’re a Prodigy. You excelled at a particular skill from a very young age. You could have been a talented musician or a math wiz. Regardless, your talent got a lot of attention in the media and your family profited from it. However the moment passed and now you are bitter that others have done better. Gain 1 level of Status or 5 Assets. Alternatively, gain a contact in media, academia or the entertainment industry. Social Tests with members of the entertainment industry are increased by one difficulty (you’re a failed media star after all).",
                        "Bitter",
                        "Social Tests with members of the entertainment industry are increased by one difficulty (you’re a failed media star after all).",
                        [
                            "Status +1",
                            "Assets +5",
                            "Media contact",
                            "Academia contact",
                            "Entertainment industry contact"
                        ],
                        (option) => {
                            if (option === "Status +1") {
                                StatusHelper.increaseStatus();
                            }
                            else if (option === "Assets +5") {
                                character.assets += 5;
                            }
                            else {
                                character.adolescenceEvent.effect += ` You have gained a ${option}.`;
                            }
                        }
                    ));
                    break;
                case 10:
                    ev = new AdolescenceEventModel(new EventModel(
                        "You're slow to react. Your Mental Strength tests against Mental Assaults are 1 difficulty less (minimum 1) but you always go last (after NPC’s) in Initiative unless you pay 1DS.",
                        "Dimwitted",
                        "Your Mental Strength tests against Mental Assaults are 1 difficulty less (minimum 1) but you always go last (after NPC’s) in Initiative unless you pay 1 DSP."
                    ));
                    break;
                case 11: {
                    var years = Math.floor(Math.random() * 6) + 1;

                    ev = new AdolescenceEventModel(new EventModel(
                        `You got involved with the wrong people and were involved in a serious crime. Spend ${years} years in jail. Gain a Criminal Record.`,
                        "Criminal Record",
                        "You got involved with the wrong people and were involved in a serious crime."
                    ),
                        () => {
                            character.age += years;
                            character.applyCriminalRecord();
                        });
                    break;
                }
                case 12:
                    var assets = Math.floor(Math.random() * 6) + 1;

                    ev = new AdolescenceEventModel(new EventModel(
                        `Tragic Accident – both your parents died in a mysterious accident. You were sent to an orphanage. Reduce Social Status by 1 (minimum 0). Gain ${assets} Assets at age of 20 from estate left for you.`,
                        "Orphan",
                        "Both your parents died in a mysterious accident. You were sent to an orphanage."
                    ),
                        () => {
                            StatusHelper.reduceStatus();
                            character.setAssetsTrigger(assets, 20);
                        });
                    break;
                case 13:
                    ev = new AdolescenceEventModel(new EventModel(
                        "Family Corporation Connections – your family are owed a lot of favours. If you get a ‘Fired’ Result you can ignore it but reduce your Earnings Rating by 1.",
                        "Daddy's Boy/Girl",
                        "Family Corporation Connections – your family are owed a lot of favours."
                    ),
                        () => { character.ignoreFired = true; });
                    break;
                case 14:
                    ev = new AdolescenceEventModel(new EventModel(
                        "At 4am in the morning you were taken from your home, you heard shots and never saw your family again. You have a mysterious benefactor who saved you and you grew up with family friends. Decrease your status by 1, but gain a free re-roll on a Career Event.",
                        "Lost Family",
                        "At 4am in the morning you were taken from your home, you heard shots and never saw your family again. You have a mysterious benefactor who saved you and you grew up with family friends."
                    ),
                        () => {
                            StatusHelper.reduceStatus();
                            character.eventRerolls++;
                        });
                    break;
                case 15:
                    ev = new AdolescenceEventModel(new EventModel(
                        "You messed up, you’re arrested for a minor crime. Spend 1 year in jail before starting your first career. Gain Criminal Record.",
                        "Criminal Record",
                        "In your youth you messed up and were arrested for a minor crime."
                    ),
                        () => {
                            character.age++;
                            character.applyCriminalRecord();
                        });
                    break;
                case 16:
                    ev = new AdolescenceEventModel(new EventModel(
                        "You had a terrible childhood accident. All movement related skill tests are 1 difficulty harder, but you have gained a strong will. All Mental Strength tests are 1 difficulty lower (minimum 1).",
                        "Disabled",
                        "All movement related skill tests are 1 difficulty harder, but you have gained a strong will. All Mental Strength tests are 1 difficulty lower (minimum 1)."
                    ));
                    break;
                case 17:
                    ev = new AdolescenceEventModel(new EventModel(
                        "Influential Godparent – you have a godparent with connections. You may choose any career from table A or generate a career from table B for free.",
                        "Annoying Family",
                        "Influential Godparent – you have a godparent with connections."
                    ),
                        () => { character.freeBasicCareer = true; });
                    break;
                case 18:
                    ev = new AdolescenceEventModel(new EventModel(
                        "Chemical Intolerance - your body is intolerant to chemical substances. All Resistance tests for artificial substances are increased by 1 level of difficulty. Coagulant provides NO bonuses.",
                        "Industrial Hay Fever",
                        "All Resistance tests for artificial substances are increased by 1 level of difficulty. Coagulant provides NO bonuses."
                    ));
                    break;
                case 19:
                    ev = new AdolescenceEventModel(new EventModel(
                        "You have a criminal family. You may freely choose the Criminal Primary Career. You are often a suspect in police enquiries and all social tests with security or police services are at 1 difficulty greater. Gain a favour in another criminal organisation.",
                        "Connected to Criminals",
                        "You are often a suspect in police enquiries and all social tests with security or police services are at 1 difficulty greater. Gain a favour in another criminal organisation."
                    ),
                        () => { character.addFreeCareer(PrimaryCareer.Criminal); });
                    break;
                case 20:
                    ev = new AdolescenceEventModel(new EventModel(
                        "Charismatic – people just love you. You gain 1 free Momentum in Social tests with new contacts but with those in your immediate departments or community (those who know of you) are 1 difficulty greater.",
                        "Big Headed",
                        "You gain 1 free Momentum in Social tests with new contacts but with those in your immediate departments or community (those who know of you) are 1 difficulty greater."
                    ));
                    break;
                case 21:
                    ev = new AdolescenceEventModel(new EventModel(
                        "You'll believe anything. Illusions seldom cause confusion. You either believe them or you don’t. All illusions are +1 difficulty against you but once in place last twice as long.",
                        "Naive",
                        "All illusions are +1 difficulty against you but once in place last twice as long."
                    ));
                    break;
                case 22:
                    ev = new AdolescenceEventModel(new EventModel(
                        "Lucky Stiff! You don’t know how, but sometimes everything just goes right for you, but you have this feeling that one day you’re gonna have to pay back all that good luck. Make a D1 Willpower test whenever you refresh Chronicle Points. If you succeed gain an extra Chronicle Point this session only, and any Momentum converts to Dark Symmetry Points added to the GM’s pool.",
                        "Building up a debt...",
                        "Make a D1 Willpower test whenever you refresh Chronicle Points. If you succeed gain an extra Chronicle Point this session only, and any Momentum converts to Dark Symmetry Points added to the GM’s pool."
                    ));
                    break;
                case 23:
                    var faction = FactionsHelper.generateHeritage();
                    var name = FactionsHelper.getFaction(faction).name;

                    ev = new AdolescenceEventModel(new EventModel(
                        `Your actions revealed a traitor or the plans of another faction. Gain an enemy in ${name}, however you’re promoted as a result, increasing Earnings Rating by 1.`,
                        "Enemy",
                        `Your actions revealed a traitor or the plans of another faction. Gain an enemy in ${name}.`
                    ),
                        () => { character.earnings++; });
                    break;
                case 24:
                    ev = new AdolescenceEventModel(new EventModel(
                        "You developed a terrible way with words. Persuasion tests are 1 difficulty more difficult but when successful gain 1 additional momentum.",
                        "Tactless",
                        "Persuasion tests are 1 difficulty more difficult but when successful gain 1 additional momentum."
                    ));
                    break;
                case 25:
                    ev = new AdolescenceEventModel(new EventModel(
                        "Fanatic – You know way too much about something. Gain 1 momentum on Education tests to know things about your obsessive topic.",
                        "Obsessive",
                        "Gain 1 Momentum on Education tests to know things about your obsessive topic."
                    ));
                    break;
                case 26:
                    ev = new AdolescenceEventModel(new EventModel(
                        "You’re a gifted student and come to the attention of a leading scientist. Gain a conflict within your own Faction as others are jealous of your achievements. You have a great contact in an Educational institution (Favour) and may freely choose the Academic Primary Career.",
                        "Conflict",
                        "Gain a conflict within your own Faction as others are jealous of your achievements. You have a great contact in an Educational institution (Favour)."
                    ),
                        () => {
                            character.addFreeCareer(PrimaryCareer.AcademicResearcher)
                        });
                    break;
                case 27:
                    ev = new AdolescenceEventModel(new EventModel(
                        "Helped solve a serious crime. You have a contact in the Police Department. If you ever gain a Criminal Record, you may reduce your Earnings Rating by 1 to remove it. Social tests with this contact are 1 difficulty less.",
                        "Snitch",
                        "You have a contact in the Police Department. Social tests with this contact are 1 difficulty less."
                    ),
                        () => { character.canRemoveCriminalRecord = true; });
                    break;
                case 28:
                    ev = new AdolescenceEventModel(new EventModel(
                        "Seems like anything can make you angry. DSPs spent to make melee attacks give you 2d20 instead of 1 but increase all social tests by 1 difficulty.",
                        "Violent Temper",
                        "DSPs spent to make melee attacks give you 2d20 instead of 1, but increase all social tests by 1 difficulty."
                    ));
                    break;
                case 29:
                    ev = new AdolescenceEventModel(new EventModel(
                        "You have an answer for everything. DSPs for all Education tests give you 2d20 instead of 1 but increase all social tests by 1 difficulty for a scene.",
                        "Smart Ass",
                        "DSPs for all Education tests give you 2d20 instead of 1, but increase all social tests by 1 difficulty for a scene."
                    ));
                    break;
                case 30:
                    var assets = Math.floor(Math.random() * 6) + 1;

                    ev = new AdolescenceEventModel(new EventModel(
                        `Wealthy Aunt – A relative leaves you money in their will. Gain ${assets} Assets at age of 20 as long as you don't get a criminal record before then.`,
                        "Annoying Family",
                        "Wealthy Aunt – A relative leaves you money in their will."
                    ),
                        () => { character.setAssetsTrigger(assets, 20); });
                    break;
                case 31:
                    ev = new AdolescenceEventModel(new EventModel(
                        "You spent a lot of time with the wrong people, either due to a rebellious streak or circumstances at home. Or, you could simply not have had a lot of options. Your friends taught you how to survive on the street, how to steal, beg, rob or other 'useful life lessons'. You may or may not have cut your ties with your old associates, but they surely remember you. Even if they don't, the law certainly does. You are comfortable around low-lifes and know how to communicate with them. Gain a free momentum on successful Social tests with criminals, gang members or people in Social Status 0 or 1. Alternatively, gain a criminal contact.",
                        "Bad Company",
                        "You are comfortable around low-lifes and know how to communicate with them.",
                        [
                            "Gain a free Momentum on successful Social tests with people of Social Status 0 or 1",
                            "Gain a Criminal contact"
                        ],
                        (option) => {
                            character.adolescenceEvent.effect += ` ${option}.`;
                        }
                    ));
                    break;
                case 32:
                    ev = new AdolescenceEventModel(new EventModel(
                        "Born with a spanner in your hand – you have a way with equipment. You gain 1 free Momentum when making tests to understand or fix a piece of equipment.",
                        "Geek",
                        "You gain 1 free Momentum when making tests to understand or fix a piece of equipment."
                    ));
                    break;
                case 33:
                    ev = new AdolescenceEventModel(new EventModel(
                        "There’s something you can’t get enough off, what is it? You’ll take risks to satisfy your craving. Availability tests for procuring your addiction are D1.",
                        "Addict",
                        "Availability tests for procuring your addiction are D1."
                    ));
                    break;
                case 34:
                    ev = new AdolescenceEventModel(new EventModel(
                        "Extraordinary Chemical Tolerance – your body is very resistant to artificial substances. All Resistance tests for artificial substances are reduced by 1 level of difficulty.",
                        "Nothing Helps the Pain",
                        "All Resistance tests for artificial substances are reduced by 1 level of difficulty."
                    ));
                    break;
                case 35:
                    ev = new AdolescenceEventModel(new EventModel(
                        "Anatomical sixth sense – somehow you hit people where it hurts the most. +1 [DS] close combat damage.",
                        "Merciless",
                        "Anatomical sixth sense – somehow you hit people where it hurts the most. +1 [DS] close combat damage."
                    ),
                        () => { character.meleeIncrease++; });
                    break;
                case 36:
                    ev = new AdolescenceEventModel(new EventModel(
                        "You stood up to the muggers as a kid, have done it many times over, and have the scars to show it. All fear inducing effects are at +1 difficulty when they target you.",
                        "Reckless",
                        "All fear inducing effects are at +1 difficulty when they target you."
                    ));
                    break;
                case 37:
                    ev = new AdolescenceEventModel(new EventModel(
                        "Your family cleared its name, regained long lost social status or wealth that was yours by rights. Increase social status and earnings rating by 1 level OR gain 2 Assets.",
                        "Unsympathetic to the Poor",
                        "Your family cleared its name, regained long lost social status or wealth that was yours by rights.",
                        [
                            "Status +1",
                            "Assets +2"
                        ],
                        (option) => {
                            if (option === "Status +1") {
                                StatusHelper.increaseStatus();
                            }
                            else {
                                character.assets += 2;
                            }
                        }
                    ));
                    break;
                case 38: {
                    var t = [];

                    if (character.hasSource(Source.Mutants)) {
                        t.push(...MutationsHelper.generateLesserPower().map(p => { return MutationsHelper.getMutation(p).name; }));
                    }
                    else {
                        t.push(...TalentsHelper.getTopTalents());
                    }

                    ev = new AdolescenceEventModel(new EventModel(
                        "There's something quite cool you can do, it got you in trouble a few times before you learned to hide it. What is it? Why did your parents tell you never to tell anyone about it? You try not to use it much as you get killer headaches afterwards. You can pay a Chronicle Point to use this ability however you take a D2 Mental Assault afterwards, from the pain it causes. Describe how your mutant heritage allows you to do this.",
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
                    break;
                case 39:
                    ev = new AdolescenceEventModel(new EventModel(
                        "A life in the colonies can be hard, and you had the worst of it where you came from. The punishing life or training has given you a strong body. Take your wounds from the next row in the wounds table.",
                        "Unsympathetic to the Weak",
                        "The punishing life or training has given you a strong body. Take your wounds from the next row in the wounds table."
                    ),
                        () => { character.woundsBonus++; });
                    break;
                case 40: {
                    var t = [];

                    if (character.hasSource(Source.Mutants)) {
                        t.push(...MutationsHelper.generateLesserPower().map(p => { return MutationsHelper.getMutation(p).name; }));
                    }
                    else {
                        t.push(...TalentsHelper.getTopTalents());
                    }

                    ev = new AdolescenceEventModel(new EventModel(
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
                    break;
                }
            }
        }

        if (character.isHeretic() && character.hasSource(Source.DarkSoul)) {
            if (roll1 % 2 && roll2 % 2) {
                ev.hereticEvent = HereticEventsHelper.generateNegativeEvent();
            }
            else if (!(roll1 % 2) && !(roll2 % 2)) {
                ev.hereticEvent = HereticEventsHelper.generatePositiveEvent();
            }
        }

        return ev;
    }
}

export const AdolescenceEventsHelper = new AdolescenceEvents();