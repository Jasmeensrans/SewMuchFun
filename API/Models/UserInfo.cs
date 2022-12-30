using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Models
{
    public class UserInfo
    {
        public string Username { get; set; }
        public string Bio { get; set; }
        public ICollection<Post> Posts { get; set; }
        public int Followers { get; set; }
        public int Following { get; set; }
        public bool Followed { get; set; }
        public string Image { get; set; }
    }
}