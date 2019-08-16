using System.Collections.Generic;

namespace JB.CourseCrusher.Api.Models
{
    public class CourseModel
    {
        public string CourseId { get; set; }
        public string Name { get; set; }
        public string Owner { get; set; }
        public ICollection<QuestionModel> Questions { get; set; }
    }
}
