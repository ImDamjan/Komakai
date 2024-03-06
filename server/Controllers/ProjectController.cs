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

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var projects = await _repos.GetAllProjectsAsync();
            var projectDto = projects.Select(p=> p.ToProjectDto());
            return Ok(projectDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> getById([FromRoute] int id)
        {
            var project = await _repos.GetProjectByIdAsync(id);
            if(project==null)
                return NotFound("Project with "+id + " was not found !!!");
            
            return Ok(project.ToProjectDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateProjectDto projectDto)
        {
            var projectModel = projectDto.toProjectFromCreateDto();
            
            await _repos.CreateProjectAsync(projectModel);
            return CreatedAtAction(nameof(getById), new {id = projectModel.Id}, projectModel.ToProjectDto());
        }
    }
}