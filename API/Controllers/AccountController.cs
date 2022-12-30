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

        [HttpPut("{username}")]
        public async Task<ActionResult> PutUser(string username, [FromBody] ChangePasswordDto changePasswordDto)
        {

            if(username != changePasswordDto.Username)
            {
                return BadRequest();
            }
            var user = _userManager.Users.Where(user => user.DisplayName == changePasswordDto.Username).ToList()[0];
            var result = await _userManager.ChangePasswordAsync(user, changePasswordDto.OldPassword, changePasswordDto.NewPassword);
            if(result.Succeeded) {
                return NoContent();
            } else {
                return BadRequest();
            }
        }
        private UserDto CreateUserObject(User user)
        {
            return new UserDto
            {
                Username = user.DisplayName,
                Image = user.Image,
                Token = _tokenService.CreateToken(user),
                Email = user.Email,
                Bio = user.Bio,
            };
        }
    }
}