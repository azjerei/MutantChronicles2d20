import * as React from 'react';
import {Skill} from '../helpers/skills';
import {TalentViewModel, TalentsHelper} from '../helpers/talents';
import {KiSchool, KiSchoolsHelper} from '../helpers/kiSchools';
import {DropDownInput} from './dropDownInput';
import {character} from '../common/character';

interface ITalentListProperties {
    skills: Skill[];
    onSelection: (talent: string) => void;
}

export class TalentList extends React.Component<ITalentListProperties, {}> {
    private _talents: TalentViewModel[];
    private _selectedIndex: number;

    constructor(props: ITalentListProperties) {
        super(props);
        this._talents = [];
        this._selectedIndex = 0;
    }

    render() {
        this._talents = TalentsHelper.getTalentsForSkills(this.props.skills);

        if (character.kiSchool !== KiSchool.None) {
            const powers = KiSchoolsHelper.getPowers(character.kiSchool);
            const category = ` (${KiSchoolsHelper.getSchool(character.kiSchool).name})`;
            powers.forEach(p => {
                this._talents.push(new TalentViewModel(p.name + category, 1, false, p.effect, Skill.None));
            });
        }

        if (!this._talents || this._talents.length === 0) {
            return (<div></div>);
        }

        this.props.onSelection(this._talents[this._selectedIndex].name);

        let items = [];
        let descs = [];
        this._talents.forEach((t, i) => {
            if (items.indexOf(t.name) === -1) {
                items.push(t.name);
                descs.push(t.description);
            }
        });

        return (
            <div>
                <DropDownInput items={items} defaultValue={items[this._selectedIndex]} onChange={index => this.onSelect(index) }/>
                <div>
                    {descs[this._selectedIndex]}
                </div>
            </div>
        );
    }

    private onSelect(index: number) {
        this._selectedIndex = index;
        this.props.onSelection(this._talents[this._selectedIndex].name);

        this.forceUpdate();
    }
}