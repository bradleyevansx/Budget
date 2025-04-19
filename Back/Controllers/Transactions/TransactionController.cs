using System.Security.Claims;
using System.Text.Json;
using Back.Business;
using Back.Business.Transactions;
using Back.Controllers.Filters;
using Back.Controllers.Transactions;
using Back.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Back.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionController : ControllerBase
{
    public readonly TransactionBus _transactionBus;

    public TransactionController(TransactionBus transactionBus)
    {
        _transactionBus = transactionBus;
    }

    [HttpPost]
    public async Task<IActionResult> CreateTransaction([FromBody] NewAppTransaction entity)
    {
        var bus = entity.ToBus();
        var res = await _transactionBus.CreateAsync(bus);
        return Ok(res.ToApp());
    }

    [HttpPost("get")]
    public async Task<IActionResult> GetWhere([FromBody] QueryRequest body)
    {
        IBusQuery? busLayer = null;
        if (body.Query != null)
        {
            busLayer = AppToBusQueryConverter.ConvertToBusinessQuery<DbTransaction>(body.Query);
        }

        var res = await _transactionBus.GetWhereAsync(busLayer, null);
        return Ok(res.Select(x => x.ToApp()).ToList());
    }

    [HttpPatch]
    public async Task<IActionResult> UpdateTransaction([FromBody] UpdateAppTransaction entity)
    {
        var bus = entity.ToBus();
        var res = await _transactionBus.UpdateAsync(bus);
        if(res == null) return NotFound();
        return Ok(res.ToApp());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteById(int id)
    {
        var res = await _transactionBus.DeleteByIdAsync(id);
        if (res == null)
        {
            return NotFound();
        }

        return Ok(res.ToApp());
    }
}