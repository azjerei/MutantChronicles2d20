import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {FactionSelection} from '../components/factionSelection';
import {Faction, FactionsHelper} from '../helpers/factions';

interface IHeritagePageState {
    showSelection: boolean;
}

export class HeritagePage extends React.Component<IPageProperties, IHeritagePageState> {
    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showSelection: false
        };
    }

    render() {
        const roll = !character.isOptional
            ? (<Button text="ROLL HERITAGE" className="button-dark" onClick={() => { this.rollFaction() } }/>)
            : undefined;

        const select = (<Button text="SELECT HERITAGE" lpCost={1} className="button-dark" onClick={() => { this.showFactions() } }/>);

        const content = !this.state.showSelection ?
            (
                <div>
                    <div className="page-text">
                        You owe allegiance to the <b>{FactionsHelper.getFaction(character.faction).name}</b> faction, but which faction were you born into?
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
                    showOnlyNonHeritageFactions={true}
                    showCancel={true}
                    onSelection={(faction) => { this.selectFaction(faction); character.lifePoints--; } }
                    onCancel={() => { this.hideFactions() } } />
            );
        return (
            <div className="page">
                <PageHeader text="HERITAGE" />
                {content}
            </div>
        );
    }

    private rollFaction() {
        var faction = FactionsHelper.generateHeritage();
        this.selectFaction(faction);
    }

    private showFactions() {
        this.setState({ showSelection: true });
    }

    private hideFactions() {
        this.setState({ showSelection: false });
    }

    private selectFaction(faction: Faction) {
        character.heritage = faction;
        FactionsHelper.applyFaction(character.faction);
        Navigation.navigateToPage(PageIdentity.FactionDetails);
    }
}