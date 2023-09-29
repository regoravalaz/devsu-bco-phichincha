import { Routes } from '@angular/router';

import { MainComponent as MainLayout } from './shared/layouts/main/main.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },
];
