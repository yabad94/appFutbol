import { Team } from "./team";
import { Competition } from './competition';
import { Season } from './season';

export class StandingsAll{
    competition: Competition;
    season: Season;
    standings: Standings[]
}

export class Standings {
    stage: string;
    type: string;
    group?: any;
    table: TablePlace[]
}

export class TablePlace {
    position: number;
    team: Team;
    playedGames: number;
    won: number;
    draw: number;
    lost: number;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number
}