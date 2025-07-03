import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';

export const routes: Routes = [
  { path: '', component: MainContentComponent, pathMatch: 'full' },
  { path: 'campo', loadComponent: () => import('./campo/campo.component').then(m => m.CampoComponent) },
  { path: 'escuela', loadComponent: () => import('./escuela/escuela.component').then(m => m.EscuelaComponent) },
  { path: 'torneos', loadComponent: () => import('./torneos/torneos.component').then(m => m.TorneosComponent) },
  { path: 'contacto', loadComponent: () => import('./contacto/contacto.component').then(m => m.ContactoComponent) },
];
