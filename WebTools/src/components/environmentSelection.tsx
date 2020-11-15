import * as React from 'react';
import {Environment, EnvironmentsHelper} from '../helpers/environments';
import {AttributesHelper} from '../helpers/attributes';
import {SkillsHelper} from '../helpers/skills';
import {Button} from './button';

interface IEnvironmentSelectionProperties {
    onSelection: (env: Environment) => void;
    onCancel: () => void;
}

export class EnvironmentSelection extends React.Component<IEnvironmentSelectionProperties, {}> {
    constructor(props: IEnvironmentSelectionProperties) {
        super(props);
    }

    render() {
        var envs = EnvironmentsHelper.getEnvironments().map((env, i) => {
            const skills = env.skills.map((s, i) => {
                return <div key={i}>{SkillsHelper.getSkillName(s) }</div>;
            });

            return (
                <tr key={i}>
                    <td className="selection-header">{env.name}</td>
                    <td>
                        {AttributesHelper.getAttributeName(env.attributes[0]) }
                        <br/>
                        {AttributesHelper.getAttributeName(env.attributes[1]) }
                    </td>
                    <td>{skills}</td>
                    <td><Button className="button-small" text="Select" onClick={() => { this.props.onSelection(env.id) } } /></td>
                </tr>
            )
        });

        return (
            <div>
                <div className="header-text">SELECT ENVIRONMENT</div>
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
                        {envs}
                    </tbody>
                </table>
                <Button text="Cancel" className="button" onClick={() => this.props.onCancel() }/>
            </div>
        );
    }
}