import {CareerEventModel, EventModel} from '../common/eventModel';
import {character} from '../common/character';
import {FactionsHelper} from './factions';
import {ApostleHelper, Apostle} from './apostles';
import {SkillsHelper} from './skills';
import {DarkGiftHelper} from './darkGifts';
import {HereticHelper, HereticRank} from './hereticRanks';
import {PrimaryCareer} from './primaryCareers';

class HereticEvents {
    generatePositiveEvent(): CareerEventModel {
        const roll = Math.floor(Math.random() * 20) + 1;
        switch (roll) {
            case 1: {
                var options = [];
                if (character.degeneration > 0) {
                    options.push("Reverse Degeneration");
                }

                if (character.stigmata.length > 0) {
                    character.stigmata.forEach(s => {
                        options.push(`Remove Stigmata: ${s}.`);
                    });
                }

                if (options.length === 0) {
                    options = null;
                }

                return new CareerEventModel(new EventModel(
                    "Stigmata/Degeneration Removal: Due to a boon owed, you can have one Stigmata removed, or reverse the first stage of degeneration. This event can be saved and used at any point during character creation, or even used ingame. Once it is used, it is gone.",
                    "",
                    "You are entitled to the removal of one Stigmata or reversal of the first stage of Degeneration.",
                    options,
                    (option) => {
                        if (option.indexOf("Degeneration") > -1) {
                            character.degeneration = Math.max(0, character.degeneration - 1);
                        }
                        else {
                            character.stigmata.splice(character.stigmata.indexOf(option.substr(option.indexOf(":") + 1)), 1);
                        }
                    }
                ));
            }
            case 2:
                return new CareerEventModel(new EventModel(
                    "Employment Program: The Cult has contacts in many businesses and fields of employment. Whenever you roll to determine a Primary Career, you may choose a result in Table A or Table B without paying any Life Points.",
                    "",
                    "Your Cult provided assistance to get you employed."
                ),
                () => { character.freeBasicCareer = true; });
            case 3:
                return new CareerEventModel(new EventModel(
                    "Good References: The Cult can provide solid references for all of its members, allowing them to go far in employment. Increase your Earnings rating by one.",
                    "",
                    "Your Cult provided solid references for you, allowing you to go further in your employment."
                ),
                () => { character.earnings++; });
            case 4: {
                const faction = FactionsHelper.generateHeritage();
                let factionName = "";
                if (faction === character.heritage) {
                    factionName = "the Cartel";
                }
                else {
                    factionName = FactionsHelper.getFaction(faction).name;
                }

                return new CareerEventModel(new EventModel(
                    `Corporate Contact: You have a contact in ${factionName}, giving you easier access to information, facilities and events specific to that corporation.`,
                    "",
                    `You have a contact in ${factionName}, giving you easier access to information, facilities and events specific to that corporation.`
                ));
            }
            case 5: {
                const skills = ApostleHelper.getBonusSkills(character.patron);
                let skillNames = [];

                skills.forEach(s => {
                    skillNames.push(SkillsHelper.getSkillName(s));
                });

                return new CareerEventModel(new EventModel(
                    `Specialist Training: You may re-roll 1d20 on any skill test made using the following skills: ${skillNames.join(",")}.`,
                    "",
                    `You may re-roll 1d20 on any skill test made using the following skills: ${skillNames.join(",")}.`
                ));
            }
            case 6:
                return new CareerEventModel(new EventModel(
                    "Protected: You are deemed important enough to be given extra protection to keep you from the Inquisition. This will automatically improve your chances of evading Discovery.",
                    "",
                    "You are deemed important enough to be given extra protection to keep you from the Inquisition."
                ),
                () => { character.protectedHeretic = true; });
            case 7:
                return new CareerEventModel(new EventModel(
                    "Loyal Servant: You are considered a worthy addition to the cult and given an extra Dark Gift of your choice from the Pattern of your Patron Apostle.",
                    "",
                    "You are considered a worthy addition to the cult."
                ),
                () => { character.numDarkGifts++; });
            case 8:
            case 16: {
                const boon = DarkGiftHelper.generateBoon();

                return new CareerEventModel(new EventModel(
                    `Endowment: You are granted a single boon from your Patron Apostle: ${boon}.`,
                    "",
                    `You were granted a single boon from your Patron Apostle: ${boon}.`
                ),
                ()=> {
                    if (boon.indexOf("Weave") === -1) {
                        character.addEquipment(boon);
                    }
                });
            }
            case 9:
                return new CareerEventModel(new EventModel(
                    "Strong Mind: Your will is harder to break than most. You gain two additional Mental Wounds.",
                    "",
                    "Your will is harder to break than most."
                ),
                () => { character.mentalWoundsIncrease += 2; });
            case 10:
                return new CareerEventModel(new EventModel(
                    "Contact Within Another Cult: During a mission, you have made the acquaintance of a high-ranking Heretic within a cult devoted to another Apostle. They will exchange information with you, though this information may not always be reliable or advantageous. In return, they expect similar treatment, and they may not take kindly to being lied to or misled.",
                    "",
                    "During a mission, you have made the acquaintance of a high-ranking Heretic within a cult devoted to another Apostle. They will exchange information with you, though this information may not always be reliable or advantageous. In return, they expect similar treatment, and they may not take kindly to being lied to or misled."
                ));
            case 11:
                return new CareerEventModel(new EventModel(
                    "Inheritance: You have inherited money, property, or something else valuable. You gain ten Assets.",
                    "",
                    "You inherited money, property, or something else of value."
                ),
                () => { character.assets += 10; });
            case 12:
                return new CareerEventModel(new EventModel(
                    "Chosen: The Heretic's activities have been recognised, and he is being promoted as a result. Increase the Heretic's Rank by one.",
                    "",
                    "You were promoted as a result of your benefitial activities."
                ),
                () => {
                    HereticHelper.increaseRank();
                });
            case 13:
                return new CareerEventModel(new EventModel(
                    "Favoured by the Cult: As a reward for your services, you are given an extra Dark Gift of your choice, from the Dark Symmetry or from the Pattern of your Patron Apostle.",
                    "",
                    "As a reward for your services you were granted an extra Dark Gift."
                ),
                () => { character.numDarkGifts++; });
            case 14:
                return new CareerEventModel(new EventModel(
                    "Extortion: You have found a way of blackmailing your employer. Whenever you roll a Career Event, any result that would cause you to be fired would be re-rolled automatically.",
                    "",
                    "You have found a way of blackmailing your employer."
                ));
            case 15:
                return new CareerEventModel(new EventModel(
                    "Secretive Cult: Your cultist brothers and sisters are very careful and meticulous when it comes to staying hidden. As a result, you have learned a great deal about ciphers, anagrams, and hidden messages. You reduce the difficulty of any Linguistics test made to create or decipher a code or hidden message by two steps, which may remove the need for a test.",
                    "",
                    "You reduce the difficulty of any Linguistics test made to create or decipher a code or hidden message by two steps."
                ));
            case 17:
                return new CareerEventModel(new EventModel(
                    "A Step Towards Transfiguration: The Heretic, whether because of some prophecy, or because of the promise he has shown, has been granted a single step towards Transfiguration.",
                    "",
                    "You were granted a single step towards Transfiguration due to your performance with the Cult."
                ),
                () => { character.transfiguration++; });
            case 18:
                return new CareerEventModel(new EventModel(
                    "Police Department Contact: You have a contact within the PD in your city. You are tipped off about upcoming raids, and have the inside track when it comes to investigations. Also, you will never have a police record, as your contact sees to it that all transgressions stricken from the record. However, if you are Discovered, your contact will be dragged into the interrogation cells of the Inquisition and probably become a liability, unable to ever help you again.",
                    "",
                    "You have a contact within the PD in your city. You are tipped off about upcoming raids, and have the inside track when it comes to investigations. Also, you will never have a police record, as your contact sees to it that all transgressions stricken from the record."
                ),
                () => { character.canRemoveCriminalRecord = true; });
            case 19:
                return new CareerEventModel(new EventModel(
                    "Backup Identity: If you are ever Discovered, or need to disappear for another reason, you have been given a backup identity. You will undergo subtle but significant plastic surgery, your fingerprints will be changed with the aid of the Dark Symmetry, and you are relocated to a new life, which includes a back-story, new home, and job.",
                    "",
                    "If you are ever Discovered, or need to disappear for another reason, you have been given a backup identity."
                ));
            case 20:
                return new CareerEventModel(new EventModel(
                    "Groomed For Transfiguration: The Heretic is promising and great things are believed to be in his future. He is given two steps towards Transfiguration.",
                    "",
                    "You were granted two steps towards Transfiguration due to your outstanding performance with the Cult."
                ),
                () => { character.transfiguration += 2; });
        }
    }

    generateNegativeEvent(): CareerEventModel {
        const roll = Math.floor(Math.random() * 20) + 1;
        switch (roll) {
            case 1: {
                return new CareerEventModel(new EventModel(
                    `Discovered: Your nature as a Heretic has been discovered and reported to the Inquisition. Your former cell is in all likelihood destroyed, and your only choice is to run, as the Brotherhood will pursue you relentlessly.`,
                    "",
                    `Your nature as a Heretic has been discovered and reported to the Inquisition. Your former cell is in all likelihood destroyed, and your only choice is to run, as the Brotherhood will pursue you relentlessly.`
                ));
            }
            case 2:
                return new CareerEventModel(new EventModel(
                    "Spontaneous Degeneration: Due to the corruption of the Dark Symmetry, your body has become twisted, and you suffer the next stage of Degeneration.",
                    "",
                    "Due to the corruption of the Dark Symmetry, your body has become twisted. You suffer from Degeneration."
                ),
                () => { character.degeneration++; });
            case 3:
            case 6: {
                const stigmata = DarkGiftHelper.generateStigmata();

                return new CareerEventModel(new EventModel(
                    `Spontaneous Stigmata: Due to the corruption of the Dark Symmetry, your body has become twisted. ${stigmata}`,
                    "",
                    `Due to the corruption of the Dark Symmetry, your body has become twisted. ${stigmata}`
                ),
                () => { character.addStigmata(stigmata); });
            }
            case 4: {
                return new CareerEventModel(new EventModel(
                    "Abnormal Body: It is unclear whether it is due to pollutants in the environment, or your exposure to Endowments and the Dark Symmetry, but your body has become twisted, making you stand out. This may take many shapes and forms, such as a severely twisted spine, hideously disfigured face, or vile odour. Whatever the deformity, it does not mark you as a Heretic, but people will often react negatively to it. Discuss the exact details with the GM. The deformity does not affect your body to a degree that your physical actions are affected.",
                    "",
                    "It is unclear whether it is due to pollutants in the environment, or your exposure to Endowments and the Dark Symmetry, but your body has become twisted, making you stand out."
                ));
            }
            case 5: {
                return new CareerEventModel(new EventModel(
                    "Hubris: You have become dangerously proud of being part of your cult. You have developed a hubris that makes you somewhat reckless. This makes you more likely to be Discovered.",
                    "",
                    "You have become dangerously proud of being part of your cult. You have developed a hubris that makes you somewhat reckless. This makes you more likely to be Discovered."
                ),
                () => { character.discoveryPenalty++; });
            }
            case 7:
                return new CareerEventModel(new EventModel(
                    "Arrogant: Your personality leaves much to be desired at this point. You have even managed to irritate your fellow cultists. This makes it harder for you to get hired or reemployed during character creation. When you attempt to enter a new Primary Career, you must pay one more Life Point than normal unless the career is one of your free picks. When you attempt to enter an Iconic Career, the difficulty increases by one.",
                    "",
                    "Your personality leaves much to be desired at this point. You have even managed to irritate your fellow cultists."
                ),
                () => { character.increaseCareerCost = true; });
            case 8: {
                let effect = "";
                switch (character.patron) {
                    case Apostle.Ilian:
                        effect = "You have become cold and distant, viewing yourself as superior to those around you. This drives you to regard your plans and acts as better than those of 'lesser men'. Your superiority complex increases the Repercussion range of all Command and Persuade tests by two.";
                        break;
                    case Apostle.Algeroth:
                        effect = "You have become quick-tempered, and quickly resort to violence. You must attempt a D1 Willpower test when frustrated, slighted or otherwise impeded by another. Failing this test means that you feel compelled to kill the offending person... though perhaps not immediately.";
                        break;
                    case Apostle.Demnogonis:
                        effect = "You have become obsessed with the lives of vermin, cultivating colonies of insects and rodents as 'pets', keeping them near even when inappropriate. You increase the difficulty of Persuade tests when dealing with non-cultists who notice or learn of your pet infestation.";
                        break;
                    case Apostle.Semai:
                        effect = "You have become petty and jealous, feeling only hate towards the success of others, and joy at their failures. Whenever an ally generates three or more Momentum on a test, you suffer one Dread. Whenever an ally suffers a Repercussion, you recover one Dread.";
                        break;
                    case Apostle.Muawijhe:
                        effect = "You are erratic and unpredictable, ranging from mania to depression at a moment's notice. At the start of a scene, roll 1[DS]. If a DSI is rolled, your mood shifts, becoming depressed. This removes one Chronicle Point and makes you unable to bank Group Momentum. This lasts until you roll another DSI, at which point you become manic, regaining one Chronicle Point and the ability to bank Momentum.";
                        break;
                }

                return new CareerEventModel(new EventModel(
                    `Blessed Psychopathy: Continual exposure to the malign power of the Dark Symmetry and the doctrines of the Dark Apostles has warped your perspective. ${effect}`,
                    "",
                    `${effect}`
                ));
            }
            case 9:
                return new CareerEventModel(new EventModel(
                    "Powerful Fanatical Enemy: For some reason, one of the high ranking cultists in your temple has got it in for you – you gain this fellow cultist as a Rival. He will do everything he can to thwart your plans, block your promotions, and make your life as miserable as possible. You should be prepared to be sent out on the most dangerous missions.",
                    "",
                    "For some reason, one of the high ranking cultists in your temple has got it in for you – you gain this fellow cultist as a Rival."
                ));
            case 10:
                return new CareerEventModel(new EventModel(
                    "The Black Hunger: You’ve started to hunger for human flesh. At first, this is a minor craving, requiring only a few grams of flesh each month. Flesh from someone you’ve hunted personally is more satisfying, but you can make do with human flesh from any source (other than yourself – autocannibalism won’t sate the Black Hunger). Failing to sate this craving causes one Dread.",
                    "",
                    "During a mission, you have made the acquaintance of a high-ranking Heretic within a cult devoted to another Apostle. They will exchange information with you, though this information may not always be reliable or advantageous. In return, they expect similar treatment, and they may not take kindly to being lied to or misled."
                ));
            case 11:
                return new CareerEventModel(new EventModel(
                    "Punishment: You have made a very big mistake, and failed your cultist brothers and sisters. In a way, you are lucky as your life is spared, but you are taken to the Inner Sanctum and one of your Dark Gifts is stripped from you (chosen by the GM).",
                    "",
                    "You have made a very big mistake, and failed your cultist brothers and sisters. In a way, you are lucky as your life is spared, but you are taken to the Inner Sanctum and one of your Dark Gifts is stripped from you (chosen by the GM)."
                ));
            case 12:
                return new CareerEventModel(new EventModel(
                    "Interrogated: The Brotherhood suspected you of heresy and interrogated you for days. You withstood their attempts and managed to hide your true nature, and now they have let you go, believing that they made a mistake. However, the experience scarred you mentally. Increase the difficulty of all Willpower tests caused by the Brotherhood by one step.",
                    "",
                    "The Brotherhood suspected you of heresy and interrogated you for days. You withstood their attempts and managed to hide your true nature, and now they have let you go, believing that they made a mistake. However, the experience scarred you mentally. Increase the difficulty of all Willpower tests caused by the Brotherhood by one step."
                ));
            case 13:
                return new CareerEventModel(new EventModel(
                    "Drained Assets: For one reason or another, you have managed to get into some real financial trouble. You gain a debt of ten Assets, and a single Enemy – the person you owe. Once this debt is paid off, you no longer have the Enemy.",
                    "",
                    "For one reason or another, you have managed to get into some real financial trouble. You gain a debt of ten Assets, and a single Enemy – the person you owe. Once this debt is paid off, you no longer have the Enemy."
                ));
            case 14:
                return new CareerEventModel(new EventModel(
                    "Criminal Record: Though you haven’t been discovered as a Heretic, your activities have caused you to gain a Criminal Record. This might be deliberate – one step in a larger plan – or accidental, but either way, you’re now marked as a criminal and known to the authorities.",
                    "",
                    "Though you haven’t been discovered as a Heretic, your activities have caused you to gain a Criminal Record. This might be deliberate – one step in a larger plan – or accidental, but either way, you’re now marked as a criminal and known to the authorities."
                ),
                () => {
                    character.hasCriminalRecord = true;
                    character.applyCriminalRecord();
                });
            case 15:
                return new CareerEventModel(new EventModel(
                    "Fired: Due to some indiscretion related to your heretical activities, you have been fired from your current job, and have to apply for a new one.",
                    "",
                    "Due to some indiscretion related to your heretical activities, you were fired from your job, and had to apply for a new one.",
                    [],
                    () => {},
                    "Fired"
                ));
            case 16:
                return new CareerEventModel(new EventModel(
                    "Serious Illness: You contracted a serious illness. After being bedridden for weeks, you managed to overcome it. However, the illness left its mark upon you, leaving you somewhat frail. Reduce your total number of Serious Wounds and Critical Wounds by one each.",
                    "",
                    "You contracted a serious illness. After being bedridden for weeks, you managed to overcome it. However, the illness left its mark upon you, leaving you somewhat frail. Reduce your total number of Serious Wounds and Critical Wounds by one each."
                ),
                () => { 
                    character.seriousWoundsIncrease--;
                    character.criticalWoundsIncrease--; 
                });
            case 17:
                return new CareerEventModel(new EventModel(
                    "Innate Hostility: Due to being subjected to constant and prolonged hostility, perhaps at work, in a relationship, or even in your upbringing, your demeanour tends to be quite defensive and hard. You increase the Repercussion range of all Persuade tests you attempt by two, due to your harsh demeanour.",
                    "",
                    "Due to being subjected to constant and prolonged hostility, perhaps at work, in a relationship, or even in your upbringing, your demeanour tends to be quite defensive and hard. You increase the Repercussion range of all Persuade tests you attempt by two, due to your harsh demeanour."
                ));
            case 18:
                return new CareerEventModel(new EventModel(
                    "Being Extorted: You might have borrowed money from them, or they might have found out something about you, but whatever the circumstances, you find yourself being extorted by a very powerful criminal organisation. Members of this organisation often ask you to perform a variety of favours that put you in danger. They will not go away until dealt with.",
                    "",
                    "You might have borrowed money from them, or they might have found out something about you, but whatever the circumstances, you find yourself being extorted by a very powerful criminal organisation. Members of this organisation often ask you to perform a variety of favours that put you in danger. They will not go away until dealt with."
                ));
            case 19: {
                let effect = "";
                if (character.hereticRank === HereticRank.Acolyte) {
                    effect = "You must spend the next career phase as a Sacristan.";
                }

                return new CareerEventModel(new EventModel(
                    `Failure: Due to a failure, you have your Heretic Rank reduced by one. ${effect}`,
                    "",
                    "Due to failure, your Cult demoted you."
                ),
                () => {
                    if (character.hereticRank === HereticRank.Acolyte) {
                        character.enforcedCareer = PrimaryCareer.Sacristan;
                    }
                    else {
                        HereticHelper.decreaseRank();
                    }
                });
            }
            case 20:
                return new CareerEventModel(new EventModel(
                    "Horrid Nightmares: For some reason, you suffer from terrible nightmares. Some nights you do not even manage to sleep more than a few sweat-soaked hours. When you wake up after one of these night, you feel fatigued and wrung out, and it affects your performance negatively. Every time you sleep, roll 1[DS]. If you roll a DSI, then your sleep is disturbed by night terrors, and you do not gain the benefits of natural rest that night.",
                    "",
                    "Every time you sleep, roll 1[DS]. If you roll a DSI, then your sleep is disturbed by night terrors, and you do not gain the benefits of natural rest that night."
                ));
        }
    }
}

export const HereticEventsHelper = new HereticEvents();