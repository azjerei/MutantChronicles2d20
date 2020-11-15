import {character} from '../common/character';
import {EventModel, CareerEventModel} from '../common/eventModel';
import {Faction, FactionsHelper} from './factions';
import {PrimaryCareer, PrimaryCareersHelper} from'./primaryCareers';
import {StatusHelper} from './status';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {TalentsHelper} from './talents';

class CareerEventsBauhaus {
    generateEvent(roll: number): CareerEventModel {
        switch (roll) {
            case 2:
                return new CareerEventModel(new EventModel(
                    "Disabling Disease. You contract a wasting disease. The treatment will cost fifty assets and until then you count as having wounds equal to one level lower on the Starting Wounds Table.",
                    "",
                    "You contract a wasting disease. The treatment will cost fifty assets and until then you count as having wounds equal to one level lower on the Starting Wounds Table."
                ),
                () => { character.woundsBonus--; });
            case 3:
                return new CareerEventModel(new EventModel(
                    "You may not know why this occurred, you may not even know that it has occurred, but somewhere someone in a Secret Order harbours a significant enmity against you.",
                    "Hidden Enemy",
                    "You have an enemy in a Secret Order."
                ));
            case 4:
                return new CareerEventModel(new EventModel(
                    "You’re on the run, who’s after you, and why? Gain an enemy in a Heretic cult, or the Brotherhood, or a Corporate Authority.",
                    "",
                    "You’re on the run, who’s after you, and why? ",
					[
						"Heretic cult",
						"Brotherhood",
						"Corporate Authority"
					],
                    (option) => {
                        const the = option.indexOf("Brotherhood") > -1 ? "the" : "a";
                        character.careerEvents[character.careerEvents.length - 1].effect += `You have an enemy in ${the} ${option}.`;
					}
                ));
            case 5:
                return new CareerEventModel(new EventModel(
                    "Barred from an Order – due to some regrettable foolishness on your part – an Order that you once belonged to make the decision to bar you. Members of the order in question regard you as a disgrace. Gain an enemy in a single Order related to your career. You lose a single promotion (if you possess any).",
                    "",
                    "You have an enemy in a single Order related to your career."
                ),
				() => { character.superPoints = Math.max(0, character.superPoints - 1); });
            case 6:
                return new CareerEventModel(new EventModel(
                    "You once unwittingly assisted forgers in duplicating products bearing the cogwheel. The Ministry of Fair Trade would very much like to subject you to torturous interrogations in regard to this crime.",
                    "Under Inquiries",
                    "You once unwittingly assisted forgers in duplicating products bearing the cogwheel. The Ministry of Fair Trade would very much like to subject you to torturous interrogations in regard to this crime."
                ));
            case 7:
                return new CareerEventModel(new EventModel(
                    "You were once accused of a serious crime. Fortunately for you, the Magistrate involved in the subsequent investigation did not deem you worthy of conviction. However, it did throw your career into chaos. You are Fired.",
                    "",
                    "You were once accused of a serious crime. Fortunately for you, the Magistrate involved in the subsequent investigation did not deem you worthy of conviction. However, it did throw your career into chaos.",
                    [],
                    () => { },
                    "Fired"
                ));
            case 8: {
                let faction = FactionsHelper.generateHeritage();
                while (faction === Faction.Bauhaus) {
                    faction = FactionsHelper.generateHeritage();
                }

                const factionName = FactionsHelper.getFaction(faction).name;

                return new CareerEventModel(new EventModel(
                    `During your career you beat a business from a rival corporation to a major deal, making a lifelong enemy of their CEO in the process. Gain an enemy in the ${factionName} corporation.`,
                    "",
                    `You have an enemy in the ${factionName} corporation.`
                ));
			}
            case 9:
                return new CareerEventModel(new EventModel(
                    "Somebody that you treated poorly in the past, an ex-lover or someone who depended on your friendship, has recently had a streak of good fortune, and may be out for revenge. Gain an enemy – the person you’ve treated poorly. You can try and repair your relationship, but it won’t be easy.",
                    "",
                    "Gain an enemy – a person you’ve treated poorly. You can try and repair your relationship, but it won’t be easy."
                ));
            case 10:
                return new CareerEventModel(new EventModel(
                    "You were called in for questioning by the authorities, what did they want to know? They let you go, but on what condition? You owe a favour to someone in the Ministry of Faith or the Brotherhood.",
                    "",
                    "",
					[
						"Ministry of Faith",
						"Brotherhood"
					],
					(option) => {
                        character.careerEvents[character.careerEvents.length - 1].effect = `You owe a favour to someone in the ${option}.`;
					}
                ));
            case 11:
                return new CareerEventModel(new EventModel(
                    "Your name was mentioned in connection with a criminal act and recorded with BLEU and security databases. You lost your job as a result. You are Fired, and may not continue in this Primary Career. Gain a Criminal Record.",
                    "",
                    "Your name was mentioned in connection with a criminal act and recorded with BLEU and security databases. You lost your job as a result."
                ),
				() => {
					character.applyCriminalRecord();

                    const career = character.careers[character.careers.length - 1];
                    if (career.isIconic) {
                        character.addProhibitedIconicCareer(career.career);
                    }
                    else {
                        character.addProhibitedPrimaryCareer(career.career);
                    }
				});
            case 12:
                return new CareerEventModel(new EventModel(
                    "You have been engaged in the selling of Bauhaus trade secrets to agents from the Imperial branch of the Fieldhausen family. In order to finish the deal and secure their promise to keep your involvement secret, you must do them two further favours. You have an ally in the Imperial Clan Fieldhausen. However, you owe that ally two favours.",
                    "",
                    "You have an ally in the Imperial Clan Fieldhausen. However, you owe that ally two favours."
                ));
            case 13:
                return new CareerEventModel(new EventModel(
                    "Someone has been keeping an eye on you, they always seem to be there when you look around, what do you think they’re interested in? Who are they?",
                    "Under Surveillance",
                    "Someone has been keeping an eye on you, they always seem to be there when you look around, what do you think they’re interested in? Who are they?"
                ));
            case 14:
                return new CareerEventModel(new EventModel(
                    "You inherited shares in a Mars-based Ironworks, a Capitol concern. They aren’t worth a great deal, but could be if you saw to it that more Bauhaus companies purchased their produce. At the end of each adventure, roll a number of [DS] equal to your earnings rating; for each Dark Symmetry Icon rolled, you gain one asset, as the shares pay dividends.",
                    "",
                    "You inherited shares in a Mars-based Ironworks. At the end of each adventure, roll a number of [DS] equal to your earnings rating; for each Dark Symmetry Icon rolled, you gain one asset, as the shares pay dividends."
                ));
            case 15:
                return new CareerEventModel(new EventModel(
                    "You’re obsessed with one of the beautiful Bayer-Hrothgars, a toothsome minor media star you once worked alongside. You dream about their dazzling smile and pulchritudinous figure. Oh it’ll never happen; you move in different worlds now. But you just can’t stop thinking about them.",
                    "Impossible Infatuation",
                    "You’re obsessed with one of the beautiful Bayer-Hrothgars. Your obsession leaves to easily tempted, reducing your Corruption Soak by one."
                ));
            case 16:
                return new CareerEventModel(new EventModel(
                    "Someone you know is a Heretic (or Criminal) but you can’t turn him or her in – what hold do they have over you?",
                    "Blackmailed",
                    "Someone you know is a Heretic (or Criminal) but you can’t turn him or her in – what hold do they have over you?"
                ));
            case 17:
                return new CareerEventModel(new EventModel(
                    "You have had a number of dealings with Cybertronic. This had led to you networking to positive effect with a number of people in the corporation. However, it has also alienated you from the more pious citizens of Bauhaus. You have an ally in Cybertronic. However, you also have an enemy in either the Ministry of Faith or the Brotherhood.",
                    "",
                    "You have an ally in Cybertronic. ",
					[
						"Ministry of Faith",
						"Brotherhood"
					],
					(option) => {
                        character.careerEvents[character.careerEvents.length - 1].effect += `You have an enemy in the ${option}.`;
					}
                ));
            case 18:
                return new CareerEventModel(new EventModel(
                    "Lost in the Jungle – you were one of the few survivors when an expedition into the Venusian Jungles encountered difficulties and lost their way before being rescued. Add one year to your age.",
                    "Jungle Nightmares",
                    "Lost in the Jungle – you were one of the few survivors when an expedition into the Venusian Jungles encountered difficulties and lost their way before being rescued."
                ),
				() => {
					character.age++;
				});
            case 19:
                return new CareerEventModel(new EventModel(
                    "Under a cloak of secrecy, you volunteered to take part in a secret medical experiment with House Salvatore. It strengthened your body. Now if only you could do something about the resulting wild mood swings. You gain one additional Serious Wound and one additional Critical Wound. However, you reduce your maximum Mental Wounds by two.",
                    "",
                    "Under a cloak of secrecy, you volunteered to take part in a secret medical experiment with House Salvatore."
                ),
				() => {
					character.seriousWoundsIncrease++;
					character.criticalWoundsIncrease++;
					character.mentalWoundsIncrease -= 2;
				});
            case 20:
				// TODO: handle fired and prohibit
                return new CareerEventModel(new EventModel(
                    "You got fired!",
                    "",
                    "You got fired!"
                ));
            case 21:
                return new CareerEventModel(new EventModel(
                    "Your lover is from a higher social class. They are very wealthy and generous, but one day you know they will leave you in order to secure a better match. Increase Earnings Rating by one (to a maximum of five) whilst they are still in love with you, but they are very demanding or vulnerable.",
                    "Vulnerable Lover",
                    "Your lover is from a higher social class. They are very wealthy and generous, but one day you know they will leave you in order to secure a better match."
                ),
				() => { character.earnings = Math.min(5, character.earnings + 1); });
            case 22:
                return new CareerEventModel(new EventModel(
                    "You foiled a Heretic (or criminal) plot on your own, or with some friends, why didn’t you call in the Brotherhood (or Authorities)? Gain an enemy in a Heretic cult. Gain five assets in 'liberated equipment'.",
                    "",
                    "You foiled a Heretic (or criminal) plot on your own, or with some friends, why didn’t you call in the Brotherhood (or Authorities)? You have an enemy in a Heretic cult."
                ),
				() => { character.assets += 5; });
            case 23:
                return new CareerEventModel(new EventModel(
                    "Your work has led you to spend a lot of time assisting with Brotherhood missions and pilgrims. You have friendly contacts in the Brotherhood. You have an ally in the Brotherhood, and gain one Promotion.",
                    "",
                    "Your work has led you to spend a lot of time assisting with Brotherhood missions and pilgrims. You have friendly contacts in the Brotherhood."
                ),
				() => { character.superPoints++; });
            case 24:
                return new CareerEventModel(new EventModel(
                    "Working for House Philippe led you to join the entourage of a famous Opera Diva. You still have showbiz contacts. Your friends can find your constant name-dropping tedious. You have an ally in the media, and gain three assets.",
                    "Annoying Name-Dropping",
                    "Working for House Philippe led you to join the entourage of a famous Opera Diva. You have an ally in the media."
                ),
				() => { character.assets += 3; });
            case 25:
                return new CareerEventModel(new EventModel(
                    "A member of House Dante once humiliated you by subjecting you to a defamatory practical joke when you were performing a crucial piece of work. You have never forgiven them, and your reputation is still somewhat tarnished. Gain an enemy in House Dante (or, if a commoner, one of House Dante’s retainers). Further, you lose one Promotion (if you have any).",
                    "",
                    "A member of House Dante once humiliated you by subjecting you to a defamatory practical joke. Gain an enemy in House Dante (or, if a commoner, one of House Dante’s retainers)."
                ),
				() => { character.superPoints = Math.max(0, character.superPoints - 1); });
            case 26: {
                let faction = FactionsHelper.generateHeritage();
                if (faction === Faction.Bauhaus) {
                    faction = FactionsHelper.generateHeritage();
                }

                const factionName = FactionsHelper.getFaction(faction).name;

                return new CareerEventModel(new EventModel(
                    "You volunteered to undertake a special duty for the local Reserve forces in the hope that it would lead to opportunities a work. In reality the role has led to mixed blessings. Gain a Promotion and choose one of the options below.",
                    "",
                    "You volunteered to undertake a special duty for the local Reserve forces in the hope that it would lead to opportunities a work.",
					[
						"-1 Serious Wounds",
						"-1 Mental Wounds",
						`Enemy in ${factionName}`
					],
					(option) => {
                        if (option.indexOf("Serious") > -1) {
                            character.seriousWoundsIncrease--;
                        }
                        else if (option.indexOf("Mental") > -1) {
                            character.mentalWoundsIncrease--;
                        }
                        else {
                            character.careerEvents[character.careerEvents.length - 1].effect += ` You have an enemy in ${factionName}.`;
                        }
					}
                ));
			}
            case 27: {
                let faction = FactionsHelper.generateHeritage();
                if (faction === Faction.Bauhaus) {
                    faction = FactionsHelper.generateHeritage();
                }

                const factionName = FactionsHelper.getFaction(faction).name;

                return new CareerEventModel(new EventModel(
                    `You are a strong believer in the Cartel cause. This has won you regard with some members of other corporations, at the¨ cost of a degree of trust with fellow Homebuilders. You gain a contact in ${factionName} and a rival in Bauhaus.`,
                    "",
                    `You have a contact in ${factionName} and a rival in Bauhaus.`
                ));
			}
            case 28:
                return new CareerEventModel(new EventModel(
                    "A colleague was exposed as a Heretic and the Inquisition interviewed you about their behaviour. You decided not to tell them that you had kept your own suspicions about the man quiet. This has left you feeling paranoid about the possibility of them finding out. Gain a favour from someone in a Heretic or rebel group.",
                    "",
                    "A colleague was exposed as a Heretic and the Inquisition interviewed you about their behaviour. You decided not to tell them that you had kept your own suspicions about the man quiet. Gain a favour from someone in a Heretic or rebel group."
                ));
            case 29:
                return new CareerEventModel(new EventModel(
                    "You were implicated in a Heretic plot. Why were you involved? Why did the Brotherhood let you go? Gain a contact in the Brotherhood, or the Ministry of Faith. The contact owes you a favour.",
                    "",
                    "You were implicated in a Heretic plot. Why were you involved? Why did the Brotherhood let you go?",
					[
						"Ministry of Faith",
						"Brotherhood"
					],
					(option) => {
                        character.careerEvents[character.careerEvents.length - 1].effect += ` You have a contact in the ${option}, who owes you a favour.`;
					}
                ));
            case 30:
                return new CareerEventModel(new EventModel(
                    "You helped the BLEU to uncover an anarchist cell. A number of the members escaped but most were executed. You were rewarded for your help by the Ministry of Justice. Gain five assets for your trouble.",
                    "Snitch",
                    "You helped the BLEU to uncover an anarchist cell."
                ),
				() => { character.assets += 5; });
            case 31:
                return new CareerEventModel(new EventModel(
                    "During the course of your career you accompanied a team into the depths of an abandoned citadel. Against your better judgement you took a small metal object, some token of the Dark Legion, as a souvenir of your expedition. You still keep it, believing it to bring you good fortune. Gain an enemy in a Heretic cult. Further, the 'souvenir' grants you one additional Chronicle point. Whenever you use a Chronicle point, roll a [DS] – if a Dark Symmetry icon is rolled, the character suffers a 3[DS] Corruption Roll.",
                    "",
                    "You have acquired a small metal object from an abandoned citadel. You have an enemy in a Heretic cult. You have one additional Chronicle Point, but whenever you use a Chronicle point, roll a [DS] – if a Dark Symmetry icon is rolled, the character suffers a 3[DS] Corruption Roll."
                ),
				() => {
					character.chroniclePoints++;
				});
            case 32:
                return new CareerEventModel(new EventModel(
                    "A marketing department at your work was once tasked with producing propaganda for the Ministry of Fear. During the course of the project you made a contact within the ministry, though you feel uneasy about the nature of the work you helped produce. Gain a Promotion. However, your doubts leave you vulnerable; reduce your Corruption Soak by one.",
                    "",
                    "A marketing department at your work was once tasked with producing propaganda for the Ministry of Fear. During the course of the project you made a contact within the ministry, though you feel uneasy about the nature of the work you helped produce. You doubts reduce your Corruption soak by one."
                ),
				() => {
					character.superPoints++;
				});
            case 33:
                return new CareerEventModel(new EventModel(
                    "A noble household was impressed by a service or product that you provided for it. They have awarded you a huge gratuity for your work. Gain five assets and a Promotion.",
                    "",
                    "A noble household was impressed by a service or product that you provided for it. They have awarded you a huge gratuity for your work."
                ),
				() => {
					character.superPoints++;
					character.assets += 5;
				});
            case 34:
                return new CareerEventModel(new EventModel(
                    "During the course of your work you have been asked to keep an eye out for certain Heretical activities, and to make regular report of them to an anonymous contact. You think you are working for the Ministry of Information, but your contacts are actually members of the heretical Temple of Solar Light. Gain an ally; you believe this ally is from the Ministry of Information, but they’re actually a Heretic. In addition, gain five assets as a 'reward' for your information.",
                    "",
                    "Gain an ally; you believe this ally is from the Ministry of Information, but they’re actually a Heretic."
                ),
				() => { character.assets += 5; });
            case 35:
                return new CareerEventModel(new EventModel(
                    "You are a reluctant spy involved in counter-espionage. The Supreme Ministry of War runs the Office of Secrets. For reasons that you hardly understand they have contacted you in order to report on any activity you notice that might be linked to the Office of Information of the Diplomatic Korps of the Supreme Ministry for Industry.",
                    "",
                    "You are a reluctant spy involved in counter-espionage. Periodically during play, you will be contacted by your handler in the Office of Secrets with an assignment to observe and report upon a particular individual, or to obtain particular documents. If you succeed at this assignment, you will gain an additional 100 xp during that session."
                ));
            case 36:
                return new CareerEventModel(new EventModel(
                    "You are a minor media star with a couple of successful films or music releases to your name. People occasionally recognise you, but your career isn’t set to take off in a big way. You gain one free Momentum on successful Command, Lifestyle, and Persuade tests, but all Stealth tests increase their difficulty by one step where being recognised would cause you a problem.",
                    "",
                    "You are a minor media star. You gain one free Momentum on successful Command, Lifestyle, and Persuade tests, but all Stealth tests increase their difficulty by one step where being recognised would cause you a problem."
                ));
            case 37:
                return new CareerEventModel(new EventModel(
                    "You were disabled in a serious accident. All movement related skill tests are one difficulty harder, but you have gained a strong will. All Mental Strength tests are one difficulty lower (minimum of 1).",
                    "",
                    "You were disabled in a serious accident. All movement related skill tests are one difficulty harder, but you have gained a strong will. All Mental Strength tests are one difficulty lower (minimum of 1)."
                ));
            case 38:
                return new CareerEventModel(new EventModel(
                    "Good Negotiator – whether it’s in the boardroom, doing a deal on the streets, or talking down an armed robber you’re gifted at negotiating. All Lifestyle and Persuade tests made to negotiate reduce their difficulty by one step (minimum 0).",
                    "",
                    "Good Negotiator. All Lifestyle and Persuade tests made to negotiate reduce their difficulty by one step (minimum 0)."
                ));
            case 39:
                return new CareerEventModel(new EventModel(
                    "You’re harbouring an AI system, perhaps in a childhood toy. The AI is strongly degraded. You grew up with it and can’t bear to part with it. Gain an item worth five assets that houses the AI. The AI provides one Momentum to Education tests so long as the characters can freely converse with it.",
                    "",
                    "Gain an item worth five assets that houses an AI. The AI provides one Momentum to Education tests so long as the characters can freely converse with it."
                ));
            case 40:
                return new CareerEventModel(new EventModel(
                    "Major career success. You have been incredibly successful in this career path. Increase your Earnings Rating by one, and gain two Promotions.",
                    "",
                    "Major career success."
                ),
				() => {
					character.earnings++;
					character.superPoints += 2;
				});
        }
    }
}

export const BauhausCareerEvents = new CareerEventsBauhaus();