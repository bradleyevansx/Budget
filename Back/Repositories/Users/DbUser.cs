using Back.Business;
using Back.Business.Users;
using Back.Repositories.Interfaces;

namespace Back.Repositories.Users;

public class DbUser : IEntity<BusUser>
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; }
    public string PasswordHash { get; set; } = string.Empty;

    public BusUser ToBus()
    {
        var res = new BusUser();
        res.Id = Id;
        res.FirstName = FirstName;
        res.LastName = LastName;
        res.PasswordHash = PasswordHash;
        return res;
    }
}