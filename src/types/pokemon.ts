export interface Pokemon {
  url: string;
  name: string;
  image: string;
  artwork: string;
  dreamworld: string;
}

export interface PokemonData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface BaseName {
  name: string;
  url: string;
}

export interface GameIndex {
  game_index: number;
  version: BaseName;
}

export interface HeldItem {
  item: BaseName;
  version_details: {
    rarity: number;
    version: BaseName;
  }[];
}

export interface Move {
  move: BaseName;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: BaseName;
    version_group: BaseName;
  }[];
}

export interface Sprite {
  front_default: string;
  front_shiny: string;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: BaseName;
}

export interface Type {
  slot: number;
  type: BaseName;
}

export interface PokemonDetails {
  abilities: Ability[];
  base_experience: number;
  forms: BaseName[];
  game_indices: GameIndex[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  species: BaseName;
  sprites: Sprite;
  stats: Stat[];
  types: Type[];
  weight: number;
  status?: boolean;
  message?: string;
}
