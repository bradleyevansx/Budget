using Back.Business.Users;

namespace Back.Controllers.Users;

public class NewAppUser
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;    
    public string PasswordHash { get; set; } = string.Empty;

    public NewBusUser ToBus()
    {
        var res = new NewBusUser();
        res.FirstName = FirstName;
        res.LastName = LastName;
        res.PasswordHash = PasswordHash;
        return res;
    }
}