using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTOs.Comment;
using server.Models;

namespace server.Interfaces
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllCommentsByAssignmentIdAsync(int asignment_id);
        Task<Comment> CreateCommentAsync(CreateCommentDto dto);
        Task<Comment> UpdateCommentAsync(CommentDto dto);
        Task<Comment?> GetCommentByIdAsync(int comment_id);
        Task<Comment?> DeleteCommentByIdAsync(int comment_id);
    }
}