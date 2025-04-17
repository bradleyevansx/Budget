using System.Linq.Expressions;
using Back.Business;
using Back.Business.Transactions;
using Back.Models;

public class TransactionQueryBus : IQueryBusEntity
{
    public int? Id { get; set; } = null;
    public int? UserId { get; set; } = null;
    public decimal? Price { get; set; } = null;
    public string? Location { get; set; } = null;
    public DateTime? Date { get; set; } = null;

    public Expression<Func<DbTransaction, bool>> ToDb()
    {
        if (Id is not null)
        {
            Console.Write("Adding Id to query: ");
            Console.Write(Id.ToString());
            return x => x.Id == Id;
        }

        if (UserId is not null)
        {
            Console.Write("Adding UserId to query: ");
            Console.Write(UserId.ToString());
            return x => x.UserId == UserId;   
        }

        if (Price is not null)
        {
            Console.Write("Adding Price to query: ");
            Console.Write(Price.ToString());
            return x => x.Price == Price;
        }

        if (Location is not null)
        {
            Console.Write("Adding Location to query: ");
            Console.Write(Location);
            return x => x.Location == Location;
        }

        if (Date is not null)
        {
            Console.Write("Adding Date to query: ");
            Console.Write(Date.ToString());
            return x => x.Date == Date;
        }

        return x => true;
    }
}