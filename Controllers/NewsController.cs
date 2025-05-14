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
    public class NewsController : ControllerBase
    {
        private readonly NewsDbContext _context;
        private readonly ILogger<NewsController> _logger;

        public NewsController(NewsDbContext context, ILogger<NewsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/News
        [HttpGet]
        public async Task<ActionResult<IEnumerable<News>>> GetNews()
        {
            try
            {
                _logger.LogInformation("Getting all news from database");
                var result = await _context.News.ToListAsync();
                _logger.LogInformation($"Retrieved {result.Count} news items");
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving news");
                return StatusCode(500, "Internal server error while retrieving data");
            }
        }

        // GET: api/News/5
        [HttpGet("{id}")]
        public async Task<ActionResult<News>> GetNews(int id)
        {
            var news = await _context.News.FindAsync(id);

            if (news == null)
            {
                return NotFound();
            }

            return news;
        }

        // GET: api/News/category/Spor
        [HttpGet("category/{category}")]
        public async Task<ActionResult<IEnumerable<News>>> GetNewsByCategory(string category)
        {
            var news = await _context.News
                .Where(n => n.Category == category)
                .ToListAsync();

            if (news == null || !news.Any())
            {
                return NotFound();
            }

            return news;
        }
    }
} 