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
    //TO-DO treba se odraditi validacija podataka id-jevi svih vezanih modela
    // takodje treba da se postave odredjeni dependency injection-i
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _repos;

        private readonly ITaskGroupRepository _group_repo;
        public ProjectController(IProjectRepository repos, ITaskGroupRepository group_repo)
        {
            _repos = repos;
            _group_repo = group_repo;

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
            var projectModel = projectDto.toProjectFromCreateDto();
            List<int> teamMembers = projectDto.UserIds;
            //da li su datumi dobri
            if(projectModel.Start >= projectModel.End)
                return BadRequest("End date comes before start date");
            
            var response = await _repos.CreateProjectAsync(projectModel,teamMembers);
            if(response==null)
                return BadRequest("User was not found ");
            var group = new TaskGroup{ Title = projectDto.Title, ParentTaskGroupId = null, ProjectId = response.Id};
            //kreiranje initial grupe - zove se isto kao i projekat
            await _group_repo.CreateAsync(group);
            return CreatedAtAction(nameof(getById), new {id = projectModel.Id}, projectModel.ToProjectDto());
        }

        [HttpPut]
        [Route("update/{id}")]
        public async Task<IActionResult> Update([FromRoute] int id,[FromBody] UpdateProjectDto projectDto)
        {
            //da li su datumi dobri
            if(projectDto.Start >= projectDto.End)
                return BadRequest("End date comes before start date");
            var project = await _repos.UpdateProjectAsync(id,projectDto);

            if(project==null)
                return NotFound("Project with Id:"+id + " was not found !!!");

            return Ok(project.ToProjectDto());
        }

        //Salje se id project_managera za kojeg hocemo plus se salje period string vrednost (week,month)
        [HttpGet("userProjectStates/{userId}/{period}")]
        public async Task<IActionResult> GetAllUserStatesProjects([FromRoute]int userId,[FromRoute] string period)
        {
            var res = await _repos.GetAllUserProjectStates(userId,period);
            return Ok(res);
        }

        [HttpPost("filterUserProject")]
        public async Task<IActionResult> GetAllFilteredprojects([FromBody] ProjectFilterDto dto)
        {
            var projects = await _repos.GetAllFilteredProjectsAsync(dto);
            var dtos = projects.Select(p=>p.ToProjectDto());

            return Ok(dtos);
        }
    }
}