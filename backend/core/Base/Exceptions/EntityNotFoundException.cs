using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace core.Base.Exceptions
{
    public class EntityNotFoundException<TEntity> : Exception, IEntityNotFoundException
    {
        public EntityNotFoundException() : base($"Entity not found: {typeof(TEntity).Name}")
        {
        }
    }
}