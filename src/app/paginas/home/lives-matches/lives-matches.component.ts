import { Component, OnInit } from '@angular/core';
import { CompeticionesService } from '../../../servicios/competiciones.service';
import { Match } from '../../../modelos/match';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-lives-matches',
  templateUrl: './lives-matches.component.html',
  styles: []
})

export class LivesMatchesComponent implements OnInit {

  private partidos: Match[];
  private smsNoPartidos: string;
  private loading: boolean;

  constructor(private _compSrv: CompeticionesService) { }

  ngOnInit() {

    this.loading= true;

    //Con forkJoin me aseguro de mostrar los partidos jugandose en vivo y cuando están en el entretiempo.
    forkJoin( this._compSrv.getPartidosByStatus('IN_PLAY', new Date().toISOString().slice(0,10), new Date().toISOString().slice(0,10)), 
              this._compSrv.getPartidosByStatus('PAUSED', new Date().toISOString().slice(0,10), new Date().toISOString().slice(0,10))
            ).subscribe(([liveMatches, pausedMatches])=> {

              this.partidos= [];

              for(let i=0; i<liveMatches.length; i++){ this.partidos.push(liveMatches[i]); }
              for(let i=0; i<pausedMatches.length; i++){ this.partidos.push(pausedMatches[i]); }
              if(this.partidos.length=== 0){ this.smsNoPartidos= "There aren't live matches at this moment."; }

              for(let i=0; i< this.partidos.length; i++){
                switch(this.partidos[i].competition.name){
                  case "Premier League":
                    this.partidos[i].competition.name= 'PL';
                    break;
                  case "UEFA Champions League":
                    this.partidos[i].competition.name= 'UCL';
                    break;
                  case "Ligue 1":
                    this.partidos[i].competition.name= 'FL1';
                    break;
                  case "Bundesliga":
                    this.partidos[i].competition.name= 'BD1';
                    break;
                  case "Serie A":
                    this.partidos[i].competition.name= 'SA';
                    break;
                  case "Eredivisie":
                    this.partidos[i].competition.name= 'DED';
                    break;
                  case "Primeira Liga":
                    this.partidos[i].competition.name= 'PPL';
                    break;
                  case "Primera Division":
                    this.partidos[i].competition.name= 'LFP';
                    break;
                  case "UEFA Europa League":
                    this.partidos[i].competition.name= 'UEL';
                    break;
                  default:
                    break;  
                }
              }

              this.loading= false;
            }, (error)=> {
              console.log(error, 'error al traer partidos en vivo.');
              this.loading= false;
            });

  }

}
