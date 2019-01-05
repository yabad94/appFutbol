import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
// import { CompeticionesService } from '../../../servicios/competiciones.service';
import { Season } from '../../../modelos/season';
import { Competition } from '../../../modelos/competition';
import { FixtureStageTypeComp } from 'src/app/modelos/fixtureStageTypeComp';


@Component({
  selector: 'app-fixture-comp',
  templateUrl: './fixture-comp.component.html',
  styles: []
})

//new Date().toISOString().slice(0,10) --> "dddd/mm/dd"

export class FixtureCompComponent implements OnInit, OnChanges {

  @Input() competencia: Competition;
  @Input() seasonFixture: Season;
  @Input() fixture: FixtureStageTypeComp;
  @Input() cantPartCadaFecha: number;
  @Output() cerrarModalFix= new EventEmitter<string>();
  
  private startSeasonYear: number;
  private endSeasonYear: number;
  // private loading: boolean;


  constructor() { }

  ngOnInit() {  

  }

  ngOnChanges(){

    if(this.seasonFixture){
      this.startSeasonYear= new Date(this.seasonFixture.startDate).getFullYear();
      this.endSeasonYear= new Date(this.seasonFixture.endDate).getFullYear();
    }
    
  }

  cerrarModalCompeticion(event: string){
    console.log('fix-comp: ', event);
    this.cerrarModalFix.emit(event);    
  }

}