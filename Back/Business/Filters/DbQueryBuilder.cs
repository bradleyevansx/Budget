using System.Linq.Expressions;

namespace Back.Controllers;

public static class BusQueryBuilder
{
    public static Expression<Func<T, bool>> BuildPredicate<T>(IBusQuery busQuery)
    {
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

            var targetType = Nullable.GetUnderlyingType(memberType) ?? memberType;

            var convertedValue = Convert.ChangeType(q.Value, targetType);
            var constant = Expression.Constant(convertedValue, memberType);

            return q.Comparator switch
            {
                Comparator.Equals => Expression.Equal(member, constant),
                Comparator.DoesNotEqual => Expression.NotEqual(member, constant),
                Comparator.GreaterThan => Expression.GreaterThan(member, constant),
                Comparator.LessThan => Expression.LessThan(member, constant),
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
}