import * as React from 'react';
import {character} from '../common/character';
import {Clan, ClansHelper} from '../helpers/clans';
import {AttributesHelper} from '../helpers/attributes';
import {SkillsHelper} from '../helpers/skills';
import {Button} from './button';

interface IClanSelectionProperties {
    onSelection: (clan: Clan) => void;
    onCancel: () => void;
    showCancel?: boolean;
}

export class ClanSelection extends React.Component<IClanSelectionProperties, {}> {
    constructor(props: IClanSelectionProperties) {
        super(props);
    }

    render() {
        var clans = ClansHelper.getClans().map((c, i) => {
            const attributes = c.attributes.map((a, i) => {
                return (<div>+1 {AttributesHelper.getAttributeName(a) }</div>);
            });

            const skills = c.skills.map((s, i) => {
                return (<div>{SkillsHelper.getSkillName(s) }</div>)
            });

            return (
                <tr key={i}>
                    <td className="selection-header">{c.name}</td>
                    <td>{attributes}</td>
                    <td>{skills}</td>
                    <td><Button className="button-small" text="Select" onClick={() => { this.props.onSelection(c.id) } } /></td>
                </tr>
            )
        });

        const cancel = this.props.showCancel
            ? (<Button text="Cancel" className="button" onClick={() => this.props.onCancel() }/>)
            : undefined;

        return (
            <div>
                <div className="header-text">SELECT CLAN</div>
                <br/>
                <table className="selection-list">
                    <thead>
                        <tr>
                            <td></td>
                            <td>Attributes</td>
                            <td>Skills</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {clans}
                    </tbody>
                </table>
                {cancel}
            </div>
        );
    }
}