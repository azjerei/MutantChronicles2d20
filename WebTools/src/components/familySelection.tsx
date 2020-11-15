import * as React from 'react';
import {character} from '../common/character';
import {Clan, ClansHelper} from '../helpers/clans';
import {AttributesHelper} from '../helpers/attributes';
import {SkillsHelper} from '../helpers/skills';
import {Button} from './button';

interface IFamilySelectionProperties {
    onSelection: (family: number) => void;
    onCancel: () => void;
    showCancel?: boolean;
}

export class FamilySelection extends React.Component<IFamilySelectionProperties, {}> {
    constructor(props: IFamilySelectionProperties) {
        super(props);
    }

    render() {
        const clan = ClansHelper.getClan(character.clan);

        var families = clan.families.map((f, i) => {
            return (
                <tr key={i}>
                    <td className="selection-header">{f.name}</td>
                    <td>{f.socialStanding}</td>
                    <td>{f.earnings}</td>
                    <td><Button className="button-small" text="Select" onClick={() => { this.props.onSelection(i) } } /></td>
                </tr>
            )
        });

        const cancel = this.props.showCancel
            ? (<Button text="Cancel" className="button" onClick={() => this.props.onCancel() }/>)
            : undefined;

        return (
            <div>
                <div className="header-text">SELECT FAMILY</div>
                <br/>
                <table className="selection-list">
                    <thead>
                        <tr>
                            <td></td>
                            <td>Social Standing</td>
                            <td>Earnings</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {families}
                    </tbody>
                </table>
                {cancel}
            </div>
        );
    }
}