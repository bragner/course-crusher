using JB.CourseCrusher.Api.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace JB.CourseCrusher.Api.Data
{
    public class CourseCrusherContext : DbContext
    {
        private readonly IConfiguration _config;

        public CourseCrusherContext(DbContextOptions options, IConfiguration config) : base(options)
        {
            _config = config;
        }

        public DbSet<Course> Courses { get; set; }
        public DbSet<Question> Question { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_config.GetConnectionString("DbConnString"));
        }
    }
}
