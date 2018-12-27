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

export class Head2Head{

    numberOfMatches: number;
    awayTeam: TeamH2H;
    homeTeam: TeamH2H
}

export class TeamH2H{

    wins: number;
    draws: number;
    losses: number
}

export class IndividualMatch{
    
    head2head: Head2Head;
    match: Match
}