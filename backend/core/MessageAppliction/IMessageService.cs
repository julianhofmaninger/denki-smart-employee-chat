using core.Base;
using core.MessageApplication.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.MessageApplication
{
    public interface IMessageService
    {
        Task<GetMessageDto> GetAsync(Guid mId);
        Task<ResultSetDto<GetMessageDto>> GetListAsync(Guid senderId, Guid receiverId);
        Task<GetMessageDto> CreateAsync(CreateMessageDto createDto);
        Task<GetMessageDto> ModifyAsync(ModifyMessageDto modifyDto);
        Task DeleteAsync(Guid eid);
    }
}
