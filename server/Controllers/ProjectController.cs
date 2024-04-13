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
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _repos;
        private readonly IUserRepository _user_repo;
        private readonly IPriorityRepository _prio_repo;
        private readonly ITaskGroupRepository _group_repo;
        private readonly IStateRepository _state_repo;
        public ProjectController(IPriorityRepository prio_repo,IProjectRepository repos,IUserRepository user_repo,ITaskGroupRepository group_repo, IStateRepository stateRepository)
        {
            _repos = repos;
            _prio_repo = prio_repo;
            _user_repo = user_repo;
            _group_repo = group_repo;
            _state_repo = stateRepository;

        }

        //treba filter
        [HttpGet("getProjects")]
        public async Task<IActionResult> GetAll([FromQuery]ProjectFilterDto dto)
        {
            var projects = await _repos.GetAllProjectsAsync(dto);
            var dtos = new List<ProjectDto>();
            foreach (var project in projects)
            {
                var users =  await _user_repo.GetUserByProjectId(project.Id);
                var userDtos = users.Select(u=>u.toProjectUserDto(u.Role.toRoleDto())).ToList();
                dtos.Add(project.ToProjectDto(userDtos,project.State.toStateDto(),project.Priority.toPrioDto()));
            }
            return Ok(dtos);
        }
        //ovde treba filter
        [HttpGet("userProjects/{userId}")]
        public async Task<IActionResult> GetAllUserProjects([FromRoute]int userId,[FromQuery] ProjectFilterDto filter)
        {
            var projects = await _repos.GetAllUserProjectsAsync(userId,filter);
            var dtos = new List<ProjectDto>();
            foreach (var project in projects)
            {
                var users =  await _user_repo.GetUserByProjectId(project.Id);
                var userDtos = users.Select(u=>u.toProjectUserDto(u.Role.toRoleDto())).ToList();
                dtos.Add(project.ToProjectDto(userDtos,project.State.toStateDto(),project.Priority.toPrioDto()));
            }
            return Ok(dtos);
        }

        [HttpGet("getProject/{id}")]
        public async Task<IActionResult> getById([FromRoute] int id)
        {
            var project = await _repos.GetProjectByIdAsync(id);
            if(project==null)
                return NotFound("Project with Id:"+id + " was not found !!!");
            
            var dto = new ProjectDto();

            var users =  await _user_repo.GetUserByProjectId(project.Id);
            var ids =  users.Select(u=>u.toProjectUserDto(u.Role.toRoleDto())).ToList();
            dto = project.ToProjectDto(ids,project.State.toStateDto(),project.Priority.toPrioDto());
    
            return Ok(dto);
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

            var users =  await _user_repo.GetUserByProjectId(projectModel.Id);
            var ids =  users.Select(u=>u.toProjectUserDto(u.Role.toRoleDto())).ToList();
            var state = await _state_repo.GetStateByIdAsync(response.StateId);
            if(state==null)
                return NotFound("error");
            
            await _group_repo.CreateAsync(group);

            return Ok(response.ToProjectDto(ids,state.toStateDto(),prio.toPrioDto()));
        }

        [HttpPut]
        [Route("update/{project_id}")]
        public async Task<IActionResult> Update([FromBody] UpdateProjectDto projectDto, [FromRoute] int project_id)
        {
            //da li su datumi dobri
            if(projectDto.Start >= projectDto.End)
                return BadRequest("End date comes before start date");

            var users =  new List<User>();
            foreach (var userId in projectDto.Members)
            {
                var user = await _user_repo.GetUserByIdAsync(userId);
                if(user==null)
                    return Ok("user not found");
                users.Add(user);
            }
            var prio = await _prio_repo.GetPriority(projectDto.PriorityId);
            if(prio==null)
                return NotFound("Priority with "+ projectDto.PriorityId+ " does not exist");
            var state = await _state_repo.GetStateByIdAsync(projectDto.StateId);
            if(state==null)
                return NotFound("State with "+ projectDto.StateId+ " does not exist");

            var project = await _repos.UpdateProjectAsync(projectDto, project_id, users);

            if(project==null)
                return NotFound("Project with Id:"+project_id + " was not found !!!");
            var dto = new ProjectDto();

            
            var ids =  users.Select(u=>u.toProjectUserDto(u.Role.toRoleDto())).ToList();
            dto = project.ToProjectDto(ids, state.toStateDto(),prio.toPrioDto());
    
            return Ok(dto);
        }

        //Salje se id project_managera za kojeg hocemo plus se salje period string vrednost (week,month)
        [HttpGet("userProjectStates/{userId}/{period}")]
        public async Task<IActionResult> GetAllUserStatesProjects([FromRoute]int userId,[FromRoute] string period)
        {
            var res = await _repos.GetAllUserProjectStates(userId,period);
            return Ok(res);
        }

        // [HttpGet("filterUserProject/{user_id}/{date_start_flag}/{start}/{date_end_flag}/{end}/{prio_filter}/{state_filter}/{budget_flag}/{budget_filter}/{spent_flag}/{spent_filter}/{percentage_flag}/{percentage_filter}")]
        // public async Task<IActionResult> GetAllFilteredProjects(int user_id,int date_start_flag,DateTime start,
        // int date_end_flag, DateTime end, int prio_filter, int state_filter, int budget_flag,
        // double budget_filter, int spent_flag, double spent_filter, int percentage_flag, int percentage_filter)
        // {
        //     ProjectFilterDto dto =  new ProjectFilterDto{
        //         UserId = user_id,
        //         DateEndFlag = date_end_flag,
        //         DateStartFlag = date_start_flag,
        //         Start = start,
        //         End = end,
        //         PriorityFilter = prio_filter,
        //         StateFilter = state_filter,
        //         BudgetFilter = budget_filter,
        //         BudgetFlag = budget_flag,
        //         SpentFilter = spent_filter,
        //         SpentFlag = spent_flag,
        //         PercentageFilter = percentage_filter,
        //         PercentageFlag = percentage_flag,
        //         SearchTitle = ""
        //     };
        //     var projects = await _repos.GetAllFilteredProjectsAsync(dto);
        //     var dtos = new List<ProjectDto>();
        //     foreach (var project in projects)
        //     {
        //         var users =  await _user_repo.GetUserByProjectId(project.Id);
        //         var ids =  users.Select(u=>u.Id).ToList();
        //         dtos.Add(project.ToProjectDto(ids));
        //     }
        //     return Ok(dtos);
        // }

        [HttpDelete("deleteProjectById/{project_id}")]
        public async Task<IActionResult> DeleteProject([FromRoute] int project_id)
        {
            var project = await _repos.DeleteProjectByIdAsync(project_id);
            if(project==null)
                return BadRequest("project does not exist");
    
            return Ok("Project deleted successfully!");
        }
    }
}