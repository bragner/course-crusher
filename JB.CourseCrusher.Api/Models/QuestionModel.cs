using System.ComponentModel.DataAnnotations;

namespace JB.CourseCrusher.Api.Models
{
    public class QuestionModel
    {
        [Required]
        public string QuestionPhrase { get; set; }
        [Required]
        public string Answer { get; set; }

        public string QuestionId { get; set; }
    }
}