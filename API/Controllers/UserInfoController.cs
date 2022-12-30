using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.DTOs;
using Microsoft.AspNetCore.Identity;
using API.Services;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;


namespace API.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class UserInfoController: ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly DataContext _context;
        public UserInfoController(UserManager<User> userManager, DataContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<UserInfo>> GetUserInfo(string username)
        {
            var user = _userManager.Users.Where(user => user.DisplayName == username).ToList()[0];
            if (user == null) return NotFound();
            var followerCount = _context.Follows.Where(follow => follow.Follower == user).ToList(); // how many people they follow
            var followeeCount = _context.Follows.Where(follow => follow.Followee == user).ToList(); // how many people follow them

            var posts = _context.Posts.Where(post => post.Poster == user).ToList();
            var loggedIn = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            // check the users list of followers for logged in user
            var followed = false;
            try {
                var followeedUser = user.Follower.First(follow => follow.Follower == loggedIn).Follower;
                if(followeedUser == loggedIn) {
                    followed = true;
                }
            } catch {
                followed = false;
            }

            var info = new UserInfo {
                Username = user.DisplayName,
                Bio = user.Bio,
                Posts = posts,
                Followers = followeeCount.Count,
                Following = followerCount.Count,
                Followed = followed,
                Image = user.Image,
            };
            return info;
        }
        [HttpPost("follow")]
        public async Task<ActionResult<Follow>> FollowUser([FromBody] FollowDto followDto) 
        {
            // followee is the person you want to follow, follower is the person who is following
            var followeeUser = _userManager.Users.Where(user => user.DisplayName == followDto.followee).ToList()[0];
            var followerUser = _userManager.Users.Where(user => user.DisplayName == followDto.follower).ToList()[0];
            var follow = new Follow 
            {
                Followee = followeeUser,
                Follower = followerUser,
                FolloweeId = followeeUser.Id,
                FollowerId = followerUser.Id
            };
            _context.Follows.Add(follow);
            followerUser.Followee.Add(follow);
            followeeUser.Follower.Add(follow);
            await _context.SaveChangesAsync();
            await _userManager.UpdateAsync(followeeUser);
            await _userManager.UpdateAsync(followerUser);
            return follow;
        }

        [HttpPost("unfollow")]
        public async Task<ActionResult> UnfollowUser([FromBody] FollowDto followDto) 
        {
            // followee is the person you want to unfollow, follower is the person who is unfollowing aka you
            var followeeUser = _userManager.Users.Where(user => user.DisplayName == followDto.follower).ToList()[0];
            var followerUser = _userManager.Users.Where(user => user.DisplayName == followDto.followee).ToList()[0];
            var follow = _context.Follows.Where(follow => (follow.FolloweeId == followeeUser.Id && follow.FollowerId == followerUser.Id)).ToList()[0]; // index is out of range ? 

            followerUser.Followee.Remove(follow);
            followeeUser.Follower.Remove(follow);
            await _userManager.UpdateAsync(followeeUser);
            await _userManager.UpdateAsync(followerUser);
            _context.Follows.Remove(follow);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("userFeed")]
        public IEnumerable<Post> getUserFeed(UsernameDto usernameDto)
        {
            var user = _userManager.Users.Where(user => user.DisplayName == usernameDto.username).ToList()[0];
            var allPosts = _context.Posts;
            var posts = new List<Post>();
            var followees = _context.Follows.Where(follow => follow.Follower == user);
            followees.ToList().ForEach(follow => {
                allPosts.ToList().ForEach(post => {
                    if(post.Poster == follow.Followee) {
                        posts.Add(post);
                    }
                });
            });
            return posts;
        }

        [HttpPut("{username}")]
        public async Task<ActionResult> PutUser(string username, [FromBody] ChangeUserInfoDto changeUserInfoDto)
        {
            var user = _userManager.Users.First(user => user.DisplayName == username);
            if(changeUserInfoDto.ImageUrl != "null") {
                user.Image = changeUserInfoDto.ImageUrl;
            }
            if(changeUserInfoDto.Bio != "null") {
                user.Bio = changeUserInfoDto.Bio;
            }
            await _userManager.UpdateAsync(user);
            return NoContent();
        }
    }
}