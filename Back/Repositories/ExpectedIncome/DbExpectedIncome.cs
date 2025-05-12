using Back.Business.Allocations;
using Back.Business.ExpectedIncome;
using Back.Repositories.Interfaces;
using Back.Repositories.Users;

namespace Back.Repositories.ExpectedIncome;

public class DbExpectedIncome : IEntity<BusExpectedIncome>
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public DbUser User { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public decimal Amount { get; set; }
    
    public BusExpectedIncome ToBus() {
        var res = new BusExpectedIncome();
        res.UserId = UserId;
        res.Id = Id;
        res.Name = Name;
        res.Date = Date;
        res.Amount = Amount;
        return res;
    }
}