import {
  asistirEventoAPI,
  cancelarAsistenciaEventoAPI
} from '../../Utils/apiAsistencia';
import { apiRequest } from '../../Utils/apiRequest';
import { Header } from '../../components/Header/Header';
import './Home.css';

export const Home = async () => {
  const main = document.querySelector('main');
  if (!main) {
    console.error('❌ ERROR: <main> no encontrado en el DOM');
    return;
  }

  main.innerHTML = '';
  Header();

  try {
    const eventos = await apiRequest('eventos');
    if (!eventos || !Array.isArray(eventos)) {
      throw new Error('❌ Respuesta inválida del servidor: no es un array');
    }

    if (eventos.length === 0) {
      main.innerHTML = `
        <div class="no-eventos">
          <p>No hay eventos disponibles.</p>
          <button id="reloadEvents">Recargar eventos</button>
        </div>
      `;
      document.getElementById('reloadEvents').addEventListener('click', Home);
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const eventosApuntados = user
      ? await apiRequest(`users/${user._id}/eventos`)
      : [];

    pintarEventos(eventos, eventosApuntados, main);
  } catch (error) {
    console.error('❌ Error al obtener eventos:', error);
    main.innerHTML = `<p>Error al cargar los eventos: ${error.message}</p>`;
  }
};

const pintarEventos = (eventos, eventosApuntados, elementoPadre) => {
  const token = localStorage.getItem('token');

  for (const evento of eventos) {
    if (!evento._id || !evento.titulo || !evento.portada) continue;

    const divEvento = document.createElement('div');
    divEvento.classList.add('evento');

    const h2 = document.createElement('h2');
    h2.textContent = evento.titulo;

    const imagen = document.createElement('img');
    imagen.src = evento.portada;
    imagen.alt = `Imagen de ${evento.titulo}`;

    const p = document.createElement('p');
    p.textContent = evento.descripcion;

    const divinfo = document.createElement('div');
    divinfo.classList.add('info');
    divinfo.innerHTML = `
      <p><strong>Fecha:</strong> ${evento.fecha}</p>
      <p><strong>Ubicación:</strong> ${evento.ubicacion}</p>
    `;

    const divBoton = document.createElement('div');
    divBoton.classList.add('evento-boton');

    if (token) {
      const btnAsistir = document.createElement('button');
      const asistiendo = eventosApuntados.some((e) => e._id === evento._id);

      btnAsistir.textContent = asistiendo ? 'No voy' : 'Voy a ir';
      btnAsistir.classList.toggle('activo', asistiendo);

      btnAsistir.addEventListener('click', async () => {
        try {
          if (btnAsistir.classList.contains('activo')) {
            await cancelarAsistenciaEventoAPI(evento._id);
          } else {
            await asistirEventoAPI(evento._id);
          }
          await Home(); // recargar eventos actualizados
        } catch (error) {
          console.error('Error al actualizar asistencia:', error);
          alert('Error al actualizar tu asistencia. Intenta más tarde.');
        }
      });

      divBoton.appendChild(btnAsistir);
    }

    divEvento.append(h2, imagen, p, divinfo, divBoton);
    elementoPadre.appendChild(divEvento);
  }
};
