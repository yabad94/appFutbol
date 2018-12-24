import { Component, OnInit } from '@angular/core';
import { Standings } from '../../../../modelos/standings';
import { Competition } from '../../../../modelos/competition';
import { CompeticionesService } from '../../../../servicios/competiciones.service';

@Component({
  selector: 'app-table-comp',
  templateUrl: './table-comp.component.html',
  styles: []
})

export class TableCompComponent implements OnInit {

  private tablaTotal: Standings[];
  private competicion: Competition;
  private loading: boolean;

  constructor(private _compSrv: CompeticionesService) { }

  ngOnInit() {
   
    this.loading= true;
    this.tablaTotal= [];

    for(let i=0; i<this._compSrv.tablasCompetencia.standings.length; i++){
      if(this._compSrv.tablasCompetencia.standings[i].type=== "TOTAL"){
        this.tablaTotal.push(this._compSrv.tablasCompetencia.standings[i]);    
      }

      if(i===this._compSrv.tablasCompetencia.standings.length-1){
        this.loading= false;  
      }
    }
 
  }

}