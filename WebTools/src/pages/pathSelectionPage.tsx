import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';

export class PathSelectionPage extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);
    }

    render() {
        return (
            <div className="page">
                <PageHeader text="PATH CHOICE" />
                <div className="page-text">
                    Select your character creation path.
                </div>
                <div className="path-choice" onClick={() => this.onNormalSelected() }>
                    <div className="option-header">NORMAL</div>
                    <br/>
                    You gain <b>5 Life Points</b> to help you navigate the tumultous nature of your personal histories.
                    Excess Life Points may be traded for Chronicle Points, Assets or Skills during the final step.
                </div>
                <div className="path-choice" onClick={() => this.onOptionalSelected() }>
                    <div className="option-header">OPTIONAL</div>
                    <br/>
                    <strong>Use only if your GM allows it!</strong>
                    <br /><br />
                    You gain <b>12 Life Points</b> to help you make the choices you want during character creation.
                    Excess Life Points <i>cannot</i> be traded for Chronicle Points, Assets or Skills during the final step.
                </div>
            </div>
        );
    }

    private onNormalSelected() {
        character.lifePoints = 5;
        character.isOptional = false;
        Navigation.navigateToPage(PageIdentity.Attributes);
    }

    private onOptionalSelected() {
        character.lifePoints = 12;
        character.isOptional = true;
        Navigation.navigateToPage(PageIdentity.Attributes);
    }
}