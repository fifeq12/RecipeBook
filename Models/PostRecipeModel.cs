using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Models
{
    public class PostRecipeModel
    {
        [Key]
        public int Id { get; set; }
        public string name { get; set; }
        public int PreparationTime { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int IngredientsType { get; set; }
        public int Difficulty { get; set; }
        public int RecipeTypeId { get; set; }
    }
}
