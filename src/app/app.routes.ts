import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'task', pathMatch: 'full' },
  {
    path: 'task',
    loadComponent: () => import('./modules/task/task.page.component').then(m => m.TaskPageComponent)
  },
  { path: '**', redirectTo: 'task', pathMatch: 'full' },
];
