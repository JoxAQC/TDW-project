// Función para cargar productos desde Local Storage
function cargarProductos() {
  let productosJSON = localStorage.getItem('productos');
  if (!productosJSON) {
    // Si no hay datos en el Local Storage, inicializar con un valor predeterminado
    productosJSON = JSON.stringify({
      productos: [
        {
          nombre: "SGML",
          fecha_creacion: "1986-10-01",
          utilidad: "Lenguaje de marcado estándar generalizado.",
          imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ-xa-L0-24LLn-PQOavFh1tcfn_HBksPENJ6r0T7pdA&s",
          wiki: "https://es.wikipedia.org/wiki/SGML",
          personas_participantes: [
            {
              nombre: "Charles F. Goldfarb",
              fecha_nacimiento: "1947-07-02",
              imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Charles_F_Goldfarb_2006.jpg/220px-Charles_F_Goldfarb_2006.jpg",
              wiki: "https://en.wikipedia.org/wiki/Charles_F._Goldfarb"
            }
          ],
          entidades_participantes: [
            {
              nombre: "IBM",
              imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/200px-IBM_logo.svg.png",
              wiki: "https://en.wikipedia.org/wiki/IBM"
            }
          ]
        },
        {
          nombre: "XML",
          fecha_creacion: "1998-02-10",
          utilidad: "Lenguaje de marcado extensible.",
          imagen: "https://www.manualweb.net/img/logos/xml.png",
          wiki: "https://es.wikipedia.org/wiki/Extensible_Markup_Language",
          personas_participantes: [
            {
              nombre: "Tim Bray",
              fecha_nacimiento: "1955-06-21",
              imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/TimBray.jpg/220px-TimBray.jpg",
              wiki: "https://en.wikipedia.org/wiki/Tim_Bray"
            }
          ],
          entidades_participantes: [
            {
              nombre: "W3C",
              imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/W3C%C2%AE_Icon.svg/200px-W3C%C2%AE_Icon.svg.png",
              wiki: "https://en.wikipedia.org/wiki/World_Wide_Web_Consortium"
            }
          ]
        }
      ]
    });
    localStorage.setItem('productos', productosJSON);
  }
  return JSON.parse(productosJSON).productos;
}

// Función para guardar productos en Local Storage
function guardarProductos(productos) {
  localStorage.setItem('productos', JSON.stringify({ productos }));
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
          window.location.href = 'index.html';
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
  // Añadir botón para volver a la página principal
  contenido += '<button class="tempBtn" onclick="window.close()">Volver</button>';
  contenido += '</body></html>';

  // Escribir el contenido en la nueva página temporal
  newWindow.document.write(contenido);
}

// Función para crear un nuevo producto y guardarlo en Local Storage
function crearProducto() {
  // Implementar función para crear un nuevo producto
}

// Función para mostrar el formulario de edición de un producto
function mostrarFormularioEdicionProducto(producto) {
  // Implementar función para mostrar el formulario de edición de un producto
}

mostrarProductos();
