using Back.Business;

namespace Back.Repositories.Interfaces;

public interface IEntity<T> where T : IBusEntity
{
    public int Id { get; set; }

    public T ToBus();
}