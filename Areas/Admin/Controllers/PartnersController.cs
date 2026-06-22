using Conference_projekt.Data;
using Conference_projekt.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Conference_projekt.Areas.Admin.Controllers;

[Area("Admin")]
[Authorize]
public class PartnersController : Controller
{
    private readonly ApplicationDbContext _context;

    public PartnersController(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index()
    {
        var partners = await _context.Partners
            .OrderBy(p => p.DisplayOrder)
            .ThenBy(p => p.Name)
            .ToListAsync();

        return View(partners);
    }

    public async Task<IActionResult> Details(int? id)
    {
        if (id == null) return NotFound();

        var partner = await _context.Partners
            .FirstOrDefaultAsync(p => p.Id == id);

        if (partner == null) return NotFound();

        return View(partner);
    }

    public IActionResult Create()
    {
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create([Bind("Name,Description,WebsiteUrl,LogoPath,DisplayOrder")] Partner partner)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState
                .Where(x => x.Value?.Errors.Count > 0)
                .SelectMany(x => x.Value!.Errors.Select(e => $"{x.Key}: {e.ErrorMessage}"))
                .ToList();

            ViewBag.DebugErrors = errors;
            return View(partner);
        }

        _context.Partners.Add(partner);
        await _context.SaveChangesAsync();

        TempData["Success"] = $"Dodano partnera: {partner.Name}";
        return RedirectToAction(nameof(Index));
    }

    public async Task<IActionResult> Edit(int? id)
    {
        if (id == null) return NotFound();

        var partner = await _context.Partners.FindAsync(id);

        if (partner == null) return NotFound();

        return View(partner);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Description,WebsiteUrl,LogoPath,DisplayOrder")] Partner partner)
    {
        if (id != partner.Id) return NotFound();

        if (!ModelState.IsValid)
        {
            return View(partner);
        }

        try
        {
            _context.Update(partner);
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await PartnerExists(partner.Id))
            {
                return NotFound();
            }

            throw;
        }

        TempData["Success"] = $"Zaktualizowano partnera: {partner.Name}";
        return RedirectToAction(nameof(Index));
    }

    public async Task<IActionResult> Delete(int? id)
    {
        if (id == null) return NotFound();

        var partner = await _context.Partners
            .FirstOrDefaultAsync(p => p.Id == id);

        if (partner == null) return NotFound();

        return View(partner);
    }

    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var partner = await _context.Partners.FindAsync(id);

        if (partner != null)
        {
            _context.Partners.Remove(partner);
            await _context.SaveChangesAsync();
        }

        TempData["Success"] = "Usunięto partnera.";
        return RedirectToAction(nameof(Index));
    }

    private async Task<bool> PartnerExists(int id)
    {
        return await _context.Partners.AnyAsync(p => p.Id == id);
    }
}
