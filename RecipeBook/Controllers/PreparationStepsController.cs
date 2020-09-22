using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess.Data;
using DataAccess.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RecipeBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PreparationStepsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public PreparationStepsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpGet]
        public async Task<ActionResult> GetPreparationSteps()
        {
            var steps = await _unitOfWork.PreparationStep.GetAll(includeProperties: "Recipe");
            return Ok(steps);
        }
    }
}
