import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {ClansHelper} from '../helpers/clans';
import {Skill, SkillsHelper} from '../helpers/skills';
import {AttributesHelper} from '../helpers/attributes';
import {PageHeader} from '../components/pageHeader';
import {AttributeView} from '../components/attribute';
import {SkillImprovement} from '../components/skillImprovement';
import {ElectiveSkillImprovement} from '../components/electiveSkillImprovement';
import {Button} from '../components/button';
import {EquipmentList} from '../components/equipmentList';

export class ClanDetailsPage extends React.Component<IPageProperties, {}> {
    private _items: string[];
    private _item: string;

    constructor(props: IPageProperties) {
        super(props);

        const clan = ClansHelper.getClan(character.clan);

        this._items = [];
        clan.trappings.forEach(item => {
            this._items.push(item);
        });

        this._item = this._items[0];
    }

    render() {
        const clan = ClansHelper.getClan(character.clan);
        const family = character.family === 0
            ? "Core Family"
            : clan.families[character.family].name;

        const attributes = clan.attributes.map((a, i) => {
            return <AttributeView key={i}
                name={AttributesHelper.getAttributeName(a) }
                value={character.attributes[a].value}
                points={1}/>
        });

        return (
            <div className="page">
                <PageHeader text="CLAN" />
                <div className="header-text">{clan.name} (Family: {family})</div>
                <div className="panel">
                    <div className="header-small">ATTRIBUTES</div>
                    {attributes}
                </div>
                <div className="panel">
                    <div className="header-small">SKILLS</div>
                    <ElectiveSkillImprovement points={2} skills={clan.skills} onUpdated={() => { this.forceUpdate(); }}/>
                </div>
                <div className="panel">
                    <div className="header-small">TRAPPINGS (select one) </div>
                    <EquipmentList equipment={[this._items.join('|')]} onSelected={(eq) => this.selectItem(eq) }/>
                </div>
                <Button text="ENVIRONMENT" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private selectItem(eq: string) {
        this._item = eq;
        this.forceUpdate();
    }

    private onNext() {
        character.addEquipment(this._item);
        Navigation.navigateToPage(PageIdentity.Environment);
    }
}