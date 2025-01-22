using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.Data.Entities
{
    public class Message : BaseEntity
    {
        public string Text { get; set; }
        public bool Read { get; set; }
        // Relations
        public Guid SenderId { get; set; }
        public Employee Sender { get; set; }
        public Guid ReceiverId { get; set; }
        public Employee Receiver { get; set; }
    }
}
