import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { IRecipeType } from '../shared/models/recipeTypes';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipebookService {
  baseUrl = 'https://localhost:44322/api/';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getRecipes(recipeTypeId?: number, ingredientsType?: string, orderBy?: string, search?: string) {
    let params = new HttpParams();

    if (recipeTypeId) {
      params = params.append('recipeTypeId', recipeTypeId.toString());
    }
    if (ingredientsType) {
      params = params.append('ingredientsType', ingredientsType);
    }
    if (orderBy) {
      params = params.append('orderBy', orderBy);
    }
    if(search) {
      params = params.append('search', search);
    }

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
}
