using System.Linq.Expressions;

namespace Back.Controllers;

public interface IQuery<T>
{
    public Expression<Func<T, bool>> ToDb();
}