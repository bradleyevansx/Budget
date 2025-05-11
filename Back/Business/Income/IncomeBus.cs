using Back.Business.Transactions;
using Back.Controllers;
using Back.Models;
using Back.Repositories.Income;
using Back.Repositories.Users;
using Back.SDK;

namespace Back.Business.Income;

public class IncomeBus : IBusiness<BusIncome, NewBusIncome, UpdateBusIncome>
{
    private readonly IncomeRepository _incomeRepository;
    private readonly UserDetailsService _userDetailsService;
    private readonly UserRepository _userRepository;
    
    public IncomeBus(IncomeRepository incomeRepository, UserDetailsService userDetailsService, UserRepository userRepository)
    {
        _incomeRepository = incomeRepository;
        _userDetailsService = userDetailsService;
        _userRepository = userRepository;
    }
    
    public async Task<BusIncome> CreateAsync(NewBusIncome entity)
    {
        var dbIncome = entity.ToDb();

        var res = await _incomeRepository.CreateAsync(dbIncome);

        return res.ToBus();
    }
    
    public async Task<List<BusIncome>> GetWhereAsync(IBusQuery? query, Pagination? pagination)
    {
        var dbQuery = DbQueryBuilder.BuildPredicate<DbIncome>(query);
        var res = await _incomeRepository.GetWhereAsync(dbQuery, pagination);
        return res.Select(x => x.ToBus()).ToList();
    }

    public async Task<BusIncome?> UpdateAsync(UpdateBusIncome entity)
    {
        var dbQuery = entity.ToDb();
        var id = entity.Id;

        var res = await _incomeRepository.UpdateAsync(id, dbQuery);
        
        if (res == null) return null;

        return res.ToBus();
    }
    
    public async Task<BusIncome?> DeleteByIdAsync(int id)
    {
        var res = await _incomeRepository.DeleteByIdAsync(id);
       
        if (res == null)
        {
            return null;
        }

        return res.ToBus();
    }

    public async Task<bool> UserExists(int userId)
    {
        var res = await _userRepository.GetWhereAsync(x => x.Id == userId, null);
        return res.Count != 0;
    }
}