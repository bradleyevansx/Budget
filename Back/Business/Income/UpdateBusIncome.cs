using Back.Repositories.Income;
using Back.Repositories.Transactions;

namespace Back.Business.Transactions;

public class UpdateBusIncome : IUpdateBusEntity
{
    public int Id { get; set; }
    public string? Title { get; set; } = null;
    public decimal? Amount { get; set; } = null;
    public DateTime? Date { get; set; } = null;
    public int? ExpectedIncomeId { get; set; } = null;

    public UpdateDbIncome ToDb()
    {
        var res = new UpdateDbIncome();
        res.ExpectedIncomeId = ExpectedIncomeId;
        res.Title = Title;
        res.Amount = Amount;
        res.Date = Date;
        return res;
    }
}