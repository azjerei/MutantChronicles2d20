import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {House, HousesHelper} from '../helpers/houses';
import {Skill, SkillsHelper} from '../helpers/skills';
import {AttributesHelper} from '../helpers/attributes';
import {PageHeader} from '../components/pageHeader';
import {AttributeView} from '../components/attribute';
import {ElectiveSkillImprovement} from '../components/electiveSkillImprovement';
import {Button} from '../components/button';
import {DropDownInput} from '../components/dropDownInput';

export class HouseDetailsPage extends React.Component<IPageProperties, {}> {
    private _items: string[];
    private _item: string;

    constructor(props: IPageProperties) {
        super(props);

        const house = HousesHelper.getHouse(character.house);

        this._items = [];
        house.items.forEach(item => {
            this._items.push(item);
        });

        this._item = this._items[0];
    }

    render() {
        const house = HousesHelper.getHouse(character.house);

        const attributes = house.attributes.map((a, i) => {
            return <AttributeView key={i}
                name={AttributesHelper.getAttributeName(a) }
                value={character.attributes[a].value}
                points={1}/>
        });

        return (
            <div className="page">
                <PageHeader text="HOUSE" />
                <div className="header-text">{house.name}</div>
                <div className="panel">
                    <div className="header-small">ATTRIBUTES</div>
                    {attributes}
                </div>
                <div className="panel">
                    <div className="header-small">SKILL</div>
                    <ElectiveSkillImprovement skills={house.skills} points={1} />
                </div>
                <div className="panel">
                    <div className="header-small">ABILITY</div>
                    {house.bonus}
                </div>
                <div className="panel">
                    <div className="header-small">ITEM OF INTEREST (select one)</div>
                    <DropDownInput items={this._items} defaultValue={this._item} onChange={(index) => this.selectItem(index) }/>
                </div>
                <Button text="ENVIRONMENT" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private selectItem(index: number) {
        this._item = this._items[index];
        this.forceUpdate();
    }

    private onNext() {
        character.addEquipment(this._item);
        Navigation.navigateToPage(PageIdentity.Environment);
    }
}