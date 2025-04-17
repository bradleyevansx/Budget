using Back.Repositories.Transactions;

namespace Back.Business.Transactions;

public class UpdateBusTransaction : IUpdateBusEntity
{
    public int Id { get; set; }
    public int? UserId { get; set; } = null;
    public decimal? Price { get; set; } = null;
    public string? Location { get; set; } = null;
    public DateTime? Date { get; set; } = null;

    public UpdateDbTransaction ToDb()
    {
        var res = new UpdateDbTransaction();
        
        res.UserId = UserId;
        res.Price = Price;
        res.Location = Location;
        res.Date = Date;
        return res;
    }
}