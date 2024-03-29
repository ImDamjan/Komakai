using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Data;
using server.DTOs.Comment;
using server.Models;

namespace server.Repositories
{
    public class CommentRepositroy : ICommentRepository
    {
        private readonly ProjectManagmentDbContext _context;
        public CommentRepositroy(ProjectManagmentDbContext context)
        {
            _context = context;
        }
        public Task<Comment> CreateCommentAsync(CreateCommentDto dto)
        {
            throw new NotImplementedException();
        }

        public Task<Comment?> DeleteCommentByIdAsync(int comment_id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Comment>> GetAllCommentsByAssignmentIdAsync(int asignment_id)
        {
            throw new NotImplementedException();
        }

        public Task<Comment?> GetCommentByIdAsync(int comment_id)
        {
            throw new NotImplementedException();
        }

        public Task<Comment> UpdateCommentAsync(CommentDto dto)
        {
            throw new NotImplementedException();
        }
    }
}