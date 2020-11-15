import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {Attribute, AttributesHelper} from '../helpers/attributes';
import {Skill, SkillsHelper} from '../helpers/skills';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {AttributeImprovementCollection, AttributeImprovementCollectionMode} from '../components/attributeImprovement';
import {UntrainedSkillImprovement} from '../components/untrainedSkillImprovement';
import {TalentList} from '../components/talentList';

export class FinalTweaksPage extends React.Component<IPageProperties, {}> {
    private _talent: string;
    private _superImprovement: UntrainedSkillImprovement;

    constructor(props: IPageProperties) {
        super(props);
    }

    render() {
        let skills: Skill[] = [];
        character.skills.forEach(skill => {
            skills.push(skill.skill);
        });

        const superPoints = character.hasSuperPoints()
            ? (
                <div className="panel">
                    <div>
                        You can spend Promotion Points/Federation Commendations to improve untrained skills.
                    </div>
                    <UntrainedSkillImprovement
                        points={character.superPoints}
                        skills={skills}
                        onUpdated={() => { this.forceUpdate() } }
                        ref={(imp) => this._superImprovement = imp }/>
                </div>
              )
            : undefined;

        return (
            <div className="page">
                <PageHeader text="FINAL TWEAKS"/>
                <div className="page-text">
                    Improve up to 2 attributes and up to 2 untrained skills.
                    <br/>
                    Then select a talent for any of your skills.
                </div>
                <div className="header-text">ATTRIBUTES</div>
                <div className="panel">
                    <AttributeImprovementCollection mode={AttributeImprovementCollectionMode.Increase} points={2} />
                </div>
                <br/>
                <div className="header-text">SKILLS</div>
                <div className="panel">
                    <UntrainedSkillImprovement points={2} skills={skills} onUpdated={() => { this.forceUpdate() } }/>
                </div>
                <br/>
                {superPoints}
                <br/>
                <div className="header-text">TALENT</div>
                <div className="panel">
                    <TalentList skills={SkillsHelper.getSkills()} onSelection={(talent) => { this._talent = talent } } />
                </div>
                <Button text="NEXT" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onNext() {
        character.addTalent(this._talent);

        if (character.hasSuperPoints()) {
            character.superPoints = this._superImprovement.points;
        }

        Navigation.navigateToPage(PageIdentity.Finish);
    }
}