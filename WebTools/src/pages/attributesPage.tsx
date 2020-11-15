import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {Attribute, AttributesHelper} from '../helpers/attributes';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {AttributeImprovementCollection, AttributeImprovementCollectionMode} from '../components/attributeImprovement';

export class AttributesPage extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);
    }

    render() {
        return (
            <div className="page">
                <PageHeader text="ATTRIBUTES"/>
                <div className="page-text">
                    Your life begins with attributes determined by a range of factors that influence your early life.
                    Your Lifepath will take you through a series of events that will determine your starting Attributes.
                    You may lower any Attribute by 1 to increase another by 1. No Attribute may go below 4 or above 6 at this point.
                </div>
                <div className="panel">
                    <AttributeImprovementCollection mode={AttributeImprovementCollectionMode.Normal} points={0} />
                </div>
                <Button text="NEXT" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onNext() {
        Navigation.navigateToPage(PageIdentity.Attributes_LifePoints);
    }
}