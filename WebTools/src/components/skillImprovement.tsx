import * as React from 'react';
import {Skill, SkillsHelper} from '../helpers/skills';
import {character} from '../common/character';

interface ISkillImprovementProperties {
    skill: Skill;
    onUpdated?: () => void;
}

export class SkillImprovement extends React.Component<ISkillImprovementProperties, {}> {
    private _originalExpertise: number;
    private _originalFocus: number;
    private _points: number;

    constructor(props: ISkillImprovementProperties) {
        super(props);

        this._originalExpertise = character.skills[this.props.skill].expertise;
        this._originalFocus = character.skills[this.props.skill].focus;
        this._points = 1;
    }

    componentWillUpdate() {
        if (this._points === 1) {
            this._originalExpertise = character.skills[this.props.skill].expertise;
            this._originalFocus = character.skills[this.props.skill].focus;
        }
    }

    render() {
        const {skill} = this.props;

        const maxSkill = character.skills[skill].isSignature ? 5 : 3;

        const expertise = character.skills[skill].expertise;
        const focus = character.skills[skill].focus;
        const showDecreaseExpertise = expertise > this._originalExpertise;
        const showIncreaseExpertise = expertise === this._originalExpertise && this._points > 0 && expertise < maxSkill;
        const showDecreaseFocus = focus > this._originalFocus;
        const showIncreaseFocus = focus === this._originalFocus && focus !== expertise && this._points > 0 && focus < maxSkill;

        const decExp = showDecreaseExpertise
            ? (<img style={{ float: "right" }} height="20" src="res/img/dec.png" onClick={ () => { this.onDecreaseExpertise() } }/>)
            : undefined;

        const incExp = showIncreaseExpertise
            ? (<img style={{ float: "right" }} height="20" src="res/img/inc.png" onClick={ () => { this.onIncreaseExpertise() } }/>)
            : undefined;

        const decFoc = showDecreaseFocus
            ? (<img style={{ float: "right" }} height="20" src="res/img/dec.png" onClick={ () => { this.onDecreaseFocus() } }/>)
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
                    Expertise: {expertise} {decExp} {incExp}
                </div>
                <div className="skill-focus">
                    Focus: {focus} {decFoc} {incFoc}
                </div>
            </div>
        );
    }

    private onDecreaseExpertise() {
        character.skills[this.props.skill].expertise--;
        this._points++;

        if (this.props.onUpdated) {
            this.props.onUpdated();
        }
        else {
            this.forceUpdate();
        }
    }

    private onIncreaseExpertise() {
        character.skills[this.props.skill].expertise++;
        this._points--;

        if (this.props.onUpdated) {
            this.props.onUpdated();
        }
        else {
            this.forceUpdate();
        }
    }

    private onDecreaseFocus() {
        character.skills[this.props.skill].focus--;
        this._points++;

        if (this.props.onUpdated) {
            this.props.onUpdated();
        }
        else {
            this.forceUpdate();
        }
    }

    private onIncreaseFocus() {
        character.skills[this.props.skill].focus++;
        this._points--;

        if (this.props.onUpdated) {
            this.props.onUpdated();
        }
        else {
            this.forceUpdate();
        }
    }
}

export class IconicSkillImprovement extends React.Component<ISkillImprovementProperties, {}> {
    private _originalExpertise: number;
    private _originalFocus: number;
    private _points: number;

    constructor(props: ISkillImprovementProperties) {
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
        const { skill } = this.props;

        const maxSkill = character.skills[skill].isSignature ? 5 : 3;

        const expertise = character.skills[skill].expertise;
        const focus = character.skills[skill].focus;
        const showDecreaseExpertise = expertise > this._originalExpertise && focus !== expertise;
        const showIncreaseExpertise = this._points > 0 && expertise < maxSkill;
        const showDecreaseFocus = focus > this._originalFocus;
        const showIncreaseFocus = focus !== expertise && this._points > 0 && focus < maxSkill;

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
                    {SkillsHelper.getSkillName(skill)}
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

        if (this.props.onUpdated) {
            this.props.onUpdated();
        }
        else {
            this.forceUpdate();
        }
    }

    private onIncreaseExpertise() {
        character.skills[this.props.skill].expertise++;
        this._points--;

        if (this.props.onUpdated) {
            this.props.onUpdated();
        }
        else {
            this.forceUpdate();
        }
    }

    private onDecreaseFocus() {
        character.skills[this.props.skill].focus--;
        this._points++;

        if (this.props.onUpdated) {
            this.props.onUpdated();
        }
        else {
            this.forceUpdate();
        }
    }

    private onIncreaseFocus() {
        character.skills[this.props.skill].focus++;
        this._points--;

        if (this.props.onUpdated) {
            this.props.onUpdated();
        }
        else {
            this.forceUpdate();
        }
    }
}