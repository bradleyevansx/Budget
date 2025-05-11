using Back.Repositories.Interfaces;

namespace Back.Repositories.Transactions;

public class UpdateDbIncome : IUpdateEntity
{
    public int? UserId { get; set; } = null;
    public decimal? Price { get; set; } = null;
    public string? Location { get; set; } = null;
    public DateTime? Date { get; set; } = null;
    
    public int? AllocationId { get; set; } = null;
}