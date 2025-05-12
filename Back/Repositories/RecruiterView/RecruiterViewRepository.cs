using Back.Business.Users;
using Back.Data;
using Back.Repositories.Users;
using Microsoft.EntityFrameworkCore;

namespace Back.Repositories.RecruiterView;

public class RecruiterViewRepository
{
    private readonly AppDbContext _context;
    private readonly DbSet<DbRecruiterView> _dbSet;

    public RecruiterViewRepository(AppDbContext context)
    {
        _context = context;
        _dbSet = _context.Set<DbRecruiterView>(); 
    }
    public async Task<DbRecruiterView> CreateAsync(DbRecruiterView entity)
    {
        var res = await _dbSet.AddAsync(entity);

        await _context.SaveChangesAsync();
        
        return res.Entity;
    }
}
