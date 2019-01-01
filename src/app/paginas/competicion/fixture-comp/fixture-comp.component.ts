import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CompeticionesService } from '../../../servicios/competiciones.service';
import { Season } from '../../../modelos/season';
import { Competition } from '../../../modelos/competition';

@Component({
  selector: 'app-fixture-comp',
  templateUrl: './fixture-comp.component.html',
  styles: []
})

//new Date().toISOString().slice(0,10) --> "dddd/mm/dd"

export class FixtureCompComponent implements OnInit, OnChanges {

  @Input() competencia: Competition;
  @Input() seasonFixture: Season;
  private startSeasonYear: number;
  private endSeasonYear: number;


  constructor(private _compSrv: CompeticionesService) { }

  ngOnInit() {  

    this.startSeasonYear= new Date(this.seasonFixture.startDate).getFullYear();
    this.endSeasonYear= new Date(this.seasonFixture.endDate).getFullYear();

  }

  ngOnChanges(){

  }

}