using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace API.Models
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
           
            base.OnModelCreating(builder);
            builder.Entity<Post>().HasKey(k => k.Id);
            builder.Entity<Post>().HasOne(u=>u.Poster).WithMany(u =>u.Posts).HasForeignKey(u => u.UserId).HasPrincipalKey(u=> u.Id);
            builder.Entity<User>().HasMany(e => e.Posts).WithOne(e => e.Poster);
            builder.Entity<Follow>()                                           
            .HasKey(k => new { k.FollowerId, k.FolloweeId });

            builder.Entity<Follow>()                                            
            .HasOne(u => u.Followee)
            .WithMany( u => u.Follower)
            .HasForeignKey(u => u.FollowerId);
    

            builder.Entity<Follow>()                                            
            .HasOne(u => u.Follower)
            .WithMany( u => u.Followee)
            .HasForeignKey(u => u.FolloweeId);
            

            builder.Entity<User>().HasMany(e => e.Followee).WithOne(e => e.Follower);
            builder.Entity<User>().HasMany(e => e.Follower).WithOne(e=> e.Followee);
        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<Photo> Photos {get; set;}
        public DbSet<Follow> Follows { get; set; }        
    }
}