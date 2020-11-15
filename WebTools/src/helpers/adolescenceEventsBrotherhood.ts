import {character} from '../common/character';
import {EventModel, AdolescenceEventModel} from '../common/eventModel';
import {Faction, FactionsHelper} from './factions';
import {PrimaryCareer, PrimaryCareersHelper} from'./primaryCareers';
import {IconicCareer} from './iconicCareers';
import {StatusHelper} from './status';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {TalentsHelper} from './talents';
import { Source } from './sources';
import { MutationsHelper } from './mutations';

class AdolescenceEventsBrotherhood {
    generateEvent(roll: number): AdolescenceEventModel {
        switch (roll) {
            case 2: {
                const age = Math.floor(Math.random() * 6) + 4;
                return new AdolescenceEventModel(new EventModel(
                    "Mortal Sin: You have been accused of a heinous sin against the Cardinal and the Brotherhood. Guilty or not, you are poorly-regarded by your brethren, and have encountered first-hand the brutal side of the Brotherhood. Your name is infamous amongst the Brotherhood hierarchy, and you spent a considerable amount of time under severe scrutiny. You age increases by ${age}.",
                    "Shadow of Guilt",
                    "Your name is infamous amongst the Brotherhood hierarchy, and you spent a considerable amount of time under severe scrutiny."
                ),
                () => {
                    character.age += age;
                });
            }
            case 3: {
                return new AdolescenceEventModel(new EventModel(
                    "Disabled: An accident or injury in your childhood almost crippled you. All movement related skill tests are one difficulty  level harder, but you have gained a strong will. All Mental Strength tests are one difficulty lower (minimum one). You may not enter any Second Directorate careers.",
                    "Physically Impaired",
                    "All movement related skill tests are one difficulty  level harder, but you have gained a strong will. All Mental Strength tests are one difficulty lower (minimum one)."
                ),
                () => {
                    [PrimaryCareer.BrotherhoodTrooper, PrimaryCareer.Paladin, PrimaryCareer.Qualifier, PrimaryCareer.Archangel, PrimaryCareer.Valkyrie].forEach(c => {
                        character.addProhibitedPrimaryCareer(c);
                    });

                    [IconicCareer.Revisor, IconicCareer.SacredWarrior, IconicCareer.BrotherhoodEliteTrooper, IconicCareer.Archon, IconicCareer.Vestal, IconicCareer.Crucifier].forEach(c => {
                        character.addProhibitedIconicCareer(c);
                    });
                });
            }
            case 4:
                return new AdolescenceEventModel(new EventModel(
                    "Faint-Hearted: When confronted with peril, you often feel faint. Increase the difficulty of all Willpower tests against mental assault. You may not take any Brotherhood career from the First or Second Directorates.",
                    "Nervous",
                    "Increase the difficulty of all Willpower tests against mental assault."
                ),
                () => {
                    [PrimaryCareer.PilgrimProtector, PrimaryCareer.PilgrimScholar, PrimaryCareer.PilgrimMachinist,
                     PrimaryCareer.BrotherhoodTrooper, PrimaryCareer.Paladin, PrimaryCareer.Qualifier, PrimaryCareer.Archangel, PrimaryCareer.Valkyrie].forEach(c => {
                        character.addProhibitedPrimaryCareer(c);
                    });

                    [IconicCareer.WarriorMystic, IconicCareer.HealerMystic, IconicCareer.InterrogatorMystic, IconicCareer.LiaisonMystic, IconicCareer.SeerMystic,
                     IconicCareer.PilgrimResonator, IconicCareer.PilgrimSentinel,
                     IconicCareer.Revisor, IconicCareer.SacredWarrior, IconicCareer.BrotherhoodEliteTrooper, IconicCareer.Archon, IconicCareer.Vestal, IconicCareer.Crucifier].forEach(c => {
                        character.addProhibitedIconicCareer(c);
                    });
                });
            case 5:
                return new AdolescenceEventModel(new EventModel(
                    "Venial Sin: You have been accused of a minor transgression against the Brotherhood. Although your conscience may be clear, your record has been blemished and you must make amends. Your name is ill-regarded by your superiors, and your penance was a difficult time in your life. You increase your age by two.",
                    "Poorly-Regarded",
                    "Your name is ill-regarded by your superiors, and your penance was a difficult time in your life."
                ),
                () => {
                    character.age += 2;
                });
            case 6:
                return new AdolescenceEventModel(new EventModel(
                    "Slender: Your body is thin, and you have never been able to build up much body mass. When determining your Starting Wounds, use the next worst row on the Starting Wounds table.",
                    "Frail",
                    "Your body is thin, and you have never been able to build up much body mass."
                ),
                    () => {
                        character.woundsBonus--;
                    });
            case 7:
                return new AdolescenceEventModel(new EventModel(
                    "Meditative Isolation: At some point during your apprenticeship, you became withdrawn from your peers, and became hermit-like in your isolation. You gain one bonus Momentum on all skill tests outside of combat, but cannot use Momentum from the group pool.",
                    "Doesn't Play Well With Others",
                    "You gain one bonus Momentum on all skill tests outside of combat, but cannot use Momentum from the group pool."
                ));
            case 8:
                return new AdolescenceEventModel(new EventModel(
                    "Backed the Wrong Horse: In one of the many political games that are rife within the Brotherhood, you were associated with the losing side. Your first career phase must be the Disciple primary career.",
                    "Tarnished Record",
                    "In one of the many political games that are rife within the Brotherhood, you were associated with the losing side."
                ),
                    () => {
                        character.enforcedCareer = PrimaryCareer.Preacher;
                    });
            case 9:
                return new AdolescenceEventModel(new EventModel(
                    "Bitter Feud: You develop a fierce rivalry with another apprentice. They will stop and nothing to settle this feud. Gain the rival as an enemy.",
                    "Holds a Grudge",
                    "You develop a fierce rivalry with another apprentice. They will stop and nothing to settle this feud."
                ));
            case 10:
                return new AdolescenceEventModel(new EventModel(
                    "Tutored by a Keeper: Part of your early training came from a Keeper of the Art, whose insights have stuck with you. You reduce the experience point cost of any Art power you purchase by 50, to a minimum of 100.",
                    "Insufferable",
                    "You reduce the experience point cost of any Art power you purchase by 50, to a minimum of 100."
                ));
            case 11:
                return new AdolescenceEventModel(new EventModel(
                    "Prophecy of Glory: Your early life was shaped by a prophecy from a Seer, who foretold great things for you. Your confidence and certainty means you have one more Mental Wound.",
                    "Egotistical",
                    "Your early life was shaped by a prophecy from a Seer, who foretold great things for you."
                ),
                    () => {
                        character.mentalWoundsIncrease++;
                    });
            case 12:
                return new AdolescenceEventModel(new EventModel(
                    "A Heretic in the Family: A friend or family member of yours, from before your apprenticeship, was exposed as a Heretic and dragged away for ‘reconditioning’ by the Brotherhood. You are regarded as guilty by association, in spite of your innocence. All Persuade tests made when dealing with other members of the Brotherhood increase in difficulty by one step.",
                    "Sullied Reputation",
                    "All Persuade tests made when dealing with other members of the Brotherhood increase in difficulty by one step."
                ));
            case 13:
                return new AdolescenceEventModel(new EventModel(
                    "Sacrifice: An older relative or a close family friend was killed in battle against the Dark Legion. You have been determined to avenge their death ever since. You may always choose to enter the Brotherhood Trooper or Paladin Primary Careers.",
                    "Never Give Up",
                    "An older relative or a close family friend was killed in battle against the Dark Legion. You have been determined to avenge their death ever since."
                ),
                    () => {
                        character.addFreeCareer(PrimaryCareer.BrotherhoodTrooper);
                        character.addFreeCareer(PrimaryCareer.Paladin);
                    });
            case 14:
                return new AdolescenceEventModel(new EventModel(
                    "Ferocious Reputation: As a youth, you personally acquired such a fearsome reputation that people still think twice about crossing you. On a successful Persuade test when attempting to intimidate someone, you may spend one Momentum to inflict one Dread on the target. However, Persuade tests to befriend or calm others increase in difficulty by one step. You may re-roll one d20 when attempting to enter any Second Directorate Iconic Career.",
                    "Intimidating",
                    "On a successful Persuade test when attempting to intimidate someone, you may spend one Momentum to inflict one Dread on the target. However, Persuade tests to befriend or calm others increase in difficulty by one step."
                ));
            case 15:
                return new AdolescenceEventModel(new EventModel(
                    "Thin Skinned: You have always been prideful, and your sense of honour will allow you to suffer no indignity or insult. Your pride allows you to reduce the difficulty of any Willpower test against mental trauma by one step, to a minimum of one. However, you also gain one enemy, a peer who you perceive as having slighted you.",
                    "Easily Offended",
                    "Your pride allows you to reduce the difficulty of any Willpower test against mental trauma by one step, to a minimum of one. However, you also gain one enemy, a peer who you perceive as having slighted you."
                ));
            case 16:
                return new AdolescenceEventModel(new EventModel(
                    "Art-Resistant: You have no talent for or understanding of the mystical whatsoever. This limitation sets you apart from your peers, but it comes with an advantage – as difficult as it is for you to study the Art, you are also nigh-impervious to the Mystical powers of others. You lose the Mystic talent, and cannot ever learn any Art powers. However, your Corruption Soak is increased to five, and you gain three bonus Momentum on all tests made to resist the effects of other supernatural powers and effects.",
                    "Independent-Minded",
                    "Your Corruption Soak is increased to five, and you gain three bonus Momentum on all tests made to resist the effects of other supernatural powers and effects."
                ),
                    () => {
                        if (character.hasTalent("Mystic")) {
                            character.removeTalent("Mystic");
                        }
                    });
            case 17:
                return new AdolescenceEventModel(new EventModel(
                    "Patron: Your studies are watched carefully by a noteworthy figure within the Brotherhood, who has given you ample opportunities for growth. You may freely choose any Primary Brotherhood Career.",
                    "Patron's Expectations",
                    "Patron: Your studies are watched carefully by a noteworthy figure within the Brotherhood, who has given you ample opportunities for growth."
                ),
                    () => {
                        [PrimaryCareer.Disciple,
                         PrimaryCareer.Scribe,
                         PrimaryCareer.Server,
                         PrimaryCareer.SecretaryBH,
                         PrimaryCareer.PilgrimMachinist,
                         PrimaryCareer.Craftsman,
                         PrimaryCareer.PilgrimProtector,
                         PrimaryCareer.BrotherhoodTrooper,
                         PrimaryCareer.Paladin,
                         PrimaryCareer.Qualifier,
                         PrimaryCareer.PilgrimScholar,
                         PrimaryCareer.Archivist,
                         PrimaryCareer.Analyst,
                         PrimaryCareer.Advisor,
                         PrimaryCareer.Administrator,
                         PrimaryCareer.Observer,
                         PrimaryCareer.Archangel,
                         PrimaryCareer.Valkyrie].forEach(c => character.addFreeCareer(c));
                    });
            case 18:
                return new AdolescenceEventModel(new EventModel(
                    "Weapons Expert: You took well to defence training and combat studies. You increase your close combat or ranged combat damage bonus by +1[DS].",
                    "Violent",
                    "You took well to defence training and combat studies.",
                    [
                        "+1[DS] close combat damage",
                        "+1[DS] ranged combat damage",
                    ],
                    (option) => {
                        if (option.indexOf("close combat") > -1) {
                            character.meleeIncrease++;
                        }
                        else {
                            character.rangedIncrease++;
                        }
                    }
                ));
            case 19:
                return new AdolescenceEventModel(new EventModel(
                    "Allergic Reaction: Whether through a quirk of genetics or a problematic exposure during your youth, you react poorly to a number of toxic substances. All Resistance tests made to resist the effects of artificial substances have their difficulty increased by one step.",
                    "Severe Allergies",
                    "All Resistance tests made to resist the effects of artificial substances have their difficulty increased by one step."
                ));
            case 20: {
                const faction = FactionsHelper.getFaction(FactionsHelper.generateHeritage()).name;

                return new AdolescenceEventModel(new EventModel(
                    `Revealed a Traitor: Your actions – deliberately or inadvertently – revealed a traitor or the plans of another faction. You gain an enemy in the ${faction} faction.`,
                    "An Enemy's Revenge",
                    `Your actions – deliberately or inadvertently – revealed a traitor or the plans of another faction. You have an enemy in the ${faction} faction.`
                ));
            }
            case 21:
                return new AdolescenceEventModel(new EventModel(
                    "Gifted Student: Your talent at your studies have brought you to the attention of a respected Mystic. You gain a respected Mystic as an ally, and may freely choose the Pilgrim Scholar primary career. However, you also gain a rival in the form of someone jealous of your accomplishments.",
                    "The Jealousy of Others",
                    "Your talent at your studies have brought you to the attention of a respected Mystic. You gain a respected Mystic as an ally. However, you also gain a rival in the form of someone jealous of your accomplishments."
                ),
                    () => { character.addFreeCareer(PrimaryCareer.PilgrimScholar); });
            case 22:
                return new AdolescenceEventModel(new EventModel(
                    "Devout: You believe absolutely in the righteousness of the Brotherhood, to a degree that astounds even your peers. You may re-roll 1d20 on any Willpower test to resist coercion or influence from another – even from supernatural sources. However, you increase the difficulty of Education skill tests by one due to your blind adherence to dogma.",
                    "Fiercely Pious",
                    "You may re-roll 1d20 on any Willpower test to resist coercion or influence from another – even from supernatural sources. However, you increase the difficulty of Education skill tests by one due to your blind adherence to dogma."
                ));
            case 23:
                return new AdolescenceEventModel(new EventModel(
                    "Superb Senses: You have got extremely sharp senses, and have a knack for spotting trouble. When determining surprise at the start of a combat, you may re-roll 1d20 on your Observation test.",
                    "Cautious",
                    "When determining surprise at the start of a combat, you may re-roll 1d20 on your Observation test."
                ));
            case 24:
                return new AdolescenceEventModel(new EventModel(
                    "Strong-Willed: Unending disputes with your peers and superiors has hardened your determination. You may re-roll 1d20 on any Willpower test.",
                    "Stubborn to a Fault",
                    "You may re-roll 1d20 on any Willpower test."
                ));
            case 25:
                return new AdolescenceEventModel(new EventModel(
                    "Fanatical: You obsess about one particular subject or topic, and know far more about it than most. Nominate a single narrow field of interest. Gain a single bonus Momentum on Education tests relating to your chosen field of interest.",
                    "Obsessive",
                    "Nominate a single narrow field of interest. Gain a single bonus Momentum on Education tests relating to your chosen field of interest"
                ));
            case 26:
                return new AdolescenceEventModel(new EventModel(
                    "Internal Calm: You use meditation techniques to focus on any upcoming challenge by tuning out all distractions. Gain one bonus Momentum on the Willpower test attempted on a Shake It Off Action.",
                    "Optimistic",
                    "Gain one bonus Momentum on the Willpower test attempted on a Shake It Off Action."
                ));
            case 27: {
                let cell = "";
                switch (Math.floor(Math.random() * 6) + 1) {
                    case 1: cell = "the Mystics"; break;
                    case 2: cell = "the Inquisition"; break;
                    case 3:
                    case 4: cell = "the Mission"; break;
                    case 5:
                    case 6: cell = "the Administration"; break;
                }

                return new AdolescenceEventModel(new EventModel(
                    `Contact Within Another Cell: A fellow apprentice has made a name for himself in another part of the Brotherhood. You have endeavoured to stay in contact. You have a contact in ${cell}.`,
                    "Pious",
                    `A fellow apprentice has made a name for himself in another part of the Brotherhood. You have endeavoured to stay in contact. You have a contact in ${cell}.`
                ));
            }
            case 28: {
                const faction = FactionsHelper.getFaction(FactionsHelper.generateHeritage()).name;

                return new AdolescenceEventModel(new EventModel(
                    `Contact Within Another Corporation: You made a friend from another corporation when you were younger. You have a contact in the ${faction} faction.`,
                    "Well-Travelled",
                    `You made a friend from another corporation when you were younger. You have a contact in the ${faction} faction.`
                ));
            }
            case 29:
                return new AdolescenceEventModel(new EventModel(
                    "A Natural Gift: You have a particular knack for one of the Aspects of the Art, and its spells come more naturally to you. Choose a single Aspect of the Art. When using spells from that Aspect, rolling a natural 1 on any d20 generates one additional success, in addition to the normal benefits for rolling within your Mysticism Focus range.",
                    "Keen Focus",
                    "",
                    [
                        "Aspect of Changeling",
                        "Aspect of Elements",
                        "Aspect of Exorcism",
                        "Aspect of Kinetics",
                        "Aspect of Manipulation",
                        "Aspect of Mentalism",
                        "Aspect of Premonition"
                    ],
                    (option) => {
                        character.adolescenceEvent.effect = `When using spells from the ${option}, rolling a natural 1 on any d20 generates one additional success, in addition to the normal benefits for rolling within your Mysticism Focus range.`;
                    }
                ));
            case 30:
                return new AdolescenceEventModel(new EventModel(
                    "Foil a Plot: While shadowing an Inquisitor, you spot a clue that leads to a Heretic plot being foiled. Great things are expected of you. Gain one bonus Momentum on Command tests when dealing with your subordinates within the Brotherhood.",
                    "Weight of Expectations",
                    "Gain one bonus Momentum on Command tests when dealing with your subordinates within the Brotherhood."
                ));
            case 31:
                return new AdolescenceEventModel(new EventModel(
                    "See the Light: You have had an epiphany, and now have a clear understanding of the Brotherhood’s role as the saviours of humanity. You gain one additional Mental Wound.",
                    "Obnoxious Zeal",
                    "You have had an epiphany, and now have a clear understanding of the Brotherhood’s role as the saviours of humanity."
                ),
                    () => { character.mentalWoundsIncrease++; });
            case 32:
                return new AdolescenceEventModel(new EventModel(
                    "Spurn the Darkness: You have had an inadvertent encounter with someone under the sway of the Dark Symmetry. You survive the encounter, and the experience hardens your resolve. Permanently increase your Corruption Soak by one.",
                    "Righteous Scorn",
                    "You have had an inadvertent encounter with someone under the sway of the Dark Symmetry. You survive the encounter, and the experience hardens your resolve. Permanently increase your Corruption Soak by one."
                ));
            case 33:
                return new AdolescenceEventModel(new EventModel(
                    "Blessed by the Cardinal: For whatever reason, your class of apprentices receives a personal blessing from the Cardinal himself. You gain one bonus Momentum on Persuade tests when dealing with other members of the Brotherhood.",
                    "Serene",
                    "You gain one bonus Momentum on Persuade tests when dealing with other members of the Brotherhood."
                ));
            case 34:
                return new AdolescenceEventModel(new EventModel(
                    "Contact Within The Cartel: You know someone who now has a significant position within the Cartel. To a limited extent, this contact can be used to find out information about any of the corporations. You have a contact within the Cartel, as already noted. This contact’s information allows you to re-roll one d20 on any Education test made to obtain information about one of the corporations.",
                    "Worldly",
                    "You have a contact within the Cartel. This contact’s information allows you to re-roll one d20 on any Education test made to obtain information about one of the corporations."
                ));
            case 35:
                return new AdolescenceEventModel(new EventModel(
                    "True Enlightenment: You have gained what all seek but few attain – a transcendent comprehension of the Art. You gain one automatic success on any test to enter an Iconic career with the Mystic talent as a prerequisite.",
                    "Dismissive of those without the Art",
                    "You have gained what all seek but few attain – a transcendent comprehension of the Art."
                ),
                    () => { character.mysticIconicCareerSuccess = true; });
            case 36:
                return new AdolescenceEventModel(new EventModel(
                    "No Fear: You stood up to muggers and gangs as a kid, and you have got the scars to prove it. You don’t scare easy. You reduce the difficulty of Willpower tests against mental assaults by one.",
                    "Reckless",
                    "You reduce the difficulty of Willpower tests against mental assaults by one."
                ));
            case 37:
                return new AdolescenceEventModel(new EventModel(
                    "Contact within the Curia: You have somehow made contact with a member of the Curia. The GM nominates a member of the Curia, who you gain as a contact. The GM determines how this contact works, but it should be a considerable advantage when the characters wants information about the upper levels of the Brotherhood’s activities or wants access to something restricted. This is a powerful contact, and it should be handled by the GM carefully. Abuse of this connection can cause problems for the player character.",
                    "Name-Dropping",
                    "You have somehow made contact with a member of the Curia."
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
                    "Minor Mutation: There's something quite cool you can do, it got you in trouble a few times before you learned to hide it. What is it? Why did your parents tell you never to tell anyone about it? You try not to use it much as you get killer headaches afterwards. You can pay a Chronicle Point to use this ability however you take a D2 Mental Assault afterwards, from the pain it causes. Describe how your mutant heritage allows you to do this.",
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
                    "Iron Discipline! Your apprenticeship was a harsh one that instilled you with military discipline, and you were given little sympathy from the moment you set foot within a cathedral. You have had to work for everything, and few things compare to the harshness of your upbringing. When determining your Starting Wounds, use the next best row.",
                    "Unsympathetic to Weakness",
                    "Your apprenticeship was a harsh one that instilled you with military discipline, and you were given little sympathy from the moment you set foot within a cathedral. You have had to work for everything, and few things compare to the harshness of your upbringing."
                ),
                    () => { character.woundsBonus++; });
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

export const BrotherhoodAdolescenceEvents = new AdolescenceEventsBrotherhood();