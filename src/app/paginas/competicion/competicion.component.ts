import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompeticionesService } from '../../servicios/competiciones.service';
import { StandingsAll } from '../../modelos/standings';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-competicion',
  templateUrl: './competicion.component.html',
  styles: []
})

export class CompeticionComponent implements OnInit {

  public standings: StandingsAll;
  private loading: boolean;
  private idParam: number;

  constructor(private route: ActivatedRoute, private _compSrv: CompeticionesService) { 

  }

  ngOnInit() {

    this.loading= true;

    this.route.paramMap.pipe(flatMap(params=> {
      this.idParam= parseInt(params.get('id'));
      return this._compSrv.getTablaCompetencia(this.idParam)

    })).subscribe((standings1: StandingsAll)=> {
      this.standings= standings1;
      this.loading= false;
      console.log(this.standings);
    }, error=> {
      console.log(error, 'error al traer las tablas de la competencia.');
      this.loading= false;      
    });
  }

}