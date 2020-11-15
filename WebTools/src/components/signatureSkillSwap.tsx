import * as React from 'react';
import {character} from '../common/character';
import {Skill, SkillsHelper} from '../helpers/skills';
import {CheckBox} from './checkBox';

interface IIncreaseSkillProperties {
    skill: Skill;
}

class IncreaseSkill extends React.Component<IIncreaseSkillProperties, {}> {
    private _originalExpertise: number;
    private _originalFocus: number;
    private _expertise: number;
    private _focus: number;
    private _skill: Skill;

    constructor(props: IIncreaseSkillProperties) {
        super(props);

        this._originalExpertise = character.skills[this.props.skill].expertise;
        this._originalFocus = character.skills[this.props.skill].focus;

        this._expertise = this._originalExpertise;
        this._focus = this._originalFocus;

        this._skill = this.props.skill;
    }

    componentWillUpdate(props: IIncreaseSkillProperties) {
        if (props.skill !== this._skill) {
            this._originalExpertise = character.skills[props.skill].expertise;
            this._originalFocus = character.skills[props.skill].focus;

            this._expertise = this._originalExpertise;
            this._focus = this._originalFocus;

            this._skill = props.skill;
        }
    }

    get expertise() {
        return this._expertise;
    }

    get focus() {
        return this._focus;
    }

    render() {
        const {skill} = this.props;

        const isIncreased = this._expertise >= this._originalExpertise + 1 || this._focus >= this._originalFocus + 1;
        const showDecreaseExpertise = this._expertise > this._originalExpertise;
        const showIncreaseExpertise = !isIncreased;
        const showDecreaseFocus = this._focus > this._originalFocus;
        const showIncreaseFocus = !isIncreased && this._focus !== this._expertise;

        const decExp = showDecreaseExpertise
            ? (<img style={{ float: "right", marginRight: "20px" }} height="20" src="res/img/dec.png" onClick={ () => { this.onDecreaseExpertise() } }/>)
            : undefined;

        const incExp = showIncreaseExpertise
            ? (<img style={{ float: "right" }} height="20" src="res/img/inc.png" onClick={ () => { this.onIncreaseExpertise() } }/>)
            : undefined;

        const decFoc = showDecreaseFocus
            ? (<img style={{ float: "right", marginRight: "20px" }} height="20" src="res/img/dec.png" onClick={ () => { this.onDecreaseFocus() } }/>)
            : undefined;

        const incFoc = showIncreaseFocus
            ? (<img style={{ float: "right" }} height="20" src="res/img/inc.png" onClick={ () => { this.onIncreaseFocus() } }/>)
            : undefined;

        return (
            <div className="skill-container">
                <div className="skill-name">{SkillsHelper.getSkillName(skill) }</div>
                <div className="skill-expertise">
                    Expertise: {this._expertise} {incExp} {decExp}
                </div>
                <div className="skill-focus">
                    Focus: {this._focus} {incFoc} {decFoc}
                </div>
            </div>
        );
    }

    private onDecreaseExpertise() {
        this._expertise--;
        this.forceUpdate();
    }

    private onIncreaseExpertise() {
        this._expertise++;
        this.forceUpdate();
    }

    private onDecreaseFocus() {
        this._focus--;
        this.forceUpdate();
    }

    private onIncreaseFocus() {
        this._focus++;
        this.forceUpdate();
    }
}

interface ISignatureSkillSwapProperties {
    current: Skill[];
    candidates: Skill[];
}

export class SignatureSkillSwap extends React.Component<ISignatureSkillSwapProperties, {}> {
    private _current: Skill;
    private _new: Skill;
    private _skill: IncreaseSkill;

    constructor(props: ISignatureSkillSwapProperties) {
        super(props);
    }

    get current() {
        return this._current;
    }

    get new() {
        return this._new;
    }

    render() {
        const current = this.props.current.map((s, i) => {
            return this.createSkillSelection(s, i, (val) => { this._current = val; this.forceUpdate(); }, this._current === s);
        });

        const candidates = this.props.candidates.map((s, i) => {
            return this.createSkillSelection(s, i, (val) => { this._new = val; this.forceUpdate(); }, this._new === s);
        });

        return (
            <div className="panel">
                <div>
                    You may spend 2 Promotion Points/Federation Commendations to exchange one of your signature skills for a new one.
                </div>
                <div className="signature-swap">
                    <div>
                        Select the signature skill to exchange.
                    </div>
                    {current}
                </div>
                <div className="signature-swap">
                    <div>
                        Select the new signature skill.
                    </div>
                    {candidates}
                </div>
            </div>
        );
    }

    private createSkillSelection(skill: Skill, index: number, func: (val: number) => void, isChecked: boolean): JSX.Element {
        return (
            <table key={index}>
                <tbody>
                    <tr>
                        <td>
                            <CheckBox
                                isChecked={isChecked}
                                value={skill}
                                onChanged={(val) => func(val) }/>
                        </td>
                        <td>
                            {SkillsHelper.getSkillName(skill) }
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}