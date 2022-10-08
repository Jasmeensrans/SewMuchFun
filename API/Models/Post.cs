using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Models
{

    public class Post
    {
        public int Id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public int likes { get; set; }
        public string author { get; set; }
        public string PhotoId { get; set; }
        public string PhotoUrl { get; set; }
        public string UserId {get; set;}
        public User Poster {get;set;}
    }
}