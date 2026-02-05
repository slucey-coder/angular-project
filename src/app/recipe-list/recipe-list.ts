import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  imports: [FormsModule, RouterModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  protected readonly searchTerm = signal('');

  constructor(protected recipeService: RecipeService) {}

  protected readonly filteredRecipes = computed(() =>
    this.recipeService.filterByName(this.searchTerm()),
  );
}
