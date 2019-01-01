import { Component, OnInit } from '@angular/core';
import { CompeticionesService } from '../../../servicios/competiciones.service';
import { flatMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { TeamInfo, Player } from '../../../modelos/team';

declare let $: any;

@Component({
  selector: 'app-team-comp',
  templateUrl: './team-comp.component.html',
  styles: [
    `
    div #squadButton:hover {
      background-color: #A9A9A9;
      color: white;
      cursor: pointer;
    }

    #playerButton:hover {
      background-color: #A9A9A9;
      color: white;
      cursor: pointer;
    }
 
    `
  ]
})

export class TeamCompComponent implements OnInit {

  private idParam: number;
  private teamInfo: TeamInfo;
  private nameDT: string;
  private goalkeepers: Player[];
  private defenders: Player[];
  private midfielders: Player[];
  private attackers: Player[];
  private selectedPlayer: Player;

  constructor(private route: ActivatedRoute, private _compSrv: CompeticionesService) { }

  ngOnInit() {
    
    this.route.paramMap.pipe(flatMap(params=> {
      this.idParam= parseInt(params.get('id'));
      return this._compSrv.getTeamByID(this.idParam)

    })).subscribe((datos: TeamInfo)=> {
      this.teamInfo= datos;
      this.selectedPlayer= this.teamInfo.squad[0];
      
      for(let i=0; i< this.teamInfo.squad.length; i++){
        if(this.teamInfo.squad[i].role==="COACH"){
          this.nameDT= this.teamInfo.squad[i].name;
        }
      }

      this.organizarEquipo(this.teamInfo.squad);
    }, (error)=> {
      console.log(error, 'error al traer equipo');      
    });
    
    // this._compSrv.getTwitterTeam('spursofficial').subscribe(datos=> console.log(datos))
    
  }

  organizarEquipo(jugadores: Player[]){

    this.goalkeepers= []; this.defenders= []; this.attackers= []; this.midfielders= [];

    for(let i=0; i< jugadores.length; i++){
      switch(jugadores[i].position){
        case "Goalkeeper":
          this.goalkeepers.push(jugadores[i]);
          break;
        case "Defender":
          this.defenders.push(jugadores[i]);
          break;
        case "Midfielder":
          this.midfielders.push(jugadores[i]);
          break;
        case "Attacker":
          this.attackers.push(jugadores[i]);
          break;
        default:
          break;  
      }
    }

  }

  verJugador(jugador: Player){

    this.selectedPlayer= jugador; //Set de variable para pasar al componente jugador los datos a través del @Input.
    console.log(this.selectedPlayer);
    
  }

}
