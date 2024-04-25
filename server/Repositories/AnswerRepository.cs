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

        public Task<Answer> CreateAnswerAsync(Answer answer)
        {
            throw new NotImplementedException();
        }

        public Task<Answer?> DeleteAnswerByIdAsync(int answerId)
        {
            throw new NotImplementedException();
        }

        public Task<List<Answer>> GetAllAnswersByCommentIdAsync(int commentId)
        {
            throw new NotImplementedException();
        }

        public Task<Answer?> GetAnswerByIdAsync(int answerId)
        {
            throw new NotImplementedException();
        }

        public Task<Answer> UpdateAnswerAsync(UpdateAnswerDto dto)
        {
            throw new NotImplementedException();
        }
    }
}
