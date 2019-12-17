using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using BioField.Models;
using BioField.Services;
using System.Collections.Generic;
using System.Linq;
using System;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace BioField.Controllers
{
    public class AccountController : Controller
    {
        private readonly BioFieldContext _db;
        private readonly IUserService _userService;

         public AccountController(IUserService userService, BioFieldContext db)
        {
            _userService = userService;
            _db = db;
        }

        [AllowAnonymous]
        public IActionResult Authenticate([FromBody] ApplicationUser userLoggingIn)
        {
            var user = _userService.Authenticate(userLoggingIn.Username, userLoggingIn.Password);
            if (user == null)
            return BadRequest(new { message = "Username or password is incorrect" });
            return Ok(user);
        }

        [AllowAnonymous]
        public void Create([FromBody] ApplicationUser newUser)
        {
            //only save hashed password in database
            var passwordHasher = new PasswordHasher<BioField.Models.ApplicationUser>();
            newUser.PasswordHash = passwordHasher.HashPassword(newUser, newUser.Password);
            newUser.Password = null;
            _db.ApplicationUser.Add(newUser);
            _db.SaveChanges();
        }
        
    }
}