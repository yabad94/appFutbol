import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Competition } from 'src/app/modelos/competition';
import { Season } from 'src/app/modelos/season';
import { Match } from 'src/app/modelos/match';
import { CompeticionesService } from 'src/app/servicios/competiciones.service';
import { flatMap } from 'rxjs/operators';


@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styles: []
})
export class FixtureComponent implements OnInit, OnChanges {

  @Input() competencia: Competition;
  @Input() seasonFixture: Season;
  @Output() pasarLoading= new EventEmitter<boolean>();
  private matchesAllSeason: Match[]; 
  private pageActual: number;
  private cantidadPartidosxFecha: number;
  private idPartido: number;
  private loading: boolean;
  private mostrarSmsError: boolean;

  constructor(private _compSrv: CompeticionesService) { }

  ngOnInit() {  

  }

  ngOnChanges(cambios: SimpleChanges){
    
    //Por cada Input que envio, se ejecuta ngOnChanges(). Con este if() hago que se haga la búsqueda a la API una vez.
    if(cambios.seasonFixture){

      this.loading= true;
      this.mostrarSmsError= false;

      this.pageActual= this.seasonFixture.currentMatchday;  //Set para que se muestre la fecha de torneo actual.

      this._compSrv.getPartidosCompetenciaFechas(this.competencia.id, this.seasonFixture.startDate, this.seasonFixture.endDate).pipe(flatMap((datos: Match[])=> {
        this.matchesAllSeason= [];
        this.matchesAllSeason= datos;        
        return this._compSrv.getPartidosMatchDay(this.competencia.id, this.seasonFixture.currentMatchday);

      })).subscribe((datos: Match[])=> {
          this.cantidadPartidosxFecha= datos.length;       
          this.loading= false;
      }, (error)=> {
        console.log(error, 'error al traer calendario.');
        this.mostrarSmsError= true;
        this.loading= false;
      })
    }
  }

  verPartido(id: number){
    this.idPartido= id;
  }

}

