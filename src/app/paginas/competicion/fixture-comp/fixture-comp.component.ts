import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CompeticionesService } from '../../../servicios/competiciones.service';
import { Match } from '../../../modelos/match';
import { Season } from '../../../modelos/season';
import { flatMap } from 'rxjs/operators';
import { Competition } from '../../../modelos/competition';

declare let $: any;

@Component({
  selector: 'app-fixture-comp',
  templateUrl: './fixture-comp.component.html',
  styles: []
})

//new Date().toISOString().slice(0,10) --> "dddd/mm/dd"

export class FixtureCompComponent implements OnInit, OnChanges {

  @Input() competencia: Competition;
  @Input() seasonFixture: Season;
  private matchesAllSeason: Match[]; 
  private startSeasonYear: number;
  private endSeasonYear: number;
  private pageActual: number;
  private cantidadPartidosxFecha: number;
  private idPartido: number;

  constructor(private _compSrv: CompeticionesService) { }

  ngOnInit() {  

    this

  }

  ngOnChanges(cambios: SimpleChanges){

    // console.log(cambios);
    this.startSeasonYear= new Date(this.seasonFixture.startDate).getFullYear();
    this.endSeasonYear= new Date(this.seasonFixture.endDate).getFullYear();
    
    //Por cada Input que envio, se ejecuta ngOnChanges(). Con este if() hago que se haga la búsqueda a la API una vez.
    if(cambios.seasonFixture){

      this.pageActual= this.seasonFixture.currentMatchday;  //Set para que se muestre la fecha actual.

      this._compSrv.getPartidosCompetenciaFechas(this.competencia.id, this.seasonFixture.startDate, this.seasonFixture.endDate).pipe(flatMap((datos: Match[])=> {
        this.matchesAllSeason= [];
        this.matchesAllSeason= datos;
        
        return this._compSrv.getPartidosMatchDay(this.competencia.id, this.seasonFixture.currentMatchday);

      })).subscribe((datos: Match[])=>{
          this.cantidadPartidosxFecha= datos.length;
      })
    }

  }

  verPartido(id: number){
    this.idPartido= id;
  }

}