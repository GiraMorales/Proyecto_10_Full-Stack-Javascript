import './Home.css';

//'http://localhost:3000/api/v1/users/eventos'
export const Home = async () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:3000/api/v1/eventos', {
    headers: {
      Authorization: `Bearer ${token}` // 👈 Mandamos el token al backend
    }
  });

  if (res.status === 401) {
    console.error('No autorizado. Debes iniciar sesión.');
    main.innerHTML =
      '<p>No tienes permisos para ver esta página. Inicia sesión.</p>';
    return;
  }
  const eventos = await res.json();
  console.log(eventos);

  pintarEventos(eventos, main);
};

const pintarEventos = (eventos, elementoPadre) => {
  for (const evento of eventos) {
    const divEvento = document.createElement('div');
    divEvento.classList.add('evento');
    const h2 = document.createElement('h2');
    h2.textContent = evento.titulo;
    const imagen = document.createElement('img');
    imagen.src = evento.portada;
    const p = document.createElement('p');
    p.textContent = evento.descripcion;
    const fecha = document.createElement('p');
    fecha.textContent = `Fecha: ${evento.fecha}`;
    const ubicacion = document.createElement('p');
    ubicacion.textContent = `Ubicación: ${evento.ubicacion}`;
    const ListaUsers = document.createElement('p');
    ListaUsers.textContent = `Lista de asistentes: ${evento.relatedUsers
      .map((user) => user.userName)
      .join(', ')}`;
    divEvento.append(h2);
    divEvento.append(imagen);
    divEvento.append(p);
    divEvento.append(fecha);
    divEvento.append(ubicacion);
    divEvento.append(ListaUsers);
    elementoPadre.append(divEvento);
  }
};
