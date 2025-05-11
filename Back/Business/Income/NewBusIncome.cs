using Back.Models;

namespace Back.Business.Transactions;

public class NewBusIncome : INewBusEntity
{ 
    public decimal Price { get; set; }
    public string Location { get; set; } = string.Empty; 
    public DateTime Date { get; set; }
    public int? AllocationId { get; set; } = null;

    public DbTransaction ToDb(int userId)
    {
        var response = new DbTransaction();
        response.AllocationId = AllocationId;
        response.UserId = userId;
        response.Price = this.Price;
        response.Location = this.Location;
        response.Date = this.Date;
        return response;
    }
}