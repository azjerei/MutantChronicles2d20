import * as React from 'react';
import {character, CharacterCareer} from '../common/character';
import {IPageProperties} from './pageFactory';
import {CharacterSerializer} from '../common/characterSerializer';
import {EventModel, AdolescenceEventModel, CareerEventModel} from '../common/eventModel';
import {FactionEventModel} from '../helpers/factionEvents';
import {Skill} from '../helpers/skills';
import {Attribute} from '../helpers/attributes';
import { Faction } from '../helpers/factions';
import { Clan } from '../helpers/clans';
import { Education } from '../helpers/educations';
import { IconicCareer } from '../helpers/iconicCareers';
import { PrimaryCareer } from '../helpers/primaryCareers';
import { Environment } from '../helpers/environments';

export class ExportTestPage extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);

        character.name = "Hubba Bubba";
        character.age = 34;
        character.gender = 0;
        character.faction = Faction.Imperial;
        character.heritage = Faction.Imperial;
        character.skills[Skill.RangedWeapons].expertise++;
        character.skills[Skill.RangedWeapons].isSignature = true;
        character.skills[Skill.Pilot].expertise++;
        character.addTalent("Kinsman of Imperial");
        character.factionEvent = "A contact in Bauhaus owes you significant funds (3 assets)";
        character.clan = Clan.Bartholomew;
        character.status = 3;
        character.attributes[Attribute.Physique].value++;
        character.attributes[Attribute.Personality].value++;
        character.skills[Skill.Observation].expertise++;
        character.earnings = 3;
        character.addEquipment("Mini-torch");
        character.attributes[Attribute.Mental_Strength].value++;
        character.skills[Skill.Pilot].focus++;
        character.addEquipment("Basic urban survival kit");
        character.environment = Environment.AsteroidBelt;
        character.birthPlace = "Urban";
        character.education = Education.NewBristol;
        character.skills[Skill.Athletics].expertise++;
        character.skills[Skill.CloseCombat].expertise++;
        character.skills[Skill.Education].expertise++;
        character.skills[Skill.RangedWeapons].focus++;
        character.skills[Skill.Survival].expertise++;
        character.skills[Skill.Acrobatics].expertise++;
        character.skills[Skill.Resistance].expertise++;
        character.addTalent("Through and Through");
        character.addEquipment("Pair of light military shoulder pads");
        character.addEquipment("Set of regular quality military fatigues");
        character.adolescenceEvent = new AdolescenceEventModel(new EventModel("", "Slow to react", "Your Mental Strength tests against mental assaults are one difficulty lower (minimum one), but you always go last (after NPCs) in Initiative unless you pay 1DSP."));
        character.addPrimaryCareer(PrimaryCareer.MilitaryTrencher, 4);
        character.attributes[Attribute.Strength].value += 2;
        character.attributes[Attribute.Physique].value += 2;
        character.attributes[Attribute.Agility].value++;
        character.attributes[Attribute.Awareness].value++;
        character.attributes[Attribute.Coordination].value += 2;
        character.attributes[Attribute.Intelligence].value++;
        character.attributes[Attribute.Mental_Strength].value += 2;
        character.skills[Skill.Athletics].expertise++;
        character.skills[Skill.CloseCombat].focus++;
        character.skills[Skill.CloseCombat].isSignature = true;
        character.skills[Skill.RangedWeapons].expertise++;
        character.skills[Skill.Survival].expertise++;
        character.skills[Skill.Acrobatics].expertise++;
        character.addTalent("Through and Through");
        character.addEquipment("Ballistic nylon military uniform");
        character.addEquipment("Invader Battle Rifle");
        character.addEquipment("Pair of medium military shoulder pads");
        character.careerEvents.push(new CareerEventModel(new EventModel("", "Paranoia", "They are on to you! What have you done?")));
        character.addIconicCareer(IconicCareer.Stormtrencher, 4);
        character.skills[Skill.Survival].expertise++;
        character.skills[Skill.Survival].focus++;
        character.skills[Skill.Space].expertise += 2;
        character.skills[Skill.Resistance].expertise += 2;
        character.skills[Skill.Observation].expertise += 2;
        character.skills[Skill.CloseCombat].expertise++;
        character.skills[Skill.CloseCombat].focus++;
        character.skills[Skill.Space].isSignature = true;
        character.addTalent("Deflection");
        character.addTalent("Astronaut");
        character.addEquipment("P60 Punisher Handgun");
        character.addEquipment("Punisher Short Sword");
        character.earnings = 4;
        character.careerEvents.push(new CareerEventModel(new EventModel("", "", "Something, something, dark side...")));
        character.chroniclePoints = 2;
        character.addTalent("Riposte");
        character.update();
        character.addTalent("Viridulum Minoris");
        character.addTalent("Viridulum Mediatoris");
        character.skills[Skill.Persuade].expertise = 4;
        character.skills[Skill.Persuade].focus = 2;
        character.skills[Skill.Command].expertise = 3;
        character.skills[Skill.Command].focus = 1;
    }

    render() {
        const characterData = CharacterSerializer.serialize(character);

        const data = characterData.map((d, i) => {
            return (<input type="hidden" name={d.name} value={d.value}/>)
        });

        //const url = "http://localhost:52355/api/sheet";
        const url = "http://pdf.modiphiusapps.hostinguk.org/api/sheet";

        return (
            <div className="page">
                <div className="panel button-container">
                    <form action={url} method="post" encType="application/x-www-form-urlencoded" target="_blank">
                        {data}
                        <input type="submit" value="Export PDF"/>
                    </form>
                    <br/>
                </div>
            </div>
        );
    }
}