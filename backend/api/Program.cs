using System.Text;
using System.Text.Json;
using core.Data;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using core.Base.Middlewares;
using Microsoft.OpenApi.Models;
using core.Base.Authentication;
using core.EmployeeApplication;
using core.FlaggedChatApplication;
using core.MessageApplication;
using core.EmployeeApplication.Dtos;
using core.AuthApplication;
using Microsoft.EntityFrameworkCore;
using core.ClientApplication;
using core.Base.SignalR;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
ConfigureDatabase(builder);
ConfigureServices(builder);
ConfigureSwagger(builder);
ConfigureCompression(builder);
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "CorsPolicy",
        policy =>
        {
            policy.AllowAnyHeader();
            policy.AllowAnyMethod();
            policy.SetIsOriginAllowed(origin => true);
            policy.AllowCredentials();
        }
    );
});

builder
    .Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });

builder.Services.AddEndpointsApiExplorer();
builder
    .Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.IncludeErrorDetails = true;
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"],
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"])
            )
        };
    });

var app = builder.Build();

app.UseForwardedHeaders(
    new ForwardedHeadersOptions
    {
        ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
    }
);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseResponseCompression();

// Custom ErrorhandlingMiddleware
app.UseMiddleware<ErrorHandlingMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
    app.MapControllers().AllowAnonymous();
else
    app.MapControllers();

app.MapHub<SignalRHub>("/api/v1/hub");

app.UseCors("CorsPolicy");

app.Run();

void ConfigureCompression(WebApplicationBuilder builder)
{
    // For Compressing data
    builder.Services.AddResponseCompression(options =>
    {
        options.Providers.Add<GzipCompressionProvider>();
        options.EnableForHttps = true; // Optional: Enable compression for HTTPS
    });
}
void ConfigureDatabase(WebApplicationBuilder builder)
{
    var host = builder.Configuration["Denki:Db:Host"];
    var dbname = builder.Configuration["Denki:Db:DbName"];
    var user = builder.Configuration["Denki:Db:User"];
    var password = builder.Configuration["Denki:Db:Password"];
    var port = builder.Configuration["Denki:Db:Port"];

    AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    builder.Services.AddDbContext<DataContext>(options =>
    {
        options.UseNpgsql(
            $""
                + $"User Id={user};"
                + $"Password={password};"
                + $"Server={host};"
                + $"Port={port};"
                + $"Database={dbname};"
                + "Include Error Detail=true"
        );

        options.EnableSensitiveDataLogging();
    });
}
void ConfigureServices(WebApplicationBuilder builder)
{
    builder.Services.AddHttpContextAccessor();

    builder.Services.AddSignalR();

    builder.Services.AddTransient<IEmployeeTokenAccessor, EmployeeTokenAccessor>();
    builder.Services.AddScoped<IAuthService, AuthService>();
    builder.Services.AddScoped<IEmployeeService, EmployeeService>();
    builder.Services.AddScoped<IFlaggedChatService, FlaggedChatService>();
    builder.Services.AddScoped<IMessageService, MessageService>();
    builder.Services.AddScoped<IClientService, ClientService>();

    builder.Services.AddAutoMapper(typeof(CreateEmployeeDtoMappingProfile).Assembly);
    var serializeOptions = new JsonSerializerOptions();
    serializeOptions.Converters.Add(new TimeOnlyJsonConverter());

}
void ConfigureSwagger(WebApplicationBuilder builder)
{
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(options =>
    {
        options.AddSecurityDefinition(
            "Bearer",
            new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description = "JWT Authorization header using the Bearer scheme",
            }
        );
        options.AddSecurityRequirement(
            new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    Array.Empty<string>()
                }
            }
        );
    });
}