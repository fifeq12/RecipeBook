using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    public class Recipe
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        [Required]
        public int PreparationTime { get; set; }
        [Required]
        [MaxLength(150)]
        public string Description { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        [Required]
        [EnumDataType(typeof(IngredientsType))]
        public IngredientsType IngredientsType { get; set; }
        [Required]
        [EnumDataType(typeof(Difficulty))]
        public Difficulty Difficulty { get; set; }
        [Required]
        public int RecipeTypeId { get; set; }
        [ForeignKey("RecipeTypeId")]
        public RecipeType RecipeType { get; set; }
    }
    public enum IngredientsType
    {
        Mięsne,
        Wegetariańskie,
        Wegańskie
    }
    public enum Difficulty
    {
        Łatwe,
        Średnie,
        Trudne
    }
}
