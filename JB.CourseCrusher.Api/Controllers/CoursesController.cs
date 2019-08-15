using JB.CourseCrusher.Api.Data.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace JB.CourseCrusher.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private IRepositoryWrapper _repository;

        public CoursesController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_repository.Courses.ReadAll());
        }
    }
}