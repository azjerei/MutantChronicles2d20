import {character} from '../common/character';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {EquipmentHelper} from './equipment';
import {DiceRoller} from './diceRoller';

export enum Pillar {
    VAC_AEM,
    VAC_RDM,
    VAC_SWI,
    TIFF_AEM,
    TIFF_RDM,
    TIFF_SWI
};

class PillarModel {
    name: string;
    attributes: Attribute[];
    skills: Skill[];
    earnings: string;

    constructor(name: string, attributes: Attribute[], skills: Skill[], earnings: string) {
        this.name = name;
        this.attributes = attributes;
        this.skills = skills;
        this.earnings = earnings;
    }
}

class PillarViewModel extends PillarModel {
    id: Pillar;

    constructor(id: Pillar, base: PillarModel) {
        super(base.name, base.attributes, base.skills, base.earnings);
        this.id = id;
    }
}

export class Pillars {
    private _pillars: { [id: number]: PillarModel } = {
        [Pillar.VAC_AEM]: new PillarModel(
            "VAC, AEM",
            [Attribute.Intelligence, Attribute.Mental_Strength],
            [Skill.Education, Skill.Lifestyle],
            "1+2DS"),
        [Pillar.VAC_RDM]: new PillarModel(
            "VAC, RDM",
            [Attribute.Agility, Attribute.Strength],
            [Skill.Mechanics, Skill.Resistance],
            "1+2DS"),
        [Pillar.VAC_SWI]: new PillarModel(
            "VAC, SWI",
            [Attribute.Awareness, Attribute.Physique],
            [Skill.Observation, Skill.Athletics],
            "1+2DS"),
        [Pillar.TIFF_AEM]: new PillarModel(
            "TIFF, AEM",
            [Attribute.Intelligence, Attribute.Personality],
            [Skill.Lifestyle, Skill.Persuade],
            "3+1DS"),
        [Pillar.TIFF_RDM]: new PillarModel(
            "TIFF, RDM",
            [Attribute.Intelligence, Attribute.Personality],
            [Skill.Persuade, Skill.Science],
            "3+1DS"),
        [Pillar.TIFF_SWI]: new PillarModel(
            "TIFF, SWI",
            [Attribute.Agility, Attribute.Coordination],
            [Skill.CloseCombat, Skill.RangedWeapons],
            "3+1DS"),
    };

    getPillars() {
        var pillars: PillarViewModel[] = [];
        var n = 0;
        for (var pillar in this._pillars) {
            var c = this._pillars[pillar];
            pillars.push(new PillarViewModel(n, c));
            n++;
        }

        return pillars;
    }

    getPillar(pillar: Pillar) {
        return new PillarViewModel(pillar, this._pillars[pillar]);
    }

    generatePillar() {
        var roll = Math.floor(Math.random() * 6) + 1;

        switch (roll) {
            case 1: return Pillar.VAC_AEM;
            case 2: return Pillar.VAC_RDM;
            case 3: return Pillar.VAC_SWI;
            case 4: return Pillar.TIFF_AEM;
            case 5: return Pillar.TIFF_RDM;
            case 6: return Pillar.TIFF_SWI;
        }

        return undefined;
    }

    applyPillar(pillar: Pillar) {
        var s = this.getPillar(pillar);

        s.attributes.forEach(a => {
            character.attributes[a].value++;
        });

        const earningsBits = s.earnings.split('+');
        const constant = parseInt(earningsBits[0]);
        const dice = parseInt(earningsBits[1].replace("DS", ""));

        const roll = DiceRoller.rollSpecial(dice, constant);

        for (var i = 0; i < roll.special; i++) {
            character.assets += 2;
        }

        character.earnings = roll.hits + roll.bonus;
    }

    getEquipment(earnings: number) {
        var equipment: string[] = [];

        switch (earnings) {
            case 1: {
                equipment.push("Collection of songs from a popular subreality musician");
                equipment.push("Season pass for public transit");
                equipment.push("Chrome pin of the Cybertronic emblem");
                equipment.push("Mini-torch");
                break;
            }
            case 2: {
                equipment.push("Old work goggles");
                if (character.isVAC()) {
                    equipment.push("A photograph of someone you knew before you joined Cybertronic");
                }
                equipment.push("A half-filled request form to transfer to another facility");
                equipment.push("A basic repair kit");
                equipment.push("A book of discount coupons");
                equipment.push("A poster of a celebrity or pin- up");
                break;
            }
            case 3: {
                equipment.push("Employee performance reward (two assets)");
                equipment.push("Chrome collar pin or cufflinks with Cybertronic logo");
                equipment.push("Lifetime subscription to an entertainment node in subreality");
                equipment.push("Mini-torch");
                break;
            }
            case 4: {
                equipment.push("VIP access to an exclusive club within subreality,");
                equipment.push("Collection of memoryrecordings from subreal celebrities");
                equipment.push("CSA400 Combat Sword");
                equipment.push("P1000 Handgun");
                break;
            }
            case 5: {
                equipment.push("A portrait or sculpture from another corporation");
                equipment.push("Producer credits on at least three subreality productions");
                equipment.push("A piece of recovered ancient technology (inoperable)");
                break;
            }
        }

        return equipment.join("|");
    }
}

export const PillarsHelper = new Pillars();