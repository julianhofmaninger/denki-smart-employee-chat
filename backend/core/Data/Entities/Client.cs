using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.Data.Entities
{
    public class Client : BaseEntity
    {
        public string ClientId { get; set; }
        // Relations
        public Guid EmployeeId { get; set; }
        public Employee Employee { get; set; }

    }
}
