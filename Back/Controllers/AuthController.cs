using Back.Business.Users;
using Back.Data;
using Back.Models;
using Back.Repositories.RecruiterView;
using Back.Repositories.Users;
using Back.SDK;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController: ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;
    private readonly UserRepository _userRepo;
    private readonly RecruiterViewRepository _recruiterViewRepo;
    
    public AuthController(AppDbContext context, IConfiguration config, UserRepository userRepo, RecruiterViewRepository recruiterViewRepo)
    {
        _context = context;
        _config = config;
        _userRepo = userRepo;
        _recruiterViewRepo = recruiterViewRepo;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRegisterRequest req)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.FirstName == req.FirstName && u.LastName == req.LastName);
        if (user == null || !BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash))
        {
            return Unauthorized(new { message = "Invalid credentials" });
        }
        

        var token = JwtTokenHelper.GenerateToken(user, _config["Jwt:Key"]!);
        return Ok(new { token });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] LoginRegisterRequest req)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.FirstName == req.FirstName && u.LastName == req.LastName);
        if (user != null)
        {
            return Unauthorized(new { message = "User already exists" });
        }
        
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(req.Password);

        var newUser = new DbUser();
        newUser.FirstName = req.FirstName;
        newUser.LastName = req.LastName;
        newUser.PasswordHash = passwordHash;
        
        var res = await _userRepo.CreateAsync(newUser);
        
        var token = JwtTokenHelper.GenerateToken(res, _config["Jwt:Key"]!);
        
        return Ok(new { token });
    }

    [Authorize]
    [HttpGet("try-auth")]
    public IActionResult TryAuth()
    {
        return Ok();
    }

    [HttpPost("recruiter")]
    public async Task<IActionResult> Recruiter()
    {
        var view = new DbRecruiterView();
        view.CreatedAt = DateTime.UtcNow;
        
        var res = await _recruiterViewRepo.CreateAsync(view);
        
        var token = JwtTokenHelper.GenerateRecruiterToken(_config["Jwt:Key"]!);
        return Ok(new { token });
    }
}