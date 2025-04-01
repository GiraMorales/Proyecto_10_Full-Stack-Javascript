export const CrearEvento = () => {
  const main = document.querySelector('main');
  main.innerHTML = `
    <h2>Crear Nuevo Evento</h2>
    <form id="formCrearEvento">
      <input type="text" id="titulo" placeholder="Título" required>
      <input type="text" id="portada" placeholder="URL de la Imagen" required>
      <textarea id="descripcion" placeholder="Descripción" required></textarea>
      <input type="date" id="fecha" required>
      <input type="text" id="ubicacion" placeholder="Ubicación" required>
      <button type="submit">Crear Evento</button>
    </form>
  `;

  document
    .getElementById('formCrearEvento')
    .addEventListener('submit', async (e) => {
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
