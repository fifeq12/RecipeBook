import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipebookComponent } from './recipebook.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { SharedModule } from '../shared/shared.module';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipebookRoutingModule } from './recipebook-routing.module';



@NgModule({
  declarations: [RecipebookComponent, RecipeItemComponent, RecipeDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RecipebookRoutingModule
  ]
})
export class RecipebookModule { }
