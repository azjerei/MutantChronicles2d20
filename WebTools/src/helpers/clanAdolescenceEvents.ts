import {character} from '../common/character';
import {Clan, ClansHelper} from './clans';
import {EventModel, AdolescenceEventModel} from '../common/eventModel';
import {Attribute} from './attributes';
import {StatusHelper} from './status';

export class ClanAdolescenceEvents {
    static generateEvent(clan: Clan) {
        const roll = Math.floor(Math.random() * 6) + 1;
        switch (clan) {
            case Clan.Axelthorpe:
            case Clan.Smythe:
                switch (roll) {
                    case 1:
                        return new AdolescenceEventModel(new EventModel(
                            "Military Heritage: You come from a long line of high-ranking military officers. You gain a single favour from a high-ranking member of the Ministry of War.",
                            "Never Give Up",
                            "You gain a single favour from a high-ranking member of the Ministry of War."));
                    case 2:
                    case 3:
                        return new AdolescenceEventModel(new EventModel(
                            "Nepotism: Your parents’ influence got you internships as a child and promotions in adult life. Increase your Earnings Rating by one.",
                            "Won't Take No for an Answer",
                            "Your parents’ influence got you internships as a child and promotions in adult life."),
                            () => { character.earnings++; });
                    case 4:
                        return new AdolescenceEventModel(new EventModel(
                            "Financial Whiz: You have a knack for numbers and money. You may use your Intelligence rather than your Personality to determine your Influence and starting assets.",
                            "Not a People Person",
                            "You have a knack for numbers and money."),
                            () => { character.startingAssetsAttribute = Attribute.Intelligence; });
                    case 5:
                        return new AdolescenceEventModel(new EventModel(
                            "Comptography Expert: In your hands, a comptograph can perform wonders. You may re-roll one d20 on any Sciences test made to use comptographs or computers. However, you reduce your Corruption Soak by one.",
                            "Obsessed with Technology",
                            "You may re-roll one d20 on any Sciences test made to use comptographs or computers. However, you reduce your Corruption Soak by one."));
                    case 6: {
                        const clanName = clan === Clan.Axelthorpe ? "Axelthorpe" : "Smythe";
                        return new AdolescenceEventModel(new EventModel(
                            `Slender: The ${clanName}s are noted for their waiflike build. Reduce your Serious Wounds by one and increase your Critical Wounds by one.`,
                            "Frail Build",
                            `The ${clanName}s are noted for their waiflike build.`),
                            () => {
                                character.seriousWoundsIncrease--;
                                character.criticalWoundsIncrease++;
                            });
                    }
                }
                break;
            case Clan.Bartholomew:
                switch (roll) {
                    case 1:
                        return new AdolescenceEventModel(new EventModel(
                            "Military Heritage: You come from a long line of high-ranking military officers. You gain a single favour from a high-ranking member of the Ministry of War.",
                            "Never Give Up",
                            "You gain a single favour from a high-ranking member of the Ministry of War."));
                    case 2:
                    case 3:
                        return new AdolescenceEventModel(new EventModel(
                            "Nepotism: Your parents’ influence got you internships as a child and promotions in adult life. Increase your Earnings Rating by one.",
                            "Won't Take No for an Answer",
                            "Your parents’ influence got you internships as a child and promotions in adult life."),
                            () => { character.earnings++; });
                    case 4:
                        return new AdolescenceEventModel(new EventModel(
                            "Weapons Fanatic: You have been obsessed with guns or blades since you were small. Increase either your Ranged or Melee damage bonus by +1[DS].",
                            "Violent",
                            "You have been obsessed with guns or blades since you were small.",
                            [
                                "+1 Ranged damage bonus",
                                "+1 Melee damage bonus"
                            ],
                            (option) => {
                                if (option.indexOf("Ranged") > -1) {
                                    character.rangedIncrease++;
                                }
                                else {
                                    character.meleeIncrease++;
                                }
                            }));
                    case 5: {
                        let enemyClan = ClansHelper.generateClan();
                        if (enemyClan === clan) {
                            enemyClan = ClansHelper.generateClan();
                        }

                        const clanName = ClansHelper.getClan(enemyClan).name;

                        return new AdolescenceEventModel(new EventModel(
                            `Sneaky Little Conniver: You always get what you want, but people do not have to like you for it. Increase your Social Status by one, but gain an Enemy in Clan ${clanName}.`,
                            "Ruthless",
                            `You always get what you want, but people do not have to like you for it. You have an Enemy in Clan ${clanName}.`),
                            () => {
                                StatusHelper.increaseStatus();
                            });
                    }
                    case 6:
                        return new AdolescenceEventModel(new EventModel(
                            "Slick Talker: You are a silver-tongued devil, able to convince others of almost anything, but your sly manner makes you ill-suited to wielding authority. Gain one bonus Momentum on all Persuade tests, but increase the difficulty of Command tests by one step.",
                            "Talkative",
                            "Gain one bonus Momentum on all Persuade tests, but increase the difficulty of Command tests by one step."));
                }
                break;
            case Clan.Brannaghan:
                switch (roll) {
                    case 1:
                        return new AdolescenceEventModel(new EventModel(
                            "Military Heritage: You come from a long line of high-ranking military officers. You gain a single favour from a high-ranking member of the Ministry of War.",
                            "Never Give Up",
                            "You gain a single favour from a high-ranking member of the Ministry of War."));
                    case 2:
                    case 3:
                        return new AdolescenceEventModel(new EventModel(
                            "Nepotism: Your parents’ influence got you internships as a child and promotions in adult life. Increase your Earnings Rating by one.",
                            "Won't Take No for an Answer",
                            "Your parents’ influence got you internships as a child and promotions in adult life."),
                            () => { character.earnings++; });
                    case 4:
                        return new AdolescenceEventModel(new EventModel(
                            "Weapons Fanatic: You have been obsessed with guns or blades since you were small. Increase either your Ranged or Melee damage bonus by +1[DS].",
                            "Violent",
                            "You have been obsessed with guns or blades since you were small.",
                            [
                                "+1 Ranged damage bonus",
                                "+1 Melee damage bonus"
                            ],
                            (option) => {
                                if (option.indexOf("Ranged") > -1) {
                                    character.rangedIncrease++;
                                }
                                else {
                                    character.meleeIncrease++;
                                }
                            }));
                    case 5:
                    case 6:
                        return new AdolescenceEventModel(new EventModel(
                            "Extraordinary Chemical Resistance: Possibly inherited from your ancestors, you have an exceptional resistance to foreign substances. You gain two bonus Momentum on all Resistance tests to avoid the effects of poisons, diseases, or drugs. However, when a dose of Coagulant is spent on a Treatment or Medicine test to aid the character, it grants no benefit unless a second dose is spent at the same time.",
                            "Drug Resistant",
                            "You gain two bonus Momentum on all Resistance tests to avoid the effects of poisons, diseases, or drugs. However, when a dose of Coagulant is spent on a Treatment or Medicine test to aid the character, it grants no benefit unless a second dose is spent at the same time."));
                }
                break;
            case Clan.Drougan:
                switch (roll) {
                    case 1:
                        return new AdolescenceEventModel(new EventModel(
                            "Military Heritage: You come from a long line of high-ranking military officers. You gain a single favour from a high-ranking member of the Ministry of War.",
                            "Never Give Up",
                            "You gain a single favour from a high-ranking member of the Ministry of War."));
                    case 2:
                        return new AdolescenceEventModel(new EventModel(
                            "Nepotism: Your parents’ influence got you internships as a child and promotions in adult life. Increase your Earnings Rating by one.",
                            "Won't Take No for an Answer",
                            "Your parents’ influence got you internships as a child and promotions in adult life."),
                            () => { character.earnings++; });
                    case 3:
                    case 4:
                        return new AdolescenceEventModel(new EventModel(
                            "Full of Blarney: You have inherited the fabled Drougan gift for the gab. You may re-roll one d20 on any Persuade test, but increase the difficulty of Command tests by one step.",
                            "Talkative",
                            "You may re-roll one d20 on any Persuade test, but increase the difficulty of Command tests by one step."));
                    case 5:
                    case 6:
                        return new AdolescenceEventModel(new EventModel(
                            "Extraordinary Chemical Resistance: Possibly inherited from your ancestors, you have an exceptional resistance to foreign substances. You gain two bonus Momentum on all Resistance tests to avoid the effects of poisons, diseases, or drugs. However, when a dose of Coagulant is spent on a Treatment or Medicine test to aid the character, it grants no benefit unless a second dose is spent at the same time.",
                            "Drug Resistant",
                            "You gain two bonus Momentum on all Resistance tests to avoid the effects of poisons, diseases, or drugs. However, when a dose of Coagulant is spent on a Treatment or Medicine test to aid the character, it grants no benefit unless a second dose is spent at the same time."));
                }
                break;
            case Clan.Dunsirn:
                switch (roll) {
                    case 1:
                        return new AdolescenceEventModel(new EventModel(
                            "Military Heritage: You come from a long line of high-ranking military officers. You gain a single favour from a high-ranking member of the Ministry of War.",
                            "Never Give Up",
                            "You gain a single favour from a high-ranking member of the Ministry of War."));
                    case 2:
                        return new AdolescenceEventModel(new EventModel(
                            "Nepotism: Your parents’ influence got you internships as a child and promotions in adult life. Increase your Earnings Rating by one.",
                            "Won't Take No for an Answer",
                            "Your parents’ influence got you internships as a child and promotions in adult life."),
                            () => { character.earnings++; });
                    case 3:
                        return new AdolescenceEventModel(new EventModel(
                            "Weapons Fanatic: You have been obsessed with guns or blades since you were small. Increase either your Ranged or Melee damage bonus by +1[DS].",
                            "Violent",
                            "You have been obsessed with guns or blades since you were small.",
                            [
                                "+1 Ranged damage bonus",
                                "+1 Melee damage bonus"
                            ],
                            (option) => {
                                if (option.indexOf("Ranged") > -1) {
                                    character.rangedIncrease++;
                                }
                                else {
                                    character.meleeIncrease++;
                                }
                            }));
                    case 4:
                    case 5:
                    case 6:
                        return new AdolescenceEventModel(new EventModel(
                            "You Are Of The Land: Your parents taught you a deep and abiding respect for the wilderness, and you have spent much time living in it. You may re-roll 1d20 on Athletics, Observation, and Survival tests made in untamed wilderness. However, you increase the difficulty of tests using those skills by one in urban or artificial locations.",
                            "Uncomfortable in Cities",
                            "You may re-roll 1d20 on Athletics, Observation, and Survival tests made in untamed wilderness. However, you increase the difficulty of tests using those skills by one in urban or artificial locations"));
                }
                break;
            case Clan.Fergan:
                switch (roll) {
                    case 1:
                        return new AdolescenceEventModel(new EventModel(
                            "Military Heritage: You come from a long line of high-ranking military officers. You gain a single favour from a high-ranking member of the Ministry of War.",
                            "Never Give Up",
                            "You gain a single favour from a high-ranking member of the Ministry of War."));
                    case 2:
                        return new AdolescenceEventModel(new EventModel(
                            "Nepotism: Your parents’ influence got you internships as a child and promotions in adult life. Increase your Earnings Rating by one.",
                            "Won't Take No for an Answer",
                            "Your parents’ influence got you internships as a child and promotions in adult life."),
                            () => { character.earnings++; });
                    case 3:
                        return new AdolescenceEventModel(new EventModel(
                            "Weapons Fanatic: You have been obsessed with guns or blades since you were small. Increase either your Ranged or Melee damage bonus by +1[DS].",
                            "Violent",
                            "You have been obsessed with guns or blades since you were small.",
                            [
                                "+1 Ranged damage bonus",
                                "+1 Melee damage bonus"
                            ],
                            (option) => {
                                if (option.indexOf("Ranged") > -1) {
                                    character.rangedIncrease++;
                                }
                                else {
                                    character.meleeIncrease++;
                                }
                            }));
                    case 4:
                    case 5:
                        return new AdolescenceEventModel(new EventModel(
                            "Born at the Wheel: You have been operating motor vehicles since you were big enough to walk. You may re-roll 1d20 on Pilot tests to operate ground vehicles, but you also increase the difficulty of Athletics tests by one step.",
                            "Road Rage",
                            "You may re-roll 1d20 on Pilot tests to operate ground vehicles, but you also increase the difficulty of Athletics tests by one step."));
                    case 6:
                        return new AdolescenceEventModel(new EventModel(
                            "You Are Of The Land: Your parents taught you a deep and abiding respect for the wilderness, and you have spent much time living in it. You may re-roll 1d20 on Athletics, Observation, and Survival tests made in untamed wilderness. However, you increase the difficulty of tests using those skills by one in urban or artificial locations.",
                            "Uncomfortable in Cities",
                            "You may re-roll 1d20 on Athletics, Observation, and Survival tests made in untamed wilderness. However, you increase the difficulty of tests using those skills by one in urban or artificial locations"));
                }
                break;
            case Clan.Fieldhausen:
                switch (roll) {
                    case 1:
                    case 2:
                        return new AdolescenceEventModel(new EventModel(
                            "Business Heritage: You come from a long line of entrepreneurs or engineers. You gain two assets.",
                            "Money Makes the World Go Round",
                            "You come from a long line of entrepreneurs or engineers."),
                            () => { character.assets += 2; });
                    case 3:
                    case 4:
                        return new AdolescenceEventModel(new EventModel(
                            "Nepotism: Your parents’ influence got you internships as a child and promotions in adult life. Increase your Earnings Rating by one.",
                            "Won't Take No for an Answer",
                            "Your parents’ influence got you internships as a child and promotions in adult life."),
                            () => { character.earnings++; });
                    case 5:
                        return new AdolescenceEventModel(new EventModel(
                            "Friends in High Places: You have close ties with someone highly placed in the Imperial bureaucracy. Increase your Social Standing by one.",
                            "Used to the Finer Things",
                            "You have close ties with someone highly placed in the Imperial bureaucracy."),
                            () => { StatusHelper.increaseStatus(); });
                    case 6:
                        return new AdolescenceEventModel(new EventModel(
                            "Born at the Wheel: You have been operating motor vehicles since you were big enough to walk. You may re-roll 1d20 on Pilot tests to operate ground vehicles, but you also increase the difficulty of Athletics tests by one step.",
                            "Road Rage",
                            "You may re-roll 1d20 on Pilot tests to operate ground vehicles, but you also increase the difficulty of Athletics tests by one step."));
                }
                break;
            case Clan.Finn:
                switch (roll) {
                    case 1:
                    case 2:
                    case 3:
                        return new AdolescenceEventModel(new EventModel(
                            "Medical Heritage: You come from a long line of excellent doctors. Gain one bonus Momentum on all Treatment tests attempted. However, pick Close Combat or Ranged Weapons – all tests with that skill, and all Advanced Skills linked to it, increase in difficulty by one step.",
                            "A Lover Not A Figter",
                            "Gain one bonus Momentum on all Treatment tests attempted.",
                            [
                                "Close Combat",
                                "Ranged Weapons"
                            ],
                            (option) => {
                                if (option.indexOf("Close Combat") > -1) {
                                    character.adolescenceEvent.effect += " All tests with Close Combat and Unarmed Combat increase in difficulty by one step.";
                                }
                                else {
                                    character.adolescenceEvent.effect += " All tests with Ranged Weapons, Heavy Weapons and Gunnery increase in difficulty by one step.";
                                }
                            }));
                    case 4:
                        return new AdolescenceEventModel(new EventModel(
                            "Nepotism: Your parents’ influence got you internships as a child and promotions in adult life. Increase your Earnings Rating by one.",
                            "Won't Take No for an Answer",
                            "Your parents’ influence got you internships as a child and promotions in adult life."),
                            () => { character.earnings++; });
                    case 5:
                        return new AdolescenceEventModel(new EventModel(
                            "Slick Talker: You are a silver-tongued devil, able to convince others of almost anything, but your sly manner makes you ill-suited to wielding authority. Gain one bonus Momentum on all Persuade tests, but increase the difficulty of Command tests by one step.",
                            "Talkative",
                            "Gain one bonus Momentum on all Persuade tests, but increase the difficulty of Command tests by one step."));
                    case 6:
                        return new AdolescenceEventModel(new EventModel(
                            "A Born Diplomat: You seem to know just how to make people agree, but your talent for debate makes you illprepared when violence is necessary. You may re-roll one d20 of any Persuade or Lifestyle test. However, pick Close Combat or Ranged Weapons – all tests with that skill, and all Advanced Skills linked to it, increase in difficulty by one step.",
                            "Slow to Anger, Slow to Action",
                            "You may re-roll one d20 of any Persuade or Lifestyle test.",
                            [
                                "Close Combat",
                                "Ranged Weapons"
                            ],
                            (option) => {
                                if (option.indexOf("Close Combat") > -1) {
                                    character.adolescenceEvent.effect += " All tests with Close Combat and Unarmed Combat increase in difficulty by one step.";
                                }
                                else {
                                    character.adolescenceEvent.effect += " All tests with Ranged Weapons, Heavy Weapons and Gunnery increase in difficulty by one step.";
                                }
                            }));
                }
                break;
            case Clan.Gallagher:
                switch (roll) {
                    case 1:
                        return new AdolescenceEventModel(new EventModel(
                            "Business Heritage: You come from a long line of entrepreneurs. You gain two assets.",
                            "Money Makes the World Go Round",
                            "You come from a long line of entrepreneurs."),
                            () => { character.assets += 2; });
                    case 2:
                        return new AdolescenceEventModel(new EventModel(
                            "Nepotism: Your parents’ influence got you internships as a child and promotions in adult life. Increase your Earnings Rating by one.",
                            "Won't Take No for an Answer",
                            "Your parents’ influence got you internships as a child and promotions in adult life."),
                            () => { character.earnings++; });
                    case 3:
                        return new AdolescenceEventModel(new EventModel(
                            "Weapons Fanatic: You have been obsessed with guns or blades since you were small. Increase either your Ranged or Melee damage bonus by +1[DS].",
                            "Violent",
                            "You have been obsessed with guns or blades since you were small.",
                            [
                                "+1 Ranged damage bonus",
                                "+1 Melee damage bonus"
                            ],
                            (option) => {
                                if (option.indexOf("Ranged") > -1) {
                                    character.rangedIncrease++;
                                }
                                else {
                                    character.meleeIncrease++;
                                }
                            }));
                    case 4:
                        return new AdolescenceEventModel(new EventModel(
                            "Natural Brawler: Your knuckles are calloused from a lifetime of punching other people in the face. You reduce the difficulty of Unarmed Combat tests by one step, to a minimum of D1.",
                            "Quick to Anger",
                            "You reduce the difficulty of Unarmed Combat tests by one step, to a minimum of D1."));
                    case 5:
                    case 6:
                        return new AdolescenceEventModel(new EventModel(
                            "Born to the Sword: Your favourite blade is like an extension of your arm. After spending a week of practice (no less than four hours a day for a full seven days), nominate a single sword you possess. That sword gains Parry 1 and Vicious 1. These qualities stack with any existing qualities the sword has.",
                            "Honour of the Sword",
                            "After spending a week of practice (no less than four hours a day for a full seven days), nominate a single sword you possess. That sword gains Parry 1 and Vicious 1. These qualities stack with any existing qualities the sword has."));
                }
                break;
            case Clan.Kingsfield:
                switch (roll) {
                    case 1:
                        return new AdolescenceEventModel(new EventModel(
                            "Military Heritage: You come from a long line of high-ranking military officers. You gain a single favour from a high-ranking member of the Ministry of War.",
                            "Never Give Up",
                            "You gain a single favour from a high-ranking member of the Ministry of War."));
                    case 2:
                    case 3:
                        return new AdolescenceEventModel(new EventModel(
                            "Nepotism: Your parents’ influence got you internships as a child and promotions in adult life. Increase your Earnings Rating by one.",
                            "Won't Take No for an Answer",
                            "Your parents’ influence got you internships as a child and promotions in adult life."),
                            () => { character.earnings++; });
                    case 4:
                        return new AdolescenceEventModel(new EventModel(
                            "Weapons Fanatic: You have been obsessed with guns or blades since you were small. Increase either your Ranged or Melee damage bonus by +1[DS].",
                            "Violent",
                            "You have been obsessed with guns or blades since you were small.",
                            [
                                "+1 Ranged damage bonus",
                                "+1 Melee damage bonus"
                            ],
                            (option) => {
                                if (option.indexOf("Ranged") > -1) {
                                    character.rangedIncrease++;
                                }
                                else {
                                    character.meleeIncrease++;
                                }
                            }));
                    case 5: {
                        let enemyClan = ClansHelper.generateClan();
                        if (enemyClan === clan) {
                            enemyClan = ClansHelper.generateClan();
                        }

                        const clanName = ClansHelper.getClan(enemyClan).name;

                        return new AdolescenceEventModel(new EventModel(
                            `Sneaky Little Conniver: You always get what you want, but people do not have to like you for it. Increase your Social Status by one, but gain an Enemy in Clan ${clanName}.`,
                            "Ruthless",
                            `You always get what you want, but people do not have to like you for it. You have an Enemy in Clan ${clanName}.`),
                            () => {
                                StatusHelper.increaseStatus();
                            });
                    }
                    case 6:
                        return new AdolescenceEventModel(new EventModel(
                            "Humourless: With your family’s history rendered into the subject of satire by everyone else, you have little patience for the mirth of others. You are always focussed on the job at hand, with no time for frivolity. You increase the difficulty of Persuade tests by one step made outside of formal situations. However, you gain one more Mental Wound than normal.",
                            "Relentlessly Serious",
                            "You increase the difficulty of Persuade tests by one step made outside of formal situations."),
                            () => { character.mentalWoundsIncrease++; });
                }
                break;
            case Clan.Loughton:
                switch (roll) {
                    case 1:
                        return new AdolescenceEventModel(new EventModel(
                            "Military Heritage: You come from a long line of high-ranking military officers. You gain a single favour from a high-ranking member of the Ministry of War.",
                            "Never Give Up",
                            "You gain a single favour from a high-ranking member of the Ministry of War."));
                    case 2:
                        return new AdolescenceEventModel(new EventModel(
                            "Nepotism: Your parents’ influence got you internships as a child and promotions in adult life. Increase your Earnings Rating by one.",
                            "Won't Take No for an Answer",
                            "Your parents’ influence got you internships as a child and promotions in adult life."),
                            () => { character.earnings++; });
                    case 3:
                        return new AdolescenceEventModel(new EventModel(
                            "Weapons Fanatic: You have been obsessed with guns or blades since you were small. Increase either your Ranged or Melee damage bonus by +1[DS].",
                            "Violent",
                            "You have been obsessed with guns or blades since you were small.",
                            [
                                "+1 Ranged damage bonus",
                                "+1 Melee damage bonus"
                            ],
                            (option) => {
                                if (option.indexOf("Ranged") > -1) {
                                    character.rangedIncrease++;
                                }
                                else {
                                    character.meleeIncrease++;
                                }
                            }));
                    case 4:
                    case 5:
                        return new AdolescenceEventModel(new EventModel(
                            "Born at the Wheel: You have been operating motor vehicles since you were big enough to walk. You may re-roll 1d20 on Pilot tests to operate ground vehicles, but you also increase the difficulty of Athletics tests by one step.",
                            "Road Rage",
                            "You may re-roll 1d20 on Pilot tests to operate ground vehicles, but you also increase the difficulty of Athletics tests by one step."));
                    case 6:
                        return new AdolescenceEventModel(new EventModel(
                            "Spacefarer: You’ve a knack for operating spacecraft, and have had for as long as you can remember. So fundamental is space travel to your identity that you are dismissive of those who limit themselves to a single world. You may re-roll 1d20 on Space tests, but you also increase the difficulty of Survival tests by one step.",
                            "Dismissive of the Untraveled",
                            "You may re-roll 1d20 on Space tests, but you also increase the difficulty of Survival tests by one step."));
                }
                break;
            case Clan.MacGuire:
                switch (roll) {
                    case 1:
                    case 2:
                        return new AdolescenceEventModel(new EventModel(
                            "Military Heritage: You come from a long line of high-ranking military officers. You gain a single favour from a high-ranking member of the Ministry of War.",
                            "Never Give Up",
                            "You gain a single favour from a high-ranking member of the Ministry of War."));
                    case 3:
                        return new AdolescenceEventModel(new EventModel(
                            "Nepotism: Your parents’ influence got you internships as a child and promotions in adult life. Increase your Earnings Rating by one.",
                            "Won't Take No for an Answer",
                            "Your parents’ influence got you internships as a child and promotions in adult life."),
                            () => { character.earnings++; });
                    case 4:
                        return new AdolescenceEventModel(new EventModel(
                            "Weapons Fanatic: You have been obsessed with guns or blades since you were small. Increase either your Ranged or Melee damage bonus by +1[DS].",
                            "Violent",
                            "You have been obsessed with guns or blades since you were small.",
                            [
                                "+1 Ranged damage bonus",
                                "+1 Melee damage bonus"
                            ],
                            (option) => {
                                if (option.indexOf("Ranged") > -1) {
                                    character.rangedIncrease++;
                                }
                                else {
                                    character.meleeIncrease++;
                                }
                            }));
                    case 5:
                    case 6:
                        return new AdolescenceEventModel(new EventModel(
                            "Wolfbane Training: You trained at your parents’ knees, continuing a fierce warrior lineage. You use the next highest row when determining your wounds.",
                            "Merciless",
                            "You trained at your parents’ knees, continuing a fierce warrior lineage."),
                            () => { character.woundsIncrease++; });
                }
                break;
            case Clan.Morgan:
                switch (roll) {
                    case 1:
                        return new AdolescenceEventModel(new EventModel(
                            "Military Heritage: You come from a long line of high-ranking military officers. You gain a single favour from a high-ranking member of the Ministry of War.",
                            "Never Give Up",
                            "You gain a single favour from a high-ranking member of the Ministry of War."));
                    case 2:
                    case 3:
                        return new AdolescenceEventModel(new EventModel(
                            "Nepotism: Your parents’ influence got you internships as a child and promotions in adult life. Increase your Earnings Rating by one.",
                            "Won't Take No for an Answer",
                            "Your parents’ influence got you internships as a child and promotions in adult life."),
                            () => { character.earnings++; });
                    case 4:
                        return new AdolescenceEventModel(new EventModel(
                            "Weapons Fanatic: You have been obsessed with guns or blades since you were small. Increase either your Ranged or Melee damage bonus by +1[DS].",
                            "Violent",
                            "You have been obsessed with guns or blades since you were small.",
                            [
                                "+1 Ranged damage bonus",
                                "+1 Melee damage bonus"
                            ],
                            (option) => {
                                if (option.indexOf("Ranged") > -1) {
                                    character.rangedIncrease++;
                                }
                                else {
                                    character.meleeIncrease++;
                                }
                            }));
                    case 5:
                        return new AdolescenceEventModel(new EventModel(
                            "Electronics Whiz: Ever since you were a child, you have had a knack for building or fixing electronics. You may re-roll one d20 on any Mechanics test made to use make or repair electronics. However, you reduce your Corruption Soak by one.",
                            "Knows Machines Better Than People",
                            "You may re-roll one d20 on any Mechanics test made to use make or repair electronics. However, you reduce your Corruption Soak by one."));
                    case 6:
                        return new AdolescenceEventModel(new EventModel(
                            "Gambler: You have played games of chance all your life, and you are thus well-versed in matters of risk vs reward. You may pay one Dark Symmetry point to roll 1[DS] before attempting any test. On a roll of 1 or 2, you increase your Expertise rank in the skill by the amount rolled. On a 3 to 5, nothing happens. If a Dark Symmetry Icon is generated, then the roll generates one additional Repercussion.",
                            "Reckless",
                            "You may pay one Dark Symmetry point to roll 1[DS] before attempting any test. On a roll of 1 or 2, you increase your Expertise rank in the skill by the amount rolled. On a 3 to 5, nothing happens. If a Dark Symmetry Icon is generated, then the roll generates one additional Repercussion."));
                }
                break;
            case Clan.Murdoch:
                switch (roll) {
                    case 1:
                        return new AdolescenceEventModel(new EventModel(
                            "Military Heritage: You come from a long line of high-ranking military officers. You gain a single favour from a high-ranking member of the Ministry of War.",
                            "Never Give Up",
                            "You gain a single favour from a high-ranking member of the Ministry of War."));
                    case 2:
                    case 3:
                        return new AdolescenceEventModel(new EventModel(
                            "Nepotism: Your parents’ influence got you internships as a child and promotions in adult life. Increase your Earnings Rating by one.",
                            "Won't Take No for an Answer",
                            "Your parents’ influence got you internships as a child and promotions in adult life."),
                            () => { character.earnings++; });
                    case 4:
                        return new AdolescenceEventModel(new EventModel(
                            "Weapons Fanatic: You have been obsessed with guns or blades since you were small. Increase either your Ranged or Melee damage bonus by +1[DS].",
                            "Violent",
                            "You have been obsessed with guns or blades since you were small.",
                            [
                                "+1 Ranged damage bonus",
                                "+1 Melee damage bonus"
                            ],
                            (option) => {
                                if (option.indexOf("Ranged") > -1) {
                                    character.rangedIncrease++;
                                }
                                else {
                                    character.meleeIncrease++;
                                }
                            }));
                    case 5:
                        return new AdolescenceEventModel(new EventModel(
                            "Slick Talker: You are a silver-tongued devil, able to convince others of almost anything, but your sly manner makes you ill-suited to wielding authority. Gain one bonus Momentum on all Persuade tests, but increase the difficulty of Command tests by one step.",
                            "Talkative",
                            "Gain one bonus Momentum on all Persuade tests, but increase the difficulty of Command tests by one step."));
                    case 6:
                        return new AdolescenceEventModel(new EventModel(
                            "Child Prodigy: Certain perks come with the Murdoch name, such as an exceptional education. Pick two skills. You may re-roll 1d20 on any tests involving those skills. Pick a third skill: tests using that skill increase in difficulty by one step.",
                            "Egotistical",
                            "Pick two skills. You may re-roll 1d20 on any tests involving those skills. Pick a third skill: tests using that skill increase in difficulty by one step."));
                }
                break;
            case Clan.Murray:
                switch (roll) {
                    case 1:
                        return new AdolescenceEventModel(new EventModel(
                            "Military Heritage: You come from a long line of high-ranking military officers. You gain a single favour from a high-ranking member of the Ministry of War.",
                            "Never Give Up",
                            "You gain a single favour from a high-ranking member of the Ministry of War."));
                    case 2:
                        return new AdolescenceEventModel(new EventModel(
                            "Nepotism: Your parents’ influence got you internships as a child and promotions in adult life. Increase your Earnings Rating by one.",
                            "Won't Take No for an Answer",
                            "Your parents’ influence got you internships as a child and promotions in adult life."),
                            () => { character.earnings++; });
                    case 3:
                        return new AdolescenceEventModel(new EventModel(
                            "Full of Blarney: You have inherited the fabled Drougan gift for the gab. You may re-roll one d20 on any Persuade test, but increase the difficulty of Command tests by one step.",
                            "Talkative",
                            "You may re-roll one d20 on any Persuade test, but increase the difficulty of Command tests by one step."));
                    case 4:
                    case 5:
                        return new AdolescenceEventModel(new EventModel(
                            "Luck of the Murrays: As the saying goes, your luck never seems to run out. Roll 1[DS] when you make a Response Action. If a Dark Symmetry Icon is generated, the action does not count towards your normal limit of one Response Action per turn.",
                            "Reckless",
                            "Roll 1[DS] when you make a Response Action. If a Dark Symmetry Icon is generated, the action does not count towards your normal limit of one Response Action per turn."));
                    case 6:
                        return new AdolescenceEventModel(new EventModel(
                            "Extraordinary Chemical Resistance: Possibly inherited from your ancestors, you have an exceptional resistance to foreign substances. You gain two bonus Momentum on all Resistance tests to avoid the effects of poisons, diseases, or drugs. However, when a dose of Coagulant is spent on a Treatment or Medicine test to aid the character, it grants no benefit unless a second dose is spent at the same time.",
                            "Drug Resistant",
                            "You gain two bonus Momentum on all Resistance tests to avoid the effects of poisons, diseases, or drugs. However, when a dose of Coagulant is spent on a Treatment or Medicine test to aid the character, it grants no benefit unless a second dose is spent at the same time."));

                }
                break;
            case Clan.OLoughton:
                switch (roll) {
                    case 1:
                    case 2:
                    case 3:
                        return new AdolescenceEventModel(new EventModel(
                            "Military Heritage: You come from a long line of high-ranking military officers. You gain a single favour from a high-ranking member of the Ministry of War.",
                            "Never Give Up",
                            "You gain a single favour from a high-ranking member of the Ministry of War."));
                    case 4:
                        return new AdolescenceEventModel(new EventModel(
                            "Weapons Fanatic: You have been obsessed with guns or blades since you were small. Increase either your Ranged or Melee damage bonus by +1[DS].",
                            "Violent",
                            "You have been obsessed with guns or blades since you were small.",
                            [
                                "+1 Ranged damage bonus",
                                "+1 Melee damage bonus"
                            ],
                            (option) => {
                                if (option.indexOf("Ranged") > -1) {
                                    character.rangedIncrease++;
                                }
                                else {
                                    character.meleeIncrease++;
                                }
                            }));
                    case 5:
                        return new AdolescenceEventModel(new EventModel(
                            "Natural Brawler: Your knuckles are calloused from a lifetime of punching other people in the face. You reduce the difficulty of Unarmed Combat tests by one step, to a minimum of D1.",
                            "Quick to Anger",
                            "You reduce the difficulty of Unarmed Combat tests by one step, to a minimum of D1."));
                    case 6:
                        return new AdolescenceEventModel(new EventModel(
                            "Slick Talker: You are a silver-tongued devil, able to convince others of almost anything, but your sly manner makes you ill-suited to wielding authority. Gain one bonus Momentum on all Persuade tests, but increase the difficulty of Command tests by one step.",
                            "Talkative",
                            "Gain one bonus Momentum on all Persuade tests, but increase the difficulty of Command tests by one step."));
                }
                break;
            case Clan.Oakenfist:
                switch (roll) {
                    case 1:
                        return new AdolescenceEventModel(new EventModel(
                            "Military Heritage: You come from a long line of high-ranking military officers. You gain a single favour from a high-ranking member of the Ministry of War.",
                            "Never Give Up",
                            "You gain a single favour from a high-ranking member of the Ministry of War."));
                    case 2:
                    case 3:
                        return new AdolescenceEventModel(new EventModel(
                            "Nepotism: Your parents’ influence got you internships as a child and promotions in adult life. Increase your Earnings Rating by one.",
                            "Won't Take No for an Answer",
                            "Your parents’ influence got you internships as a child and promotions in adult life."),
                            () => { character.earnings++; });
                    case 4:
                        return new AdolescenceEventModel(new EventModel(
                            "Weapons Fanatic: You have been obsessed with guns or blades since you were small. Increase either your Ranged or Melee damage bonus by +1[DS].",
                            "Violent",
                            "You have been obsessed with guns or blades since you were small.",
                            [
                                "+1 Ranged damage bonus",
                                "+1 Melee damage bonus"
                            ],
                            (option) => {
                                if (option.indexOf("Ranged") > -1) {
                                    character.rangedIncrease++;
                                }
                                else {
                                    character.meleeIncrease++;
                                }
                            }));
                    case 5:
                        return new AdolescenceEventModel(new EventModel(
                            "Slick Talker: You are a silver-tongued devil, able to convince others of almost anything, but your sly manner makes you ill-suited to wielding authority. Gain one bonus Momentum on all Persuade tests, but increase the difficulty of Command tests by one step.",
                            "Talkative",
                            "Gain one bonus Momentum on all Persuade tests, but increase the difficulty of Command tests by one step."));
                    case 6:
                        return new AdolescenceEventModel(new EventModel(
                            "Your Mind! The incipient madness that plagues your family has started early with you. You have one fewer Mental Wound box than normal.",
                            "Not Entirely Sane",
                            "The incipient madness that plagues your family has started early with you."),
                            () => { character.mentalWoundsIncrease--; });
                }
                break;
            case Clan.Paladine:
                switch (roll) {
                    case 1:
                        return new AdolescenceEventModel(new EventModel(
                            "Military Heritage: You come from a long line of high-ranking military officers. You gain a single favour from a high-ranking member of the Ministry of War.",
                            "Never Give Up",
                            "You gain a single favour from a high-ranking member of the Ministry of War."));
                    case 2:
                    case 3:
                        return new AdolescenceEventModel(new EventModel(
                            "Nepotism: Your parents’ influence got you internships as a child and promotions in adult life. Increase your Earnings Rating by one.",
                            "Won't Take No for an Answer",
                            "Your parents’ influence got you internships as a child and promotions in adult life."),
                            () => { character.earnings++; });
                    case 4:
                        return new AdolescenceEventModel(new EventModel(
                            "Sharp Eyes: Your attention to detail is staggering, though you sometimes miss the obvious details when you look too closely. You may re-roll 1d20 on any Observation test, but increase your Repercussion range on Observation tests by one.",
                            "Nosey",
                            "You may re-roll 1d20 on any Observation test, but increase your Repercussion range on Observation tests by one."));
                    case 5:
                        return new AdolescenceEventModel(new EventModel(
                            "An Honest Face: People feel they can trust you. Gain one bonus Momentum on Persuade tests when dealing with those friendly to you, but increase the difficulty of Persuade tests by one step when dealing with those who dislike you.",
                            "Unthreatening",
                            "Gain one bonus Momentum on Persuade tests when dealing with those friendly to you, but increase the difficulty of Persuade tests by one step when dealing with those who dislike you."));
                    case 6:
                        return new AdolescenceEventModel(new EventModel(
                            "Slick Talker: You are a silver-tongued devil, able to convince others of almost anything, but your sly manner makes you ill-suited to wielding authority. Gain one bonus Momentum on all Persuade tests, but increase the difficulty of Command tests by one step.",
                            "Talkative",
                            "Gain one bonus Momentum on all Persuade tests, but increase the difficulty of Command tests by one step."));
                }
                break;
        }
    }
}