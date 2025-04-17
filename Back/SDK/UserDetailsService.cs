using System.Security.Claims;

namespace Back.SDK;

public class UserDetailsService
{

    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserDetailsService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public int GetUserId()
    {
        var user = _httpContextAccessor.HttpContext?.User;
        var userIdString = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userIdInt = int.Parse(userIdString);
        return userIdInt;
    }
}
