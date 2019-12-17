using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace BioField.Models
{
    public class ApplicationUser
    {
        public ApplicationUser()
        {
            this.UserJournals = new HashSet<Journals>();
        }
        public int ApplicationUserId {get; set;}
        public string Username {get; set;}
        public string PasswordHash {get; set;}
        public string Password {get; set;}
        public string Token {get; set;}
        public virtual ICollection<Journals> UserJournals {get; set;}
    }
}