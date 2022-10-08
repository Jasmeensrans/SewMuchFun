using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        private readonly IPhotoService _photoRepo;

        public PhotoController(IPhotoService photo)
        {
            _photoRepo = photo;
        }
        [HttpPost]
        public async Task<ActionResult<Photo>> Add([FromForm] IFormFile File)
        {
            return await _photoRepo.Add(File);     
        }
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] string id)
        {
            await _photoRepo.Delete(id);
            return StatusCode(200);
        }
    }
}