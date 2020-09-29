using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DataAccess.Data;
using DataAccess.Repository;
using DataAccess.Repository.IRepository;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Models;
using RecipeBook.DTO;
using RecipeBook.Helpers;

namespace RecipeBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _environment;

        public RecipesController(ApplicationDbContext context, IConfiguration config, IUnitOfWork unitOfWork, IWebHostEnvironment environment)
        {
            _config = config;
            _unitOfWork = unitOfWork;
            _environment = environment;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<RecipeReturn>>> GetRecipes(string orderBy, string ingredientsType, string search, int? page, int? pageSize, int recipeTypeId)
        {
            var recipes = await _unitOfWork.Recipe.GetAll(includeProperties: "RecipeType");
            var ingredients = await _unitOfWork.Ingredient.GetAll();
            var prepartionSteps = await _unitOfWork.PreparationStep.GetAll();

            switch (orderBy)
            {
                case "fast":
                    recipes = recipes.OrderBy(x => x.PreparationTime);
                    break;
                case "new":
                    break;
                default:
                    recipes = recipes.OrderBy(x => x.Name);
                    break;
            }
            switch (ingredientsType)
            {
                case "vege":
                    recipes = recipes.Where(x => x.IngredientsType.ToString() == "Wegetariańskie");
                    break;
                case "vegan":
                    recipes = recipes.Where(x => x.IngredientsType.ToString() == "Wegańskie");
                    break;
                case "meat":
                    recipes = recipes.Where(x => x.IngredientsType.ToString() == "Mięsne");
                    break;
            }
            if (search != null)
            {
                recipes = recipes.Where(x => EF.Functions.Like(x.Name, $"%{search}%"));
            }

            if(recipeTypeId > 0)
            {
                recipes = recipes.Where(x => x.RecipeTypeId == recipeTypeId);
            }

            var data = recipes.Select(recipe => new RecipeReturn
            {
                Id = recipe.Id,
                Name = recipe.Name,
                PreparationTime = recipe.PreparationTime,
                Description = recipe.Description,
                ImageUrl = _config["ApiUrl"] + recipe.ImageUrl,
                IngredientsType = Enum.GetName(typeof(IngredientsType), recipe.IngredientsType),
                Difficulty = Enum.GetName(typeof(Difficulty), recipe.Difficulty),
                RecipeType = recipe.RecipeType.Name,
                Ingredients = ingredients.Where(x => x.RecipeId == recipe.Id).Select(ingredient => new IngredientReturn
                {
                    Id = ingredient.Id,
                    Name = ingredient.Name
                }).ToList(),
                PreparationSteps = prepartionSteps.Where(x => x.RecipeId == recipe.Id).Select(step => new PreparationStepReturn
                {
                    Id = step.Id,
                    Name = step.Name
                }).ToList()
            }).ToList();

            return Ok(Pagination<RecipeReturn>.Create(data, page ?? 1, pageSize ?? 10));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<RecipeReturn>> GetRecipe(int id)
        {
            var recipe = await _unitOfWork.Recipe.GetFirstOrDefault(x => x.Id == id, includeProperties: "RecipeType");
            var ingredients = await _unitOfWork.Ingredient.GetAll(filter: x => x.RecipeId == id);
            var prepartionSteps = await _unitOfWork.PreparationStep.GetAll(filter: x => x.RecipeId == id);

            if (recipe == null)
            {
                return NotFound();
            }
            return new RecipeReturn
            {
                Id = recipe.Id,
                Name = recipe.Name,
                PreparationTime = recipe.PreparationTime,
                Description = recipe.Description,
                ImageUrl = _config["ApiUrl"] + recipe.ImageUrl,
                IngredientsType = Enum.GetName(typeof(IngredientsType), recipe.IngredientsType),
                Difficulty = Enum.GetName(typeof(Difficulty), recipe.Difficulty),
                RecipeType = recipe.RecipeType.Name,
                Ingredients = ingredients.Select(ingredient => new IngredientReturn
                {
                    Id = ingredient.Id,
                    Name = ingredient.Name
                }).ToList(),
                PreparationSteps = prepartionSteps.Select(step => new PreparationStepReturn
                {
                    Id = step.Id,
                    Name = step.Name
                }).ToList()
            };
        }
        [HttpGet("types")]
        public async Task<ActionResult> GetTypes()
        {
            var types = await _unitOfWork.RecipeType.GetAll();
            return Ok(types);
        }

        [HttpPost("add")]
        public async Task<ActionResult> AddRecipe([FromForm]PostRecipeModel recipeModel)
        {
            if (recipeModel.file.Length > 0)
            {
                using (FileStream fileStream = System.IO.File.Create(_environment.WebRootPath + @"\images\recipes\" + recipeModel.file.FileName))
                {
                    await recipeModel.file.CopyToAsync(fileStream);
                    fileStream.Flush();
/*                    await _unitOfWork.Recipe.Add(recipeModel.recipe);
                    await _unitOfWork.Save();*/
                    return Ok(recipeModel.recipe);
                }
            }
            else
            {
                return BadRequest();
            }

        }
/*        [HttpPost("upload")]
        public async Task<ActionResult> UploadImage(IFormFile file)
        {

        }*/
    }
}
