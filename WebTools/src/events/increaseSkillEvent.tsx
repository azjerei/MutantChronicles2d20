import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {ElectiveSkillImprovement} from '../components/electiveSkillImprovement';
import {Button} from '../components/button';
import {Skill} from '../helpers/skills';
import {PageIdentity} from '../pages/pageFactory';

interface IIncreaseSkillEventProperties {
    points: number;
    skills: Skill[];
}

export class IncreaseSkillEvent extends React.Component<IIncreaseSkillEventProperties, {}> {
    constructor(props: IIncreaseSkillEventProperties) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="panel">
                    <ElectiveSkillImprovement skills={this.props.skills} points={this.props.points}/>
                </div>
                <Button text="DONE" className="button-next" onClick={() => Navigation.navigateToPage(PageIdentity.AfterEvent) }/>
            </div>
        );
    }
}