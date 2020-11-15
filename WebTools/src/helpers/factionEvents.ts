import {character} from '../common/character';
import {Faction, FactionsHelper} from './factions';
import {Clan, ClansHelper} from './clans';
import {Timeline} from './timelines';

export class FactionEventModel {
    description: string;
    onApply: () => void;
    options: string[];
    onOptionSelected: (option) => void;

    constructor(description: string, onApply: () => void, options: string[], onOptionSelected: (option) => void) {
        this.description = description;
        this.onApply = onApply;
        this.options = options;
        this.onOptionSelected = onOptionSelected;
    }
}

class FactionEvents {
    private _events: { [faction: number]: FactionEventModel[] } = {
        [Faction.Mishima]: [
            new FactionEventModel(
                `You have a contact in ${this.generateFaction()} who owes you a favour.`,
                () => { },
                [],
                (option) => { }),
            new FactionEventModel(
                "You gain 1 asset.",
                () => { character.assets++; },
                [],
                (option) => { }),
            new FactionEventModel(
                "You have a contact within Mishima that you have blackmail over. Gain a favour and an enemy.",
                () => { },
                [],
                (option) => { }),
            new FactionEventModel(
                "You have family debts and history with a Triad. Gain a one asset debt, but you can make peaceful contact with the Triad at any time and negotiate favours.",
                () => { },
                [],
                (option) => { }),
            new FactionEventModel(
                "A Mishiman family has declared war against your family. This family is of equal status to your own. The war may not be legal, but its best to avoid them where possible.",
                () => { },
                [],
                (option) => { }),
            new FactionEventModel(
                "Your Leige lord has favoured you with extensive assets. Gain five assets, which you must spend on a single item. If you use this on purchasing a Mishiman weapon or armour, you may improve its usual reliability by one.",
                () => { },
                [],
                (option) => { }),
        ],
        [Faction.Capitol]: [
            new FactionEventModel(
                "You have a business card of a good contact who owes you a favour.",
                () => { },
                [],
                (option) => { }),
            new FactionEventModel(
                "You gain 1 asset.",
                () => { character.assets++; },
                [],
                (option) => { }),
            new FactionEventModel(
                `You have three business cards from contacts in ${this.generateFaction()}, ${this.generateFaction()} and ${this.generateFaction()} (one of these is a secret enemy).`,
                () => { },
                [],
                (option) => { }),
            new FactionEventModel(
                "You have obtained a gang member as a contact. For purchasing illegal goods you may spend two assets to reduce the Availability by one.",
                () => { },
                [],
                (option) => { }),
            new FactionEventModel(
                "People still remember what your uncle did and you have had to change your surname. Some of the family’s enemies still turn up from time to time.",
                () => { },
                [],
                (option) => { }),
            new FactionEventModel(
                "You have an office to collect you thoughts in (rent on a small office is paid for the next two months).",
                () => { },
                [],
                (option) => { }),
        ],
        [Faction.Bauhaus]: [
            new FactionEventModel(
                "You have a contact in the Brotherhood or Bauhaus who owes you a favour.",
                () => { },
                ["The Brotherhood", "Bauhaus"],
                (option) => { character.factionEvent = `You have a contact in ${option} who owes you a favour.`; }),
            new FactionEventModel(
                "You gain 1 asset.",
                () => { character.assets++; },
                [],
                (option) => { }),
            new FactionEventModel(
                "A noble favour has been granted to your house. Using this favour will gain you an enemy in the noble who granted it.",
                () => { },
                [],
                (option) => { }),
            new FactionEventModel(
                "You have a relative in an underground movement who owes you a favour.",
                () => { },
                [],
                (option) => { }),
            new FactionEventModel(
                "Your family has run afoul of an inquisitor and is under investigation.",
                () => { },
                [],
                (option) => { }),
            new FactionEventModel(
                "You come from a proud family line. Gain a cape, a heavy civilian shoulderpad with your family crest and a faux cresthelm (armour 0). If you purchase a helmet you may later merge the faux cresthelm with this helmet for free.",
                () => {
                    character.addEquipment("Cape");
                    character.addEquipment("Heavy Civilian Shoulder Pad");
                    character.addEquipment("Faux Cresthelm");
                },
                [],
                (option) => { }),
        ],
        [Faction.Imperial]: [
            new FactionEventModel(
                `You have a contact in ${this.generateFaction()} who owes you significant funds (three assets).`,
                () => { },
                [],
                (option) => { }),
            new FactionEventModel(
                "You gain 1 asset.",
                () => { character.assets++; },
                [],
                (option) => { }),
            new FactionEventModel(
                "You have a contact in another clan or corporation who secretly owes you a favour and and hates you for it.",
                () => { },
                [...this.getFactions(), ...this.getClans()],
                (option) => { character.factionEvent = `You have a contact in ${option} who secretly owes you a favour and and hates you for it.` }),
            new FactionEventModel(
                "Your family has extensive ties to the criminal networks of multiple corporations. You are owed no favours but can make peaceful contact with any organised crime body.",
                () => { },
                [],
                (option) => { }),
            new FactionEventModel(
                `You have a family enemy in ${this.generateFaction()}.`,
                () => { },
                [],
                (option) => { }),
            new FactionEventModel(
                "You have been given grandfather’s pistol. While not strictly legal, your family has kept an old Aggressor pistol that has been handed down to you.",
                () => { character.addEquipment("Aggressor Handgun"); },
                [],
                (option) => { }),
        ],
        [Faction.Cybertronic]: [
            new FactionEventModel(
                "You have a contact within Cybercurity who owes you a favour.",
                () => { },
                [],
                (option) => { }),
            new FactionEventModel(
                "You gain 1 asset.",
                () => { character.assets++; },
                [],
                (option) => { }),
            new FactionEventModel(
                "You have a contact working for your former employer who begrudgingly owes you a favour.",
                () => { },
                [],
                (option) => { }),
            new FactionEventModel(
                "Your corporate mentor is connected to an illegal augmentation business (and now so are you). Purchasing augmentation is one difficulty rank less than normal.",
                () => { },
                [],
                (option) => { }),
            new FactionEventModel(
                `You have a personal enemy in ${this.generatePersonalEnemy()}.`,
                () => { },
                [],
                (option) => { }),
            new FactionEventModel(
                "You have a cybernetic enhancement. A SARaH system has been implanted in your upper spine.",
                () => { character.addEquipment("SARaH System") },
                [],
                (option) => { }),
        ],
        [Faction.Whitestar]: [
            new FactionEventModel(
                "You have a senior contact in Whitestar who owes you a favour.",
                () => { },
                [],
                (option) => { }),
            new FactionEventModel(
                "You gain 1 asset.",
                () => { character.assets++; },
                [],
                (option) => { }),
            new FactionEventModel(
                `${this.generateProof()}. Either one will grant a favour for the evidence.`,
                () => { },
                [],
                (option) => { }),
            new FactionEventModel(
                "Your clan is involved in the medical labs of the Tsarina and the criminal exploitation of its discoveries. While most gangs will not have heard of you, you can make peaceful contact with senior members of organised crime.",
                () => { },
                [],
                (option) => { }),
            new FactionEventModel(
                "Your homeland still bears the scars of the corporate exodus. Your public comments have made an enemy in Bauhaus.",
                () => { },
                [],
                (option) => { }),
            new FactionEventModel(
                "Gain your choice of a basic survival kit suitable for Dark Eden’s irradiated coldland, or a set of night vision goggles.",
                () => { },
                ["Basic Survival Kit (Dark Eden coldland)", "Night Vision Goggles"],
                (option) => { character.addEquipment(option); }),
        ],
    };

    generateEvent(faction: Faction) {
        var roll = Math.floor(Math.random() * 6);
        var event = this._events[faction][roll];
        return event;
    }

    private generateFaction() {
        var faction = FactionsHelper.generateHeritage();
        return FactionsHelper.getFaction(faction).name;
    }

    private getFactions() {
        var factions = ["Mishima", "Capitol", "Bauhaus", "Imperial", "Whitestar"];
        if (character.timeline !== Timeline.DarkSymmetry) {
            factions.push("Cybertronic");
        }
        return factions;
    }

    private getClans() {
        var clans = [];
        ClansHelper.getClans().forEach(c => {
            clans.push(`Clan ${c.name}`);
        });
        return clans;
    }

    private generatePersonalEnemy() {
        var roll = Math.floor(Math.random() * 6) + 1;
        if (roll <= 4) {
            return FactionsHelper.getFaction(Faction.Imperial).name;
        } else {
            var faction = FactionsHelper.generateHeritage();
            while (faction === Faction.Imperial) {
                faction = FactionsHelper.generateHeritage();
            }
            return FactionsHelper.getFaction(faction).name;
        }
    }

    private generateProof() {
        var faction1 = FactionsHelper.generateHeritage();
        var faction2 = FactionsHelper.generateHeritage();

        while (faction1 === faction2) {
            faction2 = FactionsHelper.generateHeritage();
        }

        return `You have been given proof that ${FactionsHelper.getFaction(faction1).name} has committed misdeeds against ${FactionsHelper.getFaction(faction2).name}.`;
    }
}

export const FactionEventsHelper = new FactionEvents();