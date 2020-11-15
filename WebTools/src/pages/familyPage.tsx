import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {FamilySelection} from '../components/familySelection';
import {Clan, ClansHelper} from '../helpers/clans';

interface IFamilyPageState {
    showSelection: boolean;
}

export class FamilyPage extends React.Component<IPageProperties, IFamilyPageState> {
    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showSelection: false
        };
    }

    render() {
        const roll = !character.isOptional
            ? (<Button text="ROLL FAMILY" className="button-dark" onClick={() => { this.rollFamily() } }/>)
            : undefined;

        const select = (<Button text="SELECT FAMILY" lpCost={1} className="button-dark" onClick={() => { this.showFamilies() } }/>);

        const content = !this.state.showSelection ?
            (
                <div>
                    <div className="page-text">
                        Characters who are part of the core family are directly related to the head of their clan,
                        and may use the clan’s name as their own last name.
                        Affiliated families are attached or aligned to the clan’s core family in some way.
                        While they receive most of the benefits of the clan, those who belong to 
                        the core family have a higher social status and greater rights and privileges.
                    </div>
                    <div className="button-container">
                        {roll}
                        {select}
                    </div>
                </div>
            )
            : (
                <FamilySelection
                    onSelection={(clan) => { this.selectFamily(clan); character.lifePoints--; } }
                    onCancel={() => { this.hideFamilies() } }
                    showCancel={true} />
            );
        return (
            <div className="page">
                <PageHeader text="FAMILY" />
                {content}
            </div>
        );
    }

    private rollFamily() {
        var family = ClansHelper.generateFamily();
        this.selectFamily(family);
    }

    private showFamilies() {
        this.setState({ showSelection: true });
    }

    private hideFamilies() {
        this.setState({ showSelection: false });
    }

    private selectFamily(family: number) {
        character.family = family;

        ClansHelper.applyClan(character.clan, character.family);

        Navigation.navigateToPage(PageIdentity.ClanDetails);
    }
}