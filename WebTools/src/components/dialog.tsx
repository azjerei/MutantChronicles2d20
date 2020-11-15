import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Button} from './button';

interface IDialogProperties {
    message: string;
    isVisible: boolean;
    onConfirm?: () => void;
    onDismiss?: () => void;
}

class _Dialog extends React.Component<IDialogProperties, {}> {
    constructor(props: IDialogProperties) {
        super(props);
    }

    render() {
        const {message, isVisible} = this.props;

        const visibilityClass = isVisible
            ? "dialog-visible"
            : "dialog-hidden";

        const containerClass = isVisible
            ? "dialog-container dialog-container-visible"
            : "dialog-container";

        return (
            <div className={visibilityClass}>
                <div className="dialog-bg"></div>
                <div className={containerClass}>
                    {this.props.message}
                    <br/>
                    <div className="button-container">
                        <Button text="OK" className="button" onClick={() => { this.onDismiss() } } />
                    </div>
                </div>
            </div>
        );
    }

    private onDismiss() {
        if (this.props.onDismiss) {
            this.props.onDismiss();
        }

        Dialog.hide();
    }
}

class _DialogYesNo extends React.Component<IDialogProperties, {}> {
    constructor(props: IDialogProperties) {
        super(props);
    }

    render() {
        const {message, isVisible} = this.props;

        const visibilityClass = isVisible
            ? "dialog-visible"
            : "dialog-hidden";

        const containerClass = isVisible
            ? "dialog-container dialog-container-visible"
            : "dialog-container";

        return (
            <div className={visibilityClass}>
                <div className="dialog-bg"></div>
                <div className={containerClass}>
                    {this.props.message}
                    <br/>
                    <div className="button-container">
                        <Button text="Yes" className="button" onClick={() => { this.onConfirm() } } />
                        <Button text="No" className="button" onClick={() => { this.onDismiss() } } />
                    </div>
                </div>
            </div>
        );
    }

    private onConfirm() {
        if (this.props.onConfirm) {
            this.props.onConfirm();
        }

        Dialog.hide();
    }

    private onDismiss() {
        if (this.props.onDismiss) {
            this.props.onDismiss();
        }

        Dialog.hide();
    }
}

class DialogControl {
    private _message: string;
    private _confirmFunc: () => void;
    private _dissmissFunc: () => void;

    show(message: string, onDismiss?: () => void) {
        this._message = message;
        this._dissmissFunc = onDismiss;
        this.render(true);
    }

    showYesNo(message: string, onYes?: () => void, onNo?: () => void) {
        this._message = message;
        this._confirmFunc = onYes;
        this._dissmissFunc = onNo;
        this.render(true, true);
    }

    hide() {
        this.render(false);
    }

    private render(visible: boolean, yesNo?: boolean) {
        if (!yesNo) {
            ReactDOM.render(
                React.createElement(_Dialog, {
                    message: this._message,
                    onDismiss: this._dissmissFunc,
                    isVisible: visible
                }),
                document.getElementById("dialog")
            );
        }
        else {
            ReactDOM.render(
                React.createElement(_DialogYesNo, {
                    message: this._message,
                    onConfirm: this._confirmFunc,
                    onDismiss: this._dissmissFunc,
                    isVisible: visible
                }),
                document.getElementById("dialog")
            );
        }
    }
}

export const Dialog = new DialogControl();