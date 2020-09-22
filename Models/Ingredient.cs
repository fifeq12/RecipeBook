using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    public class Ingredient
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int RecipeId { get; set; }
        [ForeignKey("RecipeId")]
        public Recipe Recipe { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}
