import * as React from 'react';
import {Skill, SkillsHelper} from '../helpers/skills';
import {character} from '../common/character';

interface IIncreaseInfinityPointsProperties {
    onUpdated?: () => void;
}

export class IncreaseInfinityPoints extends React.Component<IIncreaseInfinityPointsProperties, {}> {
    constructor(props: IIncreaseInfinityPointsProperties) {
        super(props);
    }

    render() {
        const infinityPoints = character.chroniclePoints;
        const showDecreaseExpertise = infinityPoints > 2;
        const showIncreaseExpertise = infinityPoints < 4 && character.lifePoints > 0;

        const decExp = showDecreaseExpertise
            ? (<img style={{ float: "right", marginRight: "20px" }} height="20" src="res/img/dec.png" onClick={ () => { this.onDecreaseInfinityPoints() } }/>)
            : undefined;

        const incExp = showIncreaseExpertise
            ? (<img style={{ float: "right" }} height="20" src="res/img/inc.png" onClick={ () => { this.onIncreaseInfinityPoints() } }/>)
            : undefined;

        return (
            <div className="skill-container">
                <div className="skill-expertise">
                    Chronicle Points: {character.chroniclePoints} {incExp} {decExp} 
                </div>
            </div>
        );
    }

    private onDecreaseInfinityPoints() {
        character.chroniclePoints--;
        character.lifePoints++;

        if (this.props.onUpdated) {
            this.props.onUpdated();
        }
        else {
            this.forceUpdate();
        }
    }

    private onIncreaseInfinityPoints() {
        character.chroniclePoints++;
        character.lifePoints--;

        if (this.props.onUpdated) {
            this.props.onUpdated();
        }
        else {
            this.forceUpdate();
        }
    }
}