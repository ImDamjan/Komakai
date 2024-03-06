namespace server.Models
{
    public class UserRequestDto
    {
        // debug
        //public int Id { get; set; }
        public required string Username { get; set; }
        public required string Lastname { get; set; }
        public required string Password { get; set; }
        public required string Email { get; set; }
    }
}
