using System.Text.Json.Serialization;

namespace Back.Controllers.Filters;
public class AppQuery : IAppQuery
{
    public Comparator Comparator { get; set; }
    
    public string PropertyName { get; set; }
    
    public object Value { get; set; }
}