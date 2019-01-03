import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Standings } from '../../../../modelos/standings';
import { CompeticionesService } from '../../../../servicios/competiciones.service';
import { Competition } from '../../../../modelos/competition';

@Component({
  selector: 'app-table-comp',
  templateUrl: './table-comp.component.html',
  styles: [
    `
    tbody tr:hover {
      background-color: #DCDCDC;
      cursor: pointer;
    }
    
    `
  ]
})

export class TableCompComponent implements OnInit, OnChanges {

  @Input() tablaComp: Standings[];
  @Input() competencia: Competition;
  private tablaTotal: Standings[];
  private loading: boolean;
  private competition: Competition;

  constructor(private _compSrv: CompeticionesService) { }

  ngOnInit() {
  
  }

  ngOnChanges(changes: SimpleChanges) {

    // console.log(changes);

    if(changes.tablaComp.currentValue){
      this.tablaTotal= [];
      this.tablaTotal= changes.tablaComp.currentValue;
    }

    if(changes.competencia.currentValue){
      this.competition= null;
      this.competition= changes.competencia.currentValue;
    }
    
  }

}