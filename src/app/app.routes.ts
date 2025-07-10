import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';

export const routes: Routes = [
  { path: '', component: MainContentComponent, pathMatch: 'full' },
  { path: 'campo', loadComponent: () => import('./campo/campo.component').then(m => m.CampoComponent) },
  { path: 'escuela', loadComponent: () => import('./escuela/escuela.component').then(m => m.EscuelaComponent) },
  { path: 'torneos', loadComponent: () => import('./torneos/torneos.component').then(m => m.TorneosComponent) },
  { path: 'torneos/masters-villarias', loadComponent: () => import('./torneos/masters-villarias-page/masters-villarias-page.component').then(m => m.MastersVillariasPageComponent) },
  { path: 'torneos/torneo-afamer', loadComponent: () => import('./torneos/torneo-afamer-page/torneo-afamer-page.component').then(m => m.TorneoAfamerPageComponent) },
  { path: 'torneos/liga-social', loadComponent: () => import('./torneos/liga-social-page/liga-social-page.component').then(m => m.LigaSocialPageComponent) },
  { path: 'contacto', loadComponent: () => import('./contacto/contacto.component').then(m => m.ContactoComponent) },
];
