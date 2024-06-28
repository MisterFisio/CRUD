import { Routes } from '@angular/router';
import { InfoComponent } from './components/info/info.component';
import { AgregarEditarComponent } from './components/agregar-editar/agregar-editar.component';

export const routes: Routes = [
  {
    path: '',
    component: InfoComponent,
  },
  {
    path: 'agregar',
    component: AgregarEditarComponent,
  },
  {
    path: 'editar/:id',
    component: AgregarEditarComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
