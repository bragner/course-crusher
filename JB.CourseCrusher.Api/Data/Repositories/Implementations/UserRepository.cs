using JB.CourseCrusher.Api.Data.Entities;
using JB.CourseCrusher.Api.Data.Repositories.Interfaces;
using System;

namespace JB.CourseCrusher.Api.Data.Repositories.Implementations
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(CourseCrusherContext context) : base(context)
        {
            var random = new Random();
            context.Users.Add(new User
            {
                ID = random.Next(1, 100),
                Name = "User Name"
            });
            context.SaveChanges();
        }
    }
}
