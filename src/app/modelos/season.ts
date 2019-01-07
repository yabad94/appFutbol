import { TeamInfo } from './team';

export class Season{
    currentMatchday: number;
    endDate: string;
    id: number;
    startDate: string;
    winner?: TeamInfo
}