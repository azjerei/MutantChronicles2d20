import * as React from 'react';
import {character} from '../common/character';

interface IButtonProperties {
    onClick: () => void;
    text: string;
    className: string;
    lpCost?: number;
}

export class Button extends React.Component<IButtonProperties, {}> {
    constructor(props: IButtonProperties) {
        super(props);
    }

    render() {
        const {lpCost} = this.props;

        const lifePoints = lpCost
            ? this.props.lpCost === -1
                ? "+1 LP"
                : `-${lpCost} LP`
            : undefined;

        const badge = lpCost
            ? <div className="lp-badge">{lifePoints}</div>
            : undefined;

        const content = lpCost && character.lifePoints < lpCost
            ? (<div></div>)
            : (
                <div className={"button-title"}>
                    {this.props.text}
                </div>
            );

        const buttonClassName = character.lifePoints < lpCost
            ? "button-hidden"
            : this.props.className;

        return (
            <div className={buttonClassName} onClick={() => this.props.onClick() }>
                {content}
                {badge}
            </div>
        );
    }
}