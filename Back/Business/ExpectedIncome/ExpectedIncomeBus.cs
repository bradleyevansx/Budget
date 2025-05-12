using Back.Business.Allocations;
using Back.Controllers;
using Back.Repositories.Allocations;
using Back.Repositories.ExpectedIncome;
using Back.SDK;

namespace Back.Business.ExpectedIncome;

public class ExpectedIncomeBus : IBusiness<BusExpectedIncome, NewBusExpectedIncome, UpdateBusExpectedIncome>
{
    private readonly ExpectedIncomeRepository _repository;
    private readonly UserDetailsService _userDetailsService;

    public ExpectedIncomeBus(ExpectedIncomeRepository repository, UserDetailsService userDetailsService)
    {   
        _repository = repository;
        _userDetailsService = userDetailsService;
    }
    
    public async Task<BusExpectedIncome> CreateAsync(NewBusExpectedIncome entity)
    {
        var userId = _userDetailsService.GetUserId();
        var db = entity.ToDb(userId);
        var res = await _repository.CreateAsync(db);
        return res.ToBus();
    }

    public async Task<List<BusExpectedIncome>> GetWhereAsync(IBusQuery? query, Pagination? pagination)
    {
        var role = _userDetailsService.GetRole();
        if (role != "Lover" && query is BusQueryLayer busQuery)
        {
            var newQuery = new BusQuery
            {
                PropertyName = "UserId",
                PropertyType = BusPropertyType.Number,
                Comparator = Comparator.DoesNotEqual,
                Value = 4
            };
    
            busQuery.Children.Add(newQuery);
        }

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