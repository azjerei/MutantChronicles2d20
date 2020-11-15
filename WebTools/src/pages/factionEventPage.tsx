import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {DropDownInput} from '../components/dropDownInput';
import {FactionEventModel, FactionEventsHelper} from '../helpers/factionEvents';
import {Faction} from '../helpers/factions';
import {Source} from '../helpers/sources';

interface IAdolescenceEventPageProps {
    showEvent: boolean;
}

export class FactionEventPage extends React.Component<IPageProperties, IAdolescenceEventPageProps> {
    private _event: FactionEventModel;
    private _option: string;

    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showEvent: false
        };
    }

    render() {
        const roll = (<Button text="ROLL FACTION EVENT" className="button-dark" onClick={() => { this.rollFactionEvents() } }/>);

        const reroll = character.lifePoints >= 1
            ? (<Button className="button-dark" text="REROLL" lpCost={1} onClick={() => { this.reroll() } }/>)
            : undefined;

        const options = this._event && this._event.options.length > 0
            ? (
                <div>
                    <DropDownInput
                        items={this._event.options}
                        defaultValue={this._option}
                        onChange={(index) => this._option = this._event.options[index]}/>
                </div>
              )
            : undefined;

        const statusButtonLabel = character.faction === Faction.Cybertronic
            ? "PILLAR"
            : character.faction === Faction.Imperial
                ? "CLAN"
                : "STATUS";

        const content = !this.state.showEvent ?
            (
                <div>
                    <div className="page-text">
                        Did any significant event occur during your time in your birth faction?
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
                        <div className="option-header">{this._event.description}</div>
                        {options}
                        <br/>
                        {reroll}
                    </div>
                    <Button className="button-next" text={statusButtonLabel} onClick={() => { this.onNext() } }/>
                </div>
            );

        return (
            <div className="page">
                <PageHeader text="FACTION EVENT" />
                {content}
            </div>
        );
    }

    private rollFactionEvents() {
        var ev = FactionEventsHelper.generateEvent(character.heritage);
        this._event = ev;

        if (ev.options && ev.options.length > 0) {
            this._option = ev.options[0];
            this._event.onOptionSelected(this._option);
        }

        this.setState({ showEvent: true });
    }

    private reroll() {
        character.lifePoints--;
        this.rollFactionEvents();
        this.forceUpdate();
    }

    private onNext() {
        character.factionEvent = this._event.description;

        if (this._option) {
            this._event.onOptionSelected(this._option);
        }

        this._event.onApply();

        if (character.faction === Faction.Cybertronic && character.hasSource(Source.Cybertronic)) {
            Navigation.navigateToPage(PageIdentity.Pillar);
        }
        else if (character.faction === Faction.Imperial && character.hasSource(Source.Imperial)) {
            Navigation.navigateToPage(PageIdentity.Clan);
        }
        else {
            Navigation.navigateToPage(PageIdentity.Status);
        }
    }
}