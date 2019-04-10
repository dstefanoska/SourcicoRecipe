import { Pipe, PipeTransform } from '@angular/core';
import { Ingredient } from '../models/RecipeModel';

@Pipe({
  name: 'transformIngredience'
})
export class TransformIngrediencePipe implements PipeTransform {

  transform(value: Ingredient[]): string {
    let result: string = '';
    if (value.length < 4) {
      for (let i = 0; i < value.length; i++) {
        if (i != 0) {
          result += ', ';
        }
        result += value[i].name;
      }
    } else {
      for (let i = 0; i < 3; i++) {
        result += value[i].name;

        if (i == 2) {
          result += '...'
        } else {
          result += ', ';
        }
      }
    }

    return result;
  }

}
