import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipebookComponent } from './recipebook.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';



@NgModule({
  declarations: [RecipebookComponent, RecipeItemComponent],
  imports: [
    CommonModule
  ],
  exports: [RecipebookComponent]
})
export class RecipebookModule { }
