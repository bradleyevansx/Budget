using Back.Business.Allocations;
using Back.Data;

namespace Back.Repositories.Allocations;

public class ExpectedIncome(AppDbContext context) : BaseRepository<DbAllocation, BusAllocation, UpdateDbAllocation>(context);