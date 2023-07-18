// Obtener referencias a los elementos HTML necesarios
const preguntas = document.querySelectorAll('.flex.flex-col.px-4.py-6.mb-3.border.rounded-lg.shadow');
const botonesRespuesta = document.querySelectorAll('.flex.flex-col.px-4.py-6.mb-3.border.rounded-lg.shadow button');
const botonesSiguiente = document.querySelectorAll('.flex.justify-end button');
const resultadoFinal = document.querySelector('.flex.flex-col.px-4.py-6.text-center.bg-green-600.border.rounded-lg.shadow');
const botonEmpezarDeNuevo = document.querySelector('.flex.justify-end.mt-10 button');

// Variables para controlar el estado y el puntaje
let preguntaActual = 0;
let puntaje = 0;
let mostrarResultado = false;

// Función para mostrar la pregunta actual y ocultar las demás
function mostrarPreguntaActual() {
  preguntas.forEach((pregunta, index) => {
    if (index === preguntaActual) {
      pregunta.classList.remove('hidden');
    } else {
      pregunta.classList.add('hidden');
    }
  });
}

// Función para manejar la selección de una respuesta
function seleccionarRespuesta(e) {
  const botonSeleccionado = e.target;
  const respuestas = preguntas[preguntaActual].querySelectorAll('button');

  // Desactivar todos los botones de respuesta de la pregunta actual
  respuestas.forEach((boton) => {
    boton.disabled = true;
  });

  // Marcar la respuesta seleccionada como correcta o incorrecta
  if (botonSeleccionado.classList.contains('text-white.border.border-green-600.bg-green-600')) {
    botonSeleccionado.classList.add('respuesta-correcta-seleccionada');
    puntaje += 2;
  } else {
    botonSeleccionado.classList.add('respuesta-incorrecta-seleccionada');
  }

  // Habilitar el botón de siguiente pregunta
  botonesSiguiente[preguntaActual].disabled = false;
}

// Función para manejar el evento del botón de siguiente pregunta
function avanzarPregunta() {
  // Ocultar la pregunta actual
  preguntas[preguntaActual].classList.add('hidden');

  // Aumentar el índice de la pregunta actual
  preguntaActual++;

  // Mostrar la siguiente pregunta si aún hay preguntas restantes
  if (preguntaActual < preguntas.length) {
    mostrarPreguntaActual();
  } else {
    // Mostrar el resultado final si se ha completado todas las preguntas
    if (mostrarResultado) {
      mostrarResultadoFinal();
    }
  }
}

// Función para mostrar el resultado final
function mostrarResultadoFinal() {
  // Ocultar todas las preguntas
  preguntas.forEach((pregunta) => {
    pregunta.classList.add('hidden');
  });

  // Mostrar el resultado final y el puntaje solo después de responder a la pregunta 3
  if (preguntaActual === preguntas.length) {
    resultadoFinal.classList.remove('hidden');
    resultadoFinal.querySelector('p:nth-child(3)').textContent = `Y este es tu puntaje: ${puntaje}`;

    // Verificar el puntaje y mostrar si ganaste o perdiste
    const mensajeResultado = resultadoFinal.querySelector('p:nth-child(1)');
    if (puntaje === 0 || puntaje === 2) {
      mensajeResultado.textContent = '¡PERDISTE!';
    } else {
      mensajeResultado.textContent = '¡GANASTE!';
    }
  }
}

// Función para reiniciar la página
function reiniciarPagina() {
  location.reload(); // Recarga la página
}

// Mostrar la primera pregunta y ocultar las demás
mostrarPreguntaActual();

// Agregar eventos a los botones de respuesta, de siguiente pregunta y de empezar de nuevo
botonesRespuesta.forEach((boton) => {
  boton.addEventListener('click', seleccionarRespuesta);
});

botonesSiguiente.forEach((boton) => {
  boton.addEventListener('click', avanzarPregunta);
});

botonEmpezarDeNuevo.addEventListener('click', reiniciarPagina);

// Agregar evento al botón de "Mostrar resultados"
botonesSiguiente[botonesSiguiente.length - 1].addEventListener('click', () => {
  mostrarResultado = true;
  avanzarPregunta();
});

// Mover el resultado final al final después de la pregunta 3
preguntas[preguntas.length - 1].insertAdjacentElement('afterend', resultadoFinal);
