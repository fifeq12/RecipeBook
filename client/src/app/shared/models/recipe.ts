export interface IRecipe {
    id: number;
    name: string;
    preparationTime: number;
    description: string;
    imageUrl: string;
    ingredientsType: string;
    difficulty: string;
    recipeType: string;
}