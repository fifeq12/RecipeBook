using DataAccess.Data;
using DataAccess.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _db;
        public UnitOfWork(ApplicationDbContext db)
        {
            _db = db;
            Recipe = new RecipeRepository(_db);
            RecipeType = new RecipeTypeRepository(_db);
        }
        public IRecipeRepository Recipe { get; private set; }
        public IRecipeTypeRepository RecipeType { get; private set; }

    }
}
