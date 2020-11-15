import * as React from 'react';
import {Status, StatusHelper, StatusViewModel} from '../helpers/status';
import {AttributesHelper} from '../helpers/attributes';
import {Skill, SkillsHelper} from '../helpers/skills';
import {Button} from './button';

interface IStatusSelectionProperties {
    statuses?: Status[];
    onSelection: (socialClass: Status) => void;
    onCancel: () => void;
}

export class StatusSelection extends React.Component<IStatusSelectionProperties, {}> {
    constructor(props: IStatusSelectionProperties) {
        super(props);
    }

    render() {
        const stats = this.props.statuses
            ? this.props.statuses.map(s => { return new StatusViewModel(s, StatusHelper.getStatus(s)); })
            : StatusHelper.getStatuses();

        var statuses = stats.map((stat, i) => {
            if (i === stats.length - 1) {
                return undefined;
            }

            const attr1 = stat.attributes.length > 0
                ? AttributesHelper.getAttributeName(stat.attributes[0])
                : "";

            const attr2 = stat.attributes.length > 1
                ? AttributesHelper.getAttributeName(stat.attributes[1])
                : "";

            const skill = stat.skills.length === 1
                ? SkillsHelper.getSkillName(stat.skills[0])
                : stat.skills.map((s, i) => {
                    return <div>{SkillsHelper.getSkillName(s) }</div>
                  });

            return (
                <tr key={i}>
                    <td className="selection-header">{stat.name}</td>
                    <td>
                        {attr1}
                        <br/>
                        {attr2}
                    </td>
                    <td>
                        {skill}
                    </td>
                    <td>{stat.earnings}</td>
                    <td><Button className="button-small" text="Select" onClick={() => { this.props.onSelection(stat.id) } } /></td>
                </tr>
            )
        });

        return (
            <div>
                <div className="header-text">SELECT STATUS</div>
                <br/>
                <table className="selection-list">
                    <thead>
                        <tr>
                            <td></td>
                            <td><h3>Attributes</h3></td>
                            <td><h3>Skill</h3></td>
                            <td><h3>Earnings</h3></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {statuses}
                    </tbody>
                </table>
                <Button text="Cancel" className="button" onClick={() => this.props.onCancel() }/>
            </div>
        );
    }
}