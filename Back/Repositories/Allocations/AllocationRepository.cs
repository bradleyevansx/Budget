using Back.Business.Allocations;
using Back.Data;

namespace Back.Repositories.Allocations;

public class AllocationRepository(AppDbContext context) : BaseRepository<DbAllocation, BusAllocation, UpdateDbAllocation>(context);