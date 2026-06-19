using System.ComponentModel.DataAnnotations;

namespace Conference_projekt.Models;

public class AgendaItem
{
    public int Id { get; set; }

    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    [Required]
    public DateTime StartTime { get; set; }

    [Required]
    public DateTime EndTime { get; set; }

    [StringLength(150)]
    public string? Location { get; set; }

    public int? SpeakerId { get; set; }

    public Speaker? Speaker { get; set; }
}
