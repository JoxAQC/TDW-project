// Obtener el contenedor
const container = document.querySelector('#contenedorPersonas');

// Hacer una solicitud para cargar el archivo JSON
fetch('json/personas.json')
  .then(response => {
    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo JSON');
    }
    // Convertir la respuesta a JSON
    return response.json();
  })
  .then(jsonData => {
    // Iterar sobre las personas y crear elementos HTML para cada una
    jsonData.personas.forEach(persona => {
      // Crear el elemento div con la clase "person"
      const personDiv = document.createElement('div');
      personDiv.classList.add('person');

      // Crear la imagen
      const img = document.createElement('img');
      img.src = persona.imagen;
      img.alt = persona.nombre;
      personDiv.appendChild(img);

      // Crear el div con la clase "span9"
      const span9Div = document.createElement('div');
      span9Div.classList.add('span9');

      // Crear el título h4 con el nombre
      const h4 = document.createElement('h4');
      h4.textContent = persona.nombre;
      span9Div.appendChild(h4);

      // Crear el párrafo con el enlace wiki
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = persona.wiki;
      a.textContent = 'Resumen';
      p.appendChild(a);
      span9Div.appendChild(p);

      // Agregar el div "span9" al div "person"
      personDiv.appendChild(span9Div);

      // Crear el botón "Editar"
      const button = document.createElement('button');
      button.textContent = 'Editar';
      button.classList.add('btn1');
      personDiv.appendChild(button);

      // Agregar el div "person" al contenedor principal
      container.appendChild(personDiv);
    });
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });

