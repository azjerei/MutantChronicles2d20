export class EventModel {
    event: string;
    trait: string;
    effect: string;
    options: string[];
    onOptionSelected: (option: string) => void;
    detailView: string;
    hereticEvent: CareerEventModel;

    constructor(event: string, trait: string, effect: string, options?: string[], onOptionSelected?: (option: string) => void, detailView?: string) {
        this.event = event;
        this.trait = trait;
        this.effect = effect;
        this.options = options;
        this.onOptionSelected = onOptionSelected;
        this.detailView = detailView;
    }
}

export class AdolescenceEventModel extends EventModel {
    onApply: () => void;

    constructor(base: EventModel, onApply?: () => void) {
        super(base.event, base.trait, base.effect, base.options, base.onOptionSelected, base.detailView);
        this.onApply = onApply;
    }
}

export class CareerEventModel extends EventModel {
    onApply: () => void;

    constructor(base: EventModel, onApply?: () => void) {
        super(base.event, base.trait, base.effect, base.options, base.onOptionSelected, base.detailView);
        this.onApply = onApply;
    }
}