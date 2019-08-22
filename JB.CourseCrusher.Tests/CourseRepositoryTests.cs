using FluentAssertions;
using JB.CourseCrusher.Api.Data.Entities;
using JB.CourseCrusher.Api.Data.Implementations;
using JB.CourseCrusher.Api.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JB.CourseCrusher.Tests
{
    [TestClass]
    public class CourseRepositoryTests
    {
        private Mock<ICourseRepository> mockCourseRepository;
        private const string course2Id = "course2";

        [TestInitialize]
        public void Initialize()
        {
            this.mockCourseRepository = new Mock<ICourseRepository>();
        }

        [TestMethod]
        public void ShouldReceive()
        {
            this.mockCourseRepository.Setup(x => x.GetAllCoursesAsync(false))
                                     .ReturnsAsync(GetExampleCourses());

            var allCourses = mockCourseRepository.Object.GetAllCoursesAsync().Result;

            allCourses.Should().NotBeNullOrEmpty();
        }

        [TestMethod]
        public void ShouldReceiveSingle()
        {
            this.mockCourseRepository.Setup(x => x.GetCourseByCourseIdAsync(course2Id, true))
                                     .ReturnsAsync(GetExampleCourse());

            var course = mockCourseRepository.Object.GetCourseByCourseIdAsync(course2Id).Result;

            course.Should().NotBeNull();
        }

        [TestMethod]
        public void ShouldAdd()
        {
        }

        [TestMethod]
        public void ShouldChange()
        {
        }

        [TestMethod]
        public void ShouldDelete()
        {
        }

        private IEnumerable<Course> GetExampleCourses()
        {
            return new List<Course>
            {
                new Course
                {
                    ID = 1,
                    CourseId = "course1",
                    Name = "exampleCourse1",
                    Owner = "owner1",
                    Questions = new List<Question>
                    {
                        new Question
                        {
                            QuestionId = "question1",
                            QuestionPhrase = "What color is the sky?",
                            Answer = "Blue"
                        }
                    }
                },
                GetExampleCourse()
            };
        }
        private Course GetExampleCourse()
        {
            return new Course
            {
                ID = 2,
                CourseId = course2Id,
                Name = "exampleCourse2",
                Owner = "owner2",
                Questions = new List<Question>
                {
                    new Question
                    {
                        QuestionId = "question2",
                        QuestionPhrase = "Is the earth flat?",
                        Answer = "No"
                    }
                }
            };
        }
    }
}
