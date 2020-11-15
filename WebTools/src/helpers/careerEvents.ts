import {character} from '../common/character';
import {EventModel, CareerEventModel} from '../common/eventModel';
import {Faction, FactionsHelper} from './factions';
import {PrimaryCareer} from'./primaryCareers';
import {Status, StatusHelper} from './status';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {TalentsHelper} from './talents';
import {DiceRoller} from './diceRoller';
import {CapitolCareerEvents} from './careerEventsCapitol';
import {CybertronicCareerEvents} from './careerEventsCybertronic';
import {WhitestarCareerEvents} from './careerEventsWhitestar';
import {BauhausCareerEvents} from './careerEventsBauhaus';
import {ImperialCareerEvents} from './careerEventsImperial';
import {HereticEventsHelper} from './hereticEvents';
import {Source} from './sources';

export class CareerEvents {
    generateEvent(pickedResult?: number): CareerEventModel {
        var roll1 = Math.floor(Math.random() * 20) + 1;
        var roll2 = Math.floor(Math.random() * 20) + 1;
        var roll = roll1 + roll2;

        if (pickedResult) {
            roll = pickedResult;
        }

        let ev: CareerEventModel = null;

        if (character.faction === Faction.Capitol && character.hasSource(Source.Capitol)) {
            ev = CapitolCareerEvents.generateEvent(roll);
        }
        else if (character.faction === Faction.Cybertronic && character.hasSource(Source.Cybertronic)) {
            ev = CybertronicCareerEvents.generateEvent(roll);
        }
        else if (character.faction === Faction.Whitestar && character.hasSource(Source.Whitestar)) {
            ev = WhitestarCareerEvents.generateEvent(roll);
        }
        else if (character.faction === Faction.Bauhaus && character.hasSource(Source.Bauhaus)) {
            ev = BauhausCareerEvents.generateEvent(roll);
        }
        else if (character.faction === Faction.Imperial && character.hasSource(Source.Imperial)) {
            ev = ImperialCareerEvents.generateEvent(roll);
        }

        switch (roll) {
            case 2:
                ev = new CareerEventModel(new EventModel(
                    "You contract a wasting disease, the treatment will cost 50 Assets and until then you count as having wounds equal to one level lower on the Wounds Table.",
                    "Disabling Disease",
                    "You contract a wasting disease, the treatment will cost 50 Assets and until then you count as having wounds equal to one level lower on the Wounds Table."
                ),
                    () => { character.woundsBonus--; });
                break;
            case 3:
                ev = new CareerEventModel(new EventModel(
                    "The Brotherhood (or Authorities) and the Dark Legion are both hunting you - what do you know, or what have you got that they want? Gain an enemy in a Heretic Cult and the Brotherhood (or Authorities).",
                    "",
                    "The Brotherhood (or Authorities) and the Dark Legion are both hunting you - what do you know, or what have you got that they want? Gain an enemy in a Heretic Cult and the Brotherhood (or Authorities)"
                ));
                break;
            case 4:
                ev = new CareerEventModel(new EventModel(
                    "You're on the run, who's after you, and why? Gain an enemy in a Heretic Cult, or the Brotherhood, or a Corporate Authority.",
                    "",
                    "You're on the run, who's after you, and why? Gain an enemy in a Heretic Cult, or the Brotherhood, or a Corporate Authority."
                ));
                break;
            case 5:
                ev = new CareerEventModel(new EventModel(
                    "Powerful enemy - somehow you managed to get yourself a deadly enemy who is also quite powerful, they might be a district authority, well connected ex lover or a jealous collegue. Who are they and what is their connection to you? Why are they an enemy? Until you resolve this, treat this as a Conflict and Trait.",
                    "Powerful Enemy",
                    "Somehow you managed to get yourself a deadly enemy who is also quite powerful, they might be a district authority, well connected ex lover or a jealous collegue. Who are they and what is their connection to you? Why are they an enemy?"
                ));
                break;
            case 6:
                ev = new CareerEventModel(new EventModel(
                    "An old debt has caught up with you. Who is it and what will happen if you don't pay? Gain a Conflict with an organisation. You have a 20 Asset debt that must be paid off with that organisation. Once it is paid the Conflict is removed. This debt does not prevent you from using earnings to make purchases.",
                    "",
                    "An old debt has caught up with you. Who is it and what will happen if you don't pay? Gain a Conflict with an organisation. You have a 20 Asset debt that must be paid off with that organisation. Once it is paid the Conflict is removed. This debt does not prevent you from using earnings to make purchases."
                ));
                break;
            case 7: {
                var years = Math.floor(Math.random() * 6) + 1;

                var options = character.canRemoveCriminalRecord
                    ? ["Ignore Criminal Record (-1 Earnings)", "Accept Criminal Record"]
                    : [];

                ev = new CareerEventModel(new EventModel(
                    `Involved in a serious crime - guilty or not you're sentenced to hard labour and lose your job. Add ${years} years to age. You're Fired and may not continue this career. Gain a Criminal Record.`,
                    "",
                    "Involved in a serious crime - guilty or not you were sentenced to hard labour and lost your job.",
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
                    "FiredEvent"
                ),
                    () => {
                        character.age += years;
                    });
                break;
            }
            case 8:
                ev = new CareerEventModel(new EventModel(
                    "You have a rival within your faction with which you have a Conflict.",
                    "",
                    "You have a rival within your faction with which you have a Conflict."
                ));
                break;
            case 9:
                var faction = FactionsHelper.getFaction(FactionsHelper.generateHeritage()).name;

                ev = new CareerEventModel(new EventModel(
                    "Wealthy ex-lover. It didn't end well and it's your fault! They'll stop at nothing to make your life a misery. You have an enemy in " + faction + ". It will be a very challenging task to make things up to them but it could be a side story for your character.",
                    "",
                    "Wealthy ex-lover. It didn't end well and it's your fault! They'll stop at nothing to make your life a misery. You have an enemy in " + faction + ". It will be a very challenging task to make things up to them."
                ));
                break;
            case 10:
                var faction = FactionsHelper.getFaction(FactionsHelper.generateHeritage()).name;

                ev = new CareerEventModel(new EventModel(
                    "You were called in for questioning by the authorities, what did they want to know? They let you go, but on what condition? Gain a Debt to " + faction + " or the Brotherhood.",
                    "",
                    "You were called in for questioning by the authorities, what did they want to know? They let you go, but on what condition? Gain a Debt to ",
                    [
                        faction,
                        "The Brotherhood"
                    ],
                    (option) => {
                        character.careerEvents[character.careerEvents.length - 1].effect += option;
                    }
                ));
                break;
            case 11: {
                var options = character.canRemoveCriminalRecord
                    ? ["Ignore Criminal Record (-1 Earnings)", "Accept Criminal Record"]
                    : [];

                ev = new CareerEventModel(new EventModel(
                    "Criminal Record - your name is mentioned in connection with a criminal act, recorded with police and security databases, and you lose your job. You're Fired and may not continue this career. Gain a Criminal Record.",
                    "",
                    "Criminal Record - your name is mentioned in connection with a criminal act, recorded with police and security databases, and you lose your job.",
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
                    "FiredEvent"
                ));
                break;
            }
            case 12:
                var loc = DiceRoller.rollHitLocation();

                ev = new CareerEventModel(new EventModel(
                    "Shooting Accident. Your " + loc + " has a gunshot wound that hasn't healed well.",
                    "Old War Wound",
                    "Shooting Accident. Your " + loc + " has a gunshot wound that hasn't healed well."
                ));
                break;
            case 13:
                ev = new CareerEventModel(new EventModel(
                    "Someone has been keeping an eye on you, they always seem to be there when you look around, what do you think they're interested in? Who are they?",
                    "Under Surveillance",
                    "Someone has been keeping an eye on you, they always seem to be there when you look around, what do you think they're interested in? Who are they?"
                ));
                break;
            case 14:
                ev = new CareerEventModel(new EventModel(
                    "You were involved in a Heretic (or Criminal) plot and suffered at the hands of the Inquisition (or Authorities) for your crime. What did they do to you and what one thing will you remember for the rest of your life?",
                    "Nightmares",
                    "You were involved in a Heretic (or Criminal) plot and suffered at the hands of the Inquisition (or Authorities) for your crime. What did they do to you and what one thing will you remember for the rest of your life?"
                ));
                break;
            case 15:
                ev = new CareerEventModel(new EventModel(
                    "They're on to you! Who are they and what have you done?",
                    "Paranoia",
                    "They're on to you! Who are they and what have you done?"
                ));
                break;
            case 16:
                ev = new CareerEventModel(new EventModel(
                    "Someone you know is a Heretic (or Criminal) but you can't turn him or her in - what hold do they have over you?",
                    "Blackmailed",
                    "Someone you know is a Heretic (or Criminal) but you can't turn him or her in - what hold do they have over you?"
                ));
                break;
            case 17:
                ev = new CareerEventModel(new EventModel(
                    "Whatever you did it was bad, and you've paid for it, but they won't give up.",
                    "I am your nemesis",
                    "Whatever you did it was bad, and you've paid for it, but they won't give up."
                ));
                break;
            case 18:
                ev = new CareerEventModel(new EventModel(
                    "Marooned in space - you were one of the only survivors when a ship you were travelling on broke down and crashed, and rescue was a long time coming. Add 1 year to your age.",
                    "Space Sickness",
                    "Marooned in space - you were one of the only survivors when a ship you were travelling on broke down and crashed, and rescue was a long time coming."
                ),
                    () => { character.age++; });
                break;
            case 19:
                ev = new CareerEventModel(new EventModel(
                    "Experimental Subject - you volunteered to take part in a secret medical experiment which succeeded... well almost. You may roll an aging test to regain a Chronicle Point once per session.",
                    "Curse of the Mayfly",
                    "Experimental Subject - you volunteered to take part in a secret medical experiment which succeeded... well almost. You may roll an aging test to regain a Chronicle Point once per session."
                ));
                break;
            case 20:
                ev = new CareerEventModel(new EventModel(
                    "What on earth did you do!? You're fired and may not continue this career.",
                    "",
                    "What on earth did you do!? You got fired.",
                    [],
                    () => { },
                    "FiredEvent"
                ));
                break;
            case 21:
                ev = new CareerEventModel(new EventModel(
                    "Wealthy Lover - your lover is very wealthy and generous. Increase Earnings by 1 (to a maximum of 5) whilst they are still in love with you. But they are very demanding/vulnerable.",
                    "Vulnerable Lover",
                    "Wealthy Lover - your lover is very wealthy and generous. But they are very demanding/vulnerable."
                ),
                    () => {
                        character.earnings = Math.min(5, character.earnings++);
                    });
                break;
            case 22:
                ev = new CareerEventModel(new EventModel(
                    "You foiled a Heretic (or Criminal) plot on your own, or with the help of some friends, but why didn't you call the Brotherhood (or Authorities)? Gain an enemy in a Heretic Cult. Gain 5 Assets in 'liberated equipment'.",
                    "",
                    "You foiled a Heretic (or Criminal) plot on your own, or with the help of some friends, but why didn't you call the Brotherhood (or Authorities)? Gain an enemy in a Heretic Cult."
                ),
                    () => { character.assets += 5; });
                break;
            case 23:
                ev = new CareerEventModel(new EventModel(
                    "You survived a serious disaster where something horrendous went wrong and you got out with your skin intact. You gain 1 favour from a useful contact, 1 enemy made during the disaster and 1 Asset as compensation for undergoing the trauma. You also have a tendency for nasty sleep depriving nightmares.",
                    "Nightmares",
                    "You survived a serious disaster where something horrendous went wrong and you got out with your skin intact. Gain 1 favour from a useful contact. Gain 1 enemy made during a disaster you survived."
                ));
                break;
            case 24:
                ev = new CareerEventModel(new EventModel(
                    "Sole heir of a relative - you were remembered in the will of a relative. Gain 2 Assets at the age of 20. If you gain a criminal record before then, you do not receive it.",
                    "",
                    "Sole heir of a relative - you were remembered in the will of a relative."
                ),
                    () => { character.setAssetsTrigger(2, 20); });
                break;
            case 25:
                ev = new CareerEventModel(new EventModel(
                    "You helped solve a serious crime. Gain a favour with a senior figure in Law Enforcement within your faction.",
                    "",
                    "You helped solve a serious crime. Gain a favour with a senior figure in Law Enforcement within your faction."
                ));
                break;
            case 26:
                ev = new CareerEventModel(new EventModel(
                    "You scored the big one! You earned a big promotion. Increase Earnings by 1. If your Earnings are already 5 or more, gain a favour from a powerful Executive instead.",
                    "",
                    "You scored the big one! You earned a big promotion."
                ),
                    () => {
                        if (character.earnings >= 5) {
                            character.careerEvents[character.careerEvents.length - 1].effect += ` You gain a favour from a powerful Executive.`;
                        } else {
                            character.earnings++;
                        }
                    });
                break;
            case 27:
                var faction = FactionsHelper.getFaction(FactionsHelper.generateHeritage()).name;

                ev = new CareerEventModel(new EventModel(
                    "You have a contact in " + faction + " who owes you a favour.",
                    "",
                    "You have a contact in " + faction + " who owes you a favour."
                ));
                break;
            case 28:
                ev = new CareerEventModel(new EventModel(
                    "You were friends with a Heretic (or rebel), the Inquisition (or Authorities) requested your help in arresting them, what didn't you tell them? Gain a favour from someone in a Heretic or rebel group.",
                    "",
                    "You were friends with a Heretic (or rebel), the Inquisition (or Authorities) requested your help in arresting them, what didn't you tell them? Gain a favour from someone in a Heretic or rebel group."
                ));
                break;
            case 29:
                var faction = FactionsHelper.getFaction(FactionsHelper.generateHeritage()).name;

                ev = new CareerEventModel(new EventModel(
                    "You were implicated in a Heretic (or Criminal) plot. Why were you involved? Why did the Brotherhood (or Authorities) let you go? Gain a contact (and favour) in the Brotherhood or " + faction + ".",
                    "",
                    "You were implicated in a Heretic (or Criminal) plot. Why were you involved? Why did the Brotherhood (or Authorities) let you go? Gain a contact (and favour) in ",
                    [
                        faction,
                        "The Brotherhood (or Authorities)"
                    ],
                    (option) => { character.careerEvents[character.careerEvents.length - 1].effect += option; }
                ));
                break;
            case 30:
                ev = new CareerEventModel(new EventModel(
                    "You helped discover a Heretic Temple (or Criminal Hideout) and you were rewarded by the Authorities or Brotherhood. Gain 5 Assets for your trouble.",
                    "Snitch",
                    "You helped discover a Heretic Temple (or Criminal Hideout) and you were rewarded by the Authorities or Brotherhood."
                ),
                    () => { character.assets += 5; });
                break;
            case 31:
                ev = new CareerEventModel(new EventModel(
                    "You stumbled upon a mysteriously empty Heretic (or Criminal) hideout. You found something there and took it, what was it? Gain an item worth 5 Assets. This item is distinctive and is missed by it's owner. Gain an enemy in a Heretic Cult or a Criminal Gang.",
                    "",
                    "You stumbled upon a mysteriously empty Heretic (or Criminal) hideout. You found something there and took it, what was it? Gain an enemy in a Heretic Cult or a Criminal Gang. Gain an item worth 5 Assets that the enemy wants."
                ));
                break;
            case 32:
                ev = new CareerEventModel(new EventModel(
                    "You came across a body after a fight, they had something strange on them, you couldn't resist and took it, what is it? Gain an item worth 10 Assets with a Reliability of 1.",
                    "",
                    "You came across a body after a fight, they had something strange on them, you couldn't resist and took it, what is it? Gain an item worth 10 Assets with a Reliability of 1."
                ));
                break;
            case 33:
                ev = new CareerEventModel(new EventModel(
                    "Your lucky day! Something paid off, a lottery ticket, a risky business venture or a hard won contract. You get a big pay-out. Gain 5 Assets.",
                    "",
                    "Your lucky day! Something paid off, a lottery ticket, a risky business venture or a hard won contract. You get a big pay-out."
                ),
                    () => { character.assets += 5; });
                break;
            case 34:
                var faction = FactionsHelper.getFaction(FactionsHelper.generateHeritage()).name;

                ev = new CareerEventModel(new EventModel(
                    "You saved someone from a terrible accident. Gain an ally (Favour) in " + faction + " OR ignore one subsequent event roll result.",
                    "",
                    "You saved someone from a terrible accident. ",
                    [
                        "Gain an ally in " + faction,
                        "Free event re-roll"
                    ],
                    (option) => {
                        if (option.indexOf("ally") > -1) {
                            character.careerEvents[character.careerEvents.length - 1].effect += `Gain an ally in ${faction}.`;
                        } else {
                            character.eventRerolls++;
                        }
                    }
                ));
                break;
            case 35:
                var talents = TalentsHelper.getFirstTalents();
                var t = [];

                for (var i = 0; i < talents.length; i++)
                {
                    t.push(talents[i].name);
                }

                ev = new CareerEventModel(new EventModel(
                    "Experimental Subject – you volunteered to take part in a secret medical experiment which succeeded... well almost. Gain the first talent in the talent tree of your choice and describe how you can do this as a result of the experiment. However sometimes you lose the plot or wake up in strange places. The Talent can be purchased again normally, so allowing double the benefit.",
                    "Experimental Subject",
                    "You volunteered to take part in a secret medical experiment which succeeded... well almost. You have an ability that you can perform, but sometimes you lose the plot or wake up in strange places.",
                    t,
                    (option) => { character.experimentalSubjectTalent = option; }
                ));
                break;
            case 36:
                ev = new CareerEventModel(new EventModel(
                    "Media Star – You’ve had a couple of successful releases – whether film or music. You gain one free momentum on successful Social tests but all Stealth tests are 1 difficulty greater where being recognised would cause you a problem.",
                    "",
                    "Media Star – You’ve had a couple of successful releases – whether film or music. You gain one free Momentum on successful Social tests but all Stealth tests are 1 difficulty greater where being recognised would cause you a problem."
                ));
                break;
            case 37:
                ev = new CareerEventModel(new EventModel(
                    "Disabled in a terrible accident. All movement related skill tests are 1 difficulty harder, but you have gained a strong will. All Mental Strength tests are 1 difficulty lower (minimum 1). Treatment to fix you is 50 Assets, or you could join Cybertronic and they’ll fix you for free of course.",
                    "",
                    "Disabled in a terrible accident. All movement related skill tests are 1 difficulty harder, but you have gained a strong will. All Mental Strength tests are 1 difficulty lower (minimum 1)."
                ));
                break;
            case 38:
                ev = new CareerEventModel(new EventModel(
                    "Good Negotiator – whether it’s in the boardroom, doing a deal on the streets, or talking down an armed robber you’re gifted at negotiating. All Social tests involving negotiating are 1 difficulty less (minimum 0).",
                    "",
                    "Good Negotiator – whether it’s in the boardroom, doing a deal on the streets, or talking down an armed robber you’re gifted at negotiating. All Social tests involving negotiating are 1 difficulty less (minimum 0)."
                ));
                break;
            case 39:
                ev = new CareerEventModel(new EventModel(
                    "You're harbouring an AI system, perhaps in a childhood toy. The AI is strongly degraded. You grew up with it and can't bare to part with it. Gain an item worth 5 Assets that houses the AI. The AI provides 1 Momentum to Education tests so long as the characters can freely converse with it.",
                    "",
                    "You're harbouring an AI system, perhaps in a childhood toy. The AI is strongly degraded. You grew up with it and can't bare to part with it. Gain an item worth 5 Assets that houses the AI. The AI provides 1 Momentum to Education tests so long as the characters can freely converse with it."
                ));
                break;
            case 40:
                ev = new CareerEventModel(new EventModel(
                    "Major Career Success! You’ve been incredibly successful in this career path. Increase your Earnings Rating by 1, with an equivalent increase in social standing. If already of Elite status, instead gain a favour from your faction’s top leadership.",
                    "",
                    "Major Career Success! You’ve been incredibly successful in this career path."
                ),
                    () => {
                        if (character.status === Status.Elite) {
                            character.careerEvents[character.careerEvents.length - 1].effect += ` You gain a favour from your faction's top leadership.`;
                        } else {
                            StatusHelper.increaseStatus();
                        }
                    });
                break;
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

    generateEvents(extra: number) {
        var rolls = [];
        for (var i = 0; i < extra + 2; i++) {
            rolls.push(Math.floor(Math.random() * 20) + 1);
        }

        var combinations = [];
        for (var i = 0; i < rolls.length; i++) {
            for (var j = i + 1; j < rolls.length; j++) {
                var combo = rolls[i] + rolls[j];
                if (combinations.indexOf(combo) === -1) {
                    combinations.push(combo);
                }
            }
        }

        var events = [];
        for (var i = 0; i < combinations.length; i++) {
            events.push(this.generateEvent(combinations[i]));
        }

        return events;
    }
}

export const CareerEventsHelper = new CareerEvents();