using AutoMapper;
using JB.CourseCrusher.Api.Data.Entities;
using JB.CourseCrusher.Api.Data.Repositories.Interfaces;
using JB.CourseCrusher.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Drawing.Text;
using System.IO;
using System.Threading.Tasks;

namespace JB.CourseCrusher.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CoursesController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;

        private readonly Random random = new Random();

        public CoursesController(IRepositoryWrapper repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<CourseModel[]>> Get(bool includeQuestions = false)
        {
            try
            {
                var email = User.FindFirst("https://cc/email")?.Value;

                var allCourses = await _repository.Courses.GetAllCoursesForUserAsync(email, includeQuestions);

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
                if (model.CourseId != null)
                {
                    var currentCourse = await _repository.Courses.GetCourseByCourseIdAsync(model.CourseId);

                    if (currentCourse != null) return NotFound($"CourseId already exists.");
                }

                model.CourseId = Guid.NewGuid().ToString();
                var email = User.FindFirst("https://cc/email")?.Value;

                var course = _mapper.Map<Course>(model);
                course.Owner = email;
                course.Image = GenerateGradientCourseImage();
                _repository.Courses.Create(course);

                if (await _repository.SaveAsync())
                {
                    return Created(string.Empty, _mapper.Map<CourseModel>(course));
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

                var allQuestions = oldCourse.Questions;
                foreach (var question in allQuestions)
                {
                    foreach (var answer in question.Answers)
                        _repository.Answers.Delete(answer);

                    _repository.Questions.Delete(question);
                }


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

        private string GenerateGradientCourseImage()
        {
            var sigma = random.NextDouble();

            var list = new List<RGB>
            {
                new RGB
                {
                    R = 217,
                    G = 227,
                    B = 218
                },
                new RGB
                {
                    R = 236,
                    G = 201,
                    B = 199
                },
                new RGB
                {
                    R = 209,
                    G = 207,
                    B = 192
                },
                new RGB
                {
                    R = 194,
                    G = 194,
                    B = 180
                },
                new RGB
                {
                    R = 223,
                    G = 234,
                    B = 240
                },
                new RGB
                {
                    R = 223,
                    G = 246,
                    B = 202
                },
                new RGB
                {
                    R = 83,
                    G = 139,
                    B = 156
                },
                new RGB
                {
                    R = 242,
                    G = 235,
                    B = 219
                },
                new RGB
                {
                    R = 149,
                    G = 237,
                    B = 213
                },
                new RGB
                {
                    R = 255,
                    G = 111,
                    B = 119
                },
            };
            var color1 = random.Next(list.Count);
            var color2 = random.Next(list.Count);

            using Bitmap bitmap = new Bitmap(600, 200);
            using Graphics graphics = Graphics.FromImage(bitmap);
            using LinearGradientBrush brush = new LinearGradientBrush(
                new Rectangle(0, 0, 600, 200),
                Color.FromArgb(list[color1].R, list[color1].G, list[color1].B),
                Color.AntiqueWhite,
                LinearGradientMode.ForwardDiagonal);
                brush.SetSigmaBellShape((float)sigma);
                graphics.FillRectangle(brush, new Rectangle(0, 0, 600, 200));

            var ms = new MemoryStream();
            bitmap.Save(ms, ImageFormat.Png);
            byte[] bitmapdata = ms.ToArray();

            return Convert.ToBase64String(bitmapdata);
        }
        private struct RGB
        {
            public int R;
            public int G;
            public int B;
        }
    }

}