import * as React from 'react';
import {character} from '../common/character';
import {Button} from './button';
import {Apostle} from '../helpers/apostles';
import {HereticRank} from '../helpers/hereticRanks';

interface IApostleSelectionProperties {
    onSelect: () => void;
}

export class ApostleSelection extends React.Component<IApostleSelectionProperties, {}> {
    constructor(props: IApostleSelectionProperties) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>Select your Patron Apostle.</div>
                <table className="selection-list">
                    <tbody>
                        <tr>
                            <td></td>
                            <td>Bonus Skills</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className="selection-list-header">Algeroth</td>
                            <td>Close Combat or Mechanics</td>
                            <td><Button text="SELECT" className="button-small" onClick={() => this.selectApostle(Apostle.Algeroth)}/></td>
                        </tr>
                        <tr>
                            <td className="selection-list-header">Ilian</td>
                            <td>Insight or Mysticism</td>
                            <td><Button text="SELECT" className="button-small" onClick={() => this.selectApostle(Apostle.Ilian) }/></td>
                        </tr>
                        <tr>
                            <td className="selection-list-header">Demnogonis</td>
                            <td>Resistance or Treatment</td>
                            <td><Button text="SELECT" className="button-small" onClick={() => this.selectApostle(Apostle.Demnogonis) }/></td>
                        </tr>
                        <tr>
                            <td className="selection-list-header">Muawijhe</td>
                            <td>Insight or Willpower</td>
                            <td><Button text="SELECT" className="button-small" onClick={() => this.selectApostle(Apostle.Muawijhe) }/></td>
                        </tr>
                        <tr>
                            <td className="selection-list-header">Semai</td>
                            <td>Lifestyle or Persuade</td>
                            <td><Button text="SELECT" className="button-small" onClick={() => this.selectApostle(Apostle.Semai) }/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    private selectApostle(apostle: Apostle) {
        character.patron = apostle;
        character.hereticRank = HereticRank.Acolyte;
        character.addEvent("You have a high-ranking Ally in your Cult who acts as your handler.");
        character.addTalent("Secret Kohort");

        this.props.onSelect();
    }
}