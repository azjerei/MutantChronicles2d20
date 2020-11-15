import * as React from 'react';
import {Attribute, AttributesHelper} from '../helpers/attributes';
import {character} from '../common/character';

interface IAttributeImprovementProperties {
    controller: AttributeImprovementCollection;
    attribute: Attribute;
    value: number;
    showIncrease: boolean;
    showDecrease: boolean;
}

export class AttributeImprovement extends React.Component<IAttributeImprovementProperties, {}> {
    constructor(props: IAttributeImprovementProperties) {
        super(props);
    }

    render() {
        const {attribute, value, showDecrease, showIncrease} = this.props;

        const dec = showDecrease
            ? (<img style={{ float: "left" }} height="20" src="res/img/dec.png" onClick={ () => { this.onDecrease() } }/>)
            : undefined;

        const inc = showIncrease
            ? (<img style={{ float: "right" }} height="20" src="res/img/inc.png" onClick={ () => { this.onIncrease() } }/>)
            : undefined;

        return (
            <div>
                <div className="attribute-container">
                    {AttributesHelper.getAttributeName(attribute) }
                </div>
                <div className="attribute-value">
                    {dec}
                    {value}
                    {inc}
                </div>
            </div>
        );
    }

    private onDecrease() {
        this.props.controller.onDecrease(this.props.attribute);
    }

    private onIncrease() {
        this.props.controller.onIncrease(this.props.attribute);
    }
}

export enum AttributeImprovementCollectionMode {
    Normal,
    Increase,
    Decrease,
    LifePoints,
    Conan,
}

interface AttributeImprovementCollectionProperties {
    attributes?: Attribute[];
    points: number;
    mode: AttributeImprovementCollectionMode;
    onDone?: (done: boolean) => void;
}

class AttributeContainer {
    attribute: Attribute;
    value: number;
    minValue: number;
    maxValue: number;
    showDecrease: boolean;
    showIncrease: boolean;

    constructor(attribute: Attribute, value: number, minValue: number, maxValue: number, showDecrease: boolean, showIncrease: boolean) {
        this.attribute = attribute;
        this.value = value;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.showDecrease = showDecrease;
        this.showIncrease = showIncrease;
    }
}

export class AttributeImprovementCollection extends React.Component<AttributeImprovementCollectionProperties, {}> {
    private _absoluteMax: number = 10;

    private _points: number;
    private _attributes: AttributeContainer[];

    constructor(props: AttributeImprovementCollectionProperties) {
        super(props);

        this._points = props.points;
        this._attributes = [];

        switch (props.mode) {
            case AttributeImprovementCollectionMode.Normal:
                for (var i = 0; i < character.attributes.length; i++) {
                    this._attributes.push(new AttributeContainer(character.attributes[i].attribute, character.attributes[i].value, 4, 6, true, false));
                }
                break;
            case AttributeImprovementCollectionMode.Increase:
                if (this.props.attributes) {
                    for (var i = 0; i < this.props.attributes.length; i++) {
                        var attr = this.props.attributes[i];
                        this._attributes.push(new AttributeContainer(attr, character.attributes[attr].value, character.attributes[attr].value, this._absoluteMax, false, true));
                    }
                }
                else {
                    for (var i = 0; i < character.attributes.length; i++) {
                        this._attributes.push(new AttributeContainer(character.attributes[i].attribute, character.attributes[i].value, character.attributes[i].value, this._absoluteMax, false, true));
                    }
                }
                break;
            case AttributeImprovementCollectionMode.Decrease:
                for (var i = 0; i < character.attributes.length; i++) {
                    this._attributes.push(new AttributeContainer(character.attributes[i].attribute, character.attributes[i].value, 1, character.attributes[i].value, true, false));
                }
                break;
            case AttributeImprovementCollectionMode.LifePoints:
                for (var i = 0; i < character.attributes.length; i++) {
                    this._attributes.push(new AttributeContainer(character.attributes[i].attribute, character.attributes[i].value, character.attributes[i].value, 6, false, character.attributes[i].value < 6));
                }
                break;
            case AttributeImprovementCollectionMode.Conan:
                for (var i = 0; i < character.attributes.length; i++) {
                    this._attributes.push(new AttributeContainer(character.attributes[i].attribute, character.attributes[i].value, 6, 8, true, false));
                }
                break;
        }
    }

    render() {
        const attributes = this._attributes.map((a, i) => {
            return <AttributeImprovement
                key={i}
                controller={this}
                attribute={a.attribute}
                value={a.value}
                showIncrease={a.showIncrease}
                showDecrease={a.showDecrease} />
        });

        return (
            <div>
                {attributes}
            </div>
        );
    }

    onDecrease(attr: Attribute) {
        for (var i = 0; i < this._attributes.length; i++) {
            var a = this._attributes[i];
            if (a.attribute === attr) {
                a.value--;
                character.attributes[a.attribute].value = a.value;
                break;
            }
        }

        switch (this.props.mode) {
            case AttributeImprovementCollectionMode.Normal:
                this._points++;

                for (var i = 0; i < this._attributes.length; i++) {
                    var a = this._attributes[i];
                    a.showDecrease = a.value > a.minValue;
                    a.showIncrease = a.value < a.maxValue;
                }
                break;
            case AttributeImprovementCollectionMode.Increase:
                this._points++;

                for (var i = 0; i < this._attributes.length; i++) {
                    var a = this._attributes[i];
                    a.showDecrease = a.value > a.minValue;
                    a.showIncrease = a.value < a.maxValue;
                }
                break;
            case AttributeImprovementCollectionMode.Decrease:
                this._points--;

                for (var i = 0; i < this._attributes.length; i++) {
                    var a = this._attributes[i];
                    a.showDecrease = a.value > a.minValue && this._points > 0;
                    a.showIncrease = a.value < a.maxValue;
                }
                break;
            case AttributeImprovementCollectionMode.LifePoints:
                character.lifePoints++;

                for (var i = 0; i < this._attributes.length; i++) {
                    var a = this._attributes[i];
                    a.showDecrease = a.value > a.minValue;
                    a.showIncrease = a.value < a.maxValue;
                }
                break;
            case AttributeImprovementCollectionMode.Conan:
                this._points++;
                var numDec = 0;

                for (var i = 0; i < this._attributes.length; i++) {
                    var a = this._attributes[i];
                    if (a.value === a.minValue) {
                        numDec++;
                    }
                }

                for (var i = 0; i < this._attributes.length; i++) {
                    var a = this._attributes[i];
                    a.showDecrease = a.value > a.minValue && numDec < 2;
                    a.showIncrease = a.value < a.maxValue;
                }

                break;
        }

        if (this.props.onDone) {
            this.props.onDone(this._points === 0);
        }

        this.forceUpdate();
    }

    onIncrease(attr: Attribute) {
        for (var i = 0; i < this._attributes.length; i++) {
            var a = this._attributes[i];
            if (a.attribute === attr) {
                a.value++;
                character.attributes[a.attribute].value = a.value;
                break;
            }
        }

        switch (this.props.mode) {
            case AttributeImprovementCollectionMode.Normal:
                this._points--;

                for (var i = 0; i < this._attributes.length; i++) {
                    var a = this._attributes[i];
                    a.showDecrease = a.value > a.minValue;
                    a.showIncrease = a.value < a.maxValue && this._points > 0;
                }
                break;
            case AttributeImprovementCollectionMode.Increase:
                this._points--;

                for (var i = 0; i < this._attributes.length; i++) {
                    var a = this._attributes[i];
                    a.showDecrease = a.value > a.minValue;
                    a.showIncrease = a.value < a.maxValue && this._points > 0;
                }
                break;
            case AttributeImprovementCollectionMode.Decrease:
                this._points++;

                for (var i = 0; i < this._attributes.length; i++) {
                    var a = this._attributes[i];
                    a.showDecrease = a.value > a.minValue;
                    a.showIncrease = a.value < a.maxValue;
                }
                break;
            case AttributeImprovementCollectionMode.LifePoints:
                character.lifePoints--;

                for (var i = 0; i < this._attributes.length; i++) {
                    var a = this._attributes[i];
                    a.showDecrease = a.value > a.minValue;
                    a.showIncrease = a.value < a.maxValue && character.lifePoints > 0;
                }
                break;
            case AttributeImprovementCollectionMode.Conan:
                this._points--;
                var numDec = 0;

                for (var i = 0; i < this._attributes.length; i++) {
                    var a = this._attributes[i];
                    if (a.value === a.minValue) {
                        numDec++;
                    }
                }

                for (var i = 0; i < this._attributes.length; i++) {
                    var a = this._attributes[i];
                    a.showDecrease = (a.value > a.minValue && numDec < 2) || a.value === a.maxValue;
                    a.showIncrease = this._points > 0;
                }

                break;
        }

        if (this.props.onDone) {
            this.props.onDone(this._points === 0);
        }

        this.forceUpdate();
    }
}