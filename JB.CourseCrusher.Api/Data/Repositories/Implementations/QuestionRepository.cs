using JB.CourseCrusher.Api.Data.Entities;
using JB.CourseCrusher.Api.Data.Repositories.Interfaces;
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
            var random = new Random();
            context.Question.Add(new Question
            {
                ID = random.Next(1, 100),
                QuestionPhrase = "Question Name"
            });
            context.SaveChanges();
        }
    }
}
