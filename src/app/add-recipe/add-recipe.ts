import { Component, signal } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-recipe',
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './add-recipe.html',
  styleUrl: './add-recipe.css',
})
export class AddRecipe {
  ingredients = [{ name: '', quantity: 0, unit: '' }];
  protected success = signal(false);
  recipeForm: FormGroup;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      authorEmail: ['', [Validators.required, Validators.email]],
    });
  }

  addIngredient() {
    this.ingredients.push({ name: '', quantity: 0, unit: '' });
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }

  save(): void {
    if (this.recipeForm.valid) {
      const newRecipe = {
        id: Date.now(),
        name: this.recipeForm.value.name,
        description: this.recipeForm.value.description,
        authorEmail: this.recipeForm.value.authorEmail,
        ingredients: this.ingredients.filter((ing) => ing.name && ing.quantity && ing.unit),
        imgUrl: '',
        isFavorite: false,
      };
      this.recipeService.addRecipe(newRecipe);
      this.recipeForm.reset();
      this.ingredients = [{ name: '', quantity: 0, unit: '' }];
      this.success.set(true);
      setTimeout(() => {
        this.success.set(false);
        this.router.navigate(['/']);
      }, 2000);
    }
  }
}
