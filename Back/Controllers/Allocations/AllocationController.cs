using Back.Business.Allocations;
using Back.Business.Transactions;
using Back.Controllers.Filters;
using Back.Controllers.Transactions;
using Back.Repositories.Allocations;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers.Allocations;

[ApiController]
[Route("api/[controller]")]
public class AllocationController : ControllerBase
{
    public readonly AllocationBus _allocationBus;

    public AllocationController(AllocationBus allocationBus)
    {
        _allocationBus = allocationBus;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] NewAppAllocation entity)
    {
        var bus = entity.ToBus();
        var res = await _allocationBus.CreateAsync(bus);
        return Ok(res.ToApp());
    }

    [HttpPost("get")]
    public async Task<IActionResult> GetWhere([FromBody] QueryRequest body)
    {
        IBusQuery? busLayer = null;
        if (body.Query != null)
        {
            busLayer = AppToBusQueryConverter.ConvertToBusinessQuery<DbAllocation>(body.Query);
        }

        var res = await _allocationBus.GetWhereAsync(busLayer, null);
        return Ok(res.Select(x => x.ToApp()).ToList());
    }

    [HttpPatch]
    public async Task<IActionResult> Update([FromBody] UpdateAppAllocation entity)
    {
        var bus = entity.ToBus();
        var res = await _allocationBus.UpdateAsync(bus);
        if(res == null) return NotFound();
        return Ok(res.ToApp());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteById(int id)
    {
        var res = await _allocationBus.DeleteByIdAsync(id);
        if (res == null)
        {
            return NotFound();
        }

        return Ok(res.ToApp());
    }
}