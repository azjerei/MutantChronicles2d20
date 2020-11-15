import * as React from 'react';
import {character} from '../common/character';
import {Skill, SkillsHelper} from '../helpers/skills';

interface ISignatureSkillProperties {
    controller: SignatureSkillSelection;
    skill: Skill;
    onExpertiseIncreased: () => void;
    onExpertiseDecreased: () => void;
    onFocusIncreased: () => void;
    onFocusDecreased: () => void;
}

class SignatureSkill extends React.Component<ISignatureSkillProperties, {}> {
    private _originalExpertise: number;
    private _originalFocus: number;
    private _points: number;

    constructor(props: ISignatureSkillProperties) {
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

        const maximum = character.decreaseSignatureCap ? 4 : 5;
        const expertise = character.skills[skill].expertise;
        const focus = character.skills[skill].focus;
        const showDecreaseExpertise = expertise > this._originalExpertise;
        const showIncreaseExpertise = expertise === this._originalExpertise && focus === this._originalFocus && this.props.controller.points > 0 && expertise < maximum && expertise > 0;
        const showDecreaseFocus = focus > this._originalFocus;
        const showIncreaseFocus = focus === this._originalFocus && focus !== expertise && expertise === this._originalExpertise && this.props.controller.points > 0 && focus < maximum;

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
        this._points++;
        character.skills[this.props.skill].expertise--;
        character.skills[this.props.skill].isSignature = false;
        this.props.onExpertiseDecreased();
    }

    private onIncreaseExpertise() {
        this._points--;
        character.skills[this.props.skill].expertise++;
        character.skills[this.props.skill].isSignature = true;
        this.props.onExpertiseIncreased();
    }

    private onDecreaseFocus() {
        this._points++;
        character.skills[this.props.skill].focus--;
        character.skills[this.props.skill].isSignature = false;
        this.props.onFocusDecreased();
    }

    private onIncreaseFocus() {
        this._points--;
        character.skills[this.props.skill].focus++;
        character.skills[this.props.skill].isSignature = true;
        this.props.onFocusIncreased();
    }
}

interface ISignatureSkillSelectionProperties {
    skills: Skill[];
    onSelection?: (skill: Skill) => void;
}

export class SignatureSkillSelection extends React.Component<ISignatureSkillSelectionProperties, {}> {
    private _points: number;
    private _skills: Skill[];

    constructor(props: ISignatureSkillSelectionProperties) {
        super(props);

        this._points = 1;

        this._skills = this.props.skills.filter(s => !character.skills[s].isSignature);
    }

    render() {
        const skills = this._skills.map((s, i) => {
            return (
                <div key={i}>
                    <SignatureSkill
                        key={i}
                        skill={s}
                        controller={this}
                        onExpertiseDecreased={() => this.update(null, false) }
                        onExpertiseIncreased={() => this.update(s, true) }
                        onFocusDecreased={() => this.update(null, false) }
                        onFocusIncreased={() => this.update(s, true) }/>
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

    private update(skill: Skill, decreasePoint: boolean) {
        this._points += decreasePoint ? -1 : 1;
        this.props.onSelection(skill);
        this.forceUpdate();
    }
}