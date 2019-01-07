import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompeticionesService } from '../../servicios/competiciones.service';
import { StandingsAll, Standings } from '../../modelos/standings';
import { flatMap } from 'rxjs/operators';
import { Competition } from 'src/app/modelos/competition';
import { Match } from 'src/app/modelos/match';
import { FixtureStageTypeComp } from 'src/app/modelos/fixtureStageTypeComp';

declare let $: any;

@Component({
  selector: 'app-competicion',
  templateUrl: './competicion.component.html',
  styles: [
    ` 

    `
  ]
})

export class CompeticionComponent implements OnInit {

  public standings: StandingsAll;
  private loading: boolean;
  private idParam: number;
  private startSeasonYear: number;
  private endSeasonYear: number;
  private homeTableComp: Standings[];
  private awayTableComp: Standings[];
  private totalTableComp: Standings[];
  private competition: Competition;
  
  //variables nuevas traidas de fixture
  private matchesAllSeason: Match[];  //capaz lo borro.
  private cantidadPartidosxFecha: number;
  private estadosMatchessFixture: FixtureStageTypeComp[];

  constructor(private route: ActivatedRoute, private _compSrv: CompeticionesService, private router: Router) { 

  }

  ngOnInit() {

    this.loading= true;

      this.route.paramMap.pipe(flatMap(params=> {
        this.idParam= parseInt(params.get('id'));  
        
        return this._compSrv.getTablaCompetencia(this.idParam)

      }), flatMap((standings1: StandingsAll)=> {
        this.competition= standings1.competition;
        this.standings= standings1;
        this._compSrv.subjectSeason.next(standings1);
        this.startSeasonYear= new Date(this.standings.season.startDate).getFullYear();
        this.endSeasonYear= new Date(this.standings.season.endDate).getFullYear(); 

        this.homeTableComp= []; this.awayTableComp= []; this.totalTableComp= [];

        for(let i=0; i< this.standings.standings.length; i++){

          switch(this.standings.standings[i].type) {
            case 'TOTAL':
              this.totalTableComp.push(this.standings.standings[i]);
              break;
            case 'HOME':
              this.homeTableComp.push(this.standings.standings[i]);
              break;
            default:
              this.awayTableComp.push(this.standings.standings[i]);
              break;           
          }

        }
                
        return this._compSrv.getPartidosCompetenciaFechas(standings1.competition.id, standings1.season.startDate, standings1.season.endDate)
        
      }), flatMap((datos: Match[])=> {
        this.matchesAllSeason= [];
        this.matchesAllSeason= datos; 
        this.organizarPorTipoFixture(datos);
        return this._compSrv.getPartidosMatchDay(this.standings.competition.id, this.standings.season.currentMatchday);

      })).subscribe((datos: Match[])=>{
          this.cantidadPartidosxFecha= datos.length; 
          this.loading= false;

      }, (error)=> {
         console.log(error);
        this.loading= false;
      });

  }

  organizarPorTipoFixture(partidos: Match[]){
    let stages: string[]= [];
    this.estadosMatchessFixture= [];

    for(let i=0; i< partidos.length; i++){
      if(!stages.includes(partidos[i].stage)){
       stages.push(partidos[i].stage);
      }      
    }

    for(let i=0; i< stages.length; i++){
      let estadoMatchesFixture: FixtureStageTypeComp= { name_stage: null, matches: [] };
     
      estadoMatchesFixture.name_stage= stages[i];
      for(let x=0; x< partidos.length; x++){
        if(stages[i]=== partidos[x].stage){
          estadoMatchesFixture.matches.push(partidos[x]);
        }
      }  

      this.estadosMatchessFixture.push(estadoMatchesFixture);

    }

  } 

  stageFixtureSelected(fixture: FixtureStageTypeComp){    

    this._compSrv.subjectFixture.next(fixture);
    setTimeout(() => { this.router.navigate(['fixture-comp']) }, 300);

  }

}