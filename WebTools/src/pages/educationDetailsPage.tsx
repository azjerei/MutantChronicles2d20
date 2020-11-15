import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {Education, EducationsHelper} from '../helpers/educations';
import {Skill, SkillsHelper} from '../helpers/skills';
import {AttributesHelper} from '../helpers/attributes';
import {TalentsHelper} from '../helpers/talents';
import {Faction} from '../helpers/factions';
import {Status} from '../helpers/status';
import {ApostleHelper} from '../helpers/apostles';
import {PrimaryCareer, PrimaryCareersHelper} from '../helpers/primaryCareers';
import {PageHeader} from '../components/pageHeader';
import {AttributeView} from '../components/attribute';
import {SkillImprovement} from '../components/skillImprovement';
import {Button} from '../components/button';
import {CheckBox} from '../components/checkBox';
import {ElectiveSkillImprovement} from '../components/electiveSkillImprovement';
import {TalentList} from '../components/talentList';
import {TalentDescription} from '../components/talentDescription';
import {EquipmentList} from '../components/equipmentList';
import { Source } from '../helpers/sources';

export class EducationDetailsPage extends React.Component<IPageProperties, {}> {
    private _selectedTalent: string;
    private _selectedEquipment: string;
    private _equipment: string[];

    constructor(props: IPageProperties) {
        super(props);

        const education = EducationsHelper.getEducation(character.education);

        var equipment = education.equipment;

        equipment.forEach(e => {
            if (e.indexOf('|') > -1) {
                this._selectedEquipment = e.split('|')[0];
            }
        });

        this._equipment = equipment;
    }

    render() {
        var education = EducationsHelper.getEducation(character.education);

        const attributes = education.attributes.map((attr, i) => {
                return <AttributeView key={i} name={AttributesHelper.getAttributeName(i) } points={attr} value={character.attributes[i].value}/>
            });

        const mandatory = education.mandatory.map((m, i) => {
            return (
                <SkillImprovement key={i} skill={m} onUpdated={() => this.onUpdate() } />
            )
        });

        var elective = education.elective;

        if (character.isHeretic()) {
            ApostleHelper.getBonusSkills(character.patron).forEach(s => {
                if (elective.indexOf(s) === -1) {
                    elective.push(s);
                }
            });
        }

        if (character.faction === Faction.Whitestar && character.earnings > 0) {
            if (character.status >= Status.ThoseWhoGovern) {
                if (elective.indexOf(Skill.Command) === -1) {
                    elective.push(Skill.Command);
                }
            }

            if (elective.indexOf(Skill.RangedWeapons) === -1) {
                elective.push(Skill.RangedWeapons);
            }
        }
        else if (character.faction === Faction.Bauhaus) {
            if (character.status === Status.Commoner || character.status === Status.Retainer) {
                if (elective.indexOf(Skill.RangedWeapons) === -1) {
                    elective.push(Skill.RangedWeapons);
                }
            }
            else if (character.status === Status.Nobility ||
                     character.status === Status.NobleGreatHouse ||
                     character.status === Status.NobleElectorHouse) {
                if (elective.indexOf(Skill.Command) === -1) {
                    elective.push(Skill.Command);
                }
                if (elective.indexOf(Skill.RangedWeapons) === -1) {
                    elective.push(Skill.RangedWeapons);
                }
            }
        }
        
        if (character.educationMandatoryAsElective) {
            elective.push(...education.mandatory);
        }

        const talent = character.education === Education.BrotherhoodApprenticeship
            ? <TalentDescription name="Mystic" description={TalentsHelper.getTalent("Mystic").description} />
            : <TalentList skills={education.talents} onSelection={talent => this.onTalentSelected(talent) }/>;

        return (
            <div className="page">
                <PageHeader text="EDUCATION" />
                <div className="header-text">{education.name}</div>
                <div className="panel">
                    <div className="header-small">ATTRIBUTES</div>
                    {attributes}
                </div>
                <div className="panel">
                    <div className="header-small">MANDATORY SKILLS</div>
                    {mandatory}
                </div>
                <div className="panel">
                    <div className="header-small">ELECTIVE SKILLS</div>
                    <ElectiveSkillImprovement skills={elective} points={2} onUpdated={() => this.onUpdate() } />
                </div>
                <div className="panel">
                    <div className="header-small">TALENT</div>
                    {talent}
                </div>
                <div className="panel">
                    <div className="header-small">EQUIPMENT</div>
                    <EquipmentList equipment={this._equipment} onSelected={eq => this.onEquipmentSelected(eq) } />
                </div>
                <Button text="ADOLESCENCE EVENT" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onUpdate() {
        this.forceUpdate();
    }

    private onTalentSelected(talent: string) {
        this._selectedTalent = talent;
    }

    private onEquipmentSelected(eq: string) {
        this._selectedEquipment = eq;
    }

    private onNext() {
        if (character.education !== Education.BrotherhoodApprenticeship) {
            character.addTalent(this._selectedTalent);
        }

        character.addEquipment(this._selectedEquipment);

        Navigation.navigateToPage(PageIdentity.AdolescenceEvent);
    }
}