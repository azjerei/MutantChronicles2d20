import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {StatusHelper} from '../helpers/status';
import {Skill, SkillsHelper} from '../helpers/skills';
import {AttributesHelper} from '../helpers/attributes';
import {PageHeader} from '../components/pageHeader';
import {AttributeView} from '../components/attribute';
import {SkillImprovement} from '../components/skillImprovement';
import {ElectiveSkillImprovement} from '../components/electiveSkillImprovement';
import {Button} from '../components/button';
import {DropDownInput} from '../components/dropDownInput';

export class StatusDetailsPage extends React.Component<IPageProperties, {}> {
    private _items: string[];
    private _item: string;

    constructor(props: IPageProperties) {
        super(props);

        const status = StatusHelper.getStatus(character.status);

        this._items = [];
        status.equipment.forEach(item => {
            this._items.push(item);
        });

        this._item = this._items[0];
    }

    render() {
        const status = StatusHelper.getStatus(character.status);

        const attributes = status.attributes.map((a, i) => {
            return <AttributeView key={i}
                name={AttributesHelper.getAttributeName(a) }
                value={character.attributes[a].value}
                points={1}/>
        });

        const skill = status.skills.length === 1
            ? <SkillImprovement skill={status.skills[0]} />
            : <ElectiveSkillImprovement skills={status.skills} points={1} />;

        return (
            <div className="page">
                <PageHeader text="STATUS" />
                <div className="header-text">{status.name}</div>
                <div className="panel">
                    <div className="header-small">ATTRIBUTES</div>
                    {attributes}
                </div>
                <div className="panel">
                    <div className="header-small">SKILL</div>
                    {skill}
                </div>
                <div className="panel">
                    <div className="header-small">ITEM OF INTEREST (select one) </div>
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