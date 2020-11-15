import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {DropDownInput} from '../components/dropDownInput';
import {Dialog} from '../components/dialog';
import {AdolescenceEventsHelper} from '../helpers/adolescenceEvents';
import {Status} from '../helpers/status';
import { Source } from '../helpers/sources';
import { MutationsHelper } from '../helpers/mutations';
import { TalentsHelper } from '../helpers/talents';

interface IAdolescenceEventPageProps {
    showEvent: boolean;
}

export class AdolescenceEventPage extends React.Component<IPageProperties, IAdolescenceEventPageProps> {
    private _option: string;
    private _hereticOption: string;

    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showEvent: false
        };
    }

    render() {
        const roll = (<Button text="ROLL ADOLESCENCE EVENT" className="button-dark" onClick={() => { this.rollAdolescenceEvent() } }/>);

        const reroll = (<Button className="button-dark" text="REROLL" lpCost={1} onClick={() => { this.reroll() } }/>);

        const options = character.adolescenceEvent && character.adolescenceEvent.options
            ? (
                <div>
                    <DropDownInput
                        items={character.adolescenceEvent.options}
                        defaultValue={this._option}
                        onChange={(index) => {
                            this._option = character.adolescenceEvent.options[index];
                            this.forceUpdate();
                        }}/>
                </div>
            )
            : undefined;

        const optiondesc = character.adolescenceEvent && character.adolescenceEvent.trait === "Mutant" && this._option
            ? (
                <div className="talent-desc">
                    {character.hasSource(Source.Mutants) ? MutationsHelper.getMutationByName(this._option).description : TalentsHelper.getTalent(this._option).description}
                </div>
              )
            : undefined;

        const trait = character.adolescenceEvent && character.adolescenceEvent.trait.length > 0
            ? (<div><b>Trait:</b> {character.adolescenceEvent.trait}</div>)
            : undefined;

        let hereticEvent: JSX.Element = undefined;
        if (character.adolescenceEvent && character.adolescenceEvent.hereticEvent) {
            const hereticOptions = character.adolescenceEvent.hereticEvent.options
                ? (
                    <div>
                        <DropDownInput
                            items={character.adolescenceEvent.hereticEvent.options}
                            defaultValue={this._hereticOption}
                            onChange={(index) => this._hereticOption = character.adolescenceEvent.hereticEvent.options[index]}/>
                    </div>
                )
                : undefined;

            hereticEvent = (
                <div>
                    <PageHeader text="HERETIC EVENT" />
                    <div className="option-header">{character.adolescenceEvent.hereticEvent.event}</div>
                    {hereticOptions}
                </div>
            );
        }

        const content = !this.state.showEvent ?
            (
                <div>
                    <div className="page-text">
                        At some point during your adolescence, you experienced a defining event which still shapes who you are today.
                    </div>
                    <div className="button-container">
                        {roll}
                    </div>
                </div>
            )
            :
            (
                <div>
                    <div className="panel">
                        <div className="option-header">{character.adolescenceEvent.event}</div>
                        {trait}
                        {options}
                        {optiondesc}
                        <br/>
                        {hereticEvent}
                        <br/>
                        {reroll}
                    </div>
                    <Button className="button-next" text="PRIMARY CAREER" onClick={() => { this.onNext() } }/>
                </div>
            )
        return (
            <div className="page">
                <PageHeader text="ADOLESCENCE EVENT" />
                {content}
            </div>
        );
    }

    private rollAdolescenceEvent() {
        var ev = AdolescenceEventsHelper.generateEvent();
        character.adolescenceEvent = ev;

        if (ev.options) {
            this._option = ev.options[0];
        }

        this.setState({ showEvent: true });
    }

    private reroll() {
        character.lifePoints--;
        this.rollAdolescenceEvent();
        this.forceUpdate();
    }

    private onNext() {
        if (this._option) {
            character.adolescenceEvent.onOptionSelected(this._option);
        }

        if (this._hereticOption && character.adolescenceEvent.hereticEvent) {
            character.adolescenceEvent.hereticEvent.onOptionSelected(this._hereticOption);
        }

        if (character.adolescenceEvent.onApply) {
            character.adolescenceEvent.onApply();
        }

        if (character.adolescenceEvent.hereticEvent && character.adolescenceEvent.hereticEvent.onApply) {
            character.adolescenceEvent.hereticEvent.onApply();
        }

        let showPersecutionPrompt = false;

        if (!character.isPersecuted) {
            if (character.status === Status.Faceless || character.status === Status.Ronin) {
                if (Math.floor(Math.random() * 20) + 1 <= 5) {
                    if (!character.ignorePersecution) {
                        character.isPersecuted = true;
                        character.addEvent("You are persecuted by a member of the Samurai.");
                        showPersecutionPrompt = true;
                    }
                    else {
                        character.ignorePersecution = false;
                    }
                }
            }
        }

        if (showPersecutionPrompt) {
            Dialog.show("You have been found out and is now persecuted by a member of the Samurai.",
                () => { Navigation.navigateToPage(character.getCareerPage(PageIdentity.PrimaryCareer1)); });
            return;
        }
        else {
            Navigation.navigateToPage(character.getCareerPage(PageIdentity.PrimaryCareer1));
        }
    }
}