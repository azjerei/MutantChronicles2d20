import * as React from 'react';
import {character} from '../common/character';
import {Education, EducationsHelper} from '../helpers/educations';
import {SkillsHelper} from '../helpers/skills';
import {AttributesHelper} from '../helpers/attributes';
import {Button} from './button';

interface IEducationSelectionProperties {
    onSelection: (edu: Education, cost: number) => void;
    onCancel: () => void;
}

export class CybertronicEducationSelection extends React.Component<IEducationSelectionProperties, {}> {
    constructor(props: IEducationSelectionProperties) {
        super(props);
    }

    render() {
        var edus = EducationsHelper.getCybertronicEducations().map((e, i) => {
            const edu = EducationsHelper.getEducation(e.education);

            if (character.lifePoints < e.cost) return undefined;

            const attributes = edu.attributes.map((a, i) => {
                return (
                    <div key={i}>
                        +{a} {AttributesHelper.getAttributeName(character.attributes[i].attribute).substr(0, 3) }
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

            return (
                <tr key={i}>
                    <td>{edu.name}</td>
                    <td>{attributes}</td>
                    <td>{mandatory}</td>
                    <td>{elective}</td>
                    <td>
                        <Button className="button-small"
                            text={`Select (-${e.cost} LP)`}
                            onClick={() => { this.props.onSelection(e.education, e.cost) } } />
                    </td>
                </tr>
            )
        });

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
                <Button text="Cancel" className="button" onClick={() => this.props.onCancel() }/>
            </div>
        );
    }
}