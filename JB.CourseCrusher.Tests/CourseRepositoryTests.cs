using FluentAssertions;
using JB.CourseCrusher.Api.Data.Entities;
using JB.CourseCrusher.Api.Data.Implementations;
using JB.CourseCrusher.Api.Data.Repositories.Interfaces;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;

namespace JB.CourseCrusher.Tests
{
    [TestClass]
    public class CourseRepositoryTests
    {
        private Mock<ICourseRepository> mockCourseRepository;

        [TestInitialize]
        public void Initialize()
        {
            this.mockCourseRepository = new Mock<ICourseRepository>();
        }

        [TestMethod]
        public void ShouldReceive()
        {
            // arrange
            var course = new Course { ID = 1, Name = "Test" };
            mockCourseRepository.Setup(r => r.ReadAll()).Returns(new List<Course> { course });

            // act
            var allCourses = mockCourseRepository.Object.ReadAll();

            // assert
            allCourses.Should().Contain(course);
        }
    }
}
