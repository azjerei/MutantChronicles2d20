import * as React from 'react';
import {character, CharacterCareer} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {IconicCareer, IconicCareersHelper} from '../helpers/iconicCareers';
import {Skill, SkillsHelper} from '../helpers/skills';
import {AttributesHelper} from '../helpers/attributes';
import {TalentsHelper} from '../helpers/talents';
import {Faction} from '../helpers/factions';
import {Status} from '../helpers/status';
import {ApostleHelper} from '../helpers/apostles';
import {PageHeader} from '../components/pageHeader';
import {AttributeView} from '../components/attribute';
import {IconicSkillImprovement} from '../components/skillImprovement';
import {Button} from '../components/button';
import {IconicElectiveSkillImprovement} from '../components/iconicElectiveSkillImprovement';
import {IconicSignatureSkillSelection} from '../components/iconicSignatureSkillSelection';
import {SignatureSkillSwap} from '../components/signatureSkillSwap';
import {IconicTalentList} from '../components/iconicTalentList';
import {EquipmentList} from '../components/equipmentList';
import {KiSchoolSelection} from '../components/kiSchoolSelection';

export class IconicCareerDetailsPage extends React.Component<IPageProperties, {}> {
    private _firstSelectedTalent: string;
    private _secondSelectedTalent: string;
    private _thirdSelectedTalent: string;
    private _selectedEquipment: string;
    private _showFirstTalent: boolean;
    private _enableFirstTalent: boolean;
    private _showSecondTalent: boolean;
    private _enableSecondTalent: boolean;
    private _showThirdTalent: boolean;
    private _enableThirdTalent: boolean;
    private _showEquipment: boolean;
    private _showKiSchools: boolean;
    private _swap: SignatureSkillSwap;

    constructor(props: IPageProperties) {
        super(props);

        const currentCareer = character.careers[character.careers.length - 1];
        const career = IconicCareersHelper.getCareer(currentCareer.career);

        career.equipment.forEach(eq => {
            if (eq.indexOf('|') > -1) {
                const e = eq.split('|');
                this._selectedEquipment = e[0];
            }
        });

        this._showFirstTalent = true;
        this._enableFirstTalent = true;
        this._showSecondTalent = false;
        this._enableSecondTalent = false;
        this._showThirdTalent = false;
        this._enableThirdTalent = false;
        this._showEquipment = true;
        this._showKiSchools = character.canLearnKi();
    }

    render() {
        var currentCareer = character.careers[character.careers.length - 1];
        var career = IconicCareersHelper.getCareer(currentCareer.career);

        const mandatory = career.mandatory.map((m, i) => {
            return (
                <IconicSkillImprovement key={i} skill={m} onUpdated={() => this.onUpdate() } />
            )
        });

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
                    <IconicSignatureSkillSelection skills={career.signature} onSelection={(skill) => { this.forceUpdate(); } } />
                </div>
            )
            : character.superPoints >= 2
                ? (
                    <SignatureSkillSwap
                        current={character.skills.filter(s => s.isSignature && s.expertise < 4).map(s => { return s.skill }) }
                        candidates={career.signature}
                        ref={(c) => this._swap = c } />
                )
                : undefined;

        const firstTalentHeader = career.talentsTier2.length > 0
            ? "FIRST TALENT"
            : "TALENT";

        const firstTalent = career.talentsTier1.length > 0
            ? (
                <div className="panel">
                    <div className="header-small">{firstTalentHeader}</div>
                    <IconicTalentList skills={career.talentsTier1.filter(s => s !== Skill.None) }
                        key={"talent1"}
                        enabled={this._enableFirstTalent}
                        visible={true}
                        talent={this._firstSelectedTalent}
                        onSelection={talent => this.onFirstTalentSelected(talent) }
                        onCommit={() => this.onFirstTalentCommitted() }
                        onCancel={() => this.onFirstTalentCanceled() }/>
                </div>
              )
            : undefined;

        const secondTalent = career.talentsTier2.length > 0
            ? (
                <div className="panel">
                    <div className="header-small">SECOND TALENT</div>
                    <IconicTalentList skills={career.talentsTier2.filter(s => s !== Skill.None) }
                        key={"talent2"}
                        enabled={this._enableSecondTalent}
                        visible={this._showSecondTalent}
                        talent={this._secondSelectedTalent}
                        onSelection={talent => this.onSecondTalentSelected(talent) }
                        onCommit={() => this.onSecondTalentCommitted() }
                        onCancel={() => this.onSecondTalentCanceled() }/>
                </div>
              )
            : undefined;

        const thirdTalent = career.talentsTier3.length > 0
            ? (
                <div className="panel">
                    <div className="header-small">THIRD TALENT</div>
                    <IconicTalentList skills={career.talentsTier3.filter(s => s !== Skill.None) }
                        key={"talent3"}
                        enabled={this._enableThirdTalent}
                        visible={this._showThirdTalent}
                        talent={this._thirdSelectedTalent}
                        onSelection={talent => this.onThirdTalentSelected(talent) }
                        onCommit={() => this.onThirdTalentCommitted() }
                        onCancel={() => this.onThirdTalentCanceled() }/>
                </div>
            )
            : undefined;

        const kiSchools = this._showKiSchools
            ? <KiSchoolSelection onSuccess={() => { this.forceUpdate(); } }/>
            : undefined;

        return (
            <div className="page">
                <PageHeader text="CAREER" />
                <div className="header-text">{career.name}</div>
                <div className="panel">
                    <div className="header-small">MANDATORY SKILLS</div>
                    {mandatory}
                </div>
                <div className="panel">
                    <div className="header-small">ELECTIVE SKILLS</div>
                    <IconicElectiveSkillImprovement skills={elective} points={4} onUpdated={() => this.onUpdate() } />
                </div>
                {signature}
                {kiSchools}
                {firstTalent}
                {secondTalent}
                {thirdTalent}
                {equipment}
                <Button text="CAREER EVENT" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onUpdate() {
        this.forceUpdate();
    }

    private onFirstTalentSelected(talent: string) {
        if (this._enableFirstTalent) {
            this._firstSelectedTalent = talent;
        }
    }

    private onFirstTalentCommitted() {
        character.addTalent(this._firstSelectedTalent);

        this._enableFirstTalent = false;
        this._showSecondTalent = true;
        this._enableSecondTalent = true;
        this.forceUpdate();
    }

    private onFirstTalentCanceled() {
        character.removeTalent(this._firstSelectedTalent);
        character.removeTalent(this._secondSelectedTalent);
        character.removeTalent(this._thirdSelectedTalent);

        this._enableFirstTalent = true;
        this._showSecondTalent = false;
        this._enableSecondTalent = false;
        this._showThirdTalent = false;
        this._enableThirdTalent = false;
        this.forceUpdate();
    }

    private onSecondTalentSelected(talent: string) {
        if (this._enableSecondTalent) {
            this._secondSelectedTalent = talent;
        }
    }

    private onSecondTalentCommitted() {
        character.addTalent(this._secondSelectedTalent);

        this._enableSecondTalent = false;
        this._showThirdTalent = true;
        this._enableThirdTalent = true;
        this.forceUpdate();
    }

    private onSecondTalentCanceled() {
        character.removeTalent(this._secondSelectedTalent);
        character.removeTalent(this._thirdSelectedTalent);

        this._enableSecondTalent = true;
        this._showThirdTalent = false;
        this._enableThirdTalent = false;
        this.forceUpdate();
    }

    private onThirdTalentSelected(talent: string) {
        if (this._enableThirdTalent) {
            this._thirdSelectedTalent = talent;
        }
    }

    private onThirdTalentCommitted() {
        character.addTalent(this._thirdSelectedTalent);

        this._enableThirdTalent = false;
        this.forceUpdate();
    }

    private onThirdTalentCanceled() {
        character.removeTalent(this._thirdSelectedTalent);

        this._enableThirdTalent = true;
        this.forceUpdate();
    }

    private onEquipmentSelected(eq: string) {
        this._selectedEquipment = eq;
    }

    private onNext() {
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