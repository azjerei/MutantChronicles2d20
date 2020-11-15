import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {FactionSelection} from '../components/factionSelection';
import {Faction, FactionsHelper} from '../helpers/factions';

interface IFactionPageState {
    showSelection: boolean;
}

export class FactionPage extends React.Component<IPageProperties, IFactionPageState> {
    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showSelection: false
        };
    }

    render() {
        const roll = !character.isOptional
            ? (<Button text="ROLL FACTION" className="button-dark" onClick={() => { this.rollFaction() } }/>)
            : undefined;

        const select = (<Button text="SELECT FACTION" lpCost={1} className="button-dark" onClick={() => { this.showFactions() } }/>);

        const content = !this.state.showSelection ?
            (
                <div>
                    <div className="page-text">
                        Where were you born and to which faction do you owe allegiance? Your faction is the political faction you currently belong to. Your heritage is the faction you were born into.
                    </div>
                    <div className="button-container">
                        {roll}
                        {select}
                    </div>
                </div>
            )
            : (
                <FactionSelection
                    showSkills={true}
                    onSelection={(faction) => { this.selectFaction(faction); character.lifePoints--; } }
                    onCancel={() => { this.hideFactions() } }
                    showCancel={true} />
            );
        return (
            <div className="page">
                <PageHeader text="FACTION" />
                {content}
            </div>
        );
    }

    private rollFaction() {
        var faction = FactionsHelper.generateFaction();
        this.selectFaction(faction);
    }

    private showFactions() {
        this.setState({ showSelection: true });
    }

    private hideFactions() {
        this.setState({ showSelection: false });
    }

    private selectFaction(faction: Faction) {
        character.faction = faction;

        var fac = FactionsHelper.getFaction(faction);
        if (fac.needsHeritage) {
            Navigation.navigateToPage(PageIdentity.Heritage);
        }
        else {
            character.heritage = character.faction;
            FactionsHelper.applyFaction(character.faction);
            Navigation.navigateToPage(PageIdentity.FactionDetails);
        }
    }
}