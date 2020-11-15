import {character} from '../common/character';

export enum Attribute {
    Agility,
    Awareness,
    Coordination,
    Intelligence,
    Mental_Strength,
    Personality,
    Physique,
    Strength
}

export class Attributes {
    getAttributeName(attr: Attribute) {
        return Attribute[attr].replace("_", " ");
    }
}

export const AttributesHelper = new Attributes();