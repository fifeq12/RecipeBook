import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddRecipeService {
  baseUrl = 'https://localhost:44322/api/';

  constructor(private http: HttpClient) { }
  
  addRecipe(data: any) {
    // tslint:disable-next-line: ban-types
    return this.http.post<any>(this.baseUrl + 'recipes/add', data);
  }
}
