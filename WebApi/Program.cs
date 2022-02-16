using WebApi.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy", builder =>
    {
        builder.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000", "https://appname.azurestaticapps.net");
    });
});
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors("CORSPolicy");

app.MapGet("/posts", async () =>
{
    return await PostsRepository.GetPostsAsync();
});

app.MapGet("/posts/{postId}", async (int postId) =>
{
    Post post = await PostsRepository.GetPostByIdAsync(postId);
    if (post is not null)
        return Results.Ok(post);
    return Results.BadRequest();
});

app.MapPost("/posts", async (Post postToCreate) =>
{
    bool createSuccessful = await PostsRepository.CreatePostAsync(postToCreate);
    if (createSuccessful)
        return Results.Ok("Create successful.");
    return Results.BadRequest();
});

app.MapPut("/posts", async (Post postToCreate) =>
{
    bool updateSuccessful = await PostsRepository.UpdatePostAsync(postToCreate);
    if (updateSuccessful)
        return Results.Ok("Update successful.");
    return Results.BadRequest();
});

app.MapDelete("/posts/{postId}", async (int postId) =>
{
    bool deleteSuccessful = await PostsRepository.DeletePostAsync(postId);
    if (deleteSuccessful)
        return Results.Ok("Delete successful.");
    return Results.BadRequest();
});

app.Run();
