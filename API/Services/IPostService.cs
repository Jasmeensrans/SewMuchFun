using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.DTOs;
using API.Images;

namespace API.Services
{
    public interface IPostService
    {
        Task<IEnumerable<Post>> Get();

        Task<Post> Get(int id);
        Task Update(Post Post);
        Task Delete(int id);
        Task<Post> Create(PostDto post);

        IEnumerable<Post> GetUserPosts(string username);

    }
}