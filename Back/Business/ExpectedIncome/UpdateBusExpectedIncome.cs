using Back.Repositories.ExpectedIncome;

namespace Back.Business.ExpectedIncome;

public class UpdateBusExpectedIncome : IUpdateBusEntity
{
    public int Id { get; set; }
    public int? UserId { get; set; } = null;
    public string? Name { get; set; } = null;
    public decimal? Amount { get; set; }  = null;
    public DateTime? Date { get; set; } = null;

    public UpdateDbExpectedIncome ToDb()
    {
        var res = new UpdateDbExpectedIncome();
        res.UserId = UserId;
        res.Name = Name;
        res.Amount = Amount;
        res.Date = Date;
        return res;
    }
}