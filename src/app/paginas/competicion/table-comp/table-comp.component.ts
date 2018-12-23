import { Component, OnInit } from '@angular/core';
import { CompeticionComponent } from '../competicion.component';

@Component({
  selector: 'app-table-comp',
  templateUrl: './table-comp.component.html',
  styles: []
})
export class TableCompComponent implements OnInit {

  asd: string;

  constructor(private _competicion: CompeticionComponent) {

    console.log('constructor tabla');

   }

  ngOnInit() {

    this.asd= this._competicion.standings.competition.name;

  }

}
