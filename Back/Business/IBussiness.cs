using System.Linq.Expressions;
using Back.Business.Transactions;

namespace Back.Business;

public interface IBusiness<T, TN, TQ, TU> where T : class, IBusEntity where TN : class, INewBusEntity where TQ : class, IQueryBusEntity where TU : class, IUpdateBusEntity
{
    public Task<T> CreateAsync(TN entity);

    public Task<List<T>> GetWhereAsync(TQ predicate, Pagination pagination);

    public Task<T?> UpdateAsync(TU entity);

    public Task<T?> DeleteByIdAsync(int id);
}