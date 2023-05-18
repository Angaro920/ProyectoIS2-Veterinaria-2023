const SERVER_NAME = "https://localhost:44368/api"

const tableElement = document.getElementById("productsTable")

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
                                                        <span class="fa-stack" data-bs-toggle="tooltip" title="Editar">
                                                            <i class="fa fa-square fa-stack-2x"></i>
                                                            <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                                        </span>
                                                    </a>
                                                    <a href="#" data-bs-toggle="modal" data-bs-target="#modalEliminar"
                                                       class="table-link danger">
                                                        <span class="fa-stack" data-bs-toggle="tooltip" title="Eliminar">
                                                            <i class="fa fa-square fa-stack-2x"></i>
                                                            <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                                        </span>
                                                    </a>
                                                </td>`;

            row.innerHTML = clientsRows;
            tableElement.appendChild(row);
        });

    }).catch(error => console.error(error));