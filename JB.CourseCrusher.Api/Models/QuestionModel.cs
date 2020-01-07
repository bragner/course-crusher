using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JB.CourseCrusher.Api.Models
{
    public class QuestionModel
    {
        public string QuestionId { get; set; }
        [Required]
        public string QuestionPhrase { get; set; }
        [Required]
        public List<AnswerModel> Answers { get; set; }
        public bool IsMultipleChoice { get; set; }
        public string Image { get; set; }

    }
}