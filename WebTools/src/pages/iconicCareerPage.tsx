import * as React from 'react';
import {character, CharacterCareer} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {Dialog} from '../components/dialog';
import {CareerAttempt} from '../components/careerAttempt';
import {IconicCareer, IconicCareersHelper} from '../helpers/iconicCareers';
import {Faction, FactionsHelper} from '../helpers/factions';
import {Skill, SkillsHelper} from '../helpers/skills';
import {DiceRoller} from '../helpers/diceRoller';

interface ICareerPageProps {
    showCareerAttempt: boolean;
}

export class IconicCareerPage extends React.Component<IPageProperties, ICareerPageProps> {
    private _career: IconicCareer;
    private _filter: IconicCareer[];

    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showCareerAttempt: false
        };

        this._filter = [];
    }

    render() {
        if (!this.state.showCareerAttempt) {
            var careers = IconicCareersHelper.getCareers().map((career, n) => {
                if (this._filter.indexOf(career.id) > -1) {
                    return undefined;
                }

                const mandatory = career.mandatory.map((m, i) => {
                    return (
                        <div key={i}>
                            {SkillsHelper.getSkillName(m) }
                        </div>
                    )
                });

                const elective = career.elective.map((e, i) => {
                    return (
                        <div key={i}>
                            {SkillsHelper.getSkillName(e) }
                        </div>
                    )
                });

                const subheader = career.id === IconicCareer.FreedomBrigade
                    ? "This career will change your Faction to Capitol and give you a criminal record."
                    : undefined;

                return (
                    <tr key={n}>
                        <td className="selection-header">
                            {career.name}
                            <div className="subheader">{subheader}</div>
                        </td>
                        <td>{mandatory}</td>
                        <td>{elective}</td>
                        <td>{career.difficulty === 99 ? "1-3" : career.difficulty.toString()}</td>
                        <td><Button className="button-small" text="Select" onClick={() => { this.showCareerAttempt(career.id); } } /></td>
                    </tr>
                )
            });

            return (
                <div className="page">
                    <PageHeader text="ICONIC CAREER" />
                    <div className="page-text">
                        You can select an <b>Iconic Career</b>, one of the major professions that stand out in Mutant Chronicles,
                        which are representative of some of the great institutions across the solar system. Note that you
                        can only perform one Iconic Career step, so choose wisely. If the list is empty, you are either not
                        qualified for the "best of the best", or you have not selected the right Sources at the beginning.
                    </div>
                    <table className="selection-list">
                        <thead>
                            <tr>
                                <td></td>
                                <td><h3>Mandatory Skills</h3></td>
                                <td><h3>Elective Skills</h3></td>
                                <td><h3>Difficulty</h3></td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {careers}
                        </tbody>
                    </table>
                    <Button text="CANCEL" className="button-dark" onClick={() => { this.onCancel() } }/>
                </div>
            );
        }
        else {
            return (
                <div className="page">
                    <PageHeader text="ICONIC CAREER" />
                    <div className="page-text">
                        You can select an <b>Iconic Career</b>, one of the major professions that stand out in Mutant Chronicles,
                        which are representative of some of the great institutions across the solar system.Note that you
                        can only perform one Iconic Career step, so choose wisely.If the list is empty, you are either not
                        qualified for the "best of the best", or you have not selected the right Sources at the beginning.
                    </div>
                    <CareerAttempt
                        career={this._career}
                        onCancel={() => { this.hideCareerAttempt() } }
                        onConfirm={(career, skill, difficulty, extraDice, gauge) => { this.attemptCareer(career, skill, difficulty, extraDice, gauge); } }/>
                </div>
            );
        }
    }

    private showCareerAttempt(career: IconicCareer) {
        this._career = career;
        this.setState({ showCareerAttempt: true });
    }

    private hideCareerAttempt() {
        this.setState({ showCareerAttempt: false });
    }

    private attemptCareer(career: IconicCareer, skill: Skill, difficulty: number, extraDice: number, gauge: number) {
        const targetValue = character.skills[skill].expertise + character.attributes[SkillsHelper.getAttributeForSkill(skill)].value;
        const roll = DiceRoller.roll(targetValue, character.skills[skill].focus, difficulty, 2 + extraDice);

        if (character.mysticIconicCareerSuccess) {
            if ([IconicCareer.Inquisitor, IconicCareer.Mortificator, IconicCareer.Seeker, IconicCareer.Watchman, IconicCareer.FuryElite,
                 IconicCareer.WarriorMystic, IconicCareer.HealerMystic, IconicCareer.InterrogatorMystic, IconicCareer.LiaisonMystic,
                 IconicCareer.SeerMystic, IconicCareer.Revisor, IconicCareer.Archon, IconicCareer.Crucifier].indexOf(career) > -1) {
                roll.successes++;
            }
        }

        if (difficulty === 0 || (roll.successes > 0 && !roll.hasRepercusions)) {
            this.selectCareer(career, gauge);
        }
        else {
            this._filter.push(career);
            Dialog.show("Your career attempt failed. You may try another iconic career.");
            this.hideCareerAttempt();
        }
    }

    private selectCareer(career: IconicCareer, difficulty: number) {
        var age = Math.floor(Math.random() * 6) + 2;
        if (career === IconicCareer.FreeMarine) {
            age = 10;
        }
        character.age += age;

        character.addIconicCareer(career, age);

        if (career === IconicCareer.MartialArtist) {
            character.numberTalents = difficulty;
        }

        IconicCareersHelper.applyCareer(career);

        Navigation.navigateToPage(PageIdentity.IconicCareerDetails);
    }

    private onCancel() {
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}