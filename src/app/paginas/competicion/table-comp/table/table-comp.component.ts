import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Standings, StandingsAll } from '../../../../modelos/standings';
import { CompeticionesService } from '../../../../servicios/competiciones.service';
import { Competition } from '../../../../modelos/competition';

@Component({
  selector: 'app-table-comp',
  templateUrl: './table-comp.component.html',
  styles: []
})

export class TableCompComponent implements OnInit, OnChanges {

  @Input() tablaComp: StandingsAll
  private tablaTotal: Standings[];
  private loading: boolean;
  private competition: Competition= null;

  constructor(private _compSrv: CompeticionesService) { }

  ngOnInit() {
 
  }

  ngOnChanges(changes: SimpleChanges) {

    this.competition= changes.tablaComp.currentValue.competition;

    let tablas: StandingsAll= changes.tablaComp.currentValue;
    this.tablaTotal= [];
    // this.loading= true;

    for(let i=0; i< tablas.standings.length; i++){
      if(tablas.standings[i].type=== "TOTAL"){
        this.tablaTotal.push(tablas.standings[i]);
      }
    }
  }

}