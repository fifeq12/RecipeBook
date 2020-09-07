using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess.Data;
using DataAccess.Repository;
using DataAccess.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Models;
using RecipeBook.DTO;

namespace RecipeBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUnitOfWork _unitOfWork;

        public RecipesController(ApplicationDbContext context, IConfiguration config, IUnitOfWork unitOfWork)
        {
            _config = config;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecipeReturn>>> GetRecipes()
        {
            var recipes = await _unitOfWork.Recipe.GetAll(includeProperties: "RecipeType");
            return recipes.Select(recipe => new RecipeReturn
            {
                Id = recipe.Id,
                Name = recipe.Name,
                PreparationTime = recipe.PreparationTime,
                Description = recipe.Description,
                ImageUrl = _config["ApiUrl"] + recipe.ImageUrl,
                IngredientsType = Enum.GetName(typeof(IngredientsType), recipe.IngredientsType),
                Difficulty = Enum.GetName(typeof(Difficulty), recipe.Difficulty),
                RecipeType = recipe.RecipeType.Name
            }).ToList();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<RecipeReturn>> GetRecipe(int id)
        {
            var recipe = await _unitOfWork.Recipe.GetFirstOrDefault(x => x.Id == id, includeProperties: "RecipeType");
            if(recipe == null)
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
                RecipeType = recipe.RecipeType.Name
            };
        }
        [HttpGet("types")]
        public async Task<ActionResult> GetTypes()
        {
            var types = await _unitOfWork.RecipeType.GetAll();
            return Ok(types);
        }
    }
}
