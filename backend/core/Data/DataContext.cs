using System.Linq.Expressions;
using core.Base.Authentication;
using core.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace core.Data
{
    public class DataContext : DbContext
    {
        private readonly IEmployeeTokenAccessor employeeAccessor;
        public DataContext(IEmployeeTokenAccessor employeeAccessor)
        {
            this.employeeAccessor = employeeAccessor;
        }

        public DataContext(IEmployeeTokenAccessor employeeAccessor, DbContextOptions<DataContext> options) : base(options)
        {
            this.employeeAccessor = employeeAccessor;
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<FlaggedChat> FlaggedChats { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.Entity<Employee>().HasIndex(e => e.Username).IsUnique();
            builder.Entity<Message>().HasOne(m => m.Sender).WithMany(e => e.SentMessages).HasForeignKey(m => m.SenderId).HasPrincipalKey(e => e.Id);
            builder.Entity<Message>().HasOne(m => m.Receiver).WithMany(e => e.ReceivedMessages).HasForeignKey(m => m.ReceiverId).HasPrincipalKey(e => e.Id);
            builder.Entity<FlaggedChat>().HasOne(fc => fc.Employee).WithMany(e => e.FlaggedChats).HasForeignKey(fc => fc.EmployeeId).HasPrincipalKey(e => e.Id);
            

            foreach (var property in GetType().GetProperties())
            {
                if (
                    property.PropertyType.IsGenericType
                    && property.PropertyType.GetGenericTypeDefinition() == typeof(DbSet<>)
                )
                {
                    // Get the entity type
                    var entityType = property.PropertyType.GetGenericArguments().Single();

                    // Apply the global query filter to the entity
                    if (typeof(BaseEntity).IsAssignableFrom(entityType))
                    {
                        var entity = builder.Entity(entityType);
                        var param = Expression.Parameter(entityType, "e");

                        // Create the filter expression
                        var filterExpression = Expression.Lambda(
                            Expression.NotEqual(
                                Expression.Property(param, "deleted"),
                                Expression.Constant(true)
                            ),
                            param
                        );
                        entity.HasQueryFilter(filterExpression);
                    }
                }
            }

            base.OnModelCreating(builder);
        }

        public override int SaveChanges()
        {
            EntityChangeWorker();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(
            CancellationToken cancellationToken = new CancellationToken()
        )
        {
            EntityChangeWorker();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private void EntityChangeWorker()
        {
            var entries = ChangeTracker.Entries<BaseEntity>();

            var now = DateTime.UtcNow;
            foreach (var entry in entries)
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.Create(employeeAccessor.Name, now);
                        break;
                    case EntityState.Modified:
                        entry.Entity.Modify(employeeAccessor.Name, now);
                        break;
                    case EntityState.Deleted:
                        entry.Entity.Modify(employeeAccessor.Name, now);
                        break;
                }
            }
        }
    }
}
