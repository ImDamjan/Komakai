

namespace server.Interfaces
{
    public interface IEmailService
    {
        void SendEmail(EmailDto request);
    }
}
