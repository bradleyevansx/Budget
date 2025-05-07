using Back.Repositories.Users;

namespace Back.Business.Users;

public class UpdateBusUser: IUpdateBusEntity
{
    public int Id { get; set; }
    public string? FirstName { get; set; } = null;
    public string? LastName { get; set; } = null;
    public string? Password { get; set; } = null;

    public UpdateDbUser ToDb()
    {
        var res = new UpdateDbUser();
        res.Id = Id;
        res.FirstName = FirstName;
        res.LastName = LastName;
        return res;
    }
}