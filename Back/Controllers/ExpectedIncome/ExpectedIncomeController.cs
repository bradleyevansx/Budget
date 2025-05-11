using Back.Business.ExpectedIncome;
using Back.Controllers.Allocations;
using Back.Controllers.Filters;
using Back.Repositories.ExpectedIncome;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers.ExpectedIncome;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ExpectedIncomeController : ControllerBase
{
    public readonly ExpectedIncomeBus _expectedIncomeBus;

    public ExpectedIncomeController(ExpectedIncomeBus expectedIncomeBus)
    {
        _expectedIncomeBus = expectedIncomeBus;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] NewAppExpectedIncome entity)
    {
        var bus = entity.ToBus();
        var res = await _expectedIncomeBus.CreateAsync(bus);
        return Ok(res.ToApp());
    }

    [HttpPost("get")]
    public async Task<IActionResult> GetWhere([FromBody] QueryRequest body)
    {
        IBusQuery? busLayer = null;
        if (body.Query != null)
        {
            busLayer = AppToBusQueryConverter.ConvertToBusinessQuery<DbExpectedIncome>(body.Query);
        }

        var res = await _expectedIncomeBus.GetWhereAsync(busLayer, null);
        return Ok(res.Select(x => x.ToApp()).ToList());
    }

    [HttpPatch]
    public async Task<IActionResult> Update([FromBody] UpdateAppExpectedIncome entity)
    {
        var bus = entity.ToBus();
        var res = await _expectedIncomeBus.UpdateAsync(bus);
        if(res == null) return NotFound();
        return Ok(res.ToApp());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteById(int id)
    {
        var res = await _expectedIncomeBus.DeleteByIdAsync(id);
        if (res == null)
        {
            return NotFound();
        }

        return Ok(res.ToApp());
    }
}