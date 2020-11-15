import {character} from '../common/character';
import {EventModel, CareerEventModel} from '../common/eventModel';
import {Faction, FactionsHelper} from './factions';
import {PrimaryCareer} from'./primaryCareers';
import {Status, StatusHelper} from './status';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {TalentsHelper} from './talents';
import {DiceRoller} from './diceRoller';

class CareerEventsCapitol {
    generateEvent(roll: number): CareerEventModel {
        switch (roll) {
            case 2:
                return new CareerEventModel(new EventModel(
                    "Political Scandal: You got swept up in a political scandal that now makes it difficult for anyone to trust you.",
                    "Poor Reputation",
                    "Political Scandal: You got swept up in a political scandal that now makes it difficult for anyone to trust you."
                ),
                    () => { });
            case 3:
                return new CareerEventModel(new EventModel(
                    "Industrial Accident: You were badly injured in an incident in a busy factory, but narrowly survived with just a scar. What were you doing there and what happened?",
                    "Ugly Old Scar",
                    "Industrial Accident: You were badly injured in an incident in a busy factory, but narrowly survived with just a scar. What were you doing there and what happened?"
                ),
                    () => { });
            case 4:
                return new CareerEventModel(new EventModel(
                    "Harbouring a Heretic: You did not realise that the friend crashing on your couch was on the run from the Brotherhood.",
                    "Inquisitorial Scrutiny",
                    "Harbouring a Heretic: You did not realise that the friend crashing on your couch was on the run from the Brotherhood."
                ),
                    () => { });
            case 5:
                return new CareerEventModel(new EventModel(
                    "Stock Market Crash: You invested poorly, and lost it all. Reduce your Earnings rating by one.",
                    "",
                    "Stock Market Crash: You invested poorly, and lost it all."
                ),
                    () => { character.earnings = Math.max(0, character.earnings - 1); });
            case 6:
                return new CareerEventModel(new EventModel(
                    "Illicit Tryst: You were caught in bed with the wrong person, and are now the target of dirty gossip all around town. Increase your Fame by one, but increase the Repercussion range of Command and Persuade tests by one due to the shadow of scandal.",
                    "",
                    "Illicit Tryst: Increase the Repercussion range of Command and Persuade tests by one due to the shadow of scandal."
                ),
                    () => { character.fame++; });
            case 7:
                return new CareerEventModel(new EventModel(
                    "Blackmail: You have received a folder filled with photographs of you in a compromising position or engaged in dubious actions. Whoever sent the folder is making demands, or they release will copies to the public. Gain your blackmailer as an enemy, and reduce your Earnings Rating by one.",
                    "",
                    "Blackmail: You have received a folder filled with photographs of you in a compromising position or engaged in dubious actions. Whoever sent the folder is making demands, or they release will copies to the public. Gain your blackmailer as an enemy."
                ),
                    () => { character.earnings = Math.max(0, character.earnings - 1); });
            case 8:
                return new CareerEventModel(new EventModel(
                    "Battered: You were swept up in a riot and were heavily beaten by the Apes when they arrived to quell the incident. Reduce your Serious Wounds by one.",
                    "",
                    "Battered: You were swept up in a riot and were heavily beaten by the Apes when they arrived to quell the incident. Reduce your Serious Wounds by one."
                ),
                    () => { character.seriousWoundsIncrease--; });
            case 9:
                return new CareerEventModel(new EventModel(
                    "Fired: You lost your job. What are you going to do about it?",
                    "",
                    "Fired: You lost your job. What are you going to do about it?",
                    [],
                    () => { },
                    "Fired"
                ),
                    () => { });
            case 10:
                return new CareerEventModel(new EventModel(
                    "Deadly Business: You killed a business rival and left his body rotting in an alley. You have managed to avoid investigations and unwanted scrutiny, but the truth cannot stay hidden forever.",
                    "Haunted by the Past",
                    "Deadly Business: You killed a business rival and left his body rotting in an alley. You have managed to avoid investigations and unwanted scrutiny, but the truth cannot stay hidden forever."
                ),
                    () => { });
            case 11:
                return new CareerEventModel(new EventModel(
                    "Libel or Slander: You have spread lies about others, taking payment in order to testify falsely in public, in the news, or even in court. The money is good, but you have made enemies. Increase your Earnings Rating by one, and gain an enemy within the Capitol corporation.",
                    "",
                    "Libel or Slander: You have spread lies about others, taking payment in order to testify falsely in public, in the news, or even in court. The money is good, but you have made enemies. Gain an enemy within the Capitol corporation."
                ),
                    () => { character.earnings++; });
            case 12:
                return new CareerEventModel(new EventModel(
                    "Black outs: You are prone to blackouts of up to twenty four hours. When you awake, you have no knowledge of what you did during that period but you are terrified it is something terrible. Your fears make you vulnerable to the Darkness, if you are not already tainted. Reduce your Corruption Soak by one.",
                    "",
                    "Black outs: You are prone to blackouts of up to twenty four hours. When you awake, you have no knowledge of what you did during that period but you are terrified it is something terrible. Your fears make you vulnerable to the Darkness, if you are not already tainted. Reduce your Corruption Soak by one."
                ),
                    () => { });
            case 13:
                return new CareerEventModel(new EventModel(
                    "Demoted: You made the wrong call or were the victim of politics, but whatever the reason you got demoted. How are you going to get your old rank back? Reduce your Fame and Earnings Rating by one.",
                    "",
                    "Demoted: You made the wrong call or were the victim of politics, but whatever the reason you got demoted. How are you going to get your old rank back?"
                ),
                    () => {
                        character.fame = Math.max(0, character.fame - 1);
                        character.earnings = Math.max(0, character.earnings - 1);
                    });
            case 14:
                return new CareerEventModel(new EventModel(
                    "Traumatised: You have experienced the worst that the Solar System has to offer, whether a disaster in civilian life or atrocities in military service, and it changed you. Reduce your Mental Wounds by one.",
                    "",
                    "Traumatised: You have experienced the worst that the Solar System has to offer, whether a disaster in civilian life or atrocities in military service, and it changed you."
                ),
                    () => { character.mentalWoundsIncrease--; });
            case 15:
                return new CareerEventModel(new EventModel(
                    "Gambling Debts: You owe a considerable amount of money to one or more of the big gambling bosses up in Overton, and his goons are catching up to you, looking for repayment of your debts. You gain a debt worth ten assets. While this debt is unpaid, you gain an enemy.",
                    "",
                    "Gambling Debts: You owe a considerable amount of money to one or more of the big gambling bosses up in Overton, and his goons are catching up to you, looking for repayment of your debts. You gain a debt worth ten assets. While this debt is unpaid, you gain an enemy."
                ),
                    () => { });
            case 16:
                return new CareerEventModel(new EventModel(
                    "Criminal Activities: You have been involved in some highly lucrative criminal acts – laundering money, insider trading, car theft, counterfeiting, or something similar. It has brought in a lot of money, but no illicit act goes unnoticed forever, and there is a particularly tenacious investigator on your trail. Increase your Earnings Rating by one, but gain an enemy in Capitol Security Service.",
                    "",
                    "Criminal Activities: You have been involved in some highly lucrative criminal acts – laundering money, insider trading, car theft, counterfeiting, or something similar. It has brought in a lot of money, but no illicit act goes unnoticed forever, and there is a particularly tenacious investigator on your trail. Gain an enemy in Capitol Security Service."
                ),
                    () => { character.earnings++; });
            case 17:
                return new CareerEventModel(new EventModel(
                    "Made a Celebrity Enemy: You have been accused of defaming a particularly famous person. Your remarks have brought you into the spotlight as well, but they have not made you any friends. Increase your Fame by one, but gain the celebrity as an enemy.",
                    "",
                    "Made a Celebrity Enemy: You have been accused of defaming a particularly famous person. Your remarks have brought you into the spotlight as well, but they have not made you any friends. Gain the celebrity as an enemy."
                ),
                    () => { character.fame++; });
            case 18: {
                var options = [
                    "Win (-1 Earnings, 4 asset debt)",
                    "Loss (Criminal Record)"
                ];

                if (character.canRemoveCriminalRecord) {
                    options.push("Loss (-1 Earnings, Ignore Criminal Record)");
                }

                return new CareerEventModel(new EventModel(
                    "Caught: You have been arrested and charged with some criminal activity, and dragged before the courts. Whether you are innocent or not, it is a problem. You may choose the outcome of your trial. If you win, then you still reduce your Earnings Rating by one and gain a debt of four assets to finish paying off your legal fees. If you lose, you gain a Criminal Record.",
                    "",
                    "Caught: You have been arrested and charged with some criminal activity, and dragged before the courts. Whether you are innocent or not, it is a problem.",
                    options,
                    (option) => {
                        if (option.indexOf("Ignore") > -1) {
                            character.canRemoveCriminalRecord = false;
                            character.earnings = Math.max(0, character.earnings - 1);
                        }
                        else if (option.indexOf("Win") > -1) {
                            character.earnings = Math.max(0, character.earnings - 1);
                        }
                        else if (option.indexOf("Loss") > -1) {
                            character.applyCriminalRecord();
                        }
                    },
                    "FiredEvent"
                ),
                    () => { });
            }
            case 19:
                return new CareerEventModel(new EventModel(
                    "Shadowed: Someone is following you, but you do not know who or why. Your continual paranoia makes you particularly cautious; you may re-roll one d20 on Observation tests made to determine Surprise at the beginning of combat.",
                    "",
                    "Shadowed: Someone is following you, but you do not know who or why. Your continual paranoia makes you particularly cautious; you may re-roll one d20 on Observation tests made to determine Surprise at the beginning of combat."
                ),
                    () => { });
            case 20:
                return new CareerEventModel(new EventModel(
                    "Retail Riots: While shopping, you were caught up in a violent fight that engulfed several city blocks… all because of a sale.",
                    "Uncomfortable in Crowds",
                    "Retail Riots: While shopping, you were caught up in a violent fight that engulfed several city blocks… all because of a sale."
                ),
                    () => { });
            case 21:
                return new CareerEventModel(new EventModel(
                    "Your Fifteen Minutes Of Fame: Somehow, you have come to the attention of the media machine, and it has decided that you are worthy of attention and praise. Increase your Fame by one.",
                    "",
                    "Your Fifteen Minutes Of Fame: Somehow, you have come to the attention of the media machine, and it has decided that you are worthy of attention and praise."
                ),
                    () => { character.fame++; });
            case 22:
                return new CareerEventModel(new EventModel(
                    "Successful Small Business: You are enjoying the success of a growing business venture. You have opened additional branches or franchises, you have adverts on the local radio and in the local papers, and the hard work is paying off. Increase your Fame and Earnings by one.",
                    "",
                    "Successful Small Business: You are enjoying the success of a growing business venture. You have opened additional branches or franchises, you have adverts on the local radio and in the local papers, and the hard work is paying off."
                ),
                    () => {
                        character.fame++;
                        character.earnings++;
                    });
            case 23:
                return new CareerEventModel(new EventModel(
                    "Trend-Setter: Everyone is imitating some quirk of personal style you have – suddenly, the clothes you wear, the guns you use, the car you drive, and everything else about your life is regarded as deeply fashionable. Increase your Fame by one.",
                    "",
                    "Trend-Setter: Everyone is imitating some quirk of personal style you have – suddenly, the clothes you wear, the guns you use, the car you drive, and everything else about your life is regarded as deeply fashionable."
                ),
                    () => { character.fame++; });
            case 24:
                return new CareerEventModel(new EventModel(
                    "Promoted: Your actions have not gone unnoticed and you have been promoted and commended for your performance. Increase your Earnings rating by one.",
                    "",
                    "Promoted: Your actions have not gone unnoticed and you have been promoted and commended for your performance."
                ),
                    () => { character.earnings++; });
            case 25:
                return new CareerEventModel(new EventModel(
                    "Made a Celebrity Friend: Something you have done has seen you become fast friends with one of the A-List. You gain some of the reflected limelight, and your goings-on are fodder for the gossip columns. Increase your Fame by one.",
                    "",
                    "Made a Celebrity Friend: Something you have done has seen you become fast friends with one of the A-List. You gain some of the reflected limelight, and your goings-on are fodder for the gossip columns."
                ),
                    () => { character.fame++; });
            case 26:
                return new CareerEventModel(new EventModel(
                    "Security Service Contacts: You have developed contacts within the CSS and have acquired security clearance. What department are your contacts in? You have a contact in CSS, within a department chosen by the GM.",
                    "",
                    "Security Service Contacts: You have developed contacts within the CSS and have acquired security clearance. What department are your contacts in? You have a contact in CSS, within a department chosen by the GM."
                ),
                    () => { });
            case 27:
                return new CareerEventModel(new EventModel(
                    "Hero of the Hour: It all happened so fast. One moment you were simply riding the transport like everyone else, the next you had defeated a hijacking attempt and subdued the hijacker. Truth is, you cannot remember what happened, but now you are a hero. Increase your Fame by two, but gain an enemy: the one person who knows what really happened.",
                    "",
                    "Hero of the Hour: It all happened so fast. One moment you were simply riding the transport like everyone else, the next you had defeated a hijacking attempt and subdued the hijacker. Truth is, you cannot remember what happened, but now you are a hero. Gain an enemy: the one person who knows what really happened."
                ),
                    () => { character.fame += 2; });
            case 28:
                return new CareerEventModel(new EventModel(
                    "Bought Out: Your business venture, or that of your family, has become large enough to attract the attentions of the corporation. After a prolonged series of negotiations, this business has been bought by Capitol. Increase your Earnings by one and gain ten assets.",
                    "",
                    "Bought Out: Your business venture, or that of your family, has become large enough to attract the attentions of the corporation. After a prolonged series of negotiations, this business has been bought by Capitol."
                ),
                    () => {
                        character.earnings++;
                        character.assets += 10;
                    });
            case 29:
                return new CareerEventModel(new EventModel(
                    "Political Connections: You have staked your worth and reputation on the career of a particular political candidate or government issue. You attend rallies, volunteer your time promoting your candidate or cause, and donate money to provide support. You gain the politician (or a politician championing your particular cause) as an ally. You can get access to your ally in an official capacity with only twenty four hours’ notice.",
                    "",
                    "Political Connections: You have staked your worth and reputation on the career of a particular political candidate or government issue. You attend rallies, volunteer your time promoting your candidate or cause, and donate money to provide support. You gain the politician (or a politician championing your particular cause) as an ally. You can get access to your ally in an official capacity with only twenty four hours’ notice."
                ),
                    () => { });
            case 30:
                return new CareerEventModel(new EventModel(
                    "Propaganda Star: You were chosen as the face of Capitol for a recent campaign, representative of the ‘True Spirit of Freedom’. As a result you are now famous, which is great unless you do not want to be constantly recognised. Increase your Fame by two.",
                    "",
                    "Propaganda Star: You were chosen as the face of Capitol for a recent campaign, representative of the ‘True Spirit of Freedom’. As a result you are now famous, which is great unless you do not want to be constantly recognised."
                ),
                    () => { character.fame += 2; });
            case 31:
                return new CareerEventModel(new EventModel(
                    "Suspicious Find: You stumbled on a mysteriously empty criminal or Heretic hideout, and found something there before you left. What was it? Gain an item worth five assets. The item is distinctive and missed by its owner. Gain an enemy in a Heretic cult or criminal gang.",
                    "",
                    "Suspicious Find: You stumbled on a mysteriously empty criminal or Heretic hideout, and found something there before you left. What was it? Gain an item worth five assets. The item is distinctive and missed by its owner. Gain an enemy in a Heretic cult or criminal gang."
                ),
                    () => { });
            case 32:
                return new CareerEventModel(new EventModel(
                    "Lucky Find: You stumbled upon a rare or unique item that had been lost. What is it? You have an item worth fifteen assets.",
                    "",
                    "Lucky Find: You stumbled upon a rare or unique item that had been lost. What is it? You have an item worth fifteen assets."
                ),
                    () => { });
            case 33:
                return new CareerEventModel(new EventModel(
                    "Inheritor: A relative you never knew you had left everything to you in his will and now you have inherited a modest fortune. Increase your Earnings Rating by one, and gain five assets.",
                    "",
                    "Inheritor: A relative you never knew you had left everything to you in his will and now you have inherited a modest fortune."
                ),
                    () => {
                        character.earnings++;
                        character.assets += 5;
                    });
            case 34:
                return new CareerEventModel(new EventModel(
                    "VIP Access: You have gained certain privileges with a major sporting franchise, and it has granted you the use of a private box where you can entertain important guests. You increase your Fame by one, and gain the management of a major sports franchise as an ally. You may use one of the private boxes – with a buffet provided – to host meetings, gaining one bonus Momentum on Persuade tests made in the box due to the displays of luxury and power.",
                    "",
                    "VIP Access: You have gained certain privileges with a major sporting franchise, and it has granted you the use of a private box where you can entertain important guests. Gain the management of a major sports franchise as an ally. You may use one of the private boxes – with a buffet provided – to host meetings, gaining one bonus Momentum on Persuade tests made in the box due to the displays of luxury and power."
                ),
                    () => { character.fame++; });
            case 35:
                return new CareerEventModel(new EventModel(
                    "Cartel Appointment: You have been called to serve as a consultant to some division of the Cartel, giving you considerable access to the other corporations, and many opportunities for insight into foreign cultures. You may reduce the difficulty of Education tests by one when dealing with information about other corporations.",
                    "",
                    "Cartel Appointment: You have been called to serve as a consultant to some division of the Cartel, giving you considerable access to the other corporations, and many opportunities for insight into foreign cultures. You may reduce the difficulty of Education tests by one when dealing with information about other corporations."
                ),
                    () => { });
            case 36:
                return new CareerEventModel(new EventModel(
                    "Distinguished Career: Your work draws a lot of favourable attention, and your face is seen on posters, newspapers, and television screens across Capitolian Holdings. Increase your Fame by three.",
                    "",
                    "Distinguished Career: Your work draws a lot of favourable attention, and your face is seen on posters, newspapers, and television screens across Capitolian Holdings."
                ),
                    () => { character.fame += 3; });
            case 37:
                return new CareerEventModel(new EventModel(
                    "Maimed in service: You suffered a serious injury in the line of duty. Your determination to continue on has increased, but you are less able than you once were. All movement-related skill tests increase their difficulty by one step, but all Willpower tests reduce their difficulty by one step. Treatment to remove the penalty to movement-related skill tests costs fifty assets.",
                    "",
                    "Maimed in service: You suffered a serious injury in the line of duty. Your determination to continue on has increased, but you are less able than you once were. All movement-related skill tests increase their difficulty by one step, but all Willpower tests reduce their difficulty by one step. Treatment to remove the penalty to movement-related skill tests costs fifty assets."
                ),
                    () => { });
            case 38:
                return new CareerEventModel(new EventModel(
                    "Military Contract: Your family business has taken up a contract with the military, shifting its priorities but also greatly increasing its profits and portfolio. Increase your Earnings Rating by one, and gain an ally in the military.",
                    "",
                    "Military Contract: Your family business has taken up a contract with the military, shifting its priorities but also greatly increasing its profits and portfolio. Gain an ally in the military"
                ),
                    () => { character.earnings++; });
            case 39:
                return new CareerEventModel(new EventModel(
                    "Startling Nightmares: You have recurring dreams relating to a traumatic event in your past. Nightmarish or benevolent, you often must take time to distinguish dream from real events when you awake.",
                    "Vivid Dreams",
                    "Startling Nightmares: You have recurring dreams relating to a traumatic event in your past. Nightmarish or benevolent, you often must take time to distinguish dream from real events when you awake."
                ),
                    () => { });
            case 40:
                return new CareerEventModel(new EventModel(
                    "Audience with the President: You have distinguished yourself sufficiently that you receive an audience with the corporation’s president. Your face and your deeds are broadcast across Capitol’s holdings, and you are hailed as one of the paragons of your generation. Increase your Fame by three and Earnings by one.",
                    "",
                    "Audience with the President: You have distinguished yourself sufficiently that you receive an audience with the corporation’s president. Your face and your deeds are broadcast across Capitol’s holdings, and you are hailed as one of the paragons of your generation."
                ),
                    () => {
                        character.fame += 3;
                        character.earnings++;
                    });
        }
    }
}

export const CapitolCareerEvents = new CareerEventsCapitol();