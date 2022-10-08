using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class User : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public ICollection<Post> Posts {get; set;} = new List<Post>();

        public ICollection<Follow> Follower {get; set;} = new List<Follow>();

        public ICollection<Follow> Followee {get; set;} = new List<Follow>();
        

    }
}