using System;
using System.Collections.Generic;
using System.Linq;
using API.Images;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;
using API.DTOs;
using Microsoft.AspNetCore.Identity;

namespace API.Services
{
    public class PostService : IPostService
    {
        private readonly DataContext _context;

        private readonly UserManager<User> _userManager;

        public PostService(DataContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        public async Task<Post> Create(PostDto item)
        {
            var user = await _userManager.FindByEmailAsync(item.Email);
            if(user == null) return null;
            var post = new Post 
            {
                author = item.author,
                description = item.description,
                title = item.title,
                PhotoId = item.PhotoId,
                PhotoUrl = item.PhotoUrl,
                Poster = user,
                UserId = user.Id,
            };
            user.Posts.Add(post); // this is not working for some reason?posts exist in post table but not in user.posts
            _context.Users.Attach(user);
            await _userManager.UpdateAsync(user);

             _context.Posts.Attach(post);
             await _context.SaveChangesAsync();

            return post;
        }
        public async Task Delete(int id)
        {
            var itemToDelete = await _context.Posts.FindAsync(id);
            _context.Remove(itemToDelete);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<Post>> Get()
        {
            return await _context.Posts.ToListAsync();
        }
        
        public async Task<Post> Get(int id)
        {
            return await _context.Posts.FindAsync(id);
        }

        public async Task Update(Post item)
        {
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public IEnumerable<Post> GetUserPosts(string username)
        {
            return _context.Posts.Where(post => post.author == username).ToList();
        }
    }
}