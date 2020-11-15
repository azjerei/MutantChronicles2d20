import * as React from 'react';
import {character} from '../common/character';

interface ISuperPointSpendProperties {
    text: string;
    onChange: (val: number) => void;
}

export class SuperPointSpend extends React.Component<ISuperPointSpendProperties, {}> {
    private _initialPoints: number;
    private _value: number;

    constructor(props: ISuperPointSpendProperties) {
        super(props);

        this._initialPoints = character.superPoints;
        this._value = 0;
    }

    render() {
        const dec = character.superPoints < this._initialPoints
            ? (<img style={{ float: "left" }} height="20" src="res/img/dec.png" onClick={ () => { this.onDecrease() } }/>)
            : undefined;

        const inc = character.superPoints > 0
            ? (<img style={{ float: "right" }} height="20" src="res/img/inc.png" onClick={ () => { this.onIncrease() } }/>)
            : undefined;

        return this._initialPoints > 0
            ? (
                <div className="panel superpoints-panel">
                    <div className="superpoints-container">
                        {this.props.text}
                    </div>
                    <div className="superpoints-value">
                        {dec}
                        {this._value}
                        {inc}
                        <br/>
                        <br/>
                        {`Remaining: ${character.superPoints}`}
                    </div>
                </div>
              )
            : (
                <div></div>
              );
    }

    private onDecrease() {
        this._value--;
        character.superPoints++;

        this.props.onChange(this._value);

        this.forceUpdate();
    }

    private onIncrease() {
        this._value++;
        character.superPoints--;

        this.props.onChange(this._value);

        this.forceUpdate();
    }
}