using Back.Business.Allocations;
using Back.Business.ExpectedIncome;

namespace Back.Controllers.Allocations;

public class UpdateAppExpectedIncome
{
    public int Id { get; set; }
    public int? UserId { get; set; }
    public string? Name { get; set; }
    public decimal? Amount { get; set; }
    public DateTime? Date { get; set; }

    public UpdateBusExpectedIncome ToBus()
    {
        var res = new UpdateBusExpectedIncome();
        res.Id = Id;
        res.Name = Name;
        res.Amount = Amount;
        res.Date = Date;
        return res;
    }
}