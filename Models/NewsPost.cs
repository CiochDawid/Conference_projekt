using System.ComponentModel.DataAnnotations;

namespace Conference_projekt.Models;

public class NewsPost
{
    public int Id { get; set; }

    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Content { get; set; } = string.Empty;

    public string? ImagePath { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public bool IsPublished { get; set; } = true;
}
