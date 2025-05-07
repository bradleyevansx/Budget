using Back.Controllers.Users;

namespace Back.Business.Users;

public class BusUser : IBusEntity
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;

    public AppUser ToApp()
    {
        var res = new AppUser();
        res.Id = Id;
        res.FirstName = FirstName;
        res.LastName = LastName;
        return res;
    }
}