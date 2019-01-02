import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { APP_ROUTING } from './app.rutas';

import { AppComponent } from './app.component';
import { HomeComponent } from './paginas/home/home.component';
import { SidebarComponent } from './compartido/sidebar/sidebar.component';
import { LoadingComponent } from './compartido/loading/loading.component';
import { NavbarComponent } from './compartido/navbar/navbar.component';
import { CompeticionComponent } from './paginas/competicion/competicion.component';
import { DatosConfig } from './servicios/datosConfiguracion';
import { TableCompComponent } from './paginas/competicion/table-comp/table/table-comp.component';
import { FixtureCompComponent } from './paginas/competicion/fixture-comp/fixture-comp.component';
import { CabeceraComponent } from './compartido/cabecera/cabecera.component';
import { MatchCompComponent } from './paginas/competicion/match-comp/match-comp.component';
import { TeamCompComponent } from './paginas/competicion/team-comp/team-comp.component';
import { JugadorComponent } from './paginas/competicion/team-comp/jugador-team/jugador.component';
import { LivesMatchesComponent } from './paginas/home/lives-matches/lives-matches.component';
import { ScorersComponent } from './paginas/competicion/scorers/scorers.component';
import { FixtureTeamComponent } from './paginas/competicion/team-comp/fixture-team/fixture-team.component';
import { FixtureComponent } from './paginas/competicion/shared/fixture/fixture.component';


@NgModule({
  declarations: [  
    AppComponent,
    HomeComponent,
    SidebarComponent,
    LoadingComponent,
    NavbarComponent, 
    CompeticionComponent, 
    TableCompComponent, 
    FixtureCompComponent, 
    CabeceraComponent, 
    MatchCompComponent, 
    TeamCompComponent, 
    JugadorComponent, 
    LivesMatchesComponent, 
    ScorersComponent, 
    FixtureTeamComponent, 
    FixtureComponent
  ],
  
  imports: [
    BrowserModule,
    HttpClientModule, 
    APP_ROUTING,
    CommonModule, 
    FormsModule,
    NgxPaginationModule
  ],

  providers: [ DatosConfig ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }