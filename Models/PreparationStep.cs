using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    public class PreparationStep
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int RecipeId { get; set; }
        [ForeignKey("RecipeId")]
        public Recipe Recipe { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
    }
}
