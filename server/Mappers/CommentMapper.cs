using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MimeKit.Text;
using server.DTOs.Comment;
using server.Models;

namespace server.Mappers
{
    public static class CommentMapper
    {
        public static CommentDto ToCommentDto(this Comment comment)
        {
            return new CommentDto{
                Id = comment.Id,
                Content = comment.Content,
                UserId = comment.UserId,
                AssignmentId = comment.AssignmentId,
                EditedTime = comment.EditedTime,
                PostTime = comment.PostTime
            };
        }
        public static Comment fromCreateToComment(this CreateCommentDto dto)
        {
            return new Comment{
                Content = dto.Content,
                UserId = dto.UserId,
                AssignmentId = dto.AssignmentId
            };
        }
    }
}