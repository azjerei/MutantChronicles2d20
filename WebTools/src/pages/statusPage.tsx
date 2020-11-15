import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {StatusSelection} from '../components/statusSelection';
import {Status, StatusHelper} from '../helpers/status';

interface IStatusPageProperties {
    showSelection: boolean;
}

export class StatusPage extends React.Component<IPageProperties, IStatusPageProperties> {
    private _candidates: Status[];

    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showSelection: false
        };
    }

    render() {
        const roll = !character.isOptional
            ? (<Button text="ROLL STATUS" className="button-dark" onClick={() => { this.rollStatus() } }/>)
            : undefined;

        const select = (<Button text="SELECT STATUS" lpCost={1} className="button-dark" onClick={() => { this.showStatuses() } }/>);

        const statuses = StatusHelper.getStatuses();
        const elite = statuses[statuses.length - 1];

        const selectElite = (<Button text={`SELECT ${elite.name.toUpperCase()}`} lpCost={2} className="button-dark" onClick={() => { this.selectStatus(elite.id); character.lifePoints -= 2; } }/>);

        const content = !this.state.showSelection ?
            (
                <div>
                    <div className="page-text">
                        What social class did you grow up in?
                    </div>
                    <div className="button-container">
                        {roll}
                        {select}
                        {selectElite}
                    </div>
                </div>
            )
            : (
                <StatusSelection
                    statuses={this._candidates}
                    onSelection={(env) => { this.selectStatus(env); character.lifePoints--; } }
                    onCancel={() => { this.hideStatuses() } } />
              );
        return (
            <div className="page">
                <PageHeader text="STATUS" />
                {content}
            </div>
        );
    }

    private rollStatus() {
        var status = StatusHelper.generateStatus();

        if (status.length > 1) {
            this._candidates = status;
            this.setState({ showSelection: true })
        }
        else {
            this.selectStatus(status[0]);
        }
    }

    private showStatuses() {
        this._candidates = undefined;
        this.setState({ showSelection: true });
    }

    private hideStatuses() {
        this.setState({ showSelection: false });
    }

    private selectStatus(status: Status) {
        character.status = status;
        StatusHelper.applyStatus(status);

        if (status >= Status.Nobility && status <= Status.NobleElectorHouse) {
            Navigation.navigateToPage(PageIdentity.House);
        }
        else {
            Navigation.navigateToPage(PageIdentity.StatusDetails);
        }
    }
}