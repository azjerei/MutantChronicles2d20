import * as React from 'react';
import { character } from '../common/character';
import { Navigation } from '../common/navigator';
import { CharacterSerializer } from '../common/characterSerializer';
import { PageIdentity, IPageProperties } from './pageFactory';
import { PageHeader } from '../components/pageHeader';
import { Button } from '../components/button';
import { CharacterSheet } from '../components/characterSheet';

export class FinishPage extends React.Component<IPageProperties, {}> {
    private name: HTMLInputElement;

    constructor(props: IPageProperties) {
        super(props);
    }

    render() {
        const characterData = CharacterSerializer.serialize(character);

        const data = characterData.map((d, i) => {
            return (<input key={i} type="hidden" name={d.name} value={d.value} />)
        });

        const form = <div className="button-container">
            <form action="http://pdf.modiphiusapps.hostinguk.org/api/sheet" method="post" encType="application/x-www-form-urlencoded" target="_blank">
                {data}
                <input type="submit" value="Export to PDF" className="button" />
            </form>
            <br />
        </div>;

        return (
            <div className="page">
                <PageHeader text="FINISHED" />
                <div className="page-text">
                    Your character is finished. You can either use this reference to fill in a character sheet by hand, or use the button at the bottom
                    to export your character to PDF.
                </div>
                <div className="panel">
                    <div className="header-small">NAME</div>
                    <input type="text" onChange={() => this.onNameChanged()} ref={(input) => this.name = input} />
                </div>
                <br />
                <div className="panel">
                    <CharacterSheet isVisible={true} />
                </div>
                <br />
                {form}
            </div>
        );
    }

    private onNameChanged() {
        character.name = this.name.value;
        this.forceUpdate();
    }
}