using JB.CourseCrusher.Api.Data.Entities;
using JB.CourseCrusher.Api.Data.Implementations;
using JB.CourseCrusher.Api.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JB.CourseCrusher.Api.Data.Repositories.Implementations
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly CourseCrusherContext _courseCrusherContext;

        private ICourseRepository _courses;
        private IQuestionRepository _questions;
        private IAnswerRepository _answers;

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

        public IQuestionRepository Questions
        {
            get
            {
                if (_questions == null)
                    _questions = new QuestionRepository(_courseCrusherContext);

                return _questions;
            }
        }

        public IAnswerRepository Answers
        {
            get
            {
                if (_answers == null)
                    _answers = new AnswerRepository(_courseCrusherContext);

                return _answers;
            }
        }

        public async Task<bool> SaveAsync()
        {
            var entries = _courseCrusherContext.ChangeTracker
                           .Entries()
                           .Where(e => e.Entity is BaseEntity && (
                                   e.State == EntityState.Added
                                   || e.State == EntityState.Modified));

            foreach (var entityEntry in entries)
            {
                ((BaseEntity)entityEntry.Entity).ModifiedDate = DateTime.Now;

                if (entityEntry.State == EntityState.Added)
                {
                    ((BaseEntity)entityEntry.Entity).CreatedDate = DateTime.Now;
                }
            }

            var resp = await _courseCrusherContext.SaveChangesAsync();
            return (resp) > 0;
        }
    }
}

