using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.Base.Exceptions
{
    public class ParseException<Dest>: Exception
    {
        public ParseException(string type):base($"Could not parse object of type {type} to {typeof(Dest).Name}")
        {
        }
    }
}
