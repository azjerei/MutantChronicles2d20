import * as React from 'react';
import {character} from '../common/character';
import {IconicCareer, IconicCareersHelper} from '../helpers/iconicCareers';
import {SkillsHelper, Skill} from '../helpers/skills';
import {Button} from '../components/button';
import {SuperPointSpend} from '../components/superPointSpend';

interface ICareerAttemptProperties {
    career: IconicCareer;
    onConfirm: (career: IconicCareer, skill: Skill, difficulty: number, extraDice: number, gauge: number) => void;
    onCancel: () => void;
}

export class CareerAttempt extends React.Component<ICareerAttemptProperties, {}> {
    private _difficulty: number;
    private _difficultyGauge: number;
    private _maxDifficulty: number;
    private _lifePointsSpent: number;
    private _superPointsSpent: number;
    private _extraDice: number;
    private _useDifficultyGauge: boolean;

    constructor(props: ICareerAttemptProperties) {
        super(props);

        this._maxDifficulty = this._difficulty = IconicCareersHelper.getCareer(this.props.career).difficulty;
        this._difficultyGauge = 1;
        this._lifePointsSpent = 0;
        this._superPointsSpent = 0;
        this._extraDice = 0;

        if (this._difficulty === 99) {
            this._difficulty = 1;
            this._maxDifficulty = 1;
            this._useDifficultyGauge = true;
        }
    }

    render() {
        const career = IconicCareersHelper.getCareer(this.props.career);

        const dec = this._difficulty > 0 && character.lifePoints >= 1
            ? (<img style={{ float: "left" }} height="20" src="res/img/dec.png" onClick={ () => { this.onDecrease() } }/>)
            : undefined;

        const inc = this._difficulty < this._maxDifficulty
            ? (<img style={{ float: "right" }} height="20" src="res/img/inc.png" onClick={ () => { this.onIncrease() } }/>)
            : undefined;

        const decDiff = this._useDifficultyGauge && this._difficultyGauge > 1
            ? (<img style={{ float: "left" }} height="20" src="res/img/dec.png" onClick={ () => { this.onDecreaseDifficulty() } }/>)
            : undefined;

        const incDiff = this._useDifficultyGauge && this._difficultyGauge < 3
            ? (<img style={{ float: "right" }} height="20" src="res/img/inc.png" onClick={ () => { this.onIncreaseDifficulty() } }/>)
            : undefined;

        const difficultyGauge = this._useDifficultyGauge
            ? <div style={{backgroundColor:"black"}}>
                <div>
                    You can set your difficulty between 1 and 3. The higher the value, the more talents you
                    will be able to select should your career attempt succeed.
                </div>
                <div className="attribute-value">
                    {decDiff}
                    {this._difficultyGauge}
                    {incDiff}
                </div>
              </div>
            : undefined;

        const skills = career.mandatory.map((skill, i) => {
            return (
                <div className="skill-container" key={i}>
                    <Button text="Select" className="button-small align-right" onClick={() => { this.props.onConfirm(this.props.career, skill, this._difficulty, this._extraDice, this._difficultyGauge) } } />
                    <div className="skill-name">
                        {SkillsHelper.getSkillName(skill) }
                        &nbsp;
                        <div style={{fontSize: "small", display:"inline-block"}}>
                            (TN: {character.skills[skill].expertise + character.attributes[SkillsHelper.getAttributeForSkill(skill)].value})
                        </div>
                    </div>
                    <div className="skill-expertise">
                        Expertise&nbsp;
                        {character.skills[skill].expertise}
                    </div>
                    <div className="skill-focus">
                        Focus&nbsp;
                        {character.skills[skill].focus}
                    </div>
                </div>
            )
        });

        const superPoints = character.hasSuperPoints()
            ? <SuperPointSpend
                text="Roll an additional die when attempting to enter the iconic career per Promotion Point/Federation Commendation spent"
                onChange={(val) => { this._extraDice = val; this._superPointsSpent = val; } }/>
            : undefined; 

        return (
            <div>
                <div className="header-text">ICONIC CAREER ATTEMPT</div>
                <div className="panel">
                    <div>
                        You are attempting to make your way into the <b>{career.name}</b> career.
                        <br/><br/>
                        You can spend Life Points to lower the difficulty.
                        If you cancel, any spent points will be refunded.
                    </div>
                    <div>
                        {difficultyGauge}
                        <div className="attribute-container">Difficulty</div>
                        <div className="attribute-value">
                            {dec}
                            {this._difficulty}
                            {inc}
                        </div>
                    </div>
                    <br/>
                    {superPoints}
                    <br/>
                    <div>
                        Select a skill to use in your attempt.
                    </div>
                    {skills}
                </div>
                <Button text="Cancel" className="button" onClick={() => this.onCancel() }/>
            </div>
        );
    }

    private onDecreaseDifficulty() {
        this._difficulty--;
        this._difficultyGauge--;
        this._maxDifficulty = this._difficultyGauge;
        this.forceUpdate();
    }

    private onIncreaseDifficulty() {
        this._difficulty++;
        this._difficultyGauge++;
        this._maxDifficulty = this._difficultyGauge;
        this.forceUpdate();
    }

    private onDecrease() {
        this._difficulty--;
        character.lifePoints--;
        this._lifePointsSpent++;
        this.forceUpdate();
    }

    private onIncrease() {
        this._difficulty++;
        character.lifePoints++;
        this._lifePointsSpent--;
        this.forceUpdate();
    }

    private onCancel() {
        character.lifePoints += this._lifePointsSpent;
        character.superPoints += this._superPointsSpent;
        this.props.onCancel();
    }
}