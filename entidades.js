// Obtener el contenedor de productos
const containElement = document.querySelector('#contenedorEntidad');

// Hacer una solicitud para cargar el archivo JSON
fetch('json/entidades.json')
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
    jsonData.entidades.forEach(entidad => {
      // Crear el elemento div con la clase "producto"
      const entidadDiv = document.createElement('div');
      entidadDiv.classList.add('entidad');

      // Crear el enlace
      const linkEntidad = document.createElement('a');
      linkEntidad.href = entidad.wiki; // Cambiar "producto.enlace" por la propiedad correcta en tu JSON que contiene el enlace
      entidadDiv.appendChild(linkEntidad);

      // Crear la imagen
      const img = document.createElement('img');
      img.src = entidad.imagen;
      img.alt = entidad.nombre;
      linkEntidad.appendChild(img);

      //Crear el resumen
      const resumen = document.createElement('p');
      resumen.textContent = `${entidad.nombre} es una ${entidad.utilidad} creada en ${entidad.fecha_nacimiento}.`;
      entidadDiv.appendChild(resumen);


      // Crear el botón "Editar"
      const button = document.createElement('button');
      button.textContent = 'Editar';
      entidadDiv.appendChild(button);

      // Agregar el div "product" al contenedor principal de productos
      containElement.appendChild(entidadDiv);
    });
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });
