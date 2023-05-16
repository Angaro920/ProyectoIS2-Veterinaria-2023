using System.Net.Http;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System;
using Veterinaria_Proyecto.Models;

public class ClienteDataController : Controller
{
    private readonly HttpClient _httpClient;

    public ClienteDataController(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri("https://localhost:44368/api/");
    }

    public async Task<IActionResult> MostrarCliente()
    {
        var response = await _httpClient.GetAsync("Cliente");

        if (!response.IsSuccessStatusCode)
        {
            return NotFound();
        }

        var json = await response.Content.ReadAsStringAsync();
        var clientes = JsonConvert.DeserializeObject<List<TblCliente>>(json);

        return View(clientes);
    }
}