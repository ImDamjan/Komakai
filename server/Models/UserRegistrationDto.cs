﻿namespace server.Models
{
    public class UserRegistrationDto
    {
        public required string Username { get; set; }
        public required string Lastname { get; set; }
        public required string Password { get; set; }
        public required string Email { get; set; }
        public required string Name { get; set;}
    }
}
