using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class FollowDto
    {
        public string follower { get; set; }
        public string followee { get; set; }
    }
}