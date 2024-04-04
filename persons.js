// Obtener el contenedor

const crearPersonaBtn = document.getElementById('crearPersona');

// Función para cargar personas desde Local Storage
function cargarPersonas() {
  let personasJSON = localStorage.getItem('personas');
  console.log('Datos desde Local Storage:', personasJSON); // Agregar esta línea para depuración
  if (!personasJSON) {
      // Si no hay datos en el Local Storage, inicializar con un valor predeterminado
      personasJSON = JSON.stringify([
          {
              id: 1,
              nombre: "Vannevar Bush",
              fecha_nacimiento: "1890-03-11",
              fecha_defuncion: "1974-06-28",
              imagen: "https://www.icesi.edu.co/blogs_estudiantes/vanessa/files/2009/08/bush.jpg",
              wiki: "https://es.wikipedia.org/wiki/Vannevar_Bush"
          },
          {
              id: 2,
              nombre: "Tim Berners-Lee",
              fecha_nacimiento: "1955-06-08",
              fecha_defuncion: null,
              imagen: "https://i.blogs.es/3ef43a/tim-berners-lee/1366_2000.jpg",
              wiki: "https://es.wikipedia.org/wiki/Tim_Berners-Lee"
          },
          {
              id: 3,
              nombre: "Charles F. Goldfarb",
              fecha_nacimiento: "1947-07-02",
              fecha_defuncion: null,
              imagen: "https://www.ithistory.org/sites/default/files/honor-roll/Charles%20Goldfarb.jpg",
              wiki: "https://en.wikipedia.org/wiki/Charles_F._Goldfarb"
          }
      ]);
      localStorage.setItem('personas', personasJSON);
  }
  return JSON.parse(personasJSON);
}


// Función para guardar personas en Local Storage
function guardarPersonas(personas) {
  localStorage.setItem('personas', JSON.stringify(personas));
  console.log('Personas guardadas:', personas); // Agregar esta línea para depuración
}



// Función para mostrar las personas en el contenedor
function mostrarPersonas() {
  const container = document.querySelector('#contenedorPersonas');
  container.innerHTML = '';
  const personas = cargarPersonas();
  console.log('Personas cargadas:', personas); // Agregar esta línea para depuración
  personas.forEach(persona => {
        // Crear elementos HTML para cada persona
        const personDiv = document.createElement('div');
        personDiv.classList.add('person');

        const img = document.createElement('img');
        img.src = persona.imagen;
        img.alt = persona.nombre;
        personDiv.appendChild(img);

        const span9Div = document.createElement('div');
        span9Div.classList.add('span9');

        const h4 = document.createElement('h4');
        h4.textContent = persona.nombre;
        span9Div.appendChild(h4);

        const p = document.createElement('p');
        const a = document.createElement('a');
        a.textContent = 'Ver detalles';
        a.onclick = function(event) {
          event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
          mostrarDetalles(persona); // Mostrar detalles de la persona
      };

        p.appendChild(a);
        span9Div.appendChild(p);

        personDiv.appendChild(span9Div);

        const editarButton = document.createElement('button');
        editarButton.textContent = 'Editar';
        editarButton.classList.add('btn1');
        editarButton.addEventListener('click', () => {
          mostrarFormularioEdicion(persona);
        });
        personDiv.appendChild(editarButton);

        const eliminarButton = document.createElement('button');
        eliminarButton.textContent = 'Eliminar';
        eliminarButton.classList.add('btn1');
        eliminarButton.addEventListener('click', () => {
          // Preguntar al usuario si está seguro de eliminar la persona
          const confirmacion = confirm('¿Estás seguro de que deseas eliminar a esta persona?');
          if (confirmacion) {
              // Eliminar la persona del arreglo y guardar en Local Storage
              const index = personas.findIndex(p => p.id === persona.id);
              if (index !== -1) {
                  personas.splice(index, 1);
                  guardarPersonas(personas);
                  window.location.href = 'index.html';  
              }
          }
      });
        personDiv.appendChild(eliminarButton);

        container.appendChild(personDiv);
    });
}

// Función para crear una nueva persona y guardarla en Local Storage
function crearPersona() {
  // Obtener los valores del formulario
  const nombre = document.getElementById('nombre').value;
  const fechaNacimiento = document.getElementById('fechaNacimiento').value;
  const fechaDefuncion = document.getElementById('fechaDefuncion').value;
  const imagen = document.getElementById('imagen').value;
  const wiki = document.getElementById('wiki').value;

  // Cargar las personas del Local Storage
  let personas = cargarPersonas();

  // Crear un objeto persona con los datos del formulario
  const persona = {
    id: personas.length + 1, // Generar un ID único para la nueva persona
    nombre: nombre,
    fecha_nacimiento: fechaNacimiento,
    fecha_defuncion: fechaDefuncion,
    imagen: imagen,
    wiki: wiki
  };

  // Agregar la persona al arreglo de personas
  personas.push(persona);

  // Guardar el arreglo actualizado en Local Storage
  guardarPersonas(personas);
  console.log('Persona creada:', persona); // Agregar esta línea para depuración
  // Redirigir al usuario de vuelta al index.html
  window.location.href = 'index.html';
}

// Evento de clic en el botón "Crear"
crearPersonaBtn.addEventListener('click', () => {
  // Función para mostrar el formulario de creación en una nueva página temporal
  function mostrarFormularioCreacion() {
      // Crear una nueva página temporal
      var newWindow = window.open('', '_blank');

      // Construir el contenido de la página
      var contenido = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Crear Persona</title><link href="css/theme.css" rel="stylesheet"></head><body id="temp">';
      contenido += '<h3>Crear Persona</h3>';
      contenido += '<form id="formularioCrearPersona">';
      contenido += '<label for="nombre">Nombre:</label>';
      contenido += '<input type="text" id="nombre" required><br>';
      contenido += '<label for="fechaNacimiento">Fecha de nacimiento:</label>';
      contenido += '<input type="date" id="fechaNacimiento" required><br>';
      contenido += '<label for="fechaDefuncion">Fecha de defunción:</label>';
      contenido += '<input type="date" id="fechaDefuncion"><br>';
      contenido += '<label for="imagen">URL de la imagen:</label>';
      contenido += '<input type="text" id="imagen" required><br>';
      contenido += '<label for="wiki">URL de la página wiki:</label>';
      contenido += '<input type="text" id="wiki" required><br>';
      contenido += '<button class="tempBtn" type="submit">Guardar</button>';
      contenido += '</form>';
      // Añadir script para manejar el evento submit del formulario
      contenido += '<script>document.getElementById("formularioCrearPersona").addEventListener("submit", function(event) { event.preventDefault(); console.log("Formulario enviado"); ';
      contenido += 'var nombre = document.getElementById("nombre").value;';
      contenido += 'var fechaNacimiento = document.getElementById("fechaNacimiento").value;';
      contenido += 'var fechaDefuncion = document.getElementById("fechaDefuncion").value;';
      contenido += 'var imagen = document.getElementById("imagen").value;';
      contenido += 'var wiki = document.getElementById("wiki").value;';
      contenido += 'var personasJSON = localStorage.getItem("personas");';
      contenido += 'var personas = personasJSON ? JSON.parse(personasJSON) : [];'; // Parsear el JSON o inicializar un arreglo vacío
      contenido += 'var persona = {';
      contenido += 'id: personas.length + 1,';
      contenido += 'nombre: nombre,';
      contenido += 'fecha_nacimiento: fechaNacimiento,';
      contenido += 'fecha_defuncion: fechaDefuncion,';
      contenido += 'imagen: imagen,';
      contenido += 'wiki: wiki';
      contenido += '};';
      contenido += 'personas.push(persona);'; // Agregar la persona al arreglo
      contenido += 'localStorage.setItem("personas", JSON.stringify(personas));'; // Guardar el arreglo en el Local Storage
      contenido += 'console.log("Persona creada:", persona);';
      contenido += 'window.location.href = "index.html";';
      contenido += '});';
      contenido += 'var personasJSON = localStorage.getItem("personas");';
      contenido += 'var personas = personasJSON ? JSON.parse(personasJSON) : [];'; // Parsear el JSON o inicializar un arreglo vacío
      contenido += 'console.log(personas);';
      contenido += '</script>';
      contenido += '</body></html>';

      // Escribir el contenido en la nueva página temporal
      newWindow.document.write(contenido);
  }

  // Llamar a la función para mostrar el formulario de creación en una nueva página temporal
  mostrarFormularioCreacion();
});


// Función para mostrar el formulario de edición
function mostrarFormularioEdicion(persona) {
  var newWindow = window.open('', '_blank');
  var contenido = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Editar Persona</title><link href="css/theme.css" rel="stylesheet"></head><body id="temp">';
  contenido += '<h3>Editar Persona</h3>';
  contenido += '<form id="formularioEditarPersona">';
  contenido += '<label for="nombre">Nombre:</label>';
  contenido += '<input type="text" id="nombre" value="' + persona.nombre + '" required><br>';
  contenido += '<label for="fechaNacimiento">Fecha de nacimiento:</label>';
  contenido += '<input type="date" id="fechaNacimiento" value="' + persona.fecha_nacimiento + '" required><br>';
  contenido += '<label for="fechaDefuncion">Fecha de defunción:</label>';
  contenido += '<input type="date" id="fechaDefuncion" value="' + (persona.fecha_defuncion ? persona.fecha_defuncion : '') + '"><br>';
  contenido += '<label for="imagen">URL de la imagen:</label>';
  contenido += '<input type="text" id="imagen" value="' + persona.imagen + '" required><br>';
  contenido += '<label for="wiki">URL de la página wiki:</label>';
  contenido += '<input type="text" id="wiki" value="' + persona.wiki + '" required><br>';
  contenido += '<button class="tempBtn" type="submit">Guardar</button>';
  contenido += '</form>';
  contenido += '<script>document.getElementById("formularioEditarPersona").addEventListener("submit", function(event) { event.preventDefault(); console.log("Formulario de edición enviado"); ';
  contenido += 'var nombre = document.getElementById("nombre").value;';
  contenido += 'var fechaNacimiento = document.getElementById("fechaNacimiento").value;';
  contenido += 'var fechaDefuncion = document.getElementById("fechaDefuncion").value;';
  contenido += 'var imagen = document.getElementById("imagen").value;';
  contenido += 'var wiki = document.getElementById("wiki").value;';
  contenido += 'var personasJSON = localStorage.getItem("personas");';
  contenido += 'var personas = personasJSON ? JSON.parse(personasJSON) : [];';
  contenido += 'var index = personas.findIndex(p => p.id === ' + persona.id + ');';
  contenido += 'if (index !== -1) {';
  contenido += 'personas[index].nombre = nombre;';
  contenido += 'personas[index].fecha_nacimiento = fechaNacimiento;';
  contenido += 'personas[index].fecha_defuncion = fechaDefuncion;';
  contenido += 'personas[index].imagen = imagen;';
  contenido += 'personas[index].wiki = wiki;';
  contenido += 'localStorage.setItem("personas", JSON.stringify(personas));';
  contenido += 'console.log("Persona editada:", personas[index]);';
  contenido += 'window.location.href = "index.html";';
  contenido += '}';
  contenido += '});</script>';
  contenido += '</body></html>';

  newWindow.document.write(contenido);
}



//Mostrar las personas al cargar la página
mostrarPersonas();


// Función para mostrar los detalles de una persona en una nueva página temporal
function mostrarDetalles(persona) {
  // Crear una nueva página temporal
  var newWindow = window.open('', '_blank');
  
  // Construir el contenido de la página
  var contenido = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Detalles de Persona</title>';
  // Añadir referencia al archivo CSS personalizado
  contenido += '<link href="css/theme.css" rel="stylesheet">';
  contenido += '</head><body id="temp">';
  contenido += '<h3>Detalles de Persona</h3>';
  contenido += '<p><strong>Nombre:</strong> ' + persona.nombre + '</p>';
  contenido += '<p><strong>Fecha de nacimiento:</strong> ' + persona.fecha_nacimiento + '</p>';
  contenido += '<p><strong>Fecha de defunción:</strong> ' + (persona.fecha_defuncion ? persona.fecha_defuncion : 'N/A') + '</p>';
  contenido += '<img width="300px" src="' + persona.imagen + '" alt="' + persona.nombre + '">';
  contenido += '<p><a href="' + persona.wiki + '" target="_blank">Resumen completo</a></p>';
  // Añadir botón para volver a la página principal
  contenido += '<button class="tempBtn" onclick="window.close()">Volver</button>';
  contenido += '</body></html>';
  
  // Escribir el contenido en la nueva página temporal
  newWindow.document.write(contenido);
}