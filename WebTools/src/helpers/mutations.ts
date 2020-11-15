import {character} from '../common/character';

export enum Mutation {
    // Lesser
    Acceleration,
    ArmourPlating,
    BolsterMinds,
    CoaxTechnology,
    Density,
    DimensionalTeleport,
    DistortionBolt,
    GuardianLink,
    Immolate,
    PatternPulse,
    PsionicBlade,
    PsionicNavigation,
    PsychicEcho,
    Quadralimbs,
    Regeneration,
    Revivify,
    Unseen,
    VoidAdaptation,

    // Major
    CleanseCorruption,
    CleanseSoul,
    DimensionalRift,
    Disintegrate,
    EmotionalShift,
    EnergyStorm,
    Equivalence,
    FuryOfTheAncients,
    GravitationalSphere,
    HandsOfLazarus,
    Hibernation,
    Incorporeal,
    ProtectiveSphere,
    PsionicConstruction,
    PsionicBioSculpting,
    PurgeSymmetry,
    PurifyDarkTechnology,
    Repel,
    Telepathy,

    RollMajor,
}

class MutationModel {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}

class MutationViewModel extends MutationModel {
    id: Mutation;

    constructor(id: Mutation, base: MutationModel) {
        super(base.name, base.description);
        this.id = id;
    }
}

interface IMutationPrerequisite {
    isFulfilled(): boolean;
}

class MutationPrerequisite implements IMutationPrerequisite {
    private _mutation: string;

    constructor(mutation: string) {
        this._mutation = mutation;
    }

    isFulfilled() {
        return true;//character.hasMutation(this._mutation);
    }
}

class VariableMutationPrerequisite implements IMutationPrerequisite {
    private _mutation1: string;
    private _mutation2: string;

    constructor(mutation1: string, mutation2: string) {
        this._mutation1 = mutation1;
        this._mutation2 = mutation2;
    }

    isFulfilled() {
        return true;//character.hasMutation(this._mutation1) || character.hasMutation(this._mutation2);
    }
}

class Mutations {
    private _mutations: { [id: number]: MutationModel } = {
        [Mutation.Acceleration]: new MutationModel("Acceleration", "This power allows the mutant to move and act with extreme bursts of speed, allowing him to not only run faster, but also perform actions much more rapidly and even launch multiple attacks in the blink of an eye."),
        [Mutation.ArmourPlating]: new MutationModel("Armour Plating", "Stimulating their inherent physical mutation and enhancing it with psionic shielding allows the mutant enhance their natural armour to the point that it is capable of absorbing increasing amounts of physical and supernatural attacks."),
        [Mutation.BolsterMinds]: new MutationModel("Bolster Minds", "This power is used to strengthen the mental fortitude of the mutant and potentially his allies. It aids in resisting fear, madness and mental attacks."),
        [Mutation.CoaxTechnology]: new MutationModel("Coax Technology", "By forging a psionic link to an item, the mutant is able to operate the equipment without actually having to manipulate it via the item’s regular user interface."),
        [Mutation.Density]: new MutationModel("Density", "The density of the mutant’s body increases many times over, becoming highly reactive to kinetic shock, which causes them to solidify whenever a large area of the body is exposed to such a force."),
        [Mutation.DimensionalTeleport]: new MutationModel("Dimensional Teleport", "Essentially a short distance teleportation power, the mutant can teleport himself and any equipment he is carrying from his current location to another."),
        [Mutation.DistortionBolt]: new MutationModel("Distortion Bolt", "The mutant is able to fire off a bright blue bolt that will slam into its target and cause searing physical damage."),
        [Mutation.GuardianLink]: new MutationModel("Guardian Link", "A mutant can manifest this power in order to form a psychic bond with a target of their choosing. Once established, the bond allows the mutant to communicate telepathically with the recipient across vast distances."),
        [Mutation.Immolate]: new MutationModel("Immolate", "Immolate is an extreme and aggressive manifestation of Guardian power that allows the mutant to engulf himself in a swirling layer of blue hot flame. Whilst in this state, he becomes immune to fire and scorches anything that he comes into contact with."),
        [Mutation.PatternPulse]: new MutationModel("Pattern Pulse", "This extremely potent and useful power allows the mutant to release an expanding ring of psionic energy that causes the air to ripple in a seemingly explosive manner."),
        [Mutation.PsionicBlade]: new MutationModel("Psionic Blade", "The mutant is able to sculpt his psionic energy into a physical form that can be used as a formidable weapon."),
        [Mutation.PsionicNavigation]: new MutationModel("Psionic Navigation", "In addition to ensuring that he never gets lost whilst planet-side, a mutant who is able to manifest this power can employ it to navigate the usually unfathomable depths of dimensional rifts with exact precision."),
        [Mutation.PsychicEcho]: new MutationModel("Psychic Echo", "Every location possesses a psychic echo, the acts that have occurred there. Mutants with this power are able to read these echoes and auras in order to determine events at the location."),
        [Mutation.Quadralimbs]: new MutationModel("Quadralimbs", "Those who can manifest this power are temporarily able to sport two fully grown pairs of arms, both pairs of which darken in colour to match a Guardian’s blue skin tone."),
        [Mutation.Regeneration]: new MutationModel("Regeneration", "Regeneration can be used to reattach severed limbs and repair damaged organs, or even grow new ones should they have been destroyed completely."),
        [Mutation.Revivify]: new MutationModel("Revivify", "With this power, the mutant is able to instantly heal physical damage and mental trauma affecting both himself and others."),
        [Mutation.Unseen]: new MutationModel("Unseen", "This power allows the mutant to become nigh invisible."),
        [Mutation.VoidAdaptation]: new MutationModel("Void Adaptation", "This power allows the mutant to adapt to space. He becomes impervious to the cold, most forms of solar radiation, and gains the ability to withstand a certain amount of heat."),

        [Mutation.CleanseCorruption]: new MutationModel("Cleanse Corruption", "This power can rid a location or item of any and all taint that is currently staining it. Cleanse Corruption will not affect living beings, but will work on any type of thinking machine or piece of technology that has not been crafted using the Dark Symmetry."),
        [Mutation.CleanseSoul]: new MutationModel("Cleanse Soul", "The mutant can use this power to draw the corruption out of a Heretic, remove access to Dark Gifts, or excise Endowments such as biotechnical or necrobionic Implants."),
        [Mutation.DimensionalRift]: new MutationModel("Dimensional Rift", "Dimensional Rift is an awesome display of power that allows the mutant to transport himself and others across extreme distances by folding a suitable vehicle through a rift that connects two separate points of the solar system together in both space and time."),
        [Mutation.Disintegrate]: new MutationModel("Disintegrate", "This extremely destructive and deadly power can be used to utterly annihilate an opponent. It will affect most materials and works as equally well on the flesh of the living as it does on blasphemous undead forms of life, such as the foul minions of the Dark Legion."),
        [Mutation.EmotionalShift]: new MutationModel("Emotional Shift", "With this power, the mutant is able to drastically alter the emotional inclinations of a person. "),
        [Mutation.EnergyStorm]: new MutationModel("Energy Storm", "By drawing upon ambient energies and infusing them with his own psionic potency, the mutant is able to blanket an entire area in a deadly and disruptive energy storm. "),
        [Mutation.Equivalence]: new MutationModel("Equivalence", "Equivalence is a very useful power that grants the mutant the ability to replicate the powers of another creature. "),
        [Mutation.FuryOfTheAncients]: new MutationModel("Fury of the Ancients", " A mutant that can manifest this power is able agitate his inner psionic energy into an exponentially increasing vortex that will also amplify ambient energies into vast torrents of psychic potential. "),
        [Mutation.GravitationalSphere]: new MutationModel("Gravitational Sphere", "By psionically altering gravitational properties, the mutant is able to lift living creatures and heavy objects alike through force of will alone."),
        [Mutation.HandsOfLazarus]: new MutationModel("Hands of Lazarus", "In the simplest of terms, the mutant can return the dead to a healthy and vibrant state of life."),
        [Mutation.Hibernation]: new MutationModel("Hibernation", "Normally only used when the mutant is forced to enter the state as a means of survival or obfuscation, this power is used to place either himself or other willing creatures into a state of hibernation."),
        [Mutation.Incorporeal]: new MutationModel("Incorporeal", "Use of this power allows the mutant to become insubstantial. He appears semi-translucent once in this state, is unaffected by physical attacks, and is now able to pass through solid barriers."),
        [Mutation.ProtectiveSphere]: new MutationModel("Protective Sphere", "The mutant is able to generate a psionically charged sphere that can prevent high velocity physical attacks, such as bullets and explosions, and chemical or mystical attacks."),
        [Mutation.PsionicConstruction]: new MutationModel("Psionic Construction", "Through Psionic Construction, a mutant is able to build advanced structures and technological components from very simple raw materials."),
        [Mutation.PsionicBioSculpting]: new MutationModel("Psionic Bio-sculpting", "Psionic Bio-Sculpting gifts the mutant with the ability to temporarily inflict drastic changes upon the body of a living organism using an entirely painless psionically imbued surgical procedure."),
        [Mutation.PurgeSymmetry]: new MutationModel("Purge Symmetry", "When manifested, this power creates a sphere of psionic energy around the mutant that will cause the servants of the Dark Symmetry and many of their effects to lose much of their potency; Dark Gifts, Symmetry powered technology and creatures of the Dark Legion will have a much harder time functioning within the sphere."),
        [Mutation.PurifyDarkTechnology]: new MutationModel("Purify Dark Technology", "Using this gift, the mutant is able to not only rid human technology of Corruption, he can also completely purify a piece of technology that has been crafted by the Dark Symmetry of all the malicious, unfettered taint that has been used to empower it."),
        [Mutation.Repel]: new MutationModel("Repel", "The mutant can use this power to provide resistance to the effects of any and all mystical powers, regardless of their source."),
        [Mutation.Telepathy]: new MutationModel("Telepathy", "When manifesting this power, the mutant is able to not only communicate with others telepathically, but is also capable of forcing his way into the furthest recesses of the target’s mind in order to lay their subconscious bare and scour their darkest secrets."),

        [Mutation.RollMajor]: new MutationModel("Major Psionic Power", "Roll for a random Major Psionic Power.")
    };

    generateLesserPower() {
        switch (Math.floor(Math.random() * 20) + 1) {
            case 1:
            case 20:
                return [...this.getLesserPowers(), ...this.generateMajorPower()];
            case 2:
                return [Mutation.Acceleration];
            case 3:
                return [Mutation.ArmourPlating];
            case 4:
                return [Mutation.BolsterMinds];
            case 5:
                return [Mutation.CoaxTechnology];
            case 6:
                return [Mutation.Density];
            case 7:
                return [Mutation.DimensionalTeleport];
            case 8:
                return [Mutation.DistortionBolt];
            case 9:
                return [Mutation.GuardianLink];
            case 10:
                return [Mutation.Immolate];
            case 11:
                return [Mutation.PatternPulse];
            case 12:
                return [Mutation.PsionicBlade];
            case 13:
                return [Mutation.PsionicNavigation];
            case 14:
                return [Mutation.PsychicEcho];
            case 15:
                return [Mutation.Quadralimbs];
            case 16:
                return [Mutation.Regeneration];
            case 17:
                return [Mutation.Revivify];
            case 18:
                return [Mutation.Unseen];
            case 19:
                return [Mutation.VoidAdaptation];
        }
    }

    generateMajorPower() {
        switch (Math.floor(Math.random() * 20) + 1) {
            case 1:
                return this.getMajorPowers();
            case 2:
                return [Mutation.CleanseCorruption];
            case 3:
                return [Mutation.CleanseSoul];
            case 4:
                return [Mutation.DimensionalRift];
            case 5:
                return [Mutation.Disintegrate];
            case 6:
                return [Mutation.EmotionalShift];
            case 7:
                return [Mutation.EnergyStorm];
            case 8:
                return [Mutation.Equivalence];
            case 9:
                return [Mutation.FuryOfTheAncients];
            case 10:
                return [Mutation.GravitationalSphere];
            case 11:
                return [Mutation.HandsOfLazarus];
            case 12:
                return [Mutation.Hibernation];
            case 13:
                return [Mutation.Incorporeal];
            case 14:
                return [Mutation.ProtectiveSphere];
            case 15:
                return [Mutation.PsionicConstruction];
            case 16:
                return [Mutation.PsionicBioSculpting];
            case 17:
                return [Mutation.PurgeSymmetry];
            case 18:
                return [Mutation.PurifyDarkTechnology];
            case 19:
                return [Mutation.Repel];
            case 20:
                return [Mutation.Telepathy];
        }
    }

    getMutation(mutation: Mutation) {
        return this._mutations[mutation];
    }

    getMutationByName(name: string) {
        for (var mut in this._mutations) {
            const mutation = this._mutations[mut];
            if (mutation.name === name) {
                return mutation;
            }
        }

        return null;
    }

    private getLesserPowers() {
        return [
            Mutation.Acceleration,
            Mutation.ArmourPlating,
            Mutation.BolsterMinds,
            Mutation.CoaxTechnology,
            Mutation.Density,
            Mutation.DimensionalTeleport,
            Mutation.DistortionBolt,
            Mutation.GuardianLink,
            Mutation.Immolate,
            Mutation.PatternPulse,
            Mutation.PsionicBlade,
            Mutation.PsionicNavigation,
            Mutation.PsychicEcho,
            Mutation.Quadralimbs,
            Mutation.Regeneration,
            Mutation.Revivify,
            Mutation.Unseen,
            Mutation.VoidAdaptation,
        ];
    }

    private getMajorPowers() {
        return [
            Mutation.CleanseCorruption,
            Mutation.CleanseSoul,
            Mutation.DimensionalRift,
            Mutation.Disintegrate,
            Mutation.EmotionalShift,
            Mutation.EnergyStorm,
            Mutation.Equivalence,
            Mutation.FuryOfTheAncients,
            Mutation.GravitationalSphere,
            Mutation.HandsOfLazarus,
            Mutation.Hibernation,
            Mutation.Incorporeal,
            Mutation.ProtectiveSphere,
            Mutation.PsionicConstruction,
            Mutation.PsionicBioSculpting,
            Mutation.PurgeSymmetry,
            Mutation.PurifyDarkTechnology,
            Mutation.Repel,
            Mutation.Telepathy,
        ];
    }
}

export const MutationsHelper = new Mutations();