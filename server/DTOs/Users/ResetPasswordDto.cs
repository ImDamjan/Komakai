﻿namespace server.DTOs.Users
{
    public class ResetPasswordDto
    {
        public string ResetToken { get; set; }=string.Empty;
        public string NewPassword { get; set; }= string.Empty;
    }
}
