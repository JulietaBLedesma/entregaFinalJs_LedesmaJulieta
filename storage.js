
const guardarCarritoEnLocalStorage = () => {
  let carritoJson = JSON.stringify(carrito);
  localStorage.setItem('carrito', carritoJson);
};

const cargarCarritoDesdeLocalStorage = () => {
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    totalCompra = calcularTotalCompra();
    actualizarCarrito();
  }
};

