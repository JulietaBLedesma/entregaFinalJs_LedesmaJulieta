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
    carrito.splice(productoIndex, 1);
    totalCompra -= carrito[productoIndex].precio;
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
  }
};

const actualizarCarrito = () => {
  carritoContainer.innerHTML = "";
  const carritoCuadro = document.querySelector("#carrito");
  carrito.forEach((prod) => {
    const prodHTML = document.createElement("div");
    prodHTML.classList.add("carrito-item");
    prodHTML.innerHTML = `
    
      <div class="carrito-container">
  <div>
    <h5>${prod.nombre}</h5>
    <p>$ ${prod.precio}</p>
  </div>
  <button class="btn-eliminar" style="background-color: rgb(80, 244, 159)" data-producto-id="${prod.id}"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
</svg></span></button>
  <button id="btn-vaciar-carrito" class="btn btn-danger" style="background-color: rgb(80, 244, 159)";">Vaciar</button>
</div>
    `;
    
    const botonEliminar = prodHTML.querySelector(".btn-eliminar");
    botonEliminar.addEventListener("click", () => {
      const productoId = prod.id;
      eliminarDelCarrito(productoId);
    });

    carritoContainer.appendChild(prodHTML);
  });
  
  mostrarTotalCompra();

  
  if (carrito.length > 0) {
    const btnVaciarCarrito = document.createElement("button");
    btnVaciarCarrito.id = "btn-vaciar-carrito";
    btnVaciarCarrito.classList.add( "btn-danger");
    btnVaciarCarrito.style.backgroundColor = "green";
    btnVaciarCarrito.textContent = "Vaciar";
    btnVaciarCarrito.addEventListener("click", vaciarCarrito);
    carritoContainer.appendChild(btnVaciarCarrito);
  }
};

const mostrarTotalCompra = () => {
  const totalCompraHTML = document.querySelector("#total-compra");
  totalCompraHTML.textContent = `$ ${totalCompra}`;
  const btnVaciarCarrito = document.querySelector("#btn-vaciar-carrito");
  btnVaciarCarrito.addEventListener("click", vaciarCarrito);
};

const vaciarCarrito = () => {
  carrito = [];
  totalCompra = 0;
  actualizarCarrito();
  guardarCarritoEnLocalStorage();
};




const infoProd = async () => {
  try {
    const response = await fetch("data.json");
    const productos = await response.json();
    console.log(productos);

    productos.forEach((prod) => {
      const prodHTML = document.createElement("div");
      prodHTML.classList.add("col", "col-md-3");
      prodHTML.innerHTML = `
      
        <div class="card" style="width: 18rem;">
          <img src="${prod.imagen}" class="card-img-top" alt="imagenMate">
          <div class="card-body">
            <h5 class="card-title">${prod.nombre}</h5>
            <p class="card-text">$ ${prod.precio}</p>
            <a href="#" style="background-color: rgb(80, 244, 159)" class="btn btn-primary">Añadir</a>
          </div>
        </div></div>
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




// Validar formulario
document.querySelector('#myForm').addEventListener('submit', function(event) {
  // Prevenir el envío del formulario para realizar validaciones personalizadas
  event.preventDefault();
  
  
  const name = document.querySelector('#inputName').value.trim();
  const email = document.querySelector('#inputEmail').value.trim();
  const address = document.querySelector('#inputAddress').value.trim();
  const celular = document.querySelector('#inputCelular').value.trim();
  const city = document.querySelector('#inputCity').value.trim();
  const mateType = document.querySelector('#inputTipe').value.trim();
  const imageLink = document.querySelector('#inputImageLink').value.trim();
  const isRobot = document.querySelector('#gridCheck').checked;

  // validaciones
  if (name === '') {
    Swal.fire('Por favor ingresa tu nombre');
    return;
  }

  if (!isValidEmail(email)) {
    Swal.fire('Por favor, ingresa un email válido.');
    return;
  }

  if (address === '') {
    Swal.fire('Por favor, ingresa tu dirección.');
    return;
  }

  if (isNaN(celular) || celular.length !== 10) {
    Swal.fire('Por favor, ingresa un número de celular válido.');
    return;
  }

  if (city === '') {
    Swal.fire('Por favor, ingresa tu ciudad.');
    return;
  }

  if (mateType === 'Deslizá y seleccioná el tipo') {
    Swal.fire('Por favor, selecciona un tipo de mate.');
    return;
  }

  if (imageLink === '') {
    Swal.fire('Por favor, ingresa el link del dibujo de tu mate.');
    return;
  }

  if (!isRobot) {
    Swal.fire('Por favor, verifica que no eres un robot.');
    return;
  }

  // Si todas las validaciones son correctas, enviar el formulario
  this.submit();
});

// Función para validar el formato del email
function isValidEmail(email) {
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailPattern.test(email);
}

  
  console.log ("myForm") 

  
 


    
    
 


