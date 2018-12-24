import { Component, OnInit, Input } from '@angular/core';
// import { CompeticionComponent } from '../competicion.component';
import { CompeticionesService } from '../../../servicios/competiciones.service';

@Component({
  selector: 'app-fixture-comp',
  templateUrl: './fixture-comp.component.html',
  styles: []
})

export class FixtureCompComponent implements OnInit {

  @Input() idCompetencia: number;

  constructor(private _compSrv: CompeticionesService) { }

  ngOnInit() {

    // console.log(new Date().toISOString().slice(0,10), this.idCompetencia);

    // this._compSrv.getPartidosCompetencia(this.idCompetencia, new Date().toISOString().slice(0,10), "2019-04-29").subscribe((datos: any)=>{
    //   console.log(datos);
    // })

  }

}