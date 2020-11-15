import {Faction, FactionsHelper} from './factions';

export enum ItemType {
    Armor,
    ShoulderPad,
    Weapon,
}

export enum WeaponType {
    Pistol,
    SMG,
    AssaultRifle,
    SniperRifle,
    LMG,
    HMG,
    Shotgun,
    Flamer,
    RPG,
    Autocannon,
    Melee,
    Thrown,
}

export enum WeaponSize {
    OneHanded,
    TwoHanded,
    Unbalanced,
    Unwieldy
}

export enum WeaponMode {
    Munition,
    Semi,
    Burst,
    Auto
}

export interface IWeaponProperties {
    weaponType: WeaponType;
    size: WeaponSize;
    damageDice: number;
    damageBonus: number;
    qualities: string[];
    range?: string;
    mode?: WeaponMode;
    encumberance: number;
    reliability: number;
}

export interface IArmorProperties {
    head: number;
    arms: number;
    torso: number;
    legs: number;
    qualities: string[]
}

class Item {
    listName: string;
    sheetName: string;
    faction: Faction;
    type: ItemType;
    properties: any;

    constructor(listName: string, sheetName: string, faction: Faction, type: ItemType, properties: any) {
        this.listName = listName;
        this.sheetName = sheetName;
        this.faction = faction;
        this.type = type;
        this.properties = properties;
    }
}

class Equipment {
    private _weapons: Item[] = [
        // Pistols
        new Item("Bolter Handgun", "Bolter Handgun", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.Pistol, range: "C", damageBonus: 1, damageDice: 4, mode: WeaponMode.Semi, encumberance: 3, size: WeaponSize.Unbalanced, reliability: 2, qualities: ["AP1", "CQ"] }),
        new Item("Ironfist Handgun", "Ironfist Handgun", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.Pistol, range: "C", damageBonus: 1, damageDice: 3, mode: WeaponMode.Burst, encumberance: 3, size: WeaponSize.Unbalanced, reliability: 2, qualities: ["CQ"] }),
        new Item(".45 Revolver", ".45 Revolver", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.Pistol, range: "C", damageBonus: 1, damageDice: 4, mode: WeaponMode.Semi, encumberance: 3, size: WeaponSize.Unbalanced, reliability: 4, qualities: ["CQ", "Knock"] }),
        new Item("Slingshot Handgun", "Slingshot Handgun", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.Pistol, range: "C", damageBonus: 1, damageDice: 3, mode: WeaponMode.Semi, encumberance: 2, size: WeaponSize.OneHanded, reliability: 2, qualities: ["CQ", "Hid1"] }),
        new Item("Ronin Handgun", "Ronin Handgun", Faction.Mishima, ItemType.Weapon, { weaponType: WeaponType.Pistol, range: "C", damageBonus: 1, damageDice: 3, mode: WeaponMode.Semi, encumberance: 2, size: WeaponSize.OneHanded, reliability: 1, qualities: ["CQ"] }),
        new Item("Whisper Machine Pistol", "Whisper Machine Pistol", Faction.Mishima, ItemType.Weapon, { weaponType: WeaponType.Pistol, range: "C", damageBonus: 1, damageDice: 3, mode: WeaponMode.Burst, encumberance: 2, size: WeaponSize.OneHanded, reliability: 2, qualities: ["CQ", "Hid1"] }),
        new Item("P1000 Handgun", "P1000 Handgun", Faction.Cybertronic, ItemType.Weapon, { weaponType: WeaponType.Pistol, range: "C", damageBonus: 1, damageDice: 3, mode: WeaponMode.Burst, encumberance: 2, size: WeaponSize.OneHanded, reliability: -1, qualities: ["CQ"] }),
        new Item("Aggressor Handgun", "Aggressor Handgun", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.Pistol, range: "C", damageBonus: 1, damageDice: 4, mode: WeaponMode.Burst, encumberance: 3, size: WeaponSize.Unbalanced, reliability: 2, qualities: ["CQ"] }),
        new Item("Negotiator Heavy Pistol", "Negotiator Heavy Pistol", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.Pistol, range: "C", damageBonus: 1, damageDice: 4, mode: WeaponMode.Semi, encumberance: 2, size: WeaponSize.OneHanded, reliability: 2, qualities: ["CQ"] }),
        new Item("Phased Plasma Pistol", "Phased Plasma Pistol", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.Pistol, range: "C", damageBonus: 1, damageDice: 6, mode: WeaponMode.Semi, encumberance: 3, size: WeaponSize.Unbalanced, reliability: 1, qualities: ["CQ", "Inc3", "Vic1"] }),
        new Item("Serenity Pistol", "Serenity Pistol", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.Pistol, range: "C", damageBonus: 1, damageDice: 3, mode: WeaponMode.Burst, encumberance: 3, size: WeaponSize.OneHanded, reliability: 3, qualities: ["CQ", "Hid1"] }),
        new Item("Regulator Pistol", "Regulator Pistol", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.Pistol, range: "C", damageBonus: 1, damageDice: 4, mode: WeaponMode.Burst, encumberance: 3, size: WeaponSize.Unbalanced, reliability: 3, qualities: ["CQ", "Ammo (Spread1)"] }),
        new Item("MP-105 Machine Pistol", "MP-105 Machine Pistol", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.Pistol, range: "C", damageBonus: 1, damageDice: 3, mode: WeaponMode.Burst, encumberance: 2, size: WeaponSize.OneHanded, reliability: 3, qualities: ["Ammo (Spread1)", "CQ"] }),
        new Item("HG-12 Handgun", "HG-12 Handgun", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.Pistol, range: "C", damageBonus: 1, damageDice: 3, mode: WeaponMode.Semi, encumberance: 2, size: WeaponSize.OneHanded, reliability: 3, qualities: ["CQ", "Hid1"] }),
        new Item("HG-25 Equalizer Handgun", "HG-25 Equalizer Handgun", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.Pistol, range: "C", damageBonus: 1, damageDice: 4, mode: WeaponMode.Semi, encumberance: 3, size: WeaponSize.Unbalanced, reliability: 4, qualities: ["CQ", "Knock"] }),
        new Item("P60 Punisher Handgun", "P60 Punisher Handgun", Faction.Brotherhood, ItemType.Weapon, { weaponType: WeaponType.Pistol, range: "C", damageBonus: 1, damageDice: 4, mode: WeaponMode.Burst, encumberance: 3, size: WeaponSize.Unbalanced, reliability: 3, qualities: ["CQ", "Knock"] }),
        new Item("Nemesis Handgun", "Nemesis Handgun", Faction.Brotherhood, ItemType.Weapon, { weaponType: WeaponType.Pistol, range: "C", damageBonus: 1, damageDice: 3, mode: WeaponMode.Burst, encumberance: 2, size: WeaponSize.OneHanded, reliability: 3, qualities: ["CQ", "Hid1", "Pious1"] }),
        new Item("Silenced Nemesis Handgun", "Silenced Nemesis Handgun", Faction.Brotherhood, ItemType.Weapon, { weaponType: WeaponType.Pistol, range: "C", damageBonus: 1, damageDice: 3, mode: WeaponMode.Semi, encumberance: 2, size: WeaponSize.OneHanded, reliability: 3, qualities: ["CQ", "Hid1", "Pious1", "Silenced"] }),
        new Item("Piranha Handgun", "Piranha Handgun", Faction.Freelancer, ItemType.Weapon, { weaponType: WeaponType.Pistol, range: "C", damageBonus: 1, damageDice: 3, mode: WeaponMode.Semi, encumberance: 2, size: WeaponSize.OneHanded, reliability: 3, qualities: ["CQ", "Hid1"] }),
        new Item("Iron Hand Autopistol", "Iron Hand Autopistol", Faction.Whitestar, ItemType.Weapon, { weaponType: WeaponType.Pistol, range: "C", damageBonus: 1, damageDice: 4, mode: WeaponMode.Semi, encumberance: 3, size: WeaponSize.Unbalanced, reliability: 3, qualities: ["CQ"] }),
        new Item("Pistolet Gyutka", "Pistolet Gyutka", Faction.Whitestar, ItemType.Weapon, { weaponType: WeaponType.Pistol, range: "C", damageBonus: 1, damageDice: 3, mode: WeaponMode.Semi, encumberance: 2, size: WeaponSize.OneHanded, reliability: 3, qualities: ["CQ", "Hid1", "Perish"] }),

        // SMGs
        new Item("CAR-24 Close Assault Rifle", "CAR-24 Close Assault Rifle", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.SMG, range: "C", damageBonus: 1, damageDice: 4, mode: WeaponMode.Burst, encumberance: 3, size: WeaponSize.TwoHanded, reliability: 2, qualities: [] }),
        new Item("Windrider SMG", "Windrider SMG", Faction.Mishima, ItemType.Weapon, { weaponType: WeaponType.SMG, range: "C", damageBonus: 1, damageDice: 3, mode: WeaponMode.Burst, encumberance: 3, size: WeaponSize.Unbalanced, reliability: 1, qualities: [] }),
        new Item("CAW2000 Close Assault Weapon", "CAW2000 Close Assault Weapon", Faction.Cybertronic, ItemType.Weapon, { weaponType: WeaponType.SMG, range: "C", damageBonus: 1, damageDice: 3, mode: WeaponMode.Burst, encumberance: 3, size: WeaponSize.Unbalanced, reliability: -1, qualities: [] }),
        new Item("CAW2500 Close Assault Weapon", "CAW2500 Close Assault Weapon", Faction.Cybertronic, ItemType.Weapon, { weaponType: WeaponType.SMG, range: "C", damageBonus: 1, damageDice: 4, mode: WeaponMode.Auto, encumberance: 4, size: WeaponSize.Unbalanced, reliability: -1, qualities: ["Ammo (AP1)"] }),
        new Item("Interceptor SMG", "Interceptor SMG", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.SMG, range: "C", damageBonus: 1, damageDice: 5, mode: WeaponMode.Burst, encumberance: 4, size: WeaponSize.TwoHanded, reliability: 2, qualities: [] }),
        new Item("Plasma Intruder SMG", "Plasma Intruder SMG", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.SMG, range: "C", damageBonus: 1, damageDice: 4, mode: WeaponMode.Burst, encumberance: 3, size: WeaponSize.TwoHanded, reliability: 2, qualities: ["Ammo (Blast(C))", "Vic1"] }),
        new Item("Plasma Enrager PDW", "Plasma Enrager PDW", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.SMG, range: "C", damageBonus: 1, damageDice: 4, mode: WeaponMode.Burst, encumberance: 5, size: WeaponSize.Unbalanced, reliability: 2, qualities: ["Ammo (Blast(C))", "Vic1", "Spread1"] }),
        new Item("MP-105GW SMG", "MP-105GW SMG", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.SMG, range: "C", damageBonus: 1, damageDice: 3, mode: WeaponMode.Burst, encumberance: 2, size: WeaponSize.Unbalanced, reliability: 3, qualities: ["Ammo (Spread1)"] }),
        new Item("SG-35  Rifle", "SG-35 Rifle", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.SMG, range: "M", damageBonus: 1, damageDice: 5, mode: WeaponMode.Semi, encumberance: 4, size: WeaponSize.TwoHanded, reliability: 4, qualities: ["Unf1", "Vic1"] }),
        new Item("MP-103 Hellblazer SMG", "MP-103 Hellblazer SMG", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.SMG, range: "C", damageBonus: 1, damageDice: 4, mode: WeaponMode.Burst, encumberance: 3, size: WeaponSize.Unbalanced, reliability: 3, qualities: ["Ammo (Spread1)"] }),

        // Assault Rifles
        new Item("M50 Assault Rifle", "M50 Assault Rifle", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.AssaultRifle, range: "M", damageBonus: 1, damageDice: 5, mode: WeaponMode.Burst, encumberance: 5, size: WeaponSize.TwoHanded, reliability: 2, qualities: [] }),
        new Item("Calix Carbine", "Calix Carbine", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.AssaultRifle, range: "M", damageBonus: 1, damageDice: 5, mode: WeaponMode.Burst, encumberance: 5, size: WeaponSize.TwoHanded, reliability: 2, qualities: ["Unstable"] }),
        new Item("M74 Assault Carbine", "M74 Assault Carbine", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.AssaultRifle, range: "C", damageBonus: 1, damageDice: 6, mode: WeaponMode.Burst, encumberance: 5, size: WeaponSize.TwoHanded, reliability: 2, qualities: [] }),
        new Item("Shogun Assault Rifle", "Shogun Assault Rifle", Faction.Mishima, ItemType.Weapon, { weaponType: WeaponType.AssaultRifle, range: "M", damageBonus: 1, damageDice: 4, mode: WeaponMode.Burst, encumberance: 4, size: WeaponSize.Unbalanced, reliability: 2, qualities: [] }),
        new Item("Yari Shogun Assault Rifle", "Yari Shogun Assault Rifle", Faction.Mishima, ItemType.Weapon, { weaponType: WeaponType.AssaultRifle, range: "M", damageBonus: 1, damageDice: 4, mode: WeaponMode.Burst, encumberance: 4, size: WeaponSize.TwoHanded, reliability: 2, qualities: [] }),
        new Item("AR3000 Assault Rifle", "AR3000 Assault Rifle", Faction.Cybertronic, ItemType.Weapon, { weaponType: WeaponType.AssaultRifle, range: "M", damageBonus: 1, damageDice: 5, mode: WeaponMode.Burst, encumberance: 5, size: WeaponSize.Unbalanced, reliability: -1, qualities: [] }),
        new Item("AR3501 Assault Rifle", "AR3501 Assault Rifle", Faction.Cybertronic, ItemType.Weapon, { weaponType: WeaponType.AssaultRifle, range: "M", damageBonus: 1, damageDice: 5, mode: WeaponMode.Burst, encumberance: 5, size: WeaponSize.Unbalanced, reliability: -1, qualities: ["Ammo (Spread1)", "AP1"] }),
        new Item("PR4000 Plasma Rifle", "PR4000 Plasma Rifle", Faction.Cybertronic, ItemType.Weapon, { weaponType: WeaponType.AssaultRifle, range: "M", damageBonus: 1, damageDice: 6, mode: WeaponMode.Burst, encumberance: 5, size: WeaponSize.TwoHanded, reliability: -1, qualities: ["Inc2", "Vic2"] }),
        new Item("Invader Battle Rifle", "Invader Battle Rifle", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.AssaultRifle, range: "M", damageBonus: 1, damageDice: 6, mode: WeaponMode.Burst, encumberance: 6, size: WeaponSize.TwoHanded, reliability: 4, qualities: [] }),
        new Item("Plasma Carbine", "Plasma Carbine", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.AssaultRifle, range: "M", damageBonus: 1, damageDice: 6, mode: WeaponMode.Burst, encumberance: 6, size: WeaponSize.TwoHanded, reliability: 2, qualities: ["Ammo (Blast(C))", "Vic1"] }),
        new Item("Intruder Assault Rifle", "Intruder Assault Rifle", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.AssaultRifle, range: "M", damageBonus: 1, damageDice: 6, mode: WeaponMode.Burst, encumberance: 5, size: WeaponSize.TwoHanded, reliability: 3, qualities: [] }),
        new Item("Panzerknacker Assault Rifle", "Panzerknacker Assault Rifle", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.AssaultRifle, range: "M", damageBonus: 1, damageDice: 5, mode: WeaponMode.Burst, encumberance: 5, size: WeaponSize.TwoHanded, reliability: 3, qualities: ["Ammo (AP1, Spread1)"] }),
        new Item("Volcano Assault Rifle", "Volcano Assault Rifle", Faction.Brotherhood, ItemType.Weapon, { weaponType: WeaponType.AssaultRifle, range: "M", damageBonus: 1, damageDice: 5, mode: WeaponMode.Burst, encumberance: 6, size: WeaponSize.TwoHanded, reliability: 3, qualities: ["Pious1"] }),
        new Item("Zhivotnoye Infantry Weapon", "Zhivotnoye Infantry Weapon", Faction.Whitestar, ItemType.Weapon, { weaponType: WeaponType.AssaultRifle, range: "M", damageBonus: 1, damageDice: 5, mode: WeaponMode.Burst, encumberance: 5, size: WeaponSize.TwoHanded, reliability: 4, qualities: [] }),
        new Item("AG-11 Assault Rifle", "AG-11 Assault Rifle", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.AssaultRifle, range: "M", damageBonus: 1, damageDice: 5, mode: WeaponMode.Burst, encumberance: 4, size: WeaponSize.TwoHanded, reliability: 4, qualities: ["Ammo (AP1, Spread1)"] }),
        new Item("AG-19 Kampfkanone Assault Rifle", "AG-19 Kampfkanone Assault Rifle", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.AssaultRifle, range: "M", damageBonus: 1, damageDice: 5, mode: WeaponMode.Burst, encumberance: 5, size: WeaponSize.TwoHanded, reliability: 3, qualities: ["Ammo (Vic1)"] }),

        // Sniper Rifles
        new Item("Manstalker Sniper Rifle", "Manstalker Sniper Rifle", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.SniperRifle, range: "L", damageBonus: 2, damageDice: 5, mode: WeaponMode.Semi, encumberance: 7, size: WeaponSize.Unwieldy, reliability: 3, qualities: ["Unf3"] }),
        new Item("M450 'God's Wrath' Sniper Rifle", "M450 'God's Wrath' Sniper Rifle", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.SniperRifle, range: "L", damageBonus: 2, damageDice: 7, mode: WeaponMode.Munition, encumberance: 10, size: WeaponSize.Unwieldy, reliability: 4, qualities: ["Empl", "Unf3"] }),
        new Item("Archer Sniper Rifle", "Archer Sniper Rifle", Faction.Mishima, ItemType.Weapon, { weaponType: WeaponType.SniperRifle, range: "L", damageBonus: 2, damageDice: 4, mode: WeaponMode.Semi, encumberance: 4, size: WeaponSize.TwoHanded, reliability: 3, qualities: ["Unf2"] }),
        new Item("SR3500 Sniper Rifle", "SR3500 Sniper Rifle", Faction.Cybertronic, ItemType.Weapon, { weaponType: WeaponType.SniperRifle, range: "L", damageBonus: 2, damageDice: 4, mode: WeaponMode.Burst, encumberance: 4, size: WeaponSize.TwoHanded, reliability: -1, qualities: ["Unf2"] }),
        new Item("Assailant Sniper Rifle", "Assailant Sniper Rifle", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.SniperRifle, range: "L", damageBonus: 2, damageDice: 6, mode: WeaponMode.Semi, encumberance: 8, size: WeaponSize.Unwieldy, reliability: 3, qualities: ["Unf2"] }),
        new Item("PSG-99 Sniper Rifle", "PSG-99 Sniper Rifle", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.SniperRifle, range: "L", damageBonus: 2, damageDice: 4, mode: WeaponMode.Burst, encumberance: 6, size: WeaponSize.TwoHanded, reliability: 4, qualities: ["Ammo (Spread1)", "Unf2"] }),
        new Item("Mephisto Sniper Rifle", "Mephisto Sniper Rifle", Faction.Brotherhood, ItemType.Weapon, { weaponType: WeaponType.SniperRifle, range: "L", damageBonus: 2, damageDice: 5, mode: WeaponMode.Burst, encumberance: 8, size: WeaponSize.Unwieldy, reliability: 4, qualities: ["Unf3"] }),
        new Item("'Gift of the Cardinal' Sniper Rifle", "'Gift of the Cardinal' Sniper Rifle", Faction.Brotherhood, ItemType.Weapon, { weaponType: WeaponType.SniperRifle, range: "L", damageBonus: 2, damageDice: 6, mode: WeaponMode.Semi, encumberance: 9, size: WeaponSize.TwoHanded, reliability: 3, qualities: ["Unf2", "Knock", "Pious2"] }),
        new Item("Okhotnik 778 Sniper Rifle", "Okhotnik 778 Sniper Rifle", Faction.Whitestar, ItemType.Weapon, { weaponType: WeaponType.SniperRifle, range: "L", damageBonus: 2, damageDice: 5, mode: WeaponMode.Semi, encumberance: 7, size: WeaponSize.TwoHanded, reliability: 3, qualities: ["Unf2"] }),

        // LMGs
        new Item("M606 LMG", "M606 LMG", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.LMG, range: "M", damageBonus: 1, damageDice: 6, mode: WeaponMode.Auto, encumberance: 6, size: WeaponSize.TwoHanded, reliability: 2, qualities: ["Spread1"] }),
        new Item("Kensai LMG", "Kensai LMG", Faction.Mishima, ItemType.Weapon, { weaponType: WeaponType.LMG, range: "M", damageBonus: 1, damageDice: 5, mode: WeaponMode.Auto, encumberance: 4, size: WeaponSize.TwoHanded, reliability: 2, qualities: ["Spread1"] }),
        new Item("TSW4000 LMG", "TSW4000 LMG", Faction.Cybertronic, ItemType.Weapon, { weaponType: WeaponType.LMG, range: "M", damageBonus: 1, damageDice: 6, mode: WeaponMode.Auto, encumberance: 4, size: WeaponSize.TwoHanded, reliability: -1, qualities: ["Spread1"] }),
        new Item("SSW4100 LMG", "SSW4100 LMG", Faction.Cybertronic, ItemType.Weapon, { weaponType: WeaponType.LMG, range: "M", damageBonus: 1, damageDice: 6, mode: WeaponMode.Auto, encumberance: 7, size: WeaponSize.TwoHanded, reliability: -1, qualities: ["Spread1", "NitCool", "CmbtSW"] }),
        new Item("Destroyer LMG", "Destroyer LMG", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.LMG, range: "M", damageBonus: 1, damageDice: 7, mode: WeaponMode.Auto, encumberance: 8, size: WeaponSize.TwoHanded, reliability: 2, qualities: ["Spread1"] }),
        new Item("MG-40 LMG", "MG-40 LMG", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.LMG, range: "M", damageBonus: 1, damageDice: 6, mode: WeaponMode.Auto, encumberance: 5, size: WeaponSize.TwoHanded, reliability: 3, qualities: ["Ammo (AP1)", "Spread2"] }),
        new Item("AC-40 Justifier LMG", "AC-40 Justifier LMG", Faction.Brotherhood, ItemType.Weapon, { weaponType: WeaponType.LMG, range: "C", damageBonus: 1, damageDice: 5, mode: WeaponMode.Auto, encumberance: 5, size: WeaponSize.Unbalanced, reliability: 3, qualities: ["Pious1", "Spread1"] }),
        new Item("Rebrov LMG", "Rebrov LMG", Faction.Whitestar, ItemType.Weapon, { weaponType: WeaponType.LMG, range: "M", damageBonus: 1, damageDice: 6, mode: WeaponMode.Auto, encumberance: 6, size: WeaponSize.TwoHanded, reliability: 3, qualities: ["Spread1"] }),
        new Item("Bergdahl Stonecleaver LMG", "Bergdahl Stonecleaver LMG", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.LMG, range: "M", damageBonus: 1, damageDice: 6, mode: WeaponMode.Auto, encumberance: 12, size: WeaponSize.TwoHanded, reliability: 4, qualities: ["Dependable", "Spread1"] }),

        // HMGs
        new Item("Improved M89 HMG", "Improved M89 HMG", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.HMG, range: "L", damageBonus: 2, damageDice: 7, mode: WeaponMode.Auto, encumberance: 18, size: WeaponSize.Unwieldy, reliability: 2, qualities: ["Spread1"] }),
        new Item("Dragonfire HMG", "Dragonfire HMG", Faction.Mishima, ItemType.Weapon, { weaponType: WeaponType.HMG, range: "M", damageBonus: 2, damageDice: 6, mode: WeaponMode.Auto, encumberance: 7, size: WeaponSize.Unwieldy, reliability: 2, qualities: ["Spread2"] }),
        new Item("SSW4200P HMG", "SSW4200P HMG", Faction.Cybertronic, ItemType.Weapon, { weaponType: WeaponType.HMG, range: "L", damageBonus: 2, damageDice: 6, mode: WeaponMode.Auto, encumberance: 8, size: WeaponSize.Unwieldy, reliability: -1, qualities: ["AP1", "Spread1"] }),
        new Item("Charger HMG", "Charger HMG", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.HMG, range: "M", damageBonus: 2, damageDice: 7, mode: WeaponMode.Auto, encumberance: 24, size: WeaponSize.Unwieldy, reliability: 2, qualities: ["Spread2"] }),
        new Item("Mega Charger HMG", "Mega Charger HMG", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.HMG, range: "M", damageBonus: 2, damageDice: 6, mode: WeaponMode.Auto, encumberance: 30, size: WeaponSize.Unwieldy, reliability: 2, qualities: ["Spread2", "Vic1"] }),
        new Item("MG-80 HMG", "MG-80 HMG", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.HMG, range: "L", damageBonus: 2, damageDice: 2, mode: WeaponMode.Auto, encumberance: 9, size: WeaponSize.Unwieldy, reliability: 3, qualities: ["Spread2"] }),
        new Item("AC-41 Purifier HMG", "AC-41 Purifier HMG", Faction.Brotherhood, ItemType.Weapon, { weaponType: WeaponType.HMG, range: "M", damageBonus: 2, damageDice: 5, mode: WeaponMode.Auto, encumberance: 7, size: WeaponSize.Unwieldy, reliability: 3, qualities: ["Pious1", "Spread1"] }),
        new Item("Nova Vesna HMG", "Nova Vesna HMG", Faction.Whitestar, ItemType.Weapon, { weaponType: WeaponType.HMG, range: "M", damageBonus: 2, damageDice: 6, mode: WeaponMode.Auto, encumberance: 12, size: WeaponSize.Unwieldy, reliability: 2, qualities: ["Spread1", "Vic1"] }),
        new Item("MG-70 HMG", "MG-70 HMG", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.HMG, range: "C", damageBonus: 2, damageDice: 6, mode: WeaponMode.Auto, encumberance: 7, size: WeaponSize.Unwieldy, reliability: 3, qualities: ["Spread2"] }),

        // Shotguns
        new Item("M516S Shotgun", "M516S Shotgun", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.Shotgun, range: "C", damageBonus: 1, damageDice: 5, mode: WeaponMode.Semi, encumberance: 5, size: WeaponSize.TwoHanded, reliability: 3, qualities: ["Knock", "Spread1"] }),
        new Item("M516D Shotgun", "M516D Shotgun", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.Shotgun, range: "C", damageBonus: 1, damageDice: 5, mode: WeaponMode.Semi, encumberance: 6, size: WeaponSize.TwoHanded, reliability: 2, qualities: ["Knock", "Spread2"] }),
        new Item("M520 Auto-shotgun", "M520 Auto-shotgun", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.Shotgun, range: "C", damageBonus: 1, damageDice: 6, mode: WeaponMode.Auto, encumberance: 6, size: WeaponSize.TwoHanded, reliability: 2, qualities: ["Ammo (Torrent)", "Knock", "Spread1"] }),
        new Item("Airbrush Shotgun", "Airbrush Shotgun", Faction.Mishima, ItemType.Weapon, { weaponType: WeaponType.Shotgun, range: "C", damageBonus: 1, damageDice: 5, mode: WeaponMode.Semi, encumberance: 4, size: WeaponSize.TwoHanded, reliability: 1, qualities: ["Knock", "Spread1"] }),
        new Item("SG7000 Shotgun", "SG7000 Shotgun", Faction.Cybertronic, ItemType.Weapon, { weaponType: WeaponType.Shotgun, range: "M", damageBonus: 1, damageDice: 5, mode: WeaponMode.Burst, encumberance: 4, size: WeaponSize.TwoHanded, reliability: -1, qualities: ["Knock", "Spread1"] }),
        new Item("SA-SG7200I Shotgun", "SA-SG7200I Shotgun", Faction.Cybertronic, ItemType.Weapon, { weaponType: WeaponType.Shotgun, range: "M", damageBonus: 1, damageDice: 5, mode: WeaponMode.Semi, encumberance: 4, size: WeaponSize.TwoHanded, reliability: -1, qualities: ["Knock", "Spread1"] }),
        new Item("Mandible Shotgun", "Mandible Shotgun", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.Shotgun, range: "C", damageBonus: 1, damageDice: 6, mode: WeaponMode.Burst, encumberance: 6, size: WeaponSize.TwoHanded, reliability: 3, qualities: ["Knock", "Spread1"] }),
        new Item("Diemansland Shotgun", "Diemansland Shotgun", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.Shotgun, range: "C", damageBonus: 1, damageDice: 6, mode: WeaponMode.Semi, encumberance: 7, size: WeaponSize.TwoHanded, reliability: 4, qualities: ["Knock", "Spread1"] }),
        new Item("HG-14 Shotgun", "HG-14 Shotgun", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.Shotgun, range: "C", damageBonus: 1, damageDice: 6, mode: WeaponMode.Semi, encumberance: 5, size: WeaponSize.TwoHanded, reliability: 3, qualities: ["Knock", "Spread1"] }),
        new Item("Sawn-off HG-14 Shotgun", "Sawn-off HG-14 Shotgun", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.Shotgun, range: "C", damageBonus: 1, damageDice: 4, mode: WeaponMode.Semi, encumberance: 4, size: WeaponSize.Unbalanced, reliability: 3, qualities: ["Knock", "Spread1"] }),
        new Item("AZ-60 Rotary Shotgun", "AZ-60 Rotary Shotgun", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.Shotgun, range: "C", damageBonus: 1, damageDice: 4, mode: WeaponMode.Auto, encumberance: 6, size: WeaponSize.TwoHanded, reliability: 3, qualities: ["Torrent", "Knock", "Spread1"] }),
        new Item("AZ-60 Twin Rotary Shotgun", "AZ-60 Twin Rotary Shotgun", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.Shotgun, range: "C", damageBonus: 1, damageDice: 6, mode: WeaponMode.Auto, encumberance: 12, size: WeaponSize.Unwieldy, reliability: 3, qualities: ["Ammo (Torrent)", "Knock", "Spread2", "Vic1"] }),
        new Item("Bryzgi Sawn-off Shotgun", "Bryzgi Sawn-off Shotgun", Faction.Whitestar, ItemType.Weapon, { weaponType: WeaponType.Shotgun, range: "C", damageBonus: 1, damageDice: 5, mode: WeaponMode.Semi, encumberance: 2, size: WeaponSize.Unbalanced, reliability: 2, qualities: ["Knock", "Spread2"] }),
        new Item("Zhukov 4 Tunnel Clearer Shotgun", "Zhukov 4 Tunnel Clearer Shotgun", Faction.Whitestar, ItemType.Weapon, { weaponType: WeaponType.Shotgun, range: "C", damageBonus: 1, damageDice: 6, mode: WeaponMode.Burst, encumberance: 8, size: WeaponSize.TwoHanded, reliability: 3, qualities: ["Knock", "Spread2"] }),

        // Flamers
        new Item("Light Flamer", "Light Flamer", Faction.Freelancer, ItemType.Weapon, { weaponType: WeaponType.Flamer, range: "C", damageBonus: 1, damageDice: 4, mode: WeaponMode.Munition, encumberance: 5, size: WeaponSize.TwoHanded, reliability: 2, qualities: ["Inc2", "Torrent"] }),
        new Item("Flamer", "Flamer", Faction.Freelancer, ItemType.Weapon, { weaponType: WeaponType.Flamer, range: "C", damageBonus: 1, damageDice: 6, mode: WeaponMode.Munition, encumberance: 8, size: WeaponSize.TwoHanded, reliability: 3, qualities: ["Inc3", "Torrent"] }),
        new Item("Gehenna Puker Flamethrower", "Gehenna Puker Flamethrower", Faction.Brotherhood, ItemType.Weapon, { weaponType: WeaponType.Flamer, range: "C", damageBonus: 2, damageDice: 6, mode: WeaponMode.Munition, encumberance: 22, size: WeaponSize.Unwieldy, reliability: 3, qualities: ["Inc4", "Torrent", "Vic1"] }),
        new Item("IS-66 Heavy Flamethrower", "IS-66 Heavy Flamethrower", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.Flamer, range: "C", damageBonus: 1, damageDice: 6, mode: WeaponMode.Munition, encumberance: 8, size: WeaponSize.TwoHanded, reliability: 4, qualities: ["Inc3", "Torrent", "Vic1"] }),

        // RPGs
        new Item("Deuce Rocket Launcher", "Deuce Rocket Launcher", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.RPG, range: "L", damageBonus: -1, damageDice: 2, mode: WeaponMode.Munition, encumberance: 10, size: WeaponSize.Unwieldy, reliability: 3, qualities: ["(Grenade)", "Unf1"] }),
        new Item("M40 Grenade Launcher", "M40 Grenade Launcher", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.RPG, range: "M", damageBonus: -1, damageDice: 0, mode: WeaponMode.Munition, encumberance: 7, size: WeaponSize.TwoHanded, reliability: 2, qualities: ["(Grenade)", "ArcShot"] }),
        new Item("Charge Net", "Charge Net", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.RPG, range: "M", damageBonus: 1, damageDice: 3, mode: WeaponMode.Munition, encumberance: 5, size: WeaponSize.Unwieldy, reliability: 2, qualities: ["AP1", "Knock", "Spread2", "Stun"] }),
        new Item("Daimyo Rocket Launcher", "Daimyo Rocket Launcher'", Faction.Mishima, ItemType.Weapon, { weaponType: WeaponType.RPG, range: "L", damageBonus: -1, damageDice: 1, mode: WeaponMode.Munition, encumberance: 8, size: WeaponSize.Unwieldy, reliability: 1, qualities: ["(Grenade)"] }),
        new Item("SSW5500 Rocket Launcher", "SSW5500 Rocket Launcher", Faction.Cybertronic, ItemType.Weapon, { weaponType: WeaponType.RPG, range: "L", damageBonus: -1, damageDice: 2, mode: WeaponMode.Munition, encumberance: 22, size: WeaponSize.Unwieldy, reliability: -1, qualities: ["(Grenade)", "Unf1"] }),
        new Item("Southpaw Rocket Launcher", "Southpaw Rocket Launcher", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.RPG, range: "L", damageBonus: -1, damageDice: 3, mode: WeaponMode.Munition, encumberance: 17, size: WeaponSize.Unwieldy, reliability: 2, qualities: ["(Grenade)"] }),
        new Item("ARG-17 Rocket Launcher", "ARG-17 Rocket Launcher", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.RPG, range: "L", damageBonus: -1, damageDice: 2, mode: WeaponMode.Munition, encumberance: 9, size: WeaponSize.Unwieldy, reliability: 3, qualities: ["(Grenade)", "Unf1"] }),
        new Item("Firefist Rocket System", "Firefist Rocket System", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.RPG, range: "L", damageBonus: -1, damageDice: 0, mode: WeaponMode.Munition, encumberance: 15, size: WeaponSize.TwoHanded, reliability: 2, qualities: ["(Grenade)", "Unf2"] }),
        new Item("GW-405 Grenade Launcher", "GW-405 Grenade Launcher", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.RPG, range: "M", damageBonus: -1, damageDice: 0, mode: WeaponMode.Munition, encumberance: 7, size: WeaponSize.TwoHanded, reliability: 3, qualities: ["(Grenade)", "Unf1"] }),
        new Item("Pushkin Rocket Launcher", "Pushkin Rocket Launcher", Faction.Whitestar, ItemType.Weapon, { weaponType: WeaponType.RPG, range: "L", damageBonus: -1, damageDice: 1, mode: WeaponMode.Munition, encumberance: 7, size: WeaponSize.Unwieldy, reliability: 3, qualities: ["(Grenade)", "Unf1"] }),

        // Autocannons
        new Item("Atlas Megacannon", "Atlas Megacannon", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.Autocannon, range: "M", damageBonus: 2, damageDice: 7, mode: WeaponMode.Auto, encumberance: 40, size: WeaponSize.Unwieldy, reliability: 2, qualities: ["AP1", "Spread3", "Vic1"] }),
        new Item("M66 Light Autocannon", "M66 Light Autocannon", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.Autocannon, range: "M", damageBonus: 2, damageDice: 4, mode: WeaponMode.Burst, encumberance: 10, size: WeaponSize.Unwieldy, reliability: 2, qualities: ["AP1", "Spread1", "Vic1"] }),
        new Item("CA-138 Deathlockdrum", "CA-138 Deathlockdrum", Faction.Brotherhood, ItemType.Weapon, { weaponType: WeaponType.Autocannon, range: "M", damageBonus: 2, damageDice: 7, mode: WeaponMode.Auto, encumberance: 11, size: WeaponSize.Unwieldy, reliability: 3, qualities: ["AP1", "Spread1"] }),
        new Item("Nimrod Autocannon", "Nimrod Autocannon", Faction.Brotherhood, ItemType.Weapon, { weaponType: WeaponType.Autocannon, range: "M", damageBonus: 2, damageDice: 8, mode: WeaponMode.Auto, encumberance: 9, size: WeaponSize.Unwieldy, reliability: 3, qualities: ["AP1", "Spread2"] }),
        new Item("MC-2000 'Atlas' Megacannon", "MC-2000 'Atlas' Megacannon", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.Autocannon, range: "M", damageBonus: 2, damageDice: 7, mode: WeaponMode.Auto, encumberance: 40, size: WeaponSize.Unwieldy, reliability: 2, qualities: ["AP1", "Spread3", "Vic1"] }),
        new Item("Lumberjack Autocannon", "Lumberjack Autocannon", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.Autocannon, range: "L", damageBonus: 2, damageDice: 7, mode: WeaponMode.Auto, encumberance: 30, size: WeaponSize.Unwieldy, reliability: 3, qualities: ["AP1", "Spread2", "SplitFire"] }),

        // Melee
        new Item("Brass Knuckles", "Brass Knuckles", Faction.Freelancer, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 3, encumberance: 0, size: WeaponSize.OneHanded, reliability: 5, qualities: ["Vic1"] }),
        new Item("Baton", "Baton", Faction.Freelancer, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 3, encumberance: 0, size: WeaponSize.OneHanded, reliability: 5, qualities: ["Stun"] }),
        new Item("Cudgel", "Cudgel", Faction.Freelancer, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 3, encumberance: 0, size: WeaponSize.OneHanded, reliability: 5, qualities: ["Stun"] }),
        new Item("Dagger", "Dagger", Faction.Freelancer, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 3, encumberance: 0, size: WeaponSize.OneHanded, reliability: 5, qualities: ["AP1", "Hid1"] }),
        new Item("Knife", "Knife", Faction.Freelancer, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 3, encumberance: 0, size: WeaponSize.OneHanded, reliability: 5, qualities: ["AP1", "Hid1"] }),
        new Item("Slicer", "Slicer", Faction.Freelancer, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 3, encumberance: 1, size: WeaponSize.OneHanded, reliability: 5, qualities: ["AP1", "Hid2"] }),
        new Item("Sword", "Sword", Faction.Freelancer, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 4, encumberance: 3, size: WeaponSize.OneHanded, reliability: 4, qualities: ["Parry1"] }),
        new Item("Greatsword", "Greatsword", Faction.Freelancer, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 2, damageDice: 5, encumberance: 4, size: WeaponSize.TwoHanded, reliability: 4, qualities: ["Parry2"] }),
        new Item("Spear", "Spear", Faction.Freelancer, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 4, encumberance: 4, size: WeaponSize.Unbalanced, reliability: 4, qualities: ["AP1", "Reach"] }),
        new Item("Bayonet", "Bayonet", Faction.Freelancer, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 3, encumberance: 1, size: WeaponSize.OneHanded, reliability: 5, qualities: ["AP1"] }),
        new Item("Chainsword", "Chainsword", Faction.Freelancer, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 5, encumberance: 3, size: WeaponSize.Unbalanced, reliability: 3, qualities: ["Vic2", "Parry1"] }),
        new Item("Chain Bayonet", "Chain Bayonet", Faction.Freelancer, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 5, encumberance: 1, size: WeaponSize.OneHanded, reliability: 3, qualities: ["Vic2"] }),
        new Item("Bladed Nightstick", "Bladed Nightstick", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 3, encumberance: 1, size: WeaponSize.OneHanded, reliability: 4, qualities: ["Baton (Par2, Stun)", "Blade (AP1, Par2)"] }),
        new Item("Duelling Sabre", "Duelling Sabre", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 4, encumberance: 2, size: WeaponSize.OneHanded, reliability: 4, qualities: ["Duel", "Parry3"] }),
        new Item("Machete", "Machete", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 4, encumberance: 3, size: WeaponSize.OneHanded, reliability: 2, qualities: ["Parry1"] }),
        new Item("Homebuilder Logging Sword", "Homebuilder Logging Sword", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 2, damageDice: 5, encumberance: 3, size: WeaponSize.TwoHanded, reliability: 4, qualities: ["Parry2", "Vic2"] }),
        new Item("Ironshod Ebony Staff", "Ironshod Ebony Staff", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 5, encumberance: 4, size: WeaponSize.TwoHanded, reliability: 5, qualities: ["Duel", "Parry2", "Vic1", "Pious2"] }),
        new Item("Hydraulic Powered Fist", "Hydraulic Powered Fist", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 2, damageDice: 4, encumberance: 6, size: WeaponSize.OneHanded, reliability: 3, qualities: ["Knock", "Vic2", "Crush", "Clumsy"] }),
        new Item("Woodsman's Axe", "Woodsman's Axe", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 2, damageDice: 5, encumberance: 6, size: WeaponSize.TwoHanded, reliability: 4, qualities: ["Vic2"] }),
        new Item("Neurolash", "Neurolash", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 2, damageDice: 3, encumberance: 1, size: WeaponSize.OneHanded, reliability: 3, qualities: ["AP3", "Reach", "Stun"] }),
        new Item("SI-34 Thermite Lance", "SI-34 Thermite Lance", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 2, damageDice: 4, encumberance: 3, size: WeaponSize.TwoHanded, reliability: 3, qualities: ["AP3", "Cavalry", "OneShot", "Vic1"] }),
        new Item("Templar Sword", "Templar Sword", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 5, encumberance: 3, size: WeaponSize.Unbalanced, reliability: 5, qualities: ["Parry1", "Pious1", "Vic1"] }),
        new Item("Templar Axe", "Templar Axe", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 5, encumberance: 3, size: WeaponSize.Unbalanced, reliability: 5, qualities: ["Pious1", "Vic1"] }),
        new Item("Templar Spear", "Templar Spear", Faction.Bauhaus, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 4, encumberance: 4, size: WeaponSize.Unbalanced, reliability: 5, qualities: ["AP1", "Pious1", "Reach", "Vic1"] }),
        new Item("Mortis Sword", "Mortis Sword", Faction.Brotherhood, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 5, encumberance: 2, size: WeaponSize.Unbalanced, reliability: 4, qualities: ["Par1", "Pious1", "Vic2"] }),
        new Item("Castigator Power Spear", "Castigator Power Spear", Faction.Brotherhood, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 5, encumberance: 3, size: WeaponSize.TwoHanded, reliability: 4, qualities: ["Par1", "Pious2", "AP1"] }),
        // TODO: mace head
        new Item("Deliverer Power Sword", "Deliverer Power Sword", Faction.Brotherhood, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 6, encumberance: 4, size: WeaponSize.Unbalanced, reliability: 5, qualities: ["Par1", "Pious2", "Vic2", "AP1"] }),
        new Item("Retaliator Sword", "Retaliator Sword", Faction.Brotherhood, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 5, encumberance: 4, size: WeaponSize.Unbalanced, reliability: 4, qualities: ["Par1", "Pious1", "AP1"] }),
        new Item("Avenger Power Sword", "Avenger Power Sword", Faction.Brotherhood, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 6, encumberance: 4, size: WeaponSize.Unbalanced, reliability: 4, qualities: ["Par1", "Pious2", "Duel", "AP1"] }),
        new Item("Guardian Power Shield", "Guardian Power Shield", Faction.Brotherhood, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 3, encumberance: 4, size: WeaponSize.OneHanded, reliability: 4, qualities: ["FullDef2"] }),
        new Item("Protector Power Shield", "Protector Power Shield", Faction.Brotherhood, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 3, encumberance: 4, size: WeaponSize.OneHanded, reliability: 4, qualities: ["FullDef3", "Knock"] }),
        new Item("Punisher Short Sword", "Punisher Short Sword", Faction.Freelancer, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 4, encumberance: 2, size: WeaponSize.OneHanded, reliability: 4, qualities: ["Par1", "Hid1"] }),
        new Item("CSA400 Combat Sword", "CSA400 Combat Sword", Faction.Cybertronic, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 4, encumberance: 3, size: WeaponSize.OneHanded, reliability: -1, qualities: ["Par1"] }),
        new Item("CSA401 Combat Sword", "CSA401 Combat Sword", Faction.Cybertronic, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 4, encumberance: 3, size: WeaponSize.OneHanded, reliability: -1, qualities: ["Par1", "Stun"] }),
        new Item("CSA402 Combat Sword", "CSA402 Combat Sword", Faction.Cybertronic, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 4, encumberance: 3, size: WeaponSize.OneHanded, reliability: -1, qualities: ["Par1", "Vic1"] }),
        new Item("CSA403 Combat Sword", "CSA403 Combat Sword", Faction.Cybertronic, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 4, encumberance: 3, size: WeaponSize.OneHanded, reliability: -1, qualities: ["Par1", "Tox2"] }),
        new Item("CSA404 Combat Sword", "CSA404 Combat Sword", Faction.Cybertronic, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 4, encumberance: 3, size: WeaponSize.OneHanded, reliability: -1, qualities: ["Par1", "Inc2"] }),
        new Item("Clansman Claymore", "Clansman Claymore", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 2, damageDice: 5, encumberance: 4, size: WeaponSize.TwoHanded, reliability: 4, qualities: ["Par2", "Pious2"] }),
        new Item("Gallagher Claymore", "Gallagher Claymore", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 2, damageDice: 6, encumberance: 3, size: WeaponSize.TwoHanded, reliability: 5, qualities: ["Par2", "Pious4", "Spiritual"] }),
        new Item("Violator Sword", "Violator Sword", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 2, damageDice: 6, encumberance: 4, size: WeaponSize.TwoHanded, reliability: 3, qualities: ["Par2", "Vic2"] }),
        new Item("Lion Claws", "Lion Claws", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 5, encumberance: 2, size: WeaponSize.OneHanded, reliability: 3, qualities: ["AP1", "Vic2", "Spread1", "Adrenaline"] }),
        new Item("Rapier Cane", "Rapier Cane", Faction.Imperial, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 4, encumberance: 2, size: WeaponSize.OneHanded, reliability: 4, qualities: ["Par1", "Duel", "Hid3"] }),
        new Item("Katana", "Katana", Faction.Mishima, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 5, encumberance: 3, size: WeaponSize.Unbalanced, reliability: 4, qualities: ["Par1"] }),
        new Item("Darkslayer katana", "Darkslayer katana", Faction.Mishima, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 5, encumberance: 2, size: WeaponSize.Unbalanced, reliability: 4, qualities: ["Par1", "Pious2"] }),
        new Item("Wakizashi", "Wakizashi", Faction.Mishima, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 4, encumberance: 2, size: WeaponSize.OneHanded, reliability: 4, qualities: ["Par1"] }),
        new Item("Shinken", "Shinken", Faction.Mishima, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 3, encumberance: 2, size: WeaponSize.Unbalanced, reliability: 3, qualities: ["Par1"] }),
        new Item("Shuriken", "Shuriken", Faction.Mishima, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 2, encumberance: 1, mode: WeaponMode.Munition, size: WeaponSize.OneHanded, reliability: 4, qualities: ["Hid2"] }),
        new Item("Bonesword", "Bonesword", Faction.Whitestar, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 4, encumberance: 3, size: WeaponSize.OneHanded, reliability: 4, qualities: ["Pious2"] }),
        new Item("Electro-Jolt", "Electro-Jolt", Faction.Whitestar, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 3, encumberance: 1, size: WeaponSize.OneHanded, reliability: 2, qualities: ["Knock", "Stun"] }),
        new Item("Explorer's Pick", "Explorer's Pick", Faction.Whitestar, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 3, encumberance: 2, size: WeaponSize.Unbalanced, reliability: 4, qualities: ["AP1", "Vic1"] }),
        new Item("'Harbinger' Survival Sword", "'Harbinger' Survival Sword", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 4, encumberance: 2, size: WeaponSize.OneHanded, reliability: 3, qualities: ["Par1"] }),
        new Item("Capitol Sword of Honour", "Capitol Sword of Honour", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 5, encumberance: 3, size: WeaponSize.Unbalanced, reliability: 3, qualities: ["Par2"] }),
        new Item("'Aegis' Riot Shield", "'Aegis' Riot Shield", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 2, encumberance: 3, size: WeaponSize.OneHanded, reliability: 4, qualities: ["FullDef1"] }),
        new Item("Talons of Fury", "Talons of Fury", Faction.Capitol, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 3, encumberance: 2, size: WeaponSize.OneHanded, reliability: 2, qualities: ["Inc2", "Vic3"] }),
        new Item("CSA200 Power Fist", "CSA200 Power Fist", Faction.Cybertronic, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 2, damageDice: 4, encumberance: 3, size: WeaponSize.OneHanded, reliability: -1, qualities: ["Knock", "Vic2"] }),
        new Item("Electric Fists", "Electric Fists", Faction.Cybertronic, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 3, encumberance: 0, size: WeaponSize.OneHanded, reliability: -1, qualities: ["Stun", "Vic1"] }),
        new Item("Riot Shield", "Riot Shield", Faction.Freelancer, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 0, damageDice: 2, encumberance: 3, size: WeaponSize.OneHanded, reliability: 4, qualities: ["FullDef2"] }),
        new Item("Pioneer's Saw-Back", "Pioneer's Saw-Back", Faction.Whitestar, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 4, encumberance: 1, size: WeaponSize.OneHanded, reliability: 4, qualities: ["AP1", "Grue1"] }),
    ];

    private _eventWeapons: Item[] = [
        new Item("Pocket knife (slicer)", "Pocket knife (slicer)", Faction.Freelancer, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 3, encumberance: 1, size: WeaponSize.OneHanded, reliability: 5, qualities: ["AP1", "Hid2"] }),
        new Item("Your dad’s old wrench (cudgel)", "Dad's old wrench", Faction.Freelancer, ItemType.Weapon, { weaponType: WeaponType.Melee, damageBonus: 1, damageDice: 3, encumberance: 0, size: WeaponSize.OneHanded, reliability: 5, qualities: ["Stun"] }),
    ];

    private _armor: Item[] = [
        new Item("Ballistic Nylon Clothing", "Ballistic Nylon Clothing", Faction.Freelancer, ItemType.Armor, { head: 0, arms: 1, torso: 1, legs: 1 }),
        new Item("Ballistic nylon military uniform", "Ballistic nylon military uniform", Faction.Freelancer, ItemType.Armor, { head: 0, arms: 1, torso: 1, legs: 1 }),
        new Item("Ballistic nylon medical uniform", "Ballistic nylon medical uniform", Faction.Freelancer, ItemType.Armor, { head: 0, arms: 1, torso: 1, legs: 1 }),
        new Item("Ballistic nylon formal suit", "Ballistic nylon formal suit", Faction.Capitol, ItemType.Armor, { head: 0, arms: 1, torso: 1, legs: 1 }),
        new Item("Ballistic nylon flight suit", "Ballistic nylon flight suit", Faction.Capitol, ItemType.Armor, { head: 0, arms: 1, torso: 1, legs: 1 }),
        new Item("Ballistic nylon suit", "Ballistic nylon suit", Faction.Capitol, ItemType.Armor, { head: 0, arms: 1, torso: 1, legs: 1 }),
        new Item("Bulletproof nylon uniform", "Bulletproof nylon uniform", Faction.Cybertronic, ItemType.Armor, { head: 0, arms: 1, torso: 1, legs: 1 }),
        new Item("Bulletproof Vest", "Bulletproof Vest", Faction.Freelancer, ItemType.Armor, { head: 0, arms: 0, torso: 2, legs: 0 }),
        new Item("Hard Hat", "Hard Hat", Faction.Freelancer, ItemType.Armor, { head: 1, arms: 0, torso: 0, legs: 0 }),
        new Item("Combat Helmet", "Combat Helmet", Faction.Freelancer, ItemType.Armor, { head: 2, arms: 0, torso: 0, legs: 0 }),
        new Item("Hussar Mk. IV Armour", "Hussar Mk. IV Armour", Faction.Bauhaus, ItemType.Armor, { head: 3, arms: 2, torso: 3, legs: 2 }),
        new Item("Hussar Mk. V Armour", "Hussar Mk. V Armour", Faction.Bauhaus, ItemType.Armor, { head: 3, arms: 2, torso: 4, legs: 2 }),
        new Item("Guardsman Mk. III Armour", "Guardsman Mk. III Armour", Faction.Bauhaus, ItemType.Armor, { head: 4, arms: 3, torso: 4, legs: 3 }),
        new Item("Crest Helm", "Crest Helm", Faction.Bauhaus, ItemType.Armor, { head: 0, arms: 0, torso: 0, legs: 0 }),
        new Item("Armoured Vestment", "Armoured Vestment", Faction.Brotherhood, ItemType.Armor, { head: 0, arms: 1, torso: 1, legs: 1 }),
        new Item("Believer Armour", "Believer Armour", Faction.Brotherhood, ItemType.Armor, { head: 3, arms: 2, torso: 3, legs: 2 }),
        new Item("Inquisitorial Battledress", "Inquisitorial Battledress", Faction.Brotherhood, ItemType.Armor, { head: 4, arms: 3, torso: 4, legs: 3 }),
        new Item("Quietus Armour", "Quietus Armour", Faction.Brotherhood, ItemType.Armor, { head: 2, arms: 1, torso: 2, legs: 1 }),
        new Item("Valkyrie Combat Armour", "Valkyrie Combat Armour", Faction.Brotherhood, ItemType.Armor, { head: 4, arms: 4, torso: 5, legs: 4, qualities: ["Aerial Assault", "Shining Light"] }),
        new Item("Sacred Warrior Battle Armour", "Sacred Warrior Battle Armour", Faction.Brotherhood, ItemType.Armor, { head: 5, arms: 4, torso: 5, legs: 4, qualities: ["Blessed"] }),
        new Item("Resonator Helmet", "Resonator Helmet", Faction.Brotherhood, ItemType.Armor, { head: 4, arms: 0, torso: 0, legs: 0, qualities: ["Disruptive Resonance"] }),
        new Item("Mystic War-Robes", "Mystic War-Robes", Faction.Brotherhood, ItemType.Armor, { head: 5, arms: 3, torso: 5, legs: 3 }),
        new Item("Fury Battleplate", "Fury Battleplate", Faction.Brotherhood, ItemType.Armor, { head: 6, arms: 5, torso: 6, legs: 5, qualities: ["Blessed"] }),
        new Item("Crucifier Exo-Armour", "Crucifier Exo-Armour", Faction.Brotherhood, ItemType.Armor, { head: 4, arms: 4, torso: 5, legs: 4, qualities: ["Murderous Tornado"] }),
        new Item("Hardback Armour", "Hardback Armour", Faction.Capitol, ItemType.Armor, { head: 2, arms: 1, torso: 2, legs: 1 }),
        new Item("Tortoise Mk. 1 Armour", "Tortoise Mk. 1 Armour", Faction.Capitol, ItemType.Armor, { head: 3, arms: 2, torso: 3, legs: 2 }),
        new Item("Subdermal Armour", "Subdermal Armour", Faction.Cybertronic, ItemType.Armor, { head: 1, arms: 1, torso: 1, legs: 1 }),
        new Item("Titanium Plate Implants", "Titanium Plate Implants", Faction.Cybertronic, ItemType.Armor, { head: 2, arms: 2, torso: 2, legs: 2 }),
        new Item("Mk. I Light Personal Protection Suit", "Mk. I Light Personal Protection Suit", Faction.Imperial, ItemType.Armor, { head: 3, arms: 2, torso: 3, legs: 2 }),
        new Item("Mk. II Medium Combat Armour", "Mk. II Medium Combat Armour", Faction.Imperial, ItemType.Armor, { head: 3, arms: 3, torso: 4, legs: 3 }),
        new Item("Mk. III Heavy Assault Combat Armour", "Mk. III Heavy Assault Combat Armour", Faction.Imperial, ItemType.Armor, { head: 4, arms: 3, torso: 5, legs: 3 }),
        new Item("Ballistic Trenchcoat", "Ballistic Trenchcoat", Faction.Imperial, ItemType.Armor, { head: 0, arms: 1, torso: 1, legs: 1 }),
        new Item("Armoured Trench Coat", "Armoured Trench Coat", Faction.Freelancer, ItemType.Armor, { head: 0, arms: 1, torso: 1, legs: 1 }),
        new Item("Ashigaru Pads", "Ashigaru Pads", Faction.Mishima, ItemType.Armor, { head: 0, arms: 1, torso: 2, legs: 1 }),
        new Item("Sode Battlesuit", "Sode Battlesuit", Faction.Mishima, ItemType.Armor, { head: 1, arms: 2, torso: 3, legs: 2 }),
        new Item("Kote Powersuit", "Kote Powersuit", Faction.Mishima, ItemType.Armor, { head: 4, arms: 4, torso: 5, legs: 4 }),
        new Item("Shinobi robes", "Shinobi robes", Faction.Mishima, ItemType.Armor, { head: 1, arms: 2, torso: 2, legs: 1, qualities: ["Unseen"] }),
        new Item("Kariudo Powersuit", "Kariudo Powersuit", Faction.Mishima, ItemType.Armor, { head: 5, arms: 5, torso: 6, legs: 5 }),
        new Item("Kyo Suit", "Kyo Suit", Faction.Mishima, ItemType.Armor, { head: 2, arms: 2, torso: 2, legs: 2, qualities: ["Vac", "Unseen", "ManJets"] }),
        new Item("Athletic padding", "Athletic padding", Faction.Capitol, ItemType.Armor, { head: 1, arms: 1, torso: 2, legs: 0 }),
        new Item("Sports padding", "Sports padding", Faction.Capitol, ItemType.Armor, { head: 2, arms: 1, torso: 0, legs: 0 }),
        new Item("Survivor Armour", "Survivor Armour", Faction.Capitol, ItemType.Armor, { head: 3, torso: 3, arms: 2, legs: 2 }),
        new Item("Panther Armour", "Panther Armour", Faction.Capitol, ItemType.Armor, { head: 1, torso: 2, arms: 2, legs: 1 }),
        new Item("Predator Armour Mk. 1", "Predator Armour Mk. 1", Faction.Capitol, ItemType.Armor, { head: 3, torso: 4, arms: 3, legs: 3 }),
        new Item("Tortoise Mk. 2 Armour", "Tortoise Mk. 2 Armour", Faction.Capitol, ItemType.Armor, { head: 4, torso: 5, arms: 4, legs: 4 }),
        new Item("The Hare Mk. 1 Armour", "The Hare Mk. 1 Armour", Faction.Capitol, ItemType.Armor, { head: 3, torso: 2, arms: 1, legs: 1 }),
        new Item("SLMPS Firebug Armour", "SLMPS Firebug Armour", Faction.Capitol, ItemType.Armor, { head: 3, torso: 3, arms: 2, legs: 2 }),
        new Item("Sea Devil Armour", "Sea Devil Armour", Faction.Capitol, ItemType.Armor, { head: 3, torso: 3, arms: 2, legs: 2 }),
        new Item("IA3000 Integrated armour suite", "IA3000 Integrated armour", Faction.Cybertronic, ItemType.Armor, { head: 5, torso: 5, arms: 4, legs: 4 }),
        new Item("Kameleon Stealth Suit", "Kameleon Stealth Suit", Faction.Cybertronic, ItemType.Armor, { head: 2, torso: 2, arms: 2, legs: 2, qualities: ["Unseen"] }),
        new Item("WF-01 Streltsy Armour", "WF-01 Streltsy Armour", Faction.Whitestar, ItemType.Armor, { head: 3, torso: 3, arms: 2, legs: 2 }),
        new Item("XO-102 'Steel Rider' Powered Armour", "XO-102 'Steel Rider' Powered Armour", Faction.Bauhaus, ItemType.Armor, { head: 4, torso: 5, arms: 4, legs: 4 }),
        new Item("Armoured Robes", "Armoured Robes", Faction.Brotherhood, ItemType.Armor, { head: 0, arms: 1, torso: 1, legs: 1 }),
        new Item("Bowler Hat", "Bowler Hat", Faction.Imperial, ItemType.Armor, { head: 2, arms: 0, torso: 0, legs: 0 }),
        new Item("Mk. IV Combat Proximity Armour", "Mk. IV Combat Proximity Armour", Faction.Imperial, ItemType.Armor, { head: 4, arms: 4, torso: 5, legs: 4, qualities: ["PowerAssisted"] }),
        new Item("Mk. V Augmented Heavy Assault Armour", "Mk. V Agumented Heavy Assault Armour", Faction.Imperial, ItemType.Armor, { head: 4, arms: 4, torso: 5, legs: 4, qualities: ["PowerAssisted", "Stable"] }),
        new Item("Mk. VI Imperial Doomtrooper Armour", "Mk. VI Imperial Doomtrooper Armour", Faction.Imperial, ItemType.Armor, { head: 4, arms: 4, torso: 5, legs: 4 }),
    ];

    private _shoulderPads: Item[] = [
        new Item("Light civilian shoulder pad", "Light Civilian Shoulder Pad", Faction.Freelancer, ItemType.ShoulderPad, { head: 0, torso: 0, arms: 1, legs: 0 }),
        new Item("Light civilian shoulder pads", "Light Civilian Shoulder Pads", Faction.Freelancer, ItemType.ShoulderPad, { head: 1, torso: 0, arms: 1, legs: 0 }),
        new Item("Heavy civilian shoulder pad", "Heavy Civilian Shoulder Pad", Faction.Freelancer, ItemType.ShoulderPad, { head: 0, torso: 0, arms: 2, legs: 0 }),
        new Item("Heavy civilian shoulder pads", "Heavy Civilian Shoulder Pads", Faction.Freelancer, ItemType.ShoulderPad, { head: 1, torso: 0, arms: 2, legs: 0 }),
        new Item("Light military shoulder pad", "Light Military Shoulder Pad", Faction.Freelancer, ItemType.ShoulderPad, { head: 0, torso: 0, arms: 1, legs: 0 }),
        new Item("Light military shoulder pads", "Light Military Shoulder Pads", Faction.Freelancer, ItemType.ShoulderPad, { head: 1, torso: 1, arms: 1, legs: 0 }),
        new Item("Medium military shoulder pad", "Medium Military Shoulder Pad", Faction.Freelancer, ItemType.ShoulderPad, { head: 0, torso: 0, arms: 2, legs: 0 }),
        new Item("Medium military shoulder pads", "Medium Military Shoulder Pads", Faction.Freelancer, ItemType.ShoulderPad, { head: 1, torso: 1, arms: 2, legs: 0 }),
        new Item("Heavy military shoulder pad", "Heavy Military Shoulder Pad", Faction.Freelancer, ItemType.ShoulderPad, { head: 0, torso: 0, arms: 3, legs: 0 }),
        new Item("Heavy military shoulder pads", "Heavy Military Shoulder Pads", Faction.Freelancer, ItemType.ShoulderPad, { head: 1, torso: 1, arms: 3, legs: 0 }),
    ];

    getWeaponByName(name: string) {
        for (var i = 0; i < this._weapons.length; i++) {
            const weapon = this._weapons[i];
            if (weapon.listName === name) {
                return weapon;
            }
        }

        return null;
    }

    getWeapons() {
        var weapons: string[] = [];

        for (var i = 0; i < this._weapons.length; i++) {
            weapons.push(this._weapons[i].listName);
        }

        return this.arrayToString(weapons.sort((a, b) => { return a.localeCompare(b) }));
    }

    getFactionHandguns(faction: Faction) {
        var handguns: string[] = [];

        for (var i = 0; i < this._weapons.length; i++) {
            const weapon = this._weapons[i];
            if ((weapon.properties as IWeaponProperties).weaponType === WeaponType.Pistol &&
                (weapon.faction === faction ||
                 weapon.faction === Faction.Freelancer)) {
                handguns.push(weapon.listName);
            }
        }

        return this.arrayToString(handguns.sort((a, b) => { return a.localeCompare(b) }));
    }

    getNonFactionHandguns() {
        var handguns: string[] = [];

        for (var i = 0; i < this._weapons.length; i++) {
            const weapon = this._weapons[i];
            if ((weapon.properties as IWeaponProperties).weaponType === WeaponType.Pistol &&
                (weapon.faction !== Faction.Imperial)) {
                handguns.push(weapon.listName);
            }
        }

        return this.arrayToString(handguns.sort((a, b) => { return a.localeCompare(b) }));
    }

    getFactionAssaultRifles(faction: Faction) {
        var rifles: string[] = [];

        for (var i = 0; i < this._weapons.length; i++) {
            const weapon = this._weapons[i];
            if ((weapon.properties as IWeaponProperties).weaponType === WeaponType.AssaultRifle &&
                (weapon.faction === faction ||
                 weapon.faction === Faction.Freelancer)) {
                rifles.push(weapon.listName);
            }
        }

        return this.arrayToString(rifles.sort((a, b) => { return a.localeCompare(b) }));
    }

    getSMGs() {
        var smgs: string[] = [];

        for (var i = 0; i < this._weapons.length; i++) {
            const weapon = this._weapons[i];
            if ((weapon.properties as IWeaponProperties).weaponType === WeaponType.SMG) {
                smgs.push(weapon.listName);
            }
        }

        return this.arrayToString(smgs.sort((a, b) => { return a.localeCompare(b) }));
    }

    getAssaultRifles() {
        var smgs: string[] = [];

        for (var i = 0; i < this._weapons.length; i++) {
            const weapon = this._weapons[i];
            if ((weapon.properties as IWeaponProperties).weaponType === WeaponType.AssaultRifle) {
                smgs.push(weapon.listName);
            }
        }

        return this.arrayToString(smgs.sort((a, b) => { return a.localeCompare(b) }));
    }

    getFactionSwords() {
        return ""; // TODO: base on Upper class and heritage
    }

    getBalancedWeapons() {
        let weapons: string[] = [];

        for (var i = 0; i < this._weapons.length; i++) {
            const weapon = this._weapons[i];
            if ((weapon.properties as IWeaponProperties).size <= WeaponSize.TwoHanded) {
                weapons.push(weapon.listName);
            }
        }

        return this.arrayToString(weapons.sort((a, b) => { return a.localeCompare(b) }));
    }

    getMeleeWeapons() {
        let weapons: string[] = [];

        for (var i = 0; i < this._weapons.length; i++) {
            const weapon = this._weapons[i];
            if ((weapon.properties as IWeaponProperties).weaponType === WeaponType.Melee) {
                weapons.push(weapon.listName);
            }
        }

        return this.arrayToString(weapons.sort((a, b) => { return a.localeCompare(b) }));
    }

    getRangedWeapons() {
        let weapons: string[] = [];

        for (var i = 0; i < this._weapons.length; i++) {
            const weapon = this._weapons[i];
            if ((weapon.properties as IWeaponProperties).weaponType !== WeaponType.Melee) {
                weapons.push(weapon.listName);
            }
        }

        return this.arrayToString(weapons.sort((a, b) => { return a.localeCompare(b) }));
    }

    getEventWeaponByName(name: string) {
        for (var i = 0; i < this._eventWeapons.length; i++) {
            const weapon = this._eventWeapons[i];
            if (weapon.listName === name) {
                return weapon;
            }
        }

        return null;
    }

    getArmorByName(name: string) {
        for (var i = 0; i < this._armor.length; i++) {
            const armor = this._armor[i];
            if (armor.listName === name) {
                return armor;
            }
        }

        return null;
    }

    getArmor() {
        var armor = [];

        for (var i = 0; i < this._armor.length; i++) {
            armor.push(this._armor[i].listName);
        }

        return this.arrayToString(armor.sort((a, b) => { return a.localeCompare(b) }));
    }

    getShoulderPadsByName(name: string) {
        for (var i = 0; i < this._shoulderPads.length; i++) {
            const pads = this._shoulderPads[i];
            if (pads.listName === name) {
                return pads;
            }
        }

        return null;
    }

    getShoulderPads() {
        var pads = [];

        for (var i = 0; i < this._shoulderPads.length; i++) {
            pads.push(this._shoulderPads[i].listName);
        }

        return this.arrayToString(pads.sort((a, b) => { return a.localCompare(b) }));
    }

    getPersonalLibraries() {
        var libraries =
            "Personal Library (Education)" +
            "|Personal Library (Linguistics)" +
            "|Personal Library (Mechanics)" +
            "|Personal Library (Medicine)" +
            "|Personal Library (Mysticism)" +
            "|Personal Library (Sciences)";

        return libraries;
    }

    getBEKits() {
        var kits =
            "Lock Picking Kit" +
            "|Bolt Cutter" +
            "|Glass Cutter" +
            "|Safecracker Kit" +
            "|Sabotage Kit";

        return kits;
    }

    getSurvivalKits() {
        var kits =
            "Basic survival kit (Arctic)" +
            "|Basic survival kit (Desert)" +
            "|Basic survival kit (Jungle)" +
            "|Basic survival kit (Mountain)" +
            "|Basic survival kit (Forest)" +
            "|Basic survival kit (Plains)" +
            "|Basic survival kit (Subterranean)" +
            "|Basic survival kit (Urban)";

        return kits;
    }

    getColonialSurvivalKits() {
        var kits =
            "Colonial survival kit (Arctic)" +
            "|Colonial survival kit (Desert)" +
            "|Colonial survival kit (Jungle)" +
            "|Colonial survival kit (Mountain)" +
            "|Colonial survival kit (Forest)" +
            "|Colonial survival kit (Plains)" +
            "|Colonial survival kit (Subterranean)" +
            "|Colonial survival kit (Urban)";

        return kits;
    }

    getCamouflageKits() {
        var kits =
            "Camouflage kit (Arctic)" +
            "|Camouflage kit (Desert)" +
            "|Camouflage kit (Jungle)" +
            "|Camouflage kit (Mountain)" +
            "|Camouflage kit (Forest)" +
            "|Camouflage kit (Plains)" +
            "|Camouflage kit (Subterranean)" +
            "|Camouflage kit (Urban)"; 

        return kits;
    }

    generateMusashiBladeProperty() {
        const roll = Math.floor(Math.random() * 20) + 1;
        switch (roll) {
            case 1: return "Darkslayer";
            case 2: {
                let faction = FactionsHelper.generateHeritage();
                let factionName = FactionsHelper.getFaction(faction).name;
                if (faction === Faction.Mishima) {
                    factionName = "Another Mishiman Family";
                }
                return `Hating Blade (${factionName})`;
            }
            case 3: return "Firestriker";
            case 4: return "Dim Mak";
            case 5: return "Headtaker";
            case 6: return "Bonebreaker";
            case 7: return "Deadly Accuracy";
            case 8: return "Defender";
            case 9: return "Shielding";
            case 10: return "Spirit Weapon";
            case 11: return "Schooled Weapon";
            case 12: return "Flesh-Render";
            case 13: return "Truesilver";
            case 14: return "Lifestealer";
            case 15: return "Living Weapon";
            case 16: return "Sentinel";
            case 17: return "Ki Focus";
            case 18: return "Heartbreaker";
            case 19: return "Seeker";
            case 20: return "Bonded";
        }

        return "";
    }

    generateBionicImplant() {
        const location = Math.floor(Math.random() * 20) + 1;
        const roll = Math.floor(Math.random() * 6) + 1;

        switch (location) {
            case 1:
            case 2: {
                switch (roll) {
                    case 1:
                    case 2: return "Radio Transciever";
                    case 3:
                    case 4:
                    case 5: {
                        const type = Math.floor(Math.random() * 6) + 1;
                        switch (type) {
                            case 1:
                            case 2: return "Targeter Eye";
                            case 3:
                            case 4: return "Telescopic Eye";
                            case 5:
                            case 6: return "Thermographic Eye";
                        }
                        break;
                    }
                    case 6: return "Vocal Digitiser";
                }
                break;
            }
            case 3:
            case 4:
            case 5: {
                switch (roll) {
                    case 1:
                    case 2:
                    case 3: return "Bionic Arm (right, basic)";
                    case 4: return "Bionic Arm (right, Adamantine Claws)";
                    case 5: return "Bionic Arm (right, Dropgun)";
                    case 6: return "Bionic Arm (right, Iron Fist)";
                }
                break;
            }
            case 6:
            case 7:
            case 8: {
                switch (roll) {
                    case 1:
                    case 2:
                    case 3: return "Bionic Arm (left, basic)";
                    case 4: return "Bionic Arm (left, Adamantine Claws)";
                    case 5: return "Bionic Arm (left, Dropgun)";
                    case 6: return "Bionic Arm (left, Iron Fist)";
                }
                break;
            }
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14: {
                switch (roll) {
                    case 1:
                    case 2:
                    case 3: return "Armoured Ribcage";
                    case 4:
                    case 5:
                    case 6: return "Tox-monitor";
                }
                break;
            }
            case 15:
            case 16:
            case 17: {
                switch (roll) {
                    case 1:
                    case 2:
                    case 3: "Bionic Leg (right, basic)";
                    case 4: return "Bionic Leg (right, Integral Gun)";
                    case 5:
                    case 6: return "Bionic Leg (right, Integral Compartment)";
                }
                break;
            }
            case 18:
            case 19:
            case 20: {
                switch (roll) {
                    case 1:
                    case 2:
                    case 3: "Bionic Leg (left, basic)";
                    case 4: return "Bionic Leg (left, Integral Gun)";
                    case 5:
                    case 6: return "Bionic Leg (left, Integral Compartment)";
                }
                break;
            }      
        }
    }

    public getSize(size: WeaponSize) {
        switch (size) {
            case WeaponSize.OneHanded: return "1H";
            case WeaponSize.TwoHanded: return "2H";
            case WeaponSize.Unbalanced: return "Unb";
            case WeaponSize.Unwieldy: return "Unw";
        }

        return "";
    }

    public getMode(mode: WeaponMode) {
        switch (mode) {
            case WeaponMode.Semi: return "Semi";
            case WeaponMode.Burst: return "Burst";
            case WeaponMode.Auto: return "Auto";
            case WeaponMode.Munition: return "Munition";
        }

        return "";
    }

    private arrayToString(array: string[]) {
        var str = "";
        for (var i = 0; i < array.length; i++) {
            str += `${i !== 0 ? '|' : ''}${array[i]}`;
        }

        return str;
    }
}

export const EquipmentHelper = new Equipment();
