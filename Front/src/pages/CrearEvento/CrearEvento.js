import './CrearEvento.css';
export const CrearEvento = () => {
  const main = document.querySelector('main');
  main.innerHTML = ''; // Limpiar el contenido del main

  // Crear un contenedor para el título y el formulario
  const contenedor = document.createElement('div');
  contenedor.classList.add('crear-evento-contenedor'); // Clase para el contenedor

  // Crear el título
  const titulo = document.createElement('h2');
  titulo.textContent = 'Crear Nuevo Evento';
  titulo.classList.add('titulo-crear-evento'); // Clase para el título

  // Crear el formulario
  const formulario = document.createElement('form');
  formulario.id = 'formCrearEvento';
  formulario.innerHTML = `
    <input type="text" id="titulo" placeholder="Título" required>
    <input type="text" id="portada" placeholder="URL de la Imagen" required>
    <textarea id="descripcion" placeholder="Descripción" required></textarea>
    <input type="date" id="fecha" required>
    <input type="text" id="ubicacion" placeholder="Ubicación" required>
    <button type="submit">Crear Evento</button>
  `;

  // Agregar el título y el formulario al contenedor
  contenedor.appendChild(titulo);
  contenedor.appendChild(formulario);

  // Agregar el contenedor al main
  main.appendChild(contenedor);

  // Agregar el evento de submit al formulario
  formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const evento = {
      titulo: document.getElementById('titulo').value,
      portada: document.getElementById('portada').value,
      descripcion: document.getElementById('descripcion').value,
      fecha: document.getElementById('fecha').value,
      ubicacion: document.getElementById('ubicacion').value
    };

    try {
      const res = await fetch('http://localhost:3000/api/v1/eventos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(evento)
      });

      if (!res.ok) throw new Error('Error al crear evento');

      alert('Evento creado con éxito');
      window.location.href = '#/eventos-asistentes';
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al crear el evento');
    }
  });
};
