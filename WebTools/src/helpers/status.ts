import {character} from '../common/character';
import {Faction, FactionsHelper} from './factions';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {EquipmentHelper} from './equipment';
import {Source} from './sources';

export enum Status {
    // Core
    UnemployedUnderclass,
    EmployedUnderclass,
    WorkingLower,
    WorkingMiddle,
    Upper,
    Elite,

    // Capitol
    Underclass,
    WorkingPoor,
    WorkingClass,
    LowerMiddleClass,
    UpperMiddleClass,
    CapitalistClass,

    // Whitestar
    ThoseWhoGather,
    ThoseWhoRenew,
    ThoseWhoPreserve,
    ThoseWhoOrganise,
    ThoseWhoGovern,
    ThoseWhoCounsel, // TODO: reduce size of button font to fit this

    // Bauhaus
    Thrall,
    Commoner,
    Retainer,
    Nobility,
    NobleGreatHouse,
    NobleElectorHouse,

    // Mishima
    Faceless,
    Worker,
    Guildsman,
    Ronin,
    Life,
    LowShareholder,
    HighShareholder,
    Lord,
};

class StatusModel {
    name: string;
    attributes: Attribute[];
    skills: Skill[];
    earnings: number;
    equipment: string[];
    factions: Faction[];
    roll: number;

    constructor(name: string, attributes: Attribute[], skills: Skill[], earnings: number, equipment: string[], factions: Faction[], roll: number) {
        this.name = name;
        this.attributes = attributes;
        this.skills = skills;
        this.earnings = earnings;
        this.equipment = equipment;
        this.factions = factions;
        this.roll = roll;
    }
}

export class StatusViewModel extends StatusModel {
    id: Status;

    constructor(id: Status, base: StatusModel) {
        super(base.name, base.attributes, base.skills, base.earnings, base.equipment, base.factions, base.roll);
        this.id = id;
    }
}

export class Statuses {
    private _statuses: { [id: number]: StatusModel } = {
        [Status.UnemployedUnderclass]: new StatusModel(
            "Unemployed Underclass",
            [Attribute.Strength, Attribute.Agility],
            [Skill.CloseCombat],
            0,
            [
                "A battered pack of cards",
                "Several worn paperback novels",
                "A postcard from Luna",
                "A battered hip flask"
            ],
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar],
            2),
        [Status.EmployedUnderclass]: new StatusModel(
            "Employed Underclass",
            [Attribute.Physique, Attribute.Strength],
            [Skill.Survival],
            1,
            [
                "A mini-torch",
                "Pocket knife (slicer)",
                "A lighter",
                "A military issue wristwatch",
                "Set of polished military boots",
                "Travel pass"
            ],
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar],
            5),
        [Status.WorkingLower]: new StatusModel(
            "Working Lower",
            [Attribute.Physique, Attribute.Strength],
            [Skill.Resistance],
            2,
            [
                "Third Place sports trophy",
                "Work goggles with one cracked lens",
                "Your dad’s old wrench (cudgel)",
                "A video of your grandfather meeting someone important",
                "A cabin class ticket to Luna – 50% paid",
                "A fast food chain discount card",
                "Several sets of military dog tags"
            ],
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar],
            8),
        [Status.WorkingMiddle]: new StatusModel(
            "Working Middle",
            [Attribute.Physique, Attribute.Personality],
            [Skill.Observation],
            3,
            [
                "Employee of the Month mug",
                "Shiny belt buckle with your faction’s logo",
                "Lifetime subscription to TV channel package",
                "Mini-torch"
            ],
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar],
            10),
        [Status.Upper]: new StatusModel(
            "Upper",
            [Attribute.Mental_Strength, Attribute.Personality],
            [Skill.Lifestyle],
            4,
            [
                "Statuette of someone famous",
                "VIP card from a flashy casino or club",
                EquipmentHelper.getFactionSwords(),
                "A family portrait"
            ],
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar],
            11),
        [Status.Elite]: new StatusModel(
            "Elite",
            [Attribute.Mental_Strength, Attribute.Personality],
            [Skill.Persuade],
            5,
            [
                "An heirloom rifle hung over the fireplace",
                "A globe of your faction’s homeworld made of platinum and gems",
                "A ceremonial suit or uniform worn by a celebrated member of the family",
                "A bottle of very ancient brandy",
                "A gilded holy icon"
            ],
            [Faction.Freelancer, Faction.Criminal, Faction.Microcorp, Faction.Imperial, Faction.Cybertronic, Faction.Whitestar],
            12),

        [Status.Underclass]: new StatusModel(
            "Underclass",
            [Attribute.Strength, Attribute.Agility],
            [Skill.CloseCombat],
            0,
            [
                "A set of rough dice",
                "A collection of bottle caps",
                "Slicer",
                "A book of matches from a worker’s club",
                "A beggar’s sign",
                "A tin cup with a few coins"
            ],
            [Faction.Capitol],
            102),
        [Status.WorkingPoor]: new StatusModel(
            "Working Poor",
            [Attribute.Physique, Attribute.Strength],
            [Skill.Survival],
            1,
            [
                "Battered tourist guide to Mars",
                "Military recruitment brochure",
                "Baseball cap with the Capitol emblem on it",
                "Poster or pin-up of a celebrity",
                "Mars train rail ticket",
                "Snowglobe of the San Dorado skyline"
            ],
            [Faction.Capitol],
            105),
        [Status.WorkingClass]: new StatusModel(
            "Working Class",
            [Attribute.Physique, Attribute.Strength],
            [Skill.Resistance],
            2,
            [
                "Discount card for a local comedy club",
                "Stained coasters from a favourite bar",
                "Collection of old beer bottles",
                "Chipped ‘piggy bank’ or jar of change"
            ],
            [Faction.Capitol],
            108),
        [Status.LowerMiddleClass]: new StatusModel(
            "Lower Middle Class",
            [Attribute.Physique, Attribute.Personality],
            [Skill.Observation],
            3,
            [
                "Comic book collection",
                "VIP membership for a local movie theatre",
                "Employee of the month mug",
                "Memorabilia from the last election"
            ],
            [Faction.Capitol],
            110),
        [Status.UpperMiddleClass]: new StatusModel(
            "Upper Middle Class",
            [Attribute.Mental_Strength, Attribute.Personality],
            [Skill.Lifestyle],
            4,
            [
                "A couple of pieces of heirloom jewellery in a safety deposit box",
                "A collection of pocket watches",
                "A wall-map of Mars with pins marking places visited",
                "A signed piece of sports memorabilia",
                "A few hunting trophies"
            ],
            [Faction.Capitol],
            111),
        [Status.CapitalistClass]: new StatusModel(
            "Capitalist Class",
            [Attribute.Mental_Strength, Attribute.Personality],
            [Skill.Persuade],
            5,
            [
                "A framed copy of your first stock certificate",
                "A photo of you or a family member with the President",
                "Several signed celebrity photos (one of which has a phone number)"
            ],
            [Faction.Capitol],
            112),
        [Status.ThoseWhoGather]: new StatusModel(
            "Those Who Gather",
            [Attribute.Physique, Attribute.Strength],
            [Skill.Survival],
            1,
            [
                "A battered deck of cards", 
                "Pocket knife (slicer)",
                "Several worn paperback novels",
                "A postcard from a relation in another Stronghold",
                "A set of polished army boots"
            ],
            [Faction.Whitestar],
            202),
        [Status.ThoseWhoRenew]: new StatusModel(
            "Those Who Renew",
            [Attribute.Physique, Attribute.Intelligence],
            [Skill.Mechanics],
            1,
            [
                "Mini-torch",
                "Lighter",
                "Military issue wristwatch",
                "Mementos from your parents’ Pilgrimage",
                "Your dad’s old wrench (cudgel)"
            ],
            [Faction.Whitestar],
            205),
        [Status.ThoseWhoPreserve]: new StatusModel(
            "Those Who Preserve",
            [Attribute.Physique, Attribute.Mental_Strength],
            [Skill.CloseCombat],
            2,
            [
                "A belt buckle or shoulder pad with your employer’s sigil on it",
                "An old video of an ancestor meeting someone important",
                "Several sets of military dog-tags",
                "A battered hip flask"
            ],
            [Faction.Whitestar],
            208),
        [Status.ThoseWhoOrganise]: new StatusModel(
            "Those Who Organise",
            [Attribute.Awareness, Attribute.Personality],
            [Skill.Observation],
            2,
            [
                "Statuette of a famous ancestor or Bishop",
                "Tovarich of the Month cup",
                "Well-used sword that pre-dates the holocaust",
                "A family portrait"
            ],
            [Faction.Whitestar],
            210),
        [Status.ThoseWhoGovern]: new StatusModel(
            "Those Who Govern",
            [Attribute.Intelligence, Attribute.Personality],
            [Skill.Education],
            2,
            [
                "An heirloom rifle hung over the fireplace",
                "A well-thumbed book full of the misdeeds of Stronghold inhabitants",
                "a mismatched set of keys recovered from the Wasteland",
                "An elaborate stein that belonged to your grandfather"
            ],
            [Faction.Whitestar],
            211),
        [Status.ThoseWhoCounsel]: new StatusModel(
            "Those Who Counsel",
            [Attribute.Mental_Strength, Attribute.Personality],
            [Skill.Persuade],
            3,
            [
                "A bottle of very ancient brandy",
                "A gilded holy icon",
                "A globe of the Earth from pre-Exodus",
                "A photo of an ancestor dining with the Tsarina on the Zolotoy Glaz"
            ],
            [Faction.Whitestar],
            212),
        [Status.Thrall]: new StatusModel(
            "Thrall",
            [Attribute.Agility, Attribute.Strength],
            [Skill.Resistance],
            0,
            [
                "Battered deck of cards",
                "Several worn paperback novels",
                "Postcard from family in another city",
                "Battered hip flask"
            ],
            [Faction.Bauhaus],
            302),
        [Status.Commoner]: new StatusModel(
            "Commoner",
            [Attribute.Physique, Attribute.Strength],
            [Skill.Survival],
            1,
            [
                "Mini-torch",
                "Pocket knife (slicer)",
                "Lighter",
                "Military-issue wristwatch",
                "Set of polished army boots",
                "Mementos from your parents’ Pilgrimage"
            ],
            [Faction.Bauhaus],
            305),
        [Status.Retainer]: new StatusModel(
            "Retainer",
            [Attribute.Awareness, Attribute.Mental_Strength],
            [Skill.Education],
            2,
            [
                "Belt buckle with your employer’s sigil on it",
                "Shoulder pad with your employer's suigil on it",
                "Old video of an ancestor meeting someone important",
                "Several sets of military dog-tags",
                "Your dad’s old wrench (cudgel)"
            ],
            [Faction.Bauhaus],
            308),
        [Status.Nobility]: new StatusModel(
            "Nobility",
            [],
            [Skill.None],
            3,
            [
                "Statuette of a famous ancestor",
                "Statuette of a previous Cardinal",
                "VIP card from a prestigious club",
                "Duelling Sabre",
                "Family portrait"
            ],
            [Faction.Bauhaus],
            310),
        [Status.NobleGreatHouse]: new StatusModel(
            "Noble: Great House",
            [],
            [Skill.None],
            4,
            [],
            [Faction.Bauhaus],
            311),
        [Status.NobleElectorHouse]: new StatusModel(
            "Noble: Electoral House",
            [],
            [Skill.None],
            5,
            [],
            [Faction.Bauhaus],
            312),
        [Status.Faceless]: new StatusModel(
            "Commoner: Faceless",
            [Attribute.Physique, Attribute.Agility],
            [Skill.Survival],
            0,
            [
                "A battered pack of cards", 
                "A postcard from Luna", 
                "A battered hip flask"
            ],
            [Faction.Mishima],
            402),
        [Status.Worker]: new StatusModel(
            "Commoner: Worker",
            [Attribute.Physique, Attribute.Strength],
            [Skill.Resistance],
            1,
            [
                "A headlamp", 
                "A pocketknife", 
                "A lighter", 
                "A military issue wristwatch", 
                "A travel pass"
            ],
            [Faction.Mishima],
            405),
        [Status.Guildsman]: new StatusModel(
            "Commoner: Guildsman",
            [Attribute.Physique, Attribute.Strength],
            [Skill.Mechanics],
            2,
            [
                "A set of well-used precision tools", 
                "A video of your grandfather meeting someone important", 
                "A ticket to Luna – 50% paid", 
                "A fast food chain discount card"
            ],
            [Faction.Mishima],
            408),
        [Status.Life]: new StatusModel(
            "Samurai: Life",
            [Attribute.Physique, Attribute.Strength],
            [Skill.CloseCombat],
            2,
            [
                "A treasured scroll with the logo of your company",
                "A treasured flag with the logo of your company",
            ],
            [Faction.Mishima],
            408),
        [Status.Ronin]: new StatusModel(
            "Samurai: Ronin",
            [Attribute.Physique, Attribute.Strength],
            [Skill.CloseCombat],
            2,
            [
                "A treasured scroll with the logo of your company",
                "A treasured flag with the logo of your company",
            ],
            [Faction.Mishima],
            408),
        [Status.LowShareholder]: new StatusModel(
            "Samurai: Low Shareholder",
            [Attribute.Agility, Attribute.Strength],
            [Skill.Observation],
            3,
            [
                "Employee of the Month trophy", 
                "Lifetime subscription to a TV channel package", 
                "A copy of a poem rendered in a master’s calligraphy"
            ],
            [Faction.Mishima],
            410),
        [Status.HighShareholder]: new StatusModel(
            "Samurai: High Shareholder",
            [Attribute.Mental_Strength, Attribute.Personality],
            [Skill.Persuade],
            4,
            [
                "VIP card from a flashy members-only club", 
                "Master-crafted sword from a grandparent", 
                "A family portrait"
            ],
            [Faction.Mishima],
            411),
        [Status.Lord]: new StatusModel(
            "Samurai Lord",
            [Attribute.Awareness, Attribute.Personality],
            [Skill.Lifestyle],
            5,
            [
                "An heirloom sword hung on the wall", 
                "A globe of Mercury made of platinum and gems", 
                "Ceremonial court robes worn by a celebrated member of the family", 
                "Bejewelled statue of a Sage"
            ],
            [Faction.Mishima],
            412),
    };

    getStatuses() {
        var statuses: StatusViewModel[];

        if (character.heritage === Faction.Capitol && character.hasSource(Source.Capitol)) {
            statuses = [
                new StatusViewModel(Status.Underclass, this._statuses[Status.Underclass]),
                new StatusViewModel(Status.WorkingPoor, this._statuses[Status.WorkingPoor]),
                new StatusViewModel(Status.WorkingClass, this._statuses[Status.WorkingClass]),
                new StatusViewModel(Status.LowerMiddleClass, this._statuses[Status.LowerMiddleClass]),
                new StatusViewModel(Status.UpperMiddleClass, this._statuses[Status.UpperMiddleClass]),
                new StatusViewModel(Status.CapitalistClass, this._statuses[Status.CapitalistClass])
            ];
        }
        else if (character.heritage === Faction.Whitestar && character.hasSource(Source.Whitestar)) {
            statuses = [
                new StatusViewModel(Status.ThoseWhoGather, this._statuses[Status.ThoseWhoGather]),
                new StatusViewModel(Status.ThoseWhoRenew, this._statuses[Status.ThoseWhoRenew]),
                new StatusViewModel(Status.ThoseWhoPreserve, this._statuses[Status.ThoseWhoPreserve]),
                new StatusViewModel(Status.ThoseWhoOrganise, this._statuses[Status.ThoseWhoOrganise]),
                new StatusViewModel(Status.ThoseWhoGovern, this._statuses[Status.ThoseWhoGovern]),
                new StatusViewModel(Status.ThoseWhoCounsel, this._statuses[Status.ThoseWhoCounsel])
            ];
        }
        else if (character.heritage === Faction.Bauhaus && character.hasSource(Source.Bauhaus)) {
            statuses = [
                new StatusViewModel(Status.Thrall, this._statuses[Status.Thrall]),
                new StatusViewModel(Status.Commoner, this._statuses[Status.Commoner]),
                new StatusViewModel(Status.Retainer, this._statuses[Status.Retainer]),
                new StatusViewModel(Status.Nobility, this._statuses[Status.Nobility]),
                new StatusViewModel(Status.NobleGreatHouse, this._statuses[Status.NobleGreatHouse]),
                new StatusViewModel(Status.NobleElectorHouse, this._statuses[Status.NobleElectorHouse])
            ];
        }
        else if (character.heritage === Faction.Mishima && character.hasSource(Source.Mishima)) {
            statuses = [
                new StatusViewModel(Status.Faceless, this._statuses[Status.Faceless]),
                new StatusViewModel(Status.Worker, this._statuses[Status.Worker]),
                new StatusViewModel(Status.Guildsman, this._statuses[Status.Guildsman]),
                new StatusViewModel(Status.Ronin, this._statuses[Status.Ronin]),
                new StatusViewModel(Status.Life, this._statuses[Status.Life]),
                new StatusViewModel(Status.LowShareholder, this._statuses[Status.LowShareholder]),
                new StatusViewModel(Status.HighShareholder, this._statuses[Status.HighShareholder]),
                new StatusViewModel(Status.Lord, this._statuses[Status.Lord])
            ];
        }
        else {
            statuses = [
                new StatusViewModel(Status.UnemployedUnderclass, this._statuses[Status.UnemployedUnderclass]),
                new StatusViewModel(Status.EmployedUnderclass, this._statuses[Status.EmployedUnderclass]),
                new StatusViewModel(Status.WorkingLower, this._statuses[Status.WorkingLower]),
                new StatusViewModel(Status.WorkingMiddle, this._statuses[Status.WorkingMiddle]),
                new StatusViewModel(Status.Upper, this._statuses[Status.Upper]),
                new StatusViewModel(Status.Elite, this._statuses[Status.Elite])
            ];
        }

        return statuses;
    }

    getStatus(status: Status) {
        return this._statuses[status];
    }

    generateStatus() {
        var roll = Math.floor(Math.random() * 11) + 2;
        var statuses = this.getStatuses();
        var n = 0;

        if (character.heritage === Faction.Capitol && character.hasSource(Source.Capitol)) {
            roll += 100;
        }
        else if (character.heritage === Faction.Whitestar && character.hasSource(Source.Whitestar)) {
            roll += 200;
        }
        else if (character.heritage === Faction.Bauhaus && character.hasSource(Source.Bauhaus)) {
            roll += 300;
        }
        else if (character.heritage === Faction.Mishima && character.hasSource(Source.Mishima)) {
            roll += 400;
        }

        for (var i = 0; i < statuses.length; i++) {
            if (statuses[i].roll >= roll) {
                if (statuses[i].id === Status.Guildsman) {
                    return [Status.Guildsman, Status.Life, Status.Ronin, Status.Ronin]; // Need 2 Ronin because last is clipped
                }

                return [statuses[i].id];
            }
        }

        return null;
    }

    applyStatus(status: Status) {
        var s = this.getStatus(status);

        s.attributes.forEach(a => {
            character.attributes[a].value++;
        });
        
        character.earnings = s.earnings;

        if ((status >= Status.WorkingPoor && status <= Status.CapitalistClass) ||
            (status >= Status.Worker && status <= Status.Lord)) {
            character.assets += s.earnings;

            if (status === Status.LowerMiddleClass) character.fame += 1;
            else if (status === Status.UpperMiddleClass) character.fame += 2;
            else if (status === Status.CapitalistClass) character.fame += 3;
        }

        if (status === Status.Faceless || status === Status.Ronin) {
            character.addEvent("Add one to your repercussion range for Command, Lifestyle and Persuade tests when dealing with Samurai.");
        }
    }

    reduceStatus() {
        const statuses = this.getStatuses();
        let minimum = statuses[0].id;

        if (character.isSamurai()) {
            minimum = Status.Ronin;
        }

        if (character.status > minimum) {
            character.status--;
            character.earnings = Math.max(character.earnings - 1, 0);
        }
    }

    increaseStatus() {
        const statuses = this.getStatuses();

        if (character.status < statuses[statuses.length - 1].id) {
            character.status++;
            character.earnings++;
        }
    }
}

export const StatusHelper = new Statuses();