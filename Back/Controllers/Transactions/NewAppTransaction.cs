using Back.Business.Transactions;

namespace Back.Controllers.Transactions;

public class NewAppTransaction 
{
    public decimal Price { get; set; }
    public string Location { get; set; } = string.Empty; 
    public DateTime Date { get; set; }

    public NewBusTransaction ToBus()
    {
        var res = new NewBusTransaction();
        res.Price = Price;
        res.Location = Location;
        res.Date = Date;
        return res;
    }
}