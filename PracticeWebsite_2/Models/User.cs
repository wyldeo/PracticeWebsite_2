using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PracticeWebsite_2.Models
{
    public class User
    {
        [Key]
        public int? id { get; set; }
        [StringLength(200)]
        public string firstName { get; set; }
        [StringLength(200)]
        public string lastName { get; set; }
        [StringLength(320)]
        public string email { get; set; }
        [StringLength(13)]
        public string mobileNumber { get; set; }
        public DateTime dateOfBirth { get; set; }
        public DateTime modified { get; set; }
    }
}
