import {Clan} from './clans';
import {Education} from './educations';

export class ClanEducations {
    static generateEducation(clan: Clan) {
        const roll = Math.floor(Math.random() * 6) + 1;
        switch (clan) {
            case Clan.Axelthorpe:
            case Clan.Smythe: {
                switch (roll) {
                    case 1: return [Education.Galway];
                    case 2: return [Education.Wexford];
                    case 3: return [Education.Langfrey];
                    case 4: return [Education.Paxton];
                    case 5:
                    case 6: return [Education.Galway, Education.Wexford, Education.Langfrey, Education.Paxton];
                }
                break;
            }
            case Clan.Bartholomew: {
                switch (roll) {
                    case 1:
                    case 2:
                    case 3:
                    case 4: return ClanEducations.generateSchool(ClanEducations.BartholomewStandardSchools);
                    case 5: return [Education.Paxton];
                    case 6: return [Education.RollStandard, Education.Paxton];
                }
                break;
            }
            case Clan.Drougan:
            case Clan.Dunsirn: {
                switch (roll) {
                    case 1: return [Education.NewBristol];
                    case 2: return [Education.Galway];
                    case 3: return [Education.IIT];
                    case 4: return [Education.Paxton];
                    case 5: return [Education.Stratford];
                    case 6: return [Education.NewBristol, Education.Galway, Education.IIT, Education.Paxton, Education.Stratford];
                }
                break;
            }
            case Clan.Fergan: {
                switch (roll) {
                    case 1: return [Education.NewBristol];
                    case 2: return [Education.Galway];
                    case 3: return [Education.Paxton];
                    case 4: return [Education.Stratford];
                    case 5: return 
                    case 6: return [Education.NewBristol, Education.Galway, Education.Paxton, Education.Stratford];
                }
                break;
            }
            case Clan.Fieldhausen: {
                switch (roll) {
                    case 1:
                    case 2: return ClanEducations.generateSchool(ClanEducations.FieldhausenStandardSchools);
                    case 3: return [Education.Wexford];
                    case 4: return [Education.Serenitys];
                    case 5: return [Education.Stratford];
                    case 6: return [Education.RollStandard, Education.Wexford, Education.Serenitys, Education.Stratford];
                }
                break;
            }
            case Clan.Finn: {
                switch (roll) {
                    case 1: return [Education.Galway];
                    case 2: return [Education.Hampshire];
                    case 3: return [Education.Mercy];
                    case 4: return [Education.Serenitys];
                    case 5: return [Education.Stratford];
                    case 6: return [Education.Galway, Education.Hampshire, Education.Mercy, Education.Serenitys, Education.Stratford];
                }
                break;
            }
            case Clan.Gallagher: {
                switch (roll) {
                    case 1: return [Education.NewBristol];
                    case 2: return [Education.Galway];
                    case 3: return [Education.IIT];
                    case 4: return [Education.Stratford];
                    case 5: return [Education.Wexford];
                    case 6: return [Education.NewBristol, Education.Galway, Education.IIT, Education.Stratford, Education.Wexford];
                }
                break;
            }
            case Clan.Kingsfield:
            case Clan.Loughton:
            case Clan.MacGuire:
            case Clan.Morgan:
            case Clan.Oakenfist:
            case Clan.Paladine: {
                switch (roll) {
                    case 1:
                    case 2:
                    case 3: return ClanEducations.generateSchool(ClanEducations.KingsfieldStandardSchools);
                    case 4: 
                    case 5: return ClanEducations.generateSchool(ClanEducations.KingsfieldEliteSchools);
                    case 6: return [Education.RollStandard, Education.RollElite];
                }
                break;
            }
            case Clan.Murdoch: {
                switch (roll) {
                    case 1:
                    case 2:
                    case 3: return ClanEducations.generateSchool(ClanEducations.MurdochStandardSchools);
                    case 4:
                    case 5: return ClanEducations.generateSchool(ClanEducations.MurdochEliteSchools);
                    case 6: return [Education.RollStandard, Education.RollElite];
                }
                break;
            }
            case Clan.Murray: {
                switch (roll) {
                    case 1:
                    case 2:
                    case 3: return ClanEducations.generateSchool(ClanEducations.KingsfieldStandardSchools);
                    case 4:
                    case 5: return ClanEducations.generateSchool(ClanEducations.MurrayEliteSchools);
                    case 6: return [Education.RollStandard, Education.RollElite];
                }
                break;
            }
            case Clan.OLoughton: {
                switch (roll) {
                    case 1:
                    case 2: return [Education.Galway];
                    case 3:
                    case 4: return [Education.NewBristol];
                    case 5: return [Education.Paxton];
                    case 6: return [Education.NewBristol, Education.Galway, Education.Paxton];
                }
                break;
            }
        }
    }

    static generateSchool(candidates: Education[]) {
        const roll = Math.floor(Math.random() * (candidates.length - 1)); // ignore Brotherhood Apprentice/Educated
        return [candidates[roll]];
    }

    static getStandardSchools(clan: Clan) {
        switch (clan) {
            case Clan.Axelthorpe:
            case Clan.Smythe: return [Education.Galway, Education.Langfrey, Education.BrotherhoodEducated];
            case Clan.Bartholomew: return ClanEducations.BartholomewStandardSchools;
            case Clan.Brannaghan: return ClanEducations.BrannaghanStandardSchools;
            case Clan.Drougan:
            case Clan.Dunsirn: return [Education.NewBristol, Education.Galway, Education.IIT, Education.BrotherhoodEducated];
            case Clan.Fergan: return [Education.NewBristol, Education.Galway, Education.BrotherhoodEducated];
            case Clan.Fieldhausen: return ClanEducations.FieldhausenStandardSchools;
            case Clan.Finn: return [Education.Galway, Education.Hampshire, Education.Mercy, Education.BrotherhoodEducated];
            case Clan.Gallagher: return [Education.NewBristol, Education.Galway, Education.IIT, Education.BrotherhoodEducated];
            case Clan.Kingsfield:
            case Clan.Loughton:
            case Clan.MacGuire:
            case Clan.Morgan:
            case Clan.Murray:
            case Clan.Oakenfist:
            case Clan.Paladine: return ClanEducations.KingsfieldStandardSchools;
            case Clan.Murdoch: return ClanEducations.MurdochStandardSchools;
            case Clan.OLoughton: return [Education.Galway, Education.NewBristol, Education.BrotherhoodEducated];
        }
    }

    static getEliteSchools(clan: Clan) {
        switch (clan) {
            case Clan.Axelthorpe:
            case Clan.Smythe: return [Education.Wexford, Education.Paxton, Education.BrotherhoodApprenticeship];
            case Clan.Bartholomew: return [Education.Paxton, Education.BrotherhoodApprenticeship];
            case Clan.Brannaghan: return [Education.Paxton, Education.Babbage, Education.BrotherhoodApprenticeship];
            case Clan.Drougan:
            case Clan.Dunsirn: return [Education.Paxton, Education.Stratford, Education.BrotherhoodApprenticeship];
            case Clan.Fergan: return [Education.Paxton, Education.Stratford, Education.BrotherhoodApprenticeship];
            case Clan.Fieldhausen: return [Education.Wexford, Education.Serenitys, Education.Stratford, Education.BrotherhoodApprenticeship];
            case Clan.Finn: return [Education.Serenitys, Education.Stratford, Education.BrotherhoodApprenticeship];
            case Clan.Gallagher: return [Education.Stratford, Education.Wexford, Education.BrotherhoodApprenticeship];
            case Clan.Kingsfield:
            case Clan.Loughton:
            case Clan.MacGuire:
            case Clan.Morgan:
            case Clan.Murray:
            case Clan.Oakenfist:
            case Clan.Paladine: return ClanEducations.KingsfieldEliteSchools;
            case Clan.Murdoch: return ClanEducations.MurdochEliteSchools;
            case Clan.Murray: return ClanEducations.MurrayEliteSchools;
            case Clan.OLoughton: return [Education.Paxton, Education.BrotherhoodApprenticeship];
        }
    }

    private static BartholomewStandardSchools = [Education.Galway, Education.Langfrey, Education.Hampshire, Education.Mercy, Education.NewBristol, Education.IIT, Education.BrotherhoodEducated];
    private static BrannaghanStandardSchools = [Education.NewBristol, Education.Galway, Education.IIT, Education.LunaMemorial, Education.BrotherhoodEducated];
    private static FieldhausenStandardSchools = [Education.NewBristol, Education.Galway, Education.IIT, Education.Langfrey, Education.Hampshire, Education.BrotherhoodEducated];
    private static KingsfieldStandardSchools = [Education.NewBristol, Education.Galway, Education.IIT, Education.Langfrey, Education.Hampshire, Education.Mercy, Education.BrotherhoodEducated];
    private static KingsfieldEliteSchools = [Education.Stratford, Education.Wexford, Education.Serenitys, Education.Cardinals, Education.Paxton, Education.Babbage, Education.BrotherhoodApprenticeship];
    private static MurdochStandardSchools = [Education.SerenitysMilitaryCollegeStd, Education.Galway, Education.IIT, Education.Langfrey, Education.Hampshire, Education.Mercy, Education.BrotherhoodEducated];
    private static MurdochEliteSchools = [Education.Stratford, Education.Wexford, Education.Serenitys, Education.Cardinals, Education.SerenitysMilitaryCollegeElite, Education.Babbage, Education.BrotherhoodApprenticeship];
    private static MurrayEliteSchools = [Education.Wexford, Education.Serenitys, Education.Cardinals, Education.Paxton, Education.Babbage, Education.BrotherhoodApprenticeship];
}