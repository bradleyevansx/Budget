using System.Linq.Expressions;

namespace Back.Controllers;

public class BusQuery : IBusQuery
{
    public Comparator Comparator { get; set; }
    
    public BusPropertyType PropertyType { get; set; }
    public string PropertyName { get; set; }
    
    public object Value { get; set; }
   
}