using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.DTOs.Answer;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswerController : ControllerBase
    {
        private readonly IAnswerRepository _answerRepository;
        private readonly ICommentRepository _commentRepository;

        public AnswerController(IAnswerRepository answerRepository,ICommentRepository commentRepository)
        {
            _answerRepository = answerRepository;
            _commentRepository = commentRepository;
        }

        [HttpPost]
        public async Task<ActionResult<Answer>> CreateAnswer(AnswerDto dto)
        {
            var comment = await _commentRepository.GetCommentByIdAsync(dto.CommentId);
            if (comment == null)
            {
                return NotFound("Comment not found."); // Return NotFound with a message
            }
            var answer = new Answer
            {
                Content = dto.Content,
                CommentId = dto.CommentId
            };

            answer = await _answerRepository.CreateAnswerAsync(answer);

            return Ok(answer);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnswer(int id)
        {
            var answer = await _answerRepository.DeleteAnswerByIdAsync(id);

            if (answer == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnswerDto>>> GetAllAnswersByCommentId(int commentId)
        {
            var answers = await _answerRepository.GetAllAnswersByCommentIdAsync(commentId);

            if (!answers.Any())
            {
                return NotFound("No Answers");
            }

            var answerDtos = answers.Select(answer => new AnswerDto
            {
                Id = answer.Id,
                Content = answer.Content,
                PostTime = answer.PostTime,
                CommentId = (int)answer.CommentId,
            });

            return Ok(answerDtos);
        }

    }
}
