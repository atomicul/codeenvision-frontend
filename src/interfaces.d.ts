export interface Sensor {
  id: string;
  latitude: number;
  longitude: number;
  friendlyName: string;
}

export interface Reading {
  day: string;
  humidity: number;
  temperature: number;
  ppm: number;
  dustConcentration: number;
}

