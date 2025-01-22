using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.Base.Exceptions
{
    public class DuplicateEntryException<T>:Exception
    {
        public DuplicateEntryException(string property):base($"Duplicate entry for entity: {typeof(T).GetType()} and property: {property}")
        {
        }
    }
}
