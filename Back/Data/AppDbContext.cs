using Back.Models;
using Back.Repositories.Allocations;
using Back.Repositories.ExpectedIncome;
using Back.Repositories.Income;
using Back.Repositories.RecruiterView;
using Back.Repositories.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Npgsql.NameTranslation;

namespace Back.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<DbUser> Users => Set<DbUser>();
    public DbSet<DbTransaction> Transactions => Set<DbTransaction>();
    public DbSet<DbAllocation> Allocations => Set<DbAllocation>();
    public DbSet<DbIncome> Incomes => Set<DbIncome>();
    public DbSet<DbExpectedIncome> ExpectedIncomes=> Set<DbExpectedIncome>();
    public DbSet<DbRecruiterView> RecruiterViews => Set<DbRecruiterView>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
       
        
        var mapper = new NpgsqlSnakeCaseNameTranslator();
        foreach (var entity in modelBuilder.Model.GetEntityTypes())
        {
           

            foreach (var property in entity.GetProperties())
            {
                var storeObjectIdentifier = StoreObjectIdentifier.Create(property.DeclaringEntityType, StoreObjectType.Table);
                if (storeObjectIdentifier.HasValue)
                {
                    property.SetColumnName(mapper.TranslateMemberName(property.GetColumnName(storeObjectIdentifier.Value)));
                }
            }
                    
            entity.SetTableName(mapper.TranslateTypeName(entity.GetTableName()));
        }

    }
}