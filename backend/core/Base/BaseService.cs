using AutoMapper;
using core.Base.Authentication;
using core.Base.Exceptions;
using core.Data;
using core.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace core.Base
{
    public abstract class BaseService<TGetDto, TCreateDto, TModifyDto, TEntity>
        where TEntity : BaseEntity
    {
        private readonly DataContext ctx;
        private readonly IMapper mapper;
        private readonly IEmployeeTokenAccessor employeeAccessor;

        public BaseService(DataContext ctx, IMapper mapper, IEmployeeTokenAccessor employeeAccessor)
        {
            this.ctx = ctx;
            this.mapper = mapper;
            this.employeeAccessor = employeeAccessor;
        }

        public BaseService(DataContext ctx, IMapper mapper)
        {
            this.ctx = ctx;
            this.mapper = mapper;
        }

        public virtual async Task<TGetDto> GetAsync(Guid entityId)
        {
            var entity =
                await ctx.Set<TEntity>().Where(e => e.Id == entityId).FirstOrDefaultAsync()
                ?? throw new EntityNotFoundException<TEntity>();
            return mapper.Map<TGetDto>(entity);
        }

        public virtual async Task<TGetDto> CreateAsync(TCreateDto createDto)
        {
            var entity = mapper.Map<TEntity>(createDto);
            var entityEntry = await ctx.Set<TEntity>().AddAsync(entity);
            await ctx.SaveChangesAsync();
            return mapper.Map<TGetDto>(entityEntry.Entity);
        }

        public virtual async Task<TGetDto> ModifyAsync(Guid entityId, TModifyDto modifyDto)
        {
            var entity =
                ctx.Set<TEntity>().Where(e => e.Id == entityId).FirstOrDefault()
                ?? throw new EntityNotFoundException<TEntity>();
            ctx.Entry(entity).CurrentValues.SetValues(modifyDto!);
            await ctx.SaveChangesAsync();
            return mapper.Map<TGetDto>(entity);
        }

        public virtual async Task DeleteAsync(Guid entityId, string deletedBy)
        {
            var entity =
                ctx.Set<TEntity>().Where(e => e.Id == entityId).FirstOrDefault()
                ?? throw new EntityNotFoundException<TEntity>();
            entity.Delete(deletedBy, DateTime.UtcNow);
            await ctx.SaveChangesAsync();
        }
        public virtual async Task DeleteAsync(Guid entityId)
        {
            var entity =
                ctx.Set<TEntity>().Where(e => e.Id == entityId).FirstOrDefault()
                ?? throw new EntityNotFoundException<TEntity>();
            entity.Delete("anonymous", DateTime.UtcNow);
            await ctx.SaveChangesAsync();
        }
    }
}
