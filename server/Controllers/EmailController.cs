using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MimeKit.Text;


namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        [HttpPost]
        public IActionResult SendEmail(string body)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("evalyn.turcotte15@ethereal.email"));
            email.To.Add(MailboxAddress.Parse("evalyn.turcotte15@ethereal.email"));
            email.Subject = "Test Email";
            email.Body = new TextPart(TextFormat.Html) { Text = body };


            using var smtp = new SmtpClient();
            smtp.Connect("smtp.ethereal.email", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate("evalyn.turcotte15@ethereal.email", "jHmxWjgV5Ex38qBRfR");
            smtp.Send(email);
            smtp.Disconnect(true);


            return Ok();

        }
    }
}
