using System.Security.Claims;
using System.Text.Json;
using Back.Business;
using Back.Business.Income;
using Back.Controllers.Filters;
using Back.Controllers.Income;
using Back.Controllers.Transactions;
using Back.Repositories.Income;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Back.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class IncomeController : ControllerBase
{
    public readonly IncomeBus _incomeBus;

    public IncomeController(IncomeBus incomeBus)
    {
        _incomeBus = incomeBus;
    }

    [HttpPost]
    public async Task<IActionResult> CreateTransaction([FromBody] NewAppIncome entity)
    {
        var bus = entity.ToBus();
        var res = await _incomeBus.CreateAsync(bus);
        return Ok(res.ToApp());
    }

    [HttpPost("get")]
    public async Task<IActionResult> GetWhere([FromBody] QueryRequest body)
    {
        IBusQuery? busLayer = null;
        if (body.Query != null)
        {
            busLayer = AppToBusQueryConverter.ConvertToBusinessQuery<DbIncome>(body.Query);
        }

        var res = await _incomeBus.GetWhereAsync(busLayer, null);
        return Ok(res.Select(x => x.ToApp()).ToList());
    }
    
    [HttpPatch]
    public async Task<IActionResult> UpdateIncome([FromBody] UpdateAppIncome entity)
    {
        var bus = entity.ToBus();
        var res = await _incomeBus.UpdateAsync(bus);
        if(res == null) return NotFound();
        return Ok(res.ToApp());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteById(int id)
    {
        var res = await _incomeBus.DeleteByIdAsync(id);
        if (res == null)
        {
            return NotFound();
        }

        return Ok(res.ToApp());
    }
}