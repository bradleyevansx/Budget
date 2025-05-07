using Back.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore.Design;

namespace Back.Repositories.Users;

public class UpdateDbUser : IUpdateEntity
{
    public int? Id { get; set; } = null;
    public string? FirstName { get; set; } = null;
    public string? LastName { get; set; } = null;
    public string? PasswordHash { get; set; } = null;
    
    public UpdateDbUser ToDb()
    {
     var res = new UpdateDbUser();
     res.Id = Id;
     res.FirstName = FirstName;
     res.LastName = LastName;
     res.PasswordHash = PasswordHash;
     return res;
    }
}