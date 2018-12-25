import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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


@NgModule({
  declarations: [ 
    AppComponent,
    HomeComponent,
    SidebarComponent,
    LoadingComponent,
    NavbarComponent, 
    CompeticionComponent, 
    TableCompComponent, 
    FixtureCompComponent
  ],
  
  imports: [
    BrowserModule,
    HttpClientModule, 
    APP_ROUTING,
    CommonModule, 
  ],

  providers: [ DatosConfig ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }