import { Area } from "./area";
import { Season } from './season';

export class Competition {
    id: number;
    area: Area;
    currentSeason?: Season;
    name: string;
    code: string;
    plan: string;
    numberOfAvailableSeasons?: number;
    lastUpdated?: string
}