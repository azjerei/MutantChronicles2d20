import {character} from '../common/character';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {Education} from './educations';
import {Status} from './status';

export enum House {
    // Noble
    Karlstein,
    Rathausen,
    Piquarde,
    Sternberg,
    Valmonte,
    Borgia,
    Other,

    // Greater
    Fieldhausen,
    Kruger,
    Salvatore,
    BayerHrotgar,
    Giraud,
    Luther,
    Philippe,
    Rotherberg,
    Dante,
    Matochek,

    // Elector
    Romanov,
    Richthausen,
    Bernheim,
    Saglielli
}

class HouseModel {
    name: string;
    description: string;
    attributes: Attribute[];
    skills: Skill[];
    bonus: string;
    items: string[];

    constructor(name: string, description: string, attributes: Attribute[], skills: Skill[], bonus: string, items: string[]) {
        this.name = name;
        this.description = description;
        this.attributes = attributes;
        this.skills = skills;
        this.bonus = bonus;
        this.items = items;
    }
}

export class HouseViewModel extends HouseModel {
    id: House;

    constructor(id: House, base: HouseModel) {
        super(base.name, base.description, base.attributes, base.skills, base.bonus, base.items);
        this.id = id;
    }
}

class Houses {
    private _houses: { [id: number]: HouseModel } = {
        [House.Karlstein]: new HouseModel(
            "Karlstein",
            "Karlsteins are natural soldiers, and the family has a strong and proud military tradition.",
            [Attribute.Physique, Attribute.Strength],
            [Skill.RangedWeapons],
            "A Karlstein may always pick Military Academy or Officer Training when determining Education.",
            []),
        [House.Rathausen]: new HouseModel(
            "Rathausen",
            "Rathausens are lucky, but they tend to push their luck, and most of the family wealth comes from the casino business.",
            [Attribute.Awareness, Attribute.Intelligence],
            [Skill.Persuade],
            "Once per session, a Rathausen may re-roll a single d20 or up to three [DS] from a single roll. The new result stands. This reroll may be used on any roll that was made because of some direct action that the character took, and the GM’s discretion is final as to whether it applies on any given roll.",
            []),
        [House.Piquarde]: new HouseModel(
            "Piquarde",
            "Piquardes have a strong tradition of skill in the air, and there are more fighter aces with Piquarde blood than there are from any other noble family.",
            [Attribute.Agility, Attribute.Coordination],
            [Skill.Pilot],
            "When attempting a Piloting test to operate an aircraft – of any sort – a Piquarde may roll one additional d20 if he scores at least one success.",
            []),
        [House.Sternberg]: new HouseModel(
            "Sternberg",
            "Sternbergs are an ancient and dwindling family, with a long tradition of producing scholars, scientists, and artists of spectacular quality.",
            [Attribute.Intelligence, Attribute.Mental_Strength],
            [Skill.Education],
            "",
            []),
        [House.Valmonte]: new HouseModel(
            "Valmonte",
            "Valmontes are reckless and daring, quick with both blade and tongue.",
            [Attribute.Agility, Attribute.Personality],
            [Skill.Persuade],
            "A Valmonte may re-roll a single d20 on any Persuade test, though the second result stands.",
            []),
        [House.Borgia]: new HouseModel(
            "Borgia",
            "Borgias have strong ties to the darker parts of society, and their familiarity with poison has been earned the hard way.",
            [Attribute.Awareness, Attribute.Physique],
            [Skill.Thievery],
            "A Borgia reduces the difficulty of all Resistance tests to avoid the effects of poison by one step, which may remove the need for a test.",
            []),
        [House.Other]: new HouseModel(
            "Other noble house",
            "You belong to one of the other Noble Houses.",
            [Attribute.Physique, Attribute.Personality],
            [Skill.CloseCombat],
            "",
            []),
        [House.Fieldhausen]: new HouseModel(
            "Fieldhausen",
            "Shamed by the defection of much of the family to Imperial, House Fieldhausen is nonetheless one of the foremost manufacturers of vehicles in Bauhaus.",
            [Attribute.Coordination, Attribute.Intelligence],
            [Skill.Mechanics, Skill.Pilot],
            "You gain an Enemy in the form of the Imperial Clan Fieldhausen. You may re-roll a single d20 when making a Pilot or Mechanics test to operate, repair, or attack a Fieldhausen vehicle – this includes Imperial Fieldhausen designs. The second result stands.",
            [
                "Portfolio of schematics and engineering designs",
                "Advanced repair kit",
                "Collection of letters from a distant relative in Imperial",
                "Belt buckle with the House Fieldhausen emblem"
            ]),
        [House.Kruger]: new HouseModel(
            "Kruger",
            "Krugers deal in steel, from mining iron ores, to smelting and milling, to construction and trade.",
            [Attribute.Intelligence, Attribute.Mental_Strength],
            [Skill.Mechanics],
            "You gain a contact in the Capitol Corporation, tied to trade business with Kruger Steel.",
            [
                "Deed to a mine or steel mill",
                "Globe of Venus with gems marking House Kruger holdings",
                "Globe of Mars with gems marking House Kruger holdings",
                "Duelling Sabre",
                "Family portrait"
            ]),
        [House.Salvatore]: new HouseModel(
            "Salvatore",
            "House Salvatore has benefitted greatly from their wide range of chemicals businesses... often in ways that are quite sinister.",
            [Attribute.Physique, Attribute.Strength],
            [Skill.Science, Skill.Treatment],
            "A Salvatore is extraordinarily resistant to a wide range of poisons and diseases, and reduces the difficulty of all Resistance tests against poisons and diseases by one step, which may remove the need for a test.",
            [
                "Lifetime supply of mysterious stimulants",
                "Folder full of pharmaceutical research",
                "Personal library (Medicine)",
                "Personal library (Science)",
                "An heirloom weapon owned by a distant ancestor",
                "Contact in the Cartel"
            ]),
        [House.BayerHrotgar]: new HouseModel(
            "Bayer-Hrothgar",
            "House Bayer-Hrothgar is a powerful force in the Bauhauser media, and its scions are noted for their charisma and grace.",
            [Attribute.Physique, Attribute.Personality],
            [Skill.Persuade],
            "Bayer-Hrothgars are extraordinarily attractive, often distractingly so. A Bayer-Hrothgar character may re-roll one d20 on any Persuade test made when attempting to seduce someone, but they increase their Repercussion range by one on all Stealth tests, as they stand out in a crowd.",
            [
                "Wardrobe full of designer clothing gained from sponsorship deal",
                "Membership of three different exclusive clubs",
                "A ‘little black book’ filled with the details of numerous celebrities",
                "Contact details for numerous reporters who owe you ‘a favour’"
            ]),
        [House.Giraud]: new HouseModel(
            "Giraud",
            "The Girauds dominate the Bauhauser aerospace industry, and you can be certain that anything that flies in Homebuilder skies came from a Giraud factory.",
            [Attribute.Intelligence, Attribute.Mental_Strength],
            [Skill.Pilot, Skill.Space],
            "You have a contact within the Cybertronic Corporation. You may re-roll a single d20 when making a Pilot or Mechanics test to operate or repair a Giraud vehicle. The second result stands.",
            [
                "Free access to a jet or helicopter owned by the family",
                "Schematics and plans for a number of craft",
                "Pilot’s dress uniform and jacket from an ancestor",
                "Job offer from Cybertronic",
                "Charts and maps of the airspace and flight paths over three different Bauhauser cities"
            ]),
        [House.Luther]: new HouseModel(
            "Luther",
            "The Luthers are a pious, dedicated, and ruthless House, but also a clandestine and secretive one.",
            [Attribute.Awareness, Attribute.Mental_Strength],
            [Skill.Stealth],
            "You gain a contact within the League of Purity, the Secret Crusades, or other anti-Dark Legion force. You also increase your Corruption Soak by one.",
            [
                "Intelligence reports on a dozen suspected heretics",
                "Gilded icon of the Brotherhood",
                "Elaborate triptych of the Venusian Crusades",
                "Cartel public service award for charity",
                "Public library or gallery named in the character’s honour"
            ]),
        [House.Philippe]: new HouseModel(
            "Philippe",
            "House Philippe has many shrewd businessmen, who dominate the consumer electronics market.",
            [Attribute.Awareness, Attribute.Personality],
            [Skill.Lifestyle, Skill.Observation],
            "Philippes are keen-eyed and insightful, often picking up on details that others may have missed. A Philippe gains one bonus Momentum on all Awareness-based skill tests.",
            [
                "Top of the line cell phone",
                "Stuffed Venusian Devilcat",
                "Order of the Devilcat dress uniform worn by an ancestor",
                "Enormous music library",
                "Hunting knife (never used, purely decorative)"
            ]),
        [House.Rotherberg]: new HouseModel(
            "Rotherberg",
            "The Rotherbergs dominate banking in Bauhaus territories. Both their wealth and their frugality are renowned, as is their sense of responsibility.",
            [Attribute.Intelligence, Attribute.Mental_Strength],
            [Skill.Lifestyle],
            "When you make an Acquisition, you may re-roll the [DS] you roll when applying Cash to a purchase – you may re-roll as few or as many [DS] as you wish on each Acquisition.",
            [
                "Extensive investment portfolio",
                "Large collection of rare and ancient coinage",
                "Duelling Sabre",
                "An ancestor’s Order of the Golden Helm dress uniform"
            ]),
        [House.Dante]: new HouseModel(
            "Dante",
            "The Dantes control the production and distribution of alcohol across Bauhaus territories, and are well-known for their frivolity.",
            [Attribute.Physique, Attribute.Personality],
            [Skill.Resistance],
            "A Dante can hold his drink better than almost anyone, and reduces the difficulty of all Resistance tests to resist the negative effects of Alcohol by three steps, which may remove the need for a test.",
            [
                "Well-stocked wine cellar with a number of rare and valuable vintages",
                "Private vineyard and winery",
                "Platinum-plated decorative tankard",
                "Stuffed Venusian shrieker monkey with a hidden compartment in the stand",
                "Gold– and platinum-plated globe of Venus with rubies and emeralds marking Dante vineyards"
            ]),
        [House.Matochek]: new HouseModel(
            "Matochek",
            "The Matocheks own vast quantities of real estate, and their familiarity with the wilderness and the frontiers of civilisation.",
            [Attribute.Awareness, Attribute.Physique],
            [Skill.Athletics, Skill.Stealth, Skill.Survival],
            "A Matochek gains an Enemy in the Imperial Corporation, representing someone whose ancestors have stolen land that once belonged to House Matochek. In addition, a Matochek gains one bonus Momentum on all Athletics, Stealth, and Survival tests made to move around, navigate, or survive within a jungle environment.",
            [
                "Large folio of maps showing Matochek territories ‘stolen’ by others",
                "Tattered old regimental banner",
                "Collection of trophies taken from defeated Dark Legion or Imperial foes",
                "Ancient sword corroded by the blood of a Nepharite (unusable)"
            ]),
        [House.Romanov]: new HouseModel(
            "Romanov",
            "The Romanovs control the Ministry of War, and thus, the entirety of the Bauhauser military. Their scions – and even distant relatives of the House – frequently serve in the military, and they own numerous arms manufacturers.",
            [Attribute.Coordination, Attribute.Physique, Attribute.Strength],
            [Skill.Command, Skill.RangedWeapons],
            "A Romanov may choose to have a Contact in Cybertronic, but if he does, he must also have an enemy in the Brotherhood.",
            [
                "Exquisitely-crafted heirloom rifle",
                "Maps and charts from an ancestor’s military victory",
                "Membership of a prestigious club",
                "An ancestor’s collection of medals and commendations"
            ]),
        [House.Richthausen]: new HouseModel(
            "Richthausen",
            "The Richthausens dominate the Homebuilders’ industrial empire, owning a full quarter of all industry within the corporation, and commanding the bureaucracy that oversees the other three-quarters.",
            [Attribute.Intelligence, Attribute.Mental_Strength],
            [Skill.Mechanics, Skill.Science],
            "",
            [
                "Gold and saurian-hide cloak",
                "Gold and silver orrery with gemstones marking Bauhauser territories",
                "Deed of ownership and financial reports from three factories or mines",
                "An original map made by the first Bauhauser settlers on Venus"
            ]),
        [House.Bernheim]: new HouseModel(
            "Bernheim",
            "The Bernheims are the smallest of the four Elector Houses, but that is akin to saying “a small Dreadnought”. Between their control of the Ministry of Civilisation, and their direct control over an overall majority of the food production and media industries, they are still extraordinarily wealthy and powerful.",
            [Attribute.Physique, Attribute.Strength],
            [Skill.Lifestyle, Skill.Persuade],
            "A Bernheims’ political and financial connections mean that he may re-roll a single d20 on a Lifestyle test, but the second result stands.",
            [
                "VIP season pass to the most exclusive opera houses and theatres on Venus",
                "Business cards for the managing editors of the Heimburg Gazette and the Volksburg Herald",
                "A hundred-acre plot of farmland",
                "Bottle of very ancient liquor",
                "Portrait of one of the original Bernheims"
            ]),
        [House.Saglielli]: new HouseModel(
            "Saglielli",
            "The Sagliellis control the Ministry of Faith, and spearhead the battle against the Dark Legion, and while they have a vast and diverse economic portfolio, most of that is managed by subordinates while the Sagliellis focus on their vengeance against the forces of Darkness.",
            [Attribute.Mental_Strength, Attribute.Physique],
            [Skill.Willpower],
            "Sagliellis increase their Corruption Soak by one.",
            [
                "Unabridged copy of the Book of Law",
                "Ancient painting depicting the defeat of Algeroth during the Venusian Crusades",
                "Portfolio containing details of suspected anarchists and heretics",
                "Duelling Sabre",
                "Correspondence with a cousin who is an Inquisitor"
            ]),
    };

    getHouses() {
        if (character.status === Status.Nobility) {
            return [
                House.Karlstein,
                House.Rathausen,
                House.Piquarde,
                House.Sternberg,
                House.Valmonte,
                House.Borgia
            ];
        }
        else if (character.status === Status.NobleGreatHouse) {
            return [
                House.Fieldhausen,
                House.Kruger,
                House.Salvatore,
                House.BayerHrotgar,
                House.Giraud,
                House.Luther,
                House.Philippe,
                House.Rotherberg,
                House.Dante,
                House.Matochek
            ];
        }
        else if (character.status === Status.NobleElectorHouse) {
            return [
                House.Romanov,
                House.Richthausen,
                House.Bernheim,
                House.Saglielli
            ];
        }
    }

    getHouse(house: House) {
        return this._houses[house];
    }

    generateHouse() {
        if (character.status === Status.Nobility) {
            return this.generateNobleHouse();
        }
        else if (character.status === Status.NobleGreatHouse) {
            return this.generateGreatHouse();
        }
        else if (character.status === Status.NobleElectorHouse) {
            return this.generateElectorHouse();
        }
    }

    private generateNobleHouse() {
        const roll = Math.floor(Math.random() * 20) + 1;
        switch (roll) {
            case 1:
            case 2:
            case 3: return [House.Karlstein];
            case 4:
            case 5:
            case 6: return [House.Rathausen];
            case 7:
            case 8:
            case 9: return [House.Piquarde];
            case 10:
            case 11:
            case 12: return [House.Sternberg];
            case 13:
            case 14:
            case 15: return [House.Valmonte];
            case 16:
            case 17:
            case 18: return [House.Borgia];
            case 19:
            case 20:
                return [
                    House.Karlstein,
                    House.Rathausen,
                    House.Piquarde,
                    House.Sternberg,
                    House.Valmonte,
                    House.Borgia
                ];
        }

        return [];
    }

    private generateGreatHouse() {
        const roll = Math.floor(Math.random() * 20) + 1;
        switch (roll) {
            case 1:
            case 2: return [House.Fieldhausen];
            case 3: 
            case 4: return [House.Kruger];
            case 5:
            case 6: return [House.Salvatore];
            case 7:
            case 8: return [House.BayerHrotgar];
            case 9: 
            case 10: return [House.Giraud];
            case 11:
            case 12: return [House.Luther];
            case 13:
            case 14: return [House.Philippe];
            case 15:
            case 16: return [House.Rotherberg];
            case 17:
            case 18: return [House.Dante];
            case 19:
            case 20: return [House.Matochek];
        }

        return [];
    }

    private generateElectorHouse() {
        const roll = Math.floor(Math.random() * 20) + 1;
        switch (roll) {
            case 1:
            case 2: 
            case 3:
            case 4: 
            case 5: return [House.Romanov];
            case 6: 
            case 7:
            case 8: 
            case 9:
            case 10: return [House.Richthausen];
            case 11:
            case 12:
            case 13:
            case 14:
            case 15: return [House.Bernheim];
            case 16:
            case 17:
            case 18:
            case 19:
            case 20: return [House.Saglielli];
        }

        return [];
    }

    applyHouse(house: House) {
        if (house === House.Sternberg) {
            character.addEquipment("Personal library (any skill)");
        }
        else if (house === House.Luther) {
            character.addTalent("Tithed");
            character.earnings = Math.max(0, character.earnings - 1);
        }
        else if (house === House.Rotherberg) {
            character.earnings++;
        }
        else if (house === House.Romanov) {
            character.addFreeEducation(Education.MilitaryAcademy);
            character.addFreeEducation(Education.OfficerTrained);
        }
        else if (house === House.Richthausen) {
            character.assets += 5;
            character.reduceBCEducationCost = true;
        }
        else if (house === House.Bernheim) {
            character.addFreeEducation(Education.CreativeEducation);
            character.addFreeEducation(Education.ManagerialEducation);
        }
        else if (house === House.Saglielli) {
            character.addFreeEducation(Education.BrotherhoodEducated);
            character.addFreeEducation(Education.MilitaryAcademy);
            character.addFreeEducation(Education.OfficerTrained);
            character.reduceApprenticeshipCost = true;
        }
    }
}

export const HousesHelper = new Houses();