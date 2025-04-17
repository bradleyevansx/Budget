using Back.Repositories.Interfaces;

namespace Back.Repositories.Users;

public class UpdateDbUser : IUpdateEntity
{
    public int? Id { get; set; } = null;
    public string? FirstName { get; set; } = null;
    public string? LastName { get; set; } = null;
    public string? PasswordHash { get; set; } = null;
}