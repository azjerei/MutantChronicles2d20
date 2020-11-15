import * as React from 'react';
import {character} from '../common/character';
import {PrimaryCareer, PrimaryCareersHelper} from '../helpers/primaryCareers';
import {AttributesHelper} from '../helpers/attributes';
import {SkillsHelper} from '../helpers/skills';
import {Button} from './button';

interface ICareerSelectionProperties {
    careers: PrimaryCareer[];
    cost: number;
    onSelection: (career: PrimaryCareer, cost: number) => void;
    hideCancel?: boolean;
    onCancel: () => void;
}

export class PrimaryCareerSelection extends React.Component<ICareerSelectionProperties, {}> {
    constructor(props: ICareerSelectionProperties) {
        super(props);
    }

    render() {
        var careers = this.props.careers.map((c, i) => {
            const career = PrimaryCareersHelper.getCareer(c);

            const attributes = character.careers.length === 0
                ? career.attributes.map((attr, i) => {
                    if (attr > 0) {
                        return (<div key={i}>+{attr} {AttributesHelper.getAttributeName(i).substr(0, 3) }</div>)
                    }
                    else {
                        return undefined;
                    }
                  })
                : undefined;

            const mandatory = career.mandatory.map((m, i) => {
                return (
                    <div key={i}>
                        {SkillsHelper.getSkillName(m) }
                    </div>
                )
            });

            const additionalMandatory = career.id === PrimaryCareer.Unemployed
                ? <div>Any other skill</div>
                : undefined;

            const elective = career.elective.length > 8
                ? (<div>All</div>)
                :
                career.elective.map((e, i) => {
                    return (
                        <div key={i}>
                            {SkillsHelper.getSkillName(e) }
                        </div>
                    )
                });

            return (
                <tr key={i}>
                    <td className="selection-header">{career.name}</td>
                    <td>{attributes}</td>
                    <td>{mandatory}{additionalMandatory}</td>
                    <td>{elective}</td>
                    <td><Button className="button-small" text="Select" onClick={() => { this.props.onSelection(c, this.props.cost) } } /></td>
                </tr>
            )
        });

        const attributesHeader = character.careers.length === 0
            ? (<h3>Attributes</h3>)
            : undefined;

        const cancel = !this.props.hideCancel
            ? <Button text="Cancel" className="button" onClick={() => this.props.onCancel() }/>
            : undefined;

        return (
            <div>
                <div className="header-text">SELECT PRIMARY CAREER</div>
                <br/>
                <table className="selection-list">
                    <thead>
                        <tr>
                            <td></td>
                            <td>{attributesHeader}</td>
                            <td><h3>Mandatory Skills</h3></td>
                            <td><h3>Elective Skills</h3></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {careers}
                    </tbody>
                </table>
                {cancel}
            </div>
        );
    }
}