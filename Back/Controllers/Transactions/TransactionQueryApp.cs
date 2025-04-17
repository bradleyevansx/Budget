using Back.Business;
using Back.Business.Transactions;

namespace Back.Controllers.Transactions;

public class TransactionQueryApp
{
    public int? Id { get; set; } = null;
    public int? UserId { get; set; } = null;
    public decimal? Price { get; set; } = null;
    public string? Location { get; set; } = null;
    public DateTime? Date { get; set; } = null;
    public int? Page { get; set; } = null;
    public int? PageSize { get; set; } = null;

    public TransactionQueryBus ToBus()
    {
        var res = new TransactionQueryBus();
        res.Id = Id;
        res.UserId = UserId;
        res.Price = Price;
        res.Location = Location;
        res.Date = Date;
        return res;
    }

    public Pagination? ToPage()
    {
        if (Page == null) return null;
        if (PageSize == null) return null;
        var res = new Pagination();
        res.Page = Page;
        res.PageSize = PageSize;
        return res;
    }
}