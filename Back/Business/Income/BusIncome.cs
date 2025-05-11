using Back.Controllers.Transactions;
using Back.Models;

namespace Back.Business.Transactions;

public class BusTransaction : IBusEntity
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public decimal Price { get; set; }
    public string Location { get; set; } = string.Empty; 
    public DateTime Date { get; set; }
    public int? AllocationId { get; set; } = null;

    public AppTransaction ToApp()
    {
        var res = new AppTransaction();
        res.AllocationId = AllocationId;
        res.Id = Id;
        res.UserId = UserId;
        res.Price = Price;
        res.Location = Location;
        res.Date = Date;
        return res;
    }
}