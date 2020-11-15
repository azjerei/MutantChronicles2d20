import {character} from '../common/character';
import {Timeline} from './timelines';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {PrimaryCareer} from './primaryCareers';
import {Education, EducationsHelper} from './educations';
import {EquipmentHelper} from './equipment';
import {Faction} from './factions';

export enum Clan {
    Axelthorpe,
    Bartholomew,
    Brannaghan,
    Drougan,
    Dunsirn,
    Fergan,
    Fieldhausen,
    Finn,
    Gallagher,
    Kingsfield,
    Loughton,
    MacGuire,
    Morgan,
    Murdoch,
    Murray,
    OLoughton,
    Oakenfist,
    Paladine,
    Smythe,

    Any
}

interface IFamily {
    name: string;
    roll: number;
    socialStanding: number;
    earnings: number;
}

class ClanModel {
    name: string;
    families: IFamily[];
    attributes: Attribute[];
    skills: Skill[];
    trappings: string[];
    familyBusiness: PrimaryCareer[];

    constructor(name: string, families: IFamily[], attributes: Attribute[], skills: Skill[], trappings: string[], familyBusiness: PrimaryCareer[]) {
        this.name = name;
        this.families = families;
        this.attributes = attributes;
        this.skills = skills;
        this.trappings = trappings;
        this.familyBusiness = familyBusiness;
    }
}

export class ClanViewModel extends ClanModel {
    id: Clan;

    constructor(id: Clan, base: ClanModel) {
        super(base.name, base.families, base.attributes, base.skills, base.trappings, base.familyBusiness);
        this.id = id;
    }
}

class Clans {
    private _clans: { [id: number]: ClanModel } = {
        [Clan.Axelthorpe]: new ClanModel(
            "Axelthorpe",
            [
                { name: "Axelthorpe", socialStanding: 5, earnings: 4, roll: 7 },
                { name: "Affiliated Family", socialStanding: 4, earnings: 3, roll: 20 },
            ],
            [Attribute.Intelligence, Attribute.Mental_Strength, Attribute.Personality],
            [Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [
                "Belt buckle with clan emblem",
                "Tie with clan emblem",
                "Membership of an exclusive club on Luna",
                "Statuette of a famous ancestor",
                "Photograph of a famous ancestor",
                "Painting of a famous ancestor",
                "Lifetime subscription to TV channel package",
                "Lifetime subscription to newspaper"
            ],
            [PrimaryCareer.CorporateExecutive]),
        [Clan.Bartholomew]: new ClanModel(
            "Bartholomew",
            [
                { name: "Bartholomew", socialStanding: 6, earnings: 5, roll: 7 },
                { name: "Grendel", socialStanding: 5, earnings: 4, roll: 12 },
                { name: "Affiliated Family", socialStanding: 3, earnings: 3, roll: 20 },
            ],
            [Attribute.Awareness, Attribute.Intelligence, Attribute.Personality],
            [Skill.Observation, Skill.Persuade, Skill.Mechanics],
            [
                "Heirloom weapon hung over the fireplace",
                "Globe of Luna made of precious metals",
                "Statuette of a famous ancestor",
                "Photograph of a famous ancestor",
                "Painting of a famous ancestor",
                "High-quality briefcase",
                "Recommendation to an exclusive Imperial tailor"
            ],
            [PrimaryCareer.IntelligenceOperative]),
        [Clan.Brannaghan]: new ClanModel(
            "Brannaghan",
            [
                { name: "Brannaghan", socialStanding: 4, earnings: 3, roll: 7 },
                { name: "Affiliated Family", socialStanding: 3, earnings: 2, roll: 20 },
            ],
            [Attribute.Agility, Attribute.Physique, Attribute.Intelligence],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Treatment],
            [
                "Belt buckle with clan emblem",
                "Shoulder pad with clan emblem",
                "Medical insurance (Restr 1, Maint 3)",
                "Ancestor's medical texts (Personal Library: Medicine)",
                "Sword",
                "Aggressor Handgun|Negotiator Heavy Pistol|Serenity Pistol|Regulator Pistol"
            ],
            [
                PrimaryCareer.MilitaryBasic,
                PrimaryCareer.MilitaryTrencher,
                PrimaryCareer.MilitaryReservist,
                PrimaryCareer.MilitaryGreyGhost,
                PrimaryCareer.MilitaryWolfbairn,
                PrimaryCareer.MilitaryClanRegiment
            ]),
        [Clan.Drougan]: new ClanModel(
            "Drougan",
            [
                { name: "Drougan", socialStanding: 4, earnings: 3, roll: 19 },
                { name: "Affiliated Family", socialStanding: 3, earnings: 2, roll: 20 },
            ],
            [Attribute.Strength, Attribute.Personality, Attribute.Physique],
            [Skill.CloseCombat, Skill.RangedWeapons, Skill.Resistance],
            [
                "Bottle of exceptional whiskey saved for a special occasion",
                "Hip-flask full of decent whiskey",
                "Sword",
                "Aggressor Handgun|Negotiator Heavy Pistol|Serenity Pistol|Regulator Pistol",
                "Belt buckle with clan emblem",
                "Shoulder pad with clan emblem"
            ],
            [
                PrimaryCareer.MilitaryBasic,
                PrimaryCareer.MilitaryTrencher,
                PrimaryCareer.MilitaryReservist,
                PrimaryCareer.MilitaryGreyGhost,
                PrimaryCareer.MilitaryWolfbairn,
                PrimaryCareer.MilitaryClanRegiment
            ]),
        [Clan.Dunsirn]: new ClanModel(
            "Dunsirn",
            [
                { name: "Dunsirn", socialStanding: 4, earnings: 3, roll: 12 },
                { name: "Kimberly", socialStanding: 3, earnings: 2, roll: 14 },
                { name: "Affiliated Family", socialStanding: 2, earnings: 1, roll: 20 },
            ],
            [Attribute.Awareness, Attribute.Coordination, Attribute.Intelligence],
            [Skill.Education, Skill.Mechanics, Skill.Survival],
            [
                "Collection of maps of the Dunsirn estates",
                "Gilt-edged notebook of high-quality paper",
                "Subscription to a major newspaper",
                "Trophy of some exotic animal from an old hunting trip"
            ],
            [PrimaryCareer.TechnicalRepairman]),
        [Clan.Fergan]: new ClanModel(
            "Fergan",
            [
                { name: "Fergan", socialStanding: 4, earnings: 3, roll: 12 },
                { name: "Affiliated Family", socialStanding: 3, earnings: 2, roll: 20 },
            ],
            [Attribute.Coordination, Attribute.Personality, Attribute.Physique],
            [Skill.AnimalHandling, Skill.Pilot, Skill.Survival],
            [
                "Motorcycle",
                "Guard dog (working animal)",
                EquipmentHelper.getFactionAssaultRifles(Faction.Imperial)
            ],
            [PrimaryCareer.FarmerFrontiersman]),
        [Clan.Fieldhausen]: new ClanModel(
            "Fieldhausen",
            [
                { name: "Fieldhausen", socialStanding: 4, earnings: 3, roll: 20 },
            ],
            [Attribute.Coordination, Attribute.Intelligence, Attribute.Mental_Strength],
            [Skill.Mechanics, Skill.Pilot, Skill.Science],
            [
                "Portfolio of schematics and engineering designs",
                "Mechanic's repair kit",
                "Collection of letters from a distant relative in Bauhaus",
                "Belt buckle with clan emblem"
            ],
            [PrimaryCareer.TechnicalRepairman, PrimaryCareer.ShipCrew]),
        [Clan.Finn]: new ClanModel(
            "Finn",
            [
                { name: "Finn", socialStanding: 4, earnings: 3, roll: 12 },
                { name: "Affiliated Family", socialStanding: 3, earnings: 2, roll: 20 },
            ],
            [Attribute.Intelligence, Attribute.Mental_Strength, Attribute.Personality],
            [Skill.Treatment, Skill.Persuade, Skill.Willpower],
            [
                "Belt buckle with clan emblem",
                "Shoulder pad with clan emblem",
                "Medical insurance (Restr 1, Maint 3)",
                "Ancestor's medical texts (Personal Library: Medicine)"
            ],
            [PrimaryCareer.MedicalFirstResponder]),
        [Clan.Gallagher]: new ClanModel(
            "Gallagher",
            [
                { name: "Gallagher", socialStanding: 5, earnings: 4, roll: 7 },
                { name: "Rourke", socialStanding: 4, earnings: 4, roll: 15 },
                { name: "Affiliated Family", socialStanding: 3, earnings: 2, roll: 20 },
            ],
            [Attribute.Coordination, Attribute.Intelligence, Attribute.Personality],
            [Skill.CloseCombat, Skill.Mechanics, Skill.Command],
            [
                "Clansman Claymore",
                "Old blood-stained Vengeance Company regimental banner",
                "Extensive listing of the Gallagher family tree",
                "Old decorative map of Keep Gladius"
            ],
            [
                PrimaryCareer.TechnicalRepairman,
                PrimaryCareer.MilitaryBasic,
                PrimaryCareer.MilitaryTrencher,
                PrimaryCareer.MilitaryReservist,
                PrimaryCareer.MilitaryGreyGhost,
                PrimaryCareer.MilitaryWolfbairn,
                PrimaryCareer.MilitaryClanRegiment
            ]),
        [Clan.Kingsfield]: new ClanModel(
            "Kingsfield",
            [
                { name: "Kingsfield", socialStanding: 3, earnings: 2, roll: 20 },
            ],
            [Attribute.Coordination, Attribute.Physique, Attribute.Mental_Strength],
            [Skill.RangedWeapons, Skill.Resistance, Skill.Willpower],
            [
                "Detailed ledger of grudges and vendettas against other clans",
                "Old Black Hearts dress uniform",
                "Key to a safety deposit box on Victoria, containing old Kingsfield treasures",
                "Box full of letters from relatives who left Imperial"
            ],
            [PrimaryCareer.IntelligenceOperative]),
        [Clan.Loughton]: new ClanModel(
            "Loughton",
            [
                { name: "Loughton", socialStanding: 5, earnings: 4, roll: 14 },
                { name: "Affiliated Family", socialStanding: 3, earnings: 2, roll: 20 },
            ],
            [Attribute.Intelligence, Attribute.Coordination, Attribute.Physique],
            [Skill.Mechanics, Skill.Pilot, Skill.Space],
            [
                "Abridged copy of the Book of Law",
                "Mechanic's repair kit",
                "Statuette of the First Cardinal",
                "Shoulder pad with clan emblem",
                "Beret with clan emblem",
                "Flight helmet with clan emlem"
            ],
            [PrimaryCareer.TechnicalRepairman]),
        [Clan.MacGuire]: new ClanModel(
            "MacGuire",
            [
                { name: "MacGuire", socialStanding: 6, earnings: 5, roll: 7 },
                { name: "Affiliated Family", socialStanding: 2, earnings: 2, roll: 20 },
            ],
            [Attribute.Agility, Attribute.Strength, Attribute.Personality],
            [Skill.CloseCombat, Skill.Lifestyle, Skill.Persuade],
            [
                "Ornamental orrery of the solar system",
                "Platinum-plated skull of a Nepharite in a sanctified case",
                "Clansman Claymore",
                "Bottle of ancient liquor"
            ],
            [
                PrimaryCareer.MilitaryBasic,
                PrimaryCareer.MilitaryTrencher,
                PrimaryCareer.MilitaryReservist,
                PrimaryCareer.MilitaryGreyGhost,
                PrimaryCareer.MilitaryWolfbairn,
                PrimaryCareer.MilitaryClanRegiment
            ]),
        [Clan.Morgan]: new ClanModel(
            "Morgan",
            [
                { name: "Morgan", socialStanding: 4, earnings: 3, roll: 16 },
                { name: "Affiliated Family", socialStanding: 3, earnings: 2, roll: 20 },
            ],
            [Attribute.Awareness, Attribute.Intelligence, Attribute.Mental_Strength],
            [Skill.Mechanics, Skill.Observation, Skill.Insight],
            [
                "Assortment of disassembled electronics (3 Parts)",
                "Deck of playing cards printed with the Clan Morgan emblem",
                "Declaration of purity signed by an Inquisitor Majoris",
                "Folder of surveillance reports on suspected Heretics"
            ],
            [
                PrimaryCareer.TechnicalRepairman,
                PrimaryCareer.AcademicResearcher,
                PrimaryCareer.AcademicSolicitor
            ]),
        [Clan.Murdoch]: new ClanModel(
            "Murdoch",
            [
                { name: "Murdoch", socialStanding: 5, earnings: 4, roll: 6 },
                { name: "Affiliated Family", socialStanding: 2, earnings: 2, roll: 20 },
            ],
            [Attribute.Agility, Attribute.Physique, Attribute.Personality],
            [Skill.Command, Skill.Lifestyle, Skill.Persuade],
            [
                "Large ornamental book describing the history of Imperial",
                "Artwork depicting one or more of the Murdoch Serenities",
                "Membership of an exclusive club",
                "Walking stick topped with a golden lion rampant",
                "Sword",
                "Aggressor Handgun|Negotiator Heavy Pistol|Serenity Pistol|Regulator Pistol"
            ],
            [PrimaryCareer.CorporateExecutive]),
        [Clan.Murray]: new ClanModel(
            "Murray",
            [
                { name: "Murray", socialStanding: 4, earnings: 3, roll: 5 },
                { name: "Lyon", socialStanding: 3, earnings: 2, roll: 9 },
                { name: "Atkinson", socialStanding: 3, earnings: 2, roll: 13 },
                { name: "Affiliated Family", socialStanding: 1, earnings: 3, roll: 20 },
            ],
            [Attribute.Physique, Attribute.Intelligence, Attribute.Personality],
            [Skill.Mechanics, Skill.Resistance, Skill.Science],
            [
                EquipmentHelper.getFactionAssaultRifles(Faction.Imperial),
                "Sword",
                "Shoulder pad with clan emblem",
                "Belt buckle with clan emblem",
                "Small cask of high-quality ale",
                "Engraved tankard with clan emblem"
            ],
            [PrimaryCareer.TechnicalRepairman]),
        [Clan.OLoughton]: new ClanModel(
            "O'Loughton",
            [
                { name: "O'Loughton", socialStanding: 3, earnings: 2, roll: 7 },
                { name: "Affiliated Family", socialStanding: 2, earnings: 1, roll: 20 },
            ],
            [Attribute.Strength, Attribute.Physique, Attribute.Personality],
            [Skill.Persuade, Skill.Survival, Skill.Vacuum],
            [
                "Miliary-issue wristwatch",
                "Set of polished military boots",
                "Knife",
                "Several sets of military dog tags"
            ],
            [
                PrimaryCareer.MilitaryBasic,
                PrimaryCareer.MilitaryTrencher,
                PrimaryCareer.MilitaryReservist,
                PrimaryCareer.MilitaryGreyGhost,
                PrimaryCareer.MilitaryWolfbairn,
                PrimaryCareer.MilitaryClanRegiment
            ]),
        [Clan.Oakenfist]: new ClanModel(
            "Oakenfist",
            [
                { name: "Oakenfist", socialStanding: 3, earnings: 2, roll: 16 },
                { name: "Affiliated Family", socialStanding: 2, earnings: 1, roll: 20 },
            ],
            [Attribute.Agility, Attribute.Strength, Attribute.Coordination],
            [Skill.Athletics, Skill.CloseCombat, Skill.RangedWeapons],
            [
                "Runic protection talisman (no effect)",
                "Mini-torch",
                "Old shovel",
                "Old mining pick",
                "Passage booked on a spacehip to or from a frontier mining colony"
            ],
            [PrimaryCareer.TechnicalRepairman, PrimaryCareer.ShipCrew]),
        [Clan.Paladine]: new ClanModel(
            "Paladine",
            [
                { name: "Paladine", socialStanding: 6, earnings: 5, roll: 12 },
                { name: "Affiliated Family", socialStanding: 3, earnings: 2, roll: 20 },
            ],
            [Attribute.Intelligence, Attribute.Awareness, Attribute.Personality],
            [Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [
                "Icon of the Brotherhood",
                "Business cards of four different reporters",
                "Newspaper subscription",
                "Ornamental map of Victoria",
                "Picture commemorating your grandfather meeting someone important",
                "Video commemorating your grandfather meeting someone important"
            ],
            [
                PrimaryCareer.MediaReporter,
                PrimaryCareer.MediaPR,
                PrimaryCareer.Archaeologist,
                PrimaryCareer.CartelInvestigator,
                PrimaryCareer.CorporateExecutive
            ]),
        [Clan.Smythe]: new ClanModel(
            "Smythe",
            [
                { name: "Smythe", socialStanding: 5, earnings: 4, roll: 7 },
                { name: "Affiliated Family", socialStanding: 4, earnings: 3, roll: 20 },
            ],
            [Attribute.Intelligence, Attribute.Mental_Strength, Attribute.Personality],
            [Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [
                "Belt buckle with clan emblem",
                "Tie with clan emblem",
                "Membership of an exclusive club on Luna",
                "Statuette of a famous ancestor",
                "Photograph of a famous ancestor",
                "Painting of a famous ancestor",
                "Lifetime subscription to TV channel package",
                "Lifetime subscription to newspaper"
            ],
            [PrimaryCareer.CorporateExecutive]),
    };

    getClans() {
        var clans: ClanViewModel[] = [];
        var n = 0;

        for (var clan in this._clans) {
            var cl = this._clans[clan];

            if (character.timeline === Timeline.DarkSymmetry) {
                if (n === Clan.Kingsfield) {
                    cl.families[0].socialStanding++;
                    cl.families[0].earnings++;
                }
            }
            else if (character.timeline === Timeline.DarkLegion) {
                if (n === Clan.Gallagher) {
                    cl.families.splice(0, 1);
                }
            }

            clans.push(new ClanViewModel(n, cl));
            n++;
        }

        return clans;
    }

    generateClan() {
        const roll = Math.floor(Math.random() * 20) + 1;
        let clan = Clan.Any;

        switch (roll) {
            case 1: clan = Clan.Axelthorpe; break;
            case 2: clan = Clan.Bartholomew; break;
            case 3: clan = Clan.Brannaghan; break;
            case 4: clan = Clan.Drougan; break;
            case 5: clan = Clan.Dunsirn; break;
            case 6: clan = Clan.Fergan; break;
            case 7: clan = Clan.Fieldhausen; break;
            case 8: clan = Clan.Finn; break;
            case 9: clan = Clan.Gallagher; break;
            case 10: clan = Clan.Kingsfield; break;
            case 11: clan = Clan.Loughton; break;
            case 12: clan = Clan.MacGuire; break;
            case 13: clan = Clan.Morgan; break;
            case 14: clan = Clan.Murdoch; break;
            case 15: clan = Clan.Murray; break;
            case 16: clan = Clan.OLoughton; break;
            case 17: clan = Clan.Oakenfist; break;
            case 18: clan = Clan.Paladine; break;
            case 19: clan = Clan.Smythe; break;
            case 20: clan = Clan.Any; break;
        }

        return clan;
    }

    getClan(clan: Clan) {
        return this._clans[clan];
    }

    getClanByName(name: string) {
        for (var clan in this._clans) {
            var cln = this._clans[clan];
            if (cln.name === name) {
                return cln;
            }
        }

        return undefined;
    }

    generateFamily() {
        const clan = this.getClan(character.clan);
        const roll = Math.floor(Math.random() * 20) + 1;

        for (var i = 0; i < clan.families.length; i++) {
            var family = clan.families[i];
            console.log(family);
            if (roll <= family.roll) {
                return i;
            }
        }

        return clan.families.length - 1;
    }

    applyClan(clan: Clan, familyIndex: number) {
        const cl = this._clans[clan];
        const family = cl.families[familyIndex];

        character.status = family.socialStanding - 1;
        character.earnings = family.earnings;

        cl.attributes.forEach(a => {
            character.attributes[a].value++;
        });

        cl.familyBusiness.forEach(c => {
            character.addFreeCareer(c);
        });

        switch (clan) {
            case Clan.Axelthorpe:
            case Clan.Smythe:
                character.assets += familyIndex === 0 ? 3 : 2;
                break;
            default:
                break;
        }
    }
}

export const ClansHelper = new Clans();