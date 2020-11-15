import * as React from 'react';
import {character, CharacterCareer} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {Dialog} from '../components/dialog';
import {PrimaryCareerSelection} from '../components/primaryCareerSelection';
import {KiSchoolSelection} from '../components/kiSchoolSelection';
import {ApostleSelection} from '../components/apostleSelection';
import {PrimaryCareer, PrimaryCareersHelper} from '../helpers/primaryCareers';
import {Faction, FactionsHelper} from '../helpers/factions';
import {Skill, SkillsHelper} from '../helpers/skills';
import {DiceRoller} from '../helpers/diceRoller';

interface ICareerPageProps {
    showSelection: boolean;
    showApostles: boolean;
}

export class PrimaryCareerPage extends React.Component<IPageProperties, ICareerPageProps> {
    private _candidates: PrimaryCareer[];
    private _cost: number;
    private _hideCancel: boolean;

    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showSelection: false,
            showApostles: false
        };

        this._hideCancel = false;
    }

    render() {
        if (character.faction === Faction.Cybertronic) {
            return this.renderCybertronicPage();
        }

        const free = character.freeCareers.length > 0
            ? <Button text={`FREE CAREERS (${character.freeCareers.length})`} className="button-dark" onClick={() => { this.showCareers("Free") } }/>
            : undefined;

        const rollA = !character.isOptional
            ? (<Button text="ROLL (TABLE A)" className="button-dark" onClick={() => { this.rollCareer("A") } }/>)
            : undefined;

        const selectACost = character.freeBasicCareer || character.firstCareerCostReduction > 0 ? 0 : 1;
        const selectBCost = character.firstCareerCostReduction > 0 ? 0 : 1;
        const rollCDCost = character.firstCareerCostReduction > 0 ? 0 : 1;
        const selectCDCost = character.firstCareerCostReduction > 0 ? 1 : 2;

        const selectA = (<Button text="SELECT (TABLE A)" lpCost={selectACost} className="button-dark" onClick={() => { this.showCareers("A") }}/>);

        const selectB = (<Button text="SELECT (TABLE B)" lpCost={selectBCost} className="button-dark" onClick={() => { this.showCareers("B") }}/>);

        const rollC = !character.isOptional && character.lifePoints > 1
            ? (<Button text="ROLL (TABLE C)" lpCost={rollCDCost} className="button-dark" onClick={() => { this.rollCareer("C") } }/>)
            : undefined;

        const selectC = character.lifePoints > 1
            ? (<Button text="SELECT (TABLE C)" lpCost={selectCDCost} className="button-dark" onClick={() => { this.showCareers("C") } }/>)
            : undefined;

        const rollD = !character.isOptional && character.lifePoints > 1
            ? (<Button text="ROLL (TABLE D)" lpCost={rollCDCost} className="button-dark" onClick={() => { this.rollCareer("D") } }/>)
            : undefined;

        const selectD = (<Button text="SELECT (TABLE D)" lpCost={selectCDCost} className="button-dark" onClick={() => { this.showCareers("D") } }/>);

        const unemployedText = character.isHeretic()
            ? "SACRISTAN"
            : character.isBrother() ? "DISCIPLE" : "UNEMPLOYED";

        const unemployed = character.careers.length < 2
            ? (<Button text={unemployedText} lpCost={-1} className="button-dark" onClick={() => { this.selectCareer(PrimaryCareer.Unemployed); character.lifePoints++; } }/>)
            : (<Button text={unemployedText} className="button-dark" onClick={() => { this.selectCareer(PrimaryCareer.Unemployed) } }/>);

        const heretic = character.allowHeretics && character.patron === undefined
            ? <Button text="BECOME HERETIC" className="button-dark" onClick={() => { this.verifyHeresy(); } } />
            : undefined;

        const content = !this.state.showSelection && !this.state.showApostles ?
            (
                <div>
                    <div className="page-text">
                        Which career did you pursue? Your first career will be a <b>Primary Career</b>.
                        At least, you will go through two careers without additional Life Point costs,
                        but if allowed, you may go through a 3rd and 4th career phase.
                    </div>
                    <div className="button-container">
                        {free}
                        {rollA}
                        {selectA}
                        {selectB}
                        {rollC}
                        {selectC}
                        {rollD}
                        {selectD}
                        {unemployed}
                        {heretic}
                    </div>
                </div>
            )
            : this.state.showSelection
                ? (
                    <PrimaryCareerSelection
                        careers={this._candidates}
                        cost={this._cost}
                        hideCancel={this._hideCancel}
                        onSelection={(career, cost) => { this.selectCareer(career); character.lifePoints -= cost; } }
                        onCancel={() => { this.hideCareers() } }/>
                  )
                : (
                    <ApostleSelection
                        onSelect={() => { this.setState({ showSelection: false, showApostles: false }) } } />
                  );

        return (
            <div className="page">
                <PageHeader text="PRIMARY CAREER" />
                {content}
            </div>
        );
    }

    private renderCybertronicPage() {
        const roll = !character.isOptional
            ? (<Button text="ROLL CAREER" className="button-dark" onClick={() => { this.rollCybertronicCareer() } }/>)
            : undefined;

        const select = character.lifePoints > 1
            ? (<Button text="SELECT CAREER" lpCost={1} className="button-dark" onClick={() => { this.showCareers() } }/>)
            : undefined;

        const heretic = character.allowHeretics && character.patron === undefined
            ? <Button text="BECOME HERETIC" className="button-dark" onClick={() => { this.verifyHeresy(); } } />
            : undefined;

        const content = !this.state.showSelection && !this.state.showApostles ?
            (
                <div>
                    <div className="page-text">
                        Which career did you pursue? Your first career will be a <b>Primary Career</b>.
                        At least, you will go through two careers without additional Life Point costs,
                        but if allowed, you may go through a 3rd and 4th career phase.
                    </div>
                    <div className="button-container">
                        {roll}
                        {select}
                        {heretic}
                    </div>
                </div>
            )
            : this.state.showSelection
                ? (
                    <PrimaryCareerSelection
                        careers={PrimaryCareersHelper.getCybertronicCareers() }
                        cost={1}
                        onSelection={(career, cost) => { this.selectCareer(career); character.lifePoints -= cost; } }
                        onCancel={() => { this.hideCareers() } }/>
                  )
                : (
                    <ApostleSelection
                        onSelect={() => { this.setState({ showSelection: false, showApostles: false }) } } />
                  );

        return (
            <div className="page">
                <PageHeader text="PRIMARY CAREER" />
                {content}
            </div>
        );
    }

    private rollCareer(table: string) {
        if (table === "A") {
            this._candidates = PrimaryCareersHelper.generateCareerFromTableA();

            if (character.rollTwoCareers) {
                this._candidates.push(...PrimaryCareersHelper.generateCareerFromTableA());
            }
        }
        else if (table === "B") {
            this._candidates = PrimaryCareersHelper.generateCareerFromTableB();

            if (character.rollTwoCareers) {
                this._candidates.push(...PrimaryCareersHelper.generateCareerFromTableB());
            }
        }
        else if (table === "C") {
            this._candidates = PrimaryCareersHelper.generateCareerFromTableC();

            if (character.rollTwoCareers) {
                this._candidates.push(...PrimaryCareersHelper.generateCareerFromTableC());
            }
        }
        else if (table === "D") {
            this._candidates = PrimaryCareersHelper.generateCareerFromTableD();

            if (character.rollTwoCareers) {
                this._candidates.push(...PrimaryCareersHelper.generateCareerFromTableD());
            }
        }

        if (this._candidates.length > 1) {
            this._cost = 0;
            this._hideCancel = true;
            this.showCareers();
        }
        else {
            if (table === "B") {
                character.lifePoints--;
            }
            else if (table === "C" || table === "D") {
                character.lifePoints -= 2;
            }

            this.selectCareer(this._candidates[0]);
        }
    }

    private rollCybertronicCareer() {
        this.selectCareer(PrimaryCareersHelper.generateCybertronicCareer());
    }

    private showCareers(table?: string) {
        if (table) {
            if (table === "A") {
                this._cost = 1;
                this._hideCancel = false;
                this._candidates = PrimaryCareersHelper.getCareersFromTableA();
            }
            else if (table === "B") {
                this._cost = 1;
                this._hideCancel = false;
                this._candidates = PrimaryCareersHelper.getCareersFromTableB();
            }
            else if (table === "C") {
                this._cost = 2;
                this._hideCancel = false;
                this._candidates = PrimaryCareersHelper.getCareersFromTableC();
            }
            else if (table === "D") {
                this._cost = 2;
                this._hideCancel = false;
                this._candidates = PrimaryCareersHelper.getCareersFromTableD();
            }
            else if (table === "Free") {
                this._cost = 0;
                this._hideCancel = false;
                this._candidates = character.freeCareers;
            }
        }

        this.setState({
            showSelection: true,
            showApostles: false
        });
    }

    private hideCareers() {
        this.setState({
            showSelection: false,
            showApostles: false
        });
    }

    private selectCareer(career: PrimaryCareer, isFreeCareer?: boolean) {
        const age = Math.floor(Math.random() * 6) + 2;
        character.age += age;

        if (career === PrimaryCareer.Unemployed && character.isHeretic()) {
            career = PrimaryCareer.Sacristan;
        }
        else if (career === PrimaryCareer.Unemployed && character.isBrother()) {
            career = PrimaryCareer.Disciple;
        }

        character.addPrimaryCareer(career, age);

        if (isFreeCareer) {
            character.freeCareers.splice(character.freeCareers.indexOf(career), 1);
        }

        PrimaryCareersHelper.applyCareer(career);

        Navigation.navigateToPage(character.getCareerPage(PageIdentity.PrimaryCareerDetails1));
    }

    private verifyHeresy() {
        Dialog.showYesNo(
            "Do you want to become a Heretic? This will grant you benefits from the Darkness but also make you a target for anti-Darkness factions.",
            () => {
                this.setState({
                    showSelection: false,
                    showApostles: true
                });
            },
            () => {
            }
        );
    }
}