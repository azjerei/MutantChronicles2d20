import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {AttributeImprovementCollection, AttributeImprovementCollectionMode} from '../components/attributeImprovement';
import {Button} from '../components/button';
import {PageIdentity} from '../pages/pageFactory';

interface IReduceAttributeEventProperties {
    points: number;
}

export class ReduceAttributeEvent extends React.Component<IReduceAttributeEventProperties, {}> {
    constructor(props: IReduceAttributeEventProperties) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="panel">
                    <AttributeImprovementCollection mode={AttributeImprovementCollectionMode.Decrease} points={this.props.points}/>
                </div>
                <Button text="EDUCATION" className="button-next" onClick={() => Navigation.navigateToPage(PageIdentity.Education) }/>
            </div>
        );
    }
}