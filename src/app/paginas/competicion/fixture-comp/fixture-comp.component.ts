import { Component, OnInit } from '@angular/core';
import { CompeticionesService } from '../../../servicios/competiciones.service';
import { Season } from '../../../modelos/season';
import { Competition } from '../../../modelos/competition';
import { FixtureStageTypeComp } from 'src/app/modelos/fixtureStageTypeComp';
import { flatMap } from 'rxjs/operators';
import { StandingsAll } from '../../../modelos/standings';
import { Match } from 'src/app/modelos/match';


@Component({
  selector: 'app-fixture-comp',
  templateUrl: './fixture-comp.component.html',
  styles: []
})

//new Date().toISOString().slice(0,10) --> "dddd/mm/dd"

export class FixtureCompComponent implements OnInit {

  private competencia: Competition;
  private season: Season;
  private fixture: FixtureStageTypeComp;
  private cantPartCadaFecha: number;
  
  private startSeasonYear: number;
  private endSeasonYear: number;
  // private loading: boolean;


  constructor(private _compSrv: CompeticionesService) { }

  ngOnInit() {  

    this._compSrv.observableSeason.pipe(flatMap((season: StandingsAll)=> {
      this.competencia= season.competition;
      this.season= season.season;

      this.startSeasonYear= new Date(this.season.startDate).getFullYear();
      this.endSeasonYear= new Date(this.season.endDate).getFullYear();

      return this._compSrv.getPartidosMatchDay(this.competencia.id, this.season.currentMatchday);

    }),flatMap((partidos: Match[])=> {

      this.cantPartCadaFecha= partidos.length;    

      return this._compSrv.observableFixture;

    })).subscribe((fixture: FixtureStageTypeComp)=>{
      this.fixture= fixture;    
    })
    
  }


}