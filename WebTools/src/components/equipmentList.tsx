import * as React from 'react';
import {character} from '../common/character';
import {EquipmentHelper} from '../helpers/equipment';

interface IEquipmentListProperties {
    equipment: string[];
    onSelected: (eq: string) => void;
}

export class EquipmentList extends React.Component<IEquipmentListProperties, {}> {
    constructor(props: IEquipmentListProperties) {
        super(props);
    }

    render() {
        const equipment = this.props.equipment.length > 0 ? this.props.equipment.map((eq, i) => {
            if (eq === "FACTION_HANDGUN") {
                eq = EquipmentHelper.getFactionHandguns(character.faction);
            }
            else if (eq.indexOf("FACTION_HANDGUN") > -1) {
                eq = eq.replace("FACTION_HANDGUN", EquipmentHelper.getFactionHandguns(character.faction));
            }
            else if (eq === "FACTION_ASSAULT_RIFLE") {
                eq = EquipmentHelper.getFactionAssaultRifles(character.faction);
            }

            if (eq.indexOf('|') > -1) {
                const eqs = eq.split('|');

                const eqList = eqs.map((e, i) => {
                    return (<option key={i} value={e}>{e}</option>)
                });

                return (
                    <select key={i} onChange={e => this.props.onSelected(eqs[(e.target as HTMLSelectElement).selectedIndex]) }>
                        {eqList}
                    </select>
                )
            }
            else {
                return (<div key={i}>{eq}</div>)
            }
        })
        : (<div>{ "Nothing" }</div>);

        return (
            <div>
                {equipment}
            </div>
        );
    }
}