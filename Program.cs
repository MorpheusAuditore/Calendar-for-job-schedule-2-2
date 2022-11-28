using System.Globalization;


var builder = WebApplication.CreateBuilder();
var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();
app.Run(async context =>
{
    var response = context.Response;
    var request = context.Request;
    var path = request.Path;
    if (path == "/calendar" && request.Method == "POST")
    {
        await GetDate(request, response);
    }
    else
    {
        response.ContentType = "text/html; charset=utf-8";
        await response.SendFileAsync("html/index.html");
    }
});
    
app.Run();

async Task GetDate(HttpRequest request, HttpResponse response)
{
    try
    {
        var date = await request.ReadFromJsonAsync<Date>();
        if (date != null)
        {
            await GetSchedule(date.MonthDate, date.CheckedDate, response);
        }
        else
        {
            throw new Exception("Incorrect data");
        }
    }
    catch (Exception)
    {
        response.StatusCode = 400;
    }
}

async Task GetSchedule(string date, string checkedDate, HttpResponse response)
{
    string[] dateArray = date.Split(' ', StringSplitOptions.RemoveEmptyEntries);
    string[] checkedDateArray = checkedDate.Split(' ', StringSplitOptions.RemoveEmptyEntries);
    List<string> workDays = new List<string>();
    for (int i = 0; i < dateArray.Length - 1; i++)
    {
        if (dateArray[i] == checkedDateArray[0] && dateArray[i + 1] == checkedDateArray[1])
        {
            for (int j = i; j < dateArray.Length - 1; j+=4)
            {
                workDays.AddRange(new List<string> { dateArray[j], dateArray[j + 1] });
            }
        }
    }
    response.WriteAsJsonAsync(workDays);
}

public class Date
{
    public string MonthDate { get; set; } = "";
    public string CheckedDate { get; set; } = "";
}