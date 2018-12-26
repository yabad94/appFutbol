import { ScoreResult } from './scoreResult';

export class Score{
    duration: string;
    winner?: string;
    extraTime?: ScoreResult;
    fullTime?: ScoreResult;
    halfTime?: ScoreResult;
    penalties?: ScoreResult
}