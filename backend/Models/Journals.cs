using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace BioField.Models
    {
        public class Journals
        {
            public Journals()
            {
                this.Entries = new HashSet<Entries>();
            }

            public int JournalsId {get; set;}
            public int UserId {get; set;}
            public string Name {get; set;}
            public virtual ApplicationUser User {get; set;}
            public virtual ICollection<Entries> Entries {get; set;}
        }
    }