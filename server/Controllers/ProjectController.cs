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
        private readonly IUserRepository _user_repo;
        private readonly IPriorityRepository _prio_repo;
        private readonly ITaskGroupRepository _group_repo;
        public ProjectController(IPriorityRepository prio_repo,IProjectRepository repos,IUserRepository user_repo,ITaskGroupRepository group_repo)
        {
            _repos = repos;
            _prio_repo = prio_repo;
            _user_repo = user_repo;
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
            
            List<User> teamMembers = new List<User>();
            //da li su datumi dobri
            if(projectDto.Start >= projectDto.End)
                return BadRequest("End date comes before start date");
            
            
            //da li je prioritet validan
            var prio = await _prio_repo.GetPriority(projectDto.PriorityId);
            if(prio==null)
                return NotFound("Priority not found.ID:" + projectDto.PriorityId);
            
            //da li su korinsici validni
            foreach (var userId in projectDto.UserIds)
            {
                var user = await _user_repo.GetUserByIdAsync(userId);
                if(user==null)
                    return NotFound("User not found.ID:" + userId);
                teamMembers.Add(user);
            }
            var projectModel = projectDto.toProjectFromCreateDto();
            var response = await _repos.CreateProjectAsync(projectModel,teamMembers);
            
            
            //kreiranje initial grupe - zove se isto kao i projekat
            var group = new TaskGroup{ Title = projectDto.Title, ParentTaskGroupId = null, ProjectId = response.Id};
            
            await _group_repo.CreateAsync(group);
            return CreatedAtAction(nameof(getById), new {id = projectModel.Id}, projectModel.ToProjectDto());
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> Update([FromBody] UpdateProjectDto projectDto)
        {
            //da li su datumi dobri
            if(projectDto.Start >= projectDto.End)
                return BadRequest("End date comes before start date");
            var project = await _repos.UpdateProjectAsync(projectDto);

            if(project==null)
                return NotFound("Project with Id:"+projectDto.Id + " was not found !!!");

            return Ok(project.ToProjectDto());
        }

        //Salje se id project_managera za kojeg hocemo plus se salje period string vrednost (week,month)
        [HttpGet("userProjectStates/{userId}/{period}")]
        public async Task<IActionResult> GetAllUserStatesProjects([FromRoute]int userId,[FromRoute] string period)
        {
            var res = await _repos.GetAllUserProjectStates(userId,period);
            return Ok(res);
        }

        [HttpGet("filterUserProject/{user_id}/{date_start_flag}/{start}/{date_end_flag}/{end}/{prio_filter}/{state_filter}/{budget_flag}/{budget_filter}/{spent_flag}/{spent_filter}/{percentage_flag}/{percentage_filter}")]
        public async Task<IActionResult> GetAllFilteredProjects(int user_id,int date_start_flag,DateTime start,
        int date_end_flag, DateTime end, int prio_filter, int state_filter, int budget_flag,
        double budget_filter, int spent_flag, double spent_filter, int percentage_flag, int percentage_filter)
        {
            ProjectFilterDto dto =  new ProjectFilterDto{
                UserId = user_id,
                DateEndFlag = date_end_flag,
                DateStartFlag = date_start_flag,
                Start = start,
                End = end,
                PriorityFilter = prio_filter,
                StateFilter = state_filter,
                BudgetFilter = budget_filter,
                BudgetFlag = budget_flag,
                SpentFilter = spent_filter,
                SpentFlag = spent_flag,
                PercentageFilter = percentage_filter,
                PercentageFlag = percentage_flag,
                SearchTitle = ""
            };
            var projects = await _repos.GetAllFilteredProjectsAsync(dto);
            var dtos = projects.Select(p=>p.ToProjectDto());

            return Ok(dtos);
        }

        [HttpDelete("deleteProjectById/{project_id}")]
        public async Task<IActionResult> DeleteProject([FromRoute] int project_id)
        {
            var project = await _repos.DeleteProjectByIdAsync(project_id);
            if(project==null)
                return BadRequest("project does not exist");
            
            return Ok(project.ToProjectDto());
        }
    }
}