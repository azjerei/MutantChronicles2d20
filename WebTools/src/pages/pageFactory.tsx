import * as React from 'react';
import {TimelinePage} from './timelinePage';
import {PathSelectionPage} from './pathSelectionPage';
import {AttributesPage} from './attributesPage';
import {AttributesPage_LifePoints} from './attributesPage_LifePoints';
import {FactionPage} from './factionPage';
import {HeritagePage} from './heritagePage';
import {FactionDetailsPage} from './factionDetailsPage';
import {FactionEventPage} from './factionEventPage';
import {StatusPage} from './statusPage';
import {StatusDetailsPage} from './statusDetailsPage';
import {PillarPage} from './pillarPage';
import {PillarDetailsPage} from './pillarDetailsPage';
import {HousePage} from './housePage';
import {HouseDetailsPage} from './houseDetailsPage';
import {EnvironmentPage} from './environmentPage';
import {EnvironmentDetailsPage} from './environmentDetailsPage';
import {EducationPage} from './educationPage';
import {EducationDetailsPage} from './educationDetailsPage';
import {AdolescenceEventPage} from './adolescenceEventPage';
import {AfterEventPage} from './afterEventPage';
import {EventDetailsPage} from './eventDetailsPage';
import {PrimaryCareerPage} from './primaryCareerPage';
import {PrimaryCareerDetailsPage} from './primaryCareerDetailsPage';
import {IconicCareerPage} from './iconicCareerPage';
import {IconicCareerDetailsPage} from './iconicCareerDetailsPage';
import {CareerEventPage} from './careerEventPage';
import {FiredPage} from './firedPage';
import {CriminalRecordPage} from './criminalRecordPage';
import {FinalTweaksPage} from './finalTweaksPage';
import {FinalTweaks_LifePoints} from './finalTweaks_LifePoints';
import {FinishPage} from './finishPage';
import {DarkGiftsPage} from './darkGiftsPage';
import {ClanPage} from './clanPage';
import {FamilyPage} from './familyPage';
import {ClanDetailsPage} from './clanDetailsPage';
import {ExportTestPage} from './exportTestPage';
import { TalentsOverviewPage } from './talentsOverviewPage';
import { ToolSelectionPage } from './toolSelectionPage';

export enum PageIdentity {
    ToolSelection,
    Timeline,
    PathSelection,
    Attributes,
    Attributes_LifePoints,
    Faction,
    Heritage,
    FactionDetails,
    FactionEvent,
    Clan,
    Family,
    ClanDetails,
    Status,
    StatusDetails,
    Pillar,
    PillarDetails,
    House,
    HouseDetails,
    Environment,
    EnvironmentDetails,
    Education,
    EducationDetails,
    AdolescenceEvent,
    PrimaryCareer1,
    PrimaryCareer2,
    PrimaryCareer3,
    PrimaryCareer4,
    PrimaryCareerDetails1,
    PrimaryCareerDetails2,
    PrimaryCareerDetails3,
    PrimaryCareerDetails4,
    IconicCareer,
    IconicCareerDetails,
    CareerEvent1,
    CareerEvent2,
    CareerEvent3,
    CareerEvent4,
    DarkGifts,
    FinalTweaks,
    FinalTweaks_LifePoints,
    Finish,

    AfterEvent,
    EventDetails,
    Fired,
    CriminalRecord,

    TalentsOverview,

    ExportTest
}

export interface IPageProperties {
}

export class PageFactory {
    private factories = {};

    constructor() {
        this.factories = {};
        this.factories[PageIdentity.ToolSelection] = () => <ToolSelectionPage />;
        this.factories[PageIdentity.Timeline] = () => <TimelinePage/>;
        this.factories[PageIdentity.PathSelection] = () => <PathSelectionPage/>;
        this.factories[PageIdentity.Attributes] = () => <AttributesPage/>;
        this.factories[PageIdentity.Attributes_LifePoints] = () => <AttributesPage_LifePoints/>;
        this.factories[PageIdentity.Faction] = () => <FactionPage/>;
        this.factories[PageIdentity.Heritage] = () => <HeritagePage/>;
        this.factories[PageIdentity.FactionDetails] = () => <FactionDetailsPage/>;
        this.factories[PageIdentity.FactionEvent] = () => <FactionEventPage/>;
        this.factories[PageIdentity.Status] = () => <StatusPage/>;
        this.factories[PageIdentity.StatusDetails] = () => <StatusDetailsPage/>;
        this.factories[PageIdentity.Pillar] = () => <PillarPage/>;
        this.factories[PageIdentity.PillarDetails] = () => <PillarDetailsPage/>;
        this.factories[PageIdentity.House] = () => <HousePage/>;
        this.factories[PageIdentity.HouseDetails] = () => <HouseDetailsPage/>;
        this.factories[PageIdentity.Environment] = () => <EnvironmentPage/>;
        this.factories[PageIdentity.EnvironmentDetails] = () => <EnvironmentDetailsPage/>;
        this.factories[PageIdentity.Education] = () => <EducationPage/>;
        this.factories[PageIdentity.EducationDetails] = () => <EducationDetailsPage/>;
        this.factories[PageIdentity.AdolescenceEvent] = () => <AdolescenceEventPage/>;
        this.factories[PageIdentity.AfterEvent] = () => <AfterEventPage/>;
        this.factories[PageIdentity.PrimaryCareer1] = () => <PrimaryCareerPage/>;
        this.factories[PageIdentity.PrimaryCareer2] = () => <PrimaryCareerPage/>;
        this.factories[PageIdentity.PrimaryCareer3] = () => <PrimaryCareerPage/>;
        this.factories[PageIdentity.PrimaryCareer4] = () => <PrimaryCareerPage/>;
        this.factories[PageIdentity.PrimaryCareerDetails1] = () => <PrimaryCareerDetailsPage/>;
        this.factories[PageIdentity.PrimaryCareerDetails2] = () => <PrimaryCareerDetailsPage/>;
        this.factories[PageIdentity.PrimaryCareerDetails3] = () => <PrimaryCareerDetailsPage/>;
        this.factories[PageIdentity.PrimaryCareerDetails4] = () => <PrimaryCareerDetailsPage/>;
        this.factories[PageIdentity.IconicCareer] = () => <IconicCareerPage/>;
        this.factories[PageIdentity.IconicCareerDetails] = () => <IconicCareerDetailsPage/>;
        this.factories[PageIdentity.CareerEvent1] = () => <CareerEventPage/>;
        this.factories[PageIdentity.CareerEvent2] = () => <CareerEventPage/>;
        this.factories[PageIdentity.CareerEvent3] = () => <CareerEventPage/>;
        this.factories[PageIdentity.CareerEvent4] = () => <CareerEventPage/>;
        this.factories[PageIdentity.EventDetails] = () => <EventDetailsPage/>;
        this.factories[PageIdentity.Fired] = () => <FiredPage/>;
        this.factories[PageIdentity.CriminalRecord] = () => <CriminalRecordPage/>;
        this.factories[PageIdentity.FinalTweaks] = () => <FinalTweaksPage/>;
        this.factories[PageIdentity.FinalTweaks_LifePoints] = () => <FinalTweaks_LifePoints/>;
        this.factories[PageIdentity.DarkGifts] = () => <DarkGiftsPage/>;
        this.factories[PageIdentity.Clan] = () => <ClanPage/>;
        this.factories[PageIdentity.Family] = () => <FamilyPage/>;
        this.factories[PageIdentity.ClanDetails] = () => <ClanDetailsPage/>;
        this.factories[PageIdentity.Finish] = () => <FinishPage />;
        this.factories[PageIdentity.TalentsOverview] = () => <TalentsOverviewPage />;
        this.factories[PageIdentity.ExportTest] = () => <ExportTestPage/>;
    }

    createPage(page: PageIdentity) {
        const factory = this.factories[page];
        if (!factory) {
            console.error(`Unable to find a page factory for ${PageIdentity[page]}`);
        }

        return factory ? factory() : undefined;
    }
}