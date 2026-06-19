using System.ComponentModel.DataAnnotations;

namespace Conference_projekt.Models;

public class ContactMessage
{
    public int Id { get; set; }

    [Required]
    [StringLength(120)]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(180)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [StringLength(200)]
    public string Subject { get; set; } = string.Empty;

    [Required]
    public string Message { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public bool IsRead { get; set; }
}
