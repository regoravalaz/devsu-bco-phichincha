import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './layouts/main/main.component';
import { RouterModule } from '@angular/router';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { DateRangeContraintDirective } from './directives/min-current-date.directive';
import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './components/confirm-dialog/confirm-dialog.service';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    MainComponent,
    DropdownMenuComponent,
    DateRangeContraintDirective,
    ConfirmDialogComponent,
    ProgressBarComponent,
  ],
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [ProductService, ConfirmDialogService],
  exports: [
    DropdownMenuComponent,
    DateRangeContraintDirective,
    HttpClientModule,
    ConfirmDialogComponent,
    ProgressBarComponent,
  ],
})
export class SharedModule {}
