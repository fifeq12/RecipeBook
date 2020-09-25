import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddRecipe } from '../shared/models/addRecipe';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  addForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.createAddForm();
  }

  createAddForm() {
    this.addForm = new FormGroup({
      name: new FormControl('', Validators.required),
      prepTime: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      imgUrl: new FormControl('', Validators.required),
      ingredTypes: new FormControl('', Validators.required),
      diff: new FormControl('', Validators.required),
      recipeType: new FormControl('', Validators.required)
    });
  }
  
  onSubmit() {
      console.log(this.addForm.value);
  }
 }
