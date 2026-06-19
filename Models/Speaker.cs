using System.ComponentModel.DataAnnotations;

namespace Conference_projekt.Models;

public class Speaker
{
    public int Id { get; set; }

    [Required]
    [StringLength(120)]
    public string FullName { get; set; } = string.Empty;

    [StringLength(150)]
    public string? Title { get; set; }

    [Required]
    public string Bio { get; set; } = string.Empty;

    [StringLength(200)]
    public string? PresentationTitle { get; set; }

    public string? PhotoPath { get; set; }

    public bool IsFeatured { get; set; }

    public ICollection<AgendaItem> AgendaItems { get; set; } = new List<AgendaItem>();
}
