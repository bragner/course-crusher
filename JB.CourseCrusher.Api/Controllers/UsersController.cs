using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JB.CourseCrusher.Api.Data.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JB.CourseCrusher.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IRepositoryWrapper _repository;

        public UsersController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_repository.Users.ReadAll());
        }
    }
}