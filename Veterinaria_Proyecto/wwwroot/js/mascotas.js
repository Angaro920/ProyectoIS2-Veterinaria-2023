const SERVER_NAME = "https://localhost:44368/api"

console.log("Script Cargado")

const tableElement = document.getElementById("petsTable")
const agregarButton = document.getElementById("agregarButton");
const eliminarButton = document.getElementById("eliminarButton");
const actualizarButton = document.getElementById("actualizarButton");

function obtenerId(idMascota) {
    sessionStorage.setItem("idMascotaObtenido", idMascota);
}

function obtenerMascota(nombre, tipoMascota, raza, cliente) {
    document.getElementById("nombreMascotaMostrar").setAttribute('value', nombre);
    document.getElementById("tipoMascotaMostrar").setAttribute('value', tipoMascota);
    document.getElementById("razaMascotaMostrar").setAttribute('value', raza);
    document.getElementById("clienteMascotaMostrar").setAttribute('value', cliente);

};

eliminarButton.addEventListener("click", () => {
    const idMascota = sessionStorage.getItem("idMascotaObtenido");
    fetch(SERVER_NAME + "/Mascota/Eliminar/" + idMascota, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
    }).then(response => response.json()).then(result => window.location.replace("https://localhost:44326/Dashboard/Pets")).catch(error => console.log(error));

});

agregarButton.addEventListener("click", () => {

    const nombre = document.getElementById("nombreMascota").value;
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


actualizarButton.addEventListener("click", () => {

    const idMascota = sessionStorage.getItem("idMascotaObtenido");
    const nombre = document.getElementById("nombreMascotaActualizado").value;
    const cliente = parseInt(document.getElementById("clienteMascotaActualizado").value);
    const raza = parseInt(document.getElementById("razaMascotaActualizado").value);
    const tipoMascota = parseInt(document.getElementById("tipoMascotaActualizado").value);
    const fkIdEstado = parseInt(document.getElementById("estadoMascotaActualizado").value);

    const Cliente = {
        nombre: nombre,
        fkIdcliente: cliente,
        fkIdraza: raza,
        fkIdtipoMascota: tipoMascota,
        fkIdEstado: fkIdEstado
    };
    fetch(SERVER_NAME + "/Mascota/Actualizar/" + idMascota, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(Cliente),
    }).then(response => response.json()).then(result => window.location.replace("https://localhost:44326/Dashboard/Pets")).catch(error => console.log(error));

});

fetch(SERVER_NAME + "/Mascota/Lista")
    .then(response => response.json())
    .then(Mascota => {
        Mascota.forEach(user => {
            const row = document.createElement("tr");

            const clientsRows = `<td>
                     <img src="https://img.icons8.com/color/48/null/dog.png" alt="">
                     <h5 class="modal-title">${user.nombre}</h5>
                     <span class="user-subhead">${user.tipoMascota.nombre}</span>
                     </td>
                        <td>
                           <span>${user.cliente.nombre}</span>
                        </td>
                                            <td>${user.raza.nombre}</td>
                                            <td>
                                                    ${user.estado.nombre === "Inactivo" ?
                `<span class="badge bg-danger">${user.estado.nombre}</span>` :
                `<span class="badge bg-success">${user.estado.nombre}</span>`
                                                 }
                                            </td>
                                            <td style="width: 20%;">
                                                <a href="" data-bs-toggle="modal" data-bs-target="#modalMostrar"
                                                   class="table-link  text-warning">

                                                    <span class="fa-stack" data-bs-toggle="tooltip" onclick="obtenerMascota('${user.nombre}','${user.tipoMascota.nombre}','${user.raza.nombre}','${user.cliente.nombre}')" title="Mostrar">
                                                        <i class="fa fa-square fa-stack-2x"></i>
                                                        <i class="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                                                    </span>
                                                </a>
                                                <a href="#" data-bs-toggle="modal" data-bs-target="#modalModificar"
                                                   class="table-link  text-info">
                                                    <span class="fa-stack" data-bs-toggle="tooltip" onclick="obtenerId(${user.idMascota})" title="Editar">
                                                        <i class="fa fa-square fa-stack-2x"></i>
                                                        <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                                    </span>
                                                </a>
                                                <a href="#" data-bs-toggle="modal" data-bs-target="#modalEliminar"
                                                   class="table-link danger">
                                                    <span class="fa-stack" data-bs-toggle="tooltip" onclick="obtenerId(${user.idMascota})" title="Eliminar">
                                                        <i class="fa fa-square fa-stack-2x"></i>
                                                        <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                                    </span>
                                                </a>
                                            </td>`;
            row.innerHTML = clientsRows;
            tableElement.appendChild(row);
        });

    }).catch(error => console.error(error));