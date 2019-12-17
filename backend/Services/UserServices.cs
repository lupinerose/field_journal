using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using BioField.Helpers;
using BioField.Models;
using Microsoft.AspNetCore.Identity;

namespace BioField.Services
{
  public interface IUserService
  {
      ApplicationUser Authenticate(string username, string password);
      // IEnumerable<User> GetAll();
      void Create(ApplicationUser user);
  }
  public class UserService : IUserService
  {
    private readonly BioFieldContext _db;
    private List<ApplicationUser> _users;
    private readonly AppSettings _appSettings;

    public UserService(IOptions<AppSettings> appSettings, BioFieldContext db)
    {
      _appSettings = appSettings.Value;
      _db = db;
      _users = _db.ApplicationUser.ToList();
    }
    
    public ApplicationUser Authenticate(string username, string password)
    {
      var passwordHasher = new PasswordHasher<BioField.Models.ApplicationUser>();
      var user = _users.SingleOrDefault(x => x.Username == username);
      if (user != null && passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password) != 0)
      {
         //if authentication is successful, generate jwt token
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
          Subject = new ClaimsIdentity(new Claim[]
          {
            new Claim(ClaimTypes.Name, user.ApplicationUserId.ToString())
          }),
          Expires = DateTime.UtcNow.AddDays(7),
          SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        user.Token = tokenHandler.WriteToken(token);

        //remove password before returning
        user.PasswordHash = null;
        return user;
      } else {
        return null;
      }
    }

    public void Create(ApplicationUser newUser)
    {
      _db.ApplicationUser.Add(newUser);
      _db.SaveChanges();
    }
  }
}