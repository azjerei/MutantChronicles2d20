import * as React from 'react';
import {character} from '../common/character';
import {Skill, SkillsHelper} from '../helpers/skills';
import {RadioButton} from '../components/radioButton';

interface ISignatureSkillChoiceProperties {
    skills: Skill[];
    onSkillSelected: (skill: Skill) => void;
}

export class SignatureSkillChoice extends React.Component<ISignatureSkillChoiceProperties, {}> {
    constructor(props: ISignatureSkillChoiceProperties) {
        super(props);
    }

    render() {
        const skills = this.props.skills.map((skill, i) => {
            return (
                <tr key={i}>
                    <td>{SkillsHelper.getSkillName(skill) }</td>
                    <td><RadioButton groupId="signature" value={skill} onChanged={skill => this.onSkillSelected(skill) }/></td>
                </tr>
            )
        });

        return (
            <table className="selection-list">
                <tbody>
                    {skills}
                </tbody>
            </table>
        );
    }

    private onSkillSelected(skill: Skill) {
        this.props.onSkillSelected(skill);
        this.forceUpdate();
    }
}