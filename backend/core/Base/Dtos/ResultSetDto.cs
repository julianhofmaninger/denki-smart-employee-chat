using AutoMapper;
using core.Data.Entities;

namespace core.Base
{
    public record ResultSetDto<T>
    {
        public int ResultCount { get; set; }
        public IEnumerable<T> Results { get; set; }
    }
}
