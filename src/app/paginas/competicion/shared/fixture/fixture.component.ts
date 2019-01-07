import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Competition } from 'src/app/modelos/competition';
import { Season } from 'src/app/modelos/season';
import { CompeticionesService } from 'src/app/servicios/competiciones.service';
import { FixtureStageTypeComp } from 'src/app/modelos/fixtureStageTypeComp';


@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styles: []
})

export class FixtureComponent implements OnInit, OnChanges {

  @Input() competencia: Competition;
  @Input() seasonFixture: Season;
  @Input() fixtureStage: FixtureStageTypeComp;
  @Input() cantPartidosXFecha: number;

  private loading: boolean;
  private pageActual: number;
  private idPartido: number;
  private mostrarSmsError: boolean;

  constructor(private _compSrv: CompeticionesService) { }

  ngOnInit() {  

  }

  ngOnChanges(cambios: SimpleChanges){

    this.loading= true;

    if(this.seasonFixture){
      this.pageActual= this.seasonFixture.currentMatchday;
    }

    setTimeout(() => {
      this.loading= false;
    }, 1600);

  }

  verPartido(id: number){
    this.idPartido= id;
  
  }

}

