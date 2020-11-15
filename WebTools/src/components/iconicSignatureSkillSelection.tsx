import * as React from 'react';
import {character} from '../common/character';
import {Skill, SkillsHelper} from '../helpers/skills';

interface ISignatureSkillProperties {
    controller: IconicSignatureSkillSelection;
    skill: Skill;
    onExpertiseIncreased: (skill: Skill, reset: boolean) => void;
    onExpertiseDecreased: (skill: Skill, reset: boolean) => void;
    onFocusIncreased: (skill: Skill, reset: boolean) => void;
    onFocusDecreased: (skill: Skill, reset: boolean) => void;
    disabled: boolean;
}

class IconicSignatureSkill extends React.Component<ISignatureSkillProperties, {}> {
    private _originalExpertise: number;
    private _originalFocus: number;
    private _points: number;

    constructor(props: ISignatureSkillProperties) {
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

        const maximum = character.decreaseSignatureCap ? 4 : 5;
        const expertise = character.skills[skill].expertise;
        const focus = character.skills[skill].focus;
        const showDecreaseExpertise = expertise > this._originalExpertise && focus !== expertise;
        const showIncreaseExpertise = this.props.controller.points > 0 && !this.props.disabled && expertise < maximum;
        const showDecreaseFocus = focus > this._originalFocus;
        const showIncreaseFocus = focus !== expertise && this.props.controller.points > 0 && !this.props.disabled && focus < maximum;

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
        this._points++;
        character.skills[this.props.skill].expertise--;
        character.skills[this.props.skill].isSignature = false;
        this.props.onExpertiseDecreased(this.props.skill, this._points === 2);
    }

    private onIncreaseExpertise() {
        this._points--;
        character.skills[this.props.skill].expertise++;
        character.skills[this.props.skill].isSignature = true;
        this.props.onExpertiseIncreased(this.props.skill, this._points === 2);
    }

    private onDecreaseFocus() {
        this._points++;
        character.skills[this.props.skill].focus--;
        character.skills[this.props.skill].isSignature = false;
        this.props.onFocusDecreased(this.props.skill, this._points === 2);
    }

    private onIncreaseFocus() {
        this._points--;
        character.skills[this.props.skill].focus++;
        character.skills[this.props.skill].isSignature = true;
        this.props.onFocusIncreased(this.props.skill, this._points === 2);
    }
}

interface ISignatureSkillSelectionProperties {
    skills: Skill[];
    onSelection?: (skill: Skill) => void;
}

export class IconicSignatureSkillSelection extends React.Component<ISignatureSkillSelectionProperties, {}> {
    private _points: number;
    private _skill: Skill;

    constructor(props: ISignatureSkillSelectionProperties) {
        super(props);

        this._points = 2;
    }

    render() {
        const skills = this.props.skills.map((s, i) => {
            if (character.skills[s].expertise === 0) {
                return undefined;
            }

            return (
                <div key={i}>
                    <IconicSignatureSkill
                        key={i}
                        disabled={this._skill ? this._skill !== s : false}
                        skill={s}
                        controller={this}
                        onExpertiseDecreased={(skill, reset) => this.update(skill, false, reset) }
                        onExpertiseIncreased={(skill, reset) => this.update(skill, true, reset) }
                        onFocusDecreased={(skill, reset) => this.update(skill, false, reset) }
                        onFocusIncreased={(skill, reset) => this.update(skill, true, reset) }/>
                </div>
            )
        });

        return (
            <div>{skills}</div>
        );
    }

    get points() {
        return this._points;
    }

    private update(skill: Skill, decreasePoint: boolean, reset: boolean) {
        this._points += decreasePoint ? -1 : 1;

        if (!reset) {
            this._skill = skill;
        }
        else {
            this._skill = null;
        }

        this.props.onSelection(skill);
        this.forceUpdate();
    }
}