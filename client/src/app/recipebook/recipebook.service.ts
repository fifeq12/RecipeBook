import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IRecipeType } from '../shared/models/recipeTypes';
import { map } from 'rxjs/operators';
import { recipeParams } from '../shared/models/recipeParams';
import { IRecipe } from '../shared/models/recipe';
import { IPagination } from '../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class RecipebookService {
  baseUrl = 'https://localhost:44322/api/';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getRecipes(
    // tslint:disable-next-line: no-shadowed-variable
    recipeParams: recipeParams
    ) {
    let params = new HttpParams();

    if (recipeParams.recipeTypeId) {
      params = params.append('recipeTypeId', recipeParams.recipeTypeId.toString());
    }
    if (recipeParams.ingredientsType !== 'all') {
      params = params.append('ingredientsType', recipeParams.ingredientsType);
    }

    params = params.append('orderBy', recipeParams.sort);

    if (recipeParams.search) {
      params = params.append('search', recipeParams.search);
    }

    params = params.append('page', recipeParams.pageNumber.toString());
    params = params.append('pageSize', recipeParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'recipes', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }
  // tslint:disable-next-line: typedef
  getRecipeTypes() {
    return this.http.get<IRecipeType[]>(this.baseUrl + 'recipes/types');
  }

  getRecipe(id: number) {
    return this.http.get<IRecipe>(this.baseUrl + 'recipes/' + id);
  }
}
