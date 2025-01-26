using core.Base;
using core.ClientApplication.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.ClientApplication
{
    public interface IClientService
    {
        Task<GetClientDto> GetAsync();
        Task<GetClientDto> CreateAsync(CreateClientDto createDto);
        Task<GetClientDto> ModifyAsync(ModifyClientDto modifyDto);
        Task DeleteAsync(Guid eid);
    }
}
