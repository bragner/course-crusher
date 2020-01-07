using JB.CourseCrusher.Api.Data.Entities;
using JB.CourseCrusher.Api.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JB.CourseCrusher.Api.Data.Repositories.Implementations
{
    public class QuestionRepository : Repository<Question>, IQuestionRepository
    {
        public QuestionRepository(CourseCrusherContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Question>> GetAllQuestionsFromCourse(string courseId)
        {
            return await base.Read(x => x.Course.CourseId == courseId).Include(x => x.Answers).ToArrayAsync();
        }
    }
}
