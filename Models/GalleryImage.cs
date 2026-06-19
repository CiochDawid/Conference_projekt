using System.ComponentModel.DataAnnotations;

namespace Conference_projekt.Models;

public class GalleryImage
{
    public int Id { get; set; }

    [Required]
    [StringLength(150)]
    public string Title { get; set; } = string.Empty;

    public string ImagePath { get; set; } = string.Empty;

    public DateTime UploadedAt { get; set; } = DateTime.Now;
}
