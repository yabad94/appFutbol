import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Competition } from '../../modelos/competition';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styles: [
    ` `
  ]
})
export class CabeceraComponent implements OnInit, OnChanges {
  
  @Input() competicion: Competition;    //Datos que coloco en la cabecera.

  constructor() { 

  }

  ngOnChanges(){

  }

  ngOnInit() {

  }
}
