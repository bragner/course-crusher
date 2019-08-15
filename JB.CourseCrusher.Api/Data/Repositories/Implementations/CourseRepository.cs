using JB.CourseCrusher.Api.Data.Entities;
using JB.CourseCrusher.Api.Data.Repositories.Implementations;
using JB.CourseCrusher.Api.Data.Repositories.Interfaces;
using System;

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
                Name = "asd"
            });
            context.SaveChanges();
        }
    }
}
