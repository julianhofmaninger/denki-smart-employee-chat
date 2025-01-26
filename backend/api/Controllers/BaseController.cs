using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/v1/[controller]")]
    // [Authorize]
    [ApiController]
    public class BaseController : ControllerBase
    {
    }
}
