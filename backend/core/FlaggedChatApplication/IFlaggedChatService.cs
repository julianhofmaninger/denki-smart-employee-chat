using core.Base;
using core.FlaggedChatApplication.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.FlaggedChatApplication
{
    public interface IFlaggedChatService
    {
        Task<GetFlaggedChatDto> GetAsync();
        Task<ResultSetDto<GetFlaggedChatDto>> GetListAsync();
        Task<GetFlaggedChatDto> ModifyAsync(ModifyFlaggedChatDto modifyDto);
        Task DeleteAsync(Guid eid);
    }
}
