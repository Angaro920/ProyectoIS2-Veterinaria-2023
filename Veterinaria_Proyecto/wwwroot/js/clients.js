const SERVER_NAME = "https://localhost:44368/api";
console.log("Script Cargado");

const tableElement = document.getElementById("usersTable");
const agregarButton = document.getElementById("agregarButton");
const eliminarButton = document.getElementById("eliminarButton");
const actualizarButton = document.getElementById("actualizarButton");


function obtenerId(idCliente) {
    sessionStorage.setItem("idClienteObtenido", idCliente);
}

function obtenerCliente(nombre,cedula,celular,email) {
    document.getElementById("nombreMostrar").setAttribute('value', nombre);
    document.getElementById("cedulaMostrar").setAttribute('value', cedula);
    document.getElementById("celularMostrar").setAttribute('value', celular);
    document.getElementById("emailMostrar").setAttribute('value', email);

};


eliminarButton.addEventListener("click", () => {
    const idCliente = sessionStorage.getItem("idClienteObtenido");
    fetch(SERVER_NAME + "/Cliente/Eliminar/" + idCliente, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
    }).then(response => response.json()).then(result => window.location.replace("https://localhost:44326/Dashboard/Clients")).catch(error => console.log(error));

});

actualizarButton.addEventListener("click", () => {

    const idCliente = sessionStorage.getItem("idClienteObtenido");
    const nombre = document.getElementById("nombreActualizado").value;
    const celular = parseInt(document.getElementById("celularActualizado").value);
    const cedula = parseInt(document.getElementById("cedulaActualizado").value);
    const correo = document.getElementById("emailActualizado").value;
    const fkIdEstado = parseInt(document.getElementById("estadoActualizado").value);

    const Cliente = {
        nombre: nombre,
        cedula: cedula,
        correo: correo,
        celular: celular,
        fkIdEstado: fkIdEstado
    };
    fetch(SERVER_NAME + "/Cliente/Actualizar/" + idCliente, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(Cliente),
    }).then(response => response.json()).then(result => window.location.replace("https://localhost:44326/Dashboard/Clients")).catch(error => console.log(error));

});


agregarButton.addEventListener("click", () => {

    const nombre = document.getElementById("nombreCliente").value;
    const celular = parseInt(document.getElementById("celularCliente").value);
    const cedula = parseInt(document.getElementById("cedulaCliente").value);
    const correo = document.getElementById("emailCliente").value;

    const Cliente = {
        nombre: nombre,
        cedula: cedula,
        correo: correo,
        celular: celular,
        fkIdEstado: 1
    };
    console.log(Cliente);
    fetch(SERVER_NAME + "/Cliente/Guardar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(Cliente),
    }).then(response => response.json()).then(result => window.location.replace("https://localhost:44326/Dashboard/Clients")).catch(error => console.log(error));
});

fetch(SERVER_NAME + "/Cliente/Lista")
    .then(response => response.json())
    .then(clients => {
        clients.forEach(user => {
            const row = document.createElement("tr");

            const clientsRows = `
        <td>
          <img src="https://bootdey.com/img/Content/user_1.jpg" alt="">
          <h5 class="modal-title">${user.nombre}</h5>
          <span class="user-subhead">${user.celular}</span>
        </td>
        <td>
          <span>${user.cedula}</span>
        </td>
        <td class="text-center">${user.correo}</td>
        
        <td>
        ${user.estado.nombre === "Inactivo" ?
                    `<span class="badge bg-danger">${user.estado.nombre}</span>` :
                    `<span class="badge bg-success">${user.estado.nombre}</span>`
                }
        </td>
        <td style="width: 20%;">
          <a href="" data-bs-toggle="modal" data-bs-target="#modalMostrar"  class="table-link text-warning">
            <span class="fa-stack" data-bs-toggle="tooltip" onclick="obtenerCliente('${user.nombre}','${user.cedula}','${user.celular}','${user.correo}')" title="Mostrar">
              <i class="fa fa-square fa-stack-2x"></i>
              <i class="fa fa-search-plus fa-stack-1x fa-inverse"></i>
            </span>
          </a>
          <a href="#" data-bs-toggle="modal" data-bs-target="#modalModificar" class="table-link text-info">
            <span class="fa-stack" data-bs-toggle="tooltip" onclick="obtenerId(${user.idCliente})" title="Editar">
              <i class="fa fa-square fa-stack-2x"></i>
              <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
            </span>
          </a>
          <a href="#" data-bs-toggle="modal" data-bs-target="#modalEliminar" class="table-link danger">
            <span class="fa-stack" data-bs-toggle="tooltip" onclick="obtenerId(${user.idCliente})" title="Eliminar">
              <i class="fa fa-square fa-stack-2x"></i>
              <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
            </span>
          </a>
        </td>
        `;

            row.innerHTML = clientsRows;
            tableElement.appendChild(row);
        });

    }).catch(error => console.error(error));