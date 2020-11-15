import * as React from 'react';
import {character} from '../common/character';
import {Skill, SkillsHelper} from '../helpers/skills';

interface IElectiveSkillProperties {
    controller: ElectiveSkillImprovement;
    skill: Skill;
    onExpertiseIncreased: () => void;
    onExpertiseDecreased: () => void;
    onFocusIncreased: () => void;
    onFocusDecreased: () => void;
    hideModifiers?: boolean;
}

class ElectiveSkill extends React.Component<IElectiveSkillProperties, {}> {
    private _originalExpertise: number;
    private _originalFocus: number;
    private _points: number;

    constructor(props: IElectiveSkillProperties) {
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
        const showIncreaseExpertise = expertise === this._originalExpertise && focus === this._originalFocus && this.props.controller.points > 0 && !this.props.hideModifiers && expertise < maxSkill;
        const showDecreaseFocus = focus > this._originalFocus;
        const showIncreaseFocus = focus === this._originalFocus && focus !== expertise && expertise === this._originalExpertise && this.props.controller.points > 0 && !this.props.hideModifiers && focus < maxSkill;

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
        this.props.onExpertiseDecreased();
    }

    private onIncreaseExpertise() {
        character.skills[this.props.skill].expertise++;
        this._points--;
        this.props.onExpertiseIncreased();
    }

    private onDecreaseFocus() {
        character.skills[this.props.skill].focus--;
        this._points++;
        this.props.onFocusDecreased();
    }

    private onIncreaseFocus() {
        character.skills[this.props.skill].focus++;
        this._points--;
        this.props.onFocusIncreased();
    }
}

interface IElectiveImprovementProperties {
    skills: Skill[];
    points: number;
    onUpdated?: () => void;
}

export class ElectiveSkillImprovement extends React.Component<IElectiveImprovementProperties, {}> {
    private _points: number;
    private _otherSkills: Skill[];

    constructor(props: IElectiveImprovementProperties) {
        super(props);

        this._points = props.points;

        this._otherSkills = SkillsHelper.getSkills().filter(s => {
            return this.props.skills.indexOf(s) === -1;
        });
    }

    render() {
        const skills = this.props.skills.map((s, i) => {
            return (
                <div key={i}>
                    <ElectiveSkill
                        skill={s}
                        controller={this}
                        onExpertiseDecreased={() => this.update(false)}
                        onExpertiseIncreased={() => this.update(true)}
                        onFocusDecreased={() => this.update(false)}
                        onFocusIncreased={() => this.update(true)}/>
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

    private update(decreasePoint: boolean, decreaseLifePoints?: boolean) {
        this._points += decreasePoint ? -1 : 1;

        if (decreaseLifePoints === true) {
            character.lifePoints--;
        }
        else if (decreaseLifePoints === false) {
            character.lifePoints++;
        }

        if (this.props.onUpdated) {
            this.props.onUpdated();
        }

        this.forceUpdate();
    }
}