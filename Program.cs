using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using NewsAPI.Data;
using NewsAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "News API", Version = "v1", Description = "Haber API" });
});

// Add CORS support
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Add SQLite Database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<NewsDbContext>(options =>
    options.UseSqlite(connectionString));

var app = builder.Build();

// Seed the database with initial data
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<NewsDbContext>();
    
    // Add sample news if none exist
    if (!dbContext.News.Any())
    {
        dbContext.News.AddRange(
            new News
            {
                Title = "Sample News 1",
                Category = "Technology",
                Content = "This is a sample news content for technology.",
                ImageUrl = "https://via.placeholder.com/300",
                PublishDate = DateTime.Now
            },
            new News
            {
                Title = "Sample News 2",
                Category = "Sports",
                Content = "This is a sample news content for sports.",
                ImageUrl = "https://via.placeholder.com/300",
                PublishDate = DateTime.Now
            }
        );
    }
    
    // Add sample slider news if none exist
    if (!dbContext.SliderNews.Any())
    {
        dbContext.SliderNews.AddRange(
            new SliderNews
            {
                Title = "Sample Slider 1",
                Category = "Featured",
                Description = "This is a sample slider description.",
                ImageUrl = "https://via.placeholder.com/800x400"
            },
            new SliderNews
            {
                Title = "Sample Slider 2",
                Category = "Breaking",
                Description = "This is another sample slider description.",
                ImageUrl = "https://via.placeholder.com/800x400"
            }
        );
    }
    
    dbContext.SaveChanges();
}

// Configure the HTTP request pipeline.
// Enable Swagger for all environments, not just Development
app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "News API v1"));

app.UseHttpsRedirection();

// Use CORS
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
