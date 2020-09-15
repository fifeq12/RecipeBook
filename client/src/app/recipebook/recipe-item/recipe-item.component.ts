import { Component, Input, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/shared/models/recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: IRecipe;
  
  constructor() { }

  ngOnInit(): void {
  }

}
