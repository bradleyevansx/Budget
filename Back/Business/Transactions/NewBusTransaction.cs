using Back.Models;

namespace Back.Business.Transactions;

public class NewBusTransaction : INewBusEntity
{ 
    public decimal Price { get; set; }
    public string Location { get; set; } = string.Empty; 
    public DateTime Date { get; set; }

    public DbTransaction ToDb(int userId)
    {
        var response = new DbTransaction();
        response.UserId = userId;
        response.Price = this.Price;
        response.Location = this.Location;
        response.Date = this.Date;
        return response;
    }
}