import { Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

export const PagesRoutes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    component: ListComponent,
  },
  {
    path: 'products/:id',
    component: EditComponent,
  },
];
