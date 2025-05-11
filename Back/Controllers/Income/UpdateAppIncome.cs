using Back.Business.Transactions;

namespace Back.Controllers.Transactions;

public class UpdateAppIncome
{
    public int Id { get; set; }
    public string? Title { get; set; } = null;
    public decimal? Amount { get; set; } = null;
    public DateTime? Date { get; set; } = null;
    public int? ExpectedIncomeId { get; set; } = null;

    public UpdateBusIncome ToBus()
    {
        var res = new UpdateBusIncome();
        res.ExpectedIncomeId = ExpectedIncomeId;
        res.Id = Id;
        res.Amount = Amount;
        res.Date = Date;
        return res;
    }
}