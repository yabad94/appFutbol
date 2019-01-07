import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Competition } from '../../../../modelos/competition';
import { CompeticionesService } from '../../../../servicios/competiciones.service';
import { HistoricalCompWinners } from '../../../../modelos/historicalDataComp';
import { Season } from '../../../../modelos/season';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styles: []
})

export class WinnerComponent implements OnInit, OnChanges {

  @Input() competicion: Competition;
  private loading: boolean;
  private historicalWinners: HistoricalCompWinners;
  private lastSeason: Season;
  private startDateLastTemp: Date;
  private endDateLastTemp: Date;
  private primerAnio: number;
  private ultimoAnio: number;
  private fechaInicio: Date;
  private fechaFin: Date;
  private imgCompeticion: string;
  private previousSeasons: Season[];

  constructor(private _compSrv: CompeticionesService) { }

  ngOnInit() {

  }

  ngOnChanges(){

    if(this.competicion){
      this.loading= true;
      this._compSrv.getHistoricalDataWinners(this.competicion.id).subscribe((data: HistoricalCompWinners)=> {
        this.historicalWinners= data; 
        console.log(this.historicalWinners);

        this.fechaFin= new Date(this.historicalWinners.currentSeason.endDate);
        this.fechaInicio= new Date(this.historicalWinners.currentSeason.startDate);

        this.obtenerUltimoCampeon();
        this.separarTemporadaActualDeAnteriores();
        this.trabajarTemporadasAnteriores();
        this.obtenerImagenCompetencia();

        this.loading= false;
      });
    }
    
  }

  obtenerUltimoCampeon(){

    let start: number= new Date(this.historicalWinners.currentSeason.startDate).getFullYear();  //Comienzo de la actual es el fin de la última temporada.
    
    for(let i=0; i< this.historicalWinners.seasons.length; i++){
      if(new Date(this.historicalWinners.seasons[i].endDate).getFullYear()=== start){
        this.lastSeason= this.historicalWinners.seasons[i];
        this.endDateLastTemp= new Date(this.lastSeason.endDate);
        this.startDateLastTemp= new Date(this.lastSeason.startDate);
      }
    }
    
  }

  separarTemporadaActualDeAnteriores(){

    for(let i=0; i< this.historicalWinners.seasons.length; i++){
      if(this.historicalWinners.currentSeason.id=== this.historicalWinners.seasons[i].id){
        this.historicalWinners.seasons.splice(i,1);
      }
    }

  }

  trabajarTemporadasAnteriores(){

    let starts: number[]= [];
    let ends: number[]= [];
    this.previousSeasons= [];

    for(let i=0; i< this.historicalWinners.seasons.length; i++){
      starts.push(new Date(this.historicalWinners.seasons[i].startDate).getFullYear());
      ends.push(new Date(this.historicalWinners.seasons[i].endDate).getFullYear());

      this.historicalWinners.seasons[i].endDate= new Date(this.historicalWinners.seasons[i].endDate).getFullYear().toString();
      this.historicalWinners.seasons[i].startDate= new Date(this.historicalWinners.seasons[i].startDate).getFullYear().toString();

      this.previousSeasons.push(this.historicalWinners.seasons[i]);
    }

    this.ultimoAnio= Math.max.apply(null, starts); 
    this.primerAnio= Math.min.apply(null, ends); 
  }

  obtenerImagenCompetencia(){

    switch(this.historicalWinners.name){
      case 'Premier League':
        this.imgCompeticion='src/assets/iconos/premier-league.png';
        break;
      case 'Ligue 1':
        this.imgCompeticion='src/assets/iconos/ligue1.jpg';
        break;
      case 'UEFA Champions League':
        this.imgCompeticion='src/assets/iconos/ucl.jpg';
        break;
      case 'Bundesliga':
        this.imgCompeticion='src/assets/iconos/bundesliga.jpg';
        break;
      case 'Eredivisie':
        this.imgCompeticion='src/assets/iconos/eredivisie.jpg';
        break;
      case 'Primera Division':
        this.imgCompeticion='src/assets/iconos/la_liga.png';
        break;
      case 'Serie A':
        this.imgCompeticion='src/assets/iconos/serie_A.jpg';
        break;
      default:
        this.imgCompeticion='src/assets/iconos/portuguesa.jpg';
    }
  }

}
