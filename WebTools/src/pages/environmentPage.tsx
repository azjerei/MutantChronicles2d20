import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {EnvironmentSelection} from '../components/environmentSelection';
import {Environment, EnvironmentsHelper} from '../helpers/environments';
import { Source } from '../helpers/sources';
import { Faction } from '../helpers/factions';

interface IEnvironmentPageProps {
    showSelection: boolean;
}

export class EnvironmentPage extends React.Component<IPageProperties, IEnvironmentPageProps> {
    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showSelection: false
        };
    }

    render() {
        if (character.hasSource(Source.Imperial) && character.faction === Faction.Imperial) {
            return this.renderImperialEnvironmentPage();
        }

        const roll = !character.isOptional
            ? (<Button text="ROLL ENVIRONMENT" className="button-dark" onClick={() => { this.rollEnvironment() } }/>)
            : undefined;

        const select = (<Button text="SELECT ENVIRONMENT" lpCost={1} className="button-dark" onClick={() => { this.showEnvironments() } }/>);

        const content = !this.state.showSelection ?
            (
                <div>
                    <div className="page-text">
                        Where did you grow up and how did the environment you grew up in influence you?
                    </div>
                    <div className="button-container">
                        {roll}
                        {select}
                    </div>
                </div>
            )
            : (
                <EnvironmentSelection
                    onSelection={(env) => { this.selectEnvironment(env); character.lifePoints--; } }
                    onCancel={() => { this.hideEnvironments() } } />
            );
        return (
            <div className="page">
                <PageHeader text="ENVIRONMENT" />
                {content}
            </div>
        );
    }

    private renderImperialEnvironmentPage() {
        var envs = EnvironmentsHelper.getEnvironments().map((env, i) => {
            return (
                <tr key={i}>
                    <td className="selection-header">{env.name}</td>
                    <td><Button className="button-small" text="Select" onClick={() => { this.selectEnvironment(env.id) }} /></td>
                </tr>
            )
        });

        const content =
            (
                <div>
                    <div className="page-text">
                        Where did you grow up and how did the environment you grew up in influence you?
                    </div>
                    <table className="selection-list">
                        <tbody>
                            {envs}
                        </tbody>
                    </table>
                </div>
            );

        return (
            <div className="page">
                <PageHeader text="ENVIRONMENT" />
                {content}
            </div>
        );
    }

    private rollEnvironment() {
        var env = EnvironmentsHelper.generateEnvironment();
        this.selectEnvironment(env);
    }

    private showEnvironments() {
        this.setState({ showSelection: true });
    }

    private hideEnvironments() {
        this.setState({ showSelection: false });
    }

    private selectEnvironment(env: Environment) {
        character.environment = env;
        EnvironmentsHelper.applyEnvironment(env);
        Navigation.navigateToPage(PageIdentity.EnvironmentDetails);
    }
}