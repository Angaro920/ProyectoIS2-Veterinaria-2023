const SERVER_NAME = "https://localhost:44368/api"

const tableElement = document.getElementById("usersTable");
const agregarButton = document.getElementById("agregarButton");

agregarButton.addEventListener("click", () => {
    const nombre = document.getElementById("nombreCliente").value;
    const celular = document.getElementById("celularCliente").value;
    const cedula = document.getElementById("cedulaCliente").value;
    const correo = document.getElementById("emailCliente").value;

    const Cliente = {
        nombre: nombre,
        cedula: cedula,
        correo: correo,
        celular: celular,
        fkIdEstado: 1
    };

    fetch(SERVER_NAME + "/Cliente/Guardar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Charset": "UTF-8"
        },
        body: JSON.stringify(Cliente)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error(error));
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
          <a href="" data-bs-toggle="modal" data-bs-target="#modalMostrar" class="table-link text-warning">
            <span class="fa-stack" data-bs-toggle="tooltip" title="Mostrar">
              <i class="fa fa-square fa-stack-2x"></i>
              <i class="fa fa-search-plus fa-stack-1x fa-inverse"></i>
            </span>
          </a>
          <a href="#" data-bs-toggle="modal" data-bs-target="#modalModificar" class="table-link text-info">
            <span class="fa-stack" data-bs-toggle="tooltip" title="Editar">
              <i class="fa fa-square fa-stack-2x"></i>
              <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
            </span>
          </a>
          <a href="#" data-bs-toggle="modal" data-bs-target="#modalEliminar" class="table-link danger">
            <span class="fa-stack" data-bs-toggle="tooltip" title="Eliminar">
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