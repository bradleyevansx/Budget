using System.Linq.Expressions;
using System.Text.Json;
using static System.Nullable;

namespace Back.Controllers;

public static class DbQueryBuilder
{
    public static Expression<Func<T, bool>> BuildPredicate<T>(IBusQuery? busQuery)
    {
        if (busQuery == null) return x => true;
        var parameter = Expression.Parameter(typeof(T), "x");
        var body = BuildExpressionBody<T>(busQuery, parameter);
        return Expression.Lambda<Func<T, bool>>(body, parameter);
    }

    private static Expression BuildExpressionBody<T>(IBusQuery busQuery, ParameterExpression parameter)
    {
        if (busQuery is BusQuery q)
        {
            var member = Expression.Property(parameter, q.PropertyName);
            var memberType = member.Type;
            Type targetType = null;
            if (q.Value != null)
            {
                targetType = Nullable.GetUnderlyingType(memberType) ?? memberType;
            }
            else
            {
                targetType = memberType;
            }


            var convertedValue = TryConvertValue(q.Value, targetType);

            if (convertedValue == null && targetType.IsValueType && !targetType.IsNullableType())
                throw new ArgumentException($"Cannot assign null to value type {targetType.Name}");

            var constant = Expression.Constant(convertedValue, memberType);

            return q.Comparator switch
            {
                Comparator.Equals => Expression.Equal(member, constant),
                Comparator.DoesNotEqual => Expression.NotEqual(member, constant),
                Comparator.GreaterThan => Expression.GreaterThan(member, constant),
                Comparator.GreaterThanOrEqualTo => Expression.GreaterThanOrEqual(member, constant),
                Comparator.LessThan => Expression.LessThan(member, constant),
                Comparator.LessThanOrEqualTo => Expression.LessThanOrEqual(member, constant),
                Comparator.Contains => Expression.Call(
                    Expression.Call(member, typeof(string).GetMethod("ToLower", Type.EmptyTypes)!),
                    typeof(string).GetMethod("Contains", new[] { typeof(string) })!,
                    Expression.Constant(convertedValue.ToString()!.ToLower())
                ),
                _ => throw new NotImplementedException()
            };
        }
        else if (busQuery is BusQueryLayer layer)
        {
            var childExprs = layer.Children
                .Select(child => BuildExpressionBody<T>(child, parameter));

            return layer.Operator switch
            {
                Operator.And => childExprs.Aggregate(Expression.AndAlso),
                Operator.Or => childExprs.Aggregate(Expression.OrElse),
                _ => throw new NotImplementedException()
            };
        }

        throw new NotSupportedException();
    }

    private static object TryConvertValue(object value, Type targetType)
    {
        try
        {
            if (value == null && targetType.IsClass)
            {
                return null;
            }

            if (targetType == typeof(string))
            {
                return value.ToString();
            }

            if (targetType == typeof(DateTime) || targetType == typeof(DateTime?))
            {
                if (value == null)
                    return null;

                if (value is DateTime dt)
                    return dt;

                if (DateTime.TryParse(value.ToString(), null, System.Globalization.DateTimeStyles.AdjustToUniversal, out var parsedDate))
                {
                    return parsedDate;
                }

                throw new InvalidCastException($"Cannot convert {value} to {targetType}");
            }

            if (targetType.IsNullableType())
            {
                if (value == null)
                    return null;

                return Convert.ChangeType(value, GetUnderlyingType(targetType) ?? targetType);
            }
            
           

            return Convert.ChangeType(value, targetType);
        }
        catch (Exception ex)
        {
            throw new InvalidCastException($"Failed to convert {value} to {targetType}.", ex);
        }
    }



    private static bool IsNullableType(this Type type)
    {
        return GetUnderlyingType(type) != null || !type.IsValueType;
    }

}
