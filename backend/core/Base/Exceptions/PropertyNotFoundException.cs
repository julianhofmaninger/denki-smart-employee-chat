using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace core.Base.Exceptions
{
    public class PropertyNotFoundException : Exception
    {
        public PropertyNotFoundException(PropertyInfo prop) : base($"Property not found: {prop.Name}")
        {
        }
    }
}
