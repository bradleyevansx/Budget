using Back.Controllers.Allocations;
using Back.Controllers.ExpectedIncome;

namespace Back.Business.ExpectedIncome;

public class BusExpectedIncome : IBusEntity
{
     public int Id { get; set; }
     public int UserId { get; set; }
     public string Name { get; set; } = string.Empty;
     public DateTime Date { get; set; }
     public decimal Amount { get; set; }

     public AppExpectedIncome ToApp()
     {
          var res = new AppExpectedIncome();
          res.UserId = UserId;
          res.Id = Id;
          res.Name = Name;
          res.Date = Date;
          res.Amount = Amount;
          return res;
     }
}