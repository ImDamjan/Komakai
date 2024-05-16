using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Authorization;
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

        [HttpPost("createComment")]
        //[HasPermission("AddComment")]
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
            
            var roleDto = user.Role.toRoleDto();
            var userDto = user.toUserDto(roleDto);

            return Ok(comment.ToCommentDto(userDto));
        }

        [HttpGet("getCommentById/{comment_id}")]
        public async Task<IActionResult> GetCommentById([FromRoute] int comment_id)
        {
            var comment = await _comment_repo.GetCommentByIdAsync(comment_id);
            if(comment==null)
                return NotFound("Comment not found.ID:" + comment_id);
            
            var roleDto = comment.User.Role.toRoleDto();
            var userDto = comment.User.toUserDto(roleDto);

            return Ok(comment.ToCommentDto(userDto));
        }

        [HttpPut("updateComment")]
        public async Task<IActionResult> UpdateComment([FromBody] UpdateCommentDto dto)
        {
            var comment = await _comment_repo.UpdateCommentAsync(dto);
            if(comment==null)
                return NotFound("Comment not found.ID:" + dto.Id);

            var roleDto = comment.User.Role.toRoleDto();
            var userDto = comment.User.toUserDto(roleDto);

            return Ok(comment.ToCommentDto(userDto));
        }
        [HttpGet("getAllCommentsByAssignment/{asign_id}")]
        public async Task<IActionResult> GetAllByAssignmet([FromRoute] int asign_id)
        {
            var comments = await _comment_repo.GetAllCommentsByAssignmentIdAsync(asign_id);
           var dtos = comments.Select(c =>
            {
                var roleDto = c.User.Role.toRoleDto();
                var userDto = c.User.toUserDto(roleDto);
                return c.ToCommentDto(userDto);
            });

            return Ok(dtos);
        }

        [HttpDelete("deleteCommentById/{comment_id}")]
        public async Task<IActionResult> DeleteCommentById([FromRoute] int comment_id)
        {
            var comment = await _comment_repo.DeleteCommentByIdAsync(comment_id);
            if(comment==null)
                return NotFound("Comment not found.ID:" + comment_id);
            
            return Ok("Comment deleted successfully");
        }
        
    }
}