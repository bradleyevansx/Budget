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
    public int? AllocationId { get; set; } = null;
}