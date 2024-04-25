using server.Data;
using server.DTOs.Answer;
using server.Models;

namespace server.Repositories
{
    public class AnswerRepository:IAnswerRepository
    {
        private readonly ProjectManagmentDbContext _context;

        public AnswerRepository(ProjectManagmentDbContext context)
        {
            _context = context;
        }

        public async Task<Answer> CreateAnswerAsync(Answer answer)
        {
            answer.PostTime=DateTime.Now;
            await _context.Answers.AddAsync(answer);
            await _context.SaveChangesAsync();
            return answer;
        }

        public async Task<Answer?> DeleteAnswerByIdAsync(int answerId)
        {
            var answer = await GetAnswerByIdAsync(answerId);
            if(answer == null)
            {
                return null;
            }

            _context.Answers.Remove(answer);
            await _context.SaveChangesAsync();
            return answer;
        }

        public async Task<List<Answer>> GetAllAnswersByCommentIdAsync(int commentId)
        {
            throw new NotImplementedException();
        }

        public async Task<Answer?> GetAnswerByIdAsync(int answerId)
        {
            throw new NotImplementedException();
        }

        public async Task<Answer> UpdateAnswerAsync(UpdateAnswerDto dto)
        {
            throw new NotImplementedException();
        }
    }
}
