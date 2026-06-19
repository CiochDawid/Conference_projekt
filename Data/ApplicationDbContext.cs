using Conference_projekt.Models;
using Microsoft.EntityFrameworkCore;

namespace Conference_projekt.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Speaker> Speakers { get; set; }
    public DbSet<Partner> Partners { get; set; }
    public DbSet<AgendaItem> AgendaItems { get; set; }
    public DbSet<NewsPost> NewsPosts { get; set; }
    public DbSet<GalleryImage> GalleryImages { get; set; }
    public DbSet<PageContent> PageContents { get; set; }
    public DbSet<ContactMessage> ContactMessages { get; set; }
}
