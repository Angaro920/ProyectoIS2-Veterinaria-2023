const SERVER_NAME = "https://localhost:44368/api"

const tableElement = document.getElementById("productsTable")
const agregarButton = document.getElementById("agregarButton");
const eliminarButton = document.getElementById("eliminarButton");
const actualizarButton = document.getElementById("actualizarButton");

function obtenerId(idProducto) {
    sessionStorage.setItem("idProductoObtenido", idProducto);
}

eliminarButton.addEventListener("click", () => {
    const idProducto = sessionStorage.getItem("idProductoObtenido");
    fetch(SERVER_NAME + "/Producto/Eliminar/" + idProducto, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
    }).then(response => response.json()).then(result => window.location.replace("https://localhost:44326/Dashboard/Products")).catch(error => console.log(error));

});
actualizarButton.addEventListener("click", () => {

    const idProducto = sessionStorage.getItem("idProductoObtenido");
    const nombre = document.getElementById("nombreProductoActualizado").value;
    const marca = document.getElementById("nombreMarcaActualizado").value;
    const descripcion = document.getElementById("descripcionActualizado").value;
    const precio =  parseInt(document.getElementById("precioActualizado").value);
    const existencias = parseInt(document.getElementById("existenciasActualizado").value);

    const Cliente = {
        nombre: nombre,
        marca: marca,
        descripcion: descripcion,
        precio: precio,
        existencias: existencias
    };
    fetch(SERVER_NAME + "/Producto/Actualizar/" + idProducto, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(Cliente),
    }).then(response => response.json()).then(result => window.location.replace("https://localhost:44326/Dashboard/Products")).catch(error => console.log(error));

});

agregarButton.addEventListener("click", () => {

    const nombre = document.getElementById("nombreProducto").value;
    const marca =document.getElementById("nombreMarca").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = parseInt(document.getElementById("precio").value);
    const existencias = parseInt(document.getElementById("existencias").value);


    const Producto = {
        nombre: nombre,
        marca: marca,
        descripcion: descripcion,
        precio: precio,
        existencias: existencias
    };
    console.log(Cliente);
    fetch(SERVER_NAME + "/Cliente/Guardar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(Cliente),
    }).then(response => response.json()).then(result => window.location.replace("https://localhost:44326/Dashboard/Products")).catch(error => console.log(error));
});

fetch(SERVER_NAME + "/Producto/Lista")
    .then(response => response.json())
    .then(products => {
        products.forEach(user => {
            const row = document.createElement("tr");

            const clientsRows = `
                                                <td>
                                                    <img src="https://img.icons8.com/color/48/null/product--v1.png"
                                                         alt="">
                                                    <h5 class="modal-title">${user.nombre}</h5>
                                                    <span class="user-subhead">Tipo</span>
                                                </td>
                                                <td>
                                                    <span>${user.marca}</span>
                                                </td>
                                                <td class="text-center">${user.precio}</td>
                                                <td>
                                                    <span>${user.existencias}</span>
                                                </td>
                                                <td style="width: 20%;">
                                                    <a href="" data-bs-toggle="modal" data-bs-target="#modalMostrar"
                                                       class="table-link  text-warning">

                                                        <span class="fa-stack" data-bs-toggle="tooltip" title="Mostrar">
                                                            <i class="fa fa-square fa-stack-2x"></i>
                                                            <i class="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                                                        </span>
                                                    </a>
                                                    <a href="#" data-bs-toggle="modal" data-bs-target="#modalModificar"
                                                       class="table-link  text-info">
                                                        <span class="fa-stack" data-bs-toggle="tooltip" onclick="obtenerId(${user.idCliente})" title="Editar">
                                                            <i class="fa fa-square fa-stack-2x"></i>
                                                            <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                                        </span>
                                                    </a>
                                                    <a href="#" data-bs-toggle="modal" data-bs-target="#modalEliminar"
                                                       class="table-link danger">
                                                        <span class="fa-stack" data-bs-toggle="tooltip" onclick="obtenerId(${user.idCliente})" title="Eliminar">
                                                            <i class="fa fa-square fa-stack-2x"></i>
                                                            <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                                        </span>
                                                    </a>
                                                </td>`;

            row.innerHTML = clientsRows;
            tableElement.appendChild(row);
        });

    }).catch(error => console.error(error));