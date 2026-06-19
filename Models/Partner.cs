using System.ComponentModel.DataAnnotations;

namespace Conference_projekt.Models;

public class Partner
{
    public int Id { get; set; }

    [Required]
    [StringLength(150)]
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    [StringLength(300)]
    public string? WebsiteUrl { get; set; }

    public string? LogoPath { get; set; }

    public int DisplayOrder { get; set; }
}
