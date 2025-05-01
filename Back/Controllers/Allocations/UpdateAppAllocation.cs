using Back.Business.Allocations;

namespace Back.Controllers.Allocations;

public class UpdateAppAllocation
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public decimal? Amount { get; set; }
    public DateTime Date { get; set; }

    public UpdateBusAllocation ToBus()
    {
        var res = new UpdateBusAllocation();
        res.Id = Id;
        res.Name = Name;
        res.Amount = Amount;
        res.Date = Date;
        return res;
    }
}