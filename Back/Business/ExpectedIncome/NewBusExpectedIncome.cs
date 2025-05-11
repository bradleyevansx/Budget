using Back.Repositories.Allocations;

namespace Back.Business.Allocations;

public class NewBusExpectedIncome : INewBusEntity
{
    public string Name { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public decimal Amount { get; set; }

    public DbAllocation ToDb()
    {
        var res = new DbAllocation();
        res.Name = Name;
        res.Date = Date;
        res.Amount = Amount;
        return res;
    }
}