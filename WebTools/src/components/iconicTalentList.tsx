import * as React from 'react';
import {Skill} from '../helpers/skills';
import {TalentViewModel, TalentsHelper} from '../helpers/talents';
import {KiSchool, KiSchoolsHelper} from '../helpers/kiSchools';
import {DropDownInput} from './dropDownInput';
import {Button} from './button';
import {character} from '../common/character';

interface IIconicTalentListProperties {
    skills: Skill[];
    talent?: string;
    visible: boolean;
    enabled: boolean;
    onSelection: (talent: string) => void;
    onCommit: () => void;
    onCancel: () => void;
}

export class IconicTalentList extends React.Component<IIconicTalentListProperties, {}> {
    private _talents: TalentViewModel[];
    private _selectedIndex: number;

    constructor(props: IIconicTalentListProperties) {
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
            if (this.props.talent && this.props.talent.length > 0) {
                return (<div>
                    <input type="text" disabled={true} value={this.props.talent}/>
                    <Button text="Cancel" className="button-small button-inline" onClick={() => this.onCancel() }/>
                </div>);
            }
            else {
                return (<div>No talents available.</div>);
            }
        }

        const index = this._selectedIndex < this._talents.length ? this._selectedIndex : 0;
        this.props.onSelection(this._talents[index].name);

        const items = [];
        this._talents.forEach((t, i) => {
            if (items.indexOf(t.name) === -1) {
                items.push(t.name);
            }
        });

        const content = !this.props.visible ? undefined :
            this.props.enabled
            ? (
                <div>
                    <DropDownInput items={items} defaultValue={items[this._selectedIndex]} onChange={index => this.onSelect(index) }/>
                    <Button text="Select" className="button-small button-inline" onClick={() => this.onCommit() }/>
                    <div>
                        {this._talents[this._selectedIndex].description}
                    </div>
                </div>
              )
            : (
                <div>
                    <input type="text" disabled={true} value={this.props.talent}/>
                    <Button text="Cancel" className="button-small button-inline" onClick={() => this.onCancel() }/>
                </div>
              );

        return (
            <div>
                {content}
            </div>
        );
    }

    private onSelect(index: number) {
        this._selectedIndex = index;
        this.props.onSelection(this._talents[this._selectedIndex].name);

        this.forceUpdate();
    }

    private onCommit() {
        this.props.onCommit();
    }

    private onCancel() {
        this.props.onCancel();
    }
}