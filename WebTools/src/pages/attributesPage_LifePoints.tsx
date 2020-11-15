import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {Attribute, AttributesHelper} from '../helpers/attributes';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {AttributeImprovementCollection, AttributeImprovementCollectionMode} from '../components/attributeImprovement';

export class AttributesPage_LifePoints extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);
    }

    render() {
        return (
            <div className="page">
                <PageHeader text="ATTRIBUTES"/>
                <div className="page-text">
                    You may now spend Life Points to increase your starting Attributes.
                    No Attribute may be increased above 6 at this point.
                </div>
                <div className="panel">
                    <AttributeImprovementCollection mode={AttributeImprovementCollectionMode.LifePoints} points={0} />
                </div>
                <Button text="FACTION" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onNext() {
        Navigation.navigateToPage(PageIdentity.Faction);
    }
}