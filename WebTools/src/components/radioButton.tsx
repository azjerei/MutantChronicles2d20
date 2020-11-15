import * as React from 'react';

interface IRadioButtonProperties {
    groupId: string;
    value: any;
    disabled?: boolean;
    onChanged: (val: any) => void;
}

export class RadioButton extends React.Component<IRadioButtonProperties, {}> {
    constructor(props: IRadioButtonProperties) {
        super(props);
    }

    render() {
        const {groupId, value, onChanged, disabled} = this.props;

        const isDisabled = disabled ? true : false;

        return (
            <input type="radio" name={groupId} value={value} onChange={e => onChanged(value) } disabled={isDisabled} />
        );
    }
}