using System.Linq.Expressions;

namespace Back.Controllers;

public class BusQueryLayer<T> : IBusQuery<T>
{
    public Operator Operator { get; set; } = Operator.And;
    public List<IBusQuery<T>> Children { get; set; } = new();
    public Expression<Func<T, bool>> ToDb()
    {
        throw new NotImplementedException();
    }
}