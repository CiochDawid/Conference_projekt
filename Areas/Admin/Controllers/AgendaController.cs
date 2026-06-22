using Conference_projekt.Data;
using Conference_projekt.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Conference_projekt.Areas.Admin.Controllers;

[Area("Admin")]
[Authorize]
public class AgendaController : Controller
{
    private readonly ApplicationDbContext _context;

    public AgendaController(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index()
    {
        var agendaItems = await _context.AgendaItems
            .Include(a => a.Speaker)
            .OrderBy(a => a.StartTime)
            .ToListAsync();

        return View(agendaItems);
    }

    public async Task<IActionResult> Details(int? id)
    {
        if (id == null) return NotFound();

        var agendaItem = await _context.AgendaItems
            .Include(a => a.Speaker)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (agendaItem == null) return NotFound();

        return View(agendaItem);
    }

    public IActionResult Create()
    {
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create([Bind("Title,Description,StartTime,EndTime,Location,SpeakerId")] AgendaItem agendaItem)
    {
        if (agendaItem.EndTime <= agendaItem.StartTime)
        {
            ModelState.AddModelError(nameof(agendaItem.EndTime), "Godzina zakończenia musi być późniejsza niż godzina rozpoczęcia.");
        }

        if (!ModelState.IsValid)
        {
            var errors = ModelState
                .Where(x => x.Value?.Errors.Count > 0)
                .SelectMany(x => x.Value!.Errors.Select(e => $"{x.Key}: {e.ErrorMessage}"))
                .ToList();

            ViewBag.DebugErrors = errors;
            return View(agendaItem);
        }

        _context.AgendaItems.Add(agendaItem);
        await _context.SaveChangesAsync();

        TempData["Success"] = $"Dodano punkt harmonogramu: {agendaItem.Title}";
        return RedirectToAction(nameof(Index));
    }

    public async Task<IActionResult> Edit(int? id)
    {
        if (id == null) return NotFound();

        var agendaItem = await _context.AgendaItems.FindAsync(id);

        if (agendaItem == null) return NotFound();

        return View(agendaItem);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, [Bind("Id,Title,Description,StartTime,EndTime,Location,SpeakerId")] AgendaItem agendaItem)
    {
        if (id != agendaItem.Id) return NotFound();

        if (agendaItem.EndTime <= agendaItem.StartTime)
        {
            ModelState.AddModelError(nameof(agendaItem.EndTime), "Godzina zakończenia musi być późniejsza niż godzina rozpoczęcia.");
        }

        if (!ModelState.IsValid)
        {
            return View(agendaItem);
        }

        try
        {
            _context.Update(agendaItem);
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await AgendaItemExists(agendaItem.Id))
            {
                return NotFound();
            }

            throw;
        }

        TempData["Success"] = $"Zaktualizowano punkt harmonogramu: {agendaItem.Title}";
        return RedirectToAction(nameof(Index));
    }

    public async Task<IActionResult> Delete(int? id)
    {
        if (id == null) return NotFound();

        var agendaItem = await _context.AgendaItems
            .Include(a => a.Speaker)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (agendaItem == null) return NotFound();

        return View(agendaItem);
    }

    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var agendaItem = await _context.AgendaItems.FindAsync(id);

        if (agendaItem != null)
        {
            _context.AgendaItems.Remove(agendaItem);
            await _context.SaveChangesAsync();
        }

        TempData["Success"] = "Usunięto punkt harmonogramu.";
        return RedirectToAction(nameof(Index));
    }

    private async Task<bool> AgendaItemExists(int id)
    {
        return await _context.AgendaItems.AnyAsync(a => a.Id == id);
    }
}
