using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JB.CourseCrusher.Api.Models
{
    public class CourseModel
    {
        public string CourseId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public string Image { get; set; }
        public ICollection<QuestionModel> Questions { get; set; }
    }
}
