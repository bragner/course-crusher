using AutoMapper;
using JB.CourseCrusher.Api.Data.Entities;
using JB.CourseCrusher.Api.Data.Repositories.Interfaces;
using JB.CourseCrusher.Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Threading.Tasks;

namespace JB.CourseCrusher.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;
        private readonly LinkGenerator _linkGenerator;

        public CoursesController(IRepositoryWrapper repository, IMapper mapper, LinkGenerator linkGenerator)
        {
            _repository = repository;
            _mapper = mapper;
            _linkGenerator = linkGenerator;
        }

        [HttpGet]
        public async Task<ActionResult<CourseModel[]>> Get()
        {
            try
            {
                var allCourses = await _repository.Courses.GetAllCoursesAsync();

                return _mapper.Map<CourseModel[]>(allCourses);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database failure.");
            }
        }

        [HttpGet("{courseId}")]
        public async Task<ActionResult<CourseModel>> Get(string courseId)
        {
            try
            {
                var currentCourse = await _repository.Courses.GetCoursesByCourseIdAsync(courseId);

                if (currentCourse == null) return NotFound($"No course with Course Id: {courseId}");

                return _mapper.Map<CourseModel>(currentCourse);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database failure.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<CourseModel>> Post(CourseModel model)
        {
            try
            {
                var currentCourse = await _repository.Courses.GetCoursesByCourseIdAsync(model.CourseId);

                if (currentCourse != null) return NotFound($"CourseId already exists.");

                var location = _linkGenerator.GetPathByAction("Get", "Courses", new { courseId = model.CourseId });

                if (string.IsNullOrEmpty(location))
                    return BadRequest("Could not use current courseId");

                var course = _mapper.Map<Course>(model);
                _repository.Courses.Create(course);

                if(await _repository.SaveAsync())
                {
                    return Created(location, _mapper.Map<CourseModel>(course));
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database failure.");
            }

            return BadRequest();
        }
    }
}