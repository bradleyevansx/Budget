using Back.Business.ExpectedIncome;
using Back.Data;

namespace Back.Repositories.ExpectedIncome;

public class ExpectedIncomeRepository(AppDbContext context) : BaseRepository<DbExpectedIncome, BusExpectedIncome, UpdateDbExpectedIncome>(context);