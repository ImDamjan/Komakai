using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.DTOs.Projects;
using server.Interfaces;
using server.Mappers;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _repos;
        public ProjectController(IProjectRepository repos)
        {
            _repos = repos;
        }

        [HttpGet("getProjects")]
        public async Task<IActionResult> GetAll()
        {
            var projects = await _repos.GetAllProjectsAsync();
            var projectDto = projects.Select(p=> p.ToProjectDto());
            return Ok(projectDto);
        }
        [HttpGet("userProjects/{userId}")]
        public async Task<IActionResult> GetAllUserProjects([FromRoute]int userId)
        {
            var projects = await _repos.GetAllUserProjectsAsync(userId);
            var projectDtos = projects.Select(p=>p.ToProjectDto());
            return Ok(projectDtos);
        }

        [HttpGet("getProject/{id}")]
        public async Task<IActionResult> getById([FromRoute] int id)
        {
            var project = await _repos.GetProjectByIdAsync(id);
            if(project==null)
                return NotFound("Project with Id:"+id + " was not found !!!");
            
            return Ok(project.ToProjectDto());
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateProjectDto projectDto)
        {
            var projectModel = projectDto.toProjectFromCreateDto(1);
            int userId = projectDto.UserId;
            
            var response = await _repos.CreateProjectAsync(projectModel, userId);
            if(response==null)
                return BadRequest("User was not found ");
            return CreatedAtAction(nameof(getById), new {id = projectModel.Id}, projectModel.ToProjectDto());
        }

        [HttpPut]
        [Route("update/{id}")]
        public async Task<IActionResult> Update([FromRoute] int id,[FromBody] UpdateProjectDto projectDto)
        {
            var project = await _repos.UpdateProjectAsync(id,projectDto);

            if(project==null)
                return NotFound("Project with Id:"+id + " was not found !!!");

            return Ok(project.ToProjectDto());
        }

        [HttpDelete]
        [Route("delete/{id}")]

        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var project =  await _repos.DeleteProjectAsync(id);

            if(project==null)
                return NotFound("Project with Id:"+id + " was not found !!!");
            
            return Ok(project);
        }
        //Salje se id project_managera za kojeg hocemo plus se salje period string vrednost (week,month)
        [HttpGet("userProjectStates/{userId}/{period}")]
        public async Task<IActionResult> GetAllUserStatesProjects([FromRoute]int userId,[FromRoute] string period)
        {
            var res = await _repos.GetAllUserProjectStates(userId,period);
            return Ok(res);
        }
    }
}