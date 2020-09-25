import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRecipeComponent } from './add-recipe.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AddRecipeComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AddRecipeModule { }
