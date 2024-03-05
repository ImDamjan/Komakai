namespace server.Models
{
    public class UserRequestDto
    {
        public required string Username { get; set; }
        public required string Lastname { get; set; }
        public required string Password { get; set; }
        public required string Email { get; set; }
    }
}
