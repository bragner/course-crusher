using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using JB.CourseCrusher.Api.Data.Entities;
using JB.CourseCrusher.Api.Data.Repositories.Interfaces;
using JB.CourseCrusher.Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace JB.CourseCrusher.Api.Controllers
{
    [Route("api/Courses/{courseId}/[controller]")]
    [ApiController]
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
                var allQuestions = await _repository.Questions.GetAllQuestionsFromCourse(courseId);

                return _mapper.Map<QuestionModel[]>(allQuestions);
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
                var allQuestions = await _repository.Questions.GetAllQuestionsFromCourse(courseId);

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

                var existingQuestion = course.Questions.FirstOrDefault(x => x.QuestionId == model.QuestionId);

                if (existingQuestion != null) return BadRequest("Question Id already exists.");

                model.QuestionId = Guid.NewGuid().ToString();
                var question = _mapper.Map<Question>(model);
                question.Course = course;

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
                var allQuestions = await _repository.Questions.GetAllQuestionsFromCourse(courseId);

                if (allQuestions == null) return NotFound($"Course with Id [{courseId}] doesn't exists.");

                var oldQuestion = allQuestions.FirstOrDefault(x => x.QuestionId == questionId);

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
                var allQuestions = await _repository.Questions.GetAllQuestionsFromCourse(courseId);

                if (allQuestions == null) return NotFound($"Course with Id [{courseId}] doesn't exists.");

                var question = allQuestions.FirstOrDefault(x => x.QuestionId == questionId);

                if (question == null) return NotFound($"Question with Id [{questionId}] doesn't exists.");

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