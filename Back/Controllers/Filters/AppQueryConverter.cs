using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;
using Back.Controllers;
using Back.Controllers.Filters;

public class AppQueryConverter : JsonConverter<IAppQuery>
{
    public override IAppQuery? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        using var doc = JsonDocument.ParseValue(ref reader);
        var root = doc.RootElement;

        // Check if the root contains "children", which means it's a layer query
        if (root.TryGetProperty("children", out _))
        {
            var layer = new AppQueryLayer
            {
                Operator = root.TryGetProperty("operator", out var op) 
                    ? (Operator)op.GetInt32() 
                    : Operator.And
            };

            // Deserialize children recursively
            foreach (var child in root.GetProperty("children").EnumerateArray())
            {
                var json = child.GetRawText();
                var parsedChild = JsonSerializer.Deserialize<IAppQuery>(json, options);
                if (parsedChild != null)
                    layer.Children.Add(parsedChild);
            }

            return layer;
        }

        return new AppQuery
        {
            PropertyName = root.GetProperty("propertyName").GetString()!,
            Comparator = (Comparator)root.GetProperty("comparator").GetInt32(),
            Value = ExtractValue(root.GetProperty("value")),
        };
    }
    
    

    public override void Write(Utf8JsonWriter writer, IAppQuery value, JsonSerializerOptions options)
    {
        // Handle serialization of both AppQuery and AppQueryLayer
        if (value is AppQuery query)
        {
            JsonSerializer.Serialize(writer, query, options);
        }
        else if (value is AppQueryLayer layer)
        {
            JsonSerializer.Serialize(writer, layer, options);
        }
        else
        {
            throw new JsonException($"Unknown IAppQuery implementation: {value.GetType()}");
        }
    }

    // Extracts the value from JsonElement based on the type
    private object? ExtractValue(JsonElement element)
    {
        return element.ValueKind switch
        {
            JsonValueKind.String => element.GetString(),
            JsonValueKind.Number when element.TryGetInt64(out var l) => l,
            JsonValueKind.Number when element.TryGetDouble(out var d) => d,
            JsonValueKind.True => true,
            JsonValueKind.False => false,
            JsonValueKind.Null => null,
            _ => throw new JsonException("Unsupported value kind: " + element.ValueKind)
        };
    }
}
