using System.Linq.Expressions;
using Back.Business.Transactions;
using Back.Controllers;

namespace Back.Business;

public interface IBusiness<T, TN, TU> where T : class, IBusEntity where TN : class, INewBusEntity where TU : class, IUpdateBusEntity
{
    public Task<T> CreateAsync(TN entity);

    public Task<List<T>> GetWhereAsync(IBusQuery query, Pagination pagination);

    public Task<T?> UpdateAsync(TU entity);

    public Task<T?> DeleteByIdAsync(int id);
}