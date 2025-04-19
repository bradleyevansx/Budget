using System.Text.Json.Serialization;

namespace Back.Controllers.Filters;

[JsonConverter(typeof(AppQueryConverter))]
public interface IAppQuery {}