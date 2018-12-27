import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatosConfig } from './datosConfiguracion';
import { StandingsAll } from '../modelos/standings';


@Injectable({
  providedIn: 'root'
})

export class CompeticionesService {

  public tablasCompetencia: StandingsAll;

  constructor(private _http: HttpClient, private _datosConf: DatosConfig) {

  }

  getCompetencias(){

    return this._http.get(this._datosConf.linkUrl + 'competitions', {headers: new HttpHeaders({'X-Auth-Token': this._datosConf.tokenHeader})}).pipe(map(datos=> {
        return datos['competitions']
        .filter(liga=> // PL--> Premier; SA--> Serie A; BL1--> Bundesliga; FL1--> Ligue 1; CL--> UCL; PPL--> Portugal; DED--> Eredivise; PD--> La Liga
          liga.code==="PL" || liga.code==="SA" || liga.code==="BL1" || liga.code==="FL1" || liga.code==="CL" || liga.code=== "PPL" || liga.code==="PD" || liga.code==="DED"
        ); 
    }));
  }

  getTablaCompetencia(idComp: number){

    let tablasCompetencia: StandingsAll= { season: null, standings: [],  competition: null };

    return this._http.get(this._datosConf.linkUrl + 'competitions/' + idComp + '/standings	', {headers: new HttpHeaders({'X-Auth-Token': this._datosConf.tokenHeader})}).pipe(map(datos=> {

      tablasCompetencia.standings= datos['standings']; 
      tablasCompetencia.season= datos['season']; 
      tablasCompetencia.competition= datos['competition'];
      this.tablasCompetencia= tablasCompetencia;
 
      return tablasCompetencia;
    }));
  }

  getPartidosCompetenciaFechas(idComp: number, dateFrom: string, dateTo: string){

    return this._http.get(this._datosConf.linkUrl + 'competitions/' + idComp +'/matches/?dateFrom=' + dateFrom + '&dateTo='+ dateTo, {headers: new HttpHeaders({'X-Auth-Token': this._datosConf.tokenHeader})}).pipe(map(datos=> {
      return datos['matches'];
    }));

  }

  getPartidosCompetenciaSeason(idComp: number, season: number){

    return this._http.get(this._datosConf.linkUrl + 'competitions/' + idComp +'/matches/?season=' + season, {headers: new HttpHeaders({'X-Auth-Token': this._datosConf.tokenHeader})}).pipe(map(datos=> {
      return datos['matches'];
    }));

  }

  getPartidosMatchDay(idComp: number, matchday: number){

    return this._http.get(this._datosConf.linkUrl + 'competitions/' + idComp +'/matches/?matchday=' + matchday, {headers: new HttpHeaders({'X-Auth-Token': this._datosConf.tokenHeader})}).pipe(map(datos=> {
      return datos['matches'];
    }));

  }

  getPartidosByStatus(idComp: number, status: string){

    return this._http.get(this._datosConf.linkUrl + 'competitions/' + idComp +'/matches/?status=' + status, {headers: new HttpHeaders({'X-Auth-Token': this._datosConf.tokenHeader})}).pipe(map(datos=> {
      return datos['matches'];
    }));

  }

  getProximosPartidosCompetenciaEnEseGameday(idComp: number){

    return this._http.get(this._datosConf.linkUrl + 'matches/?competitions=' + idComp, {headers: new HttpHeaders({'X-Auth-Token': this._datosConf.tokenHeader})}).pipe(map(datos=> {
      return datos['matches'];
    }));

  }

  getPartidoByID(idPartido: number){

    return this._http.get(this._datosConf.linkUrl + 'matches/' + idPartido, {headers: new HttpHeaders({'X-Auth-Token': this._datosConf.tokenHeader})})
  
  }

  getTeamByID(idTeam: number){

    return this._http.get(this._datosConf.linkUrl + 'teams/' + idTeam, {headers: new HttpHeaders({'X-Auth-Token': this._datosConf.tokenHeader})})
  
  }

}