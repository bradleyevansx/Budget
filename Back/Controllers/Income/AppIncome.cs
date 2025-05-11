namespace Back.Controllers.Transactions;

public class AppTransaction
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public decimal Price { get; set; }
    public string Location { get; set; } = string.Empty; 
    public DateTime Date { get; set; }
    public int? AllocationId { get; set; } 
}