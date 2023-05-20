const SERVER_NAME = "https://localhost:44368/api"

console.log("Script Cargado")

const agregarButton = document.getElementById("agregarButton");

agregarButton.addEventListener("click", () => {

    const fecha = document.getElementById("nombreMascota").value;
    const tipoMascota = parseInt(document.getElementById("tipoMascota").value);
    const raza = parseInt(document.getElementById("razaMascota").value);
    const cliente = parseInt(document.getElementById("clienteMascota").value);

    const Mascota = {
        nombre: nombre,
        fkIdcliente: cliente,
        fkIdtipoMascota: tipoMascota,
        fkIdraza: raza,
        fkIdEstado: 1
    };

    console.log(Mascota);

    fetch(SERVER_NAME + "/Mascota/Agregar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(Mascota),
    }).then(response => response.json()).then(result => window.location.replace("https://localhost:44326/Dashboard/Pets")).catch(error => console.log(error));
});