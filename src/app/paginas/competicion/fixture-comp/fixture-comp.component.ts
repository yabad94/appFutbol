import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CompeticionesService } from '../../../servicios/competiciones.service';
import { Match } from '../../../modelos/match';
import { Season } from '../../../modelos/season';

@Component({
  selector: 'app-fixture-comp',
  templateUrl: './fixture-comp.component.html',
  styles: []
})

//new Date().toISOString().slice(0,10) --> "dddd/mm/dd"

export class FixtureCompComponent implements OnInit, OnChanges {

  @Input() idCompetencia: number;
  @Input() seasonFixture: Season;
  private matchesAllSeason: Match[]; 
  private nextMatches: Match[];
  private startSeasonYear: number;
  private endSeasonYear: number;

  constructor(private _compSrv: CompeticionesService) { }

  ngOnInit() {   

    // this._compSrv.getPartidosCompetenciaSeason(this.idCompetencia, new Date().getFullYear()).subscribe((datos: Match[])=> {
    //   this.matchesAllSeason= datos;
    //    console.log(this.matchesAllSeason);
    // });
    
  }

  ngOnChanges(cambios: SimpleChanges){

    console.log(cambios);
    this.startSeasonYear= new Date(this.seasonFixture.startDate).getFullYear();
    this.endSeasonYear= new Date(this.seasonFixture.endDate).getFullYear();
    
    //Por cada Input que envio, se ejecuta ngOnChanges(). Con este if() hago que se haga la búsqueda a la API una vez.
    if(cambios.seasonFixture){
      this.matchesAllSeason= [];
      this.nextMatches= [];    

      this._compSrv.getPartidosCompetenciaFechas(this.idCompetencia, new Date().toISOString().slice(0,10), this.seasonFixture.endDate).subscribe((datos: Match[])=>{
        this.nextMatches= datos;
        console.log(this.nextMatches);    
      })
    }

  }

}