import { Component, OnInit } from '@angular/core';
import { CompeticionesService } from '../../servicios/competiciones.service';
import { Competition } from '../../modelos/competition';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [ `
      .router-link-active {
        margin-left: 10%
      }
  ` ]
})

export class SidebarComponent implements OnInit {

  private competitions: Competition[];
  private loading: boolean;

  constructor(private _competencias: CompeticionesService, private _router: Router) { }

  ngOnInit() {

    this.loading= true;

    this.competitions= [];
    new Promise((resolve)=> {
      this._competencias.getCompetencias().subscribe((datos: Competition[])=> resolve(datos)
      , (error)=> {
        console.log('error trayendo ligas al sidebar: ', error); 
        this.loading= false;
      });
    }).then((competiciones: Competition[])=> {
      this.competitions= competiciones;
      this.loading= false;
    });
  }

  // irCompetencia(idComp: number){    
  //   this._router.navigate(['/competencia', idComp]);
  // }

}