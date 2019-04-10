import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ToastrService } from "ngx-toastr";
import { RecipeModel, Ingredient } from '../models/RecipeModel';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private dummyRecipe: RecipeModel[] = new Array<RecipeModel>();

  constructor(
    private notificationsService: ToastrService
  ) {
    this.dummyRecipe = this.getDummyRecipes();
  }

  getRecepies(): Observable<RecipeModel[]> {
    return of(this.dummyRecipe);
  }

  getRecipe(id: number): Observable<RecipeModel> {
    return of(this.dummyRecipe.find(x => x.id == id));
  }

  addOrUpdateRecepies(recipe: RecipeModel) {
    let index = this.dummyRecipe.findIndex(x => x.id == recipe.id);

    if (index == -1) {
      recipe.id = this.dummyRecipe[this.dummyRecipe.length - 1].id + 1;
      this.dummyRecipe.push(recipe);
      this.notificationsService.success("Success", "Recipe successfully added");
    } else {
      this.dummyRecipe[index] = recipe;
      this.notificationsService.success("Success", "Recipe successfully edited");
    }
  }

  removeRecepi(recipeId: number): Observable<boolean> {
    let index = this.dummyRecipe.findIndex(x => x.id == recipeId);
    if (index != -1) {
      this.dummyRecipe.splice(index, 1);
      this.notificationsService.success("Success", "Recipe successfully removed");
      return of(true);
    } else {
      this.notificationsService.success("Error", "Recepi wasn't removed successfully. Please try again.");
      return of(false);
    }
  }

  private getDummyRecipes(): RecipeModel[] {
    const dummyRecipe: RecipeModel[] = new Array<RecipeModel>();

    let recipe1 = new RecipeModel(1, 'Recipe 1', 'some_source_url',
    [new Ingredient('Eggs', '2'), new Ingredient('Milk', '200 ml'), new Ingredient('Water', '150 ml'), new Ingredient('Flour', '500 gr'), new Ingredient('Cinamon', '1 teaspoon')],
    600, 'Insutrctions on how to do this recipe');

    let recipe2 = new RecipeModel(2, 'Recipe 2', 'some_source_url',
    [new Ingredient('Eggs', '2'), new Ingredient('Milk', '200 ml'), new Ingredient('Cocoa', '1 teaspoon')],
    200, 'Insutrctions on how to do this recipe');

    let recipe3 = new RecipeModel(3, 'Recipe 3', 'some_source_url',
    [new Ingredient('Water', '150 ml'), new Ingredient('Flour', '500 gr')],
    400, 'Insutrctions on how to do this recipe');

    let recipe4 = new RecipeModel(4, 'Recipe 4', 'some_source_url',
    [new Ingredient('Eggs', '2'), new Ingredient('Milk', '200 ml')],
    30, 'Insutrctions on how to do this recipe');

    let recipe5 = new RecipeModel(5, 'Recipe 5', 'some_source_url',
    [new Ingredient('Milk', '200 ml'), new Ingredient('Water', '150 ml'), new Ingredient('Flour', '500 gr'), new Ingredient('Cinamon', '1 teaspoon')],
    50, 'Insutrctions on how to do this recipe ghfjtyruhugu');

    let recipe6 = new RecipeModel(6, 'Recipe 6', 'some_source_url',
    [new Ingredient('Milk', '200 ml'), new Ingredient('Water', '150 ml'), new Ingredient('Flour', '500 gr'), new Ingredient('Cinamon', '1 teaspoon')],
    50, 'Insutrctions on how to do this recipe ghfjtyruhugu ggggggg');

    let recipe7 = new RecipeModel(7, 'Recipe 7', 'some_source_url',
    [new Ingredient('Milk', '200 ml'), new Ingredient('Water', '150 ml'), new Ingredient('Flour', '500 gr'), new Ingredient('Cinamon', '1 teaspoon')],
    50, 'Insutrctions on how to do this recipe ghfjtyruhuguggggggg fjjffjf');

    dummyRecipe.push(recipe1);
    dummyRecipe.push(recipe2);
    dummyRecipe.push(recipe3);
    dummyRecipe.push(recipe4);
    dummyRecipe.push(recipe5);
    dummyRecipe.push(recipe6);
    dummyRecipe.push(recipe7);

    return dummyRecipe;
  }
}
