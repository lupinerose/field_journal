using Microsoft.AspNetCore.Mvc;
using BioField.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Net;

namespace BioField.Controllers
{
    [Route("[controller]")]
    public class JournalController : Controller
    {
        private readonly BioFieldContext _db;

        public JournalController(BioFieldContext db)
        {
            _db = db;
        }

        [HttpGet("[action]")]
        public List<Journals> JournalList()
        {
            List<Journals> model = _db.Journals.ToList();
            return model;
        }

        // [HttpGet("[action]")]
        // public ActionResult Create()
        // {
        //     return View();
        // }

        [HttpPost("[action]")]
        public void Create([FromBody] Journals journal)
        {
            Console.WriteLine("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
            Console.WriteLine(journal);
            Console.WriteLine("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
            _db.Journals.Add(journal);
            _db.SaveChanges();
            // return RedirectToAction("Index");
        }
        
        [HttpGet("/info/{id}")]
        public ActionResult Info(int id)
        {
            List<Entries> thisJournal = _db.Entries.Where(entry => entry.JournalsId == id).ToList();
            Console.WriteLine("----------");
            Console.WriteLine(thisJournal);
            Console.WriteLine("----------");
            return View(thisJournal);
        }

        [HttpGet("/edit/{id}")]
        public ActionResult Edit(int id)
        {
            var thisJournal = _db.Journals.FirstOrDefault(journal => journal.JournalsId == id);
            return View(thisJournal);
        }
        [HttpPost]
        public ActionResult Edit(JournalController journal)
        {
                _db.Entry(journal).State = EntityState.Modified;
                _db.SaveChanges();
                return RedirectToAction("Index");
        }
        [HttpGet("/delete/{id}")]
        public ActionResult Delete(int id)
        {
            var thisJournal = _db.Journals
             .FirstOrDefault(journal => journal.JournalsId == id);
            return View(thisJournal);
        }

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            var thisJournal = _db.Journals.FirstOrDefault(journal => journal.JournalsId == id);
            _db.Journals.Remove(thisJournal);
            _db.SaveChanges();
            return RedirectToAction("Index");
        }
    }
}