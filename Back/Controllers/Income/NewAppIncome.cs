using Back.Business.Transactions;

namespace Back.Controllers.Transactions;

public class NewAppIncome 
{
    public decimal Price { get; set; }
    public string Location { get; set; } = string.Empty; 
    public DateTime Date { get; set; }
    public int? AllocationId { get; set; } = null;

    public NewBusTransaction ToBus()
    {
        var res = new NewBusTransaction();
        res.AllocationId = AllocationId;
        res.Price = Price;
        res.Location = Location;
        res.Date = Date;
        return res;
    }
}