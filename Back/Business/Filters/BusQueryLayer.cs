using System.Linq.Expressions;

namespace Back.Controllers;

public class BusQueryLayer : IBusQuery
{
    public Operator Operator { get; set; } = Operator.And;
    public List<IBusQuery> Children { get; set; } = new();
    
    
}