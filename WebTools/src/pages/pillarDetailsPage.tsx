import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {PillarsHelper} from '../helpers/pillars';
import {Skill, SkillsHelper} from '../helpers/skills';
import {AttributesHelper} from '../helpers/attributes';
import {Faction, FactionsHelper} from '../helpers/factions';
import {PageHeader} from '../components/pageHeader';
import {AttributeView} from '../components/attribute';
import {ElectiveSkillImprovement} from '../components/electiveSkillImprovement';
import {Button} from '../components/button';
import {EquipmentList} from '../components/equipmentList';
import {DropDownInput} from '../components/dropDownInput';

export class PillarDetailsPage extends React.Component<IPageProperties, {}> {
    private _factions: string[];
    private _faction: string;
    private _equipment: string;

    constructor(props: IPageProperties) {
        super(props);

        this._factions = FactionsHelper.getFactions()
            .filter(f => f.id !== Faction.Cybertronic && !f.needsHeritage)
            .map(f => { return f.name; });

        this._faction = this._factions[Math.floor(Math.random() * this._factions.length)];

        const eq = PillarsHelper.getEquipment(character.earnings);
        this._equipment = eq[0];
    }

    render() {
        const pillar = PillarsHelper.getPillar(character.pillar);

        const attributes = pillar.attributes.map((a, i) => {
            return <AttributeView key={i}
                name={AttributesHelper.getAttributeName(a) }
                value={character.attributes[a].value}
                points={1}/>
        });

        const factionSelection = character.isVAC()
            ? <div className="panel">
                <div className="header-small">FACTION</div>
                <div>This is your old faction. Either keep it or select another.</div>
                <DropDownInput items={this._factions} defaultValue={this._faction} onChange={(index) => { this._faction = this._factions[index]; this.forceUpdate(); } }/>
              </div>
            : undefined; 

        return (
            <div className="page">
                <PageHeader text="PILLAR" />
                <div className="header-text">{pillar.name}</div>
                {factionSelection}
                <div className="panel">
                    <div className="header-small">ATTRIBUTES</div>
                    {attributes}
                </div>
                <div className="panel">
                    <div className="header-small">SKILL</div>
                    <ElectiveSkillImprovement points={1} skills={pillar.skills}/>
                </div>
                <div className="pillar">
                    <div className="header-small">EQUIPMENT</div>
                    <EquipmentList equipment={[PillarsHelper.getEquipment(character.earnings)] } onSelected={eq => { this._equipment = eq; } }/>
                </div>
                <Button text="ENVIRONMENT" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onNext() {
        character.addEquipment(this._equipment);

        if (character.isVAC()) {
            character.heritage = FactionsHelper.getFactionByName(this._faction);
        }

        Navigation.navigateToPage(PageIdentity.Environment);
    }
}