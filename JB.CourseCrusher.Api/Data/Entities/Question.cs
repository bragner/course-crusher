using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JB.CourseCrusher.Api.Data.Entities
{
    public class Question : BaseEntity
    {
        public string QuestionId { get; set; }
        public string QuestionPhrase { get; set; }
        public bool IsMultipleChoice { get; set; }
        public string Image { get; set; }
        public Course Course { get; set; }
        public List<Answer> Answers { get; set; }
    }
}
