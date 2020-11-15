import {character} from '../common/character';
import {EventModel, AdolescenceEventModel} from '../common/eventModel';
import {Faction, FactionsHelper} from './factions';
import {PrimaryCareer, PrimaryCareersHelper} from'./primaryCareers';
import {StatusHelper} from './status';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {TalentsHelper} from './talents';
import { Source } from './sources';
import { MutationsHelper } from './mutations';

class AdolescenceEventsWhitestar {
    generateEvent(roll: number): AdolescenceEventModel {
        switch (roll) {
            case 2:
                return new AdolescenceEventModel(new EventModel(
                    "Whether through association with others or the simple fact that you are tardy, you have been labelled with one of the worst crimes possible within Whitestar society: freeloading. You are at odds with the state, and you may only enter the Skiver Primary Career, unless you freely select the Criminal Primary Career or Nameless Iconic Career at the start of your first Career Phase.",
                    "Freeloader",
                    "Whether through association with others or the simple fact that you are tardy, you have been labelled with one of the worst crimes possible within Whitestar society: freeloading."
                ));
            case 3:
                return new AdolescenceEventModel(new EventModel(
                    "Your immediate family have somehow discredited themselves with the Federation. Perhaps they withheld some lost tech or took part in some form of production that was never intended to benefit Whitestar. Regardless, just mentioning your surname can cause others to close up. You increase the Repercussion range of all Persuade, Lifestyle, and Command tests by one step during social situations with your own faction. However, necessity means that you may re-roll one d20 on any Survival or Thievery test you attempt.",
                    "Considered a Capitalist",
                    "You increase the Repercussion range of all Persuade, Lifestyle, and Command tests by one step during social situations with your own faction. However, necessity means that you may re-roll one d20 on any Survival or Thievery test you attempt."
                ));
            case 4:
                return new AdolescenceEventModel(new EventModel(
                    "There’s something odd you can do, nothing much, just… weird. What is it, why are you afraid of showing people what you can do? What strange little thing can you do? It should not provide any Skill benefit and will make Command, Lifestyle, and Persuade tests more difficult by one step if people see you do it.",
                    "Mutation",
                    "Your mutation does not provide any Skill benefit and will make Command, Lifestyle, and Persuade tests more difficult by one step if people see you do it."
                ));
            case 5:
                return new AdolescenceEventModel(new EventModel(
                    "Your family gave you up to adoption in accordance with the Tsarina’s Will. You have been raised to perform your duty, defend the Federation at all costs, and never question the role that you have been allotted, but shouldn’t there be more to life? If you do not have the Teenage Draft, Military Academy, or Officer Training education, you must enter the Stronghold Defence Volunteer Cadre. Further, you may always choose to enter a Military career for free. However, your resentment reduces your Corruption Soak by one.",
                    "Unwanted Heritage",
                    "Your family gave you up to adoption in accordance with the Tsarina’s Will. Your resentment reduces your Corruption Soak by one."
                ),
                    () => {
                        PrimaryCareersHelper.getMilitaryCareers().forEach(c => {
                            character.addFreeCareer(c);
                        });
                    });
            case 6:
                return new AdolescenceEventModel(new EventModel(
                    "You just don’t know when to say no. Command and Persuade tests against you receive one bonus Momentum, but your openness to opportunity has paid off. Gain one asset.",
                    "Weak Willed",
                    "You just don’t know when to say no. Command and Persuade tests against you receive one bonus Momentum."
                ),
                    () => {
                        character.assets++;
                    });
            case 7: {
                var faction = FactionsHelper.generateHeritage();
                var name = FactionsHelper.getFaction(faction).name;

                return new AdolescenceEventModel(new EventModel(
                    `Something has been handed down through your family for generations, and your ancestors have fought hard to hide it from the state. What is it, why is it so important, and why must it be kept hidden? You gain a pre-Exodus artefact worth five assets that is coveted by others and unique in some way. Gain an enemy in ${name} who is aware of the artefact.`,
                    "Pre-Exodus Possession",
                    `You gain a pre-Exodus artefact worth five assets that is coveted by others and unique in some way. Gain an enemy in ${name} who is aware of the artefact.`
                ));
            }
            case 8:
                return new AdolescenceEventModel(new EventModel(
                    "You are scrawny and lacking in strength. Reduce your Serious Wounds by one and increase your Critical Wounds by one.",
                    "You Feel Every Punch",
                    "You are scrawny and lacking in strength."
                ),
                    () => {
                        character.seriousWoundsIncrease--;
                        character.criticalWoundsIncrease++;
                    });
            case 9:
                return new AdolescenceEventModel(new EventModel(
                    "You were a hard-working citizen who excelled in the requirements of a particular role. Despite this, you were selected for a role that provided you with little to no opportunity to contribute effectively using your natural talents, leaving you with the feeling that the state owes you something for the time lost. One of your Mandatory Skill choices may also be chosen as an Elective Skill choice during your Education. Alternatively, gain five assets earned from your early contribution. Social tests with Commissioners are increased by one difficulty; after all, it is they who chose the wrong career path for you.",
                    "Bitter",
                    "Social tests with Commissioners are increased by one difficulty; after all, it is they who chose the wrong career path for you.",
                    [
                        "Select Mandatory Skill as Elective Skill",
                        "+5 Assets"
                    ],
                    (option) => {
                        if (option.indexOf("Assets") !== -1) {
                            character.assets += 5;
                        }
                        else {
                            character.educationMandatoryAsElective = true;
                        }
                    }
                ));
            case 10:
                return new AdolescenceEventModel(new EventModel(
                    "Dim-witted. When you attempt a Willpower test against mental assault, you reduce the difficulty by one (to a minimum of one), but you always act last in action scenes (after all NPCs have acted) unless you pay one Dark Symmetry point.",
                    "Slow to React",
                    "When you attempt a Willpower test against mental assault, you reduce the difficulty by one (to a minimum of one), but you always act last in action scenes (after all NPCs have acted) unless you pay one Dark Symmetry point."
                ));
            case 11: {
                var years = Math.floor(Math.random() * 6) + 1;

                return new AdolescenceEventModel(new EventModel(
                    `As a young adult you committed a serious crime and spent some years in the Ore Pits of Zlogora. Add ${years} to your age and gain a criminal record.`,
                    "Criminal Record",
                    "As a young adult you committed a serious crime and spent some years in the Ore Pits of Zlogora."
                ),
                    () => {
                        character.age += years;
                        character.applyCriminalRecord();
                    });
            }
            case 12: {
                var assets = Math.floor(Math.random() * 6) + 1;

                return new AdolescenceEventModel(new EventModel(
                    `You were raised in a state orphanage. You often wonder who your parents might have been, and why they couldn’t take care of you themselves. Reduce your Earnings Rating by one, to a minimum of one. However, gain ${assets} assets at the age of 20 from gifts bequeathed to you by the Federation.`,
                    "Orphaned",
                    "You were raised in a state orphanage. You often wonder who your parents might have been, and why they couldn’t take care of you themselves."
                ),
                    () => {
                        character.earnings = Math.max(character.earnings - 1, 1);
                        character.setAssetsTrigger(assets, 20);
                    });
            }
            case 13:
                return new AdolescenceEventModel(new EventModel(
                    "You possess a degree of self-confidence that borders on the unbearably arrogant. You gain one bonus Momentum on all Willpower tests, but you increase the Repercussion range of all Persuade tests by one.",
                    "Big Headed",
                    "You gain one bonus Momentum on all Willpower tests, but you increase the Repercussion range of all Persuade tests by one."
                ));
            case 14:
                return new AdolescenceEventModel(new EventModel(
                    "You lost faith at an early age following a personal tragedy in your life. You were chastised for your lack of faith but have never found any reason to accept blind faith. You constantly question the meaning of life and are always searching for the answers to the cosmos. You gain one bonus Momentum on Insight tests, but your unfocussed will increases the Repercussion of all Willpower tests by one.",
                    "Agnostic",
                    "You gain one bonus Momentum on Insight tests, but your unfocussed will increases the Repercussion of all Willpower tests by one."
                ));
            case 15:
                return new AdolescenceEventModel(new EventModel(
                    "You are wanted for a minor crime you committed as a youth, for which the authorities have yet to apprehend you. Add one to the Repercussion range of all Persuade tests when dealing with Law Enforcement from Whitestar.",
                    "Wanted",
                    "Add one to the Repercussion range of all Persuade tests when dealing with Law Enforcement from Whitestar."
                ));
            case 16:
                return new AdolescenceEventModel(new EventModel(
                    "You had little contact with your peers as a child. Maybe you were raised in a rural Stronghold or educated at home outside of the state sponsored system. Increase the difficulty of all Persuade tests by one step. However, due to your self-reliance, you gain two bonus Momentum on all Willpower tests.",
                    "Cloistered Upbringing",
                    "Increase the difficulty of all Persuade tests by one step. However, due to your self-reliance, you gain two bonus Momentum on all Willpower tests."
                ));
            case 17:
                return new AdolescenceEventModel(new EventModel(
                    "You have an overbearing godparent who constantly cajoles you to perform better. You may choose any Primary Career from table A, or roll for free on table B.",
                    "Annoying Family",
                    "You have an overbearing godparent who constantly cajoles you to perform better."
                ),
                    () => { character.freeBasicCareer = true; });
            case 18:
                return new AdolescenceEventModel(new EventModel(
                    "You have always suffered from serious reactions to common allergens such as pollen or milk, which has made the polluted environment outside of the Stronghold all the more dangerous. All Resistance tests to resist the effects of artificial substances have their difficulty increased by one step. Coagulant used on the character provides no bonuses.",
                    "Industrial Hay Fever",
                    "All Resistance tests to resist the effects of artificial substances have their difficulty increased by one step. Coagulant used on the character provides no bonuses."
                ));
            case 19:
                return new AdolescenceEventModel(new EventModel(
                    "Your family has historic connections with the one crime organisation that is never discussed. You may freely choose the Criminal Primary Career. You are often a suspect in police enquiries and all Command and Persuade tests that involve police or security services increase in difficulty by one step. You gain a favour in a criminal organisation.",
                    "Connected to Criminals",
                    "You are often a suspect in police enquiries and all Command and Persuade tests that involve police or security services increase in difficulty by one step. You gain a favour in a criminal organisation."
                ),
                    () => {
                        character.addFreeCareer(PrimaryCareer.Criminal);
                    });
            case 20:
                return new AdolescenceEventModel(new EventModel(
                    "Although the state teaches that every citizen labours for the benefit of the entire Federation, and that a buoyant state evenly redistributes its wealth for all to enjoy, you believe that true steps to success can be achieved by currying favour with the right people. Your fawning and obsequiousness have gained you a counsellor as an ally. However, your unethical contempt means that you increase the difficulty of all Persuade tests made to deal with anyone not of noble birth (regardless of corporation).",
                    "Snob",
                    "You increase the difficulty of all Persuade tests made to deal with anyone not of noble birth (regardless of corporation)."
                ));
            case 21:
                return new AdolescenceEventModel(new EventModel(
                    "You'll believe everything. Illusions seldom cause confusion. You either believe them, or you do not. All tests to deceive you with an illusion increase in difficulty by one step, but if they succeed, they last twice as long.",
                    "Naïve",
                    "All tests to deceive you with an illusion increase in difficulty by one step, but if they succeed, they last twice as long."
                ));
            case 22:
                return new AdolescenceEventModel(new EventModel(
                    "Your free time is spent largely in prayer and contemplation. You regularly attend services at the cathedral and can list the names and deeds of every Primate of the Zoglorian Orthodox Church there has ever been. Increase your Corruption Soak by one, and re-roll one d20 on Education tests that pertain to Brotherhood history.",
                    "Pious",
                    "Increase your Corruption Soak by one, and re-roll one d20 on Education tests that pertain to Brotherhood history."
                ));
            case 23:
                return new AdolescenceEventModel(new EventModel(
                    "Having spent your childhood within the confines of a hospital, you seek always to escape it. You felt weak, vulnerable and powerless, beholden to someone else’s care whilst knowing, but not accepting, it was “for your own good”. You dislike hospitals, and must attempt an Average D1 Willpower test or suffer one Dread when entering one.",
                    "Childhood Illness",
                    "You dislike hospitals, and must attempt an Average D1 Willpower test or suffer one Dread when entering one."
                ));
            case 24:
                return new AdolescenceEventModel(new EventModel(
                    "During your state schooling you cultivated many interests, but found it hard to concentrate on any particular field of expertise. Your Signature Skills may only be trained up to four ranks of Expertise and Focus, rather than five. However, you ignore all penalties for being untrained in a skill.",
                    "Dilettante",
                    "Your Signature Skills may only be trained up to four ranks of Expertise and Focus, rather than five. However, you ignore all penalties for being untrained in a skill."
                ),
                    () => {
                        character.decreaseSignatureCap = true;
                    });
            case 25:
                return new AdolescenceEventModel(new EventModel(
                    "You once experienced a sudden trauma, like witnessing a death, or suffering an accident or an assault. It is sometimes difficult to take your mind off it. Sometimes you vividly relive the experience as if it is happening again. If you fail a Willpower test against mental assault, add +2[DS] to the dice rolled to determine mental damage.",
                    "PTSD",
                    "If you fail a Willpower test against mental assault, add +2[DS] to the dice rolled to determine mental damage."
                ));
            case 26:
                return new AdolescenceEventModel(new EventModel(
                    "You are a gifted student, and your theories have brought you to the attention of a leading scientist. Gain a conflict with your own faction, as you are perceived to be cheating the system. You have a great contact from an educational institution within one of the Core Strongholds and may freely choose the Academic Primary Career.",
                    "Contention",
                    "Gain a conflict with your own faction, as you are perceived to be cheating the system. You have a great contact from an educational institution within one of the Core Strongholds."
                ),
                    () => {
                        character.addFreeCareer(PrimaryCareer.AcademicResearcher);
                    });
            case 27:
                return new AdolescenceEventModel(new EventModel(
                    "You have always been naturally good at helping people relate. Throughout your troubled past you’ve always been able to help people reach a common ground, even if just for that brief moment in time. When attempting to prevent or defuse conflict, you may re-roll one d20 on Command and Persuade tests.",
                    "Mediator",
                    "When attempting to prevent or defuse conflict, you may re-roll one d20 on Command and Persuade tests."
                ));
            case 28:
                return new AdolescenceEventModel(new EventModel(
                    "Fierce fighting against a mutant tribe found its way onto the streets of your Stronghold. You willingly picked up a weapon once the call went out, though you never quite brought yourself round to handing it back. You begin play with an Iron Hand Autopistol. This weapon has been registered as stolen or missing however, and questions will certainly be asked if it is discovered in your possession by the authorities.",
                    "Gun Fanatic",
                    "Fierce fighting against a mutant tribe found its way onto the streets of your Stronghold. You willingly picked up a weapon once the call went out, though you never quite brought yourself round to handing it back."
                ),
                    () => {
                        character.addEquipment("Iron Hand Autopistol");
                    });
            case 29:
                return new AdolescenceEventModel(new EventModel(
                    "Pointing out the flaws in the thinking of others is a passion of yours. It is not always appreciated. You gain one bonus Momentum on Insight and Observation tests made when attempting to evaluate another person. However, you increase the difficulty of Persuade tests by one step due to your off-putting manner.",
                    "Gadfly",
                    "You gain one bonus Momentum on Insight and Observation tests made when attempting to evaluate another person. However, you increase the difficulty of Persuade tests by one step due to your off-putting manner."
                ));
            case 30:
                return new AdolescenceEventModel(new EventModel(
                    "In life you always get what you want. Period. You have a clear vision and that’s about Number One: You. People do what you want, or should fear the consequence if they don’t. You may re-roll one d20 on any Command or Lifestyle test. However, your high expectations and self-important manner increase the repercussion range of all Persuade tests you attempt by two.",
                    "Spoiled Brat",
                    "You may re-roll one d20 on any Command or Lifestyle test. However, your high expectations and self-important manner increase the repercussion range of all Persuade tests you attempt by two."
                ));
            case 31:
                return new AdolescenceEventModel(new EventModel(
                    "You spent a lot of time with the wrong people, either due to a rebellious streak or circumstances at home. Or, you could simply not have had a lot of options. Your friends taught you how to survive on the street, how to steal, beg, rob or other ‘useful life lessons’. You may or may not have cut your ties with your old associates, but they surely remember you. Even if they don’t, the law certainly does. You are comfortable around low-lives and know how to communicate with them. Gain one bonus Momentum on all Command or Persuade tests when dealing with criminals and black market connections. Alternately, gain a single contact in a criminal organisation.",
                    "Bad Company",
                    "",
                    [
                        "Bonus momentum",
                        "Contact in criminal organisation"
                    ],
                    (option) => {
                        if (option === "Bonus momentum") {
                            character.adolescenceEvent.effect = "Gain one bonus Momentum on all Command or Persuade tests when dealing with criminals and black market connections.";
                        }
                        else {
                            character.adolescenceEvent.effect = "You have a contact in a criminal organisation.";
                        }
                    }
                ));
            case 32:
                return new AdolescenceEventModel(new EventModel(
                    "A period of your youth was spent foraging above ground using the domesticated animals that your Stronghold has bred to assist with this task. You no longer suffer the untrained penalty for the Animal Handling and Survival skills. If you are trained in those skills, you may re-roll a single d20 on any test involving them.",
                    "Nature's Ally",
                    "You no longer suffer the untrained penalty for the Animal Handling and Survival skills. If you are trained in those skills, you may re-roll a single d20 on any test involving them."
                ));
            case 33:
                return new AdolescenceEventModel(new EventModel(
                    "You have become addicted to the sweets and candies of the corporations, despite the fact that they are categorised as contraband. Overindulgence has left you overweight and somewhat unhealthy – increase the Repercussion range of all Acrobatics tests you attempt by one. However, you’re seldom without something sweet on your person, which allows you to re-roll one d20 on Persuade tests if you offer someone a sweet.",
                    "Candy Addict",
                    "Increase the Repercussion range of all Acrobatics tests you attempt by one. However, you’re seldom without something sweet on your person, which allows you to re-roll one d20 on Persuade tests if you offer someone a sweet."
                ));
            case 34:
                return new AdolescenceEventModel(new EventModel(
                    "Your body is very resistant to artificial substances and it takes a lot to make you intoxicated. All Resistance tests against artificial substances have their difficulty reduced by one step, to a minimum of one.",
                    "Extraordinary Chemical Tolerance",
                    "All Resistance tests against artificial substances have their difficulty reduced by one step, to a minimum of one."
                ));
            case 35:
                return new AdolescenceEventModel(new EventModel(
                    "You’ve been described as mercenary, but to you, money talks. There is always a clarity to any decision you make when money is involved, and few boundaries you are not willing to cross for it. When you apply cash to purchasing an acquisition, you may re-roll as few or as many [DS] as you wish.",
                    "Greed",
                    "When you apply cash to purchasing an acquisition, you may re-roll as few or as many [DS] as you wish."
                ));
            case 36:
                return new AdolescenceEventModel(new EventModel(
                    "Whether by accident or design, you survived a period of time outside of the Stronghold in your youth. Despite nearly ending your life, the experience has hardened your endurance. You may re-roll one d20 when dealing with extremely low temperatures, and gain one extra Momentum from Resistance tests made to resist environmental effects.",
                    "Brush with Purgatory",
                    "You may re-roll one d20 when dealing with extremely low temperatures, and gain one extra Momentum from Resistance tests made to resist environmental effects."
                ));
            case 37:
                return new AdolescenceEventModel(new EventModel(
                    "With a ‘glass half empty’ approach to life you are simply someone who thrives on being right when things go wrong. You’re seldom surprised when things go badly, so whenever you generate a Repercussion, the GM only adds one Dark Symmetry point to the pool instead of two.",
                    "Life is for Living",
                    "Whenever you generate a Repercussion, the GM only adds one Dark Symmetry point to the pool instead of two."
                ));
            case 38: {
                var t = [];

                if (character.hasSource(Source.Mutants)) {
                    t.push(...MutationsHelper.generateLesserPower().map(p => { return MutationsHelper.getMutation(p).name; }));
                }
                else {
                    t.push(...TalentsHelper.getTopTalents());
                }

                return new AdolescenceEventModel(new EventModel(
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
            case 39:
                return new AdolescenceEventModel(new EventModel(
                    "Your education was different. It was your parents style of teaching that has given you a perspective and understanding that isn’t conventional. You feel educated in most things but on occasions you have a ‘way of thinking’ that naturally stands you out from the crowd. You increase the Repercussion range of all Education and Sciences tests by two, due to your unconventional education. However, for each d20 on an Education or Sciences test that rolls a natural 1, you generate one additional success, as your odd approach reaches an insightful conclusion.",
                    "Bad Education",
                    "You increase the Repercussion range of all Education and Sciences tests by two, due to your unconventional education. However, for each d20 on an Education or Sciences test that rolls a natural 1, you generate one additional success, as your odd approach reaches an insightful conclusion."
                ));
            case 40: {
                var t = [];

                if (character.hasSource(Source.Mutants)) {
                    t.push(...MutationsHelper.generateLesserPower().map(p => { return MutationsHelper.getMutation(p).name; }));
                }
                else {
                    t.push(...TalentsHelper.getTopTalents());
                }

                return new AdolescenceEventModel(new EventModel(
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
            }
        }
    }
}

export const WhitestarAdolescenceEvents = new AdolescenceEventsWhitestar();