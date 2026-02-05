import { Component, signal, computed, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { RecipeModel } from '../models';

@Component({
  selector: 'app-recipe-detail',
  imports: [],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail {
  protected readonly recipe = signal<RecipeModel | undefined>(undefined);
  protected readonly count = signal(1);

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
  ) {
    effect(() => {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.recipe.set(this.recipeService.getById(id));
      this.count.set(1);
    });
  }

  protected incrementCount(): void {
    this.count.update((c) => c + 1);
  }

  protected decrementCount(): void {
    if (this.count() > 1) {
      this.count.update((c) => c - 1);
    }
  }

  protected readonly adjustedIngredients = computed(
    () =>
      this.recipe()?.ingredients.map((ingredient) => ({
        ...ingredient,
        quantity: ingredient.quantity * this.count(),
      })) ?? [],
  );
}
