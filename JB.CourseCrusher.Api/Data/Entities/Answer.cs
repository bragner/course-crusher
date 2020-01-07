using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JB.CourseCrusher.Api.Data.Entities
{
    public class Answer : BaseEntity
    {
        public string AnswerId { get; set; }
        public string AnswerPhrase { get; set; }
        public bool IsCorrect { get; set; }
        public Question Question { get; set; }
    }
}
