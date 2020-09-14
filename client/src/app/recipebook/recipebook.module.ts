import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipebookComponent } from './recipebook.component';



@NgModule({
  declarations: [RecipebookComponent],
  imports: [
    CommonModule
  ],
  exports: [RecipebookComponent]
})
export class RecipebookModule { }
