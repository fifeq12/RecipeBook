import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginationHeaderComponent } from './components/pagination-header/pagination-header.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations:  [PaginationHeaderComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [
    PaginationModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
