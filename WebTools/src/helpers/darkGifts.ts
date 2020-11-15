import {character} from '../common/character';
import {Apostle} from './apostles';
import {Attribute} from './attributes';

export enum Endowment {
    // Dark Symmetry
    CorruptDevice,
    Obfuscation,
    SenseWeavesOfPower,
    DarkCurse,
    SymmetryBurst,
    DarkAcuity,
    NecrovisualLink,
    SymmetricFlare,
    TouchOfSymmetry,

    // Ilian
    DarkWard,
    DimensionalFlensing,
    SwiftPortal,
    TrueCorruption,
    HarrowingOfTheVoid,
    CallOfTheWildHunt,
    ChainsOfTheVoid,
    DarkAscension,
    DarkGateway,
    DimensionalCage,
    SunderReality,
    SummonObject,
    SummonMalignant,
    UnchainSoul,
    VortexOfDestruction,
    WardOfTheVoid,
    IliansDeadlyGrasp,
    Timeslide,
    FoulFavour,
    ReturnToDarkness,

    // Algeroth
    BlackFire,
    DistortedArmour,
    HeightenedProwess,
    VileCloud,
    Painless,
    AuraOfAbsorption,
    FlowOfDeath,
    GlyphsOfSuffering,
    InvincibleArmy,
    InvocationsOfAlgeroth,
    RainOfDestruction,
    SphereOfRage,
    SwiftShadowsOfUnrest,
    TorrentOfDestruction,
    SoulripperTouch,
    AuraOfDarkHealing,

    // Demnogonis
    ControlSickness,
    DarkStrain,
    SeeSickness,
    BlackRotSpew,
    TwistFlesh,
    BloodBoil,
    FungalRiptide,
    Infestation,
    AuraOfDarkPestilence,
    Flay,
    PandemicNexus,
    RabidSeizures,

    // Semai
    StirTheDarkHeart,
    TrueFear,
    SnareTheUnwillingMind,
    MuddleTheMemory,
    PluckMind,
    BindTheGift,
    ChainsOfTheFalseHeart,
    CullingTheHeard,
    EngineerOfChaos,
    FlowOfAssymetry,
    OminousFiresight,
    HuntedSoul,
    OnslaughtOfDomination,
    WellOfDespair,

    // Muawijhe
    WakingNightmare,
    Lunacy,
    DreamTransfer,
    DistilHorror,
    VeilOfEnemies,
    BloodOfInsanity,
    DarkInfluence,
    DreamReaper,
    Haunted,
    MindForMind,
    RealmOfFear,
    StormOfChaos,
    SurgeOfFear,
    WalkAmongYou,

    // Dark Ink
    InkDarkBlade,
    InkThornWhip,
    InkHookedWeb,
    InkWeaveOfProtection,
    InkThreadsOfParalysis,
    InkDestructiveStrength,
    InkCrushingDensity,
    InkBaneOfGravity,
    InkEdgedStorm,
    InkTorrentOfInkedGlyphs,

    // Pesticus
    PestAcidic,
    PestAdhesiveSlime,
    PestBrainInvasion,
    PestElongate,
    PestLimbDetachment,
    PestLiquefy,
    PestParasiteSwarm,
    PestParasiticHealing,
    PestSensorySpores,
    PestSlaveSlugs,
    PestVisceralExpulsion,

    // Bioengineered Implants
    ImplantReflexiveFiring,
    ImplantClonedBody,
    ImplantStigmaticExcision,
    ImplantEternalLife,
    ImplantRegeneration,
    ImplantHibernation,
    ImplantSelfRepair,
    ImplantPoisonSecretion,
    ImplantPoisonNeutraliser,
    ImplantDiseaseNeutraliser,
    ImplantPheromoneEnhancer,
    ImplantAdhesiveBristles,
    ImplantGills,
    ImplantBioWovenSkin,
    ImplantSubdermalArmour,
    ImplantSkeletalRestructuring,
    ImplantPainBlocker,
    ImplantNeurologicalAugmentation,
    ImplantMuscularEnhancement,
    ImplantOptimisedMotorControl,
    ImplantBodyReinforcement,
    ImplantIncreasedResolve,
    ImplantReflexEnhancement,
    ImplantKnowledgePool,
    ImplantClaws,
    ImplantSleepless,
    ImplantDarkVision,
    ImplantBloodhound,
    ImplantMalleableFace,
    ImplantVoiceEmulator,
    ImplantDispersalSacs,
    ImplantSkeletalReinforcement,
    ImplantThreatPerception,
    ImplantStructuralAwareness,
    ImplantProjectilePerception,
    ImplantControlNode,

    // Necrobionic Implants
    NecrobionicLimbArm,
    NecrobionicLimbLeg,
    NecrobionicRespiratorySystem,
    NecrobionicOrganReplacement,
    NecroHostImplant,
    NecrobionicWristSocket,
    NecrobionicTargetingSystem,
    NecroNeuralConduit,
    NecroHomonculus,
    NecrobionicRestructuring,
}

enum GiftType {
    DarkGift,
    Implant,
    Necrobionic,
    Pesticum,
    DarkInk
}

class DarkGiftModel {
    name: string;
    effect: string;
    apostle: Apostle;
    type: GiftType;

    constructor(name: string, effect: string, apostle: Apostle) {
        this.name = name;
        this.effect = effect;
        this.apostle = apostle;
        this.type = GiftType.DarkGift;
    }
}

class ImplantModel extends DarkGiftModel {
    constructor(name: string, effect: string) {
        super(name, effect, Apostle.Algeroth);
        this.type = GiftType.Implant;
    }
}

class NecrobionicModel extends DarkGiftModel {
    constructor(name: string, effect: string) {
        super(name, effect, Apostle.Algeroth);
        this.type = GiftType.Necrobionic;
    }
}

class PesticumModel extends DarkGiftModel {
    constructor(name: string, effect: string) {
        super(name, effect, Apostle.Demnogonis);
        this.type = GiftType.Pesticum;
    }
}

class DarkInkModel extends DarkGiftModel {
    constructor(name: string, effect: string) {
        super(name, effect, Apostle.Semai);
        this.type = GiftType.DarkInk;
    }
}

export class DarkGiftViewModel extends DarkGiftModel {
    id: Endowment;

    constructor(id: Endowment, base: DarkGiftModel) {
        super(base.name, base.effect, base.apostle);
        this.id = id;
    }
}

class DarkGifts {
    private _gifts: { [id: number]: DarkGiftModel } = {
        [Endowment.CorruptDevice]: new DarkGiftModel("Corrupt Device", "Channels the Dark Symmetry into a device.", undefined),
        [Endowment.Obfuscation]: new DarkGiftModel("Obfuscation", "Hides signs of Dark Symmetry from outer sources.", undefined),
        [Endowment.SenseWeavesOfPower]: new DarkGiftModel("Sense Weaves of Power", "Sense wielders of supernatural powers.", undefined),
        [Endowment.DarkCurse]: new DarkGiftModel("Dark Curse", "Assails a victim with an effect (Blind, Dazed etc.)", undefined),
        [Endowment.SymmetryBurst]: new DarkGiftModel("Symmetry Burst", "Produces a burst of power that manifests as a storm of chaotic inertia.", undefined),
        [Endowment.DarkAcuity]: new DarkGiftModel("Dark Acuity", "Improves senses.", undefined),
        [Endowment.NecrovisualLink]: new DarkGiftModel("Necrovisual Link", "Views through another creature's eyes.", undefined),
        [Endowment.SymmetricFlare]: new DarkGiftModel("Symmetric Flare", "Conjures a bolt of raw power and throw it at a target.", undefined),
        [Endowment.TouchOfSymmetry]: new DarkGiftModel("Touch of Symmetry", "Imbues an object or a creature with the Dark Symmetry.", undefined),
        [Endowment.DarkWard]: new DarkGiftModel("Dark Ward", "Protects against mystic powers.", Apostle.Ilian),
        [Endowment.DimensionalFlensing]: new DarkGiftModel("Dimensional Flensing", "Opens small portals that cause damage.", Apostle.Ilian),
        [Endowment.SwiftPortal]: new DarkGiftModel("Swift Portal", "Opens a temporary portal that will teleport anyone stepping through.", Apostle.Ilian),
        [Endowment.TrueCorruption]: new DarkGiftModel("True Corruption", "Causes massive corruption of an object.", Apostle.Ilian),
        [Endowment.HarrowingOfTheVoid]: new DarkGiftModel("Harrowing of the Void", "Places the target in the coldness of the void.", Apostle.Ilian),
        [Endowment.CallOfTheWildHunt]: new DarkGiftModel("Call the Wild Hunt", "Places the target in the Wild Realm.", Apostle.Ilian),
        [Endowment.ChainsOfTheVoid]: new DarkGiftModel("Chains of the Void", "Summons chains that will cause damage and grasp.", Apostle.Ilian),
        [Endowment.DarkAscension]: new DarkGiftModel("Dark Ascension", "Imbues temporary flight capability.", Apostle.Ilian),
        [Endowment.DarkGateway]: new DarkGiftModel("Dark Gateway", "Opens a lasting portal that will teleport anyone stepping through.", Apostle.Ilian),
        [Endowment.DimensionalCage]: new DarkGiftModel("Dimensional Cage", "Causes a target to become trapped in a time pocket.", Apostle.Ilian),
        [Endowment.SunderReality]: new DarkGiftModel("Sunder Reality", "Causes an area to become affected by a phenomenon effect.", Apostle.Ilian),
        [Endowment.SummonObject]: new DarkGiftModel("Summon Object", "Summons an object from far away.", Apostle.Ilian),
        [Endowment.SummonMalignant]: new DarkGiftModel("Summon Malignant", "Summons a Malignant creature.", Apostle.Ilian),
        [Endowment.UnchainSoul]: new DarkGiftModel("Unchain Soul", "Enables the spirit to move unbound by the body.", Apostle.Ilian),
        [Endowment.VortexOfDestruction]: new DarkGiftModel("Vortex of Destruction", "Draws multiple conflicting dimensions together, causing cataclysmic chaos.", Apostle.Ilian),
        [Endowment.WardOfTheVoid]: new DarkGiftModel("Ward of the Void", "Wards an area from intruders.", Apostle.Ilian),
        [Endowment.IliansDeadlyGrasp]: new DarkGiftModel("Ilian's Deadly Grasp", "Causes internal damage to a target.", Apostle.Ilian),
        [Endowment.Timeslide]: new DarkGiftModel("Timeslide", "Allows the Heretic to act faster.", Apostle.Ilian),
        [Endowment.FoulFavour]: new DarkGiftModel("Foul Favour", "Bestows a Dark Gift to another person.", Apostle.Ilian),
        [Endowment.ReturnToDarkness]: new DarkGiftModel("Return to Darkness", "Allows the Heretic to instantly return to a special location.", Apostle.Ilian),
        [Endowment.BlackFire]: new DarkGiftModel("Black Fire", "Engulfs a target in black flames.", Apostle.Algeroth),
        [Endowment.DistortedArmour]: new DarkGiftModel("Distorted Armour", "Imbues the Heretic's armour with a durable exoskeleton.", Apostle.Algeroth),
        [Endowment.HeightenedProwess]: new DarkGiftModel("Heightened Prowess", "Improves strength and physique.", Apostle.Algeroth),
        [Endowment.VileCloud]: new DarkGiftModel("Vile Cloud", "Summons a vile cloud that causes nausea.", Apostle.Algeroth),
        [Endowment.Painless]: new DarkGiftModel("Painless", "The Heretic becomes inert to pain.", Apostle.Algeroth),
        [Endowment.AuraOfAbsorption]: new DarkGiftModel("Aura of Absorption", "Creates an aura that converts incoming attacks into power for use.", Apostle.Algeroth),
        [Endowment.FlowOfDeath]: new DarkGiftModel("Flow of Death", "Summons an orb that causes damage to an entire zone.", Apostle.Algeroth),
        [Endowment.GlyphsOfSuffering]: new DarkGiftModel("Glyphs of Suffering", "Wards an area from intruders.", Apostle.Algeroth),
        [Endowment.InvincibleArmy]: new DarkGiftModel("Invincible Army", "Improves strength and physique of others.", Apostle.Algeroth),
        [Endowment.InvocationsOfAlgeroth]: new DarkGiftModel("Invocations of Algeroth", "The Heretic is imbued with Algeroth's raw power.", Apostle.Algeroth),
        [Endowment.RainOfDestruction]: new DarkGiftModel("Rain of Destruction", "Causes a rain of burning stones to cover an area.", Apostle.Algeroth),
        [Endowment.SphereOfRage]: new DarkGiftModel("Sphere of Rage", "Causes creatures within the sphere to become enraged.", Apostle.Algeroth),
        [Endowment.SwiftShadowsOfUnrest]: new DarkGiftModel("Swift Shadows of Unrest", "Causes a target to suffer a mental assault.", Apostle.Algeroth),
        [Endowment.TorrentOfDestruction]: new DarkGiftModel("Torrent of Destruction", "Summons a howling tornado that wreaks havoc.", Apostle.Algeroth),
        [Endowment.SoulripperTouch]: new DarkGiftModel("Soulripper Touch", "A devastating melee attack.", Apostle.Algeroth),
        [Endowment.AuraOfDarkHealing]: new DarkGiftModel("Aura of Dark Healing", "Aura that heals wounds temporarely.", Apostle.Algeroth),
        [Endowment.ControlSickness]: new DarkGiftModel("Control Sickness", "Allows the Heretic to control a disease afflicting another person.", Apostle.Demnogonis),
        [Endowment.DarkStrain]: new DarkGiftModel("Dark Strain", "Summons a short-lived virulent disease.", Apostle.Demnogonis),
        [Endowment.SeeSickness]: new DarkGiftModel("See Sickness", "The Heretic can see disease inside other people.", Apostle.Demnogonis),
        [Endowment.BlackRotSpew]: new DarkGiftModel("Black Rot Spew", "The Heretic spews Black Rot on a target.", Apostle.Demnogonis),
        [Endowment.TwistFlesh]: new DarkGiftModel("Twist Flesh", "Twists the flesh on a creature, either to harm or alter appearance.", Apostle.Demnogonis),
        [Endowment.BloodBoil]: new DarkGiftModel("Blood Boil", "Causea a target's blood to boil.", Apostle.Demnogonis),
        [Endowment.FungalRiptide]: new DarkGiftModel("Fungal Riptide", "Causes an object or person to become covered in fungi.", Apostle.Demnogonis),
        [Endowment.Infestation]: new DarkGiftModel("Infestation", "Summons vermin to flood the area.", Apostle.Demnogonis),
        [Endowment.AuraOfDarkPestilence]: new DarkGiftModel("Aura of Dark Pestilence", "Drowns an area in a virulent disease.", Apostle.Demnogonis),
        [Endowment.Flay]: new DarkGiftModel("Flay", "Causes damage to a target by ripping their flesh.", Apostle.Demnogonis),
        [Endowment.PandemicNexus]: new DarkGiftModel("Pandemic Nexus", "Summons a powerful and far-reaching virulent influenza.", Apostle.Demnogonis),
        [Endowment.RabidSeizures]: new DarkGiftModel("Rabid Seizures", "Inflicts a symmetry-touched rabies in a target.", Apostle.Demnogonis),
        [Endowment.StirTheDarkHeart]: new DarkGiftModel("Stir the Dark Heart", "Intensifies an emotion within a target.", Apostle.Semai),
        [Endowment.TrueFear]: new DarkGiftModel("True Fear", "Instills fear in a target.", Apostle.Semai),
        [Endowment.SnareTheUnwillingMind]: new DarkGiftModel("Snare the Unwilling Mind", "Bewitches the judgement of the target.", Apostle.Semai),
        [Endowment.MuddleTheMemory]: new DarkGiftModel("Muddle the Memory", "Muddles details of memories within a target.", Apostle.Semai),
        [Endowment.PluckMind]: new DarkGiftModel("Pluck Mind", "Allows the Heretic to read surface thoughts.", Apostle.Semai),
        [Endowment.BindTheGift]: new DarkGiftModel("Bind the Gift", "Binds a Dark Gift inside an object for later use.", Apostle.Semai),
        [Endowment.ChainsOfTheFalseHeart]: new DarkGiftModel("Chains of the False Heart", "Creates a false bond of lust and obsession between two targets.", Apostle.Semai),
        [Endowment.CullingTheHeard]: new DarkGiftModel("Culling the Heard", "Allows the Heretic to percieve corruption.", Apostle.Semai),
        [Endowment.EngineerOfChaos]: new DarkGiftModel("Engineer of Chaos", "Allows the Heretic to foresee the immediate future and dictate changes to it.", Apostle.Semai),
        [Endowment.FlowOfAssymetry]: new DarkGiftModel("Flow of Assymetry", "Covers an area with a aura that hinders the use of any supernatural power.", Apostle.Semai),
        [Endowment.OminousFiresight]: new DarkGiftModel("Ominous Foresight", "Allows the Heretic to foresee harm coming to him.", Apostle.Semai),
        [Endowment.HuntedSoul]: new DarkGiftModel("Hunted Soul", "Instills a target with a sense of terror.", Apostle.Semai),
        [Endowment.OnslaughtOfDomination]: new DarkGiftModel("Onslaught of Domination", "Allows the Heretic to exert authority over those around him.", Apostle.Semai),
        [Endowment.WellOfDespair]: new DarkGiftModel("Well of Despair", "Wards an area from intruders.", Apostle.Semai),
        [Endowment.WakingNightmare]: new DarkGiftModel("Waking Nightmare", "", Apostle.Muawijhe),
        [Endowment.Lunacy]: new DarkGiftModel("Lunacy", "", Apostle.Muawijhe),
        [Endowment.DreamTransfer]: new DarkGiftModel("Dream Transfer", "", Apostle.Muawijhe),
        [Endowment.DistilHorror]: new DarkGiftModel("Distil Horror", "", Apostle.Muawijhe),
        [Endowment.VeilOfEnemies]: new DarkGiftModel("Veil of Enemies", "", Apostle.Muawijhe),
        [Endowment.BloodOfInsanity]: new DarkGiftModel("Blood of Insanity", "Causes a mental attack that invigorates the Heretic.", Apostle.Muawijhe),
        [Endowment.DarkInfluence]: new DarkGiftModel("Dark Influence", "Inflicts the target with a barrage of horrible visions.", Apostle.Muawijhe),
        [Endowment.DreamReaper]: new DarkGiftModel("Dream Reaper", "Instills nightmares into a sleeping person, allowing the Heretic to cause harm.", Apostle.Muawijhe),
        [Endowment.Haunted]: new DarkGiftModel("Haunted", "Summons a Fright Wraith that will haunt the target.", Apostle.Muawijhe),
        [Endowment.MindForMind]: new DarkGiftModel("Mind for Mind", "Swaps the minds of two people.", Apostle.Muawijhe),
        [Endowment.RealmOfFear]: new DarkGiftModel("Realm of Fear", "Fills a target with impressions of horror, dread and despair.", Apostle.Muawijhe),
        [Endowment.StormOfChaos]: new DarkGiftModel("Storm of Chaos", "Covers an area with an effect that causes irritation and aggression.", Apostle.Muawijhe),
        [Endowment.SurgeOfFear]: new DarkGiftModel("Surge of Fear", "Instills a target with terror that causes vascular damage.", Apostle.Muawijhe),
        [Endowment.WalkAmongYou]: new DarkGiftModel("Walk Among You", "Allows the Heretic to walk unnoticed among other people.", Apostle.Muawijhe),
    };

    private _darkInk: { [id: number]: DarkInkModel } = {
        [Endowment.InkDarkBlade]: new DarkInkModel("Dark Blade", "A blade can be extracted from one of the Heretic's arms."),
        [Endowment.InkThornWhip]: new DarkInkModel("Thorn Whip", "A whip can be extracted from the Heretic's body."),
        [Endowment.InkHookedWeb]: new DarkInkModel("Hooked Web", "The Heretic can shoot a hooked web."),
        [Endowment.InkWeaveOfProtection]: new DarkInkModel("Weave of Protection", "The Heretic can summon a protective weave."),
        [Endowment.InkThreadsOfParalysis]: new DarkInkModel("Threads of Paralysis", "Summons paralysing threads."),
        [Endowment.InkDestructiveStrength]: new DarkInkModel("Destructive Strength", "Increases the Heretic's strength."),
        [Endowment.InkCrushingDensity]: new DarkInkModel("Crushing Density", "The density of the Heretic’s body increases considerably, tripling his body weight as bone, musculature, and skin all become more robust."),
        [Endowment.InkBaneOfGravity]: new DarkInkModel("Bane of Gravity", "If the Heretic jumps or falls, and is about to suffer damage as a result, this cloud forms at his feet and slows the fall to a degree that he lands unharmed."),
        [Endowment.InkEdgedStorm]: new DarkInkModel("Edged Storm", "A high-speed volley of sharp fragments comes hurling out from the Heretic’s palm."),
        [Endowment.InkTorrentOfInkedGlyphs]: new DarkInkModel("Torrent of Inked Glyphs", "A cloud engulfs the Heretic, obscuring vision and giving off an unsettling wailing sound."),
    };

    private _pesticus: { [id: number]: PesticumModel } = {
        [Endowment.PestAcidic]: new PesticumModel("Acidic", "The Heretic's blood turns into acid."),
        [Endowment.PestAdhesiveSlime]: new PesticumModel("Adhesive Slime", "Allows the Heretic to gobbet adhesive slime over short distances."),
        [Endowment.PestBrainInvasion]: new PesticumModel("Brain Invasion", "By invading a target's brain, the Heretic can put them to sleep and read/influence their thoughts."),
        [Endowment.PestElongate]: new PesticumModel("Elongate", "The Heretic's arms, legs, and neck become extremely flexible."),
        [Endowment.PestLimbDetachment]: new PesticumModel("Limb Detachment", "The Heretic may detach his arms, legs, and head from his body."),
        [Endowment.PestLiquefy]: new PesticumModel("Liquefy", "The Heretic's body becomes extremely soft and malleable, able to squeeze through almost any opening."),
        [Endowment.PestParasiteSwarm]: new PesticumModel("Parasite Swarm", "The Heretic's lungs are home to a hive of tiny parasitic insects, which can be expelled at will from the mouth and nose in a great swarm."),
        [Endowment.PestParasiticHealing]: new PesticumModel("Parasitic Healing", "Gives the Heretic the ability to restore his own physical health by drawing upon the vitality of others."),
        [Endowment.PestSensorySpores]: new PesticumModel("Sensory Spores", "Allows the Heretic to perceive the world through the senses of a target."),
        [Endowment.PestSlaveSlugs]: new PesticumModel("Slave Slugs", "Gives the Heretic control of the actions of another person."),
        [Endowment.PestVisceralExpulsion]: new PesticumModel("Visceral Expulsion", "The Heretic can force his ribcage open and reveal a mass of prehensile tentacles studded with shards of jagged bone, which can be used to attack or to aid movement."),
    };

    private _implants: { [id: number]: ImplantModel } = {
        [Endowment.ImplantReflexiveFiring]: new ImplantModel("Reflexive Firing", "The Heretic’s hand-eye coordination and reflexes have been rewired and made even more effective when wielding firearms."),
        [Endowment.ImplantClonedBody]: new ImplantModel("Cloned Body", "The Heretic has been granted a cloned body."),
        [Endowment.ImplantStigmaticExcision]: new ImplantModel("Stigmatic Excision", "Tekrons and Technomancers remove one of your Stigmata, using arcane bio-alchemy and precise necrosurgery."),
        [Endowment.ImplantEternalLife]: new ImplantModel("Eternal Life", "You have effectively become immune to the ravages of time. "),
        [Endowment.ImplantRegeneration]: new ImplantModel("Regeneration", "A complex system of necrotechnological glands secrete bizarre substances into your bloodstream that accelerate your body’s natural healing processes."),
        [Endowment.ImplantHibernation]: new ImplantModel("Hibernation", "Metabolism-regulating ganglia are surgically attached to your internal organs, allowing you to enter a state of suspended animation at will."),
        [Endowment.ImplantSelfRepair]: new ImplantModel("Self-Repair", "Allows the Heretic to regain wounds automatically."),
        [Endowment.ImplantPoisonSecretion]: new ImplantModel("Poison Secretion", "The Heretic’s hands contain a set of glands that allow him to secrete a potent contact poison from his palms."),
        [Endowment.ImplantPoisonNeutraliser]: new ImplantModel("Poison Neutraliser", "Through a cluster of artificial nerves and antivenin glands in the character’s chest, he has been made immune to poison."),
        [Endowment.ImplantDiseaseNeutraliser]: new ImplantModel("Disease Neutraliser", "The character’s immune system has been laced with cells engineered with blasphemous technology, which are constantly on the lookout for foreign bodies and other anomalies."),
        [Endowment.ImplantPheromoneEnhancer]: new ImplantModel("Pheromone Enhancer", "The character’s sweat glands have been extensively modified, allowing him to produce a cocktail of pheromones that put others at ease around him."),
        [Endowment.ImplantAdhesiveBristles]: new ImplantModel("Adhesive Bristles", "The soles of the character’s feet and the palms of his hands are now coated in thousands of tiny bristles that cling to surfaces."),
        [Endowment.ImplantGills]: new ImplantModel("Gills", "Allows the Heretic to breathe underwater."),
        [Endowment.ImplantBioWovenSkin]: new ImplantModel("Bio-Woven Skin", "The Heretic's skin becomes thick and armoured."),
        [Endowment.ImplantSubdermalArmour]: new ImplantModel("Subdermal Armour", "Impact and piercing resistant pads of synthetic cartilage are grafted beneath the character’s skin, improving his resistance to harm."),
        [Endowment.ImplantSkeletalRestructuring]: new ImplantModel("Skeletal Restructuring", "The structure and composition of the character’s bones has been altered, making them far denser and more able to withstand trauma."),
        [Endowment.ImplantPainBlocker]: new ImplantModel("Pain Blocker", "The character’s central nervous system is fitted with a series of implants that control and regulate pain responses."),
        [Endowment.ImplantNeurologicalAugmentation]: new ImplantModel("Neurological Augmentation", "Bio-engineered and symmetry-infused synapses are woven into the character’s brain tissue, unlocking latent neurological potential, and significantly enhancing his thought processes."),
        [Endowment.ImplantMuscularEnhancement]: new ImplantModel("Muscular Enhancement", "The sinews and muscles in the character’s body are enhanced with steel-hard fibres, alchemical steroids, and stranger treatments."),
        [Endowment.ImplantOptimisedMotorControl]: new ImplantModel("Optimised Motor Control", "A series of vat-grown clusters of glands and impulse accelerators are surgically implanted all through the character’s nervous system."),
        [Endowment.ImplantBodyReinforcement]: new ImplantModel("Body Reinforcement", "Special enzymes and hormones have been injected into the character’s bone marrow, which systematically reinforce and strengthen his internal organs, bones, and muscles."),
        [Endowment.ImplantIncreasedResolve]: new ImplantModel("Increased Resolve", "Numerous hormone regulators are seeded throughout the character’s brain, allowing him to suppress his fears, hone his focus, and heighten his mental resilience."),
        [Endowment.ImplantReflexEnhancement]: new ImplantModel("Reflex Enhancement", "The Heretic is now able to react, decide, and act more quickly than normal humans."),
        [Endowment.ImplantKnowledgePool]: new ImplantModel("Knowledge Pods", "Carefully cultivated in the liquefied brains of sacrificial victims, these pulsating pods are fitted into the character’s brain to confer knowledge and enhance skills."),
        [Endowment.ImplantClaws]: new ImplantModel("Claws", "Wicked, chitinous claws are implanted beneath the character’s fingernails."),
        [Endowment.ImplantSleepless]: new ImplantModel("Sleepless", "Implants that help regulate the character’s brain activity have been fused into his medulla oblongata, which emulates the physical and neurological activity that goes on in a sleeping body."),
        [Endowment.ImplantDarkVision]: new ImplantModel("Dark Vision", "The Heretic's eyes have been augmented or replaced by ones that allow him to see clearly in the dark."),
        [Endowment.ImplantBloodhound]: new ImplantModel("Bloodhound", "The Heretic's senses of smell and taste are massively heightened, allowing him to discern scent trails that ordinary humans cannot even detect."),
        [Endowment.ImplantMalleableFace]: new ImplantModel("Malleable Face", "The Heretic’s skin is fitted with tiny pigment glands, and his face is underlain with a mass of tiny muscles and pseudocartilage that shifts to alter its shape and appearance."),
        [Endowment.ImplantVoiceEmulator]: new ImplantModel("Voice Emulator", "The Heretic has perfect control of his voice, allowing him to mimic any voice he hears flawlessly, and even replicate sounds that no human voice could produce."),
        [Endowment.ImplantDispersalSacs]: new ImplantModel("Dispersal Sacs", "Allows the Heretic to exude an inky black cloud that hinders not only normal sight, but also interferes with thermal imaging, and muffles sounds."),
        [Endowment.ImplantSkeletalReinforcement]: new ImplantModel("Skeletal Reinforcement", "Necro-alchemical alloys and arcane bio-weaves have been implanted into the character’s bones, making him much more resistant to harm."),
        [Endowment.ImplantThreatPerception]: new ImplantModel("Threat Perception", "The animalistic, instinctive part of the character’s brain has been reinforced with additional synaptic connections, making him highly sensitive to potential threats and extremely aware of his surroundings."),
        [Endowment.ImplantStructuralAwareness]: new ImplantModel("Structural Awareness", "Allows the Heretic to discern the weak-points of creatures and objects far more quickly and effectively."),
        [Endowment.ImplantProjectilePerception]: new ImplantModel("Projectile Perception", "The Heretic's senses have been honed and refined to perceive and respond more quickly to gunfire."),
        [Endowment.ImplantControlNode]: new ImplantModel("Control Node", "This Implant allows the Heretic to communicate with other Heretics who also have this Implant, or who are using a necrobionic helmet."),
    };

    private _necrobionics: { [id: number]: NecrobionicModel } = {
        [Endowment.NecrobionicLimbArm]: new NecrobionicModel("Necrobionic Limb (Arm)", "One of the Heretic's arms has been replaced by a necrobionic enhancement."),
        [Endowment.NecrobionicLimbLeg]: new NecrobionicModel("Necrobionic Limb (Leg)", "One of the Heretic's legs has been replaced by a necrobionic enhancement."),
        [Endowment.NecrobionicRespiratorySystem]: new NecrobionicModel("Respiratory System", "Makes the Heretic immune to all harmful gases."),
        [Endowment.NecrobionicOrganReplacement]: new NecrobionicModel("Organ Replacement", "All internal organs have been replaced by necrobionic enhancements."),
        [Endowment.NecroHostImplant]: new NecrobionicModel("Host Implant", "Works like the associated biotechnological implant it hosts but does not suffer from Stigmata."),
        [Endowment.NecrobionicWristSocket]: new NecrobionicModel("Wrist Socket", "One of the Heretic's wrists has been replaced by a detachable enhancement that allows weapons and tools to be attached to the socket."),
        [Endowment.NecrobionicTargetingSystem]: new NecrobionicModel("Targeting System", "One of the character’s eyes has been replaced by a necrobionic version, which is imbued with an aggressive nature that aids him greatly when using a firearm."),
        [Endowment.NecroNeuralConduit]: new NecrobionicModel("Neural Conduit", "Allows the Heretic to interface directly with Dark Technology."),
        [Endowment.NecroHomonculus]: new NecrobionicModel("Necro-Homonculus", "The Heretic has a Homonculus that he can control."),
        [Endowment.NecrobionicRestructuring]: new NecrobionicModel("Necrobionic Restructuring", "Improves the Heretic's sensory perception, physical response and hand-eye coordination."),
    };

    getDarkGifts(apostle: Apostle) {
        var gifts: DarkGiftViewModel[] = [];
        var n = 0;

        for (var gift in this._gifts) {
            const darkGift = this._gifts[gift];
            if (darkGift.apostle === undefined || darkGift.apostle === apostle) {
                gifts.push(new DarkGiftViewModel(n, darkGift));
            }

            n++;
        }

        return gifts.sort((a, b) => a.name.localeCompare(b.name));
    }

    generateImplant() {
        let roll = Math.floor(Math.random() * 37) + 2;
        switch (roll) {
            case 2: return Endowment.ImplantReflexiveFiring;
            case 3: return Endowment.ImplantClonedBody;
            case 4: return Endowment.ImplantStigmaticExcision;
            case 5: return Endowment.ImplantEternalLife;
            case 6: return Endowment.ImplantRegeneration;
            case 7: return Endowment.ImplantHibernation;
            case 8: return Endowment.ImplantSelfRepair;
            case 9: return Endowment.ImplantPoisonSecretion;
            case 10: return Endowment.ImplantPoisonNeutraliser;
            case 11: return Endowment.ImplantDiseaseNeutraliser;
            case 12: return Endowment.ImplantPheromoneEnhancer;
            case 13: return Endowment.ImplantAdhesiveBristles;
            case 14: return Endowment.ImplantGills;
            case 15: return Endowment.ImplantBioWovenSkin;
            case 16: return Endowment.ImplantSubdermalArmour;
            case 17: return Endowment.ImplantSkeletalRestructuring;
            case 18: return Endowment.ImplantPainBlocker;
            case 19: return Endowment.ImplantNeurologicalAugmentation;
            case 20: return Endowment.ImplantMuscularEnhancement;
            case 21: return Endowment.ImplantOptimisedMotorControl;
            case 22: return Endowment.ImplantBodyReinforcement;
            case 23: return Endowment.ImplantIncreasedResolve;
            case 24: return Endowment.ImplantReflexEnhancement;
            case 25: return Endowment.ImplantKnowledgePool;
            case 26: return Endowment.ImplantClaws;
            case 27: return Endowment.ImplantSleepless;
            case 28: return Endowment.ImplantDarkVision;
            case 29: return Endowment.ImplantBloodhound;
            case 30: return Endowment.ImplantMalleableFace;
            case 31: return Endowment.ImplantVoiceEmulator;
            case 32: return Endowment.ImplantDispersalSacs;
            case 33: return Endowment.ImplantSkeletalReinforcement;
            case 34: return Endowment.ImplantThreatPerception;
            case 35: return Endowment.ImplantStructuralAwareness;
            case 36: return Endowment.ImplantProjectilePerception;
            case 37: return Endowment.ImplantControlNode;
            case 38:
            case 39: return this.generateNecrobionic();
        }

        return undefined;
    }

    generateNecrobionic() {
        let roll = Math.floor(Math.random() * 20) + 1;
        switch (roll) {
            case 1:
            case 2: return Endowment.NecrobionicLimbArm;
            case 3:
            case 4: return Endowment.NecrobionicLimbLeg;
            case 5:
            case 6: return Endowment.NecrobionicRespiratorySystem;
            case 7:
            case 8: return Endowment.NecrobionicOrganReplacement;
            case 9:
            case 10: return Endowment.NecroHostImplant;
            case 11:
            case 12: return Endowment.NecrobionicWristSocket;
            case 13:
            case 14: return Endowment.NecrobionicTargetingSystem;
            case 15:
            case 16: return Endowment.NecroNeuralConduit;
            case 17:
            case 18: return Endowment.NecroHomonculus;
            case 19:
            case 20: return Endowment.NecrobionicRestructuring;
        }
    }

    generateStigmata() {
        let roll = Math.floor(Math.random() * 37) + 2;
        switch (roll) {
            case 2: return "The Heretic’s eyes become bloodshot and constantly dart around, searching for a target. At times, they can look at widely different directions.";
            case 3: return "The Heretic has no fear of death and becomes indifferent in its presence. He exudes an otherworldly and eerie aura; there is simply something inhuman and disconcerting about him.";
            case 4: return this.generateStigmata();
            case 5: return "You take on the appearance of an adolescent and your voice breaks. You also gain an unnatural appearance, almost like a statue. Your skin is as pale and smooth as a baby’s.";
            case 6: return "The regeneration has gone a bit haywire, which results in vile, cancerous boils and lesions on your skin. You often have to cut them off your body, as they will hinder your movement, sight, and breathing if left to grow.";
            case 7: return "Your breathing and heart rate become shallow and faint to a state of imperceptibility, even while awake. A medical examination or very close observation are needed to detect these anomalies. It is also quite possible that people that you are intimate with physically might detect these oddities.";
            case 8: return "The areas that have been healed with the Self-Repair system will be horribly malformed. The flesh is scarred and disfigured. Though this will not affect movement in any way, multiple repairs will leave the character crooked and covered by keloid tissue.";
            case 9: return "The glands are constantly secreting a slimy yellowish fluid that has a dank stench. This substances is not poisonous, but the character leaves a residue on anything he touches.";
            case 10: return "The character’s skin takes on a sickly pallor and clamminess, and he becomes bloated. The glands in his chest swell and create several fist-sized protrusions.";
            case 11: return "The character often coughs, sniffles, sneezes, and shows symptoms of the various diseases he have been exposed to. Though somewhat uncomfortable, it does not impede him in any way.";
            case 12: return "The pheromones have gone into overdrive, and the character constantly exudes a musky odour that is pleasant to those attracted to his gender, but slightly sickening to those that are not, hampering his interactions with them.";
            case 13: return "The bristles never fully retract, which leaves the character’s palms and the bottom of his feet darkened. Touching them feels like touching Velcro hooks.";
            case 14: return "The gills are always visible, and the character’s neck is broadened to accommodate them.";
            case 15: return "The Implant is now revoltingly apparent. The armoured location becomes ridged and darkened. It is cold to the touch and resembles battered leather.";
            case 16: return "The cartilage mutates slightly and becomes lumpy. These lumps are clearly visible through the skin and form a disturbing ridged pattern.";
            case 17: return "The restructuring makes the character look like some form of cave man. His chest becomes barrel-like, while his brow protrudes, his eyes sink deep into their sockets, and his jaw becomes massive and square. It is plain for all to see that something is horribly wrong.";
            case 18: return "The blocker is constantly active, so the character never feels any pain. He is covered with small cuts, burns, and bruises, as he is unable to tell when he has injured himself.";
            case 19: return "The implanted brain matter fails at unlocking existing parts of his brain, and instead creates new tissue in order to increase brain capacity. As a result, his forehead swells and becomes covered with fat, throbbing veins in order to accommodate the expanded organ.";
            case 20: return "Unable to make the character’s muscle more efficient, the Implant generates an enormous amount of muscle mass to bolster his prowess. He swells with massive, vein-streaked muscles, becoming bulkier and more grotesque than any steroidladen body builder could ever imagine. His weight increases by thirty percent.";
            case 21: return "The character’s movements become unnaturally fluid, precise, and graceful. The precision with which he moves goes beyond impressive, and is plain unsettling to those around him.";
            case 22: return "The character suffers a form of atavism and his skin and hair take on a thick, oily quality. He grows more hair all over his body, becoming somewhat apelike.";
            case 23: return "The Implant has gone haywire, and even though he can control his primitive fears, the character’s strong will compels him to challenge those around him. Overall, he leans towards a much more socially aggressive alpha type of behaviour, which can make normal social situations quite awkward. He increases the Repercussion range of all Command, Lifestyle, and Persuade tests by two, owing to his off-putting and overly aggressive demeanor.";
            case 24: return "The character’s movements have become jerky. Between activities, he remains completely still, his only movement the frantic darting of his eyes. His whole movement pattern is like that of a lizard, and is utterly unnatural and frightening to those around him.";
            case 25: return "Tumorous bumps appear all over the character’s head, and they swell and pulsate when he uses skills associated with the Implant. These are off-putting to say the least.";
            case 26: return "The claws can no longer retract and their appearance becomes even more feral, more akin to talons. They can only be concealed by wearing large gloves.";
            case 27: return "Even though the character does not require sleep, he looks like he really needs it. His face becomes drawn, and heavy bags appear under his darkly circled, bloodshot eyes. He has an emaciated and unnaturally gaunt look.";
            case 28: return "The character’s eyes change dramatically and become unnatural. Each Stigmata is expressed differently but there is never anything subtle about it. Some sport cat-like eyes, others developed a faint red glow, while there are those whose eyes turn completely black.";
            case 29: return "The character’s nose constantly runs and his eyes tear as if he suffers from some severe allergy. The true reason is that he no longer possesses the ability to dampen his olfactory sensitivity, and it is affecting his mucus membranes.";
            case 30: return "The Implant has become unstable, and the character can only maintain his last facial mould for 1d6 hours. A couple of minutes before it is about to break down, he feels a warm tingle. His natural face is now a mess, and resembles a horrific mask of melted wax.";
            case 31: return "The character’s throat swells up and pulsates when he talks, and his natural voice has an unnatural and inhuman quality to it, which can only be avoided if he focuses and talks slowly. His concentration is noticeable to those around him.";
            case 32: return "The dispersal process is always running on low emission when not in use, which leaves the character’s armpits stained black with the fluid. It looks as though he is sweating ink. A constant odour of putrefaction surrounds him, which can only be covered with copious amounts of perfume.";
            case 33: return "The bone growth has gone somewhat out of control, which leave the character’s limbs overly thick and bulky. All his limbs and joints take on a swollen, arthritic look. Though it does not impede him in any way, these changes are very noticeable.";
            case 34: return "The character’s behaviour and mannerism are nervous and slightly paranoid. This behaviour is obvious to all around him, and can be interpreted in a lot of ways – none of them favourable.";
            case 35: return "The character cannot help but spot and poke at weak spots and pressure points every so often. While this does not cause harm, it is irritating and painful. He is hard-wired to cause harm, and cannot properly turn off that instinct. He may suppress this instinct for an hour with an Average D1 Willpower test. If this gift’s Stigmata worsens, he increases the difficulty of the Willpower test by one step each time.";
            case 36: return "The Implant’s trigger mechanism often fires when it should be inactive, or incorrectly reads the environment. This means that sometimes the character twitches or speedily sidesteps as if someone had fired a gun at him. This is only active when he is still, in a social situation, or not concentrating intensely, so it will not affect his overall performance, or put him in physical danger. However, it is very noticeable, and it is obvious that there is something very wrong with him.";
            case 37: return "Even when no one is transmitting to him, there are dark voices in the character’s head. From time to time, he cannot help repeating some of what they say. Reciting the Allegiance of Algeroth is frowned upon in most social circles, to say the least...";
            case 38:
            case 39: {
                roll = Math.floor(Math.random() * 20) + 1;
                switch (roll) {
                    case 1:
                    case 2:
                    case 3:
                    case 4: return "The muscle fibres are thick, slimy, and quivering, and beneath that, they look like perverted robotics constructed out of putrefied flesh and bones, and connected with gleaming metal tubes and wires.";
                    case 5:
                    case 6: return "The lungs are black, vein-streaked undulating sacks, glistening with a vile mucus. The surface and innards constantly roil, as they are covered by minute insectile necro-organisms.";
                    case 7:
                    case 8: return "All the organs are black and purple vein-streaked, undulating globs of tissue, which glisten with mucus. They are interconnected via quivering blood red tubes and pipes. The surface and innards constantly roil, as they are covered by minute insectile necro-organisms.";
                    case 9:
                    case 10: return this.generateStigmata();
                    case 11:
                    case 12: return "The tissues and bones beneath are weirdly translucent. Black fluids can be seen flowing from tissue to tissue.";
                    case 13:
                    case 14: return "The character’s eye is red and without any visible sclera, and is filled with infrared sensors that look like black speckles. The eye looks normal until it is damaged, or in use.";
                    case 15:
                    case 16: return "The nerve cord is thick and can be seen pulsating beneath the skin from time to time, looking swollen and infected.";
                    case 17:
                    case 18: return "The character has a slit in his stomach, beneath your naval. It is mostly hidden, but can be seen. If he loses half the wounds in his torso, rounded down, the creature is expelled. It will fall screeching and quivering to the ground and die within seconds.";
                    case 19:
                    case 20: return "The complete restructuring requires the replacement of the character’s blood with an alternate necrobionic fluid. This viscous, dark green fluid smells vile, and is visible to all when he bleeds.";
                }
            }
        }

        return "";
    }

    getImplant(implant: Endowment) {
        if (implant >= Endowment.NecrobionicLimbArm) {
            return this._necrobionics[implant];
        }
        else {
            return this._implants[implant];
        }
    }

    applyImplant(implant: Endowment) {
        switch (implant) {
            case Endowment.ImplantSubdermalArmour:
                character.woundsIncrease++;
                break;
            case Endowment.ImplantSkeletalRestructuring:
                character.criticalWoundsIncrease++;
                character.seriousWoundsIncrease++;
                break;
            case Endowment.ImplantNeurologicalAugmentation:
                if (character.attributes[Attribute.Intelligence].value < 16) {
                    character.attributes[Attribute.Intelligence].value++;
                }
                break;
            case Endowment.ImplantMuscularEnhancement:
                if (character.attributes[Attribute.Strength].value < 16) {
                    character.attributes[Attribute.Strength].value++;
                }
                break;
            case Endowment.ImplantSkeletalReinforcement:
                character.woundsIncrease++;
                character.criticalWoundsIncrease++;
                character.seriousWoundsIncrease++;
                break;
        }
    }

    generatePesticum() {
        let roll = Math.floor(Math.random() * 11) + 1;
        switch (roll) {
            case 1: return Endowment.PestAcidic;
            case 2: return Endowment.PestAdhesiveSlime;
            case 3: return Endowment.PestBrainInvasion;
            case 4: return Endowment.PestElongate;
            case 5: return Endowment.PestLimbDetachment;
            case 6: return Endowment.PestLiquefy;
            case 7: return Endowment.PestParasiteSwarm;
            case 8: return Endowment.PestParasiticHealing;
            case 9: return Endowment.PestSensorySpores;
            case 10: return Endowment.PestSlaveSlugs;
            case 11: return Endowment.PestVisceralExpulsion;
        }
    }

    getPesticum(pesticum: Endowment) {
        return this._pesticus[pesticum];
    }

    generateDarkInk() {
        let roll = Math.floor(Math.random() * 20) + 1;
        switch (roll) {
            case 1:
            case 2: return Endowment.InkDarkBlade;
            case 3:
            case 4: return Endowment.InkThornWhip;
            case 5:
            case 6: return Endowment.InkHookedWeb;
            case 7:
            case 8: return Endowment.InkWeaveOfProtection;
            case 9:
            case 10: return Endowment.InkThreadsOfParalysis;
            case 11:
            case 12: return Endowment.InkDestructiveStrength;
            case 13:
            case 14: return Endowment.InkCrushingDensity;
            case 15:
            case 16: return Endowment.InkBaneOfGravity;
            case 17:
            case 18: return Endowment.InkEdgedStorm;
            case 19:
            case 20: return Endowment.InkTorrentOfInkedGlyphs;
        }
    }

    getDarkInk(ink: Endowment) {
        return this._darkInk[ink];
    }

    generateBoon() {
        switch (character.patron) {
            case Apostle.Algeroth:
                return this.getImplant(this.generateImplant()).name;
            case Apostle.Demnogonis:
                return this.getPesticum(this.generatePesticum()).name;
            case Apostle.Ilian:
                character.numBoons++;
                return "One Weave";
            case Apostle.Semai:
            case Apostle.Muawijhe:
                return this.getDarkInk(this.generateDarkInk()).name;
        }

        return "";
    }

    getWeavings() {
        let weavings: DarkGiftViewModel[] = [];
        let n = 0;

        for (var gift in this._gifts) {
            var weaving = this._gifts[gift];
            if (weaving.apostle && weaving.apostle !== Apostle.Ilian) {
                weavings.push(new DarkGiftViewModel(n, weaving));
            }

            n++;
        }

        return weavings.sort((a, b) => a.name.localeCompare(b.name));
    }

    getDarkGift(gift: Endowment) {
        if (gift >= Endowment.CorruptDevice && gift <= Endowment.WalkAmongYou) {
            return this._gifts[gift];
        }
        else if (gift >= Endowment.InkDarkBlade && gift <= Endowment.InkTorrentOfInkedGlyphs) {
            return this._darkInk[gift];
        }
        else if (gift >= Endowment.PestAcidic && gift <= Endowment.PestVisceralExpulsion) {
            return this._pesticus[gift];
        }
        else if (gift >= Endowment.ImplantReflexiveFiring && gift <= Endowment.ImplantControlNode) {
            return this._implants[gift];
        }
        else if (gift >= Endowment.NecrobionicLimbArm && gift <= Endowment.NecrobionicRestructuring) {
            return this._necrobionics[gift];
        }
    }
}

export const DarkGiftHelper = new DarkGifts();