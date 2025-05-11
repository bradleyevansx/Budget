using Back.Repositories.Interfaces;

namespace Back.Repositories.Income;

public class UpdateDbIncome : IUpdateEntity
{
    public string? Title { get; set; } = null;
    public DateTime? Date { get; set; } = null;
    
    public decimal? Amount { get; set; } = null;
    
    public int? ExpectedIncomeId { get; set; } = null;
}