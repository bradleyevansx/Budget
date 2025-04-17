using Back.Business.Users;
using Back.Data;

namespace Back.Repositories.Users;

public class UserRepository(AppDbContext context) : BaseRepository<DbUser, User, UpdateDbUser>(context);