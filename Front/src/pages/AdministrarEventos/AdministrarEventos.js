import { apiRequest } from '../../components/apiRequest/apiRequest';
import './AdministrarEventos.css';

export const AdministrarEventos = () => {
  const main = document.querySelector('main');
  main.innerHTML = ''; // Limpiar el contenido del main

  // Crear un contenedor para el título y el formulario
  const contenedor = document.createElement('div');
  contenedor.classList.add('crear-evento-contenedor'); // Clase para el contenedor

  // Secciones
  const seccionCrear = document.createElement('div');
  const seccionEliminar = document.createElement('div');

  // Botones para alternar vistas
  const botones = document.createElement('div');
  botones.classList.add('admin-tabs');

  const btnCrear = document.createElement('button');
  btnCrear.textContent = 'Crear Evento';
  const btnEliminar = document.createElement('button');
  btnEliminar.textContent = 'Eliminar Eventos';

  btnCrear.addEventListener('click', () => {
    seccionCrear.style.display = 'block';
    seccionEliminar.style.display = 'none';
  });

  btnEliminar.addEventListener('click', () => {
    seccionCrear.style.display = 'none';
    seccionEliminar.style.display = 'block';
    cargarEventosParaEliminar(seccionEliminar); // Cargar cada vez que se abre
  });

  botones.append(btnCrear, btnEliminar);
  contenedor.appendChild(botones);

  //crear evento
  // Crear el título
  const tituloCrear = document.createElement('h2');
  tituloCrear.textContent = 'Crear Nuevo Evento';
  tituloCrear.classList.add('titulo-crear-evento'); // Clase para el título

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
      // const res = await fetch('http://localhost:3000/api/v1/eventos', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify(evento)
      // });

      await apiRequest('eventos', { method: 'POST', data: evento });

      if (!apiRequest.ok) throw new Error('Error al crear evento');

      alert('Evento creado con éxito');

      formulario.reset();
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al crear el evento');
    }
  });
  // Agregar el título y el formulario al contenedor
  seccionCrear.append(tituloCrear, formulario);

  //Eliminar evento
  const cargarEventosParaEliminar = async (contenedor) => {
    contenedor.innerHTML =
      '<h2 class="titulo-eliminar-evento">Eliminar Eventos</h2>'; // Limpiar contenido previo

    try {
      // const res = await fetch('http://localhost:3000/api/v1/eventos', {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('token')}`
      //   }
      // });

      const eventos = await apiRequest('eventos');
      if (!Array.isArray(eventos) || eventos.length === 0) {
        contenedor.innerHTML += '<p>No hay eventos disponibles.</p>';
        return;
      }

      eventos.forEach((evento) => {
        const divEvento = document.createElement('div');
        divEvento.classList.add('evento');

        const h3 = document.createElement('h3');
        h3.textContent = evento.titulo;

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.classList.add('btn-eliminar');

        btnEliminar.addEventListener('click', async () => {
          const confirmar = confirm(`¿Eliminar el evento "${evento.titulo}"?`);
          if (!confirmar) return;

          try {
            await apiRequest(`eventos/${evento._id}`, { method: 'DELETE' });

            if (!apiRequest.ok) throw new Error('Error al eliminar el evento');
            alert('✅ Evento eliminado');
            cargarEventosParaEliminar(contenedor);
          } catch (err) {
            console.error('Error al eliminar evento:', err);
            alert('❌ No se pudo eliminar el evento');
          }
        });

        divEvento.append(h3, btnEliminar);

        contenedor.appendChild(divEvento);
      });
    } catch (err) {
      console.error('Error al obtener eventos:', err);
      contenedor.innerHTML += '<p>Error al cargar eventos.</p>';
    }
  };

  // Añadir secciones al contenedor
  contenedor.appendChild(seccionCrear);
  contenedor.appendChild(seccionEliminar);

  main.appendChild(contenedor);
};
