using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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
        public async Task<Comment> CreateCommentAsync(Comment comment)
        {
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();
            return comment;
        }

        public Task<Comment?> DeleteCommentByIdAsync(int comment_id)
        {
            throw new NotImplementedException();   
        }

        public Task<List<Comment>> GetAllCommentsByAssignmentIdAsync(int asignment_id)
        {
            throw new NotImplementedException();
        }

        public async Task<Comment?> GetCommentByIdAsync(int comment_id)
        {
            return await _context.Comments.FirstOrDefaultAsync(c=>c.Id==comment_id);
        }

        public Task<Comment> UpdateCommentAsync(UpdateCommentDto dto)
        {
            throw new NotImplementedException();
        }
    }
}