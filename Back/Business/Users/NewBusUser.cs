using Back.Repositories.Users;

namespace Back.Business.Users;

public class NewBusUser : INewBusEntity
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;

    public DbUser ToDb()
    {
        var res = new DbUser();
        res.Id = Id;
        res.FirstName = FirstName;
        res.LastName = LastName;
        res.PasswordHash = PasswordHash;
        return res;
    }
}