import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompeticionesService } from '../../servicios/competiciones.service';
import { StandingsAll } from '../../modelos/standings';

@Component({
  selector: 'app-competicion',
  templateUrl: './competicion.component.html',
  styles: []
})

export class CompeticionComponent implements OnInit, OnDestroy {

  public standings: StandingsAll;
  private loading: boolean;

  constructor(private route: ActivatedRoute, private _compSrv: CompeticionesService) { 

    console.log('constructor competición');

  }

  ngOnInit() {

    this.loading= true;
    let idParam: number;

    this.route.params.subscribe( params => idParam= params['id']);  

    console.log(idParam);
    
    this._compSrv.getTablaCompetencia(idParam).subscribe((standings1: StandingsAll)=> {
      console.log(standings1);  //Después borrar.
      this.standings= standings1;
      this.loading= false;
    }, error=> {
      console.log(error, 'error al traer las tablas de la competencia.');
      this.loading= false;      
    });

  }

  ngOnDestroy(){
    console.log('destruido');   
  }

}