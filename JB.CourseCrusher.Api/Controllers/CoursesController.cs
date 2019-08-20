using AutoMapper;
using JB.CourseCrusher.Api.Data.Entities;
using JB.CourseCrusher.Api.Data.Repositories.Interfaces;
using JB.CourseCrusher.Api.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
        public async Task<ActionResult<CourseModel[]>> Get(bool includeQuestions = false)
        {
            try
            {
                var allCourses = await _repository.Courses.GetAllCoursesAsync(includeQuestions);

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
                var currentCourse = await _repository.Courses.GetCourseByCourseIdAsync(courseId);

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
                var currentCourse = await _repository.Courses.GetCourseByCourseIdAsync(model.CourseId);

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

        [HttpPut("{courseId}")]
        public async Task<ActionResult<CourseModel>> Put(string courseId, CourseModel model)
        {
            try
            {
                var oldCourse = await _repository.Courses.GetCourseByCourseIdAsync(courseId, false);

                if (oldCourse == null) return NotFound($"Course with Id [{courseId}] doesn't exists.");

                _mapper.Map(model, oldCourse);

                if (await _repository.SaveAsync())
                {
                    return Ok(_mapper.Map<CourseModel>(oldCourse));
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database failure.");
            }

            return BadRequest();
        }

        [HttpDelete("{courseId}")]
        public async Task<ActionResult<CourseModel>> Delete(string courseId)
        {
            try
            {
                var oldCourse = await _repository.Courses.GetCourseByCourseIdAsync(courseId);

                if (oldCourse == null) return NotFound($"Course with Id [{courseId}] doesn't exists.");

                _repository.Courses.Delete(oldCourse);

                if (await _repository.SaveAsync())
                {
                    return Ok();
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