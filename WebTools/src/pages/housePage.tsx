import * as React from 'react';
import {character} from '../common/character';
import {House, HousesHelper} from '../helpers/houses';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {HouseSelection} from '../components/houseSelection';

interface IHousePageState {
    showSelection: boolean;
}

export class HousePage extends React.Component<IPageProperties, IHousePageState> {
    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showSelection: false
        };
    }

    render() {
        const content = !this.state.showSelection ?
            (
                <div>
                    <div className="page-text">
                        Belonging to the Bauhaus Noble, which House do you hail from?
                    </div>
                    <div className="button-container">
                        <Button className="button-dark" text="ROLL HOUSE" onClick={() => { this.rollHouse(); } }/>
                    </div>
                </div>
            )
            : (
                <HouseSelection onSelection={(house) => { this.selectHouse(house); } }/>
            );
        return (
            <div className="page">
                <PageHeader text="HOUSE" />
                {content}
            </div>
        );
    }

    private rollHouse() {
        const house = HousesHelper.generateHouse();
        if (house.length === 1) {
            this.selectHouse(house[0]);
        }
        else {
            this.setState({ showSelection: true });
        }
    }

    private selectHouse(house: House) {
        character.house = house;
        HousesHelper.applyHouse(character.house);
        Navigation.navigateToPage(PageIdentity.HouseDetails);
    }
}