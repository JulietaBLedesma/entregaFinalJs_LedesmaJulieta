
let carrito = [];
let totalCompra = 0;

// Referencias
const articulos = document.querySelector(".articulos");
const carritoContainer = document.querySelector("#carrito");


const mostrarSweetAlert = () => {
  Swal.fire({
    title: 'Producto agregado',
    text: 'El producto ha sido agregado al carrito',
    icon: 'success',
    timer: 3000,
    timerProgressBar: true,
    toast: true,
    position: 'top-end',
    showConfirmButton: false
  });
};

const agregarAlCarrito = (producto) => {
  carrito.push(producto);
  totalCompra += producto.precio;
  actualizarCarrito();
  mostrarSweetAlert();
  guardarCarritoEnLocalStorage();
};

const eliminarDelCarrito = (productoId) => {
  const productoIndex = carrito.findIndex((prod) => prod.id === productoId);
  if (productoIndex !== -1) {
    totalCompra -= carrito[productoIndex].precio;
    carrito.splice(productoIndex, 1);
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
  }
};

const actualizarCarrito = () => {
  carritoContainer.innerHTML = "";
  const carritoCuadro = document.querySelector("#carrito");
  
  
  carrito.forEach((prod) => {
    const prodHTML = document.createElement("div");
    prodHTML.classList.add("carrito-item", "carrito-container");
    prodHTML.innerHTML = `
      <div class="carrito-container">
        <div class="producto-info">
          <h5>${prod.nombre}</h5>
          <p>$ ${prod.precio}</p>
        </div>
        <button class="btn-eliminar" data-producto-id="${prod.id}">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
            </svg>
          </span>
        </button>
      </div>
    `;

    const botonEliminar = prodHTML.querySelector(".btn-eliminar");
    botonEliminar.addEventListener("click", () => {
      const productoId = prod.id;
      eliminarDelCarrito(productoId);
    });

    carritoContainer.appendChild(prodHTML);
  });

  const totalCompraHTML = document.createElement("div");
  totalCompraHTML.id = "total-compra";
  totalCompraHTML.textContent = `Total de la compra: $ ${totalCompra}`;

  carritoContainer.appendChild(totalCompraHTML);

  const btnVaciarCarrito = document.querySelector("#btn-vaciar-carrito");
  const btnFinalizarCompra = document.querySelector("#btn-finalizar-compra");
  if (carrito.length > 0) {
    if (!btnVaciarCarrito) {
      const btnVaciarCarrito = document.createElement("button");
      btnVaciarCarrito.id = "btn-vaciar-carrito";
      btnVaciarCarrito.classList.add("btn-danger", "btn-vaciar");
      btnVaciarCarrito.textContent = "Vaciar";
      btnVaciarCarrito.addEventListener("click", vaciarCarrito);
      carritoContainer.appendChild(btnVaciarCarrito);
    }
    if (!btnFinalizarCompra) {
      const btnFinalizarCompra = document.createElement("button");
      btnFinalizarCompra.id = "btn-finalizar-compra";
      btnFinalizarCompra.classList.add("btn-success", "btn-finalizar");
      btnFinalizarCompra.textContent = "Finalizar compra";
      btnFinalizarCompra.addEventListener("click", finalizarCompra);
      carritoContainer.appendChild(btnFinalizarCompra);
    }
    carritoCuadro.classList.add("carrito-visible");
  } else {
    if (btnVaciarCarrito) {
      btnVaciarCarrito.remove();
    }
    if (btnFinalizarCompra) {
      btnFinalizarCompra.remove();
    }
    carritoCuadro.classList.remove("carrito-visible");
  }
};

const mostrarTotalCompra = () => {
  const totalCompraHTML = document.querySelector("#total-compra");
  totalCompraHTML.textContent = `Total de la compra: $ ${totalCompra}`;
};

const vaciarCarrito = () => {
  carrito = [];
  totalCompra = 0;
  actualizarCarrito();
  guardarCarritoEnLocalStorage();
};

const finalizarCompra = () => {
  Swal.fire({
    title: '¡Gracias por su compra!',
    text: 'Esperamos que disfrute de sus productos',
    icon: 'success',
    confirmButtonText: 'Aceptar'
  }).then(() => {
    vaciarCarrito();
  });
};

const infoProd = async () => {
  try {
    const response = await fetch("../pages/data.json");
    const productos = await response.json();
   

    productos.forEach((prod) => {
      const prodHTML = document.createElement("div");
      prodHTML.classList.add("col", "col-md-3");
      prodHTML.innerHTML = `
        <div class="card" style="width: 18rem;">
          <img src="${prod.imagen}" class="card-img-top" alt="imagenMate">
          <div class="card-body">
            <h5 class="card-title">${prod.nombre}</h5>
            <p class="card-text">$ ${prod.precio}</p>
            <a href="#" style="background-color: #AAC8A7" class="btn btn-primary">Añadir</a>
          </div>
        </div>
      `;
      const botonAgregar = prodHTML.querySelector("a.btn");
      botonAgregar.addEventListener("click", () => {
        agregarAlCarrito(prod);
      });

      articulos.appendChild(prodHTML);
    });
  } catch (error) {
    alert(error);
  }
};

infoProd();

  
 


    
    
 


