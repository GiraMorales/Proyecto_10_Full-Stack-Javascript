import './EventosAsistire.css';

export const EventosAsistire = async () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token'); //Obtener token

  if (user && user.userName) {
    const userMessage = document.createElement('h2');
    userMessage.textContent = `Hola, ${user.userName}. Aquí tienes tus eventos`;
    main.append(userMessage);
  }

  if (!token) {
    console.error('No hay token. El usuario debe iniciar sesión.');
    main.innerHTML = '<p>Debes iniciar sesión para ver tus eventos.</p>';
    return;
  }

  try {
    console.log('Token enviado:', token); //Verifica en consola si el token es correcto
    const res = await fetch('http://localhost:3000/api/v1/eventos');
    if (!res.ok) throw new Error('Error al obtener eventos');

    const eventos = await res.json();
    const eventosFiltrados = eventos.filter((evento) =>
      EventosAsistire.includes(evento.id)
    );

    pintarEventos(eventosFiltrados, main);
  } catch (error) {
    console.error(error);
    main.innerHTML = '<p>Error al cargar los eventos.</p>';
  }
};
