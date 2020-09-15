import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { IRecipe} from '../shared/models/recipe'
import { IRecipeType } from '../shared/models/recipeTypes';
import { RecipebookService } from './recipebook.service';

@Component({
  selector: 'app-recipebook',
  templateUrl: './recipebook.component.html',
  styleUrls: ['./recipebook.component.scss']
})
export class RecipebookComponent implements OnInit {
  @ViewChild('search') searchTerm: ElementRef;
  search: string;
  recipes: IRecipe[];
  recipeTypes: IRecipeType[];
  recipeTypeIdSelected = 0;
  ingredientsTypeSelected = 'all';
  ingredientsTypeOptions = [
    {name: 'Wszystkie', value: 'all'},
    {name: 'Mięsne', value: 'meat'},
    {name: 'Wegetariańskie', value: 'vege'},
    {name: 'Wegańskie', value: 'vegan'}
  ];
  isRecipeTypeMenuShown = false;
  isIngredientsTypeMenuShown = false;
  isSortTypeMenuShown = false;
  sortSelected = '';
  sortOptions = [
    {name: 'Nazwa', value: ''},
    {name: 'Szybkie', value: 'fast'},
    {name: 'Najnowsze', value: 'new'},
  ];

  @HostListener('document:click', ['$event'])
    // tslint:disable-next-line: typedef
    clickout() {
     this.isRecipeTypeMenuShown = false;
     this.isIngredientsTypeMenuShown = false;
     this.isSortTypeMenuShown = false;
    }

  constructor(private recipeBookService: RecipebookService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.getRecipes();
    this.getRecipeTypes();
  }

  // tslint:disable-next-line: typedef
  getRecipes() {
    this.recipeBookService.getRecipes(
      this.recipeTypeIdSelected,
      this.ingredientsTypeSelected,
      this.sortSelected, this.search).subscribe(response => {
      this.recipes = response.data;
    }, error => {
      console.log(error);
    });
  }
  // tslint:disable-next-line: typedef
  getRecipeTypes() {
    this.recipeBookService.getRecipeTypes().subscribe(response => {
      this.recipeTypes = [{id: 0, name: 'Wszystkie'}, ...response];
    }, error => {
      console.log(error);
    });
  }
  // tslint:disable-next-line: typedef
  onRecipeTypeSelected(recipeTypeId: number) {
    this.recipeTypeIdSelected = recipeTypeId;
    this.getRecipes();
  }
  // tslint:disable-next-line: typedef
  onIngredientsTypeSelected(ingredientsType: string) {
    this.ingredientsTypeSelected = ingredientsType;
    this.getRecipes();
  }
  // tslint:disable-next-line: typedef
  onSortSelected(sort: string) {
    this.sortSelected = sort;
    this.getRecipes();
  }
  // tslint:disable-next-line: typedef
  onSearch() {
    this.search = this.searchTerm.nativeElement.value;
    this.getRecipes();
  }
  // tslint:disable-next-line: typedef
  showRecipeTypeMenu(): void {
    this.isRecipeTypeMenuShown = !this.isRecipeTypeMenuShown;
    this.isIngredientsTypeMenuShown = false;
    this.isSortTypeMenuShown = false;
  }
  showIngredientsTypeMenu(): void {
    this.isIngredientsTypeMenuShown = !this.isIngredientsTypeMenuShown;
    this.isRecipeTypeMenuShown = false;
    this.isSortTypeMenuShown = false;
  }
  showSortTypeMenu(): void {
    this.isSortTypeMenuShown = !this.isSortTypeMenuShown;
    this.isRecipeTypeMenuShown = false;
    this.isIngredientsTypeMenuShown = false;
  }

}
