function crearNuevoElemento(nombre, fechaNacimiento, utilidad, imagen, wiki) {
  // Crear el objeto del nuevo elemento
  const nuevoElemento = {
    "nombre": nombre,
    "fecha_nacimiento": fechaNacimiento,
    "utilidad": utilidad,
    "imagen": imagen,
    "wiki": wiki
    // Otros datos...
  };

  // Obtener los datos actuales del almacenamiento local
  let storedData = localStorage.getItem('entidadesData');
  let data = storedData ? JSON.parse(storedData) : { entidades: [] };

  // Agregar el nuevo elemento
  data.entidades.push(nuevoElemento);

  // Guardar los datos actualizados en el almacenamiento local
  localStorage.setItem('entidadesData', JSON.stringify(data));

  // Mostrar los datos actualizados en el HTML
  mostrarDatos();
}

// Función para mostrar los datos en el HTML
function mostrarDatos() {
  // Obtener el contenedor de entidades
  const containElement = document.querySelector('#contenedorEntidad');

  // Limpiar el contenedor antes de agregar los nuevos elementos
  containElement.innerHTML = '';

  // Obtener el JSON existente
  fetch('json/entidades.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo cargar el archivo JSON');
      }
      return response.json();
    })
    .then(jsonData => {
      // Iterar sobre las entidades y crear elementos HTML para cada una
      jsonData.entidades.forEach(entidad => {
        // Crear el elemento div con la clase "entidad"
        const entidadDiv = document.createElement('div');
        entidadDiv.classList.add('entidad');

        // Crear el enlace
        const linkEntidad = document.createElement('a');
        linkEntidad.href = entidad.wiki;
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
        button.classList.add('btn1');
        entidadDiv.appendChild(button);

        // Agregar el div "entidad" al contenedor principal
        containElement.appendChild(entidadDiv);
      });
    })
    .catch(error => {
      console.error('Error al mostrar los datos:', error);
    });
}

   // Cargar los datos iniciales al iniciar la aplicación
   mostrarDatos();

   // Manejar el evento submit del formulario
   const formulario = document.getElementById('formulario');
   formulario.addEventListener('submit', function(event) {
     event.preventDefault(); // Evitar el comportamiento predeterminado de enviar el formulario

     // Obtener los valores del formulario
     const nombre = document.getElementById('nombre').value;
     const fechaNacimiento = document.getElementById('fechaNacimiento').value;
     const utilidad = document.getElementById('utilidad').value;
     const imagen = document.getElementById('imagen').value;
     const wiki = document.getElementById('wiki').value;

     // Agregar la nueva entidad
     crearNuevoElemento(nombre, fechaNacimiento, utilidad, imagen, wiki);

     // Limpiar los campos del formulario después de crear la entidad
     formulario.reset();
});
