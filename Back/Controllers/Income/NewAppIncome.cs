using Back.Business.Income;
using Back.Business.Transactions;

namespace Back.Controllers.Income;

public class NewAppIncome 
{
    public string Title { get; set; }
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
    public int ExpectedIncomeId { get; set; }

    public NewBusIncome ToBus()
    {
        var res = new NewBusIncome();
        res.Title = Title;
        res.ExpectedIncomeId = ExpectedIncomeId;
        res.Amount = Amount;
        res.Date = Date;
        return res;
    }
}