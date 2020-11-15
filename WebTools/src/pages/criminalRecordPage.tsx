import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';

export class CriminalRecordPage extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);
    }

    render() {
        return (
            <div className="page">
                <PageHeader text="CRIMINAL RECORD" />
                <div className="page">
                    <div className="panel">
                        <div>{`You may ignore getting a Criminal Record by reducing your Earnings by one (Current: ${character.earnings}.`}</div>
                        <div>Do you want to utilize your contacts to ignore this Criminal Record?</div>
                    </div>
                    <Button className="button-next" text="YES" onClick={() => { this.onYes() } }/>
                    <Button className="button-next" text="NO" onClick={() => { this.onNo() } }/>
                </div>
            </div>
        );
    }

    private onYes() {
        character.earnings = Math.max(0, character.earnings - 1);

        Navigation.navigateToPage(character.getCareerPage(PageIdentity.PrimaryCareer1));
    }

    private onNo() {
        character.applyCriminalRecord();

        Navigation.navigateToPage(character.getCareerPage(PageIdentity.PrimaryCareer1));
    }
}