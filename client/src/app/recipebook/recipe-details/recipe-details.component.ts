import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IIngredient } from 'src/app/shared/models/ingredient';
import { IPreparationSteps } from 'src/app/shared/models/preparationSteps';
import { IRecipe } from 'src/app/shared/models/recipe';
import { RecipebookService } from '../recipebook.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: IRecipe;
  ingredients: IIngredient[];
  preparationSteps: IPreparationSteps[];

  constructor(private recipeBookService: RecipebookService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.recipeBookService.getRecipe(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(recipe => {
      this.recipe = recipe;
      this.ingredients = recipe.ingredients;
      this.preparationSteps = recipe.preparationSteps;
    }, error => {
      console.log(error);
    });
  }

}
