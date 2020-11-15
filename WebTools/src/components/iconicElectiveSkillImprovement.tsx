import * as React from 'react';
import {character} from '../common/character';
import {Skill, SkillsHelper} from '../helpers/skills';

interface IElectiveSkillProperties {
    controller: IconicElectiveSkillImprovement;
    skill: Skill;
    onExpertiseIncreased: (skill: Skill) => void;
    onExpertiseDecreased: (skill: Skill, reset: boolean) => void;
    onFocusIncreased: (skill: Skill) => void;
    onFocusDecreased: (skill: Skill, reset: boolean) => void;
    disabled?: boolean;
}

class IconicElectiveSkill extends React.Component<IElectiveSkillProperties, {}> {
    private _originalExpertise: number;
    private _originalFocus: number;
    private _points: number;

    constructor(props: IElectiveSkillProperties) {
        super(props);

        this._originalExpertise = character.skills[this.props.skill].expertise;
        this._originalFocus = character.skills[this.props.skill].focus;
        this._points = 2;
    }

    componentWillUpdate() {
        if (this._points === 2) {
            this._originalExpertise = character.skills[this.props.skill].expertise;
            this._originalFocus = character.skills[this.props.skill].focus;
        }
    }

    render() {
        const {skill} = this.props;

        const maxSkill = character.skills[skill].isSignature ? 5 : 3;

        const expertise = character.skills[skill].expertise;
        const focus = character.skills[skill].focus;
        const showDecreaseExpertise = expertise > this._originalExpertise && focus !== expertise;
        const showIncreaseExpertise = this._points > 0 && !this.props.disabled && expertise < maxSkill;
        const showDecreaseFocus = focus > this._originalFocus;
        const showIncreaseFocus = focus !== expertise && this._points > 0 && !this.props.disabled && focus < maxSkill;

        const decExp = showDecreaseExpertise
            ? (<img style={{ float: "right", marginRight: "10px" }} height="20" src="res/img/dec.png" onClick={ () => { this.onDecreaseExpertise() } }/>)
            : undefined;

        const incExp = showIncreaseExpertise
            ? (<img style={{ float: "right" }} height="20" src="res/img/inc.png" onClick={ () => { this.onIncreaseExpertise() } }/>)
            : undefined;

        const decFoc = showDecreaseFocus
            ? (<img style={{ float: "right", marginRight: "10px" }} height="20" src="res/img/dec.png" onClick={ () => { this.onDecreaseFocus() } }/>)
            : undefined;

        const incFoc = showIncreaseFocus
            ? (<img style={{ float: "right" }} height="20" src="res/img/inc.png" onClick={ () => { this.onIncreaseFocus() } }/>)
            : undefined;

        const signature = character.skills[skill].isSignature
            ? (<span className="signature">S</span>)
            : undefined;

        return (
            <div className="skill-container">
                <div className="skill-name">
                    {SkillsHelper.getSkillName(skill) }
                    {signature}
                </div>
                <div className="skill-expertise">
                    Expertise: {expertise} {incExp} {decExp}
                </div>
                <div className="skill-focus">
                    Focus: {focus} {incFoc} {decFoc}
                </div>
            </div>
        );
    }

    private onDecreaseExpertise() {
        character.skills[this.props.skill].expertise--;
        this._points++;
        this.props.onExpertiseDecreased(this.props.skill, this._points === 2);
    }

    private onIncreaseExpertise() {
        character.skills[this.props.skill].expertise++;
        this._points--;
        this.props.onExpertiseIncreased(this.props.skill);
    }

    private onDecreaseFocus() {
        character.skills[this.props.skill].focus--;
        this._points++;
        this.props.onFocusDecreased(this.props.skill, this._points === 2);
    }

    private onIncreaseFocus() {
        character.skills[this.props.skill].focus++;
        this._points--;
        this.props.onFocusIncreased(this.props.skill);
    }
}

interface IElectiveImprovementProperties {
    skills: Skill[];
    points: number;
    onUpdated?: () => void;
}

export class IconicElectiveSkillImprovement extends React.Component<IElectiveImprovementProperties, {}> {
    private _points: number;
    private _skills: Skill[];

    constructor(props: IElectiveImprovementProperties) {
        super(props);

        this._points = props.points;
        this._skills = [];
    }

    render() {
        const skills = this.props.skills.map((s, i) => {
            const disabled = this._skills.length === 2 && this._skills.indexOf(s) === -1;
            return (
                <div key={i}>
                    <IconicElectiveSkill
                        skill={s}
                        controller={this}
                        onExpertiseDecreased={(skill, reset) => this.update(skill, reset, false) }
                        onExpertiseIncreased={(skill) => this.update(skill, false, true) }
                        onFocusDecreased={(skill, reset) => this.update(skill, reset, false) }
                        onFocusIncreased={(skill) => this.update(skill, false, true) }
                        disabled={disabled}/>
                </div>
            )
        });

        return (
            <div>
                {skills}
            </div>
        );
    }

    get points() {
        return this._points;
    }

    private update(skill: Skill, skillIsReset: boolean, decreasePoint: boolean) {
        this._points += decreasePoint ? -1 : 1;

        if (this._skills.indexOf(skill) === -1) {
            this._skills.push(skill);
        }

        if (skillIsReset) {
            this._skills.splice(this._skills.indexOf(skill), 1);
        }

        if (this.props.onUpdated) {
            this.props.onUpdated();
        }

        this.forceUpdate();
    }
}