using System.Linq.Expressions;
using Back.Business.Users;
using Back.Repositories.Transactions;
using Back.Repositories.Users;
using Back.SDK;

namespace Back.Business.Transactions;

public class TransactionBus : IBusiness<Transaction, NewBusTransaction, TransactionQueryBus, UpdateBusTransaction>
{
    private readonly TransactionRepository _transactionRepository;
    private readonly UserDetailsService _userDetailsService;
    private readonly UserRepository _userRepository;
    
    public TransactionBus(TransactionRepository transactionRepository, UserDetailsService userDetailsService, UserRepository userRepository)
    {
        _transactionRepository = transactionRepository;
        _userDetailsService = userDetailsService;
        _userRepository = userRepository;
    }
    
    public async Task<Transaction> CreateAsync(NewBusTransaction entity)
    {
        var userId = _userDetailsService.GetUserId();
        var dbTransaction = entity.ToDb(userId);

        var res = await _transactionRepository.CreateAsync(dbTransaction);

        return res.ToBus();
    }
    
    public async Task<List<Transaction>> GetWhereAsync(TransactionQueryBus query, Pagination? pagination)
    {
        var dbQuery = query.ToDb();
        var res = await _transactionRepository.GetWhereAsync(dbQuery, pagination);
        return res.Select(x => x.ToBus()).ToList();
    }

    public async Task<Transaction?> UpdateAsync(UpdateBusTransaction entity)
    {
        if (entity.UserId != null && !(await UserExists(entity.UserId.Value)))
        {
            return null;
        }
       
        var dbQuery = entity.ToDb();
        var id = entity.Id;

        var res = await _transactionRepository.UpdateAsync(id, dbQuery);
        
        if (res == null) return null;

        return res.ToBus();
    }
    
   public async Task<Transaction?> DeleteByIdAsync(int id)
   {
       var res = await _transactionRepository.DeleteByIdAsync(id);
       
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