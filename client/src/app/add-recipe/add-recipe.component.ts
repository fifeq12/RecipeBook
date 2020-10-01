import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddRecipe } from '../shared/models/addRecipe';
import { AddRecipeService } from './add-recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  addForm: FormGroup;
  file: File;

  constructor(private addRecipeService: AddRecipeService) { }

  ngOnInit(): void {
    this.createAddForm();
  }

  createAddForm() {
    this.addForm = new FormGroup({
      name: new FormControl('', Validators.required),
      preparationTime: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
      ingredientsType: new FormControl('', Validators.required),
      difficulty: new FormControl('', Validators.required),
      recipeTypeId: new FormControl('', Validators.required)
    });
  }
  
  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onSubmit() {
      const formData = new FormData();
      formData.append('file', this.file, this.file.name);
      formData.set('recipeJson', JSON.stringify(this.addForm.value));
      this.addRecipeService.addRecipe(formData).subscribe(response => {
         console.log(response);
      }, error => {
         console.log(error);
      });
  }
 }
