using Back.Business;
using Back.Business.Transactions;
using Back.Controllers;
using Back.Repositories.Allocations;
using Back.Repositories.Interfaces;
using Back.Repositories.Users;

namespace Back.Models;

public class DbTransaction : IEntity<BusTransaction>
{
    public int Id { get; set; }

    public int? AllocationId { get; set; }
    public DbAllocation? Allocation { get; set; }

    public int UserId { get; set; }
    public DbUser User { get; set; }
    public decimal Price { get; set; }
    public string Location { get; set; } = string.Empty;
    public DateTime Date { get; set; }    
    public BusTransaction ToBus()
    {
        var res = new BusTransaction();
        res.AllocationId = AllocationId;
        res.Date = Date;
        res.Location = Location;
        res.Price = Price;
        res.UserId = UserId;
        res.Id = Id;
        return res;
    }
}