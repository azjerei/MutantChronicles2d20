import * as React from 'react';
import {Skill, SkillsHelper} from '../helpers/skills';
import {Attribute} from '../helpers/attributes';
import {character} from '../common/character';

interface IIncreaseAssetsProperties {
    onUpdated?: () => void;
}

export class IncreaseAssets extends React.Component<IIncreaseAssetsProperties, {}> {
    private _originalAssets: number;

    constructor(props: IIncreaseAssetsProperties) {
        super(props);
        this._originalAssets = character.assets;
    }

    render() {
        const assets = character.assets;
        const showDecreaseExpertise = assets > this._originalAssets;
        const showIncreaseExpertise = character.lifePoints > 0;

        const decExp = showDecreaseExpertise
            ? (<img style={{ float: "right", marginRight: "20px" }} height="20" src="res/img/dec.png" onClick={ () => { this.onDecreaseAssets() } }/>)
            : undefined;

        const incExp = showIncreaseExpertise
            ? (<img style={{ float: "right" }} height="20" src="res/img/inc.png" onClick={ () => { this.onIncreaseAssets() } }/>)
            : undefined;

        return (
            <div className="skill-container">
                <div className="skill-expertise">
                    Assets: {character.attributes[Attribute.Personality].value + character.assets} {incExp} {decExp}
                </div>
            </div>
        );
    }

    private onDecreaseAssets() {
        character.assets--;
        character.lifePoints++;

        if (this.props.onUpdated) {
            this.props.onUpdated();
        }
        else {
            this.forceUpdate();
        }
    }

    private onIncreaseAssets() {
        character.assets++;
        character.lifePoints--;

        if (this.props.onUpdated) {
            this.props.onUpdated();
        }
        else {
            this.forceUpdate();
        }
    }
}