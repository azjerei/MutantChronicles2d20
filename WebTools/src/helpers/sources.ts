export enum Source {
    Core,
    Bauhaus,
    Capitol,
    Cybertronic,
    Imperial,
    Mishima,
    Whitestar,
    Brotherhood,
    LunaPDFreelancers,
    Cartel,
    DarkSoul,
    Mutants,
    DarkEden
}

class SourceModel {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class SourceViewModel extends SourceModel {
    id: Source;

    constructor(id: Source, base: SourceModel) {
        super(base.name);
        this.id = id;
    }
}

class Sources {
    private _sources: { [id: number]: SourceModel } = {
        [Source.Core]: new SourceModel("Core"),
        [Source.Bauhaus]: new SourceModel("Bauhaus"),
        [Source.Capitol]: new SourceModel("Capitol"),
        [Source.Cybertronic]: new SourceModel("Cybertronic"),
        [Source.Imperial]: new SourceModel("Imperial"),
        [Source.Mishima]: new SourceModel("Mishima"),
        [Source.Whitestar]: new SourceModel("Whitestar"),
        [Source.Brotherhood]: new SourceModel("Brotherhood"),
        [Source.LunaPDFreelancers]: new SourceModel("LPD & Freelancers"),
        [Source.Cartel]: new SourceModel("Cartel"),
        [Source.DarkEden]: new SourceModel("Dark Eden"),
        [Source.DarkSoul]: new SourceModel("Dark Soul"),
        [Source.Mutants]: new SourceModel("Mutants")
    };

    getSources() {
        var sources: SourceViewModel[] = [];
        var n = 0;

        for (var src in this._sources) {
            const source = this._sources[src];
            sources.push(new SourceViewModel(n, source));
            n++;
        }

        return sources;
    }
}

export const SourcesHelper = new Sources();