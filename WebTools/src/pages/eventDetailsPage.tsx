import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {Skill, SkillsHelper} from '../helpers/skills';
import {FactionsHelper} from '../helpers/factions';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {IncreaseSkillEvent} from '../events/increaseSkillEvent';
import {FiredEvent} from '../events/firedEvent';
import {SelectTalentEvent} from '../events/selectTalentEvent';

export class EventDetailsPage extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);
    }

    render() {
        const event = character.pendingEvents[0];
        character.pendingEvents.splice(0, 1);

        var page: JSX.Element;

        if (event.detailView.indexOf("Increase") > -1) {
            var skills: Skill[] = [];
            var sk = event.detailView.substr(event.detailView.indexOf("Increase") + 8);
            var sks = sk.split("|");

            for (var i = 0; i < sks.length; i++) {
                skills.push(SkillsHelper.getSkillByName(sks[i]));
            }

            page = (<IncreaseSkillEvent skills={skills} points={1} />);
        }
        else if (event.detailView.indexOf("Fired") > -1) {
            page = (<FiredEvent />);
        }
        else if (event.detailView.indexOf("SelectTalent") > -1) {
            page = (<SelectTalentEvent />);
        }

        return (
            <div className="page">
                <PageHeader text="EVENT" />
                <div className="page-text">{event.effect}</div>
                {page}
            </div>
        );
    }
}