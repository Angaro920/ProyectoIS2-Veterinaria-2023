using Microsoft.AspNetCore.Mvc;

namespace Veterinaria_Proyecto.Controllers
{
    public class DashboardSUController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
