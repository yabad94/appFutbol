import { Component, OnInit } from '@angular/core';
import { CompeticionesService } from '../../../servicios/competiciones.service';
import { flatMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { TeamInfo } from '../../../modelos/team';

@Component({
  selector: 'app-team-comp',
  templateUrl: './team-comp.component.html',
  styles: []
})

export class TeamCompComponent implements OnInit {

  private idParam: number;
  private teamInfo: TeamInfo;
  private nameDT: string;

  constructor(private route: ActivatedRoute, private _compSrv: CompeticionesService) { }

  ngOnInit() {
    
    this.route.paramMap.pipe(flatMap(params=> {
      this.idParam= parseInt(params.get('id'));
      return this._compSrv.getTeamByID(this.idParam)

    })).subscribe((datos: TeamInfo)=> {
      this.teamInfo= datos;
      console.log(this.teamInfo); 
      
      for(let i=0; i< this.teamInfo.squad.length; i++){
        if(this.teamInfo.squad[i].role==="COACH"){
          this.nameDT= this.teamInfo.squad[i].name;
        }
      }
    }, (error)=> {
      console.log(error, 'error al traer equipo');      
    });
    
  }

}
