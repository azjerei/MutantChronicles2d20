import * as React from 'react';
import {character} from '../common/character';
import {KiSchool, KiSchoolViewModel, KiSchoolsHelper} from '../helpers/kiSchools';
import {Skill, SkillsHelper} from '../helpers/skills';
import {DiceRoller} from '../helpers/diceRoller';
import {Status} from '../helpers/status';
import {Button} from './button';

interface IKiSchoolSelectionProperties {
    onSuccess: () => void;
}

interface IKiSchoolSelectionState {
    showAttempt: boolean;
    showSuccess: boolean;
    showFailure: boolean;
}

export class KiSchoolSelection extends React.Component<IKiSchoolSelectionProperties, IKiSchoolSelectionState> {
    private _schools: KiSchoolViewModel[] = [];
    private _school: KiSchoolViewModel;
    private _successes;

    constructor(props: IKiSchoolSelectionProperties) {
        super(props);

        this.state = {
            showAttempt: false,
            showSuccess: false,
            showFailure: false
        };

        this._schools = KiSchoolsHelper.getSchools();
        this._successes = 0;
    }

    render() {
        const schools = this._schools.map((s, i) => {
            const difficulty = s.entrySkill !== Skill.None
                ? <td>D{s.entryDifficulty} {SkillsHelper.getSkillName(s.entrySkill) }</td>
                : <td>-</td>;

            const selectText = s.entryDifficulty === 0 ? "Select" : "Show";

            return (
                <tr key={i}>
                    <td className="selection-header">
                        {s.name}
                        <div className="subheader">{KiSchoolsHelper.isPersecuted(s.id) ? "Subject to Persecution." : ""}</div>
                    </td>
                    {difficulty}
                    <td><Button className="button-small" text={selectText} onClick={() => { this.showSchoolAttempt(s); } } /></td>
                </tr>
            );
        });

        const dec = this._successes > 0
            ? (<img style={{ float: "right", marginRight:"10px" }} height="20" src="res/img/dec.png" onClick={ () => { this.onDecreaseSuccesses() } }/>)
            : undefined;

        const inc = this._successes < character.lifePoints
            ? (<img style={{ float: "right" }} height="20" src="res/img/inc.png" onClick={ () => { this.onIncreaseSuccesses() } }/>)
            : undefined;

        return (
            !this.state.showAttempt && !this.state.showSuccess && !this.state.showFailure
             ?  <div className="panel">
                    <div className="header-small">KI SCHOOLS</div>
                    <div>
                        Do you want to look for a Ki Master?
                        For each Life Point spent you gain a success towards finding a master.
                        Becoming a member of certain schools (and under certain conditions) will
                        make you a subject to Persecution. This will induce a separate check after
                        your next career event. If that check fails, you will gain an enemy from the
                        Samurai social class layer.
                    </div>
                    <table className="selection-list">
                        <tbody>
                            <tr>
                                <td></td>
                                <td>Difficulty</td>
                                <td></td>
                            </tr>
                            {schools}
                        </tbody>
                    </table>
                </div>
            : this.state.showSuccess
                ? <div className="panel">
                    <div className="header-small">KI SCHOOLS: Success</div>
                    <div>You have successfully entered the {this._school.name} school.</div>
                  </div>
                : this.state.showFailure
                    ? <div className="panel">
                        <div className="header-small">KI SCHOOLS: Failure</div>
                        <div>You failed to enter the {this._school.name} school. You can try again next career.</div>
                      </div>
                    : <div className="panel">
                        <div className="header-small">KI SCHOOLS: {this._school.name}</div>
                        <div>{this._school.description}</div>
                        <div><b>{KiSchoolsHelper.isPersecuted(this._school.id) ? "Subject to Persecution." : ""}</b></div>
                        <div>Difficulty: D{this._school.entryDifficulty} {SkillsHelper.getSkillName(this._school.entrySkill) }</div>
                        <div>
                            Additional Successes: <b>{this._successes}</b>
                            {inc}{dec}
                        </div>
                        <div style={{ display: "flex", alignItems:"" }}>
                            <Button className="button-small" text="Select" onClick={() => { this.attemptSchool(); } } />
                            <div></div>
                            <Button className="button-small" text="Cancel" onClick={() => { this.cancelAttempt(); } } />
                        </div>
                      </div>
        );
    }

    private showSchoolAttempt(school: KiSchoolViewModel) {
        this._school = school;

        if (school.entryDifficulty === 0) {
            this.assignSchool();
        }
        else {
            this.setState({ showAttempt: true, showSuccess: false, showFailure: false });
        }
    }

    private cancelAttempt() {
        this.setState({ showAttempt: false, showSuccess: false, showFailure: false });
    }

    private attemptSchool() {
        const difficulty = this._school.entryDifficulty;
        const skill = this._school.entrySkill;
        const attribute = SkillsHelper.getAttributeForSkill(skill);
        const tn = character.skills[skill].expertise + character.attributes[attribute].value;
        const result = DiceRoller.roll(tn, character.skills[skill].focus, difficulty);

        if (result.successes + this._successes + character.kiBonus >= 1) {
            this.assignSchool();
        }
        else {
            this.failSchool();
        }
    }

    private assignSchool() {
        character.kiSchool = this._school.id;
        this.setState({ showAttempt: false, showSuccess: true, showFailure: false });

        if (character.status !== Status.Faceless &&
            character.status !== Status.Ronin &&
            KiSchoolsHelper.isPersecuted(character.kiSchool)) {
            character.addEvent("Add one to your repercussion range for Command, Lifestyle and Persuade tests when dealing with Samurai.");
        }

        this.props.onSuccess();
    }

    private failSchool() {
        this.setState({ showAttempt: false, showSuccess: false, showFailure: true });
    }

    private onIncreaseSuccesses() {
        this._successes++;
        character.lifePoints--;
        this.forceUpdate();
    }

    private onDecreaseSuccesses() {
        this._successes--;
        character.lifePoints++;
        this.forceUpdate();
    }
}