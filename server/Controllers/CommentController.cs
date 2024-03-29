using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.DTOs.Comment;
using server.Mappers;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _comment_repo;
        private readonly IUserRepository _user_repo;
        private readonly IAssignmentRepository _asign_repo;

        public CommentController(ICommentRepository comment_repo, IUserRepository user_repo, IAssignmentRepository asign_repo)
        {
            _asign_repo = asign_repo;
            _user_repo = user_repo;
            _comment_repo = comment_repo;
        }

        [HttpPost]
        public async Task<IActionResult> CreateComment([FromBody] CreateCommentDto dto)
        {
            var comment = dto.fromCreateToComment();
            var assignment = await _asign_repo.GetAssignmentByidAsync(dto.AssignmentId);
            if(assignment==null)
                return NotFound("Assignment not found");
            var user = await _user_repo.GetUserByIdAsync(dto.UserId);
            if(user==null)
                return NotFound("User not found");
            comment = await _comment_repo.CreateCommentAsync(comment);
            return Ok(comment.ToCommentDto());
        }

        [HttpGet("getCommentById/{comment_id}")]
        public async Task<IActionResult> GetCommentById([FromRoute] int comment_id)
        {
            var comment = await _comment_repo.GetCommentByIdAsync(comment_id);
            if(comment==null)
                return NotFound("Comment not found.ID:" + comment_id);
            
            return Ok(comment.ToCommentDto());
        }

        
    }
}