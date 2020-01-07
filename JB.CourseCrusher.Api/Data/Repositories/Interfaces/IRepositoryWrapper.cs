using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JB.CourseCrusher.Api.Data.Repositories.Interfaces
{
    public interface IRepositoryWrapper
    {
        ICourseRepository Courses { get; }
        IQuestionRepository Questions { get; }
        IAnswerRepository Answers { get; }
        Task<bool> SaveAsync();
    }
}
