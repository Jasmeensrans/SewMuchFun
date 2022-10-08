using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using API.Models;
using API.Services;
using API.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        public PostController(IPostService postService)
        {
            _postService = postService;
        }
        [HttpGet]
        public async Task<IEnumerable<Post>> GetPosts()
        {
            return await _postService.Get();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(int id)
        {
            return await _postService.Get(id);
        }
        [HttpPost]
        public async Task<ActionResult<Post>> PostPosts([FromBody] PostDto post)
        {

            var newPost = await _postService.Create(post);
            if(newPost == null) return NotFound();
            return CreatedAtAction(nameof(GetPost), new {id=newPost.Id}, newPost);
        }
        [HttpPost("getUserPosts")]
        public IEnumerable<Post> GetUserPosts(string username)
        {
            return _postService.GetUserPosts(username);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutPosts(int id, [FromBody] Post post)
        {
            if(id != post.Id)
            {
                return BadRequest();
            }
            await _postService.Update(post);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var itemToDelete = await _postService.Get(id);
            if(itemToDelete == null)
            {
                return NotFound();
            }
            await _postService.Delete(itemToDelete.Id);
            return NoContent();
        }
    }
}