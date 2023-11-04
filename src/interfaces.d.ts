export interface Sensor {
  id: string;
  latitude: number;
  longitude: number;
}

export interface Reading {
  day: string;
  humidity: number;
  temperature: number;
  ppm: number;
  dustConcentration: number;
}

