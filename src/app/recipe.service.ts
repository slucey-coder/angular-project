import { Injectable, signal, computed } from '@angular/core';
import { MOCK_RECIPES } from './mock-recipes';
import { RecipeModel } from './models';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private readonly recipes = signal<RecipeModel[]>(MOCK_RECIPES);

  getAll() {
    return this.recipes();
  }

  getById(id: number) {
    return this.recipes().find((r) => r.id === id);
  }

  filterByName(term: string) {
    return this.recipes().filter((recipe) =>
      recipe.name.toLowerCase().includes(term.toLowerCase()),
    );
  }

  addRecipe(recipe: RecipeModel) {
    this.recipes.update((recipes) => [...recipes, recipe]);
  }
}
