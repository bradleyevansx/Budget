namespace Back.Controllers.Allocations;

public class AppAllocation
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime Date { get; set; }
    public decimal Amount { get; set; }
}