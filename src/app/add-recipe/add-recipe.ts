import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  imports: [FormsModule],
  templateUrl: './add-recipe.html',
  styleUrl: './add-recipe.css',
})
export class AddRecipe {
  ingredients = [{ name: '', quantity: 0, unit: '' }];

  constructor(private recipeService: RecipeService, private router: Router) {}

  protected success = signal(false);

  addIngredient() {
    this.ingredients.push({ name: '', quantity: 0, unit: '' });
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }

  onSubmit(form: any) {
    if (form.valid) {
      const newRecipe = {
        id: Date.now(),
        name: form.value.name,
        description: form.value.description,
        ingredients: this.ingredients.filter((ing) => ing.name && ing.quantity && ing.unit),
        imgUrl: '',
        isFavorite: false,
      };
      this.recipeService.addRecipe(newRecipe);
      form.resetForm();
      this.ingredients = [{ name: '', quantity: 0, unit: '' }];
      this.success.set(true);
      setTimeout(() => {
        this.success.set(false);
          this.router.navigate(['/']);
          }, 2000);
    }
  }
}
