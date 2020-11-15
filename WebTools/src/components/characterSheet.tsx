import * as React from 'react';
import { character, CharacterCareer } from '../common/character';
import { Events, EventIdentity } from '../common/eventChannel';
import { Attribute, AttributesHelper } from '../helpers/attributes';
import { FactionsHelper } from '../helpers/factions';
import { EducationsHelper } from '../helpers/educations';
import { StatusHelper } from '../helpers/status';
import { EnvironmentsHelper } from '../helpers/environments';
import { PrimaryCareersHelper } from '../helpers/primaryCareers';
import { IconicCareersHelper } from '../helpers/iconicCareers';
import { Skill, SkillsHelper } from '../helpers/skills';
import { TalentsHelper } from '../helpers/talents';
import { Apostle, ApostleHelper } from '../helpers/apostles';
import { HereticHelper } from '../helpers/hereticRanks';
import { DarkGiftHelper } from '../helpers/darkGifts';
import { PillarsHelper } from '../helpers/pillars';
import { KiPowersHelper } from '../helpers/ki';

interface ICharacterSheetProperties {
    isVisible?: boolean;
}

class SectionContent {
    name: string;
    value: any;

    constructor(name: string, value: any) {
        this.name = name;
        this.value = value;
    }
}

class CareerSectionContent extends SectionContent {
    constructor(career: CharacterCareer, index: number) {
        super(
            "CAREER " + (index + 1),
            career
                ? career.isIconic
                    ? `${IconicCareersHelper.getCareer(career.career).name} ${career.years} years.`
                    : `${PrimaryCareersHelper.getCareer(career.career).name} ${career.years} years.`
                : undefined
        );
    }
}

class CharacterSheetData {
    private _data: SectionContent[] = [
        new SectionContent("FACTION", character.faction >= 0
            ? FactionsHelper.getFaction(character.faction).name +
            (character.faction === character.heritage
                ? ""
                : "(Heritage: " + FactionsHelper.getFaction(character.heritage).name + ")")
            : "None"),
        new SectionContent("ENVIRONMENT", character.environment >= 0
            ? `${EnvironmentsHelper.getEnvironment(character.environment).name} (${character.birthPlace})`
            : "None"),
        new SectionContent("STATUS", this.displayStatus()),
        new SectionContent("FACTION EVENT", character.factionEvent),
        new SectionContent("ADOLESCENCE EVENT", this.displayAdolescenceEvent()),
        new SectionContent("EDUCATION", character.education >= 0 ? EducationsHelper.getEducation(character.education).name : "None"),
        new SectionContent("TRAIT", character.adolescenceEvent ? character.adolescenceEvent.trait : undefined),
        new CareerSectionContent(character.careers.length > 0 ? character.careers[0] : undefined, 0),
        new CareerSectionContent(character.careers.length > 1 ? character.careers[1] : undefined, 1),
        new CareerSectionContent(character.careers.length > 2 ? character.careers[2] : undefined, 2),
        new CareerSectionContent(character.careers.length > 3 ? character.careers[3] : undefined, 3),
        new SectionContent("EARNINGS", character.earnings),
        new SectionContent("ASSETS", character.attributes[Attribute.Personality].value + character.assets),
        new SectionContent("FAME", character.fame),
    ];

    private _attributes1: Attribute[] = [
        Attribute.Agility,
        Attribute.Awareness,
        Attribute.Coordination,
        Attribute.Intelligence
    ];

    private _attributes2: Attribute[] = [
        Attribute.Mental_Strength,
        Attribute.Personality,
        Attribute.Physique,
        Attribute.Strength
    ];

    get dataSection() {
        return this._data;
    }

    get firstAttributesSection() {
        return this._attributes1;
    }

    get secondAttributesSection() {
        return this._attributes2;
    }

    private displayAdolescenceEvent() {
        if (character.adolescenceEvent) {
            let ev = `${character.adolescenceEvent.trait}: ${character.adolescenceEvent.effect}`;

            if (character.adolescenceEvent.hereticEvent) {
                ev += ` Heretic: ${character.adolescenceEvent.hereticEvent.effect}`;
            }

            return ev;
        }

        return undefined;
    }

    private displayStatus() {
        return character.status >= 0
            ? StatusHelper.getStatus(character.status).name
            : character.pillar >= 0
                ? PillarsHelper.getPillar(character.pillar).name
                : "None";
    }
}

export class CharacterSheet extends React.Component<ICharacterSheetProperties, {}> {
    private _sheetData: CharacterSheetData;

    constructor(props: ICharacterSheetProperties) {
        super(props);

        this._sheetData = new CharacterSheetData();

        Events.listen(EventIdentity.UpdateCharacter, () => {
            this._sheetData = new CharacterSheetData();
            this.forceUpdate();
        });
    }

    render() {
        const data = this._sheetData.dataSection.map((s, i) => {
            return (
                <tr key={i}>
                    <td className="bg-dark">{s.name}</td>
                    <td className="bg-light border-dark text-dark">{s.value}</td>
                </tr>
            )
        });

        const events = character.careerEvents.map((e, i) => {
            const hereticEvent = e.hereticEvent
                ? <div>{e.hereticEvent.effect}<br /></div>
                : "";
            return (
                <div key={i}>
                    <div>{e.effect}{e.trait.length > 0 ? " Trait: " + e.trait : ""}</div>
                    <br />
                    {hereticEvent}
                </div>
            )
        });

        const attributesAndSkills1 = this._sheetData.firstAttributesSection.map((a, i) => {
            const skills = SkillsHelper.getSkillsForAttribute(a).map((s, i) => {
                const legendary = character.skills[s].isSignature
                    ? (<span className="signature">S</span>)
                    : undefined;

                return (
                    <tr key={i}>
                        <td className="bg-light border-dark text-dark sheet-skillname">
                            {SkillsHelper.getSkillName(s).toLocaleUpperCase()}
                            {legendary}
                        </td>
                        <td className="bg-light border-dark text-dark text-center">{character.skills[s].expertise}</td>
                        <td className="bg-light border-dark text-dark text-center">{character.skills[s].focus}</td>
                    </tr>
                )
            });

            return (
                <table className="sheet-section" key={i}>
                    <tbody>
                        <tr>
                            <td className="bg-dark-wide" style={{ padding: "4px" }}>{AttributesHelper.getAttributeName(a).toLocaleUpperCase()}</td>
                            <td colSpan={2} className="bg-light border-dark text-dark text-center">{character.attributes[a].value}</td>
                        </tr>
                        {skills}
                    </tbody>
                </table>
            )
        });

        const attributesAndSkills2 = this._sheetData.secondAttributesSection.map((a, i) => {
            const skills = SkillsHelper.getSkillsForAttribute(a).map((s, i) => {
                const legendary = character.skills[s].isSignature
                    ? (<span className="signature">S</span>)
                    : undefined;

                return (
                    <tr key={i}>
                        <td className="bg-light border-dark text-dark sheet-skillname">
                            {SkillsHelper.getSkillName(s).toLocaleUpperCase()}
                            {legendary}
                        </td>
                        <td className="bg-light border-dark text-dark text-center">{character.skills[s].expertise}</td>
                        <td className="bg-light border-dark text-dark text-center">{character.skills[s].focus}</td>
                    </tr>
                )
            });

            return (
                <table className="sheet-section" key={i}>
                    <tbody>
                        <tr>
                            <td className="bg-dark-wide" style={{ padding: "4px" }}>{AttributesHelper.getAttributeName(a).toLocaleUpperCase()}</td>
                            <td colSpan={2} className="bg-light border-dark text-dark text-center">{character.attributes[a].value}</td>
                        </tr>
                        {skills}
                    </tbody>
                </table>
            )
        });

        let characterTalents = [];
        for (var talent in character.talents) {
            var t = character.talents[talent];
            var tt = TalentsHelper.getTalent(talent);
            if (tt && tt.maxRank > 1) {
                characterTalents.push(talent + " [Rank: " + t.rank + "]");
            } else {
                characterTalents.push(talent);
            }
        }

        const talents = characterTalents.map((t, i) => {
            return (<div key={i}>{t}</div>)
        });

        const equipment = character.equipment.map((e, i) => {
            return (<div key={i}>{e}</div>)
        });

        const languages = character.languages.map((l, i) => {
            return (<div key={i}>{l}</div>)
        });

        let heretic = undefined;
        if (character.isHeretic()) {
            const gifts = character.darkGifts.map((d, i) => {
                return (<div key={i}>{DarkGiftHelper.getDarkGift(d).name}</div>);
            });

            const stigmata = character.stigmata.map((s, i) => {
                return (<div key={i}>{s}</div>);
            });

            heretic = (
                <div className="sheet-panel">
                    <table className="sheet-section">
                        <tbody>
                            <tr>
                                <td className="bg-dark" colSpan={2}>HERESY</td>
                            </tr>
                            <tr>
                                <td className="bg-dark">PATRON APOSTLE</td>
                                <td className="bg-light border-dark text-dark">{Apostle[character.patron]}</td>
                            </tr>
                            <tr>
                                <td className="bg-dark">RANK</td>
                                <td className="bg-light border-dark text-dark">{HereticHelper.getRank(character.hereticRank).name}</td>
                            </tr>
                            <tr>
                                <td className="bg-dark">PERSONAL DARK SYMMETRY</td>
                                <td className="bg-light border-dark text-dark">{HereticHelper.getDarkSymmetryPool(character.hereticRank)}</td>
                            </tr>
                            <tr>
                                <td className="bg-dark">DEGENERATION</td>
                                <td className="bg-light border-dark text-dark">{character.degeneration || "None"}</td>
                            </tr>
                            <tr>
                                <td className="bg-dark">DARK GIFTS</td>
                                <td className="bg-light border-dark text-dark">{gifts}</td>
                            </tr>
                            <tr>
                                <td className="bg-dark">STIGMATA</td>
                                <td className="bg-light border-dark text-dark">{stigmata}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }

        let containerClass = "sheet-container";
        if (this.props.isVisible) {
            containerClass = "sheet-container-nonfixed";
        }

        return (
            <div id="character-sheet" className="sheet-hidden">
                <div className="sheet-bg" id="sheet-bg" style={{ display: "none" }}></div>
                <div className={containerClass} id="sheet-container">
                    <div className="sheet-panel">
                        <table className="sheet-section">
                            <tbody>
                                {data}
                                <tr>
                                    <td className="bg-dark">EVENTS</td>
                                    <td className="bg-light border-dark text-dark">{events}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="sheet-panel">
                        {attributesAndSkills1}
                    </div>
                    <div className="sheet-panel">
                        {attributesAndSkills2}
                    </div>
                    <div className="sheet-panel">
                        <table className="sheet-section">
                            <tbody>
                                <tr>
                                    <td className="bg-dark">TALENTS</td>
                                    <td className="bg-light border-dark-nopadding text-dark">
                                        {talents}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="sheet-panel">
                        <table className="sheet-section">
                            <tbody>
                                <tr>
                                    <td className="bg-dark">EQUIPMENT</td>
                                    <td className="bg-light border-dark text-dark">
                                        {equipment}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="sheet-panel">
                        <table className="sheet-section">
                            <tbody>
                                <tr>
                                    <td className="bg-dark">LANGUAGES</td>
                                    <td className="bg-light border-dark text-dark">
                                        {languages}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {heretic}
                    <br />
                </div>
            </div>
        );
    }
}