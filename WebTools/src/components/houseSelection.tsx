import * as React from 'react';
import {character} from '../common/character';
import {House, HousesHelper} from '../helpers/houses';
import {SkillsHelper} from '../helpers/skills';
import {AttributesHelper} from '../helpers/attributes';
import {Button} from './button';

interface IHouseSelectionProperties {
    onSelection: (house: House) => void;
}

export class HouseSelection extends React.Component<IHouseSelectionProperties, {}> {
    constructor(props: IHouseSelectionProperties) {
        super(props);
    }

    render() {
        var houses = HousesHelper.getHouses().map((h, i) => {
            const house = HousesHelper.getHouse(h);

            const attributes = house.attributes.map((a, i) => {
                return (
                    <div key={i}>
                        +{a} {AttributesHelper.getAttributeName(character.attributes[i].attribute).substr(0, 3) }
                    </div>
                );
            });

            const skills = house.skills.map((m, i) => {
                return (
                    <div key={i}>
                        {SkillsHelper.getSkillName(m) }
                    </div>
                )
            });

            return (
                <tr key={i}>
                    <td>{house.name}</td>
                    <td>{attributes}</td>
                    <td>{skills}</td>
                    <td><Button className="button-small" text="Select" onClick={() => { this.props.onSelection(h) } } /></td>
                </tr>
            )
        });

        return (
            <div>
                <div className="header-text">SELECT NOBLE HOUSE</div>
                <br/>
                <table className="selection-list">
                    <thead>
                        <tr>
                            <td></td>
                            <td><h3>Attributes</h3></td>
                            <td><h3>Skills</h3></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {houses}
                    </tbody>
                </table>
            </div>
        );
    }
}