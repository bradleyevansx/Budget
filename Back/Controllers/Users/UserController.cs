using Back.Business.Users;
using Back.Controllers.Filters;
using Back.Repositories.Users;
using Back.SDK;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers.Users;
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
        public readonly UserBus _userBus;
    
        public UserController(UserBus userBus)
        {
            _userBus = userBus;
        }
    
        [HttpPost]
        [RoleCheck]
        public async Task<IActionResult> CreateTransaction([FromBody] NewAppUser entity)
        {
            var bus = entity.ToBus();
            var res = await _userBus.CreateAsync(bus);
            return Ok(res.ToApp());
        }
    
        [HttpPost("get")]
        public async Task<IActionResult> GetWhere([FromBody] QueryRequest body)
        {
            IBusQuery? busLayer = null;
            if (body.Query != null)
            {
                busLayer = AppToBusQueryConverter.ConvertToBusinessQuery<DbUser>(body.Query);
            }
    
            var res = await _userBus.GetWhereAsync(busLayer, null);
            return Ok(res.Select(x => x.ToApp()).ToList());
        }
        
        [HttpPatch]
        [RoleCheck]
        public async Task<IActionResult> UpdateTransaction([FromBody] UpdateAppUser entity)
        {
            var bus = entity.ToBus();
            var res = await _userBus.UpdateAsync(bus);
            if(res == null) return NotFound();
            return Ok(res.ToApp());
        }
    
        [HttpDelete("{id}")]
        [RoleCheck]
        public async Task<IActionResult> DeleteById(int id)
        {
            var res = await _userBus.DeleteByIdAsync(id);
            if (res == null)
            {
                return NotFound();
            }
    
            return Ok(res.ToApp());
        }
}