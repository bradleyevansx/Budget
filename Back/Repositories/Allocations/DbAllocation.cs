using Back.Business.Allocations;
using Back.Repositories.Interfaces;

namespace Back.Repositories.Allocations;

public class DbAllocation : IEntity<BusAllocation>
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public decimal Amount { get; set; }
    
    public BusAllocation ToBus() {
        var res = new BusAllocation();
        res.Id = Id;
        res.Name = Name;
        res.Date = Date;
        res.Amount = Amount;
        return res;
    }
}