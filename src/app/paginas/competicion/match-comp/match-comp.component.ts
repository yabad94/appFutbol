import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { CompeticionesService } from '../../../servicios/competiciones.service';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { IndividualMatch } from '../../../modelos/match';

@Component({
  selector: 'app-match-comp',
  templateUrl: './match-comp.component.html',
  styles: []
})
export class MatchCompComponent implements OnInit, OnChanges {

  @Input() idPartidoModal: number;
  private individualMatch: IndividualMatch;

  constructor(private _compSrv: CompeticionesService) { }

  ngOnInit() {

  }

  ngOnChanges(cambios: SimpleChanges){

    if(cambios.idPartidoModal.currentValue!= null){

      new Observable((resolve)=> {
        resolve.next(cambios.idPartidoModal.currentValue)
      }).pipe(flatMap((idMatch: number)=> {
        return this._compSrv.getPartidoByID(idMatch);
  
      })).subscribe((datos: IndividualMatch)=> {
        this.individualMatch= datos;
        console.log(this.individualMatch);        
      });

    }
    
  }

}
