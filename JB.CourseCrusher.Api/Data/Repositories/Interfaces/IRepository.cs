using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace JB.CourseCrusher.Api.Data.Repositories.Interfaces
{
    public interface IRepository<T>
    {
        void Create(T enitity);
        IEnumerable<T> Read(Expression<Func<T, bool>> expression);
        IEnumerable<T> ReadAll();
        void Update(T enitity);
        void Delete(T enitity);

    }
}