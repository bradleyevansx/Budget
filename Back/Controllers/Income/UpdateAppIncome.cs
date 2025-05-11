using Back.Business.Transactions;

namespace Back.Controllers.Transactions;

public class UpdateAppIncome
{
    public int Id { get; set; }
    public int? UserId { get; set; } = null;
    public decimal? Price { get; set; } = null;
    public string? Location { get; set; } = null;
    public DateTime? Date { get; set; } = null;
    public int? AllocationId { get; set; } = null;

    public UpdateBusTransaction ToBus()
    {
        var res = new UpdateBusTransaction();
        res.AllocationId = AllocationId;
        res.Id = Id;
        res.UserId = UserId;
        res.Price = Price;
        res.Location = Location;
        res.Date = Date;
        return res;
    }
}