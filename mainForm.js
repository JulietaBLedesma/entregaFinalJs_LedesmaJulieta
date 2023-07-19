
const myForm = document.querySelector("#myForm");




if (myForm) {
  myForm.addEventListener('submit', function(event) {
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

    // Validaciones
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

    // Si todas las validaciones son correctas, mostrar los datos ingresados en una Sweet Alert y renderizarlos en pantalla
    Swal.fire('Verificar si los datos ingresados son correctos:\n\n' +
      'Nombre: ' + name + '\n' +
      'Email: ' + email + '\n' +
      'Dirección: ' + address + '\n' +
      'Celular: ' + celular + '\n' +
      'Ciudad: ' + city + '\n' +
      'Tipo de mate: ' + mateType + '\n' +
      'Link de imagen: ' + imageLink
    ).then(() => {
     

      // Enviar el formulario
      document.querySelector("#myForm").submit();
    });
  });
}
;

// Función para validar el formato del email
function isValidEmail(email) {
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
return emailPattern.test(email);
}