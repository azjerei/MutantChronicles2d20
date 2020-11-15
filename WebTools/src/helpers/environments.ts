import {character} from '../common/character';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {Faction, FactionsHelper} from './factions';
import {EquipmentHelper} from './equipment';
import {DiceRoller} from './diceRoller';
import { Source } from './sources';

export enum Environment {
    // Core
    LunaCity,
    HeritageWorld,
    HeritageFoothold,
    HeritageHotspot,
    Orbital,
    Sequestered,

    // Whitestar
    WhitestarBunker,
    Motherland,
    CentralEurope,
    WesternEurope,
    Scandinavia,
    Urals,
    AsteroidBelt,
    LunaMonitoringStation,
    ReclamationVessel,
    Petropol,
    Belokamen,
    Novozvedza,
    Urgamal,
    Vostmor,
    Zlogora,
}

class EnvironmentModel {
    name: string;
    attributes: Attribute[];
    skills: Skill[];
    equipment: string[];

    constructor(name: string, attributes: Attribute[], skills: Skill[], equipment: string[]) {
        this.name = name;
        this.attributes = attributes;
        this.skills = skills;
        this.equipment = equipment;
    }
}

class EnvironmentViewModel extends EnvironmentModel {
    id: Environment;

    constructor(id: Environment, base: EnvironmentModel) {
        super(base.name, base.attributes, base.skills, base.equipment);
        this.id = id;
    }
}

export class Environments {
    private _environments: { [id: number]: EnvironmentModel } = {
        [Environment.LunaCity]: new EnvironmentModel(
            "Luna City",
            [Attribute.Mental_Strength, Attribute.Personality],
            [Skill.Pilot],
            [
                "Basic Survival Kit (Urban)"
            ]),
        [Environment.HeritageWorld]: new EnvironmentModel(
            "Heritage World",
            [Attribute.Strength, Attribute.Personality],
            [Skill.Lifestyle],
            [
                "A favour owed by a contact in your own faction"
            ]),
        [Environment.HeritageFoothold]: new EnvironmentModel(
            "Heritage Foothold",
            [Attribute.Strength, Attribute.Physique],
            [Skill.Resistance],
            [
                "Basic Survival Kit (home region)|Basic Medkit"
            ]),
        [Environment.HeritageHotspot]: new EnvironmentModel(
            "Heritage Hotspot",
            [Attribute.Agility, Attribute.Physique],
            [Skill.Acrobatics],
            [
                `Heavy civilian shoulder pad|FACTION_HANDGUN|Basic Medkit`
            ]),
        [Environment.Orbital]: new EnvironmentModel(
            "Orbital or Minor heritage location",
            [Attribute.Mental_Strength, Attribute.Personality],
            [Skill.Survival],
            [
                "Vacuum Suit|Colonial Survival Kit (home region)"
            ]),
        [Environment.Sequestered]: new EnvironmentModel(
            "Sequestered",
            [Attribute.Physique, Attribute.Coordination],
            [Skill.Willpower],
            [
                "High society clothing",
                "Notable object of personal significance",
                "Meditation room",
                EquipmentHelper.getPersonalLibraries()
            ]),
        [Environment.WhitestarBunker]: new EnvironmentModel(
            "Luna City: Whitestar Bunker",
            [Attribute.Mental_Strength, Attribute.Personality],
            [Skill.Education, Skill.Thievery],
            [
                "A portfolio of schematics and engineering designs|Several tattered tabloid magazines from various corporations|A collection of letters from a distant relative on Earth|A jar of sticky confectionaries."
            ]),
        [Environment.Motherland]: new EnvironmentModel(
            "Heritage World: Motherland",
            [Attribute.Mental_Strength, Attribute.Physique],
            [Skill.Athletics, Skill.Survival],
            [
                "A rough map detailing an underground route that connects several Strongholds|A basic survival kit for travel underground|An ancestor’s recipe book of various mushroom dishes"
            ]),
        [Environment.CentralEurope]: new EnvironmentModel(
            "Heritage Foothold: Central Europe",
            [Attribute.Intelligence, Attribute.Physique],
            [Skill.Mechanics, Skill.Survival],
            [
                "A charred and barely legible map of pre-Exodus Europe|A basic survival kit for travel through the Wastelands|A chipped statuette of a pre-Exodus cult icon"
            ]),
        [Environment.WesternEurope]: new EnvironmentModel(
            "Heritage Hotspot: Western Europe",
            [Attribute.Physique, Attribute.Strength],
            [Skill.Survival, Skill.Willpower],
            [
                EquipmentHelper.getFactionHandguns(Faction.Whitestar) + "|Passage booked on an underground transport circuit to Kosmograd|A pockmarked respirator"
            ]),
        [Environment.Scandinavia]: new EnvironmentModel(
            "Heritage Hotspot: Scandinavia",
            [Attribute.Awareness, Attribute.Physique],
            [Skill.Survival, Skill.Treatment],
            [
                EquipmentHelper.getFactionHandguns(Faction.Whitestar) + "|A basic medical kit with hypothermia treatment medicine|A military compass."
            ]),
        [Environment.Urals]: new EnvironmentModel(
            "Heritage Hotspot: Urals",
            [Attribute.Agility, Attribute.Physique],
            [Skill.Observation, Skill.Survival],
            [
                "A basic set of climbing gear|Battered textbooks that are a heritage of your family’s ancestry|" + EquipmentHelper.getFactionHandguns(Faction.Whitestar)
            ]),
        [Environment.AsteroidBelt]: new EnvironmentModel(
            "Minor Location: Asteroid Belt",
            [Attribute.Coordination, Attribute.Intelligence],
            [Skill.Resistance, Skill.Science],
            [
                "A cabin class ticket to Luna – fifty percent paid|A globe of the asteroid made from semi-precious metals|A colonial survival kit|A single handheld short wave radio with an expired battery"
            ]),
        [Environment.LunaMonitoringStation]: new EnvironmentModel(
            "Orbital: Luna Monitoring Station",
            [Attribute.Agility, Attribute.Personality],
            [Skill.Mechanics, Skill.Pilot],
            [
                "Your dad’s old wrench (cudgel)|A shiny belt buckle imprinted with an old version of another faction’s logo|Travel pass to Earth aboard a Whitestar transport|A chipped miniature telescope"
            ]),
        [Environment.ReclamationVessel]: new EnvironmentModel(
            "Orbital: Reclamation Vessel",
            [Attribute.Awareness, Attribute.Personality],
            [Skill.Education, Skill.Persuade],
            [
                "A piece of battered pre-Fall tech that no longer functions|Several letters from a minor acquaintance made within another faction|A well-worn vacuum suit"
            ]),
        [Environment.Petropol]: new EnvironmentModel(
            "Nova Zembla: Petropol",
            [Attribute.Mental_Strength, Attribute.Personality],
            [Skill.Lifestyle, Skill.Thievery],
            [
                "A badge or pin proclaiming loyalty to a metro faction|A notched and worn heirloom machete|A basic medkit"
            ]),
        [Environment.Belokamen]: new EnvironmentModel(
            "Nova Zembla: Belokamen",
            [Attribute.Intelligence, Attribute.Physique],
            [Skill.Education, Skill.Lifestyle],
            [
                "Badge or pin connecting you to one of the many committees or bureaus|A minor religious artefact recovered from the Cathedral of Dormition|A protective suit that is proof against light acid storms"
            ]),
        [Environment.Novozvedza]: new EnvironmentModel(
            "Novozvedza",
            [Attribute.Coordination, Attribute.Physique],
            [Skill.Pilot, Skill.Survival],
            [
                "A well-used grappling hook and rope|Heirloom pilot goggles|Basic survival kit"
            ]),
        [Environment.Urgamal]: new EnvironmentModel(
            "Urgamal",
            [Attribute.Strength, Attribute.Personality],
            [Skill.Mechanics, Skill.Persuade],
            [
                "An expired traders pass|A much-thumbed photograph of a visiting corporate celebrity|Basic mechanic’s toolbox"
            ]),
        [Environment.Vostmor]: new EnvironmentModel(
            "Vostmor",
            [Attribute.Agility, Attribute.Physique],
            [Skill.Acrobatics, Skill.Survival],
            [
                "An old, pre-Exodus naval chart|A flare gun with two Reloads|An engraved telescope heirloom"
            ]),
        [Environment.Zlogora]: new EnvironmentModel(
            "Zlogora",
            [Attribute.Intelligence, Attribute.Physique],
            [Skill.Education, Skill.Medicine],
            [
                "A letter from the Tsarina inviting an ancestor to an honorary dinner|The uniform of a Streltsy officer bequeathed by a relative|A favour owed by an important member of staff within Mertruka Base"
            ]),
    };

    getEnvironments() {
        var envs: EnvironmentViewModel[] = [];
        var n = 0;
        for (var env in this._environments) {
            var okToAdd = false;

            if (character.heritage !== Faction.Whitestar) {
                if (n < Environment.WhitestarBunker) {
                    okToAdd = true;        
                }
            }
            else {
                if (n >= Environment.WhitestarBunker) {
                    okToAdd = true;
                }
            }

            if (okToAdd) {
                var e = this._environments[env];
                envs.push(new EnvironmentViewModel(n, e));
            }

            n++
        }

        return envs;
    }

    getEnvironment(env: Environment) {
        return this._environments[env];
    }

    generateEnvironment() {
        var roll = Math.floor(Math.random() * 6) + 1;
        var env: Environment = undefined;

        if (character.heritage === Faction.Whitestar) {
            return this.generateWhitestarEnvironment(roll);
        }

        switch (roll) {
            case 1: env = Environment.LunaCity; break;
            case 2: env = Environment.HeritageWorld; break;
            case 3: env = Environment.HeritageFoothold; break;
            case 4: env = Environment.HeritageHotspot; break;
            case 5: env = Environment.Orbital; break;
            case 6: env = Environment.Sequestered; break;
        }

        return env;
    }

    applyEnvironment(env: Environment) {
        // Do not apply environment stuff to Imperials made with the Imperial supplement rules,
        // because they get their bonuses from their Clan instead.
        if (character.faction === Faction.Imperial && character.hasSource(Source.Imperial)) {
            return;
        }

        const environment = this.getEnvironment(env);

        environment.equipment.forEach(eq => {
            if (eq.indexOf('|') === -1) {
                character.addEquipment(eq);
            }
        });

        if (env === Environment.WhitestarBunker ||
            env === Environment.CentralEurope ||
            env === Environment.Urals ||
            env === Environment.AsteroidBelt ||
            env === Environment.ReclamationVessel ||
            env === Environment.Petropol ||
            env === Environment.Belokamen) {
            const roll = DiceRoller.rollSpecial(1, 0);
            if (roll.special >= 1) {
                character.earnings++;
            }
        }
        else {
            const roll = Math.floor(Math.random()*6)+1;
            if (roll >= 4) {
                character.earnings++;
            }
        }
    }

    getRegions(faction: Faction, environment: Environment) {
        if (faction === Faction.Whitestar && character.hasSource(Source.Whitestar)) {
            return []; // Handled differently.
        }

        switch (environment) {
            case Environment.LunaCity:
                switch (faction) {
                    case Faction.Mishima:
                        return ["Tai-Show Industrial Port", "Cherry Blossom District"];
                    case Faction.Bauhaus:
                        return ["Gotland", "The Nines"];
                    case Faction.Imperial:
                        return ["The Smokes"];
                    case Faction.Capitol:
                        return ["Lesser Mars", "Soutside", "The Bore"];
                    case Faction.Cybertronic:
                        return ["The Cybertronic Building"];
                    case Faction.Whitestar:
                        return ["Whitestar Bunker"];
                }
                break;
            case Environment.HeritageWorld:
                switch (faction) {
                    case Faction.Mishima:
                        return ["Mercury: Longshore", "Mercury: Akirenko", "Mercury: Tambu"];
                    case Faction.Bauhaus:
                        return ["Venus: Heimburg", "Venus: Petragrad", "Venus: Bernheim"];
                    case Faction.Imperial:
                        return ["Asteroid Belt: Victoria"];
                    case Faction.Capitol:
                        return ["Mars: City of San Dorado"];
                    case Faction.Cybertronic:
                        return ["Ganymede", "Ceres Base"];
                    case Faction.Whitestar:
                        return ["Earth: Motherland"];
                }
                break;
            case Environment.HeritageFoothold:
                switch (faction) {
                    case Faction.Mishima:
                        return ["Mars: Hosokawa", "Mars: Sensomachi"];
                    case Faction.Bauhaus:
                        return ["Mars: Mundburg", "Mars: San Dorado Bauhausian Quarter", "Mars: Freedom Lands"];
                    case Faction.Imperial:
                        return ["Mercury: Fukido"];
                    case Faction.Capitol:
                        return ["Venus: Graveton Archipelago"];
                    case Faction.Cybertronic:
                        return [...this.generateOriginFactionRegions(character.environment)];
                    case Faction.Whitestar:
                        return ["Earth: Central Europe"];
                }
                break;
            case Environment.HeritageHotspot:
                switch (faction) {
                    case Faction.Mishima:
                        return ["Venus: Quanto"];
                    case Faction.Bauhaus:
                        return ["Venus: Graveton Archipelago", "Venus: Volksburg", "Venus: Romburg", "Venus: Isolated Settlement"];
                    case Faction.Imperial:
                        return ["Ganymede", "Titan"];
                    case Faction.Capitol:
                        return ["Mars: The Doughpits", "Mars: McCraig Line", "Mars: Burroughs", "Mars: Overton", "Mars: Canals", "Mars: Vega", "Mars: Gilden", "Mars: Hope", "Mars: Shieldspar"];
                    case Faction.Cybertronic:
                        return [...this.generateOriginFactionRegions(character.environment)];
                    case Faction.Whitestar:
                        return []; // Random
                }
                break;
            case Environment.Orbital:
                switch (faction) {
                    case Faction.Mishima:
                        return ["Mars: Southern Banners"];
                    case Faction.Bauhaus:
                        return ["Venus: Triumvar", "Venus: Novakursk", "Venus: Torburg"];
                    case Faction.Imperial:
                        return ["Asteroid Belt: Diemansland", "Jupiter: Trojans"];
                    case Faction.Capitol:
                        return ["Mars Orbit: Eos", "Peacekeeper Station", "Mercury: Longshore", "Mercury: Fukido", "Asteroid Mining Colonies"];
                    case Faction.Cybertronic:
                        return ["Secret Trojan Location", "Asteroid Facility"];
                    case Faction.Whitestar:
                        return []; // Random
                }
                break;
            case Environment.Sequestered:
                switch (faction) {
                    case Faction.Mishima:
                        return ["Seven Sages Temple", "Diplomatic Compound", "Research Base"];
                    case Faction.Bauhaus:
                        return ["Asteroid Estate", "Research Outpost"];
                    case Faction.Imperial:
                        return ["Clan Fortress", "Clan Estate"];
                    case Faction.Capitol:
                        return ["Mars: The Great Rust Desert", "Mars: Nomad Tribe Home", "Mars: The Freedom Lands", "Mars: The Ice Caps", "Mars: Trans-Martian Railroad Outpost"];
                    case Faction.Cybertronic:
                        return ["Mars: Cyberopolis"];
                    case Faction.Whitestar:
                        return []; // Random
                }
                break;
        }
    }

    private generateWhitestarEnvironment(roll: number) {
        switch (roll) {
            case 1: return Environment.WhitestarBunker;
            case 2: return Environment.Motherland;
            case 3: return Environment.CentralEurope;
            case 4: return this.generateWhitestarHeritageHotspot();
            case 5: return this.generateWhitestarMinorLocation();
            case 6: return this.generateWhitestarSequestered();
        }
    }

    private generateWhitestarHeritageHotspot() {
        const roll = Math.floor(Math.random()*6)+1;
        switch (roll) {
            case 1:
            case 2: return Environment.WesternEurope;
            case 3:
            case 4: return Environment.Scandinavia;
            case 5:
            case 6: return Environment.Urals;
        }
    }

    private generateWhitestarMinorLocation() {
        const roll = Math.floor(Math.random()*6)+1;
        switch (roll) {
            case 1:
            case 2: return Environment.AsteroidBelt;
            case 3:
            case 4: return Environment.LunaMonitoringStation;
            case 5:
            case 6: return Environment.ReclamationVessel;
        }
    }

    private generateWhitestarSequestered() {
        const roll = Math.floor(Math.random()*6)+1;
        switch (roll) {
            case 1: return Environment.Petropol;
            case 2: return Environment.Belokamen;
            case 3: return Environment.Novozvedza;
            case 4: return Environment.Urgamal;
            case 5: return Environment.Vostmor;
            case 6: return Environment.Zlogora;
        }
    }

    private generateOriginFactionRegions(environment: Environment) {
        var faction = FactionsHelper.generateHeritage();
        while (faction === Faction.Cybertronic) {
            faction = FactionsHelper.generateHeritage();
        }

        return this.getRegions(faction, environment);
    }
}

export const EnvironmentsHelper = new Environments();