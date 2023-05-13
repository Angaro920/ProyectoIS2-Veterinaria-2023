const API_URL = 'https://localhost:44368/api';


function showProductDetails(productId) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const product = JSON.parse(xhr.responseText);
        // Muestra los detalles del producto en un Modal
        const modalBody = document.querySelector("#modal-body");
        console.log(modalBody);
        modalBody.innerHTML = `
          <h4>${product.nombre}</h4>
          <p>${product.descripcion}</p>
          <p>${product.marca}</p>
          <p>$${product.precio.toFixed(2)}</p>
        `;
        $('#productModal').modal('show');
      } else {
        console.error('Failed to retrieve product details:', xhr.status);
      }
    }
  };
  xhr.open('GET', `${API_URL}/Producto/${productId}`);
  xhr.send();
}

const xhr = new XMLHttpRequest();

function onRequestHandler() {
    if (this.readyState === 4 && this.status === 200) {
      // 0 = UNSET, no se ha llamado al metodo open
      // 1 = OPENED, se ha llamado al metodo open
      // 2 = HEADERS_RECEIVED, se ha llamado al metodo open
      // 3 = LOADING, se ha llamado al metodo open
      // 4 = DONE, se ha llamado al metodo open
      const data = JSON.parse(this.responseText);
      const HTMLResponse = document.querySelector("#app");
      console.log(data);
  
      const tmpl = data.map((prod) => `
      <div class="col-md-4">
          <div class="card mb-4 box-shadow">
          <img class="card-img-top" src="https://via.placeholder.com/300x200.png?text=Product+Image" alt="${prod.nombre}">
          <div class="card-body">
              <h4 class="card-title">${prod.nombre}</h4>
              <p class="card-text">${prod.descripcion}</p>
              <p class="card-text">${prod.marca}</p>
              <p class="card-text">$${prod.precio.toFixed(2)}</p>
              <button class="btn btn-primary show-details-btn" data-product-id="${prod.idProducto}"data-toggle="modal" data-target="#exampleModalCenter">Show Details</button>
          </div>
          </div>
      </div>
      `).join('');
  
      HTMLResponse.innerHTML = `<div class="row">${tmpl}</div>`;
  
      const showDetailsButtons = document.querySelectorAll('.show-details-btn');
      showDetailsButtons.forEach((button) => {
        button.addEventListener('click', () => {
          const productId = button.getAttribute('data-product-id');
          showProductDetails(productId);
        });
      });
    }
  }

xhr.addEventListener('load', onRequestHandler);
xhr.open('GET',`${API_URL}/Producto`);
xhr.send();

