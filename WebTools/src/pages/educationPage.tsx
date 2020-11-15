import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {Dialog} from '../components/dialog';
import {EducationSelection} from '../components/educationSelection';
import {ApostleSelection} from '../components/apostleSelection';
import {CybertronicEducationSelection} from '../components/cybertronicEducationSelection';
import {Education, EducationsHelper} from '../helpers/educations';
import {Faction} from '../helpers/factions';
import {Status} from '../helpers/status';
import {ClanEducations} from '../helpers/clanEducations';
import {Source} from '../helpers/sources';

interface IEducationPageProps {
    showSelection: boolean;
    showStandard: boolean;
    showElite: boolean;
    showApostles: boolean;
}

export class EducationPage extends React.Component<IPageProperties, IEducationPageProps> {
    private _candidates: Education[];
    private _cost: number = 1;
    private _hideCancel: boolean;

    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showSelection: false,
            showApostles: false,
            showStandard: false,
            showElite: false
        };

        this._hideCancel = false;
    }

    render() {
        if (character.heritage === Faction.Cybertronic && character.hasSource(Source.Cybertronic)) {
            return this.renderCybertronicEducationPage();
        }
        else if (character.heritage === Faction.Mishima && character.hasSource(Source.Mishima)) {
            return this.renderMishimaEducationPage();
        }
        else if (character.heritage === Faction.Imperial && character.hasSource(Source.Imperial)) {
            return this.renderImperialEducationPage();
        }

        const free = character.freeEducations.length > 0
            ? <Button text={`FREE EDUCATIONS (${character.freeEducations.length})`} className="button-dark" onClick={() => { this.showEducations("Free") } }/>
            : undefined;

        const rollA = !character.isOptional
            ? (<Button text="ROLL (TABLE A)" className="button-dark" onClick={() => { this.rollEducation("A") } }/>)
            : undefined;

        const selectA = (<Button text="SELECT (TABLE A)" lpCost={1} className="button-dark" onClick={() => { this.showEducations("A") } }/>);

        const rollBCost = character.reduceBCEducationCost ? 0 : 1;

        const rollB = !character.isOptional && character.lifePoints >= rollBCost
            ? (<Button text="ROLL (TABLE B)" lpCost={rollBCost} className="button-dark" onClick={() => { this.rollEducation("B") } }/>)
            : undefined;

        const selectB = (<Button text="SELECT (TABLE B)" lpCost={1} className="button-dark" onClick={() => { this.showEducations("B") } }/>);

        const rollCCost = character.reduceBCEducationCost ? 1 : 2;

        const rollC = !character.isOptional && character.lifePoints >= rollCCost
            ? (<Button text="ROLL (TABLE C)" lpCost={rollCCost} className="button-dark" onClick={() => { this.rollEducation("C") } }/>)
            : undefined;

        const selectC = (<Button text="SELECT (TABLE C)" lpCost={2} className="button-dark" onClick={() => { this.showEducations("C") } }/>);

        const apprenticeship = character.reduceApprenticeshipCost
            ? <Button text="SELECT BROTHERHOOD APPRENTICESHIP" lpCost={1} className="button-dark" onClick={() => { this.selectEducation(Education.BrotherhoodApprenticeship); character.lifePoints -= 1; } }/>
            : undefined;

        const heretic = character.allowHeretics && character.patron === undefined
            ? <Button text="BECOME HERETIC" className="button-dark" onClick={() => { this.verifyHeresy(); } } />
            : undefined;

        const content = !this.state.showSelection && !this.state.showApostles ?
            (
                <div>
                    <div className="page-text">
                        What kind of education did you get?
                        <br/><br/>
                        With your GM's approval, you may become a Heretic at this stage.
                    </div>
                    <div className="button-container">
                        {free}
                        {rollA}
                        {selectA}
                        {rollB}
                        {selectB}
                        {rollC}
                        {selectC}
                        {apprenticeship}
                        {heretic}
                    </div>
                </div>
            )
            : this.state.showSelection
                ? (
                    <EducationSelection
                        educations={this._candidates}
                        cost={this._cost}
                        hideCancel={this._hideCancel}
                        onSelection={(env, cost) => { this.selectEducation(env); character.lifePoints -= cost; } }
                        onCancel={() => { this.hideEducations() } } />
                  )
                : (
                    <ApostleSelection
                        onSelect={() => { this.setState({ showSelection: false, showApostles: false, showStandard: false, showElite: false }) } } />
                  );
        return (
            <div className="page">
                <PageHeader text="EDUCATION" />
                {content}
            </div>
        );
    }

    private renderCybertronicEducationPage() {
        const roll = !character.isOptional
            ? (<Button text="ROLL EDUCATION" className="button-dark" onClick={() => { this.rollCybertronicEducation() } }/>)
            : undefined;

        const select = (<Button text="SELECT EDUCATION" lpCost={0} className="button-dark" onClick={() => { this.showEducations() } }/>);

        const heretic = character.allowHeretics && character.patron === undefined
            ? <Button text="BECOME HERETIC" className="button-dark" onClick={() => { this.verifyHeresy(); } } />
            : undefined;

        const content = !this.state.showSelection ?
            (
                <div>
                    <div className="page-text">
                        What kind of education did you get?
                    </div>
                    <div className="button-container">
                        {roll}
                        {select}
                        {heretic}
                    </div>
                </div>
            )
            : (
                <CybertronicEducationSelection
                    onSelection={(env, cost) => { this.selectEducation(env); character.lifePoints -= cost; } }
                    onCancel={() => { this.hideEducations() } } />
            );
        return (
            <div className="page">
                <PageHeader text="EDUCATION" />
                {content}
            </div>
        );
    }

    private renderMishimaEducationPage() {
        const roll = !character.isOptional
            ? (<Button text="ROLL EDUCATION" className="button-dark" onClick={() => { this.rollMishimaEducation() } }/>)
            : undefined;

        const select = (<Button text="SELECT EDUCATION" lpCost={0} className="button-dark" onClick={() => { this.showEducations() } }/>);

        const heretic = character.allowHeretics && character.patron === undefined
            ? <Button text="BECOME HERETIC" className="button-dark" onClick={() => { this.verifyHeresy(); } } />
            : undefined;

        const content = !this.state.showSelection ?
            (
                <div>
                    <div className="page-text">
                        What kind of education did you get?
                    </div>
                    <div className="button-container">
                        {roll}
                        {select}
                        {heretic}
                    </div>
                </div>
            )
            : (
                <EducationSelection
                    educations={character.isSamurai() ? EducationsHelper.getSamuraiEducations() : EducationsHelper.getCommonerEducations() }
                    cost={this._cost}
                    hideCancel={this._hideCancel}
                    onSelection={(env, cost) => { this.selectEducation(env); character.lifePoints -= cost; } }
                    onCancel={() => { this.hideEducations() } } />
              );
        return (
            <div className="page">
                <PageHeader text="EDUCATION" />
                {content}
            </div>
        );
    }

    private renderImperialEducationPage() {
        const roll = !character.isOptional
            ? (<Button text="ROLL EDUCATION" className="button-dark" onClick={() => { this.rollImperialEducation() } }/>)
            : undefined;
        
        const heretic = character.allowHeretics && character.patron === undefined
            ? <Button text="BECOME HERETIC" className="button-dark" onClick={() => { this.verifyHeresy(); } } />
            : undefined;

        const stdEducations = ClanEducations.getStandardSchools(character.clan);
        const selectStd = stdEducations
            ? (<Button text="SELECT STANDARD SCHOOL" lpCost={1} className="button-dark" onClick={() => { this.showStandardEducations() } }/>)
            : undefined;

        const eliteEducations = ClanEducations.getEliteSchools(character.clan);
        const selectElite = eliteEducations
            ? (<Button text="SELECT ELITE SCHOOL" lpCost={2} className="button-dark" onClick={() => { this.showEliteEducations() } }/>)
            : undefined;

        const content = !this.showEducations && !this.state.showStandard && !this.state.showElite ?
            (
                <div>
                    <div className="page-text">
                        What kind of education did you get?
                    </div>
                    <div className="button-container">
                        {roll}
                        {selectStd}
                        {selectElite}
                        {heretic}
                    </div>
                </div>
            )
            : this.state.showStandard
                ? (
                    <EducationSelection
                        educations={stdEducations}
                        cost={1}
                        hideCancel={this._hideCancel}
                        onSelection={(env, cost) => { this.selectEducation(env); character.lifePoints -= cost; } }
                        onCancel={() => { this.hideEducations() } } />
                  )
                : this.state.showElite
                    ? (
                        <EducationSelection
                            educations={eliteEducations}
                            cost={2}
                            hideCancel={this._hideCancel}
                            onSelection={(env, cost) => { this.selectEducation(env); character.lifePoints -= cost; } }
                            onCancel={() => { this.hideEducations() } } />
                      )
                    : this.state.showSelection
                        ? (
                            <EducationSelection
                                educations={this._candidates}
                                cost={this._cost}
                                hideCancel={this._hideCancel}
                                onSelection={(env, cost) => { this.selectEducation(env); character.lifePoints -= cost; } }
                                onCancel={() => { this.hideEducations() } } />
                          )
                        : <div className="button-container">
                            {roll}
                            {selectStd}
                            {selectElite}
                            {heretic}
                          </div>;
        return (
            <div className="page">
                <PageHeader text="EDUCATION" />
                {content}
            </div>
        );
    }

    private rollEducation(table: string) {
        if (table === "A") {
            this._candidates = EducationsHelper.generateEducationFromTableA();
        }
        else if (table === "B") {
            this._candidates = EducationsHelper.generateEducationFromTableB();
        }
        else if (table === "C") {
            this._candidates = EducationsHelper.generateEducationFromTableC();
        }

        if (this._candidates.length > 1) {
            this._cost = 0;
            this._hideCancel = true;
            this.showEducations();
        }
        else {
            if (table === "B") {
                character.lifePoints--;
            }
            else if (table === "C") {
                character.lifePoints -= 2;
            }

            this.selectEducation(this._candidates[0]);
        }
    }

    private rollCybertronicEducation() {
        this.selectEducation(EducationsHelper.generateCybertronicEducation());
    }

    private rollMishimaEducation() {
        const edu = character.isSamurai()
            ? EducationsHelper.generateSamuraiEducation()
            : EducationsHelper.generateCommonerEducation();

        if (edu.length === 1) {
            this.selectEducation(edu[0]);
        }
        else {
            this._candidates = edu;
            this._cost = 0;
            this._hideCancel = true;
            this.showEducations();
        }
    }

    private rollImperialEducation() {
        const edu = ClanEducations.generateEducation(character.clan);
        if (edu.length === 1) {
            this.selectEducation(edu[0]);
        }
        else {
            this._candidates = edu;
            this._cost = 0;
            this._hideCancel = true;
            this.showEducations();
        }
    }

    private showEducations(table?: string) {
        this._hideCancel = false;

        if (table) {
            if (table === "A") {
                this._cost = 1;
                this._candidates = EducationsHelper.getEducationsFromTableA();

                if (character.faction === Faction.Bauhaus && character.hasSource(Source.Bauhaus)) {
                    if (character.status != Status.Thrall) {
                        this._candidates = this._candidates.filter(c => c !== Education.GrewUpOnTheStreets);
                    }
                }
            }
            else if (table === "B") {
                this._cost = 1;
                this._candidates = EducationsHelper.getEducationsFromTableB();
            }
            else if (table === "C") {
                this._cost = 2;
                this._candidates = EducationsHelper.getEducationsFromTableC();

                if (character.reduceApprenticeshipCost) {
                    this._candidates = this._candidates.filter(c => c !== Education.BrotherhoodApprenticeship);
                }
            }
            else if (table === "Free") {
                this._cost = 0;
                this._candidates = character.freeEducations;
            }
        }

        this.setState({ showSelection: true, showApostles: false, showStandard: false, showElite: false });
    }

    private showStandardEducations() {
        this.setState({ showSelection: false, showApostles: false, showStandard: true, showElite: false });
    }

    private showEliteEducations() {
        this.setState({ showSelection: false, showApostles: false, showStandard: false, showElite: true });
    }

    private hideEducations() {
        this.setState({ showSelection: false, showApostles: false, showStandard: false, showElite: false });
    }

    private selectEducation(edu: Education) {
        if (edu === Education.RollStandard) {
            edu = ClanEducations.generateSchool(ClanEducations.getStandardSchools(character.clan))[0];
        }
        else if (edu === Education.RollElite) {
            edu = ClanEducations.generateSchool(ClanEducations.getEliteSchools(character.clan))[0];
        }

        character.education = edu;
        EducationsHelper.applyEducation(edu);
        Navigation.navigateToPage(PageIdentity.EducationDetails);
    }

    private verifyHeresy() {
        Dialog.showYesNo(
            "Do you want to become a Heretic? This will grant you benefits from the Darkness but also make you a target for anti-Darkness factions.",
            () => {
                this.setState({
                    showSelection: false,
                    showApostles: true,
                    showStandard: false,
                    showElite: false
                });
            },
            () => {
            }
        );
    }
}