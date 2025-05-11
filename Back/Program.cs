using System.Text;
using Back.Business.Allocations;
using Back.Business.ExpectedIncome;
using Back.Business.Income;
using Back.Business.Transactions;
using Back.Business.Users;
using Back.Data;
using Back.Repositories.Allocations;
using Back.Repositories.ExpectedIncome;
using Back.Repositories.Income;
using Back.Repositories.Transactions;
using Back.Repositories.Users;
using Back.SDK;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<UserDetailsService>();
builder.Services.AddScoped<TransactionBus>();
builder.Services.AddScoped<TransactionRepository>();
builder.Services.AddScoped<AllocationBus>();
builder.Services.AddScoped<AllocationRepository>();
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<UserBus>();
builder.Services.AddScoped<IncomeBus>();
builder.Services.AddScoped<IncomeRepository>();
builder.Services.AddScoped<ExpectedIncomeBus>();
builder.Services.AddScoped<ExpectedIncomeRepository>();

builder.Services.AddControllers()
    .AddJsonOptions(opt =>
    {
        opt.JsonSerializerOptions.Converters.Add(new AppQueryConverter());
    });


var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]!);

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

builder.Services.AddCors(options =>
{
     options.AddPolicy("AllowAllClients", policy =>
    {
        policy.WithOrigins(
            "http://localhost:4200",
            "https://musical-druid-9758eb.netlify.app")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.UseCors("AllowAllClients");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();