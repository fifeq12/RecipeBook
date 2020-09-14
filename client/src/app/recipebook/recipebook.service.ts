import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class RecipebookService {
  baseUrl = 'https://localhost:44322/api/';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getRecipes() {
    return this.http.get<IPagination>(this.baseUrl + 'recipes');
  }
}
