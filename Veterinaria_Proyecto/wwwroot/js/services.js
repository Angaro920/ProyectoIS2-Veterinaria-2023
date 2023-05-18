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

      <div class="modal-header">
        <p class="modal-title">${product.nombre} ${product.marca}</p>
      </div>
      <img src="https://via.placeholder.com/300x200.png?text=Product+Image" id="singleViewImg">
        <div id="singleViewInfo">
          <p>${product.descripcion}</p>
          <hr/>
          <p>$${product.precio.toFixed(2)}</p>
        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
      </div> 
        
          
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
              <P class="card-tittle">${prod.nombre}</P>
              <P class="card-subtittle"> ${prod.marca}</P>
              <hr/>
              <div class="row px-2">
                <div class="col-8" id="cardPrice">
                  <p class="card-text">$${prod.precio.toFixed(2)}</p>
                </div>
                <div class="col-4" id="cardViewBttn">
                  <button class="btn btn-info show-details-btn" data-product-id="${prod.idProducto}"data-toggle="modal" data-target="#exampleModalCenter">
                  <i class="fa-sharp fa-solid fa-eye"></i>
                  </button>
                </div>
              </div>
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

// Obtener elementos del rango de precios y elementos para mostrar los valores seleccionados
const minPriceRange = document.getElementById('minPrice');
const maxPriceRange = document.getElementById('maxPrice');
const selectedMinPriceText = document.getElementById('selectedMinPriceText');
const selectedMaxPriceText = document.getElementById('selectedMaxPriceText');

// Función para formatear un número como pesos colombianos
function formatCurrency(number) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(number);
}

// Mostrar los valores iniciales
selectedMinPriceText.textContent = formatCurrency(minPriceRange.value);
selectedMaxPriceText.textContent = formatCurrency(maxPriceRange.value);

// Actualizar los valores seleccionados cuando se cambia el rango de precios
minPriceRange.addEventListener('input', () => {
  selectedMinPriceText.textContent = formatCurrency(minPriceRange.value);
});

maxPriceRange.addEventListener('input', () => {
  selectedMaxPriceText.textContent = formatCurrency(maxPriceRange.value);
});
