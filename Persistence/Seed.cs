using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Activities.Any()) return;
            
            var activities = new List<activity>
            {
                new activity
                {
                    Title = "Past activity 1",
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "activity 2 months ago",
                    Category = "drinks",
                    City = "London",
                    Venue = "Pub",
                },
                new activity
                {
                    Title = "Past activity 2",
                    Date = DateTime.Now.AddMonths(-1),
                    Description = "activity 1 month ago",
                    Category = "culture",
                    City = "Paris",
                    Venue = "Louvre",
                },
                new activity
                {
                    Title = "Future activity 1",
                    Date = DateTime.Now.AddMonths(1),
                    Description = "activity 1 month in future",
                    Category = "culture",
                    City = "London",
                    Venue = "Natural History Museum",
                },
                new activity
                {
                    Title = "Future activity 2",
                    Date = DateTime.Now.AddMonths(2),
                    Description = "activity 2 months in future",
                    Category = "music",
                    City = "London",
                    Venue = "O2 Arena",
                },
                new activity
                {
                    Title = "Future activity 3",
                    Date = DateTime.Now.AddMonths(3),
                    Description = "activity 3 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Another pub",
                },
                new activity
                {
                    Title = "Future activity 4",
                    Date = DateTime.Now.AddMonths(4),
                    Description = "activity 4 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Yet another pub",
                },
                new activity
                {
                    Title = "Future activity 5",
                    Date = DateTime.Now.AddMonths(5),
                    Description = "activity 5 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Just another pub",
                },
                new activity
                {
                    Title = "Future activity 6",
                    Date = DateTime.Now.AddMonths(6),
                    Description = "activity 6 months in future",
                    Category = "music",
                    City = "London",
                    Venue = "Roundhouse Camden",
                },
                new activity
                {
                    Title = "Future activity 7",
                    Date = DateTime.Now.AddMonths(7),
                    Description = "activity 2 months ago",
                    Category = "travel",
                    City = "London",
                    Venue = "Somewhere on the Thames",
                },
                new activity
                {
                    Title = "Future activity 8",
                    Date = DateTime.Now.AddMonths(8),
                    Description = "activity 8 months in future",
                    Category = "film",
                    City = "London",
                    Venue = "Cinema",
                }
            };

            await context.Activities.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}