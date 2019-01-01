import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { CompeticionesService } from '../../../../servicios/competiciones.service';
import { Match } from 'src/app/modelos/match';

@Component({
  selector: 'app-fixture-team',
  templateUrl: './fixture-team.component.html',
  styles: []
})
export class FixtureTeamComponent implements OnInit, OnChanges {

  @Input() idEquipo: number;
  private pageActual: number;
  private cantidadPartidosxFecha: number= 10;
  private matchesAllSeason: Match[]; 

  constructor(private _compSrv: CompeticionesService) { }

  ngOnInit() {
    
  }

  ngOnChanges(cambios: SimpleChanges){

    if(cambios.idEquipo.currentValue){
     this.idEquipo= cambios.idEquipo.currentValue;
     console.log(this.idEquipo);     

    this._compSrv.getFixtureTeam(this.idEquipo).subscribe((datos: Match[])=> {
      this.matchesAllSeason= datos; 
      console.log(this.matchesAllSeason);  

      for(let i=0; i< this.matchesAllSeason.length; i++){
        switch(this.matchesAllSeason[i].competition.name){
          case "Premier League":
            this.matchesAllSeason[i].competition.name= 'PL';
            break;
          case "UEFA Champions League":
            this.matchesAllSeason[i].competition.name= 'UCL';
            break;
          case "Ligue 1":
            this.matchesAllSeason[i].competition.name= 'FL1';
            break;
          case "Bundesliga":
            this.matchesAllSeason[i].competition.name= 'BD1';
            break;
          case "Serie A":
            this.matchesAllSeason[i].competition.name= 'SA';
            break;
          case "Eredivisie":
            this.matchesAllSeason[i].competition.name= 'DED';
            break;
          case "Primeira Liga":
            this.matchesAllSeason[i].competition.name= 'PPL';
            break;
          case "Primera Division":
            this.matchesAllSeason[i].competition.name= 'LFP';
            break;
          // case "Série A":
          //   this.matchesAllSeason[i].competition.name= 'BSA';
          //   break;
          case "UEFA Europa League":
            this.matchesAllSeason[i].competition.name= 'UEL';
            break;
          default:
            break;  
        }
      }

    });

    }
  }

}
