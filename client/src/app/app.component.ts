import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRecipe} from './models/recipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'RecipeBook';
  recipes: IRecipe[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://localhost:44322/api/recipes/').subscribe((response: any) => {
      this.recipes = response;
    }, error => {
      console.log(error);
    });
  }
}
