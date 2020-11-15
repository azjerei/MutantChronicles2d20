import * as React from 'react';
import {character} from '../common/character';
import {SkillsHelper} from '../helpers/skills';
import {TalentViewModel, TalentsHelper} from '../helpers/talents';
import {DropDownInput} from './dropDownInput';

interface ITalentSelectionProperties {
    onSelection: (talent: string) => void;
}

export class TalentSelection extends React.Component<ITalentSelectionProperties, {}> {
    private _talents: TalentViewModel[];
    private _talent: string;
    private _index: number;

    constructor(props: ITalentSelectionProperties) {
        super(props);

        this._talents = TalentsHelper.getTalentsForSkills(SkillsHelper.getSkills());
        this._talent = this._talents[0].name;
        this._index = 0;
    }

    render() {
        let items: string[] = [];
        this._talents.forEach(talent => {
            if (items.indexOf(talent.name) === -1) {
                items.push(talent.name);
            }
        });

        return (
            <div>
                <DropDownInput items={items} defaultValue={this._talent} onChange={index => this.onTalentSelected(index) } />
                <div>
                    {this._talents[this._index].description}
                </div>
            </div>
        );
    }

    private onTalentSelected(index: number) {
        this._index = index;
        this._talent = this._talents[index].name;
        this.props.onSelection(this._talent);
        this.forceUpdate();
    }
}