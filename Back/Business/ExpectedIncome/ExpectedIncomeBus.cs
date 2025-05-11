using Back.Business.Allocations;
using Back.Controllers;
using Back.Repositories.Allocations;
using Back.Repositories.ExpectedIncome;

namespace Back.Business.ExpectedIncome;

public class ExpectedIncomeBus : IBusiness<BusExpectedIncome, NewBusExpectedIncome, UpdateBusExpectedIncome>
{
    private readonly ExpectedIncomeRepository _repository;

    public ExpectedIncomeBus(ExpectedIncomeRepository repository)
    {   
        _repository = repository;
    }
    
    public async Task<BusExpectedIncome> CreateAsync(NewBusExpectedIncome entity)
    {
        var db = entity.ToDb();
        var res = await _repository.CreateAsync(db);
        return res.ToBus();
    }

    public async Task<List<BusExpectedIncome>> GetWhereAsync(IBusQuery? query, Pagination? pagination)
    {
        var dbQuery = DbQueryBuilder.BuildPredicate<DbExpectedIncome>(query);
        var res = await _repository.GetWhereAsync(dbQuery, pagination);
        return res.Select(x => x.ToBus()).ToList();
    }

    public async Task<BusExpectedIncome?> UpdateAsync(UpdateBusExpectedIncome entity)
    {
        var now = DateTime.Now;
        var db = entity.ToDb();
        var id = entity.Id;
        var res = await _repository.UpdateAsync(id, db);
        return res.ToBus();
    }

    public async Task<BusExpectedIncome?> DeleteByIdAsync(int id)
    {
        var res = await _repository.DeleteByIdAsync(id);
        if (res == null) return null;
        return res.ToBus();
    }
}