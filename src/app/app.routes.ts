import { Routes } from '@angular/router';
import { TaskPageComponent } from './modules/task/task.page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'task', pathMatch: 'full' },
  { path: 'task', component: TaskPageComponent },
  { path: '**', redirectTo: 'task', pathMatch: 'full' },
];
