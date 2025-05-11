using Back.Repositories.ExpectedIncome;

namespace Back.Business.ExpectedIncome;

public class NewBusExpectedIncome : INewBusEntity
{
    public string Name { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public decimal Amount { get; set; }

    public DbExpectedIncome ToDb()
    {
        var res = new DbExpectedIncome();
        res.Name = Name;
        res.Date = Date;
        res.Amount = Amount;
        return res;
    }
}