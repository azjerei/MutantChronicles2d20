import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {Faction, FactionsHelper} from '../helpers/factions';
import {Skill, SkillsHelper} from '../helpers/skills';
import {TalentsHelper} from '../helpers/talents';
import {PageHeader} from '../components/pageHeader';
import {SkillView} from '../components/skill';
import {ElectiveSkillImprovement} from '../components/electiveSkillImprovement';
import {Button} from '../components/button';
import {SignatureSkillSelection} from '../components/signatureSkillSelection';
import {TalentDescription} from '../components/talentDescription';

export class FactionDetailsPage extends React.Component<IPageProperties, {}> {
    private _signatureSkill: Skill;
    private _talentName: string;
    private _talentDesc: string;

    constructor(props: IPageProperties) {
        super(props);
    }

    render() {
        var faction = FactionsHelper.getFaction(character.faction);
        var heritage = FactionsHelper.getFaction(character.heritage);

        const name = faction.name === heritage.name
                ? (<span>{faction.name}</span>)
                : (<span>{faction.name} (BORN IN {heritage.name}) </span>);

        const skills = faction.name === heritage.name
            ? faction.skills.map((s, i) => {
                return (<SkillView key={i} skill={s} points={1} />);
              })
            : (
                <div>
                    <ElectiveSkillImprovement skills={faction.skills.filter(s => s !== Skill.Heritage) } points={1} onUpdated={() => this.forceUpdate() } />
                    <hr style={{ border: "1px solid rgba(128, 128, 128, .3)" }}/>
                    <ElectiveSkillImprovement skills={heritage.skills} points={1} onUpdated={() => this.forceUpdate() } />
                </div>
              );

        var signatureSkills = [];

        if (faction.name === heritage.name) {
            faction.skills.forEach(s => {
                signatureSkills.push(s);
            });
        }
        else {
            signatureSkills.push(...faction.skills.filter(s => s !== Skill.Heritage));
            signatureSkills.push(...heritage.skills);
        }

        return (
            <div className="page">
                <PageHeader text="FACTION" />
                <div className="header-text">{name}</div>
                <div className="panel">
                    <div className="header-small">SKILLS</div>
                    {skills}
                </div>
                <div className="panel">
                    <div className="header-small">SIGNATURE SKILL</div>
                    <div className="desc-text">
                        Select your first <b>signature skill</b>.
                    </div>
                    <SignatureSkillSelection skills={signatureSkills} onSelection={(skill) => { this.onSignatureSkillSelected(skill); }} />
                </div>
                <div className="panel">
                    <div className="header-small">TALENT</div>
                    <TalentDescription name={faction.talent.name} description={faction.talent.description} />
                </div>
                <Button text="FACTION EVENT" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onSignatureSkillSelected(skill: Skill) {
        this._signatureSkill = skill;
        this.forceUpdate();
    }

    private onNext() {
        character.skills[this._signatureSkill].isSignature = true;

        Navigation.navigateToPage(PageIdentity.FactionEvent);
    }
}