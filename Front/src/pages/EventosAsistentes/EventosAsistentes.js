export const EventosAsistentes = async () => {
  const main = document.querySelector('main');
  main.innerHTML = '<h2>Eventos y Asistentes</h2>';

  try {
    const res = await fetch('http://localhost:3000/api/v1/eventos');
    if (!res.ok) throw new Error('Error al obtener eventos');

    const eventos = await res.json();
    console.log('Eventos cargados:', eventos);

    if (!eventos.length) {
      main.innerHTML += '<p>No hay eventos disponibles.</p>';
      return;
    }

    eventos.forEach((evento) => {
      const divEvento = document.createElement('div');
      divEvento.classList.add('evento');

      divEvento.innerHTML = `
        <h3>${evento.titulo}</h3>
        <p>Fecha: ${evento.fecha} | Ubicación: ${evento.ubicacion}</p>
        <p><strong>Asistentes:</strong> ${
          evento.asistentes ? evento.asistentes.join(', ') : 'Nadie aún'
        }</p>
      `;

      main.appendChild(divEvento);
    });
  } catch (error) {
    console.error('Error:', error);
    main.innerHTML += '<p>Error al cargar los eventos.</p>';
  }
};
