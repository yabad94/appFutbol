import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Player } from '../../../../modelos/team';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styles: [ ]
})

export class JugadorComponent implements OnInit, OnChanges {

  @Input() player: Player;
  private jugador: Player;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(cambios: SimpleChanges){

    if(cambios.player.currentValue){
      this.jugador= cambios.player.currentValue;      
    }
  }

}
