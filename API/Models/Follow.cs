using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Follow
    {
        public string FollowerId { get; set; }
        public string FolloweeId { get; set; }
        public User Follower { get; set; }
        public User Followee { get; set; }
        
    }
}