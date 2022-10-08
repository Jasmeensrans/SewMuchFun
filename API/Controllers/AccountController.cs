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
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly TokenService _tokenService;
        private readonly DataContext _context;
        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, TokenService tokenService, DataContext context)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if(user == null) return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if(result.Succeeded)
            {
                return CreateUserObject(user);
            }
            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(_userManager.Users.Any(x => x.Email == registerDto.Email))
            {
                return BadRequest("Email taken");
            }
            if(_userManager.Users.Any(x => x.DisplayName == registerDto.Username))
            {
                return BadRequest("Username taken");
            }
            var user = new User {
                DisplayName = registerDto.Username,
                Email = registerDto.Email,
                UserName = registerDto.Username
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if(result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest(result.Errors);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            return CreateUserObject(user);
        }

        [HttpPost("userInfo")]
        public async Task<ActionResult<UserInfo>> GetUserInfo([FromBody] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return NotFound();
            var followerCount = _context.Follows.Where(follow => follow.Follower == user).ToList(); // how many people they follow
            var followeeCount = _context.Follows.Where(follow => follow.Followee == user).ToList(); // how many people follow them
            var info = new UserInfo {
                Username = user.DisplayName,
                Bio = user.Bio,
                Posts = user.Posts,
                Followers = followeeCount.Count,
                Following = followerCount.Count,
            };
            return info;
        }

        [HttpPost("follow")]
        public async Task<ActionResult<User>> FollowUser([FromBody] string follower, string followee) 
        {
            // followee is the person you want to follow, follower is the person who is following
            var followeeUser = _userManager.Users.Where(user => user.DisplayName == followee).ToList()[0];
            var followerUser = _userManager.Users.Where(user => user.DisplayName == follower).ToList()[0];
            var follow = new Follow 
            {
                Followee = followeeUser,
                Follower = followerUser,
                FolloweeId = followeeUser.Id,
                FollowerId = followerUser.Id
            };
            followerUser.Followee.Add(follow);
            followeeUser.Follower.Add(follow);
            await _userManager.UpdateAsync(followeeUser);
            await _userManager.UpdateAsync(followerUser);
            return followeeUser;
        }

        [HttpPost("unfollow")]
        public async Task<ActionResult> UnfollowUser([FromBody] string followee, string follower) 
        {
            // followee is the person you want to unfollow, follower is the person who is unfollowing
            var followeeUser = _userManager.Users.Where(user => user.DisplayName == followee).ToList()[0];
            var followerUser = _userManager.Users.Where(user => user.DisplayName == follower).ToList()[0];
            var follow = _context.Follows.Where(follow => follow.FolloweeId == followeeUser.Id && follow.FollowerId == followerUser.Id).ToList()[0];

            followerUser.Followee.Remove(follow);
            followeeUser.Follower.Remove(follow);
            await _userManager.UpdateAsync(followeeUser);
            await _userManager.UpdateAsync(followerUser);
            _context.Follows.Remove(follow);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpPost("userFeed")]
        public IEnumerable<Post> getUserFeed(string username)
        {
            var user = _userManager.Users.Where(user => user.DisplayName == username).ToList()[0];
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

        private UserDto CreateUserObject(User user)
        {
            return new UserDto
            {
                Username = user.DisplayName,
                Image = null,
                Token = _tokenService.CreateToken(user),
                Email = user.Email,
            };
        }
    }
}