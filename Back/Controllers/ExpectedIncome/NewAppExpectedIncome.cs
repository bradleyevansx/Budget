using Back.Business.Allocations;

namespace Back.Controllers.Allocations;

public class NewAPpExpectedIncome
{
    public decimal Amount { get; set; }
    public string Name { get; set; }
    public DateTime Date { get; set; }

    public NewBusAllocation ToBus()
    {
        var res = new NewBusAllocation();
        res.Name = Name;
        res.Date = Date;
        res.Amount = Amount;
        return res;
    }
}