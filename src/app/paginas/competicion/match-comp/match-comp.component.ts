import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { CompeticionesService } from '../../../servicios/competiciones.service';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { IndividualMatch } from '../../../modelos/match';
import { Team } from '../../../modelos/team';

@Component({
  selector: 'app-match-comp',
  templateUrl: './match-comp.component.html',
  styles: [
  ]
})
export class MatchCompComponent implements OnInit, OnChanges {

  @Input() idPartidoModal: number;
  private individualMatch: IndividualMatch;
  private escudoHomeTeam: string;
  private escudoAwayTeam: string;

  constructor(private _compSrv: CompeticionesService) { }

  ngOnInit() {

  }

  ngOnChanges(cambios: SimpleChanges){

    if(cambios.idPartidoModal.currentValue!= null){

      //Busco partido por ID, busco equipo local por ID(escudo), busco equipo visitante por ID(escudo).
      new Observable((resolve)=> {
        resolve.next(cambios.idPartidoModal.currentValue)
      }).pipe(flatMap((idMatch: number)=> {
        return this._compSrv.getPartidoByID(idMatch);
  
      }), flatMap((datos: IndividualMatch)=> {
        this.individualMatch= datos;
        // console.log(this.individualMatch); 
        return this._compSrv.getTeamByID(this.individualMatch.match.homeTeam.id);

      }), flatMap((equipoLocal: Team)=> {
        this.escudoHomeTeam= equipoLocal.crestUrl;
        return this._compSrv.getTeamByID(this.individualMatch.match.awayTeam.id);

      })).subscribe((equipoVisitante: Team)=> {
        this.escudoAwayTeam= equipoVisitante.crestUrl;
      });
    }    
  }

}
