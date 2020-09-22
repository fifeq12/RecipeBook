import { IIngredient } from './ingredient';
import { IPreparationSteps } from './preparationSteps';

export interface IRecipe {
    id: number;
    name: string;
    preparationTime: number;
    description: string;
    imageUrl: string;
    ingredientsType: string;
    difficulty: string;
    recipeType: string;
    ingredients: IIngredient[];
    preparationSteps: IPreparationSteps[];
}