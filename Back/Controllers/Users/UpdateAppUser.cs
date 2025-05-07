using Back.Business.Users;

namespace Back.Controllers.Users;

public class UpdateAppUser
{
    public int Id { get; set; }
    public string? FirstName { get; set; } = null;
    public string? LastName { get; set; } = null;
    public string? Password { get; set; } = null;

    public UpdateBusUser ToBus()
    {
        var res = new UpdateBusUser();
        res.Id = Id;
        res.FirstName = FirstName;
        res.LastName = LastName;
        res.Password = Password;
        return res;
    }
}