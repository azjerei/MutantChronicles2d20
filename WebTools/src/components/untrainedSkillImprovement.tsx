import * as React from 'react';
import {character} from '../common/character';
import {Skill, SkillsHelper} from '../helpers/skills';

interface IUntrainedSkillProperties {
    controller: UntrainedSkillImprovement;
    skill: Skill;
    onExpertiseIncreased: () => void;
    onExpertiseDecreased: () => void;
    onFocusIncreased: () => void;
    onFocusDecreased: () => void;
}

class UntrainedSkill extends React.Component<IUntrainedSkillProperties, {}> {
    private _originalExpertise: number;
    private _originalFocus: number;
    private _points: number;

    constructor(props: IUntrainedSkillProperties) {
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

        const expertise = character.skills[skill].expertise;
        const focus = character.skills[skill].focus;
        const showDecreaseExpertise = expertise > this._originalExpertise;
        const showIncreaseExpertise = expertise === 0 && this.props.controller.points > 0;
        const showDecreaseFocus = focus > this._originalFocus;
        const showIncreaseFocus = focus === 0 && focus !== expertise && expertise === this._originalExpertise && this.props.controller.points > 0;

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

        return (
            <div className="skill-container">
                <div className="skill-name">{SkillsHelper.getSkillName(skill) }</div>
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

interface IUntrainedImprovementProperties {
    skills: Skill[];
    points: number;
    onUpdated?: () => void;
}

export class UntrainedSkillImprovement extends React.Component<IUntrainedImprovementProperties, {}> {
    private _points: number;
    private _skills: Skill[];

    constructor(props: IUntrainedImprovementProperties) {
        super(props);
        this._points = props.points;
        this._skills = [];

        this.props.skills.forEach(skill => {
            if (character.skills[skill].expertise === 0 || character.skills[skill].focus === 0) {
                this._skills.push(skill);
            }
        });
    }

    render() {
        const skills = this._skills.map((s, i) => {
            return (
                <div>
                    <UntrainedSkill
                        key={i}
                        skill={s}
                        controller={this}
                        onExpertiseDecreased={() => this.update(false) }
                        onExpertiseIncreased={() => this.update(true) }
                        onFocusDecreased={() => this.update(false) }
                        onFocusIncreased={() => this.update(true) }/>
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

    private update(decreasePoint: boolean) {
        this._points += decreasePoint ? -1 : 1;
        if (this.props.onUpdated) {
            this.props.onUpdated();
        }
        this.forceUpdate();
    }
}