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
            var random = new Random();
            context.Courses.Add(new Course
            {
                ID = random.Next(1,100),
                CourseId = $"asd-{random.Next(1,100)}",
                Name = "asd",
                Owner = $"owner {random.Next(1, 100)}"
            });
            context.SaveChanges();
        }

        public async Task<IEnumerable<Course>> GetAllCoursesAsync()
        {
            return await base.ReadAll().ToArrayAsync();
        }

        public async Task<Course> GetCoursesByCourseIdAsync(string courseId)
        {
            return await base.Read(x => x.CourseId == courseId).FirstOrDefaultAsync();
        }
    }
}
