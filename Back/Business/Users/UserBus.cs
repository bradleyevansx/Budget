using Back.Business.Transactions;
using Back.Controllers;
using Back.Repositories.Users;
using Back.SDK;

namespace Back.Business.Users;

public class UserBus
{
    private readonly UserDetailsService _userDetailsService;
    private readonly UserRepository _userRepository;
    
    public UserBus(UserDetailsService userDetailsService, UserRepository userRepository)
    {
        _userDetailsService = userDetailsService;
        _userRepository = userRepository;
    }
    
    public async Task<BusUser> CreateAsync(NewBusUser entity)
    {
        var userId = _userDetailsService.GetUserId();
        var dbTransaction = entity.ToDb();

        var res = await _userRepository.CreateAsync(dbTransaction);

        return res.ToBus();
    }
    
    public async Task<List<BusUser>> GetWhereAsync(IBusQuery? query, Pagination? pagination)
    {
        var dbQuery = DbQueryBuilder.BuildPredicate<DbUser>(query);
        var res = await _userRepository.GetWhereAsync(dbQuery, pagination);
        return res.Select(x => x.ToBus()).ToList();
    }

    public async Task<BusUser?> UpdateAsync(UpdateBusUser entity)
    {
        var dbQuery = entity.ToDb();
        var id = entity.Id;
        if (entity.Password != null)
        {
            var newPasswordHash = BCrypt.Net.BCrypt.HashPassword(entity.Password);
            dbQuery.PasswordHash = newPasswordHash;
        }

        var res = await _userRepository.UpdateAsync(id, dbQuery);
        
        if (res == null) return null;

        return res.ToBus();
    }
    
    public async Task<BusUser?> DeleteByIdAsync(int id)
    {
        var res = await _userRepository.DeleteByIdAsync(id);
       
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