import {Skill} from './skills';

export enum Apostle {
    Algeroth,
    Demnogonis,
    Ilian,
    Muawijhe,
    Semai
}

class Apostles {
    getBonusSkills(apostle: Apostle) {
        switch (apostle) {
            case Apostle.Algeroth:
                return [Skill.CloseCombat, Skill.Mechanics];
            case Apostle.Ilian:
                return [Skill.Insight, Skill.Mysticism];
            case Apostle.Demnogonis:
                return [Skill.Resistance, Skill.Treatment];
            case Apostle.Muawijhe:
                return [Skill.Insight, Skill.Willpower];
            case Apostle.Semai:
                return [Skill.Lifestyle, Skill.Persuade];
        }

        return null;
    }

    getEndowmentName(apostle: Apostle) {
        switch (apostle) {
            case Apostle.Algeroth: return "Implants";
            case Apostle.Demnogonis: return "Pesticus";
            case Apostle.Ilian: return "Weaves";
            case Apostle.Muawijhe:
            case Apostle.Semai: return "Dark Ink";
        }

        return "";
    }
}

export const ApostleHelper = new Apostles();