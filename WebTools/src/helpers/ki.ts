import {Skill} from './skills';
import {character} from '../common/character';

export enum KiPower {
    None,
    BatsSonarSense,
    Catsight,
    CleansePoison,
    DragonSpirit,
    FlyingViperStyle,
    HandsOfStone,
    HoodedViperStyle,
    KanjisLuckySense,
    Lightsleep,
    MaramasPerfectBalance,
    MongooseDodge,
    MongooseArtfulDodge,
    RhinoImpregnableSkin,
    StrikeFromBeyond,
    WeaponLink,
    DiamondWill,
    AuraOfMysticalResistance,
    ChameleonSkin,
    CobrasVenomousStrike,
    CrowsPiercingGlance,
    Deathblow,
    SelfHealing,
    MonkeysFoot,
    NomurasQuickenedStep,
    ShadowWalk,
    SupremeConcentration,
    SuspendedAnimation,
    Teleport,
    ToadsGreatLeap,
    ToronagasRagingMight,
    YizosPrescience,
    YoramasDeflectingHands,
    YurojisTrueSight
}

interface IKiPrerequisite {
    skill: Skill;
    expertise: number;
}

class KiPowerModel {
    name: string;
    effect: string;
    prerequisites: IKiPrerequisite[];

    constructor(name: string, effect: string, prerequisites: IKiPrerequisite[]) {
        this.name = name;
        this.effect = effect;
        this.prerequisites = prerequisites;
    }
}

class KiPowers {
    private _powers: { [id: number]: KiPowerModel } = {
        [KiPower.BatsSonarSense]: new KiPowerModel(
            "The Bat's Sonar Sense",
            "The character has trained until his senses are so keen that he does not need to see his target to hit it. When making a melee or ranged attack, he no longer increases the difficulty because of darkness or other visual impairments such as fog or smoke. This ability does not affect penalties caused by a weapon’s range category.",
            [{ skill: Skill.Observation, expertise: 2 }]),
        [KiPower.Catsight]: new KiPowerModel(
            "Catsight",
            "The character can see clearly in dim light, much as a cat does. If there is even the tiniest amount of light, tests he attempts do not increase in difficulty due to poor lighting.",
            [{ skill: Skill.Observation, expertise: 1 }]),
        [KiPower.CleansePoison]: new KiPowerModel(
            "Cleanse Poison",
            "The character has such great control over his body’s internal Ki flow that he can alter his biological balance to neutralise any poison or disease. Whenever a poison or disease would require him to make a Resistance test, he may attempt a Willpower test instead. Further, he gains one bonus Momentum on tests to resist the effects of poisons and diseases for each rank of Willpower Focus he possesses.",
            [{ skill: Skill.Willpower, expertise: 1 }]),
        [KiPower.DragonSpirit]: new KiPowerModel(
            "Dragon Spirit",
            "The character is impervious to extremes of temperature. He automatically succeeds on all Resistance tests made to resist the effects of hot or cold environments, and does not suffer damage from sources of extreme heat or cold, such as flamethrowers or the Burning status effect. The Initial damage of weapons with the Incendiary quality still harms the character as normal, unless that damage was caused by a flamethrower – he is immune to fire, but a flaming bullet is still a bullet.",
            [{ skill: Skill.Willpower, expertise: 2 }]),
        [KiPower.FlyingViperStyle]: new KiPowerModel(
            "Flying Viper Style",
            "The character has been trained to use a gun in each hand, wielding them as extensions of his own body. When wielding a ranged weapon in each hand, he gains one bonus Momentum, which must be spent towards the Swift Attack Momentum Spend. If he has both Flying Viper Style and Hooded Viper Style, he may mix and match between ranged and melee weapons as desired, though he still only gains one bonus Momentum, not one from each ability.",
            [{ skill: Skill.RangedWeapons, expertise: 2 }]),
        [KiPower.HandsOfStone]: new KiPowerModel(
            "Hands of Stone",
            "The character has honed his bare hands in to deadly weapons that can shatter stone. He may parry any melee attack with his unarmed attacks, and his unarmed attacks deal 1+3DS damage, with the Stun and Vicious 1 qualities.",
            [{ skill: Skill.UnarmedCombat, expertise: 2 }]),
        [KiPower.HoodedViperStyle]: new KiPowerModel(
            "Hooded Viper Style",
            "The character been trained to wield a pair of blades, or to combine his unarmed prowess with his blades. The weapons must be wielded one handed (though they do not have to be one-handed weapons). When using a melee weapon in each hand (which may include an unarmed attack), he gains one bonus Momentum, which must be spent towards the Swift Attack Momentum Spend. If he has both Flying Viper Style and Hooded Viper Style, he may mix and match between ranged and melee weapons as desired, though he still only gains one bonus Momentum, not one from each ability.",
            [{ skill: Skill.CloseCombat, expertise: 2 }]),
        [KiPower.KanjisLuckySense]: new KiPowerModel(
            "Kanji's Lucky Sense",
            "The character is preternaturally alert. Whenever danger threatens, he is ready for it. When an unknown peril threatens the character, the GM may choose to gain one Dark Symmetry point and inform him of the threat. This warning comes in different forms for different characters – one character may have the hair on the back of his neck stand on end when danger is near, while another may find that their stomach grumbles or an old war wound aches as danger approaches.",
            [{ skill: Skill.Insight, expertise: 2 }]),
        [KiPower.Lightsleep]: new KiPowerModel(
            "Lightsleep",
            "This ability enables the character to sleep and yet remain aware of his surroundings. While he is asleep, he does not increase the difficulty of any Observation tests made to detect threats, and is immediately and automatically aware of any character that comes within Reach. Further, a character with this ability needs only four hours of sleep, rather than eight, to count as having a full night’s rest.",
            [{ skill: Skill.Willpower, expertise: 1 }]),
        [KiPower.MaramasPerfectBalance]: new KiPowerModel(
            "Marama's Perfect Balance",
            "This power gives the character perfect control over his balance. He can run along tightropes, telephone wires, or narrow ledges at full speed without falling, reducing the difficulty of all Acrobatics tests by one step for every rank of Acrobatics Focus he possesses, to a minimum of one. Further, he gains additional Soak against falling damage equal to his number of ranks of Acrobatics Focus.",
            [{ skill: Skill.Acrobatics, expertise: 1 }]),
        [KiPower.MongooseDodge]: new KiPowerModel(
            "The Mongoose's Dodge",
            "The character has trained to the point that he dodges incoming attacks by reflex rather than conscious effort. He is not required to spend a Dark Symmetry point in order to attempt a Dodge Response Action. If he has a means of taking more than one Response Action, this ability only benefits the first Dodge Response Action attempted each turn – any additional Dodges must be paid for as normal.",
            [{ skill: Skill.Acrobatics, expertise: 2 }]),
        [KiPower.MongooseArtfulDodge]: new KiPowerModel(
            "The Mongoose's Artful Dodge",
            "The character moves with impossible swiftness, becoming a blur of motion as he eludes attacks. He may make an additional Response Action each turn (costing one Dark Symmetry point as normal), but this second Response Action may only be a Dodge",
            [{ skill: Skill.Acrobatics, expertise: 2 }]),
        [KiPower.RhinoImpregnableSkin]: new KiPowerModel(
            "The Rhino's Impregnable Skin",
            "The character has toughened his body with special training to the point where it seems impervious to pain. He gains one additional Soak to all locations.",
            [{ skill: Skill.Resistance, expertise: 2 }]),
        [KiPower.StrikeFromBeyond]: new KiPowerModel(
            "Strike From Beyond the Grave",
            "An arcane ritual has sealed the character’s spirit into his body for a short time after death. When he dies, his spirit will animate his body and ruthlessly pursue its killers. Upon death, his body remains animate, suffering one Mental Wound at the start of each round. The character ignores the effects of any and all injuries he has suffered. Once he can suffer no more Mental Wounds, his body finally dies.",
            [{ skill: Skill.Willpower, expertise: 3 }]),
        [KiPower.WeaponLink]: new KiPowerModel(
            "Weapon Link",
            "The character has forged a bond with a chosen melee weapon, which may be his unarmed strike. This weapon inflicts an additional +2[DS] damage. This ability may only be taken once, but he may change the weapon this ability is linked to, with a day-long ritual.",
            [
                { skill: Skill.CloseCombat, expertise: 1 },
                { skill: Skill.UnarmedCombat, expertise: 1 }
            ]),
        [KiPower.DiamondWill]: new KiPowerModel(
            "Diamond Will",
            "This technique enables the practitioner to block out pain entirely. While this technique remains in effect, the character may ignore any status effects and conditions caused by injury or Dread (up to and including death) – both those he already possesses, and those he may suffer while the gift remains in effect. The injuries remain, and the character can still suffer damage as normal, but the penalties and hindrances caused by those injuries are suppressed while this technique remains in effect. This technique also renders the character immune to any powers or effects that are reliant on pain or other sensation; he is temporarily inured and oblivious to all physical sensation, and has no sense of touch.",
            [{ skill: Skill.Willpower, expertise: 2 }]),
        [KiPower.AuraOfMysticalResistance]: new KiPowerModel(
            "Aura of Mystical Resistance",
            "The practitioner has been trained to resist all external mystical influences. This technique can be performed as a Response Action to resist the effects of a supernatural power targeting the character. If successfully performed, this technique increases the difficulty of any power used against him by one, or adds one additional d20 to any roll made to resist a power’s effects.",
            [{ skill: Skill.Insight, expertise: 2 }]),
        [KiPower.ChameleonSkin]: new KiPowerModel(
            "The Chameleon's Skin",
            "This technique enables the practitioner to become virtually invisible as long as he remains perfectly still. While this technique remains in effect, the character gains two bonus Momentum on all Stealth tests to go unseen. The technique’s effects end immediately when the character moves. This technique is a secret known mainly to the Shadow Walker cult and certain other secret societies.",
            [{ skill: Skill.Stealth, expertise: 1 }]),
        [KiPower.CobrasVenomousStrike]: new KiPowerModel(
            "The Cobra's Venomous Strike",
            "The character focusses all of his will and fury into his fist until it boils and seethes with energy. This enables him to strike with terrifying force. The character’s next unarmed strike gains the Vicious 3 quality, but the character must make a successful unarmed strike before the end of his current turn, or the effect is wasted.",
            [{ skill: Skill.UnarmedCombat, expertise: 2 }]),
        [KiPower.CrowsPiercingGlance]: new KiPowerModel(
            "The Crow's Piercing Glance",
            "This technique allows the practitioner to use his Ki to guide his strikes or shots to any weak points in his enemy’s armour. The character’s next melee or ranged attack within Close range gains the Armour Piercing 1 weapon quality, but the character must make a successful attack before the end of his current turn or the effect is wasted.",
            [{ skill: Skill.Insight, expertise: 1 }]),
        [KiPower.Deathblow]: new KiPowerModel(
            "Deathblow",
            "The character focuses his Ki into making his next blow a deadly one. The character’s next melee attack inflicts two additional damage, but he must make a successful attack before the end of his current turn or the effect is wasted. ",
            [{ skill: Skill.CloseCombat, expertise: 2 }]),
        [KiPower.SelfHealing]: new KiPowerModel(
            "Ki Self-Healing",
            "The practitioner sends waves of energy throughout his body that heals wounds, reknits torn flesh, and soothes pain. When this technique is successfully used, he may immediately heal two wounds, starting with the most severe (Critical first, then Serious, then Light).",
            [{ skill: Skill.Resistance, expertise: 1 }]),
        [KiPower.MonkeysFoot]: new KiPowerModel(
            "The Monkey's Foot",
            "This technique enables the character to perform incredible acrobatic feats with supernatural ease. He may use this power as a Restricted Action to avoid attacks or as a Response Action when he suffers falling damage. If used as a Restricted Action, the character moves to any point within his current zone (including into Reach), or into any adjacent zone (but not into Reach), and increases the difficulty of any attacks against him by one step until the start of his next turn. If used as a Response Action against falling, he gains 3 Soak against the damage suffered.",
            [{ skill: Skill.Acrobatics, expertise: 1 }]),
        [KiPower.NomurasQuickenedStep]: new KiPowerModel(
            "Nomura's Quickened Step",
            "The character focusses all of his inner strength on enhancing his quickness, enabling him to move at impossible speeds. This technique must be used at the start of the character’s turn, before any other actions are attempted. If successful, the character gains one additional Standard Action this turn.",
            [{ skill: Skill.Athletics, expertise: 1 }]),
        [KiPower.ShadowWalk]: new KiPowerModel(
            "Shadow Walk",
            "By stepping into any patch of darkness, the character may vanish and reappear in any other area of darkness or shadow. The character steps into one area of shadow at the start of this action, and then emerges from any other area of shadow within line of sight and Medium range. Only the Shadow Walker cult teaches this technique.",
            [{ skill: Skill.Stealth, expertise: 2 }]),
        [KiPower.SupremeConcentration]: new KiPowerModel(
            "Supreme Concentration",
            "When using this technique, the character’s clarity and attention increase considerably, greatly augmenting his prowess. Choose a single general skill for which the character already has at least one rank of Expertise. The character gains a single rank of Expertise in that skill, which stacks with those he already possesses, to a maximum of Expertise 5. Multiple uses of this technique do not stack.",
            [{ skill: Skill.Willpower, expertise: 1 }]),
        [KiPower.SuspendedAnimation]: new KiPowerModel(
            "Suspended Animation",
            "This power enables the character to shut down all his normal bodily functions. His heart rate slows, his breathing becomes almost imperceptible, and he requires virtually no air or sustenance. In suspended animation, he can survive for up to an hour without air, and can survive for ten times as long as normal without food or water. If he is poisoned or under the effects of a disease, entering suspended animation pauses the effects of that poison or disease. While in suspended animation, the character is effectively asleep, and will not be aware of his surroundings unless he also has the Lightsleep power. When he enters suspended animation, he must determine how long he will remain in this state before waking up normally.",
            [{ skill: Skill.Willpower, expertise: 2 }]),
        [KiPower.Teleport]: new KiPowerModel(
            "Teleport",
            "This technique enables a character to move from one location to another in an instant, without crossing the intervening space. If this technique is successfully performed, the character moves immediately to any point within Medium range that he is able to perceive in some way, ignoring all intervening terrain and obstacles.",
            [{ skill: Skill.Willpower, expertise: 3 }]),
        [KiPower.ToadsGreatLeap]: new KiPowerModel(
            "The Toad's Great Leap",
            "The character focusses his Ki into a mighty leap. He can immediately leap to any adjacent zone, including into Reach of an enemy, even where the zone being entered is above or below his starting point. During this jump, the character leaps over all difficult and dangerous terrain between those points (obstacles that are enclosing, such as a roof, or airborne, such as toxic gases, cannot be ignored in this way – the GM’s discretion applies).",
            [{ skill: Skill.Acrobatics, expertise: 1 }]),
        [KiPower.ToronagasRagingMight]: new KiPowerModel(
            "Toronaga's Raging Might",
            "The character focusses all his Ki into augmenting his strength to superhuman levels. If this power is successfully used, he gains one rank of Supernatural Strength while the technique remains in effect (see page 273 of the Mutant Chronicles core book for details). This grants one automatic success on all Strength tests, as well as increases all damage he inflicts with melee attacks by one. As this benefit is temporary, it does not increase the character’s wounds.",
            [{ skill: Skill.Athletics, expertise: 2 }]),
        [KiPower.YizosPrescience]: new KiPowerModel(
            "Yizo's Prescience",
            "The character’s awareness of his surroundings and the events around him are honed to supernatural perfection. When this technique is performed, the character becomes perfectly aware of everything and everyone within Close range. This includes creatures – even ones hidden or invisible – as well as any uses of supernatural powers, and extends through walls and other obstacles.",
            [{ skill: Skill.Insight, expertise: 1 }]),
        [KiPower.YoramasDeflectingHands]: new KiPowerModel(
            "Yorama's Deflecting Hands",
            "The character focusses his mind so that he can knock aside the bullets of his enemies. This technique grants the Full Defence 1 quality to any one melee weapon the character is currently wielding (which may include his unarmed strike), for as long as the technique remains in effect.",
            [{ skill: Skill.CloseCombat, expertise: 2 }]),
        [KiPower.YurojisTrueSight]: new KiPowerModel(
            "Yuroji's True Sight",
            "The character’s mystically attuned senses see things as they are. If this technique is successfully used, the character’s senses will not be fooled by deception or concealment: invisible and hidden people will appear in plain sight, disguises will not fool him, and supernatural powers used to deceive will be obvious to him. Even hidden objects and secret doors are as clear as day, and normally-invisible uses of supernatural powers are apparent.",
            [{ skill: Skill.Insight, expertise: 3 }]),
    };

    getPower(power: KiPower) {
        return this._powers[power];
    }
}

export const KiPowersHelper = new KiPowers();