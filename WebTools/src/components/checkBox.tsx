import * as React from 'react';

interface ICheckBoxProperties {
    value: any;
    onChanged: (val: any) => void;
    isChecked: boolean;
}

export class CheckBox extends React.Component<ICheckBoxProperties, {}> {
    constructor(props: ICheckBoxProperties) {
        super(props);
    }

    render() {
        const {value, onChanged, isChecked} = this.props;

        return (
            <input type="checkbox" value={value} onChange={e => onChanged(value) } checked={isChecked} />
        );
    }
}