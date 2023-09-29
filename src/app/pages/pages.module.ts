import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { RouterModule } from '@angular/router';
import { PagesRoutes } from './pages.routing';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListComponent, EditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    SharedModule,
    FormsModule,
  ],
  providers: [],
  exports: [FormsModule],
})
export class PagesModule {}
