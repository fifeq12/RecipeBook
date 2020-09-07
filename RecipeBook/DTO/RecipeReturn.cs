using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeBook.DTO
{
    public class RecipeReturn
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int PreparationTime { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string IngredientsType { get; set; }
        public string Difficulty { get; set; }
        public string RecipeType { get; set; }
    }
}
