export interface Fish {
  id?: string;
  name: string;
  temp: number;
  ph: number;
  gh: number;
  kh: number;
  nitrate: number;
}

export interface FishFormData {
  name: string;
  temp: number;
  ph: number;
  gh: number;
  kh: number;
  nitrate: number;
}

export interface AquariumFish extends Fish {
  aquariumFishId: number;
}
