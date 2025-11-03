
export interface AnimationFrame {
  name: string;
  prompt: string;
}

export interface Character {
  id: string;
  name: string;
  color: string;
  frames: AnimationFrame[];
}

export interface Faction {
  name: string;
  characters: Character[];
}

export interface SpriteData {
  factions: Faction[];
}
