

export interface ICoordinates {
    latitude: number;
    longitude: number;
}

export interface ILocation extends ICoordinates {
    id: number;
    name: string;
    country_id: string;
    country: string;
}