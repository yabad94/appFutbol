import { Area } from './area';
import { Season } from 'src/app/modelos/season';

export class HistoricalCompWinners{
    area: Area;
    code: string;
    currentSeason: Season;
    emblemUrl?: string;
    id: number;
    name: string;
    seasons: Season[];
}