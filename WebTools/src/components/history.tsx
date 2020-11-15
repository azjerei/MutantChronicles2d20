import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {Events, EventIdentity} from '../common/eventChannel';
import {PageIdentity} from '../pages/pageFactory';

interface IHistoryState {
    showHistory: boolean;
}

export class History extends React.Component<{}, IHistoryState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            showHistory: false
        };

        Events.listen(EventIdentity.ShowHistory, () => {
            this.toggleHistory();
        });
    }

    render() {
        const pages = character.steps.length > 0
            ? character.steps.map((step, i) => {
                const name = this.getPageName(step.page);
                if (name.length > 0) {
                    return (
                        <div className="history-item" key={i} onClick={() => this.goToPage(step.page) }>
                            {name}
                        </div>
                    );
                }
            })
            : <div>No history.</div>;

        const history = this.state.showHistory
            ? <div className="history">
                {pages}
            </div>
            : undefined;

        return (
            <div>
                {history}
            </div>
        );
    }

    private toggleHistory() {
        this.setState({
            showHistory: !this.state.showHistory
        });
    }

    private goToPage(page: PageIdentity) {
        this.toggleHistory();
        character.goToStep(page);
        Navigation.navigateToHistoryPage(page);
    }

    private getPageName(page: PageIdentity) {
        switch (page) {
            case PageIdentity.Timeline: return "Timeline";
            case PageIdentity.PathSelection: return "Path Selection";
            case PageIdentity.Attributes: return "Attributes";
            case PageIdentity.Attributes_LifePoints: return "Attributes (Lifepoints)";
            case PageIdentity.Faction: return "Faction";
            case PageIdentity.Heritage: return "Heritage";
            case PageIdentity.FactionDetails: return "Faction Details";
            case PageIdentity.FactionEvent: return "Faction Event";
            case PageIdentity.Environment: return "Environment";
            case PageIdentity.EnvironmentDetails: return "Environment Details";
            case PageIdentity.Status: return "Status";
            case PageIdentity.StatusDetails: return "Status Details";
            case PageIdentity.Education: return "Education";
            case PageIdentity.EducationDetails: return "Education Details";
            case PageIdentity.AdolescenceEvent: return "Adolescence Event";
            case PageIdentity.PrimaryCareer1: return "Primary Career";
            case PageIdentity.PrimaryCareer2: return "Primary Career";
            case PageIdentity.PrimaryCareer3: return "Primary Career";
            case PageIdentity.PrimaryCareer4: return "Primary Career";
            case PageIdentity.PrimaryCareerDetails1: return "Primary Career Details";
            case PageIdentity.PrimaryCareerDetails2: return "Primary Career Details";
            case PageIdentity.PrimaryCareerDetails3: return "Primary Career Details";
            case PageIdentity.PrimaryCareerDetails4: return "Primary Career Details";
            case PageIdentity.IconicCareer: return "Iconic Career";
            case PageIdentity.IconicCareerDetails: return "Iconic Career Details";
            case PageIdentity.CareerEvent1: return "Career Event";
            case PageIdentity.CareerEvent2: return "Career Event";
            case PageIdentity.CareerEvent3: return "Career Event";
            case PageIdentity.CareerEvent4: return "Career Event";
            case PageIdentity.FinalTweaks: return "Final Tweaks";
            case PageIdentity.FinalTweaks_LifePoints: return "Final Tweaks (Life Points)";
            case PageIdentity.Finish: return "Finish";
            case PageIdentity.AfterEvent: return "After Event";
            case PageIdentity.Fired: return "Fired";
            case PageIdentity.CriminalRecord: return "Criminal Record";
            case PageIdentity.Clan: return "Clan";
            case PageIdentity.Family: return "Family";
            case PageIdentity.ClanDetails: return "Clan Details";
            case PageIdentity.Pillar: return "Pillar";
            case PageIdentity.PillarDetails: return "Pillar Details";
            case PageIdentity.House: return "House";
            case PageIdentity.HouseDetails: return "House Details";
        }

        return "";
    }
}