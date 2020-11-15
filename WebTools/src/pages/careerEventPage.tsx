import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {CareerEventModel} from '../common/eventModel';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {DropDownInput} from '../components/dropDownInput';
import {SuperPointSpend} from '../components/superPointSpend';
import {Dialog} from '../components/dialog';
import {CareerEventsHelper} from '../helpers/careerEvents';
import {Status} from '../helpers/status';
import {KiSchoolsHelper} from '../helpers/kiSchools';

interface ICareerEventPageProps {
    showEvent: boolean;
    showMultiEvents: boolean;
}

export class CareerEventPage extends React.Component<IPageProperties, ICareerEventPageProps> {
    private _option: string;
    private _hereticOption: string;
    private _extraEvents: number;
    private _multiEvents: CareerEventModel[];

    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showEvent: false,
            showMultiEvents: false
        };
    }

    render() {
        const roll = (<Button text="ROLL CAREER EVENT" className="button-dark" onClick={() => { this.rollCareerEvent() } }/>);

        const superPoints = character.superPoints > 0
            ? (
                <div>
                    <SuperPointSpend
                        text="Roll an additional event for each Promotion Point/Federation Commendation spent."
                        onChange={(val) => { this._extraEvents = val; } }/>
                </div>
              )
            : undefined;

        const reroll = character.eventRerolls > 0
            ? (<Button className="button-dark" text="REROLL" onClick={() => { this.reroll() } }/>)
            : character.lifePoints >= 1
                ? (<Button className="button-dark" text="REROLL" lpCost={1} onClick={() => { this.reroll() } }/>)
                : undefined;

        const currentEvent = character.careerEvents.length > 0 ? character.careerEvents[character.careerEvents.length - 1] : null;

        const options = currentEvent && currentEvent.options && currentEvent.options.length > 0
            ? (
                <div>
                    <DropDownInput
                        items={currentEvent.options}
                        defaultValue={this._option}
                        onChange={(index) => this._option = currentEvent.options[index]}/>
                </div>
            )
            : undefined;

        const trait = currentEvent && currentEvent.trait.length > 0
            ? (<div><b>Trait: </b> {currentEvent.trait}</div>)
            : undefined;

        let hereticEvent: JSX.Element = undefined;
        if (currentEvent && currentEvent.hereticEvent) {
            const hereticOptions = currentEvent.hereticEvent.options
                ? (
                    <div>
                        <DropDownInput
                            items={currentEvent.hereticEvent.options}
                            defaultValue={this._hereticOption}
                            onChange={(index) => this._hereticOption = currentEvent.hereticEvent.options[index]}/>
                    </div>
                )
                : undefined;

            hereticEvent = (
                <div>
                    <PageHeader text="HERETIC EVENT" />
                    <div className="option-header">{currentEvent.hereticEvent.event}</div>
                    {hereticOptions}
                </div>
            );
        }

        const multiEvents = this._multiEvents ? this._multiEvents.map((e, i) => {
            return (
                <div key={i}>
                    <div className="panel">
                        <div className="option-header">{e.event}</div>
                        <Button className="button-small" text="SELECT" onClick={() => { this.onSelectMultiEvent(i) } }/>
                    </div>
                    <br/>
                </div>
            );
        })
        : undefined;

        const content = !this.state.showEvent && !this.state.showMultiEvents ?
            (
                <div>
                    <div className="page-text">
                        While working your career, what was the most significant event in your life?
                    </div>
                    <div className="button-container">
                        {roll}
                        <br/>
                        {superPoints}
                    </div>
                </div>
            )
            : this.state.showMultiEvents ?
                (
                    <div className="page">
                        {multiEvents}
                    </div>
                )
                :
                (
                    <div>
                        <div className="panel">
                            <div className="option-header">{character.careerEvents[character.careerEvents.length - 1].event}</div>
                            {trait}
                            {options}
                            <br/>
                            {hereticEvent}
                            <br/>
                            {reroll}
                        </div>
                        <Button className="button-next" text="NEXT" onClick={() => { this.onNext() } }/>
                    </div>
                )

        return (
            <div className="page">
                <PageHeader text="CAREER EVENT" />
                {content}
            </div>
        );
    }

    private rollCareerEvent() {
        if (!this._extraEvents) {
            var ev = CareerEventsHelper.generateEvent();
            character.careerEvents.push(ev);
            this.setState({ showEvent: true, showMultiEvents: false });
        }
        else {
            this._multiEvents = CareerEventsHelper.generateEvents(this._extraEvents);
            this.setState({ showMultiEvents: true, showEvent: false });
        }

        
    }

    private reroll() {
        character.careerEvents.splice(character.careerEvents.length - 1, 1);

        if (character.eventRerolls > 0) {
            character.eventRerolls--;
        }
        else {
            character.lifePoints--;
        }
        this.rollCareerEvent();
        this.forceUpdate();
    }

    private onSelectMultiEvent(index: number) {
        character.careerEvents.push(this._multiEvents[index]);
        this.setState({ showEvent: true, showMultiEvents: false });
    }

    private onNext() {
        const currentEvent = character.careerEvents.length > 0 ? character.careerEvents[character.careerEvents.length - 1] : null;

        if (this._option) {
            currentEvent.onOptionSelected(this._option);
        }

        if (this._hereticOption && currentEvent.hereticEvent) {
            currentEvent.hereticEvent.onOptionSelected(this._hereticOption);
        }

        if (currentEvent.onApply) {
            currentEvent.onApply();
        }

        if (currentEvent.hereticEvent && currentEvent.hereticEvent.onApply) {
            currentEvent.hereticEvent.onApply();
        }

        let showPersecutionPrompt = false;

        if (!character.isPersecuted) {
            if (character.status === Status.Faceless ||
                character.status === Status.Ronin ||
                KiSchoolsHelper.isPersecuted(character.kiSchool)) {
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
                () => {
                    if (character.careerEvents[character.careerEvents.length - 1].detailView) {
                        character.pendingEvents.push(character.careerEvents[character.careerEvents.length - 1]);
                        Navigation.navigateToPage(PageIdentity.EventDetails);
                    }
                    else {
                        Navigation.navigateToPage(PageIdentity.AfterEvent);
                    }
                });
            return;
        }
        else {
            if (character.careerEvents[character.careerEvents.length - 1].detailView) {
                character.pendingEvents.push(character.careerEvents[character.careerEvents.length - 1]);
                Navigation.navigateToPage(PageIdentity.EventDetails);
            }
            else {
                Navigation.navigateToPage(PageIdentity.AfterEvent);
            }
        }
    }
}