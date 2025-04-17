using System.Security.Claims;
using Back.Business.Transactions;
using Back.Controllers.Transactions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

    [HttpGet]
    public async Task<IActionResult> GetWhere([FromQuery] TransactionQueryApp query)
    {
        var bus = query.ToBus();
        var page = query.ToPage();
        var res = await _transactionBus.GetWhereAsync(bus, page);
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