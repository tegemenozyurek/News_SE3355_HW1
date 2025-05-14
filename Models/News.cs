using System.ComponentModel.DataAnnotations;

namespace NewsAPI.Models
{
    public class News
    {
        [Key]
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Category { get; set; }
        public string? Content { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime? PublishDate { get; set; }
    }
} 