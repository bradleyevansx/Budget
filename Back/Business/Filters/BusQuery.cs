using System.Linq.Expressions;

namespace Back.Controllers;

public class BusQuery<T> : IBusQuery<T>
{
    public Comparator Comparator { get; set; }
    
    public PropertyType PropertyType { get; set; }
    public string PropertyName { get; set; }
    
    public object Value { get; set; }
    public Expression<Func<T, bool>> ToDb()
    {
        throw new NotImplementedException();
    }
}