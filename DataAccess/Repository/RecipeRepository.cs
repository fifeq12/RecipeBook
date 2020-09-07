using DataAccess.Data;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class RecipeRepository : Repository<Recipe>, IRecipeRepository
    {
        private readonly ApplicationDbContext _context;
        public RecipeRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
