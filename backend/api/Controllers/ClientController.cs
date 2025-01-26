using core.ClientApplication;
using core.ClientApplication.Dtos;
using core.EmployeeApplication;
using core.EmployeeApplication.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    public class ClientController : BaseController
    {
        private readonly IClientService clientService;

        public ClientController(IClientService clientService)
        {
            this.clientService = clientService;
        }

        [HttpGet]
        public async Task<GetClientDto> Get()
        {
            return await clientService.GetAsync();
        }
        [HttpPost]
        public async Task<GetClientDto> Create([FromBody] CreateClientDto createDto)
        {
            return await clientService.CreateAsync(createDto);
        }
        [HttpPut]
        public async Task<GetClientDto> Update([FromBody] ModifyClientDto modifyDto)
        {
            return await clientService.ModifyAsync(modifyDto);
        }
        [HttpDelete("{cId}")]
        public async Task Delete(Guid cId)
        {
            await clientService.DeleteAsync(cId);
        }
    }
}
