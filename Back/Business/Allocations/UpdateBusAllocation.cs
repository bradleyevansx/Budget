using Back.Repositories.Allocations;

namespace Back.Business.Allocations;

public class UpdateBusAllocation : IUpdateBusEntity
{
    public int Id { get; set; }
    public string? Name { get; set; } = null;
    public decimal? Amount { get; set; }  = null;
    public DateTime? Date { get; set; } = null;

    public UpdateDbAllocation ToDb()
    {
        var res = new UpdateDbAllocation();
        res.Name = Name;
        res.Amount = Amount;
        res.Date = Date;
        return res;
    }
}