using Back.Business.ExpectedIncome;

namespace Back.Controllers.ExpectedIncome;

public class NewAppExpectedIncome
{
    public decimal Amount { get; set; }
    public string Name { get; set; }
    public DateTime Date { get; set; }

    public NewBusExpectedIncome ToBus()
    {
        var res = new NewBusExpectedIncome();
        res.Name = Name;
        res.Date = Date;
        res.Amount = Amount;
        return res;
    }
}