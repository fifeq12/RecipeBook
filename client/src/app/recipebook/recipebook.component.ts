import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { IRecipe} from '../shared/models/recipe';
import { recipeParams } from '../shared/models/recipeParams';
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
  recipeParams = new recipeParams();
  totalItems: number;
  ingredientsTypeOptions = [
    {name: 'Wszystkie', value: 'all'},
    {name: 'Mięsne', value: 'meat'},
    {name: 'Wegetariańskie', value: 'vege'},
    {name: 'Wegańskie', value: 'vegan'}
  ];
  isRecipeTypeMenuShown = false;
  isIngredientsTypeMenuShown = false;
  isSortTypeMenuShown = false;
  sortOptions = [
    {name: 'Nazwa', value: ''},
    {name: 'Szybkie', value: 'fast'},
    {name: 'Najnowsze', value: 'new'},
  ];
  recipeTypeNameSelected = 'Wszystkie';
  ingredientsTypeNameSelected: string;
  sortOptionsSelected: string;

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
      this.recipeParams,
       this.search
       ).subscribe(response => {
      this.recipes = response.data;
      this.recipeParams.pageNumber = response.pageIndex;
      this.totalItems = response.count;
      this.recipeParams.pageSize = response.pageSize;
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
  onRecipeTypeSelected(recipeTypeId: number, recipeTypeName: string) {
    this.recipeParams.recipeTypeId = recipeTypeId;
    this.recipeTypeNameSelected = recipeTypeName;
    this.getRecipes();
  }
  // tslint:disable-next-line: typedef
  onIngredientsTypeSelected(ingredientsType: string, ingredientsTypeName: string) {
    this.recipeParams.ingredientsType = ingredientsType;
    if (ingredientsTypeName !== 'Wszystkie') {
      this.ingredientsTypeNameSelected = ingredientsTypeName;
    } else {
      this.ingredientsTypeNameSelected = null;
    }
    this.getRecipes();
  }
  // tslint:disable-next-line: typedef
  onSortSelected(sort: string, sortName: string) {
    this.recipeParams.sort = sort;
    if (sortName !== 'Nazwa') {
      this.sortOptionsSelected = sortName;
    } else {
      this.sortOptionsSelected = null;
    }
    this.getRecipes();
  }
  // tslint:disable-next-line: typedef
  onSearch() {
    this.search = this.searchTerm.nativeElement.value;
    this.getRecipes();
  }

  resetFilters() {
    this.recipeParams = new recipeParams();
    this.ingredientsTypeNameSelected = null;
    this.sortOptionsSelected = null;
    this.recipeTypeNameSelected = 'Wszystkie';
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

  onPageChanged(event: any) {
    this.recipeParams.pageNumber = event.page;
    this.getRecipes();
  }

}
