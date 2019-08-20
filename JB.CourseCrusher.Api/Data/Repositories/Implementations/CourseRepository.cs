using JB.CourseCrusher.Api.Data.Entities;
using JB.CourseCrusher.Api.Data.Repositories.Implementations;
using JB.CourseCrusher.Api.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JB.CourseCrusher.Api.Data.Implementations
{
    public class CourseRepository : Repository<Course>, ICourseRepository
    {
        public CourseRepository(CourseCrusherContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Course>> GetAllCoursesAsync(bool includeQuestions = false)
        {
            if(includeQuestions)
                return await base.ReadAll().Include(x => x.Questions).ToArrayAsync();

            return await base.ReadAll().ToArrayAsync();
        }

        public async Task<Course> GetCourseByCourseIdAsync(string courseId, bool asNoTracking = true)
        {
            return await base.Read(x => x.CourseId == courseId, asNoTracking).FirstOrDefaultAsync();
        }
    }
}
