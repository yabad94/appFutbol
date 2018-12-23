// ARCHIVO PARA ALMACENAR TODAS LAS RUTAS DE LA SPA.
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { CompeticionComponent } from './paginas/competicion/competicion.component';
import { TableCompComponent } from './paginas/competicion/table-comp/table-comp.component';

const APP_ROUTES: Routes= [

    { path:'home', component: HomeComponent },  
    { path:'competicion/:id', component: CompeticionComponent },
    // , children: [
        // { path:'table', component: TableCompComponent }, 
        // {path:'tableHome', component: TableCompHomeComponent}, 
        // {path:'tableAway', component: TableCompAwayComponent},
        // {path: '**', pathMatch: 'full', redirectTo: 'table'}
    // ]},

    // {path:'fixture-comp', component: FixtureCompComponent},
    
    // otherwise redirect to home
    {path: '', pathMatch: 'full', redirectTo: 'home'}, 
    {path: '**', pathMatch: 'full', redirectTo: 'home'}  
];

export const APP_ROUTING= RouterModule.forRoot(APP_ROUTES);