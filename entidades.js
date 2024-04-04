// Obtener el contenedor

const crearEntidadBtn = document.getElementById('botonCreateEntidad');


// Función para cargar entidades desde Local Storage
function cargarEntidades() {
  let entidadesJSON = localStorage.getItem('entidades');
  if (!entidadesJSON) {
      // Si no hay datos en el Local Storage, inicializar con un valor predeterminado
      entidadesJSON = JSON.stringify([
          {
            id: 1,
            nombre: "IBM",
            fecha_creacion: "1911-06-16",
            utilidad: "Empresa multinacional de tecnología y consultoría",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/200px-IBM_logo.svg.png",
            wiki: "https://en.wikipedia.org/wiki/IBM",
            personas_participantes: [3]
          },
          {
            id: 2,
            nombre: "CERN",
            fecha_creacion: "1954-09-29",
            utilidad: "Organización europea para la investigación nuclear",
            imagen: "https://cs3mesh4eosc.eu/sites/default/files/2021-06/CERN-Logo.png",
            wiki: "https://en.wikipedia.org/wiki/CERN",
            personas_participantes: [2]
          },
          {
            id: 3,
            nombre: "W3C",
            fecha_creacion: "1994-10-01",
            utilidad: "Consorcio para la creación de estándares web",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/W3C%C2%AE_Icon.svg/1200px-W3C%C2%AE_Icon.svg.png",
            wiki: "https://en.wikipedia.org/wiki/World_Wide_Web_Consortium",
            personas_participantes: [2]
          }
        ]
      );
      localStorage.setItem('entidades', entidadesJSON);
  }
  return JSON.parse(entidadesJSON);
}

// Función para guardar entidades en Local Storage
function guardarEntidades(entidades) {
  localStorage.setItem('entidades', JSON.stringify(entidades ));
}

// Función para mostrar las entidades en el contenedor
function mostrarEntidades() {
  const container = document.querySelector('#contenedorEntidad');
  container.innerHTML = '';
  var entidades = cargarEntidades();
  entidades.forEach(entidad => {
    // Crear elementos HTML para cada entidad
    const entidadDiv = document.createElement('div');
    entidadDiv.classList.add('entidad');

    const img = document.createElement('img');
    img.src = entidad.imagen;
    img.alt = entidad.nombre;
    entidadDiv.appendChild(img);

    const nombreParrafo = document.createElement('h4');
    nombreParrafo.textContent = entidad.nombre;
    entidadDiv.appendChild(nombreParrafo);

    const verDetallesBtn = document.createElement('a');
    verDetallesBtn.textContent = 'Ver detalles';
    verDetallesBtn.addEventListener('click', () => mostrarDetallesEntidad(entidad));
    entidadDiv.appendChild(verDetallesBtn);

    const editarButton = document.createElement('button');
    editarButton.textContent = 'Editar';
    editarButton.classList.add('btn1');
    editarButton.addEventListener('click', () => {
      mostrarFormularioEdicionEntidad(entidad);
    });
    entidadDiv.appendChild(editarButton);

    const eliminarButton = document.createElement('button');
    eliminarButton.textContent = 'Eliminar';
    eliminarButton.classList.add('btn1');
    eliminarButton.addEventListener('click', () => {
      // Preguntar al usuario si está seguro de eliminar la entidad
      const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta entidad?');
      if (confirmacion) {
        // Eliminar la entidad del arreglo y guardar en Local Storage
        entidades = entidades.filter(e => e.id !== entidad.id); // Filtrar la entidad a eliminar
        guardarEntidades(entidades); // Guardar el arreglo actualizado en el almacenamiento local
        window.location.reload(); // Recargar la página para reflejar los cambios
      }
    });
    entidadDiv.appendChild(eliminarButton);

    container.appendChild(entidadDiv);
  });
}


// Función para mostrar los detalles de una entidad en una nueva página temporal
function mostrarDetallesEntidad(entidad) {
  // Crear una nueva página temporal
  var newWindow = window.open('', '_blank');

  // Construir el contenido de la página
  var contenido = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Detalles de Entidad</title>';
  // Añadir referencia al archivo CSS personalizado
  contenido += '<link href="css/theme.css" rel="stylesheet">';
  contenido += '</head><body id="temp">';
  contenido += '<h3>Detalles de Entidad</h3>';
  contenido += '<p><strong>Nombre:</strong> ' + entidad.nombre + '</p>';
  contenido += '<p><strong>Fecha de creacion:</strong> ' + entidad.fecha_creacion + '</p>';
  contenido += '<p><strong>Utilidad:</strong> ' + entidad.utilidad + '</p>';
  contenido += '<img width="300px" src="' + entidad.imagen + '" alt="' + entidad.nombre + '">';
  contenido += '<p><a href="' + entidad.wiki + '" target="_blank">Resumen completo</a></p>';
  contenido += '<h4>Personas participantes:</h4>';
  contenido += '<ul>';

  // Acceder a los datos de las personas involucradas
  entidad.personas_participantes.forEach(numeroPersona => {
    // Obtener los datos de la persona a través del número de persona
    const persona = cargarPersonas()[numeroPersona - 1]; // Restamos 1 porque los números comienzan desde 1
    contenido += '<li>';
    contenido += '<p><strong>Nombre:</strong> ' + persona.nombre + '</p>';
    contenido += '<img width="200px" src="' + persona.imagen + '" alt="' + persona.nombre + '">';
    contenido += '</li>';
  });

  contenido += '</ul>';
  // Añadir botón para volver a la página principal
  contenido += '<button class="tempBtn" onclick="window.close()">Volver</button>';
  contenido += '</body></html>';

  // Escribir el contenido en la nueva página temporal
  newWindow.document.write(contenido);
}


// Evento de clic en el botón "Crear"
crearEntidadBtn.addEventListener('click', () => {
  // Función para mostrar el formulario de creación en una nueva página temporal
  function mostrarFormularioCreacion() {
      // Crear una nueva página temporal
      var newWindow = window.open('', '_blank');

      // Obtener todas las entidades
      var entidades = cargarEntidades();
      // Obtener el número total de entidades y sumar 1 para obtener el nuevo índice
      var nuevoIndice = entidades.length + 1;

      // Construir el contenido de la página
      var contenido = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Crear Entidad</title><link href="css/theme.css" rel="stylesheet"></head><body id="temp">';
      contenido += '<h3>Crear Entidad</h3>';
      contenido += '<form id="formularioCrearEntidad">';
      contenido += '<label for="nombre">Nombre:</label>';
      contenido += '<input type="text" id="nombre" required><br>';
      contenido += '<label for="fechaCreacion">Fecha de creacion:</label>';
      contenido += '<input type="date" id="fechaCreacion" required><br>';
      contenido += '<label for="utilidad">Utilidad:</label>';
      contenido += '<input type="text" id="utilidad" required><br>';
      contenido += '<label for="imagen">URL de la imagen:</label>';
      contenido += '<input type="text" id="imagen" required><br>';
      contenido += '<label for="wiki">URL de la página wiki:</label>';
      contenido += '<input type="text" id="wiki" required><br>';
      contenido += '<h4>Personas involucradas:</h4>';
      contenido += '<div id="listaPersonas">';
      const personas = cargarPersonas();
      personas.forEach(persona => {
          contenido += '<input type="checkbox" id="persona_' + persona.id + '" value="' + persona.id + '">';
          contenido += '<label for="persona_' + persona.id + '">' + persona.nombre + '</label><br>';
      });
      contenido += '</div>';
      contenido += '<button class="tempBtn" type="submit">Guardar</button>';
      contenido += '</form>';
      // Añadir script para manejar el evento submit del formulario
      contenido += '<script>';
      contenido += 'document.getElementById("formularioCrearEntidad").addEventListener("submit", function(event) { event.preventDefault(); ';
      contenido += 'var nombre = document.getElementById("nombre").value;';
      contenido += 'var fechaCreacion = document.getElementById("fechaCreacion").value;';
      contenido += 'var utilidad = document.getElementById("utilidad").value;';
      contenido += 'var imagen = document.getElementById("imagen").value;';
      contenido += 'var wiki = document.getElementById("wiki").value;';
      contenido += 'var personasInvolucradas = [];';
      contenido += 'var checkboxes = document.querySelectorAll(\'#listaPersonas input[type="checkbox"]:checked\');';
      contenido += 'checkboxes.forEach(checkbox => {';
      contenido += 'personasInvolucradas.push(parseInt(checkbox.value));';
      contenido += '});';
      contenido += 'var entidad = {';
      contenido += 'id: ' + nuevoIndice + ','; // Asignar el nuevo índice
      contenido += 'nombre: nombre,';
      contenido += 'fecha_creacion: fechaCreacion,';
      contenido += 'utilidad: utilidad,';
      contenido += 'imagen: imagen,';
      contenido += 'wiki: wiki,';
      contenido += 'personas_participantes: personasInvolucradas';
      contenido += '};';
      contenido += 'var entidadesJSON = localStorage.getItem("entidades");';
      contenido += 'var entidades = entidadesJSON ? JSON.parse(entidadesJSON) : [];';
      contenido += 'entidades.push(entidad);';
      contenido += 'localStorage.setItem("entidades", JSON.stringify(entidades));';
      contenido += 'window.location.href = "index.html";'; // Cerrar la ventana después de guardar la entidad
      contenido += '});';
      contenido += '</script>';
      contenido += '</body></html>';

      // Escribir el contenido en la nueva página temporal
      newWindow.document.write(contenido);
  }

  // Llamar a la función para mostrar el formulario de creación en una nueva página temporal
  mostrarFormularioCreacion();
});





// Función para mostrar el formulario de edición de una entidad
function mostrarFormularioEdicionEntidad(entidad) {
  var newWindow = window.open('', '_blank');
  var contenido = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Editar Entidad</title><link href="css/theme.css" rel="stylesheet"></head><body id="temp">';
  contenido += '<h3>Editar Entidad</h3>';
  contenido += '<form id="formularioEditarEntidad">';
  contenido += '<label for="nombre">Nombre:</label>';
  contenido += '<input type="text" id="nombre" value="' + entidad.nombre + '" required><br>';
  contenido += '<label for="fechaCreacion">Fecha de creacion:</label>';
  contenido += '<input type="date" id="fechaCreacion" value="' + entidad.fecha_creacion + '" required><br>';
  contenido += '<label for="utilidad">Utilidad:</label>';
  contenido += '<input type="text" id="utilidad" value="' + entidad.utilidad + '" required><br>';
  contenido += '<label for="imagen">URL de la imagen:</label>';
  contenido += '<input type="text" id="imagen" value="' + entidad.imagen + '" required><br>';
  contenido += '<label for="wiki">URL de la página wiki:</label>';
  contenido += '<input type="text" id="wiki" value="' + entidad.wiki + '" required><br>';
  contenido += '<h4>Personas involucradas:</h4>';
  contenido += '<div id="listaPersonas">';
  const personas = cargarPersonas();
  personas.forEach(persona => {
      contenido += '<input type="checkbox" id="persona_' + persona.id + '" value="' + persona.id + '"';
      // Marcar los checkboxes de las personas involucradas
      if (entidad.personas_participantes.includes(persona.id)) {
        contenido += ' checked'; // Marcar el checkbox si la persona está involucrada
      }
      contenido += '>';
      contenido += '<label for="persona_' + persona.id + '">' + persona.nombre + '</label><br>';
  });
  contenido += '</div>';
  contenido += '<button class="tempBtn" type="submit">Guardar</button>';
  contenido += '</form>';
  contenido += '<script>document.getElementById("formularioEditarEntidad").addEventListener("submit", function(event) { event.preventDefault(); console.log("Formulario de edición enviado"); ';
  contenido += 'var nombre = document.getElementById("nombre").value;';
  contenido += 'var fechaCreacion = document.getElementById("fechaCreacion").value;';
  contenido += 'var utilidad = document.getElementById("utilidad").value;';
  contenido += 'var imagen = document.getElementById("imagen").value;';
  contenido += 'var wiki = document.getElementById("wiki").value;';
  contenido += 'var personasInvolucradas = [];';
  contenido += 'var checkboxes = document.querySelectorAll(\'#listaPersonas input[type="checkbox"]:checked\');';
  contenido += 'checkboxes.forEach(checkbox => {';
  contenido += 'personasInvolucradas.push(parseInt(checkbox.value));';
  contenido += '});';
  contenido += 'var entidadesJSON = localStorage.getItem("entidades");';
  contenido += 'var entidades = entidadesJSON ? JSON.parse(entidadesJSON) : [];';
  contenido += 'var index = entidades.findIndex(e => e.nombre === "' + entidad.nombre + '");';
  contenido += 'if (index !== -1) {';
  contenido += 'entidades[index].nombre = nombre;';
  contenido += 'entidades[index].fecha_creacion = fechaCreacion;';
  contenido += 'entidades[index].utilidad = utilidad;';
  contenido += 'entidades[index].imagen = imagen;';
  contenido += 'entidades[index].wiki = wiki;';
  contenido += 'entidades[index].personas_participantes = personasInvolucradas;'; // Actualizar las personas involucradas
  contenido += 'localStorage.setItem("entidades", JSON.stringify(entidades));';
  contenido += 'console.log("Entidad editada:", entidades[index]);';
  contenido += 'window.location.href = "index.html";';
  contenido += '}else{console.log("Entidad no encontrada");}';
  contenido += '});</script>';
  contenido += '</body></html>';

  newWindow.document.write(contenido);
}





mostrarEntidades();
