import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {PillarSelection} from '../components/pillarSelection';
import {Pillar, PillarsHelper} from '../helpers/pillars';

interface IPillarsPageProperties {
    showSelection: boolean;
}

export class PillarPage extends React.Component<IPageProperties, IPillarsPageProperties> {
    private _candidates: Pillar[];

    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showSelection: false
        };
    }

    render() {
        const roll = !character.isOptional
            ? (<Button text="ROLL PILLAR" className="button-dark" onClick={() => { this.rollPillar() } }/>)
            : undefined;

        const selectVAC = (<Button text="SELECT VAC PILLAR" lpCost={1} className="button-dark" onClick={() => { this.showVACPillars() } }/>);
        const selectTIFF = (<Button text="SELECT TIFF PILLAR" lpCost={2} className="button-dark" onClick={() => { this.showTIFFPillars() } }/>);

        const content = !this.state.showSelection ?
            (
                <div>
                    <div className="page-text">
                        Unlike the other corporations, Cybertronic is divided along practical lines rather than ones of wealth or birth.
                    </div>
                    <div className="button-container">
                        {roll}
                        {selectVAC}
                        {selectTIFF}
                    </div>
                </div>
            )
            : (
                <PillarSelection
                    candidates={this._candidates}
                    onSelection={(pillar) => {
                        this.selectPillar(pillar);

                        if (pillar < Pillar.TIFF_AEM) {
                            character.lifePoints--;
                        }
                        else {
                            character.lifePoints -= 2;
                        }
                    } }
                    onCancel={() => { this.hideStatuses() } } />
            );
        return (
            <div className="page">
                <PageHeader text="PILLAR" />
                {content}
            </div>
        );
    }

    private rollPillar() {
        var pillar = PillarsHelper.generatePillar();
        this.selectPillar(pillar);
    }

    private showVACPillars() {
        this._candidates = [Pillar.VAC_AEM, Pillar.VAC_RDM, Pillar.VAC_SWI];
        this.setState({ showSelection: true });
    }

    private showTIFFPillars() {
        this._candidates = [Pillar.TIFF_AEM, Pillar.TIFF_RDM, Pillar.TIFF_SWI];
        this.setState({ showSelection: true });
    }

    private hideStatuses() {
        this.setState({ showSelection: false });
    }

    private selectPillar(pillar: Pillar) {
        character.pillar = pillar;
        PillarsHelper.applyPillar(pillar);
        Navigation.navigateToPage(PageIdentity.PillarDetails);
    }
}