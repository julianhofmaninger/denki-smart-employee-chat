using core.Base;
using core.MessageApplication;
using core.MessageApplication.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    public class MessageController : BaseController
    {
        private readonly IMessageService messageService;

        public MessageController(IMessageService messageService)
        {
            this.messageService = messageService;
        }

        [HttpGet("{mId}")]
        public async Task<GetMessageDto> Get(Guid mId)
        {
            return await messageService.GetAsync(mId);
        }
        [HttpGet("List/{senderId}/{receiverId}")]
        public async Task<ResultSetDto<GetMessageDto>> GetList(Guid senderId, Guid receiverId)
        {
            return await messageService.GetListAsync(senderId, receiverId);
        }
        [HttpPost]
        public async Task<GetMessageDto> Create([FromBody] CreateMessageDto createDto)
        {
            return await messageService.CreateAsync(createDto);
        }
        [HttpPut]
        public async Task<GetMessageDto> Update([FromBody] ModifyMessageDto modifyDto)
        {
            return await messageService.ModifyAsync(modifyDto);
        }
        [HttpDelete("{eid}")]
        public async Task Delete(Guid eid)
        {
            await messageService.DeleteAsync(eid);
        }
    }
}
