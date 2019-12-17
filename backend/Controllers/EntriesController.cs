using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BioField.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace BioField.Controllers
{
    public class EntriesController : Controller
    {
        private readonly BioFieldContext _db;

        public EntriesController(BioFieldContext db)
        {
            _db = db;
        }
        [HttpGet("/entries/index")]
        public ActionResult Index()
        {
            List<Entries> model = _db.Entries.ToList();
            return View(model);
        }

        [Authorize]
        [HttpGet("/entries/create")]
        public ActionResult Create()
        {
            ViewBag.JournalId = new SelectList(_db.Journals, "JournalId", "Name");
            return View();
        }

        [HttpPost]
        public ActionResult Create(Entries entry)
        {
            _db.Entries.Add(entry);
            _db.SaveChanges();
            return RedirectToAction("Index");
        }
        
        [HttpGet("/entry/info/{id}")]
        public ActionResult Info(int id)
        {
            var thisEntry = _db.Entries
            .FirstOrDefault(entry => entry.EntriesId == id);
            return View(thisEntry);
        }
        [HttpGet("/entry/edit/{id}")]
        public ActionResult Edit(int id)
        {
            var thisEntry = _db.Entries.FirstOrDefault(entry => entry.EntriesId == id);
            ViewBag.JournalId = new SelectList(_db.Journals, "JournalId", "Name");
            return View(thisEntry);
        }
        [HttpPost]
        public ActionResult Edit(Entries entry)
        {
            _db.Entry(entry).State = EntityState.Modified;
            _db.SaveChanges();
            return RedirectToAction("Index");
        }
        [HttpGet("/entry/delete/{id}")]
        public ActionResult Delete(int id)
        {
            var thisEntry = _db.Entries.FirstOrDefault(entry => entry.EntriesId == id);
            return View(thisEntry);
        }

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            var thisEntry = _db.Entries.FirstOrDefault(entry => entry.EntriesId == id);
            _db.Entries.Remove(thisEntry);
            _db.SaveChanges();
            return RedirectToAction("Index");
        }
    }
}