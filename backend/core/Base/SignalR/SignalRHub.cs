using Microsoft.AspNetCore.SignalR;

namespace core.Base.SignalR
{
    public class SignalRHub : Hub
    {
        public async Task NewMessage(string user, string message)
        {
            await Clients.Caller.SendAsync("MessageReceived", user, message);
        }
        public override Task OnConnectedAsync()
        {
            UserHandler.ConnectedIds.Add(Context.ConnectionId);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            UserHandler.ConnectedIds.Remove(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }
    }
    public static class UserHandler
    {
        public static HashSet<string> ConnectedIds = new HashSet<string>();
    }
}
