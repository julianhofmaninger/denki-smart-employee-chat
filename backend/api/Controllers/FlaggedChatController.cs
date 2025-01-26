using core.Base;
using core.FlaggedChatApplication;
using core.FlaggedChatApplication.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    public class FlaggedChatController : BaseController
    {
        private readonly IFlaggedChatService flaggedChatService;

        public FlaggedChatController(IFlaggedChatService flaggedChatService)
        {
            this.flaggedChatService = flaggedChatService;
        }

        [HttpGet]
        public async Task<GetFlaggedChatDto> Get()
        {
            return await flaggedChatService.GetAsync();
        }
        [HttpGet("List")]
        public async Task<ResultSetDto<GetFlaggedChatDto>> GetList()
        {
            return await flaggedChatService.GetListAsync();
        }
        [HttpPut]
        public async Task<GetFlaggedChatDto> Update([FromBody] ModifyFlaggedChatDto modifyDto)
        {
            return await flaggedChatService.ModifyAsync(modifyDto);
        }
        [HttpDelete("{eid}")]
        public async Task Delete(Guid eid)
        {
            await flaggedChatService.DeleteAsync(eid);
        }
    }
}
