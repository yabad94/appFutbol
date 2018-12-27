import { Area } from "./area";
import { CurrentSeason } from "./currentSeason";

export class Competition {
    id: number;
    area: Area;
    currentSeason?: CurrentSeason;
    name: string;
    code: string;
    plan: string;
    numberOfAvailableSeasons?: number;
    lastUpdated?: string
}