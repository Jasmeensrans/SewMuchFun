using System;
using System.Collections.Generic;
using System.Linq;
using API.Models;
using System.Threading.Tasks;

namespace API.Services
{
    public interface IPhotoService
    {
        Task<Photo> Add(IFormFile File);

        Task Delete(string id);
        
    }
}