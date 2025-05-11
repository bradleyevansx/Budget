using Back.Repositories.Income;

namespace Back.Business.Income;

public class NewBusIncome : INewBusEntity
{ 
    public string Title { get; set; }
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
    public int ExpectedIncomeId { get; set; }

    public DbIncome ToDb()
    {
        var response = new DbIncome();
        response.ExpectedIncomeId = ExpectedIncomeId;
        response.Title = Title;
        response.Amount = this.Amount;
        response.Date = this.Date;
        return response;
    }
}