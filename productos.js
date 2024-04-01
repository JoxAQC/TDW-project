// Obtener el contenedor de productos
const containProduct = document.querySelector('#contenedorProductos');

// Hacer una solicitud para cargar el archivo JSON
fetch('json/productos.json')
  .then(response => {
    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo JSON');
    }
    // Convertir la respuesta a JSON
    return response.json();
  })
  .then(jsonData => {
    // Iterar sobre los productos y crear elementos HTML para cada uno
    jsonData.productos.forEach(producto => {
      // Crear el elemento div con la clase "producto"
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('product');

      // Crear el enlace
      const linkProduct = document.createElement('a');
      linkProduct.href = producto.wiki; // Cambiar "producto.enlace" por la propiedad correcta en tu JSON que contiene el enlace
      productoDiv.appendChild(linkProduct);

      // Crear la imagen
      const img = document.createElement('img');
      img.src = producto.imagen;
      img.alt = producto.nombre;
      linkProduct.appendChild(img);

      // Crear el botón "Editar"
      const button = document.createElement('button');
      button.textContent = 'Editar';
      productoDiv.appendChild(button);

      // Agregar el div "product" al contenedor principal de productos
      containProduct.appendChild(productoDiv);
    });
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });
