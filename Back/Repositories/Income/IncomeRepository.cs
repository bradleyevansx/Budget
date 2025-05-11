using Back.Business.Income;
using Back.Data;
using Back.Models;
using Back.Repositories.Transactions;

namespace Back.Repositories.Income;

public class IncomeRepository(AppDbContext context) : BaseRepository<DbIncome, BusIncome, UpdateDbIncome>(context);