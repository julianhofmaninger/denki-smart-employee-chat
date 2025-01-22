using core.Base.Exceptions;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mime;
using System.Text.Json;

namespace core.Base.Middlewares
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;

        public ErrorHandlingMiddleware(
            RequestDelegate next,
            ILogger<ErrorHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(
           HttpContext context,
           Exception ex)
        {
            ValidationProblemDetails errorMessage = null;
            string errorLogMessage = null;

            switch (ex)
            {
                case ValidationException vex:
                    errorMessage = new ValidationProblemDetails
                    {
                        Status = 400,
                        Title = "One or more validation errors occurred.",
                        //Detail = ex.Message,
                    };

                    //foreach (var err in vex.Errors)

                    var errors = new Dictionary<string, string[]>();
                    foreach (var err in vex.Errors) errors.Add(err.PropertyName, new string[] { err.ErrorMessage });
                    foreach (var err in errors) errorMessage.Errors.Add(err);

                    errorLogMessage = "VALIDATION ERROR";
                    break;

                case FileNotFoundException fnfex:
                    errorMessage = new ValidationProblemDetails
                    {
                        Status = (int)HttpStatusCode.NotFound,
                        Title = "File not found",
                        Detail = ex.Message
                    };
                    errorLogMessage = "NOTFOUND ERROR";
                    break;
                case PropertyNotFoundException pnfex:
                    errorMessage = new ValidationProblemDetails
                    {
                        Status = (int)HttpStatusCode.NotFound,
                        Title = "Property not found",
                        Detail = ex.Message
                    };
                    errorLogMessage = "NOTFOUND ERROR";
                    break;
                case IEntityNotFoundException enfe:
                    errorMessage = new ValidationProblemDetails
                    {
                        Status = (int)HttpStatusCode.NotFound,
                        Title = "Entity not found",
                        Detail = ex.Message
                    };
                    errorLogMessage = "NOTFOUND ERROR";
                    break;
                case UnauthorizedAccessException uaex:
                    errorMessage = new ValidationProblemDetails
                    {
                        Status = (int)HttpStatusCode.Unauthorized,
                        Title = "Unauthorized",
                        Detail = ex.Message
                    };
                    errorLogMessage = "UNAUTHORIZED ERROR";
                    break;
                default:
                    errorMessage = new ValidationProblemDetails
                    {
                        Status = (int)HttpStatusCode.InternalServerError,
                        Title = "An unexpected error occured",
                        Detail = ex.Message
                    };
                    errorLogMessage = "SERVER ERROR";
                    break;
            }

            _logger.LogError(ex, message: errorLogMessage);

            context.Response.StatusCode = errorMessage?.Status ?? 500;

            context.Response.ContentType = MediaTypeNames.Application.Json;
            var serializeOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            };
            var serializedErrorMessage = JsonSerializer.Serialize(errorMessage, serializeOptions);
            await context.Response.WriteAsync(serializedErrorMessage);
        }
    }
}