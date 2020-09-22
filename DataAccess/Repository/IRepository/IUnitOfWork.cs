using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        IRecipeRepository Recipe { get; }
        IRecipeTypeRepository RecipeType { get; }
        IIngredientRepository Ingredient { get; }
        IPreparationStepRepository PreparationStep { get; }
    }
}
