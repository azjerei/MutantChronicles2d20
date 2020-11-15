import * as React from 'react';

interface ITalentDescriptionProperties {
    name: string;
    description: string;
}

export class TalentDescription extends React.Component<ITalentDescriptionProperties, {}> {
    constructor(props: ITalentDescriptionProperties) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="talent-name">{this.props.name}</div>
                <div className="talent-desc">{this.props.description}</div>
            </div>
        );
    }
}