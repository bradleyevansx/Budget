using Back.Business;
using Back.Business.Users;
using Back.Repositories.Interfaces;

namespace Back.Repositories.Users;

public class DbUser : IEntity<User>
{
    public int Id { get; set; }


    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; }
    public string PasswordHash { get; set; } = string.Empty;

    public User ToBus()
    {
        return null;
    }
}