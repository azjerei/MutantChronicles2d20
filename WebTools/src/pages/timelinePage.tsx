import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {CheckBox} from '../components/checkBox';
import {Timeline} from '../helpers/timelines';
import {Source, SourcesHelper} from '../helpers/sources';

export class TimelinePage extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);
    }

    render() {
        const sources = SourcesHelper.getSources().map((s, i) => {
            const sourceCls = character.hasSource(s.id) ? "source-selected" : "";
            return (
                <div key={i} className={"source " + sourceCls} onClick={() => { this.toggleSource(s.id); } }>
                    {s.name}
                </div>
            );
        });

        return (
            <div className="page">
                <div className="page-text">
                    Choose the sources and options you want to enable.
                    Then select which timeline your character will exist in.
                    Your GM can tell you which timeline to select, and which options to choose.
                </div>
                <div className="panel">
                    <table>
                        <tbody>
                            <tr>
                                <td><div className="header-small">SOURCES</div></td>
                                <td>
                                    <div className="source-all">
                                        <div onClick={() => { this.selectSources(true); } }>Select all</div>
                                        &nbsp;&middot;&nbsp;
                                        <div onClick={() => { this.selectSources(false); } }>Select none</div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        {sources}
                    </div>
                </div>
                <br/>
                <div className="panel">
                    <div className="header-small">OPTIONS</div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <CheckBox
                                        isChecked={character.allowHeretics}
                                        value={!character.allowHeretics}
                                        onChanged={(val) => { character.allowHeretics = val; this.forceUpdate() } } />
                                </td>
                                <td>Allow Heretics</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br/>
                <div className="path-choice" onClick={() => { this.selectTimeline(Timeline.DarkSymmetry); } }>
                    <div className="option-header">DARK SYMMETRY</div>
                    <br/>
                    *Cybertronic is unavailable, and The Brotherhood has limited options.
                </div>
                <div className="path-choice" onClick={() => { this.selectTimeline(Timeline.DarkLegion); } }>
                    <div className="option-header">DARK LEGION</div>
                </div>
                <div className="path-choice" onClick={() => { this.selectTimeline(Timeline.DarkEden); } }>
                    <div className="option-header">DARK EDEN</div>
                    <br/>
                    *More Iconic Careers are available for all factions.
                </div>
            </div>
        );
    }

    private toggleSource(source: Source) {
        if (source === Source.Core) {
            return;
        }

        if (!character.hasSource(source)) {
            character.addSource(source);
        }
        else {
            character.removeSource(source);
        }

        this.forceUpdate();
    }

    private selectSources(all: boolean) {
        const sources = SourcesHelper.getSources();
        if (all) {
            sources.forEach(s => {
                if (s.id !== Source.Core) {
                    character.addSource(s.id);
                }
            });
        }
        else {
            sources.forEach(s => {
                if (s.id !== Source.Core) {
                    character.removeSource(s.id);
                }
            });
        }

        this.forceUpdate();
    }

    private selectTimeline(timeline: Timeline) {
        character.timeline = timeline;
        Navigation.navigateToPage(PageIdentity.PathSelection);
    }
}