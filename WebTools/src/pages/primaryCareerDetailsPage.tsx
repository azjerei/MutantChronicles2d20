import * as React from 'react';
import {character, CharacterCareer} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {PrimaryCareer, PrimaryCareersHelper} from '../helpers/primaryCareers';
import {Skill, SkillsHelper} from '../helpers/skills';
import {AttributesHelper} from '../helpers/attributes';
import {TalentsHelper} from '../helpers/talents';
import {Faction} from '../helpers/factions';
import {Status} from '../helpers/status';
import {ApostleHelper} from '../helpers/apostles';
import {PageHeader} from '../components/pageHeader';
import {AttributeView} from '../components/attribute';
import {SkillImprovement} from '../components/skillImprovement';
import {Button} from '../components/button';
import {ElectiveSkillImprovement} from '../components/electiveSkillImprovement';
import {SignatureSkillSelection} from '../components/signatureSkillSelection';
import {SignatureSkillSwap} from '../components/signatureSkillSwap';
import {TalentList} from '../components/talentList';
import {EquipmentList} from '../components/equipmentList';
import {KiSchoolSelection} from '../components/kiSchoolSelection';

export class PrimaryCareerDetailsPage extends React.Component<IPageProperties, {}> {
    private _selectedTalent: string;
    private _selectedEquipment: string;
    private _showEquipment: boolean;
    private _showKiSchools: boolean;
    private _swap: SignatureSkillSwap;

    constructor(props: IPageProperties) {
        super(props);

        const currentCareer = character.careers[character.careers.length - 1];
        const career = PrimaryCareersHelper.getCareer(currentCareer.career);

        career.equipment.forEach(eq => {
            if (eq.indexOf('|') > -1) {
                const e = eq.split('|');
                this._selectedEquipment = e[0];
            }
        });

        this._showEquipment = true;
        this._showKiSchools = character.canLearnKi();
    }

    render() {
        var currentCareer = character.careers[character.careers.length - 1];
        var career = PrimaryCareersHelper.getCareer(currentCareer.career);

        const attributes = character.careers.length === 1
            ? career.attributes.map((attr, i) => {
                return <AttributeView key={i} name={AttributesHelper.getAttributeName(i) } points={attr} value={character.attributes[i].value}/>
            })
            : undefined;

        const attributesContainer = character.careers.length === 1
            ? (
                <div className="panel">
                    <div className="header-small">ATTRIBUTES</div>
                    {attributes}
                </div>
              )
            : undefined;

        const mandatory = career.mandatory.map((m, i) => {
            return (
                <SkillImprovement key={i} skill={m} onUpdated={() => this.onUpdate() } />
            )
        });

        const unemployedExtraMandatory =
            (career.id === PrimaryCareer.Unemployed || career.id === PrimaryCareer.Disciple)
            ? (
                <ElectiveSkillImprovement skills={SkillsHelper.getSkills().filter(s => s !== Skill.Survival) } points={1} onUpdated={() => this.onUpdate() }/>
              )
            : undefined;

        const equipment = this._showEquipment
            ? (
                <div className="panel">
                    <div className="header-small">EQUIPMENT</div>
                    <EquipmentList equipment={career.equipment} onSelected={eq => this.onEquipmentSelected(eq) } />
                </div>
              )
            : undefined;

        const signature = character.careers.length < 3
            ? (
                <div className="panel">
                    <div className="header-small">SIGNATURE SKILL</div>
                    <SignatureSkillSelection skills={career.signature} onSelection={(skill) => { } } />
                </div>
            )
            : character.superPoints >= 2
                ? (
                    <SignatureSkillSwap
                        current={character.skills.filter(s => s.isSignature && s.expertise < 4).map(s => { return s.skill })}
                        candidates={career.signature}
                        ref={(c) => this._swap = c } />
                  )
                : undefined;

        const electivePoints = (career.id === PrimaryCareer.Unemployed || career.id === PrimaryCareer.Disciple) ? 1 : 2;
        var elective = career.elective;

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

        var talents = career.talents;
        var talentsDescription = undefined;
        if (character.canLearnArt() && talents.indexOf(Skill.Mysticism) === -1) {
            talents.push(Skill.Mysticism);
            talentsDescription = `You may select talents related to the Art, but they will cost 1 Promotion Point (current: ${character.superPoints}) to acquire. Your age will increase by 2 in this case.`;
        }

        const kiSchools = this._showKiSchools
            ? <KiSchoolSelection onSuccess={() => { this.forceUpdate(); } }/>
            : undefined;

        return (
            <div className="page">
                <PageHeader text="CAREER" />
                <div className="header-text">{career.name}</div>
                {attributesContainer}
                <div className="panel">
                    <div className="header-small">MANDATORY SKILLS</div>
                    {mandatory}
                    {unemployedExtraMandatory}
                </div>
                <div className="panel">
                    <div className="header-small">ELECTIVE SKILLS</div>
                    <ElectiveSkillImprovement skills={elective} points={electivePoints} onUpdated={() => this.onUpdate() } />
                </div>
                {signature}
                {kiSchools}
                <div className="panel">
                    <div className="header-small">TALENT</div>
                    <div>{talentsDescription}</div>
                    <TalentList skills={talents} onSelection={talent => this.onTalentSelected(talent) }/>
                </div>
                {equipment}
                <Button text="CAREER EVENT" className="button-next" onClick={() => this.onNext() }/>
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
        character.addTalent(this._selectedTalent);

        if (this._selectedTalent.indexOf("Mystic") > -1 ||
            this._selectedTalent.indexOf("Minoris") > -1 ||
            this._selectedTalent.indexOf("Mediatoris") > -1 ||
            this._selectedTalent.indexOf("Majoris") > -1 ||
            this._selectedTalent.indexOf("Dominus") > -1) {
            character.age += 2;
            character.superPoints--;
        }

        if (this._swap) {
            character.skills[this._swap.current].isSignature = false;
            character.skills[this._swap.new].isSignature = true;
            character.superPoints -= 2;
        }

        if (this._showEquipment) {
            // Regular equipment is added in applyCareer.
            character.addEquipment(this._selectedEquipment);
        }

        Navigation.navigateToPage(character.getCareerPage(PageIdentity.CareerEvent1));
    }
}