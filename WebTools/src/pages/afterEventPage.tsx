import * as React from 'react';
import {character, CharacterCareer} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {Button} from '../components/button';
import {Dialog} from '../components/dialog';
import {ApostleSelection} from '../components/apostleSelection';
import {Faction} from '../helpers/factions';
import {Source} from '../helpers/sources';

interface IPageState {
    showApostles: boolean;
}

export class AfterEventPage extends React.Component<IPageProperties, IPageState> {
    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showApostles: false
        };
    }

    render() {
        const finish = character.careers.length >= 2
            ? (<Button className="button-dark" text="FINISH" onClick={() => { this.onFinish() } } />)
            : undefined;

        const continueCareer = !character.careers[character.careers.length - 1].isIconic
            ? character.careers.length < 2
                ? (<Button className="button-dark" text="CONTINUE CAREER" onClick={() => { this.onContinue() } }/>)
                : character.careers.length < 4 && character.lifePoints >= 1
                    ? (<Button className="button-dark" text="CONTINUE CAREER" lpCost={1} onClick={() => { this.onContinue() } }/>)
                    : undefined
            : undefined;

        const newPrimaryCareer = character.careers.length < 2
            ? (<Button className="button-dark" text="NEW PRIMARY CAREER" onClick={() => { this.onNew() } }/>)
            : character.careers.length < 4 && character.lifePoints >= 1
                ? (<Button className="button-dark" text="NEW PRIMARY CAREER" lpCost={1} onClick={() => { this.onNew() } }/>)
                : undefined;

        var iconicCareer: JSX.Element = undefined;
        if (!character.hasAnIconicCareer()) {
            if (character.careers.length < 2) {
                iconicCareer = (<Button className="button-dark" text="ICONIC CAREER" onClick={() => { this.onIconic() } }/>);
            }
            else if (character.careers.length < 4 && character.lifePoints >= 1) {
                iconicCareer = (<Button className="button-dark" text="ICONIC CAREER" lpCost={1} onClick={() => { this.onIconic() } }/>);
            }
        }

        const heretic = character.allowHeretics && character.patron === undefined
            ? <Button text="BECOME HERETIC" className="button-dark" onClick={() => { this.verifyHeresy(); } } />
            : undefined;

        if (!this.state.showApostles) {
            return (
                <div className="page">
                    <div className="page-text">
                        Select an option to continue.
                    </div>
                    <div className="button-container">
                        {finish}
                        {continueCareer}
                        {newPrimaryCareer}
                        {iconicCareer}
                        {heretic}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="page">
                    <ApostleSelection onSelect={() => this.setState({ showApostles: false }) }/>
                </div>
            );
        }
    }

    private onFinish() {
        if (character.isHeretic() && (character.numDarkGifts > 0 || character.numBoons > 0)) {
            Navigation.navigateToPage(PageIdentity.DarkGifts);
        }
        else {
            Navigation.navigateToPage(character.isOptional ? PageIdentity.FinalTweaks : PageIdentity.FinalTweaks_LifePoints);
        }
    }

    private onContinue() {
        if (character.careers.length >= 2) {
            character.lifePoints--;
        }

        const career = character.careers[character.careers.length - 1].career;
        const age = Math.floor(Math.random() * 6) + 1;
        character.age += age;
        character.careers.push(new CharacterCareer(career, age));

        Navigation.navigateToPage(character.getCareerPage(PageIdentity.PrimaryCareerDetails1));
    }

    private onNew() {
        //if (character.careers.length >= 2) { // TODO: move
        //    character.lifePoints--;
        //}

        Navigation.navigateToPage(character.getCareerPage(PageIdentity.PrimaryCareer1));
    }

    private onIconic() {
        //if (character.careers.length >= 2) { // TODO: move
        //    character.lifePoints--;
        //}

        Navigation.navigateToPage(PageIdentity.IconicCareer);
    }

    private verifyHeresy() {
        Dialog.showYesNo(
            "Do you want to become a Heretic? This will grant you benefits from the Darkness but also make you a target for anti-Darkness factions.",
            () => {
                this.setState({
                    showApostles: true
                });
            },
            () => {
            }
        );
    }
}