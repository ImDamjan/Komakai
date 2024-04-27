namespace server.DTOs.Answer
{
    public class AnswerDto
    {
        public int Id { get; set; }
        public string? Content { get; set; }
        public DateTime PostTime { get; set; }
        public int CommentId { get; set; }
    }
}
