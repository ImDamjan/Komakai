

using MailKit.Security;
using MimeKit.Text;
using MimeKit;
using MailKit.Net.Smtp;

namespace server.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        public EmailService(IConfiguration configuration)
        { 
            _configuration = configuration;
        }   
        public void SendEmail(EmailDto request)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_configuration.GetSection("EmailSettings:From").Value));
            email.To.Add(MailboxAddress.Parse(request.To));
            email.Subject = request.Subject;
            email.Body = new TextPart(TextFormat.Html) { Text = request.Body };


            using var smtp = new SmtpClient();
            smtp.Connect(_configuration.GetSection("EmailSettings:SmtpServer").Value, 587, SecureSocketOptions.StartTls);
            smtp.Authenticate(_configuration.GetSection("EmailSettings:Username").Value, _configuration.GetSection("EmailSettings:Password").Value);
            smtp.Send(email);
            smtp.Disconnect(true);
        }
    }
}
