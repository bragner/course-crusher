using JB.CourseCrusher.Api.Data.Implementations;
using JB.CourseCrusher.Api.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JB.CourseCrusher.Api.Data.Repositories.Implementations
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private CourseCrusherContext _courseCrusherContext;
        private ICourseRepository _courses;
        private IUserRepository _users;
        private IQuestionRepository _questions;

        public RepositoryWrapper(CourseCrusherContext context)
        {
            _courseCrusherContext = context;
        }

        public ICourseRepository Courses
        {
            get
            {
                if (_courses == null)
                    _courses = new CourseRepository(_courseCrusherContext);

                return _courses;
            }
        }

        public IUserRepository Users
        {
            get
            {
                if (_users == null)
                    _users = new UserRepository(_courseCrusherContext);

                return _users;
            }
        }

        public IQuestionRepository Questions
        {
            get
            {
                if (_questions == null)
                    _questions = new QuestionRepository(_courseCrusherContext);

                return _questions;
            }
        }

        public void Save()
        {
            _courseCrusherContext.SaveChanges();
        }
    }
}

