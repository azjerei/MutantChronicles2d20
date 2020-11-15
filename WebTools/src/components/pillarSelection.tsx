import * as React from 'react';
import {Pillar, PillarsHelper} from '../helpers/pillars';
import {AttributesHelper} from '../helpers/attributes';
import {SkillsHelper} from '../helpers/skills';
import {Button} from './button';

interface IPillarSelectionProperties {
    candidates: Pillar[];
    onSelection: (pillar: Pillar) => void;
    onCancel: () => void;
}

export class PillarSelection extends React.Component<IPillarSelectionProperties, {}> {
    constructor(props: IPillarSelectionProperties) {
        super(props);
    }

    render() {
        var pillars = this.props.candidates.map((p, i) => {
            const pillar = PillarsHelper.getPillar(p);

            return (
                <tr key={i}>
                    <td className="selection-header">{pillar.name}</td>
                    <td>
                        {AttributesHelper.getAttributeName(pillar.attributes[0]) }
                        <br/>
                        {AttributesHelper.getAttributeName(pillar.attributes[1]) }
                    </td>
                    <td>
                        {SkillsHelper.getSkillName(pillar.skills[0]) }
                        <br/>
                        {SkillsHelper.getSkillName(pillar.skills[1]) }
                    </td>
                    <td><Button className="button-small" text="Select" onClick={() => { this.props.onSelection(pillar.id) } } /></td>
                </tr>
            )
        });

        return (
            <div>
                <div className="header-text">SELECT PILLAR</div>
                <br/>
                <table className="selection-list">
                    <thead>
                        <tr>
                            <td></td>
                            <td><h3>Attributes</h3></td>
                            <td><h3>Skill</h3></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {pillars}
                    </tbody>
                </table>
                <Button text="Cancel" className="button" onClick={() => this.props.onCancel() }/>
            </div>
        );
    }
}