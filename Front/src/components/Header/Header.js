import { CrearEvento } from '../../pages/CrearEvento/CrearEvento';
import { EventosAsistentes } from '../../pages/EventosAsistentes/EventosAsistentes';
import { EventosAsistire } from '../../pages/EventosAsistire/EventosAsistire';
import { Home } from '../../pages/Home/Home';
import { LoginRegister } from '../../pages/LoginRegister/LoginRegister';
import './Header.css';

const routes = [
  { texto: 'Home', funcion: Home },
  { texto: 'Login', funcion: LoginRegister },
  { texto: 'EventosAsistentes', funcion: EventosAsistentes },
  { texto: 'CrearEvento', funcion: CrearEvento }
];

export const Header = () => {
  const header = document.querySelector('header');
  header.innerHTML = '';

  const nav = document.createElement('nav');
  const leftContainer = document.createElement('div');
  const rightContainer = document.createElement('div');
  const centerContainer = document.createElement('div');

  leftContainer.classList.add('left-container');
  rightContainer.classList.add('right-container');
  centerContainer.classList.add('center-container');

  const homeLink = document.createElement('a');
  homeLink.href = '#';
  homeLink.textContent = 'Home';
  homeLink.addEventListener('click', Home);
  leftContainer.append(homeLink);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')); // Obtener usuario

  if (token) {
    centerContainer.innerHTML = ''; // Limpiamos el centro para evitar duplicados

    if (user && user.role === 'admin') {
      // 🛠 MENÚ PARA ADMINISTRADORES
      const menuAdmin = document.createElement('div');
      menuAdmin.classList.add('menu-admin');

      const tituloAdmin = document.createElement('a');
      tituloAdmin.href = '#';
      tituloAdmin.textContent = 'Menú Administrador';

      const eventosAsistentesLink = document.createElement('a');
      eventosAsistentesLink.href = '#';
      eventosAsistentesLink.textContent = 'Eventos y Asistentes';
      eventosAsistentesLink.addEventListener('click', EventosAsistentes);

      const crearEventoLink = document.createElement('a');
      crearEventoLink.href = '#';
      crearEventoLink.textContent = 'Crear Evento';
      crearEventoLink.addEventListener('click', CrearEvento);

      menuAdmin.append(tituloAdmin, eventosAsistentesLink, crearEventoLink);
      centerContainer.append(menuAdmin);
    } else {
      // 🔹 MENÚ NORMAL PARA USUARIO
      const eventosLink = document.createElement('a');
      eventosLink.href = '#';
      eventosLink.textContent = 'Eventos a los que voy';
      eventosLink.addEventListener('click', EventosAsistire);
      centerContainer.append(eventosLink);
    }

    const logoutLink = document.createElement('a');
    logoutLink.href = '#';
    logoutLink.textContent = 'Cerrar sesión';
    logoutLink.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      Header();
      Home();
    });
    rightContainer.append(logoutLink);
  } else {
    const loginLink = document.createElement('a');
    loginLink.href = '#';
    loginLink.textContent = 'Login';
    loginLink.addEventListener('click', LoginRegister);
    rightContainer.append(loginLink);
  }

  nav.append(leftContainer, centerContainer, rightContainer);
  header.append(nav);
};
