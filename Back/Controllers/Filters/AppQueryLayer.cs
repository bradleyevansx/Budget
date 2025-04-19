using System.Text.Json.Serialization;

namespace Back.Controllers.Filters;

public class AppQueryLayer : IAppQuery
{
    public Operator Operator { get; set; } = Operator.And;
    public List<IAppQuery> Children { get; set; } = new();
}