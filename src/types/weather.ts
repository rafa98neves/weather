import type { ICoordinates } from "./localizations";


export interface IWeatherDetails {
    apparent_temperature: string[];
    precipitation_probability: string[];
    temperature_2m: string[];
    time: string[];
}

export interface IWeatherUnits {
    apparent_temperature: string;
    precipitation_probability: string;
    temperature_2m: string;
    time: string;
}

export interface IParsedWeatherUnits extends IWeatherUnits {
    id: number,
    icon: string;
}

export interface IWeather extends ICoordinates {
    id: number;
    hourly: IWeatherDetails
    hourly_units: IWeatherUnits
}