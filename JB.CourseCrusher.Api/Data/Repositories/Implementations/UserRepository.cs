using JB.CourseCrusher.Api.Data.Entities;
using JB.CourseCrusher.Api.Data.Repositories.Interfaces;
using System;

namespace JB.CourseCrusher.Api.Data.Repositories.Implementations
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(CourseCrusherContext context) : base(context)
        {
        }
    }
}
