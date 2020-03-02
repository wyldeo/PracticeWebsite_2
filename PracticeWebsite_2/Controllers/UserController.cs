using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PracticeWebsite_2.Models;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PracticeWebsite_2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        
        // GET user/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            var user = new User();

            using (var db = new UserContext())
            {
                try
                {
                    user = db.User.Single(user => user.id == id);
                }
                catch { return null; }
            }

            return user;
        }

        [HttpGet("all")]
        public User[] GetAll()
        {
            using (var db = new UserContext())
            {
                return db.User.ToArray();
            }
        }

        // POST user
        [HttpPost]
        public void Post([FromBody]Object value)
        {
            var user = JsonConvert.DeserializeObject<User>(value.ToString());

            addUser(user);
        }

        // PUT user/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Object value)
        {
            var user = JsonConvert.DeserializeObject<User>(value.ToString());
            
            using (var db = new UserContext())
            {
                // Check the database for the user to update
                var dbUser = db.User.SingleOrDefault(user => user.id == id);

                if (dbUser == null) 
                {
                    // No need to update, just insert
                    addUser(user);
                    return;
                }

                // Update
                dbUser.firstName = user.firstName;
                dbUser.lastName = user.lastName;
                dbUser.email = user.email;
                dbUser.mobileNumber = user.mobileNumber;
                dbUser.dateOfBirth = user.dateOfBirth;
                dbUser.modified = user.modified;

                try
                {
                    db.SaveChanges();
                } catch
                {
                    //Catch invalid length/datatype exception here
                }
            }
        }

        // DELETE user/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            using (var db = new UserContext())
            {
                var user = new User { id = id };
                db.User.Attach(user);

                try
                {
                    db.User.Remove(user);
                    db.SaveChanges();
                } catch { }
            }
        }

        private void addUser(User user)
        {
            using (var db = new UserContext())
            {
                try
                {
                    db.Add(user);
                    db.SaveChanges();
                } catch
                {
                    //Catch invalid length/datatype exception here
                }
                
            }
        }
    }
}
