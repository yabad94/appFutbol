import { Area } from "./area";
import { Competition } from './competition';

export class Team{
    id: number;
    name: string;
    crestUrl?: string
}

export class TeamInfo{
    id: number;
    area: Area;
    activeCompetitions: Competition[];
    name: string;
    shortName: string;
    tla: string;
    crestUrl: string;
    address: string;
    phone: string;
    website: string;
    email?: string;
    founded: number;
    venue: string;
    squad: Squad;
    lastUpdated?: string;
}

export class Squad{
    players: Player[];
    lastUpdated?: string;
}

export class Player{
    id: number;
    name: string;
    position: string;
    dateOfBirth: string;
    countryOfBirth: string;
    nationality: string;
    shirtNumber: number;
    role: string
}