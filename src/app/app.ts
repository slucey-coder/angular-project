import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MOCK_RECIPES } from './mock-recipes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('My Recipe Box');
  protected readonly recipe = signal(MOCK_RECIPES[0]);
  protected readonly count = signal([1,1]);

  protected recipe1(): void {
    this.recipe.set(MOCK_RECIPES[0]);
}

  protected recipe2(): void {
    this.recipe.set(MOCK_RECIPES[1]);
  }

  protected recipePosition(): number {
    return this.recipe().id - 1;
  }

  protected incrementCount(): void {
    this.count.update(c => 
      c.map((value, index) => index === this.recipePosition() ? value + 1 : value)
    );
  }

  protected decrementCount(): void {
    this.count.update(c => 
      c.map((value, index) => index === this.recipePosition() && value > 1 ? value - 1 : value)
    );
  }

  protected readonly adjustedIngredients = computed(() => 
    this.recipe().ingredients.map(ingredient => ({
      ...ingredient,
      quantity: ingredient.quantity * this.count()[this.recipePosition()]
    }))
  );
}