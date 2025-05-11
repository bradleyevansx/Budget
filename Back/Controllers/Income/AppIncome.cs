
namespace Back.Controllers.Income;

public class AppIncome
{
    public int Id { get; set; }
    public string Title { get; set; }
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
    public int? ExpectedIncomeId { get; set; } 
}