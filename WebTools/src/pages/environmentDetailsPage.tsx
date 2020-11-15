import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {EnvironmentsHelper} from '../helpers/environments';
import {Skill, SkillsHelper} from '../helpers/skills';
import {AttributesHelper} from '../helpers/attributes';
import {PageHeader} from '../components/pageHeader';
import {AttributeImprovementCollection, AttributeImprovementCollectionMode} from '../components/attributeImprovement';
import {SkillImprovement} from '../components/skillImprovement';
import {ElectiveSkillImprovement} from '../components/electiveSkillImprovement';
import {Button} from '../components/button';
import {DropDownInput} from '../components/dropDownInput';
import {EquipmentList} from '../components/equipmentList';
import { Source } from '../helpers/sources';
import { Faction } from '../helpers/factions';

export class EnvironmentDetailsPage extends React.Component<IPageProperties, {}> {
    private _regions: string[];
    private _region: string;
    private _equipment: string;

    constructor(props: IPageProperties) {
        super(props);

        this._regions = EnvironmentsHelper.getRegions(character.heritage, character.environment);
        this._region = this._regions[0];

        if (!character.hasSource(Source.Imperial) && character.faction !== Faction.Imperial) {
            const env = EnvironmentsHelper.getEnvironment(character.environment);
            env.equipment.forEach(eq => {
                if (eq.indexOf('|') > -1) {
                    this._equipment = eq.split('|')[0];
                }
            });
        }
    }

    render() {
        if (character.faction === Faction.Imperial && character.hasSource(Source.Imperial)) {
            return this.renderImperialEnvironment();
        }

        const env = EnvironmentsHelper.getEnvironment(character.environment);

        const skill = env.skills.length === 1
            ? <SkillImprovement skill={env.skills[0]} />
            : <ElectiveSkillImprovement skills={env.skills} points={1}/>;

        const region = this._regions.length > 0
            ? <div className="panel">
                <div className="header-small">REGION</div>
                <DropDownInput items={this._regions} defaultValue={this._region} onChange={(index) => { this._region = this._regions[index]; this.forceUpdate(); } }/>
              </div>
            : undefined;

        return (
            <div className="page">
                <PageHeader text="ENVIRONMENT" />
                <div className="header-text">{env.name}</div>
                {region}
                <div className="panel">
                    <div className="header-small">ATTRIBUTES</div>
                    <AttributeImprovementCollection attributes={env.attributes} points={1} mode={AttributeImprovementCollectionMode.Increase}/>
                </div>
                <div className="panel">
                    <div className="header-small">SKILL</div>
                    {skill}
                </div>
                <div className="panel">
                    <div className="header-small">EQUIPMENT</div>
                    <EquipmentList equipment={env.equipment} onSelected={(eq) => this._equipment = eq }/>
                </div>
                <Button text="EDUCATION" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private renderImperialEnvironment() {
        const env = EnvironmentsHelper.getEnvironment(character.environment);

        const region = this._regions.length > 0
            ? <div className="panel">
                <div className="header-small">REGION</div>
                <DropDownInput items={this._regions} defaultValue={this._region} onChange={(index) => { this._region = this._regions[index]; this.forceUpdate(); }} />
              </div>
            : undefined;

        return (
            <div className="page">
                <PageHeader text="ENVIRONMENT" />
                <div className="header-text">{env.name}</div>
                {region}
                <Button text="EDUCATION" className="button-next" onClick={() => this.onNext()} />
            </div>
        );
    }

    private onNext() {
        character.birthPlace = this._region;

        if (!character.hasSource(Source.Imperial) && character.faction !== Faction.Imperial) {
            character.addEquipment(this._equipment);
        }

        Navigation.navigateToPage(PageIdentity.Education);
    }
}