using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.Data.Entities
{
    public class FlaggedChat : BaseEntity
    {
        public double ConflictPotential { get; set; }
        public float SenstivieLeak { get; set; }
        public string[] CriticalPhrases { get; set; }
        // Relations
        public Guid EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public Guid Employee2Id { get; set; }
        public Employee Employee2 { get; set; }
    }
}
