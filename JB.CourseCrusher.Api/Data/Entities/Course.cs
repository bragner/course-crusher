using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JB.CourseCrusher.Api.Data.Entities
{
    public class Course : BaseEntity
    {
        public string CourseId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string Owner { get; set; }
        public ICollection<Question> Questions { get; set; }
    }
}
