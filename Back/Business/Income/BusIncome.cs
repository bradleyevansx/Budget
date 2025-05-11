using Back.Controllers.Income;

namespace Back.Business.Income;

public class BusIncome : IBusEntity
{
    public int Id { get; set; }
    public string Title { get; set; }
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
    public int ExpectedIncomeId { get; set; } 

    public AppIncome ToApp()
    {
        var res = new AppIncome();
        res.Title = Title;
        res.ExpectedIncomeId = ExpectedIncomeId;
        res.Id = Id;
        res.Amount = Amount;
        res.Date = Date;
        return res;
    }
}