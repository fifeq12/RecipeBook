import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { HomeComponent } from './home/home.component';
import { RecipeDetailsComponent } from './recipebook/recipe-details/recipe-details.component';
import { RecipebookComponent } from './recipebook/recipebook.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'add', component: AddRecipeComponent},
  {path: 'recipes', loadChildren: () => import('./recipebook/recipebook.module').then(mod => mod.RecipebookModule)},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
