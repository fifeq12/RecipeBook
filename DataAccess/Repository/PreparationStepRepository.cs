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
    public class PreparationStepRepository : Repository<PreparationStep>, IPreparationStepRepository
    {
        private readonly ApplicationDbContext _context;
        public PreparationStepRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
