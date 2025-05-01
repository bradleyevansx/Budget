using Back.Repositories.Interfaces;

namespace Back.Repositories.Allocations;

public class UpdateDbAllocation : IUpdateEntity
{
    public string? Name { get; set; } = null;
    public DateTime? Date { get; set; } = null;
    public decimal? Amount { get; set; } = null;
}