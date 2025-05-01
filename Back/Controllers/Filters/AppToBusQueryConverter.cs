using System.Text.Json;
using Back.Controllers;
using Back.Controllers.Filters;

public static class AppToBusQueryConverter
{
    public static IBusQuery ConvertToBusinessQuery<T>(IAppQuery appQuery)
    {
        if (appQuery is AppQuery simple)
        {
            var propInfo = typeof(T).GetProperty(ConvertCamelToPascal(simple.PropertyName))
                           ?? throw new InvalidOperationException($"Property '{simple.PropertyName}' not found on {typeof(T).Name}");

            var propType = Nullable.GetUnderlyingType(propInfo.PropertyType) ?? propInfo.PropertyType;

            var propertyType = GetPropertyType(propType);
            
           return new BusQuery()
            {
                PropertyName = simple.PropertyName,
                Comparator = simple.Comparator,
                Value = simple.Value,
                PropertyType = propertyType
            };
        }
        else if (appQuery is AppQueryLayer layer)
        {
            return new BusQueryLayer()
            {
                Operator = layer.Operator,
                Children = layer.Children
                    .Select(child => ConvertToBusinessQuery<T>(child))
                    .ToList()
            };
        }

        throw new NotSupportedException();
    }

    private static BusPropertyType GetPropertyType(Type type)
    {
        if (type == typeof(string)) return BusPropertyType.String;
        if (type == typeof(bool)) return BusPropertyType.Boolean;
        if (type == typeof(DateTime)) return BusPropertyType.DateTime;
        if (type.IsPrimitive || type == typeof(decimal)) return BusPropertyType.Number;

        throw new NotSupportedException($"Unsupported type {type.Name}");
    }
    
    private static string ConvertCamelToPascal(string camelCase)
    {
        if (string.IsNullOrEmpty(camelCase))
            return camelCase;

        return char.ToUpper(camelCase[0]) + camelCase.Substring(1);
    }
}