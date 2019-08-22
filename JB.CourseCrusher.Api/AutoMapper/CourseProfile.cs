using AutoMapper;
using JB.CourseCrusher.Api.Data.Entities;
using JB.CourseCrusher.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JB.CourseCrusher.Api.AutoMapper
{
    public class CourseProfile : Profile
    {
        public CourseProfile()
        {
            this.CreateMap<Course, CourseModel>()
                .ReverseMap();
            this.CreateMap<Question, QuestionModel>()
                .ReverseMap();
        }
        
    }
}
