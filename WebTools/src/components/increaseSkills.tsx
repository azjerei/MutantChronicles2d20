import * as React from 'react';
import {character} from '../common/character';
import {Skill, SkillsHelper} from '../helpers/skills';

interface IIncreaseSkillProperties {
    controller: IncreaseSkills;
    skill: Skill;
    onExpertiseIncreased: () => void;
    onExpertiseDecreased: () => void;
    onFocusIncreased: () => void;
    onFocusDecreased: () => void;
}

class IncreaseSkill extends React.Component<IIncreaseSkillProperties, {}> {
    private _originalExpertise: number;
    private _originalFocus: number;

    constructor(props: IIncreaseSkillProperties) {
        super(props);

        this._originalExpertise = character.skills[this.props.skill].expertise;
        this._originalFocus = character.skills[this.props.skill].focus;
    }

    render() {
        const {skill} = this.props;

        const expertise = character.skills[skill].expertise;
        const focus = character.skills[skill].focus;
        const isIncreased = expertise >= this._originalExpertise + 1 ||
                            focus >= this._originalFocus + 1;
        const showDecreaseExpertise = expertise > this._originalExpertise;
        const showIncreaseExpertise = !isIncreased && character.lifePoints > 0;
        const showDecreaseFocus = focus > this._originalFocus;
        const showIncreaseFocus = !isIncreased && focus !== expertise && character.lifePoints > 0;

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
        character.lifePoints++;
        this.props.onExpertiseDecreased();
    }

    private onIncreaseExpertise() {
        character.skills[this.props.skill].expertise++;
        character.lifePoints--;
        this.props.onExpertiseIncreased();
    }

    private onDecreaseFocus() {
        character.skills[this.props.skill].focus--;
        character.lifePoints++;
        this.props.onFocusDecreased();
    }

    private onIncreaseFocus() {
        character.skills[this.props.skill].focus++;
        character.lifePoints--;
        this.props.onFocusIncreased();
    }
}

interface IIncreaseSkillsProperties {
    skills: Skill[];
    onUpdated?: () => void;
}

export class IncreaseSkills extends React.Component<IIncreaseSkillsProperties, {}> {
    private _skills: Skill[];

    constructor(props: IIncreaseSkillsProperties) {
        super(props);
        this._skills = [];

        this.props.skills.forEach(skill => {
            this._skills.push(skill);
        });
    }

    render() {
        const skills = this._skills.map((s, i) => {
            return (
                <div>
                    <IncreaseSkill
                        key={i}
                        skill={s}
                        controller={this}
                        onExpertiseDecreased={() => this.update() }
                        onExpertiseIncreased={() => this.update() }
                        onFocusDecreased={() => this.update() }
                        onFocusIncreased={() => this.update() }/>
                </div>
            )
        });

        return (
            <div>{skills}</div>
        );
    }

    private update() {
        if (this.props.onUpdated) {
            this.props.onUpdated();
        }

        this.forceUpdate();
    }
}