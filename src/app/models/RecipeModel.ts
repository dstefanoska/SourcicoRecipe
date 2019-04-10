export class RecipeModel {
    id: number;
    name: string;
    source: string;
    ingredients: Ingredient[];
    prepTime: number;
    instructions: string;

    constructor(id?: number, name?: string, source?: string, ingredients?: Ingredient[], prepTime?: number, instructions?: string) {
        this.id = id;
        this.name = name;
        this.source = source;
        this.ingredients = ingredients;
        this.prepTime = prepTime;
        this.instructions = instructions;
    }
}

export class Ingredient {
    name: string;
    quantity: string;

    constructor(name?: string, quantity?: string) {
        this.name = name;
        this.quantity = quantity;
    }
}
