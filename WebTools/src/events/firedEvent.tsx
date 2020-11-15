import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {Button} from '../components/button';
import {PageIdentity} from '../pages/pageFactory';

interface IFiredEventProperties {
}

export class FiredEvent extends React.Component<IFiredEventProperties, {}> {
    constructor(props: IFiredEventProperties) {
        super(props);
    }

    render() {
        const ignore = character.ignoreFired && character.earnings > 0
            ? (<Button text="IGNORE *" lpCost={0} className="button-dark" onClick={() => this.onIgnoreFired(true) }/>)
            : character.superPoints > 0
                ? (<Button text="IGNORE **" lpCost={0} className="button-dark" onClick={() => this.onIgnoreFired(false) }/>)
                : undefined;

        const extend = character.careers.length > 0 && !character.careers[character.careers.length - 1].isExtended && character.earnings > 0
            ? (<Button text="EXTEND CAREER *" lpCost={2} className="button-dark" onClick={() => this.onExtendCareer() }/>)
            : undefined;

        const cont = character.careers.length < 4 && character.earnings > 0
            ? (<Button text="CONTINUE CAREER *" lpCost={2} className="button-dark" onClick={() => this.onContinueCareer() }/>)
            : undefined;

        const newCareer = character.careers.length < 4
            ? (<Button text="NEW CAREER" className="button-dark" onClick={() => this.onNewCareer() }/>)
            : undefined;

        const finish = character.careers.length >= 2
            ? (<Button text="FINISH" className="button-dark" onClick={() => this.onFinish() }/>)
            : undefined;

        return (
            <div>
                <div className="panel">
                    <div>
                        You have been Fired from your current career! How do you want to proceed?
                    </div>
                    <div className="button-container">
                        {ignore}
                        {extend}
                        {cont}
                        {newCareer}
                        {finish}
                    </div>
                    <div style={{ fontSize: "small" }}>
                        *: Selecting these options will reduce your Earnings by 1.
                        <br/>
                        **: Selecting this option will cost 1 Promotion.
                    </div>
                </div>
            </div>
        );
    }

    private onIgnoreFired(ignore: boolean) {
        if (ignore) {
            character.ignoreFired = false;
            character.earnings = Math.max(0, character.earnings - 1);
        }
        else {
            character.superPoints--;
        }

        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }

    private onExtendCareer() {
        const years = Math.floor(Math.random() * 6) + 1;
        character.age += years;
        character.careers[character.careers.length - 1].isExtended = true;
        character.careers[character.careers.length - 1].years += years;
        character.lifePoints -= 2;
        character.earnings = Math.max(0, character.earnings - 1);

        Navigation.navigateToPage(character.getCareerPage(PageIdentity.CareerEvent1));
    }

    private onContinueCareer() {
        const years = Math.floor(Math.random() * 6) + 1;
        character.age += years;
        character.careers.push(character.careers[character.careers.length - 1]);
        character.careers[character.careers.length - 1].years = years;
        character.lifePoints -= 2;
        character.earnings = Math.max(0, character.earnings - 1);

        Navigation.navigateToPage(character.getCareerPage(PageIdentity.PrimaryCareerDetails1));
    }

    private onNewCareer() {
        Navigation.navigateToPage(character.getCareerPage(PageIdentity.PrimaryCareer1));
    }

    private onFinish() {
        if (character.isHeretic() && (character.numDarkGifts > 0 || character.numBoons > 0)) {
            Navigation.navigateToPage(PageIdentity.DarkGifts);
        }
        else {
            Navigation.navigateToPage(character.isOptional ? PageIdentity.FinalTweaks : PageIdentity.FinalTweaks_LifePoints);
        }
    }
}