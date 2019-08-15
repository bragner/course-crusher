using JB.CourseCrusher.Api.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace JB.CourseCrusher.Api.Data.Repositories.Implementations
{
    public abstract class Repository<T> : IRepository<T> where T : class
    {
        protected CourseCrusherContext _context;
        public Repository(CourseCrusherContext context)
        {
            _context = context;
        }

        public void Create(T enitity)
        {
            this._context.Set<T>().Add(enitity);
        }
        public IEnumerable<T> Read(Expression<Func<T, bool>> expression)
        {
            return _context.Set<T>().Where(expression).AsNoTracking();
        }
        public IEnumerable<T> ReadAll()
        {
            return _context.Set<T>().AsNoTracking();
        }
        public void Update(T enitity)
        {
            this._context.Set<T>().Update(enitity);
        }
        public void Delete(T enitity)
        {
            this._context.Set<T>().Remove(enitity);
        }
    }
}
