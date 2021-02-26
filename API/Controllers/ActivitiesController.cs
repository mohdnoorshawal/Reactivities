using Domain;
using Application.Activities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<activity>>> GetAllActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        /*     [HttpGet("{id}")]
            public async Task<ActionResult<Activity>> GetActivity(Guid id)
            {
               // return await _context.Activities.FindAsync(id);
            } */
        [HttpGet("{id}")]
        public async Task<ActionResult<activity>> GetActivity(Guid id)
        {
                return await Mediator.Send(new Details.Query(id));
        }

        [HttpPost]

        public async Task<IActionResult> CreateActivity(activity activity)
        {
             return Ok(await Mediator.Send(new Create.Command{Activity = activity}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, activity activity)
        {
            activity.Id=id;
            return Ok(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command {Id=id}));
        }
    }
} 