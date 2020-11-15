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
import {IncreaseInfinityPoints} from '../components/increaseInfinityPoints';
import {IncreaseAssets} from '../components/increaseAssets';
import {IncreaseSkills} from '../components/increaseSkills';
import {IncreaseEarnings} from '../components/increaseEarnings';

export class FinalTweaks_LifePoints extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);

        if (character.startingAssetsAttribute !== Attribute.Personality) {
            if (Math.max(
                character.attributes[Attribute.Personality].value,
                character.attributes[character.startingAssetsAttribute].value) === character.attributes[Attribute.Personality].value) {
                character.assets += character.attributes[Attribute.Personality].value;
            }
            else {
                character.assets += character.attributes[character.startingAssetsAttribute].value;
            }
        }
        else {
            character.assets += character.attributes[Attribute.Personality].value;
        }
    }

    render() {
        let skills: Skill[] = [];
        character.skills.forEach(skill => {
            skills.push(skill.skill);
        });

        const earnings = character.hasSuperPoints()
            ? <IncreaseEarnings onUpdated={() => this.forceUpdate() }/>
            : undefined;

        return (
            <div className="page">
                <PageHeader text="FINAL TWEAKS"/>
                <div className="page-text">
                    You can now use any remaining Life Points to either increase your Chronicle Points, or increase
                    your skills or assets.
                </div>
                <div className="panel">
                    <IncreaseInfinityPoints onUpdated={() => this.forceUpdate() } />
                    <br/>
                    <IncreaseAssets onUpdated={() => this.forceUpdate() } />
                    {earnings}
                </div>
                <br/>
                <div className="header-text">SKILLS</div>
                <div className="panel">
                    <IncreaseSkills skills={skills} onUpdated={() => this.forceUpdate() } />
                </div>
                <Button text="FINISH" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onNext() {
        Navigation.navigateToPage(PageIdentity.FinalTweaks);
    }
}