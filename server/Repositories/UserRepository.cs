using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs.Projects;
using server.Interfaces;
using server.Models;

namespace server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ProjectManagmentDbContext _context;
        public UserRepository(ProjectManagmentDbContext context)
        {
            _context = context;
        }

        public async Task AddUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _context.Users.Include(u=>u.Role).FirstOrDefaultAsync(u=>u.Id==id);
        }
  

        public async Task<User?> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task<List<User>> GetUsersByRoleAsync(string roleName)
        {
            return await _context.Users
                .Where(u=> u.Role!= null && u.Role.Name==roleName)
                .ToListAsync();
        }

        public async Task<Role?> GetRoleByNameAsync(string roleName)
        {
            return await _context.Roles.FirstOrDefaultAsync(r => r.Name == roleName);
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<User?> GetUserByResetTokenAsync(string resetToken)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.PasswordResetToken == resetToken);
        }

        public async Task<bool> DeleteUserByIdAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return false; // User with the specified ID not found
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true; // User deleted successfully
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProfilePictureAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return; // Or throw an exception or handle accordingly
            }

            user.ProfilePicturePath = string.Empty; // Set the profile picture path to empty string to remove it
            await _context.SaveChangesAsync();
        }

        public async Task<List<User>> GetUserByProjectId(int project_id)
        {
            var users = await _context.Users.Include(u=>u.ProjectUsers).ToListAsync();
            List<User> chosenUsers = new List<User>();
            foreach (var user in users)
            {
                var project_users = user.ProjectUsers.Where(u=>u.ProjectId==project_id).ToList();
                if(project_users.Count > 0)
                    chosenUsers.Add(user);
            }
            return chosenUsers;
        }

        public async Task<List<User>> GetAssignmentUsersAsync(int task_id)
        {
            var asign = await _context.Assignments.Include(a=>a.Users).FirstOrDefaultAsync(a=>a.Id==task_id);
            if (asign == null)
                return new List<User>();
            
            return asign.Users.ToList();
        }
    }
}