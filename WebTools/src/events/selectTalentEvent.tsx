import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {TalentsHelper, TalentModel} from '../helpers/talents';
import {Button} from '../components/button';
import {DropDownInput} from '../components/DropDownInput';
import {Skill} from '../helpers/skills';
import {PageIdentity} from '../pages/pageFactory';

export class SelectTalentEvent extends React.Component<{}, {}> {
    private _talents: string[];
    private _descs: string[];
    private _talent: string;
    private _desc: string;

    constructor(props: {}) {
        super(props);

        this._talents = [];
        this._descs = [];

        const talents = TalentsHelper.getTalents();
        for (var tal in talents) {
            for (var i = 0; i < talents[tal].length; i++) {
                var t = talents[tal][i];
                if (!character.hasTalent(t.name)) {
                    this._talents.push(t.name);
                    this._descs.push(t.description);
                }
            }
        }

        this._talent = this._talents[0];
        this._desc = this._descs[0];
    }

    render() {
        return (
            <div>
                <div className="panel">
                    <DropDownInput
                        items={this._talents}
                        defaultValue={this._talent}
                        onChange={(index) => { this.selectTalent(index) } } />
                    <div>{this._desc}</div>
                </div>
                <Button text="DONE" className="button-next" onClick={() => this.next() }/>
            </div>
        );
    }

    private selectTalent(index: number) {
        this._talent = this._talents[index];
        this._desc = this._descs[index];
        this.forceUpdate();
    }

    private next() {
        character.addTalent(this._talent);
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}