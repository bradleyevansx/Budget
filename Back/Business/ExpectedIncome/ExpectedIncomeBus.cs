using Back.Controllers;
using Back.Repositories.Allocations;

namespace Back.Business.Allocations;

public class AllocationBus : IBusiness<BusAllocation, NewBusAllocation, UpdateBusAllocation>
{
    private readonly AllocationRepository _repository;

    public AllocationBus(AllocationRepository repository)
    {   
        _repository = repository;
    }
    
    public async Task<BusAllocation> CreateAsync(NewBusAllocation entity)
    {
        var db = entity.ToDb();
        var res = await _repository.CreateAsync(db);
        return res.ToBus();
    }

    public async Task<List<BusAllocation>> GetWhereAsync(IBusQuery? query, Pagination? pagination)
    {
        var dbQuery = DbQueryBuilder.BuildPredicate<DbAllocation>(query);
        var res = await _repository.GetWhereAsync(dbQuery, pagination);
        return res.Select(x => x.ToBus()).ToList();
    }

    public async Task<BusAllocation?> UpdateAsync(UpdateBusAllocation entity)
    {
        var now = DateTime.Now;
        var db = entity.ToDb();
        var id = entity.Id;
        var res = await _repository.UpdateAsync(id, db);
        return res.ToBus();
    }

    public async Task<BusAllocation?> DeleteByIdAsync(int id)
    {
        var res = await _repository.DeleteByIdAsync(id);
        if (res == null) return null;
        return res.ToBus();
    }
}