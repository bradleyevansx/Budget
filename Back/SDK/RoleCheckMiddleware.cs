using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Back.SDK;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class RoleCheckAttribute : Attribute, IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var userDetailsService = context.HttpContext.RequestServices.GetService<UserDetailsService>();

        if (userDetailsService != null)
        {
            var role = userDetailsService.GetRole();

            if (role == "Recruiter" | role != "Lover")
            {
                context.Result = new OkObjectResult(new { message = "Recruiter" });
                return;
            }
        }

        await next();
    }
}