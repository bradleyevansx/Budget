using System.Transactions;
using Back.Business.Transactions;
using Back.Data;
using Back.Models;

namespace Back.Repositories.Transactions;

public class IncomeRepository(AppDbContext context) : BaseRepository<DbTransaction, BusTransaction, UpdateDbTransaction>(context);