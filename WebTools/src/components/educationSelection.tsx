import * as React from 'react';
import {character} from '../common/character';
import {Education, EducationsHelper} from '../helpers/educations';
import {SkillsHelper} from '../helpers/skills';
import {AttributesHelper} from '../helpers/attributes';
import {Button} from './button';

interface IEducationSelectionProperties {
    educations: Education[];
    cost: number;
    onSelection: (edu: Education, cost: number) => void;
    hideCancel?: boolean;
    onCancel: () => void;
}

export class EducationSelection extends React.Component<IEducationSelectionProperties, {}> {
    constructor(props: IEducationSelectionProperties) {
        super(props);
    }

    render() {
        var edus = this.props.educations.map((e, i) => {
            const edu = EducationsHelper.getEducation(e);

            const attributes = edu.attributes.map((a, i) => {
                return (
                    <div key={i}>
                        +{a} {AttributesHelper.getAttributeName(character.attributes[i].attribute).substr(0, 3)}
                    </div>
                );
            });

            const mandatory = edu.mandatory.map((m, i) => {
                return (
                    <div key={i}>
                        {SkillsHelper.getSkillName(m) }
                    </div>
                )
            });

            const elective = edu.elective.map((e, i) => {
                return (
                    <div key={i}>
                        {SkillsHelper.getSkillName(e) }
                    </div>
                )
            });

            const subheader = edu.name === "Brotherhood Apprenticeship"
                ? "This education will change your Faction to the Brotherhood."
                : undefined;

            return (
                <tr key={i}>
                    <td>
                        {edu.name}
                        <div className="subheader">{subheader}</div>
                    </td>
                    <td>{attributes}</td>
                    <td>{mandatory}</td>
                    <td>{elective}</td>
                    <td><Button className="button-small" text="Select" onClick={() => { this.props.onSelection(e, this.props.cost) } } /></td>
                </tr>
            )
        });

        const cancel = !this.props.hideCancel
            ? <Button text="Cancel" className="button" onClick={() => this.props.onCancel() }/>
            : undefined;

        return (
            <div>
                <div className="header-text">SELECT EDUCTION</div>
                <br/>
                <table className="selection-list">
                    <thead>
                        <tr>
                            <td></td>
                            <td><h3>Attributes</h3></td>
                            <td><h3>Mandatory Skills</h3></td>
                            <td><h3>Elective Skills</h3></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {edus}
                    </tbody>
                </table>
                {cancel}
            </div>
        );
    }
}