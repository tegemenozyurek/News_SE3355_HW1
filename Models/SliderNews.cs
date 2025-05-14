using System.ComponentModel.DataAnnotations;

namespace NewsAPI.Models
{
    public class SliderNews
    {
        [Key]
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Category { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
    }
} 