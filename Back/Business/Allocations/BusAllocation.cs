using Back.Controllers.Allocations;

namespace Back.Business.Allocations;

public class BusAllocation : IBusEntity
{
     public int Id { get; set; }
     public string Name { get; set; } = string.Empty;
     public DateTime Date { get; set; }
     public decimal Amount { get; set; }

     public AppAllocation ToApp()
     {
          var res = new AppAllocation();
          res.Id = Id;
          res.Name = Name;
          res.Date = Date;
          res.Amount = Amount;
          return res;
     }
}