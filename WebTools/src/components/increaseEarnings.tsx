import * as React from 'react';
import {Skill, SkillsHelper} from '../helpers/skills';
import {Attribute} from '../helpers/attributes';
import {character} from '../common/character';

interface IIncreaseEarningsProperties {
    onUpdated?: () => void;
}

export class IncreaseEarnings extends React.Component<IIncreaseEarningsProperties, {}> {
    private _originalEarnings: number;

    constructor(props: IIncreaseEarningsProperties) {
        super(props);
        this._originalEarnings = character.earnings;
    }

    render() {
        const earnings = character.earnings;
        const showDec = earnings > this._originalEarnings;
        const showInc = character.superPoints >= earnings;

        const dec = showDec
            ? (<img style={{ float: "left", marginRight: "20px" }} height="20" src="res/img/dec.png" onClick={ () => { this.onDecreaseEarnings() } }/>)
            : undefined;

        const inc = showInc
            ? (<img style={{ float: "right" }} height="20" src="res/img/inc.png" onClick={ () => { this.onIncreaseEarnings() } }/>)
            : undefined;

        return (
            <div className="panel superpoints-panel">
                <div className="superpoints-container">
                    Increase Earnings by spending Promotion Points/Federation Commendations equal to your current Earnings value.
                </div>
                <div className="superpoints-value">
                    {dec}
                    {earnings}
                    {inc}
                    <br/>
                    <br/>
                    {`Remaining: ${character.superPoints}`}
                </div>
            </div>
        );
    }

    private onDecreaseEarnings() {
        character.earnings--;
        character.superPoints += character.earnings;

        if (this.props.onUpdated) {
            this.props.onUpdated();
        }

        this.forceUpdate();
    }

    private onIncreaseEarnings() {
        character.earnings++;
        character.superPoints -= character.earnings-1;

        if (this.props.onUpdated) {
            this.props.onUpdated();
        }

        this.forceUpdate();
    }
}