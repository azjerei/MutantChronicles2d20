import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {ClanSelection} from '../components/clanSelection';
import {Clan, ClansHelper} from '../helpers/clans';

interface IClanPageState {
    showSelection: boolean;
}

export class ClanPage extends React.Component<IPageProperties, IClanPageState> {
    private _hideCancel: boolean;
    private _cost: number;

    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showSelection: false
        };

        this._hideCancel = false;
        this._cost = 1;
    }

    render() {
        const roll = !character.isOptional
            ? (<Button text="ROLL CLAN" className="button-dark" onClick={() => { this.rollClan() } }/>)
            : undefined;

        const select = (<Button text="SELECT CLAN" lpCost={1} className="button-dark" onClick={() => { this.showClans() } }/>);

        const content = !this.state.showSelection ?
            (
                <div>
                    <div className="page-text">
                        The clans and companies of Imperial are scattered far and wide across the solar system.
                        Further, because Imperial is composed of disparate clans and extended families united by common cause,
                        the notion of ‘what family you come from’ is typically one of the most important and defining elements
                        of an Imperial’s upbringing.To an Imperial, birthright and breeding are of paramount importance in
                        judging the worth of others, and before any other decisions are made, you must determine to which clan
                        the character belongs.
                    </div>
                    <div className="button-container">
                        {roll}
                        {select}
                    </div>
                </div>
            )
            : (
                <ClanSelection
                    onSelection={(clan) => { this.selectClan(clan); character.lifePoints -= this._cost; } }
                    onCancel={() => { this.hideClans() } }
                    showCancel={this._hideCancel} />
            );
        return (
            <div className="page">
                <PageHeader text="CLAN" />
                {content}
            </div>
        );
    }

    private rollClan() {
        const clan = ClansHelper.generateClan();

        if (clan === Clan.Any) {
            this._hideCancel = true;
            this._cost = 0;
            this.showClans();
        }
        else {
            this.selectClan(clan);
        }
    }

    private showClans() {
        this.setState({ showSelection: true });
    }

    private hideClans() {
        this.setState({ showSelection: false });
    }

    private selectClan(clan: Clan) {
        character.clan = clan;
        Navigation.navigateToPage(PageIdentity.Family);
    }
}