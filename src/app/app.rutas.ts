// ARCHIVO PARA ALMACENAR TODAS LAS RUTAS DE LA SPA.
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { CompeticionComponent } from './paginas/competicion/competicion.component';
import { FixtureCompComponent } from './paginas/competicion/fixture-comp/fixture-comp.component';
import { TeamCompComponent } from './paginas/competicion/team-comp/team-comp.component';

// import { TableCompComponent } from './paginas/competicion/table-comp/table/table-comp.component';
// import { TableHomeComponent } from './paginas/competicion/table-comp/table-home/table-home.component';
// import { TableAwayComponent } from './paginas/competicion/table-comp/table-away/table-away.component';

const APP_ROUTES: Routes= [

    { path:'home', component: HomeComponent },  
    { path:'competicion/:id', component: CompeticionComponent },
    { path:'fixture-comp', component: FixtureCompComponent },
    { path:'team/:id', component: TeamCompComponent },
    
    // otherwise redirect to home
    {path: '', pathMatch: 'full', redirectTo: 'home'}, 
    {path: '**', pathMatch: 'full', redirectTo: 'home'}  
];

export const APP_ROUTING= RouterModule.forRoot(APP_ROUTES);