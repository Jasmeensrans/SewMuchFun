using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Images;
using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Services
{
    public class PhotoService: IPhotoService
    {
        private readonly IPhotoAccessor _photo;

        private readonly DataContext _context;

        // private readonly photo context ???


        public PhotoService(IPhotoAccessor photo, DataContext context)
        {
            _photo = photo;
            _context = context;
        }
        public async Task<Photo> Add(IFormFile File)
        {
            var photoUploadResult = await _photo.AddPhoto(File);
            
            var photo = new Photo
            {
                Url = photoUploadResult.Url,
                Id = photoUploadResult.PublicId
            };
            _context.Photos.Add(photo);
            await _context.SaveChangesAsync();
            return photo;
        }

        public async Task Delete(string id){
            var photo = await _context.Photos.FindAsync(id);
            var pid = photo.Id;
            _context.Remove(photo);
            var item = _context.Posts.Where(i=>i.PhotoId == pid).Single();
            item.PhotoId = "";
            item.PhotoUrl = "";
            // deleting from photo table?
            var result = await _photo.DeletePhoto(pid);
            await _context.SaveChangesAsync();
        }
    }
}