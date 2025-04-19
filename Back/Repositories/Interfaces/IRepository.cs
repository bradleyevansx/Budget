using System.Linq.Expressions;
using Back.Business;
using Back.Models;

namespace Back.Repositories.Interfaces;

public interface IRepository<T, TO, TU> where T : class, IEntity<TO> where TO : IBusEntity where TU : class, IUpdateEntity
{
    public Task<T> CreateAsync(T entity);

    public Task<List<T>> GetWhereAsync(Expression<Func<T, bool>> predicate, Pagination? pagination);

    public Task<T?> UpdateAsync(int id, TU entity);

    public Task<T?> DeleteByIdAsync(int id);
    public Task<List<DbTransaction>?> Test();
}