using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NewsAPI.Data;
using NewsAPI.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace NewsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SliderNewsController : ControllerBase
    {
        private readonly NewsDbContext _context;
        private readonly ILogger<SliderNewsController> _logger;

        public SliderNewsController(NewsDbContext context, ILogger<SliderNewsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/SliderNews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SliderNews>>> GetSliderNews()
        {
            try
            {
                _logger.LogInformation("Getting all slider news from database");
                var result = await _context.SliderNews.ToListAsync();
                _logger.LogInformation($"Retrieved {result.Count} slider news items");
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving slider news");
                return StatusCode(500, "Internal server error while retrieving data");
            }
        }

        // GET: api/SliderNews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SliderNews>> GetSliderNews(int id)
        {
            var sliderNews = await _context.SliderNews.FindAsync(id);

            if (sliderNews == null)
            {
                return NotFound();
            }

            return sliderNews;
        }

        // GET: api/SliderNews/category/Spor
        [HttpGet("category/{category}")]
        public async Task<ActionResult<IEnumerable<SliderNews>>> GetSliderNewsByCategory(string category)
        {
            var sliderNews = await _context.SliderNews
                .Where(n => n.Category == category)
                .ToListAsync();

            if (sliderNews == null || !sliderNews.Any())
            {
                return NotFound();
            }

            return sliderNews;
        }
    }
} 