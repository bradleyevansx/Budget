using Back.Business.Income;
using Back.Business.Transactions;
using Back.Repositories.ExpectedIncome;
using Back.Repositories.Interfaces;
using Back.Repositories.Users;

namespace Back.Repositories.Income;

public class DbIncome : IEntity<BusIncome>
{
    public int Id { get; set; }
    public string Title { get; set; }
    public int ExpectedIncomeId { get; set; }
    public DbExpectedIncome ExpectedIncome { get; set; }
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }    
    public BusIncome ToBus()
    {
        var res = new BusIncome();
        res.Title = Title;
        res.ExpectedIncomeId = ExpectedIncomeId;
        res.Date = Date;
        res.Amount = Amount;
        res.Id = Id;
        return res;
    }
}