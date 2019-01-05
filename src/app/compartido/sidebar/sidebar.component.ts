import { Component, OnInit } from '@angular/core';
import { CompeticionesService } from '../../servicios/competiciones.service';
import { Competition } from '../../modelos/competition';

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

  constructor(private _competencias: CompeticionesService) { }

  ngOnInit() {

    this.competitions= [];
    new Promise((resolve)=> {
      this._competencias.getCompetencias().subscribe((datos: Competition[])=> resolve(datos)
      , (error)=> {
        console.log('error trayendo ligas al sidebar: ', error); 
      });
    }).then((competiciones: Competition[])=> {
      for(let i=0; i<competiciones.length; i++){
        if(competiciones[i].name==="UEFA Champions League"){
          competiciones[i].name= "Champions League";
        }
      }
      
      this.competitions= competiciones;
    });
  }

}