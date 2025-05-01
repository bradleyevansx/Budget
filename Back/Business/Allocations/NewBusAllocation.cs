namespace Back.Business.Allocations;

public class NewAllocation : INewBusEntity
{
    public string Name { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public decimal Amount { get; set; }
}