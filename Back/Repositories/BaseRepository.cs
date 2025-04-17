using System.Linq.Expressions;
using Back.Business;
using Back.Data;
using Back.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Back.Repositories;

public abstract class BaseRepository<T, TO, TU> : IRepository<T, TO, TU> where T : class, IEntity<TO> where TO : class, IBusEntity where TU : class, IUpdateEntity
{
    private readonly AppDbContext _context;
    private readonly DbSet<T> _dbSet;

    public BaseRepository(AppDbContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>(); 
    }
    
    // <summary>
    // Creates entities.
    // </summary>
    // <param name="entity">
    // Entity you are creating.
    // </param>
    // <returns>
    // Newly created database entity.
    // </returns>
    public async Task<T> CreateAsync(T entity)
    {
        var res = await _dbSet.AddAsync(entity);

        await _context.SaveChangesAsync();
        
        return res.Entity;
    }
    
    // <summary>
    // Gets entities by predicate.
    // </summary>
    // <param name="predicate">
    // Predicate for the entities you would like to query for.
    // </param>
    // <returns>
    // A List of the entities matching the predicate.
    // </returns>
    public async Task<List<T>> GetWhereAsync(Expression<Func<T, bool>> predicate, Pagination? pagination)
    {
        var response = await _dbSet.Where(predicate).ToListAsync();
        
        return response;
    }

    // <summary>
    // Updates entities by id.
    // </summary>
    // <param name="id">
    // The id of the entity to be deleted.
    // </param>
    // <param name="entity">
    // The updated entity as a whole.
    // </param>
    // <returns>
    // Null or the updated entity.
    // </returns>
    public async Task<T?> UpdateAsync(int id, TU entity)
    {
        var existingEntity = await _dbSet.FirstOrDefaultAsync(x => x.Id == id);
        if (existingEntity == null)
            return null;

        _context.Entry(existingEntity).CurrentValues.SetValues(entity);
        await _context.SaveChangesAsync();

        return existingEntity;
    }

    // <summary>
    // Deleted entities by id.
    // </summary>
    // <param name="id">
    // The id of the entity to be deleted.
    // </param>
    // <returns>
    // Null or the deleted entity.
    // </returns>
    public async Task<T?> DeleteByIdAsync(int id)
    {
        var entity = await _dbSet.FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null) return null;
        
        _dbSet.Remove(entity);
        await _context.SaveChangesAsync();
        return entity;
    }
}