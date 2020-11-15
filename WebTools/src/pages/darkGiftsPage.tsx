import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {CheckBox} from '../components/checkBox';
import {Dialog} from '../components/dialog';
import {Endowment, DarkGiftHelper, DarkGiftViewModel} from '../helpers/darkGifts';
import {HereticHelper} from '../helpers/hereticRanks';
import {Apostle, ApostleHelper} from '../helpers/apostles';

interface IPageState {
    showOptionalDistribution: boolean;
}

export class DarkGiftsPage extends React.Component<IPageProperties, IPageState> {
    private _numDarkGifts: number;
    private _numEndowments: number;
    private _numOptional: number;
    private _gifts;
    private _selectedGifts;
    private _selectedEndowments;
    private _selectedOptional;

    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showOptionalDistribution: false
        };

        this._selectedGifts = [];
        this._selectedEndowments = [];
        this._selectedOptional = [];

        this._gifts = DarkGiftHelper.getDarkGifts(character.patron).filter(g => !character.hasDarkGift(g.id));

        this._numDarkGifts = character.numDarkGifts + HereticHelper.getDarkGifts(character.hereticRank);
        this._numEndowments = character.numBoons + HereticHelper.getEndowments(character.hereticRank);
        this._numOptional = HereticHelper.getOptional(character.hereticRank);
    }

    render() {
        const darkGifts = this._gifts.map((g, i) => {
            return (
                <tr key={i}>
                    <td className="selection-header">{g.name}</td>
                    <td>{g.effect}</td>
                    <td>
                        <CheckBox
                            isChecked={this._selectedGifts.indexOf(g.id) > -1 }
                            value={g.id}
                            onChanged={(val) => this.selectGift(g.id) }/>
                    </td>
                </tr>
            );
        });

        const darkGiftsSelection = this._numDarkGifts > 0
            ? <div className="panel">
                <div className="header-small">DARK GIFTS (SELECT {this._numDarkGifts}) </div>
                <table className="selection-list">
                    <tbody>
                        {darkGifts}
                    </tbody>
                </table>
              </div>
            : undefined;

        const endowments = this.getEndowments();

        if (!this.state.showOptionalDistribution) {
            return (
                <div className="page">
                    <PageHeader text="DARK GIFTS" />
                    <div className="page-text">
                        Choose the Dark Gifts you have been bestowed during your lifepath.
                    </div>
                    {darkGiftsSelection}
                    {endowments}
                    <Button text="NEXT" className="button-next" onClick={() => { this.onNext(); } }/>
                </div>
            );
        }
        else {
            return this.renderOptional();
        }
    }

    private renderOptional() {
        const darkGifts = this._gifts.map((g, i) => {
            return (
                <tr key={i}>
                    <td className="selection-header">{g.name}</td>
                    <td>{g.effect}</td>
                    <td>
                        <CheckBox
                            isChecked={this._selectedOptional.indexOf(g.id) > -1 }
                            value={g.id}
                            onChanged={(val) => this.selectGift(g.id) }/>
                    </td>
                </tr>
            );
        });

        const darkGiftsSelection = this._numOptional > 0
            ? <div className="panel">
                <div className="header-small">DARK GIFTS (SELECT UP TO {this._numOptional}) </div>
                <table className="selection-list">
                    <tbody>
                        {darkGifts}
                    </tbody>
                </table>
            </div>
            : undefined;

        const endowments = this.getEndowments();

        return (
            <div className="page">
                <PageHeader text="DARK GIFTS" />
                <div className="page-text">
                    You may now distribute any optional points between Dark Gifts and Endowments from your patron Apostle.
                </div>
                {darkGiftsSelection}
                {endowments}
                <Button text="NEXT" className="button-next" onClick={() => { this.onNext(); } }/>
            </div>
        );
    }

    private selectGift(gift: Endowment) {
        if (!this.state.showOptionalDistribution) {
            if (this._selectedGifts.indexOf(gift) > -1) {
                this._selectedGifts.splice(this._selectedGifts.indexOf(gift), 1);
            }
            else {
                if (this._selectedGifts.length < this._numDarkGifts) {
                    this._selectedGifts.push(gift);
                }
            }
        }
        else {
            if (this._selectedOptional.indexOf(gift) > -1) {
                this._selectedOptional.splice(this._selectedOptional.indexOf(gift), 1);
            }
            else {
                if (this._selectedOptional.length < this._numOptional) {
                    this._selectedOptional.push(gift);
                }
            }
        }

        this.forceUpdate();
    }

    private selectWeaving(gift: Endowment) {
        if (!this.state.showOptionalDistribution) {
            if (this._selectedEndowments.indexOf(gift) > -1) {
                this._selectedEndowments.splice(this._selectedEndowments.indexOf(gift), 1);
            }
            else {
                if (this._selectedEndowments.length < this._numEndowments) {
                    this._selectedEndowments.push(gift);
                }
            }
        }
        else {
            if (this._selectedOptional.indexOf(gift) > -1) {
                this._selectedOptional.splice(this._selectedOptional.indexOf(gift), 1);
            }
            else {
                if (this._selectedOptional.length < this._numOptional) {
                    this._selectedOptional.push(gift);
                }
            }
        }

        this.forceUpdate();
    }

    private getEndowments() {
        if (!this.state.showOptionalDistribution) {
            if (this._numEndowments > 0) {
                switch (character.patron) {
                    case Apostle.Ilian: return this.getWeavings();
                    case Apostle.Algeroth: return this.getImplants();
                    case Apostle.Demnogonis: return this.getPesticus();
                    case Apostle.Muawijhe:
                    case Apostle.Semai: return this.getDarkInk();
                }
            }
        }
        else {
            if (this._numOptional > 0) {
                switch (character.patron) {
                    case Apostle.Ilian: return this.getWeavings();
                    case Apostle.Algeroth:
                    case Apostle.Demnogonis:
                    case Apostle.Muawijhe:
                    case Apostle.Semai: return this.getEndowmentButton();
                }
            }
        }

        return undefined;
    }

    private getWeavings() {
        const weavings = DarkGiftHelper.getWeavings().map((w, i) => {
            return (
                <tr key={i}>
                    <td className="selection-header">{w.name}</td>
                    <td>{w.effect}</td>
                    <td>
                        <CheckBox
                            isChecked={this._selectedEndowments.indexOf(w.id) > -1 }
                            value={w.id}
                            onChanged={(val) => this.selectWeaving(w.id) }/>
                    </td>
                </tr>
            );
        });

        const limit = !this.state.showOptionalDistribution
            ? `SELECT ${this._numEndowments}`
            : `SELECT UP TO ${this._numOptional}`;

        return (
            <div className="panel">
                <div className="header-small">WEAVINGS ({limit})</div>
                <table className="selection-list">
                    <tbody>
                        {weavings}
                    </tbody>
                </table>
            </div>
        );
    }

    private getImplants() {
        let implants: { name: string, desc: string }[] = [];

        for (var i = 0; i < this._numEndowments; i++) {
            let implant = DarkGiftHelper.generateImplant();
            while (this._selectedEndowments.indexOf(implant) > -1) {
                implant = DarkGiftHelper.generateImplant();
            }

            this._selectedEndowments.push(implant);

            let impl = DarkGiftHelper.getImplant(implant);
            character.addEquipment(impl.name);

            implants.push({ name: impl.name, desc: impl.effect });
        }

        const impls = implants.map((m, i) => {
            return (
                <tr key={i}>
                    <td className="selection-header">{m.name}</td>
                    <td>{m.desc}</td>
                </tr>
            );
        });

        return (
            <div className="panel">
                <div className="header-small">IMPLANTS</div>
                <table className="selection-list">
                    <tbody>
                        {impls}
                    </tbody>
                </table>
            </div>
        );
    }

    private getPesticus() {
        let pesticus: { name: string, desc: string }[] = [];

        for (var i = 0; i < this._numEndowments; i++) {
            let pesticum = DarkGiftHelper.generatePesticum();
            while (this._selectedEndowments.indexOf(pesticum) > -1) {
                pesticum = DarkGiftHelper.generatePesticum();
            }

            this._selectedEndowments.push(pesticum);

            let pest = DarkGiftHelper.getPesticum(pesticum);
            character.addEquipment(pest.name);

            pesticus.push({ name: pest.name, desc: pest.effect });
        }

        const pests = pesticus.map((m, i) => {
            return (
                <tr key={i}>
                    <td className="selection-header">{m.name}</td>
                    <td>{m.desc}</td>
                </tr>
            );
        });

        return (
            <div className="panel">
                <div className="header-small">PESTICUS</div>
                <table className="selection-list">
                    <tbody>
                        {pests}
                    </tbody>
                </table>
            </div>
        );
    }

    private getDarkInk() {
        let ink: { name: string, desc: string }[] = [];

        for (var i = 0; i < this._numEndowments; i++) {
            let boon = DarkGiftHelper.generateDarkInk();
            while (this._selectedEndowments.indexOf(boon) > -1) {
                boon = DarkGiftHelper.generateDarkInk();
            }

            this._selectedEndowments.push(boon);

            let gift = DarkGiftHelper.getDarkInk(boon);
            character.addEquipment(gift.name);

            ink.push({ name: gift.name, desc: gift.effect });
        }

        const inks = ink.map((m, i) => {
            return (
                <tr key={i}>
                    <td className="selection-header">{m.name}</td>
                    <td>{m.desc}</td>
                </tr>
            );
        });

        return (
            <div className="panel">
                <div className="header-small">DARK INK</div>
                <table className="selection-list">
                    <tbody>
                        {inks}
                    </tbody>
                </table>
            </div>
        );
    }

    private getEndowmentButton() {
        const endowmentName = ApostleHelper.getEndowmentName(character.patron).toUpperCase();

        const endowments = this._selectedOptional.map((e, i) => {
            if (e > Endowment.WalkAmongYou) {
                return (
                    <tr key={i}>
                        <td className="selection-header">{DarkGiftHelper.getDarkGift(e).name}</td>
                        <td>{DarkGiftHelper.getDarkGift(e).effect}</td>
                    </tr>
                );
            }
            else {
                return undefined;
            }
        });

        const button = this._selectedOptional.length < this._numOptional
            ? <Button text={`RANDOM ${endowmentName}`} className="button-dark" onClick={() => { this.generateEndowment(); this.forceUpdate(); } }/>
            : undefined;

        return (
            <div className="panel">
                <div className="header-small">{endowmentName} {`(UP TO ${this._numOptional})`}</div>
                {button}
                <br/>
                <table className="selection-list">
                    <tbody>
                        {endowments}
                    </tbody>
                </table>
            </div>
        );
    }

    private generateEndowment() {
        if (this._selectedOptional.length < this._numOptional) {
            switch (character.patron) {
                case Apostle.Algeroth:
                    this._selectedOptional.push(DarkGiftHelper.generateImplant());
                case Apostle.Demnogonis:
                    this._selectedOptional.push(DarkGiftHelper.generatePesticum());
                case Apostle.Muawijhe:
                case Apostle.Semai:
                    this._selectedOptional.push(DarkGiftHelper.generateDarkInk());
            }
        }
    }

    private onNext() {
        if (!this.state.showOptionalDistribution) {
            if (this._numDarkGifts > 0 && this._selectedGifts.length !== this._numDarkGifts) {
                Dialog.show("You have not spent all Dark Gift points.");
                return;
            }

            if (this._numEndowments > 0 && this._selectedEndowments.length !== this._numEndowments) {
                Dialog.show("You have not spent all Endowment points.");
                return;
            }
        }
        else {
            if (this._numOptional > 0 && this._selectedOptional.length !== this._numOptional) {
                Dialog.show("You have not spent all Optional points.");
                return;
            }
        }

        if (!this.state.showOptionalDistribution && this._numOptional > 0) {
            this.save();
            this._gifts = DarkGiftHelper.getDarkGifts(character.patron).filter(g => !character.hasDarkGift(g.id));
            this.setState({ showOptionalDistribution: true });
        }
        else {
            this.save();

            Navigation.navigateToPage(character.isOptional ? PageIdentity.FinalTweaks : PageIdentity.FinalTweaks_LifePoints);
        }
    }

    private save() {
        if (!this.state.showOptionalDistribution) {
            this._selectedGifts.forEach(g => {
                character.addDarkGift(g);
            });

            this._selectedEndowments.forEach(g => {
                if (character.patron === Apostle.Ilian) {
                    character.addDarkGift(g);
                }
                else {
                    character.addEquipment(DarkGiftHelper.getDarkGift(g).name);
                }
            });
        }
        else {
            this._selectedOptional.forEach(g => {
                if (g <= Endowment.WalkAmongYou) {
                    character.addDarkGift(g);
                }
                else {
                    character.addEquipment(DarkGiftHelper.getDarkGift(g).name);
                }
            });
        }
    }
}