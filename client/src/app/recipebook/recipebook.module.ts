import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipebookComponent } from './recipebook.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [RecipebookComponent, RecipeItemComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [RecipebookComponent]
})
export class RecipebookModule { }
