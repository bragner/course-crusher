using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using JB.CourseCrusher.Api.Data.Entities;
using JB.CourseCrusher.Api.Data.Repositories.Interfaces;
using JB.CourseCrusher.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace JB.CourseCrusher.Api.Controllers
{
    [Route("api/Courses/{courseId}/[controller]")]
    [ApiController]
    [Authorize]
    public class QuestionsController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;

        public QuestionsController(IRepositoryWrapper repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<QuestionModel[]>> Get(string courseId)
        {
            try
            {
                var course = await _repository.Courses.GetCourseByCourseIdAsync(courseId, false);
                if (course == null) return NotFound($"Course with Id [{courseId}] doesn't exists.");

                var email = User.FindFirst("https://cc/email")?.Value;
                if (course.Owner != email) return this.StatusCode(StatusCodes.Status403Forbidden, "You do not have access to this course.");

                return _mapper.Map<QuestionModel[]>(course.Questions);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database failure.");
            }
        }
        [HttpGet("{questionId}")]
        public async Task<ActionResult<QuestionModel>> Get(string courseId, string questionId)
        {
            try
            {
                var course = await _repository.Courses.GetCourseByCourseIdAsync(courseId, false);
                if (course == null) return NotFound($"Course with Id [{courseId}] doesn't exists.");

                var email = User.FindFirst("https://cc/email")?.Value;
                if (course.Owner != email) return this.StatusCode(StatusCodes.Status403Forbidden, "You do not have access to this course.");

                var allQuestions = course.Questions;

                if (allQuestions == null) return NotFound($"Course with Id [{courseId}] doesn't exists.");

                var question = allQuestions.FirstOrDefault(x => x.QuestionId == questionId);

                if (question == null) return NotFound($"Question with Id [{questionId}] doesn't exists.");

                return _mapper.Map<QuestionModel>(question);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database failure.");
            }
        }
        [HttpPost]
        public async Task<ActionResult<QuestionModel>> Post(string courseId, QuestionModel model)
        {
            try
            {
                var course = await _repository.Courses.GetCourseByCourseIdAsync(courseId, false);

                if (course == null) return NotFound($"Course with Id [{courseId}] doesn't exists.");

                var email = User.FindFirst("https://cc/email")?.Value;
                if (course.Owner != email) return this.StatusCode(StatusCodes.Status403Forbidden, "You do not have access to this course.");

                var existingQuestion = course.Questions.FirstOrDefault(x => x.QuestionId == model.QuestionId);

                if (existingQuestion != null) return BadRequest("Question Id already exists.");

                model.QuestionId = Guid.NewGuid().ToString();
                var question = _mapper.Map<Question>(model);
                question.Course = course;
                question.Answers = question.Answers.Where(x => !string.IsNullOrEmpty(x.AnswerPhrase)).ToList();
                question.Answers.ForEach(x => x.AnswerId = Guid.NewGuid().ToString());
               
                _repository.Questions.Create(question);

                if (await _repository.SaveAsync())
                {
                    return Created(string.Empty, _mapper.Map<QuestionModel>(question));
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database failure.");
            }

            return BadRequest();
        }

        [HttpPut("{questionId}")]
        public async Task<ActionResult<QuestionModel>> Put(string courseId, string questionId, QuestionModel model)
        {
            try
            {
                var course = await _repository.Courses.GetCourseByCourseIdAsync(courseId, false);
                if (course == null) return NotFound($"Course with Id [{courseId}] doesn't exists.");

                var email = User.FindFirst("https://cc/email")?.Value;
                if (course.Owner != email) return this.StatusCode(StatusCodes.Status403Forbidden, "You do not have access to this course.");

                var oldQuestion = course.Questions.FirstOrDefault(x => x.QuestionId == questionId);

                if (oldQuestion == null) return NotFound($"Question with Id [{questionId}] doesn't exists.");

                _mapper.Map(model, oldQuestion);

                if (await _repository.SaveAsync())
                    return Ok(_mapper.Map<QuestionModel>(oldQuestion));

            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database failure.");
            }

            return BadRequest();
        }

        [HttpDelete("{questionId}")]
        public async Task<IActionResult> Delete(string courseId, string questionId)
        {
            try
            {
                var course = await _repository.Courses.GetCourseByCourseIdAsync(courseId, false);
                if (course == null) return NotFound($"Course with Id [{courseId}] doesn't exists.");

                var email = User.FindFirst("https://cc/email")?.Value;
                if (course.Owner != email) return this.StatusCode(StatusCodes.Status403Forbidden, "You do not have access to this course.");

                var question = course.Questions.FirstOrDefault(x => x.QuestionId == questionId);

                if (question == null) return NotFound($"Question with Id [{questionId}] doesn't exists.");

                foreach (var answer in question.Answers)
                    _repository.Answers.Delete(answer);

                _repository.Questions.Delete(question);

                if (await _repository.SaveAsync())
                    return Ok();

            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database failure.");
            }

            return BadRequest();
        }
    }
}