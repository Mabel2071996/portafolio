var items = document.getElementsByClassName('redes__item');
var posX = 0;
var speedX = 2;
var animationFrameId;

// Agregar event listeners a los elementos
for (var i = 0; i < items.length; i++) {
  items[i].addEventListener('mouseover', handleMouseOver);
}

function handleMouseOver() {
    cancelAnimationFrame(moveItems); // Detener el movimiento de los elementos
    this.addEventListener('click', handleItemClick); // Agregar event listener para el clic en el elemento
  }

function handleItemClick() {
    // Obtener el enlace del elemento (puedes personalizar esta parte según tu estructura HTML)
    var link = this.querySelector('a');
  
    if (link) {
      link.click(); // Simular el clic en el enlace
    }
  }

function moveItems() {
  posX -= speedX;

  for (var i = 0; i < items.length; i++) {
    items[i].style.left = posX + 'px';

    // Reiniciar posición cuando el elemento sale completamente de la ventana
    if (posX + items[i].offsetWidth < 0) {
      posX = window.innerWidth;
    }
  }

  animationFrameId = requestAnimationFrame(moveItems);
}

moveItems();

function enviarFormulario(event) {
  event.preventDefault(); // Evita el envío del formulario predeterminado

  // Variables con los valores del formulario
  var nombre = document.form.nombre.value;
  var email = document.form.email.value;
  var asunto = document.form.asunto.value;
  var mensaje = document.form.mensaje.value;

  // Configuración de EmailJS
  var serviceID = 'service_jq286dd'; // Reemplaza con tu User Service ID
  var templateID = 'Ttemplate_af19hff'; // Reemplaza con tu Template ID
  var userID = 'TpgV5JmqWeOW1GNiz0'; // Reemplaza con tu User ID

  // Envío del correo electrónico utilizando EmailJS
  emailjs.send(serviceID, templateID, {
    to_name: nombre,
    from_name: email,
    subject: asunto,
    message: mensaje
  }, userID)
    .then(function (response) {
      // Éxito al enviar el correo electrónico
      console.log('Correo enviado:', response);
      alert('Mensaje enviado correctamente. ¡Gracias!');
      document.form.reset(); // Restablece el formulario después de enviarlo
    }, function (error) {
      // Error al enviar el correo electrónico
      console.error('Error al enviar el correo electrónico:', error);
      alert('Ocurrió un error al enviar el mensaje. Por favor, inténtalo nuevamente.');
    });
}
