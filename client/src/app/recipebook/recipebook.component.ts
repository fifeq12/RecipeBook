import { Component, OnInit } from '@angular/core';
import { IRecipe} from '../shared/models/recipe'
import { RecipebookService } from './recipebook.service';

@Component({
  selector: 'app-recipebook',
  templateUrl: './recipebook.component.html',
  styleUrls: ['./recipebook.component.scss']
})
export class RecipebookComponent implements OnInit {
  recipes: IRecipe[]
  constructor(private recipeBookService: RecipebookService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.recipeBookService.getRecipes().subscribe(response => {
      this.recipes = response.data;
    }, error => {
      console.log(error);
    })
  }

}
