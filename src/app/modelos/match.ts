import { Team } from './team';
import { Referee } from './referee';
import { Season } from './season';
import { Score } from './score';


export class Match{
    awayTeam: Team;
    id: number;
    homeTeam: Team;
    group?: string;
    lastUpdated?: string;
    matchday: number;
    referees: Referee[];
    score?: Score;
    season: Season;
    stage: string;
    status: string;
    utcDate: string;  
}