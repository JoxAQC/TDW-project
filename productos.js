const crearProductoBtn = document.getElementById('crearProducto');

// Función para cargar productos desde Local Storage
function cargarProductos() {
  let productosJSON = localStorage.getItem('productos');
  if (!productosJSON) {
    // Si no hay datos en el Local Storage, inicializar con un valor predeterminado
    productosJSON = JSON.stringify([
        {
          nombre: "SGML",
          fecha_creacion: "1986-10-01",
          utilidad: "Lenguaje de marcado estándar generalizado.",
          imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ-xa-L0-24LLn-PQOavFh1tcfn_HBksPENJ6r0T7pdA&s",
          wiki: "https://es.wikipedia.org/wiki/SGML",
          personas_participantes: ["Charles F. Goldfarb"],
          entidades_participantes: ["IBM"]
        },
        {
          nombre: "XML",
          fecha_creacion: "1998-02-10",
          utilidad: "Lenguaje de marcado extensible.",
          imagen: "https://www.manualweb.net/img/logos/xml.png",
          wiki: "https://es.wikipedia.org/wiki/Extensible_Markup_Language",
          personas_participantes: ["Tim Bray"],
          entidades_participantes: ["W3C"]
        }
      ]);
    localStorage.setItem('productos', productosJSON);
  }
  return JSON.parse(productosJSON);
}

// Función para guardar productos en Local Storage
function guardarProductos(productos) {
  localStorage.setItem('productos', JSON.stringify(productos));
}

// Función para mostrar los productos en el contenedor
function mostrarProductos() {
  const container = document.querySelector('#contenedorProductos');
  container.innerHTML = '';
  const productos = cargarProductos();
  productos.forEach(producto => {
    // Crear elementos HTML para cada producto
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('product');

    const img = document.createElement('img');
    img.src = producto.imagen;
    img.alt = producto.nombre;
    productoDiv.appendChild(img);

    const nombreParrafo = document.createElement('h4');
    nombreParrafo.textContent = producto.nombre;
    productoDiv.appendChild(nombreParrafo);

    const verDetallesBtn = document.createElement('a');
    verDetallesBtn.textContent = 'Ver detalles';
    verDetallesBtn.addEventListener('click', () => mostrarDetallesProducto(producto));
    productoDiv.appendChild(verDetallesBtn);

    const editarButton = document.createElement('button');
    editarButton.textContent = 'Editar';
    editarButton.classList.add('btn1');
    editarButton.addEventListener('click', () => {
      mostrarFormularioEdicionProducto(producto);
    });
    productoDiv.appendChild(editarButton);

    const eliminarButton = document.createElement('button');
    eliminarButton.textContent = 'Eliminar';
    eliminarButton.classList.add('btn1');
    eliminarButton.addEventListener('click', () => {
      // Preguntar al usuario si está seguro de eliminar el producto
      const confirmacion = confirm('¿Estás seguro de que deseas eliminar este producto?');
      if (confirmacion) {
        // Eliminar el producto del arreglo y guardar en Local Storage
        const index = productos.findIndex(p => p.nombre === producto.nombre);
        if (index !== -1) {
          productos.splice(index, 1);
          guardarProductos(productos);
          window.location.reload(); // Recargar la página para reflejar los cambios
        }
      }
    });
    productoDiv.appendChild(eliminarButton);

    container.appendChild(productoDiv);
  });
}

// Función para mostrar los detalles de un producto en una nueva página temporal
function mostrarDetallesProducto(producto) {
  // Crear una nueva página temporal
  var newWindow = window.open('', '_blank');

  // Construir el contenido de la página
  var contenido = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Detalles de Producto</title>';
  // Añadir referencia al archivo CSS personalizado
  contenido += '<link href="css/theme.css" rel="stylesheet">';
  contenido += '</head><body id="temp">';
  contenido += '<h3>Detalles de Producto</h3>';
  contenido += '<p><strong>Nombre:</strong> ' + producto.nombre + '</p>';
  contenido += '<p><strong>Fecha de creación:</strong> ' + producto.fecha_creacion + '</p>';
  contenido += '<p><strong>Utilidad:</strong> ' + producto.utilidad + '</p>';
  contenido += '<img width="300px" src="' + producto.imagen + '" alt="' + producto.nombre + '">';
  contenido += '<p><a href="' + producto.wiki + '" target="_blank">Resumen completo</a></p>';
  contenido += '<h4>Personas participantes:</h4>';
  contenido += '<ul>';

  // Mostrar los detalles de las personas involucradas
  producto.personas_participantes.forEach(personaNombre => {
    var persona = cargarPersonaDesdeLocalStorage(personaNombre);
    if (persona) {
      contenido += '<li>';
      contenido += '<strong>Nombre:</strong> ' + persona.nombre + '<br>';
      contenido += '<img width="200px" src="' + persona.imagen + '" alt="' + persona.nombre + '">';
      contenido += '</li>';
    }
  });

  contenido += '</ul>';
  contenido += '<h4>Entidades participantes:</h4>';
  contenido += '<ul>';

  // Mostrar los detalles de las entidades involucradas
  producto.entidades_participantes.forEach(entidadNombre => {
    var entidad = cargarEntidadDesdeLocalStorage(entidadNombre);
    if (entidad) {
      contenido += '<li>';
      contenido += '<strong>Nombre:</strong> ' + entidad.nombre + '<br>';
      contenido += '<img width="200px" src="' + entidad.imagen + '" alt="' + entidad.nombre + '">';
      contenido += '</li>';
    }
  });

  contenido += '</ul>';
  // Añadir botón para volver a la página principal
  contenido += '<button class="tempBtn" onclick="window.close()">Volver</button>';
  contenido += '</body></html>';

  // Escribir el contenido en la nueva página temporal
  newWindow.document.write(contenido);
}

// Función para cargar una persona desde el Local Storage
function cargarPersonaDesdeLocalStorage(nombre) {
  var personasJSON = localStorage.getItem('personas');
  if (personasJSON) {
    var personas = JSON.parse(personasJSON);
    return personas.find(persona => persona.nombre === nombre);
  }
  return null;
}

// Función para cargar una entidad desde el Local Storage
function cargarEntidadDesdeLocalStorage(nombre) {
  var entidadesJSON = localStorage.getItem('entidades');
  if (entidadesJSON) {
    var entidades = JSON.parse(entidadesJSON);
    return entidades.find(entidad => entidad.nombre === nombre);
  }
  return null;
}



crearProductoBtn.addEventListener('click', () => {
  // Función para mostrar el formulario de creación en una nueva página temporal
  function mostrarFormularioCreacion() {
    // Crear una nueva página temporal
    var newWindow = window.open('', '_blank');

    // Construir el contenido de la página
    var contenido = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Crear Producto</title><link href="css/theme.css" rel="stylesheet"></head><body id="temp">';
    contenido += '<h3>Crear Producto</h3>';
    contenido += '<form id="formularioCrearProducto">';
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
    contenido += '<h4>Personas participantes:</h4>';
    contenido += '<div id="listaPersonas">';

    // Cargar las personas desde el Local Storage y crear los checkboxes
    var personas = cargarPersonas();
    personas.forEach(persona => {
      contenido += '<input type="checkbox" id="persona_' + persona.id + '" value="' + persona.nombre + '">';
      contenido += '<label for="persona_' + persona.id + '">' + persona.nombre + '</label><br>';
    });

    contenido += '</div>';
    contenido += '<h4>Entidades participantes:</h4>';
    contenido += '<div id="listaEntidades">';

    // Cargar las entidades desde el Local Storage y crear los checkboxes
    var entidades = cargarEntidades();
    entidades.forEach(entidad => {
      contenido += '<input type="checkbox" id="entidad_' + entidad.id + '" value="' + entidad.nombre + '">';
      contenido += '<label for="entidad_' + entidad.id + '">' + entidad.nombre + '</label><br>';
    });

    contenido += '</div>';
    contenido += '<button class="tempBtn" type="submit">Guardar</button>';
    contenido += '</form>';
    contenido += '<script>';
    contenido += 'document.getElementById("formularioCrearProducto").addEventListener("submit", function(event) { event.preventDefault(); ';
    contenido += 'var nombre = document.getElementById("nombre").value;';
    contenido += 'var fechaCreacion = document.getElementById("fechaCreacion").value;';
    contenido += 'var utilidad = document.getElementById("utilidad").value;';
    contenido += 'var imagen = document.getElementById("imagen").value;';
    contenido += 'var wiki = document.getElementById("wiki").value;';
    contenido += 'var personasInvolucradas = [];';
    contenido += 'var checkboxesPersonas = document.querySelectorAll(\'#listaPersonas input[type="checkbox"]:checked\');';
    contenido += 'checkboxesPersonas.forEach(checkbox => {';
    contenido += 'personasInvolucradas.push(checkbox.value);';
    contenido += '});';
    contenido += 'var entidadesInvolucradas = [];';
    contenido += 'var checkboxesEntidades = document.querySelectorAll(\'#listaEntidades input[type="checkbox"]:checked\');';
    contenido += 'checkboxesEntidades.forEach(checkbox => {';
    contenido += 'entidadesInvolucradas.push(checkbox.value);';
    contenido += '});';
    contenido += 'var producto = {';
    contenido += 'nombre: nombre,';
    contenido += 'fecha_creacion: fechaCreacion,';
    contenido += 'utilidad: utilidad,';
    contenido += 'imagen: imagen,';
    contenido += 'wiki: wiki,';
    contenido += 'personas_participantes: personasInvolucradas,';
    contenido += 'entidades_participantes: entidadesInvolucradas';
    contenido += '};';
    contenido += 'var productosJSON = localStorage.getItem("productos");';
    contenido += 'var productos = productosJSON ? JSON.parse(productosJSON) : [];';
    contenido += 'productos.push(producto);';
    contenido += 'localStorage.setItem("productos", JSON.stringify(productos));';
    contenido += 'window.location.href = "index.html";'; // Cerrar la ventana después de guardar el producto
    contenido += '});';
    contenido += '</script>';
    contenido += '</body></html>';

    // Escribir el contenido en la nueva página temporal
    newWindow.document.write(contenido);
  }

  mostrarFormularioCreacion();
});

function mostrarFormularioEdicionProducto(producto) {
  // Función para mostrar el formulario de edición en una nueva página temporal
  function mostrarFormularioEdicion() {
    // Crear una nueva página temporal
    var newWindow = window.open('', '_blank');

    // Construir el contenido de la página
    var contenido = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Editar Producto</title><link href="css/theme.css" rel="stylesheet"></head><body id="temp">';
    contenido += '<h3>Editar Producto</h3>';
    contenido += '<form id="formularioEditarProducto">';
    contenido += '<label for="nombre">Nombre:</label>';
    contenido += '<input type="text" id="nombre" value="' + producto.nombre + '" required><br>';
    contenido += '<label for="fechaCreacion">Fecha de creacion:</label>';
    contenido += '<input type="date" id="fechaCreacion" value="' + producto.fecha_creacion + '" required><br>';
    contenido += '<label for="utilidad">Utilidad:</label>';
    contenido += '<input type="text" id="utilidad" value="' + producto.utilidad + '" required><br>';
    contenido += '<label for="imagen">URL de la imagen:</label>';
    contenido += '<input type="text" id="imagen" value="' + producto.imagen + '" required><br>';
    contenido += '<label for="wiki">URL de la página wiki:</label>';
    contenido += '<input type="text" id="wiki" value="' + producto.wiki + '" required><br>';
    contenido += '<h4>Personas participantes:</h4>';
    contenido += '<div id="listaPersonas">';

    // Cargar las personas desde el Local Storage y crear los checkboxes
    var personas = cargarPersonas();
    personas.forEach(persona => {
      contenido += '<input type="checkbox" id="persona_' + persona.id + '" value="' + persona.nombre + '"';
      // Marcar los checkboxes de las personas involucradas
      if (producto.personas_participantes.includes(persona.nombre)) {
        contenido += ' checked';
      }
      contenido += '>';
      contenido += '<label for="persona_' + persona.id + '">' + persona.nombre + '</label><br>';
    });

    contenido += '</div>';
    contenido += '<h4>Entidades participantes:</h4>';
    contenido += '<div id="listaEntidades">';

    // Cargar las entidades desde el Local Storage y crear los checkboxes
    var entidades = cargarEntidades();
    entidades.forEach(entidad => {
      contenido += '<input type="checkbox" id="entidad_' + entidad.id + '" value="' + entidad.nombre + '"';
      // Marcar los checkboxes de las entidades involucradas
      if (producto.entidades_participantes.includes(entidad.nombre)) {
        contenido += ' checked';
      }
      contenido += '>';
      contenido += '<label for="entidad_' + entidad.id + '">' + entidad.nombre + '</label><br>';
    });

    contenido += '</div>';
    contenido += '<button class="tempBtn" type="submit">Guardar</button>';
    contenido += '</form>';
    contenido += '<script>';
    contenido += 'document.getElementById("formularioEditarProducto").addEventListener("submit", function(event) { event.preventDefault(); ';
    contenido += 'var nombre = document.getElementById("nombre").value;';
    contenido += 'var fechaCreacion = document.getElementById("fechaCreacion").value;';
    contenido += 'var utilidad = document.getElementById("utilidad").value;';
    contenido += 'var imagen = document.getElementById("imagen").value;';
    contenido += 'var wiki = document.getElementById("wiki").value;';
    contenido += 'var personasInvolucradas = [];';
    contenido += 'var checkboxesPersonas = document.querySelectorAll(\'#listaPersonas input[type="checkbox"]:checked\');';
    contenido += 'checkboxesPersonas.forEach(checkbox => {';
    contenido += 'personasInvolucradas.push(checkbox.value);';
    contenido += '});';
    contenido += 'var entidadesInvolucradas = [];';
    contenido += 'var checkboxesEntidades = document.querySelectorAll(\'#listaEntidades input[type="checkbox"]:checked\');';
    contenido += 'checkboxesEntidades.forEach(checkbox => {';
    contenido += 'entidadesInvolucradas.push(checkbox.value);';
    contenido += '});';
    contenido += 'var productosJSON = localStorage.getItem("productos");';
    contenido += 'var productos = productosJSON ? JSON.parse(productosJSON) : [];';
    contenido += 'var index = productos.findIndex(p => p.nombre === "' + producto.nombre + '");';
    contenido += 'if (index !== -1) {';
    contenido += 'productos[index].nombre = nombre;';
    contenido += 'productos[index].fecha_creacion = fechaCreacion;';
    contenido += 'productos[index].utilidad = utilidad;';
    contenido += 'productos[index].imagen = imagen;';
    contenido += 'productos[index].wiki = wiki;';
    contenido += 'productos[index].personas_participantes = personasInvolucradas;';
    contenido += 'productos[index].entidades_participantes = entidadesInvolucradas;';
    contenido += 'localStorage.setItem("productos", JSON.stringify(productos));';
    contenido += '}';
    contenido += 'window.location.href = "index.html";'; // Cerrar la ventana después de guardar el producto
    contenido += '});';
    contenido += '</script>';
    contenido += '</body></html>';

    // Escribir el contenido en la nueva página temporal
    newWindow.document.write(contenido);
  }

  mostrarFormularioEdicion();
}


mostrarProductos();
