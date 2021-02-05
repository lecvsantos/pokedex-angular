export interface Pokemon {
    name: string;
    sprite: string;
    types: any;
}

export interface PokemonResults {
    results: Array<Pokemon>;
}
