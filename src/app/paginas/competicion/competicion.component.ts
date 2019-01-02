import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompeticionesService } from '../../servicios/competiciones.service';
import { StandingsAll, Standings } from '../../modelos/standings';
import { flatMap } from 'rxjs/operators';
import { Competition } from 'src/app/modelos/competition';

@Component({
  selector: 'app-competicion',
  templateUrl: './competicion.component.html',
  styles: [
    `
    .modal-backdrop {
      z-index: -1;
    }
    
    `
  ]
})

export class CompeticionComponent implements OnInit {

  public standings: StandingsAll;
  private loading: boolean;
  private idParam: number;
  private startSeasonYear: number;
  private endSeasonYear: number;
  private homeTableComp: Standings[];
  private awayTableComp: Standings[];
  private totalTableComp: Standings[];
  private competition: Competition;
  

  constructor(private route: ActivatedRoute, private _compSrv: CompeticionesService) { 

  }

  ngOnInit() {

    this.loading= true;

    this.route.paramMap.pipe(flatMap(params=> {
      this.idParam= parseInt(params.get('id'));
      return this._compSrv.getTablaCompetencia(this.idParam)

    })).subscribe((standings1: StandingsAll)=> {
      this.competition= standings1.competition;
      this.standings= standings1;
      console.log(this.standings);
      this.startSeasonYear= new Date(this.standings.season.startDate).getFullYear();
      this.endSeasonYear= new Date(this.standings.season.endDate).getFullYear(); 

      this.homeTableComp= []; this.awayTableComp= []; this.totalTableComp= [];

      for(let i=0; i< this.standings.standings.length; i++){

        switch(this.standings.standings[i].type) {
          case 'TOTAL':
            this.totalTableComp.push(this.standings.standings[i]);
            break;
          case 'HOME':
            this.homeTableComp.push(this.standings.standings[i]);
            break;
          default:
            this.awayTableComp.push(this.standings.standings[i]);
            break;           
        }

      }

      this.loading= false;
    }, error=> {
      console.log(error, 'error al traer las tablas de la competencia.');
      this.loading= false;      
    });

  }
}