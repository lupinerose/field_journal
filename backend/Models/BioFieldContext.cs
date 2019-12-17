using Microsoft.EntityFrameworkCore;

namespace BioField.Models
{
    public class BioFieldContext : DbContext
    {
        public BioFieldContext(DbContextOptions<BioFieldContext> options) : base(options)
        {
        }

        public virtual DbSet<Journals> Journals { get; set; }
        public DbSet<Entries> Entries { get; set; }
        public DbSet<ApplicationUser> ApplicationUser { get; set; }
    }
}