import { Routes, UrlSegment } from '@angular/router';
import { HomeComponent, PageNotFoundComponent } from './main';
import { CalculadoraComponent, DemosComponent } from './ejemplos';
import { ContactosAddComponent, ContactosEditComponent, ContactosListComponent, ContactosViewComponent } from './contactos';
import { AuthCanActivateFn, LoginFormComponent, RegisterUserComponent } from './security';
import { PeliculasListComponent, PeliculasAddComponent, PeliculasEditComponent, PeliculasViewComponent } from './peliculas';

export function graficoFiles(url: UrlSegment[]) {
  return url.length === 1 && url[0].path.endsWith('.svg') ? ({consumed: url}) : null;
}
//contactos/add
export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'demos', component: DemosComponent },
  { path: 'chisme/de/hacer/numeros', component: CalculadoraComponent, title: 'Calculadora' },
  { path: 'contactos', component: ContactosListComponent },
  { path: 'contactos/add', component: ContactosAddComponent, canActivate: [ AuthCanActivateFn ] },
  { path: 'contactos/:id/edit', component: ContactosEditComponent },
  { path: 'contactos/:id', component: ContactosViewComponent, canActivate: [ AuthCanActivateFn ] },
  { path: 'contactos/:id/:kk', component: ContactosViewComponent },
  { path: 'alysia/baxendale', redirectTo: '/contactos/43' },
  { path: 'peliculas', children: [
    { path: '', component: PeliculasListComponent },
    { path: 'add', component: PeliculasAddComponent, canActivate: [ AuthCanActivateFn ] },
    { path: ':id/edit', component: PeliculasEditComponent },
    { path: ':id', component: PeliculasViewComponent },
    { path: ':id/:kk', component: PeliculasViewComponent },
  ]},
  { matcher: graficoFiles, loadComponent: () => import('./ejemplos/grafico-svg/grafico-svg.component')},
  { path: 'config', loadChildren: () => import('./config/config.module') },

  { path: 'login', component: LoginFormComponent },
  { path: 'registro', component: RegisterUserComponent },

  { path: '404.html', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
];
