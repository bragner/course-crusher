using JB.CourseCrusher.Api.Data.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JB.CourseCrusher.Api.Data.Repositories.Interfaces
{
    public interface ICourseRepository : IRepository<Course>
    {
        Task<IEnumerable<Course>> GetAllCoursesAsync(bool includeQuestions = false);
        Task<Course> GetCourseByCourseIdAsync(string courseId, bool asNoTracking = true);
        Task<IEnumerable<Course>> GetAllCoursesForUserAsync(string owner, bool asNoTracking = true);
    }
}