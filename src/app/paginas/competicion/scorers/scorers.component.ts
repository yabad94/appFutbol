import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Competition } from '../../../modelos/competition';
import { Season } from 'src/app/modelos/season';
import { CompeticionesService } from '../../../servicios/competiciones.service';
import { ScorerPlayer, Player } from '../../../modelos/team';

@Component({
  selector: 'app-scorers',
  templateUrl: './scorers.component.html',
  styles: [

    `
    tbody tr:hover {
      background-color: #DCDCDC;
      cursor: pointer;
    }
    
    `
  ]
})

export class ScorersComponent implements OnInit, OnChanges {

  @Input() competicion: Competition;
  @Input() seasonFixture: Season;
  private startSeasonYear: number;
  private endSeasonYear: number;
  private scorers: ScorerPlayer[];
  private playerSelected: Player;

  constructor(private _compSrv: CompeticionesService) { }

  ngOnInit() {

  }

  ngOnChanges(){

    this.startSeasonYear= new Date(this.seasonFixture.startDate).getFullYear();
    this.endSeasonYear= new Date(this.seasonFixture.endDate).getFullYear();

    this._compSrv.getScorersComp(this.competicion.id).subscribe((datos: ScorerPlayer[])=> {
      this.scorers= datos;
    });
    
  }

  verJugador(jugador: ScorerPlayer){
    this.playerSelected= jugador.player;
  }

}
