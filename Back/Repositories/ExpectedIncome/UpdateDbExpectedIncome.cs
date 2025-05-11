using Back.Repositories.Interfaces;

namespace Back.Repositories.ExpectedIncome;

public class UpdateDbExpectedIncome : IUpdateEntity
{
    public string? Name { get; set; } = null;
    public DateTime? Date { get; set; } = null;
    public decimal? Amount { get; set; } = null;
}